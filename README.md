# Panadería Europa

Sitio web de una sola página para Panadería Europa: catálogo de panes, proceso de
elaboración, horarios con indicador de abierto/cerrado en tiempo real y formulario
de encargos con validación.

## Estructura

```
index.html            Página completa (secciones: inicio, panes, proceso, horarios, contacto)
assets/css/styles.css Estilos (paleta cálida, diseño adaptable, modo de movimiento reducido)
assets/js/main.js     Catálogo de panes, menú móvil, estado de apertura y validación del formulario
```

## Cómo verla en local

No hay dependencias ni paso de compilación. Basta con abrir `index.html`, o servirla:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Cómo editar el contenido

- **Panes, precios y descripciones**: array `PANES` al principio de `assets/js/main.js`.
  Cada pan indica una `forma` que se corresponde con una ilustración SVG del objeto `FORMAS`.
- **Horarios**: hay dos sitios que deben coincidir — la tabla de `index.html`
  (lo que se lee) y el objeto `HORARIO` de `main.js` (lo que calcula el indicador
  de abierto/cerrado y bloquea los lunes en el formulario).
- **Dirección, teléfono y correo**: en la sección `#contacto` y en el pie de `index.html`.

## Formulario de encargos

Hoy la validación y la confirmación son solo de cliente: no se envía nada a ningún
servidor. Para recibir los encargos de verdad hay que apuntar el `submit` de
`activarFormulario()` a un backend o a un servicio de formularios.

## Publicación

Es estático, así que sirve cualquier hosting de ficheros. Para GitHub Pages:
Settings → Pages → Deploy from a branch, y elegir la rama y la carpeta raíz.
