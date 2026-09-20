# Panadería El Europa

Sitio web de una sola página para la panadería **El Europa** (desde 2022). No hay
sucursal: todo se hornea por encargo. La especialidad son los **chocolatines** y los
**croissants rellenos**, ambos a precio único de $20 con cualquiera de los nueve
rellenos, además del pan dulce de diario y el de temporada.

Secciones: barra superior, menú fijo con buscador, portada, franja de ventajas,
historia, catálogo, rellenos, proceso, blog, cómo pedir, formulario de encargo,
pie de columnas y aviso de cookies.

HTML, CSS y JavaScript puros: sin dependencias ni paso de compilación.

## Estructura

```
index.html            Página completa
assets/css/styles.css Estilos (paleta del logo: café #723602 y ámbar #ffb748)
assets/img/            Logo, favicon y fotos de la panadería
assets/js/main.js     Catálogo, buscador, horarios, formulario, cookies, volver arriba
```

## Cómo verla en local

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Cómo editar el contenido

- **Rellenos del croissant**: array `RELLENOS` al principio de `assets/js/main.js`.
  Alimentan la sección "Elige tu relleno" y el selector que aparece en el formulario
  cuando se encarga un croissant relleno (el pan lo activa con `rellenable: true`).
  Ningún relleno cobra extra: el total del encargo es precio × cantidad. Si algún día
  alguno cuesta más, hay que volver a añadirle un campo de recargo y sumarlo al total.
- **Pan, precios y descripciones**: array `PANES` al principio de `assets/js/main.js`.
  Un pan con varias versiones (la rosca por tamaño, el pan de muerto normal o relleno)
  lleva un array `variantes` en vez de `precio`; la tarjeta muestra todas y el
  formulario las ofrece como opciones sueltas, con el valor `idPan:idVariante`.
  Cada pan indica una `forma` que corresponde a una ilustración SVG del objeto `FORMAS`
  (`bolillo`, `telera`, `baguette`, `hogaza`, `molde`, `trenza`). Los precios están en
  pesos mexicanos (`Intl.NumberFormat('es-MX')`); cambia esa línea para otra moneda.
- **Horario de atención**: objeto `HORARIO` de `main.js`. Calcula el letrero de
  "tomando pedidos / fuera de horario" y bloquea los lunes en el formulario.
- **Teléfono, WhatsApp y correo**: en las secciones `#pedidos` y `#encargo` y en el
  pie de `index.html` (los enlaces `wa.me/` llevan el número sin espacios).
- **Blog**: las tres tarjetas están escritas directamente en el HTML, dentro de `#blog`.

## Logo y colores

El logo está en `assets/img/logo.jpg` y se usa en la cabecera, el hero y el pie.
De él salen los colores de la marca, definidos en `:root` de `styles.css`:
`--brand: #723602` (café) y `--amber: #ffb748`. `favicon.png` y
`apple-touch-icon.png` se generaron a partir del mismo archivo; si cambias el
logo, vuelve a generarlos en 64 y 180 píxeles.

## Fotos

Las fotos son de la propia panadería (extraídas de los PDF que mandó el dueño,
recortadas y optimizadas para web). Están en `assets/img/`:

- `hero.jpg` — portada (croissants)
- `rellenos.jpg` — sección de rellenos
- `blog-muerto.jpg`, `blog-rosca.jpg`, `blog-cuernito.jpg` — tarjetas del blog
- `pan-*.jpg` — una por producto del catálogo
- `obrador-1.jpg` (chocolatines crudos) y `obrador-2.jpg` (croissants horneados)

Las de portada, obrador y blog se asignan por CSS (`[data-photo="…"]`); las de
producto van en el campo `foto` de cada pan en `main.js`. Para cambiar una,
basta con sustituir el archivo respetando el nombre y una proporción parecida
(16:9 la portada, 4:3 las de producto, 16:10 las del blog).

## Formulario de encargos

La validación y la confirmación son solo de cliente: **no se envía nada a ningún
servidor**. Para recibir los encargos de verdad hay que apuntar el `submit` de
`activarFormulario()` a un backend o a un servicio de formularios.

## Publicación

Es estático, así que sirve cualquier hosting. Para GitHub Pages:
Settings → Pages → Deploy from a branch, y elegir la rama y la carpeta raíz.
