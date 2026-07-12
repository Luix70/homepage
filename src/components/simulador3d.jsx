import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { getSimulador, getModelosSimulador } from "./../services/simulador";
import t from "./simulador3d.lit.json";

/* ==================================================================
   Simulador de acabados 3D
   - La geometría es procedural (cajas). En producción se sustituye
     por un GLB exportado de Blender con mallas nombradas igual que
     las partes ("tapa", "estructura") — applyFinish funciona igual.
   - Las texturas son procedurales (canvas). En producción se cargan
     del DAM con THREE.TextureLoader / KTX2Loader.
   ================================================================== */

/* ---------- texturas de demostración ---------- */
function woodCanvas(size, c1, c2) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const x = cv.getContext("2d");
  x.fillStyle = c1;
  x.fillRect(0, 0, size, size);
  for (let i = 0; i < size / 6; i++) {
    const y0 = Math.random() * size;
    x.strokeStyle = c2;
    x.globalAlpha = 0.08 + Math.random() * 0.18;
    x.lineWidth = 0.5 + Math.random() * 2.2;
    x.beginPath();
    for (let px = 0; px <= size; px += 8) {
      const y = y0 + Math.sin(px * 0.02 + i) * 3 + Math.sin(px * 0.11 + i * 7) * 1.2;
      if (px === 0) x.moveTo(px, y);
      else x.lineTo(px, y);
    }
    x.stroke();
  }
  // variacion tonal entre "tablas": rompe la uniformidad del plastico
  for (let i = 0; i < 4; i++) {
    x.fillStyle = i % 2 ? c2 : "#ffffff";
    x.globalAlpha = 0.045;
    x.fillRect(0, (size / 4) * i, size, size / 4);
  }
  x.globalAlpha = 1;
  return cv;
}
function ceramicCanvas(size, c1, c2) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const x = cv.getContext("2d");
  x.fillStyle = c1;
  x.fillRect(0, 0, size, size);
  for (let i = 0; i < 7; i++) {
    x.strokeStyle = c2;
    x.globalAlpha = 0.12 + Math.random() * 0.25;
    x.lineWidth = 0.6 + Math.random() * 1.8;
    x.beginPath();
    let px = Math.random() * size;
    let py = 0;
    x.moveTo(px, py);
    while (py < size) {
      px += (Math.random() - 0.5) * 46;
      py += 12 + Math.random() * 26;
      x.lineTo(px, py);
    }
    x.stroke();
  }
  x.globalAlpha = 1;
  return cv;
}
function flatCanvas(size, c1) {
  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const x = cv.getContext("2d");
  x.fillStyle = c1;
  x.fillRect(0, 0, size, size);
  return cv;
}
function canvasFor(a, size) {
  if (a.tipo === "wood") return woodCanvas(size, a.c1, a.c2);
  if (a.tipo === "ceramic") return ceramicCanvas(size, a.c1, a.c2);
  return flatCanvas(size, a.c1);
}

/* miniaturas para los selectores (cacheadas) */
const thumbCache = {};
function thumb(a) {
  if (!thumbCache[a.id]) thumbCache[a.id] = canvasFor(a, 64).toDataURL();
  return thumbCache[a.id];
}

/* ---------- motor Three.js ---------- */
function buildScene(mount, cfg) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f3ef);
  scene.fog = new THREE.Fog(0xf5f3ef, 7, 14);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputEncoding = THREE.sRGBEncoding;
  mount.appendChild(renderer.domElement);
  renderer.domElement.style.cursor = "grab";

  console.log("[simulador3d] v2 — render de estudio (ACES + PMREM) activo");

  /* tone mapping cinematografico: gestiona las altas luces como una camara */
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;

  /* Entorno de estudio fotografico generado por codigo y convertido a mapa
     de radiancia (PMREM): una "habitacion" gris con softboxes. Es lo que da
     reflejos y volumen reales a metales, lacas y maderas. */
  function entornoEstudio() {
    const pmrem = new THREE.PMREMGenerator(renderer);
    const estudio = new THREE.Scene();

    estudio.add(
      new THREE.Mesh(
        new THREE.BoxGeometry(10, 10, 10),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(0.32, 0.32, 0.34),
          side: THREE.BackSide,
        })
      )
    );
    const panel = (w, h, intensidad, x, y, z, rx, ry) => {
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(w, h),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color(intensidad, intensidad, intensidad),
        })
      );
      m.position.set(x, y, z);
      m.rotation.set(rx, ry, 0);
      estudio.add(m);
    };
    panel(4.5, 3.0, 7.0, 0, 4.9, 0.5, Math.PI / 2, 0);   // softbox cenital
    panel(3.0, 2.2, 3.5, -4.9, 2.2, 0, 0, Math.PI / 2);  // lateral izquierdo
    panel(3.0, 2.2, 2.0, 4.9, 1.8, -1, 0, -Math.PI / 2); // lateral derecho
    panel(2.5, 2.0, 1.2, 0, 2.0, -4.9, 0, 0);            // contra de fondo

    const env = pmrem.fromScene(estudio, 0.04).texture;
    pmrem.dispose();
    return env;
  }
  scene.environment = entornoEstudio();
  const maxAniso = renderer.capabilities.getMaxAnisotropy();

  /* luz principal: solo para las sombras (el volumen lo da el entorno) */
  const key = new THREE.DirectionalLight(0xfff6e8, 0.55);
  key.position.set(3, 5, 2.5);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -2.5;
  key.shadow.camera.right = 2.5;
  key.shadow.camera.top = 2.5;
  key.shadow.camera.bottom = -2.5;
  key.shadow.radius = 5;
  scene.add(key);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(6, 48),
    new THREE.ShadowMaterial({ opacity: 0.22 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  /* materiales por acabado (el reflejo del entorno llega solo,
     via scene.environment) */
  const matCache = {};

  function texturaDe(a) {
    let tx;
    if (a.textura) {
      // textura real del DAM (foto/escaneo de la muestra fisica)
      tx = new THREE.TextureLoader().load(a.textura);
    } else {
      tx = new THREE.CanvasTexture(canvasFor(a, 512));
    }
    tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
    tx.encoding = THREE.sRGBEncoding;
    tx.anisotropy = maxAniso; // nitidez de la veta en angulos rasantes
    return tx;
  }

  function materialFor(a) {
    if (matCache[a.id]) return matCache[a.id];
    let m;
    if (a.tipo === "metal") {
      m = new THREE.MeshStandardMaterial({
        color: a.c1,
        metalness: 0.9,
        roughness: 0.34,
        envMapIntensity: 1.0,
      });
    } else if (a.tipo === "lacquer") {
      // laca con capa de barniz fisica (clearcoat)
      m = new THREE.MeshPhysicalMaterial({
        color: a.c1,
        metalness: 0.0,
        roughness: 0.42,
        clearcoat: 0.9,
        clearcoatRoughness: 0.18,
        envMapIntensity: 0.7,
      });
    } else if (a.tipo === "ceramic") {
      m = new THREE.MeshPhysicalMaterial({
        map: texturaDe(a),
        metalness: 0.0,
        roughness: 0.3,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
        envMapIntensity: 0.7,
      });
    } else {
      // madera: la propia textura hace de relieve sutil (bump)
      const tx = texturaDe(a);
      m = new THREE.MeshStandardMaterial({
        map: tx,
        bumpMap: tx,
        bumpScale: 0.015,
        metalness: 0.0,
        roughness: 0.58,
        envMapIntensity: 0.5,
      });
    }
    matCache[a.id] = m;
    return m;
  }

  /* ---- contenedor del modelo ---- */
  const raiz = new THREE.Group();
  scene.add(raiz);

  const aplicados = {}; // parteId -> acabado (para reaplicar tras cargas asincronas)
  let lookY = 0.42;

  /* correspondencia cualidad ERP -> mallas del modelo procedural de reserva */
  const ALIAS_PROCEDURAL = [
    { pre: ["TAPA", "SOBRE"], mallas: ["tapa"] },
    { pre: ["PIE", "PATA"], mallas: ["pata"] },
    { pre: ["ESTRUCTURA"], mallas: ["pata", "faldon"] },
    { pre: ["COLOR", "BASTIDOR", "BANDA"], mallas: ["faldon"] },
  ];
  function aliasDe(parteId) {
    const id = parteId.toUpperCase();
    const fila = ALIAS_PROCEDURAL.find((f) =>
      f.pre.some((p) => id.indexOf(p) === 0)
    );
    return fila ? fila.mallas : [];
  }

  /* Aplica un material a las mallas de una parte. Una malla pertenece a la
     parte si su nombre es exactamente el id de la cualidad ("TAPA_"), si
     empieza por "id." para piezas multiples ("COLOR.faldon"), o si coincide
     con un alias del modelo procedural de reserva. */
  function aplicarAMallas(parteId, acabado) {
    const alias = aliasDe(parteId);
    const mat = materialFor(acabado);
    raiz.traverse((o) => {
      if (!o.isMesh) return;
      if (
        o.name === parteId ||
        o.name.indexOf(parteId + ".") === 0 ||
        alias.indexOf(o.name) >= 0
      ) {
        o.material = mat;
      }
    });
  }

  /* ---- modelo procedural de reserva (mallas: tapa, pata, faldon) ----
     Soporta cfg.forma = "rect" | "redonda" y cfg.pie = "esquinas" | "central" */
  let halfL, halfR, leaf;
  let EXT = 0, L4 = 0;
  function construirMesaProcedural() {
    const dims = cfg.dims || {};
    const H = (dims.alto || 75) / 100;
    const TH = 0.045;
    const forma = cfg.forma || "rect";
    const pieCentral = cfg.pie === "central";

    let L, W;
    if (forma === "redonda") {
      const R = (dims.diametro || 120) / 200;
      L = W = R * 2;
      EXT = 0;
      const tapa = new THREE.Mesh(new THREE.CylinderGeometry(R, R, TH, 64));
      tapa.name = "tapa";
      tapa.castShadow = true;
      tapa.position.y = H - TH / 2;
      raiz.add(tapa);
    } else {
      L = (dims.largo || 180) / 100;
      W = (dims.ancho || 100) / 100;
      EXT = dims.extendida ? (dims.extendida - (dims.largo || 180)) / 100 : 0;
      L4 = L / 4;

      const halfGeo = new THREE.BoxGeometry(L / 2, TH, W);
      halfL = new THREE.Mesh(halfGeo);
      halfR = new THREE.Mesh(halfGeo);
      leaf = new THREE.Mesh(new THREE.BoxGeometry(Math.max(EXT, 0.01), TH, W));
      [halfL, halfR, leaf].forEach((m) => {
        m.name = "tapa";
        m.castShadow = true;
        m.position.y = H - TH / 2;
        raiz.add(m);
      });
      halfL.position.x = -L4;
      halfR.position.x = L4;
      leaf.visible = false;
    }

    if (pieCentral) {
      /* columna central + base */
      const col = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.06, H - TH - 0.02, 24)
      );
      col.name = "pata";
      col.castShadow = true;
      col.position.y = (H - TH) / 2;
      raiz.add(col);

      const rBase = Math.min(L, W) * 0.24;
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(rBase * 0.92, rBase, 0.022, 40)
      );
      base.name = "pata";
      base.castShadow = true;
      base.position.y = 0.011;
      raiz.add(base);

      /* faldon bajo tapa solo en las rectangulares */
      if (forma !== "redonda") {
        const skirtGeo = new THREE.BoxGeometry(L - 0.24, 0.08, 0.035);
        [W / 2 - 0.1, -W / 2 + 0.1].forEach((pz) => {
          const sk = new THREE.Mesh(skirtGeo);
          sk.name = "faldon";
          sk.position.set(0, H - TH - 0.062, pz);
          sk.castShadow = true;
          raiz.add(sk);
        });
      }
      return;
    }

    const legGeo = new THREE.BoxGeometry(0.06, H - TH, 0.06);
    [
      [-L / 2 + 0.12, W / 2 - 0.12], [L / 2 - 0.12, W / 2 - 0.12],
      [-L / 2 + 0.12, -W / 2 + 0.12], [L / 2 - 0.12, -W / 2 + 0.12]
    ].forEach(([px, pz]) => {
      const leg = new THREE.Mesh(legGeo);
      leg.name = "pata";
      leg.position.set(px, (H - TH) / 2, pz);
      leg.castShadow = true;
      raiz.add(leg);
    });
    const skirtGeo = new THREE.BoxGeometry(L - 0.3, 0.09, 0.04);
    [W / 2 - 0.12, -W / 2 + 0.12].forEach((pz) => {
      const sk = new THREE.Mesh(skirtGeo);
      sk.name = "faldon";
      sk.position.set(0, H - TH - 0.07, pz);
      sk.castShadow = true;
      raiz.add(sk);
    });
  }

  /* ---- carga del GLB real si el articulo lo tiene publicado ----
     Convencion: static/modelos3d/{sku}.glb en la API, exportado de
     Blender con Draco y con las mallas nombradas segun las cualidades. */
  if (cfg.modelo3d) {
    const draco = new DRACOLoader();
    draco.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.4.3/"
    );
    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);
    loader.load(
      cfg.modelo3d,
      (gltf) => {
        const obj = gltf.scene;
        obj.traverse((o) => {
          if (o.isMesh) o.castShadow = true;
        });
        // apoyar en el suelo, centrar en el origen y encuadrar la camara
        const box = new THREE.Box3().setFromObject(obj);
        const centro = box.getCenter(new THREE.Vector3());
        obj.position.x -= centro.x;
        obj.position.z -= centro.z;
        obj.position.y -= box.min.y;
        raiz.add(obj);
        const tam = box.getSize(new THREE.Vector3());
        radius = Math.max(tam.x, tam.z, 1) * 1.9 + 0.5;
        lookY = tam.y * 0.55;
        // reaplicar los acabados ya elegidos
        Object.keys(aplicados).forEach((id) => aplicarAMallas(id, aplicados[id]));
      },
      undefined,
      (err) => {
        console.error(
          "No se pudo cargar " + cfg.modelo3d + "; uso el modelo de reserva",
          err
        );
        construirMesaProcedural();
        Object.keys(aplicados).forEach((id) => aplicarAMallas(id, aplicados[id]));
      }
    );
  } else {
    construirMesaProcedural();
  }

  /* cámara orbital */
  let theta = 0.7, phi = 1.15, radius = 3.4, userMoved = false;
  let drag = false, lx = 0, ly = 0;
  function updateCamera() {
    camera.position.set(
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.cos(theta)
    );
    camera.lookAt(0, lookY, 0);
  }
  const el = renderer.domElement;
  const onDown = (e) => { drag = true; lx = e.clientX; ly = e.clientY; userMoved = true; };
  const onUp = () => { drag = false; };
  const onMove = (e) => {
    if (!drag) return;
    theta -= (e.clientX - lx) * 0.006;
    phi -= (e.clientY - ly) * 0.005;
    phi = Math.max(0.25, Math.min(1.45, phi));
    lx = e.clientX; ly = e.clientY;
  };
  const onWheel = (e) => {
    e.preventDefault();
    radius = Math.max(1.8, Math.min(7, radius * (e.deltaY > 0 ? 1.08 : 0.93)));
  };
  el.addEventListener("pointerdown", onDown);
  window.addEventListener("pointerup", onUp);
  window.addEventListener("pointermove", onMove);
  el.addEventListener("wheel", onWheel, { passive: false });

  /* tamaño */
  function resize() {
    const w = mount.clientWidth;
    const h = mount.clientHeight || 420;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener("resize", resize);
  resize();

  /* precalentamiento: genera todas las texturas/materiales ahora,
     fuera del bucle de render, para que el primer frame no se atragante
     y los cambios de acabado sean instantáneos desde el principio */
  (cfg.partes || []).forEach((p) =>
    (p.acabados || []).forEach((a) => materialFor(a))
  );

  /* bucle */
  let extTarget = 0, extAmount = 0, raf;
  function animate() {
    raf = requestAnimationFrame(animate);
    if (!userMoved) theta += 0.0022;
    extAmount += (extTarget - extAmount) * 0.09;
    if (halfL) {
      const off = L4 + (extAmount * EXT) / 2;
      halfL.position.x = -off;
      halfR.position.x = off;
      leaf.visible = extAmount > 0.02;
      leaf.scale.x = Math.max(extAmount, 0.001);
    }
    updateCamera();
    renderer.render(scene, camera);
  }
  animate();

  return {
    applyFinish(parteId, acabado) {
      if (!acabado) return;
      aplicados[parteId] = acabado;
      aplicarAMallas(parteId, acabado);
    },
    setExtended(b) { extTarget = b ? 1 : 0; },
    dispose() {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      if (el.parentNode === mount) mount.removeChild(el);
    }
  };
}

/* ---------- componente React ---------- */
const Simulador3D = (props) => {
  const { lan } = props;
  const col = (props.match && props.match.params && props.match.params.col) || "demo";

  const [cfg, setCfg] = useState(null);
  const [sel, setSel] = useState(null);
  const [extended, setExtended] = useState(false);
  const mountRef = useRef(null);
  const engineRef = useRef(null);

  const lit = (k) => t[k][lan] || t[k].es;
  const tr = (obj) => obj[lan] || obj.es;
  const fmtEUR = (v) =>
    new Intl.NumberFormat(lan === "en" ? "en-GB" : lan || "es", {
      style: "currency", currency: "EUR", maximumFractionDigits: 0
    }).format(v);

  /* carga de datos (hoy local, mañana API del hub) */
  useEffect(() => {
    let alive = true;
    getSimulador(col).then((data) => {
      if (!alive) return;
      const inicial = {};
      data.partes.forEach((p) => { inicial[p.id] = p.acabados[0].id; });
      setCfg(data);
      setSel(inicial);
    });
    return () => { alive = false; };
  }, [col]);

  /* construcción de la escena.
     Depende de cfg Y sel: hasta que ambos existen, el div del visor
     no está montado (React 16 no agrupa los dos setState de la carga). */
  useEffect(() => {
    if (!cfg || !sel || !mountRef.current) return;
    if (engineRef.current && engineRef.current.__cfg === cfg) return;
    if (engineRef.current) engineRef.current.dispose();
    const engine = buildScene(mountRef.current, cfg);
    engine.__cfg = cfg;
    engineRef.current = engine;
  }, [cfg, sel]);

  /* limpieza al desmontar */
  useEffect(() => {
    return () => {
      if (engineRef.current) {
        engineRef.current.dispose();
        engineRef.current = null;
      }
    };
  }, []);

  /* aplicar acabados al cambiar la selección */
  useEffect(() => {
    if (!engineRef.current || !cfg || !sel) return;
    cfg.partes.forEach((p) => {
      const a = p.acabados.find((x) => x.id === sel[p.id]);
      engineRef.current.applyFinish(p.id, a);
    });
  }, [sel, cfg]);

  /* extensión */
  useEffect(() => {
    if (engineRef.current) engineRef.current.setExtended(extended);
  }, [extended]);

  if (!cfg || !sel) {
    return <div className="container py-5 text-center text-muted">…</div>;
  }

  /* al cambiar de modelo, cfg y sel se actualizan en dos renders distintos
     (React 16 no los agrupa); mientras no casen, no renderizamos el detalle */
  const selCompleta = cfg.partes.every((p) =>
    p.acabados.some((a) => a.id === sel[p.id])
  );
  if (!selCompleta) {
    return <div className="container py-5 text-center text-muted">…</div>;
  }

  const acabadoSel = (p) => p.acabados.find((a) => a.id === sel[p.id]);
  const supDe = (p) => {
    const a = acabadoSel(p);
    if (!a.sup) return 0;
    return p.supTipo === "pct" ? (cfg.precioBase * a.sup) / 100 : a.sup;
  };
  const total = cfg.precioBase + cfg.partes.reduce((s, p) => s + supDe(p), 0);
  const d = cfg.dims;

  /* serializa la configuracion elegida en el formato del ERP:
     "COLOR=6;TAPA_=50;PIE=5;" */
  const codagrupacion = () =>
    cfg.partes
      .map((p) => {
        const a = acabadoSel(p);
        return p.id + "=" + (a && a.valor !== undefined ? a.valor : a ? a.id : "?");
      })
      .join(";") + ";";

  return (
    <div className="container py-4">
      <h3 className="text-info">{lit("CAR")}</h3>
      <div className="d-flex align-items-center mb-1">
        <select
          className="custom-select w-auto mr-3"
          value={col}
          onChange={(e) => props.history.push("/simulador/" + e.target.value)}
        >
          {getModelosSimulador().map((m) => (
            <option key={m.ruta} value={m.ruta}>
              {(m.nombre && (m.nombre[lan] || m.nombre.es)) || m.ruta}
            </option>
          ))}
        </select>
        <span className="text-muted">{cfg.sku}</span>
      </div>
      <div className="row mt-3">
        {/* visor 3D */}
        <div className="col-12 col-lg-8">
          <div
            ref={mountRef}
            style={{ height: "58vh", minHeight: 420, borderRadius: 8, overflow: "hidden" }}
          />
          <p className="text-muted small text-center mt-2 mb-0">{lit("GIR")}</p>
        </div>

        {/* panel de configuración */}
        <div className="col-12 col-lg-4">
          <p className="text-muted small mb-3">
            {lit("MED")}:{" "}
            {d.diametro
              ? "Ø " + d.diametro + " × " + d.alto + " cm"
              : d.largo + " × " + d.ancho + " × " + d.alto + " cm" +
                (d.extendida ? "  ·  → " + d.extendida + " cm" : "")}
          </p>

          {cfg.partes.map((p) => {
            const a = acabadoSel(p);
            const supTxt = !a.sup
              ? lit("INC")
              : p.supTipo === "pct" ? "+" + a.sup + " %" : "+" + fmtEUR(a.sup);
            return (
              <div key={p.id} className="mb-4">
                <h6 className="text-uppercase text-muted small font-weight-bold">
                  {tr(p.nombre)}
                </h6>
                <div className="d-flex flex-wrap">
                  {p.acabados.map((ac) => (
                    <img
                      key={ac.id}
                      src={thumb(ac)}
                      alt={tr(ac.nombre)}
                      title={tr(ac.nombre)}
                      width={44}
                      height={44}
                      className="rounded-circle border mr-2 mb-2"
                      style={{
                        cursor: "pointer",
                        boxShadow: sel[p.id] === ac.id ? "0 0 0 3px #17a2b8" : "none"
                      }}
                      onClick={() =>
                        setSel((prev) => Object.assign({}, prev, { [p.id]: ac.id }))
                      }
                    />
                  ))}
                </div>
                <small>
                  {tr(a.nombre)} <span className="text-muted">· {supTxt}</span>
                </small>
              </div>
            );
          })}

          {/* la animación de extensión solo existe en el modelo de reserva;
              con GLB real se implementará con la animación del propio fichero */}
          {!cfg.modelo3d && d.extendida ? (
            <button
              className="btn btn-outline-dark btn-block mb-4"
              onClick={() => setExtended(!extended)}
            >
              {extended ? lit("PLE") : lit("EXT")} ({extended ? d.largo : d.extendida} cm)
            </button>
          ) : null}

          <div className="bg-light rounded p-3">
            <div className="d-flex justify-content-between text-muted small">
              <span>{lit("BAS")}</span>
              <span>{fmtEUR(cfg.precioBase)}</span>
            </div>
            {cfg.partes.map((p) => {
              const s = supDe(p);
              return s ? (
                <div key={p.id} className="d-flex justify-content-between text-muted small">
                  <span>{tr(acabadoSel(p).nombre)}</span>
                  <span>+{fmtEUR(s)}</span>
                </div>
              ) : null;
            })}
            <div className="d-flex justify-content-between mt-2 h5">
              <span>{lit("TOT")}</span>
              <span>{fmtEUR(total)}</span>
            </div>
            <button
              className="btn btn-dark btn-block mt-3"
              onClick={() =>
                window.alert(
                  lit("PEDMSG") +
                    "\n\n" +
                    tr(cfg.nombre) +
                    "  (" +
                    cfg.sku +
                    ")\n\ncodagrupacion:\n" +
                    codagrupacion() +
                    "\n\n" +
                    lit("TOT") +
                    ": " +
                    fmtEUR(total)
                )
              }
            >
              {lit("PED")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulador3D;
