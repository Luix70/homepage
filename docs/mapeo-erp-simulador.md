# Mapeo ERP (Access) → Hub de publicación → API del simulador

*Basado en el esquema real de `ERP_datos.accdb` y los datos del artículo 3041 (mesa Cross 160×90)*
*Versión 1.0 — Julio 2026*

---

## 1. El modelo que ya tenéis (y que es un configurador completo)

```
ARTICULOS_RST ──┬── CUALIDAD_ARTICULO_RST ──── CUALIDAD_ARTICULO_VALOR_RST
 (3.591)        │    qué cualidades tiene        qué valores admite
                │    cada artículo, en qué       cada artículo-cualidad
                │    orden, si afectan precio    (17.810)
                │
                ├── CUALIDADES_RST (29) ──── CUALIDADES_VALOR_RST (991)
                │    catálogo de cualidades      valores con nombre es/fr/en
                │
                ├── colores (3.615)             biblioteca de acabados de color
                │                                (fabricante, programa, TipoTarifa,
                │                                 incremento, chapa, muestra escaneada)
                │
                ├── MODELOS_TARIFA_RST ──── PRECIOS_TARIFA_RST (150.892)
                │    CodPrecio + CONDICION       precio por artículo, CodPrecio
                │    evaluada sobre la            y tarifa (A/B/C × año × EUR/PUN)
                │    configuración
                │
                └── ColeccionArticulo ──── Colecciones (60)
```

Una configuración concreta se serializa como:

```
codagrupacion = "COLOR=6;TAPA_=50;PIE=5;"
```

> Artículo 3041 con faldón lacado *Texturizado Blanco* (colores.NUMERO=6),
> tapa *Porcelánico Blanco* (CUALIDADES_VALOR TAPA_=50) y pie
> *Acero Texturizado Vulcano Roca* (PIE=5).

**Decisión de diseño clave: la web debe hablar este mismo idioma.** El simulador
emite y consume `codagrupacion` tal cual. Un pedido web entra al ERP sin
traducción; un enlace con la cadena reproduce la configuración exacta.

---

## 2. Reglas de resolución de valores

| Cualidad | Espacio de valores | Resolución |
|---|---|---|
| TAPA_, PIE y resto | `CUALIDADES_VALOR_RST(CodCualidad, CodValor)` | Directa; nombres es/fr/en en la propia fila |
| COLOR | `colores.NUMERO` | El valor apunta a la biblioteca de colores (infinitos: muestras de otros fabricantes). El color resuelve **la categoría de precio** (normal / especial / brillo / muestra) vía `TipoTarifa` e `incremento` |
| COLOR meta-códigos | `0` heredado · `10` sin color · `99` desconocido · `100` a juego | Lista legada en CUALIDADES_VALOR (todas `Activa=Falso`); solo estos meta-códigos siguen vivos |

Campos que gobiernan el configurador por artículo (`CUALIDAD_ARTICULO_RST`):

- `Orden` → posición del selector (3041: 1=TAPA_, 2=COLOR, 3=PIE)
- `AsociadoA` / `_FR` / `_EN` → etiqueta visible del selector ("FALDÓN Y EXTENSIBLES LACADOS")
- `Requerida`, `AfectaPrecio`, `LimitarALista` → validación y comportamiento
- `CUALIDAD_ARTICULO_VALOR_RST` → los swatches válidos de ese artículo

---

## 3. Motor de precios

Flujo confirmado con los datos del 3041:

1. **`MODELOS_TARIFA_RST`**: cada fila del artículo define un `CodPrecio` con una
   `CONDICION` = lista de comparaciones separadas por `;` evaluadas en AND
   contra los valores numéricos de `codagrupacion`:

   | CodPrecio | CONDICION | Significado |
   |---|---|---|
   | 1 | `TAPA_<50;TAPA_>4` | Tapa cristal (valores 5–49), color de nuancier |
   | 2 | `TAPA_<50;TAPA_>4;COLOR=-1` | Tapa cristal, color muestra |
   | 5 | `TAPA_>49;TAPA_<75` | Porcelánico serie 1, color nuancier |
   | 55 | `TAPA_>74;TAPA_<99` | Porcelánico serie 2 |

   `COLOR=-1` denota color fuera de catálogo (categoría resuelta desde
   `colores.TipoTarifa`/`incremento`, no un valor literal). *(Confirmar la
   convención exacta de -1 al portar la rutina.)*

2. **`PRECIOS_TARIFA_RST`**: `(CodArticulo, CodPrecio, CodTarifa)` → `Precio` y
   `Moneda`. Las tarifas siguen el patrón `{A|B|C}{año}[P]` (niveles de cliente
   × campaña, EUR o puntos PUN).

**Recomendación**: la rutina VBA que hoy evalúa `CONDICION` debe portarse una
sola vez a una función compartida (C# en la API). Es un parser trivial
(split por `;`, operadores `< > =`), pero debe ser *idéntico* al del ERP —
mismo redondeo, mismos casos borde — y cubrirse con tests que comparen contra
precios calculados por el ERP real.

---

## 4. Contrato de la API (ASP.NET, fase 1 sobre la base actual)

### GET `/api/{lang}/simulador/{sku}`

```json
{
  "sku": "3041",
  "nombre": "MESA COMEDOR 'CROSS' 160 x 90 ...",
  "dims": { "largo": 160, "ancho": 90 },
  "partes": [
    {
      "id": "TAPA_", "orden": 1, "afectaPrecio": true,
      "etiqueta": "TAPA",
      "acabados": [
        { "valor": 50, "nombre": "PORCELÁNICO BLANCO" },
        { "valor": 51, "nombre": "PORCELÁNICO NEGRO" }
      ]
    },
    {
      "id": "COLOR", "orden": 2, "afectaPrecio": true,
      "etiqueta": "FALDÓN Y EXTENSIBLES LACADOS",
      "fuente": "colores",
      "acabados": [
        { "valor": 6, "nombre": "TEXTURIZADO BLANCO", "categoria": 1 }
      ],
      "metaValores": [ { "valor": 10, "nombre": "<SIN COLOR>" },
                       { "valor": 100, "nombre": "A JUEGO" } ]
    },
    { "id": "PIE", "orden": 3, "etiqueta": "PIE", "acabados": [ "..." ] }
  ]
}
```

El campo `{lang}` selecciona `Valor` / `Valor_fr` / `Valor_en` (y
`AsociadoA*`), con fallback a español.

Consulta base:

```sql
SELECT ca.CodCualidad, ca.Orden, ca.Requerida, ca.AfectaPrecio,
       ca.AsociadoA, ca.AsociadoA_FR, ca.AsociadoA_EN,
       cav.VALOR, cv.Valor, cv.Valor_fr, cv.Valor_en
FROM (CUALIDAD_ARTICULO_RST ca
  INNER JOIN CUALIDAD_ARTICULO_VALOR_RST cav
    ON ca.Cod_Articulo = cav.MODELO AND ca.CodCualidad = cav.CUALIDAD)
  LEFT JOIN CUALIDADES_VALOR_RST cv
    ON cav.CUALIDAD = cv.CodCualidad AND cav.VALOR = cv.CodValor
WHERE ca.Cod_Articulo = @sku
ORDER BY ca.Orden, cv.Orden
```

(para COLOR, los valores se resuelven contra `colores` y se añaden los
meta-códigos).

### GET `/api/precio?sku=3041&config=COLOR%3D6%3BTAPA_%3D50%3BPIE%3D5%3B&tarifa=A2026`

```json
{
  "sku": "3041",
  "config": "COLOR=6;TAPA_=50;PIE=5;",
  "codPrecio": 5,
  "descripcion": "TAPA PORCELÁNICO SERIE 1. BARNIZADOS Y LACADOS MATE INDESAN",
  "tarifa": "A2026", "moneda": "EUR", "precio": 727.48
}
```

Implementación: parsear `config`, resolver categoría de COLOR en `colores`,
evaluar las `CONDICION` de `MODELOS_TARIFA_RST` del artículo en orden,
tomar el primer `CodPrecio` que cumpla y leer `PRECIOS_TARIFA_RST`.

### Cambios en `simulador3d.jsx`

- `getSimulador(col)` pasa a llamar a `/api/{lang}/simulador/{sku}` (una línea,
  ya previsto en `src/services/simulador.js`).
- El estado de selección se serializa a `codagrupacion` y viceversa
  (`?c=COLOR%3D6%3B...` en la URL para enlaces compartibles).
- El precio se pide a `/api/precio` en cada cambio (con debounce), en la
  tarifa pública del mercado del visitante.

---

## 5. Hub de publicación (fase 2)

El mapeo hacia el esquema `pim` del documento de arquitectura:

| ERP | Hub `pim` |
|---|---|
| ARTICULOS_RST (dims, peso, flags, familia) | `Articulo` |
| ARTICULOS_RST.descripcion/_fr/_en + Articulos_descripciones | `Traduccion` (normalizado) |
| CUALIDADES_RST | `ParteArticulo` + `CaracteristicaDef` |
| CUALIDAD_ARTICULO_RST | configuración de partes por artículo |
| CUALIDAD_ARTICULO_VALOR_RST | `ArticuloAcabado` |
| CUALIDADES_VALOR_RST, colores | `Acabado` (+ textura del DAM) |
| MODELOS_TARIFA_RST + PRECIOS_TARIFA_RST | `Tarifa` + `Precio` (con CodPrecio resuelto) |
| ColeccionArticulo / Colecciones | `Modelo` / colecciones web |
| scan_color_image + Scan_imgs | `Medio` (muestras de color ya escaneadas) |

La publicación (botón en Access → staging → validación → promoción) vuelca
estas tablas; las columnas `_fr`/`_en` se normalizan a filas de `Traduccion`,
lo que da soporte inmediato al alemán sin tocar más columnas.

---

## 6. Errores de datos detectados (argumento para la validación en publicación)

Encontrados solo mirando el artículo 3041 y las tres cualidades:

1. `MODELOS_TARIFA_RST` 3041, CodPrecio 56/57/58 ("PORCELÁNICO SERIE 2"):
   `CONDICION` copiada de la serie 1 (`TAPA_>49;TAPA_<75` en lugar de
   `TAPA_>74;TAPA_<99`) y `coste = -1`. La serie 2 con color muestra/brillo
   probablemente está cobrándose como serie 1.
2. `CUALIDADES_VALOR_RST` PIE=10 "ACERO TEXTURIZADO ARENA": fr/en dicen
   "BLANC / WHITE" (copiados del valor 2).
3. TAPA_=81 "PORCELÁNICO SAHARA BLANCHE": inglés "BLAZE DARK CERAMIC TABLETOP"
   (copiado del 80, que es SAHARA NOIR).
4. Sin traducción fr/en: PIE 11/12, TAPA_ 76/77/82 (o con el español como
   relleno).
5. No existe alemán en ninguna tabla; `Languages` tiene 4 registros
   (verificar cuáles).

Estas erratas llegan hoy directamente a tarifas y documentos. Las reglas de
validación de la fase de publicación (traducciones obligatorias, CONDICION
solapadas o huecas, costes negativos) las detectarían automáticamente.

---

## 7. Convenciones de los modelos 3D (Blender → GLB)

- Un `.blend` por familia de modelo; las variantes de medida se derivan
  dentro del mismo fichero. Se exporta **un GLB por artículo**:
  `static/modelos3d/{sku}.glb` en la API Node (campo `modelo3d`).
- **Nombres de malla = ids de cualidad del ERP**: `TAPA_`, `PIE`, `COLOR`.
  Piezas múltiples con punto: `COLOR.faldon`, `COLOR.extensible`.
- Escala real en metros, mesa apoyada en Y=0, centrada en el origen.
- **Sin materiales definitivos**: los aplica el visor desde la biblioteca
  global de acabados (un acabado = un set de texturas, compartido por
  todas las colecciones).
- **Direccionalidad de la veta: se decide en las UVs de cada malla**
  (eje U = dirección de la veta). Es fija por modelo/parte; no existe
  como opción en el ERP ni en el visor.
- UVs con densidad de texel uniforme entre modelos, para que el grano
  del acabado se vea al mismo tamaño en toda la gama.
- Cantos con bisel de 1–2 mm (atrapan brillos; evitan el aspecto CAD).
- Export glTF 2.0 `.glb`, Apply Modifiers, compresión Draco, sin texturas
  incrustadas. Objetivo < 2–3 MB.

## 8. Fases concretas

1. **Endpoint simulador + precio** en la API ASP.NET actual leyendo el Access
   (o su réplica SQL Server si ya existe), portando el parser de CONDICION
   con tests contra el ERP.
2. **Conectar `simulador3d.jsx`** a los endpoints y serializar codagrupacion.
   Texturas: empezar con las muestras de `scan_color_image` como swatches.
3. **Hub de publicación** (staging + validaciones + `Traduccion`), corrección
   de los errores del §6, alta del alemán.
4. **Generadores** de tarifa/catálogo desde el hub (ya diseñados en el
   documento de arquitectura).
