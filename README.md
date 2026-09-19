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
assets/css/styles.css Estilos (paleta vino/kraft/crema, adaptable a móvil)
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

## Fotos

Las imágenes son marcadores de posición hechos con gradientes. Para poner fotos reales,
guárdalas en `assets/img/` y añade en `styles.css`:

```css
[data-photo="hero"]   { background-image: url("../img/hero.jpg"); }
[data-photo="tienda"] { background-image: url("../img/tienda.jpg"); }
[data-photo="horno"]  { background-image: url("../img/horno.jpg"); }
[data-photo="post1"]  { background-image: url("../img/post1.jpg"); }
```

Los marcadores son `hero`, `tienda`, `horno`, `post1`, `post2` y `post3`.

## Formulario de encargos

La validación y la confirmación son solo de cliente: **no se envía nada a ningún
servidor**. Para recibir los encargos de verdad hay que apuntar el `submit` de
`activarFormulario()` a un backend o a un servicio de formularios.

## Publicación

Es estático, así que sirve cualquier hosting. Para GitHub Pages:
Settings → Pages → Deploy from a branch, y elegir la rama y la carpeta raíz.
