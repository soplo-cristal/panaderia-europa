# Panadería El Europa

Sitio web de una sola página para la panadería **El Europa** (abierta en 2022, solo pan,
sin repostería). Estructura y estilo inspirados en sitios de panadería mexicanos:
barra superior, menú fijo con buscador, hero a sangre completa, franja de garantías,
historia, catálogo, blog, sucursal con horarios en vivo, formulario de encargo,
footer de columnas y aviso de cookies.

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

- **Pan, precios y descripciones**: array `PANES` al principio de `assets/js/main.js`.
  Cada pan indica una `forma` que corresponde a una ilustración SVG del objeto `FORMAS`
  (`bolillo`, `telera`, `baguette`, `hogaza`, `molde`, `trenza`). Los precios están en
  pesos mexicanos (`Intl.NumberFormat('es-MX')`); cambia esa línea para otra moneda.
- **Horarios**: hay dos lugares que deben coincidir — la tabla de `index.html` (lo que
  se lee) y el objeto `HORARIO` de `main.js` (lo que calcula el letrero de
  abierto/cerrado y bloquea los lunes en el formulario).
- **Dirección, teléfono y correo**: en las secciones `#sucursal` y `#encargo`, en la
  barra superior y en el pie de `index.html`.
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

- `hero.jpg` — portada
- `obrador-1.jpg`, `obrador-2.jpg` — sección "Nosotros"
- `blog-muerto.jpg`, `blog-rosca.jpg`, `blog-cuernito.jpg` — tarjetas del blog
- `pan-*.jpg` — una por producto del catálogo

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
