# ============================================================
#  generar_mesas.py — genera GLBs de mesas parametricas para el
#  simulador de acabados, a partir de un JSON de articulos.
#
#  USO (sin abrir Blender, desde PowerShell):
#
#    & "C:\Program Files\Blender Foundation\Blender 4.2\blender.exe" `
#        --background --python generar_mesas.py -- mesas.json salida
#
#  - mesas.json : lista de articulos (ver mesas.json de ejemplo)
#  - salida     : carpeta donde se escriben los {sku}.glb
#
#  Convenciones (ver docs/mapeo-erp-simulador.md):
#  - unidades en metros, mesa apoyada en el suelo, centrada en origen
#  - nombres de malla = ids de cualidad del ERP (TAPA_, PIE, COLOR...)
#  - sin materiales: los aplica el visor web
#  - UVs por proyeccion cubica de 1 m -> densidad de texel uniforme
#  - bisel de 1.5 mm en todas las aristas
#  - export GLB con compresion Draco
# ============================================================

import bpy
import json
import os
import sys


# ---------- utilidades ----------

def limpiar_escena():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def _finalizar(obj, nombre):
    """nombra, suaviza, bisela y proyecta UVs de un objeto"""
    obj.name = nombre
    obj.data.name = nombre

    # bisel de aristas (se aplica al exportar)
    bev = obj.modifiers.new("Bevel", "BEVEL")
    bev.width = 0.0015
    bev.segments = 2
    bev.limit_method = "ANGLE"
    bev.angle_limit = 0.785  # 45 grados

    # sombreado suave con autosuavizado (compatible 3.x / 4.x)
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    try:
        bpy.ops.object.shade_auto_smooth(angle=0.785)
    except Exception:
        bpy.ops.object.shade_smooth()
        try:
            obj.data.use_auto_smooth = True
            obj.data.auto_smooth_angle = 0.785
        except Exception:
            pass

    # UVs: proyeccion cubica de 1 m (densidad uniforme entre modelos;
    # el eje U queda alineado con X = direccion de la veta en la tapa)
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.uv.cube_project(cube_size=1.0, correct_aspect=True)
    bpy.ops.object.mode_set(mode="OBJECT")
    obj.select_set(False)


def caja(nombre, dx, dy, dz, x=0, y=0, z=0):
    """caja de dx*dy*dz con el nombre de la cualidad; z = base de la pieza"""
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, y, z + dz / 2))
    obj = bpy.context.active_object
    obj.scale = (dx, dy, dz)
    bpy.ops.object.transform_apply(scale=True)
    _finalizar(obj, nombre)
    return obj


def cilindro(nombre, r_sup, r_inf, h, x=0, y=0, z=0, vertices=64):
    bpy.ops.mesh.primitive_cone_add(
        radius1=r_inf, radius2=r_sup, depth=h,
        vertices=vertices, location=(x, y, z + h / 2)
    )
    obj = bpy.context.active_object
    _finalizar(obj, nombre)
    return obj


# ---------- construccion de una mesa ----------

def construir_mesa(art):
    dims = art.get("dims", {})
    cual = art.get("cualidades", {})
    n_tapa = cual.get("tapa", "TAPA_")
    n_pie = cual.get("pie", "PIE")
    n_faldon = cual.get("faldon")  # None si el articulo no tiene faldon

    H = dims.get("alto", 75) / 100.0
    TH = 0.045  # grosor de tapa
    forma = art.get("forma", "rect")
    pie_central = art.get("pie", "esquinas") == "central"

    if forma == "redonda":
        R = dims.get("diametro", 120) / 200.0
        L = W = R * 2
        cilindro(n_tapa, R, R, TH, z=H - TH)
    else:
        L = dims.get("largo", 180) / 100.0
        W = dims.get("ancho", 100) / 100.0
        caja(n_tapa, L, W, TH, z=H - TH)

    if pie_central:
        # columna troncoconica + base
        cilindro(n_pie, 0.05, 0.06, H - TH - 0.022, z=0.022, vertices=48)
        r_base = min(L, W) * 0.24
        cilindro(n_pie + ".base", r_base * 0.92, r_base, 0.022, z=0, vertices=64)
    else:
        # cuatro patas en las esquinas
        for i, (px, py) in enumerate([
            (-L / 2 + 0.12, W / 2 - 0.12), (L / 2 - 0.12, W / 2 - 0.12),
            (-L / 2 + 0.12, -W / 2 + 0.12), (L / 2 - 0.12, -W / 2 + 0.12),
        ]):
            caja(n_pie + "." + str(i), 0.06, 0.06, H - TH, x=px, y=py, z=0)

    # faldon bajo la tapa (solo rectangulares y si el articulo lo define)
    if n_faldon and forma != "redonda":
        for py in (W / 2 - 0.1, -W / 2 + 0.1):
            caja(n_faldon + ".faldon" + ("N" if py > 0 else "S"),
                 L - 0.24, 0.035, 0.08, y=py, z=H - TH - 0.102)


# ---------- exportacion ----------

def exportar_glb(ruta):
    bpy.ops.export_scene.gltf(
        filepath=ruta,
        export_format="GLB",
        export_apply=True,                       # aplica el bisel
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
        export_yup=True,                         # eje Y arriba (Three.js)
        export_materials="NONE",                 # los pone el visor
    )


# ---------- programa principal ----------

def main():
    argv = sys.argv
    if "--" not in argv:
        print("Faltan argumentos.  blender --background --python generar_mesas.py -- mesas.json salida")
        return
    args = argv[argv.index("--") + 1:]
    fichero_json = args[0]
    carpeta_salida = args[1] if len(args) > 1 else "."

    with open(fichero_json, encoding="utf-8") as f:
        articulos = json.load(f)

    os.makedirs(carpeta_salida, exist_ok=True)

    for art in articulos:
        sku = str(art["sku"])
        print(">> generando", sku)
        limpiar_escena()
        construir_mesa(art)
        destino = os.path.join(carpeta_salida, sku + ".glb")
        exportar_glb(destino)
        print("   ->", destino)

    print("Terminado:", len(articulos), "modelos.")


main()
