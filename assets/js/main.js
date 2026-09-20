/* Panadería El Europa — catálogo, buscador, horarios y encargos */

// --- Rellenos del croissant -------------------------------------------------

const RELLENOS = [
  { id: 'jamon',     nombre: 'Jamón y queso',       tipo: 'salado', precio: 25, nota: 'El salado de la casa. Se hornea con el queso adentro.' },
  { id: 'turin',     nombre: 'Chocolate Turín',     tipo: 'dulce',  nota: 'Chocolate Turín derretido, generoso.' },
  { id: 'magnum',    nombre: 'Paleta Magnum',       tipo: 'dulce',  precio: 45, nota: 'La paleta entera dentro del croissant.' },
  { id: 'fresas',    nombre: 'Fresas con crema',    tipo: 'dulce',  nota: 'Fresa natural y crema batida, al momento.' },
  { id: 'frambuesa', nombre: 'Frambuesa con queso', tipo: 'dulce',  nota: 'Frambuesa y queso crema, dulce y ácido.' },
  { id: 'rojos',     nombre: 'Frutos rojos',        tipo: 'dulce',  nota: 'Mezcla de frutos rojos de temporada.' },
  { id: 'pastelera', nombre: 'Crema pastelera',     tipo: 'dulce',  nota: 'Hecha en casa, con vainilla.' },
  { id: 'cajeta',    nombre: 'Cajeta',              tipo: 'dulce',  nota: 'Cajeta quemada, para los golosos.' },
  { id: 'pina',      nombre: 'Piña',                tipo: 'dulce',  nota: 'Piña cocida en su jugo, nada empalagosa.' }
];



// --- Catálogo (fotos reales de la panadería) --------------------------------

const PANES = [
  {
    id: 'chocolatin',
    nombre: 'Chocolatín',
    etiqueta: 'La especialidad',
    descripcion: 'Masa laminada con mantequilla, enrollada sobre su barra de chocolate. Lo que mejor hacemos.',
    precio: 20,
    peso: '85 g',
    foto: 'pan-chocolatin.jpg'
  },
  {
    id: 'croissant',
    nombre: 'Croissant',
    etiqueta: 'La especialidad',
    descripcion: 'Laminado a mano, enrollado uno por uno y horneado hasta que truena al partirlo.',
    precio: 20,
    peso: '80 g',
    foto: 'pan-croissant.jpg'
  },
  {
    id: 'croissant-relleno',
    nombre: 'Croissant relleno',
    etiqueta: 'Elige tu relleno',
    descripcion: 'El mismo croissant, relleno de lo que pidas. Nueve rellenos a elegir y ninguno cuesta extra.',
    precio: 20,
    peso: '1 pieza',
    foto: 'pan-relleno.jpg',
    rellenable: true
  },
  {
    id: 'concha',
    nombre: 'Concha',
    etiqueta: null,
    descripcion: 'Masa suave y costra de vainilla marcada una por una.',
    precio: 16,
    peso: '90 g',
    foto: 'pan-concha.jpg'
  },
  {
    id: 'concha-choco',
    nombre: 'Concha de chocolate',
    etiqueta: null,
    descripcion: 'La misma masa con costra de chocolate. También la hacemos mitad y mitad.',
    precio: 16,
    peso: '90 g',
    foto: 'pan-concha-choco.jpg'
  },
  {
    id: 'oreja',
    nombre: 'Oreja',
    etiqueta: null,
    descripcion: 'Hojaldre doblado y caramelizado en el horno, del mismo laminado que el croissant.',
    precio: 16,
    peso: '60 g',
    foto: 'pan-oreja.jpg'
  },
  {
    id: 'bolillo',
    nombre: 'Bolillo',
    etiqueta: 'Pan de sal',
    descripcion: 'Corteza delgada y crujiente, miga blanca. El de la torta de siempre.',
    precio: 4,
    peso: '90 g',
    foto: 'pan-bolillo.jpg'
  },
  {
    id: 'muerto',
    nombre: 'Pan de muerto',
    etiqueta: 'Temporada',
    descripcion: 'Con su azúcar encima y aroma de azahar. De octubre a principios de noviembre.',
    foto: 'pan-muerto.jpg',
    variantes: [
      { id: 'normal',  nombre: 'Normal',  precio: 22 },
      { id: 'relleno', nombre: 'Relleno', precio: 25 }
    ]
  },
  {
    id: 'rosca',
    nombre: 'Rosca de reyes',
    etiqueta: 'Temporada',
    descripcion: 'Rellena, con su muñequito. En enero y solo por encargo anticipado.',
    foto: 'pan-rosca.jpg',
    variantes: [
      { id: 'chica',   nombre: 'Chica',   precio: 120 },
      { id: 'mediana', nombre: 'Mediana', precio: 180 }
    ]
  }
];

const MXN = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

// Un pan puede tener varias versiones (tamaño, relleno). El formulario las trata
// como opciones independientes, con el valor "idDelPan:idDeLaVariante".
function opcionesDePan(pan) {
  return pan.variantes
    ? pan.variantes.map((v) => ({
        valor: `${pan.id}:${v.id}`,
        etiqueta: `${pan.nombre} ${v.nombre.toLowerCase()}`,
        precio: v.precio
      }))
    : [{ valor: pan.id, etiqueta: pan.nombre, precio: pan.precio }];
}

function buscarOpcion(valor) {
  const [idPan] = String(valor).split(':');
  const pan = PANES.find((p) => p.id === idPan);
  if (!pan) return null;
  const opcion = opcionesDePan(pan).find((o) => o.valor === valor);
  return opcion ? { pan, ...opcion } : null;
}

function precios(pan) {
  return pan.variantes
    ? pan.variantes.map((v) => `<span class="variante">${v.nombre} <b>${MXN.format(v.precio)}</b></span>`).join('')
    : `<span class="price">${MXN.format(pan.precio)}</span>`;
}

function tarjeta(pan) {
  return `
    <li class="bread-card" data-id="${pan.id}">
      <img class="art" src="assets/img/${pan.foto}" alt="${pan.nombre} de Panadería El Europa"
           width="700" height="525" loading="lazy" decoding="async">
      <span class="tag${pan.etiqueta ? '' : ' tag-empty'}" ${pan.etiqueta ? '' : 'aria-hidden="true"'}>${pan.etiqueta || '—'}</span>
      <h3>${pan.nombre}</h3>
      <p class="desc">${pan.descripcion}</p>
      <div class="meta${pan.variantes ? ' meta-variantes' : ''}">
        ${precios(pan)}
        ${pan.peso ? `<span class="weight">${pan.peso}</span>` : ''}
      </div>
    </li>`;
}

function pintarRellenos() {
  const grid = document.getElementById('relleno-grid');
  if (!grid) return;

  grid.innerHTML = RELLENOS.map((r) => `
    <li class="relleno relleno-${r.tipo}" data-relleno="${r.id}">
      <h3>${r.nombre}</h3>
      <p>${r.nota}</p>
      ${r.precio ? `<span class="relleno-precio">${MXN.format(r.precio)} la pieza</span>` : ''}
      ${r.tipo === 'salado' ? '<span class="relleno-tipo">Salado</span>' : ''}
    </li>`).join('');
}

function pintarPanes(lista = PANES) {
  const grid = document.getElementById('bread-grid');
  const vacio = document.getElementById('empty-msg');
  if (!grid) return;

  grid.innerHTML = lista.map(tarjeta).join('');
  if (vacio) vacio.hidden = lista.length > 0;
}

function rellenarSelector() {
  const select = document.getElementById('pan');
  if (!select) return;

  select.innerHTML =
    '<option value="">Elige un pan…</option>' +
    PANES.flatMap(opcionesDePan)
      .map((o) => `<option value="${o.valor}">${o.etiqueta} — ${MXN.format(o.precio)}</option>`)
      .join('');
}

// --- Buscador ---------------------------------------------------------------

function normalizar(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

function activarBuscador() {
  const toggle = document.getElementById('search-toggle');
  const panel = document.getElementById('search-panel');
  const input = document.getElementById('search-input');
  const hint = document.getElementById('search-hint');
  if (!toggle || !panel || !input) return;

  toggle.addEventListener('click', () => {
    const abierto = panel.hidden;
    panel.hidden = !abierto;
    toggle.setAttribute('aria-expanded', String(abierto));
    if (abierto) input.focus();
  });

  input.addEventListener('input', () => {
    const q = normalizar(input.value);
    const lista = q
      ? PANES.filter((pan) =>
          normalizar(
            `${pan.nombre} ${pan.descripcion} ${pan.etiqueta || ''} ` +
            (pan.variantes || []).map((v) => v.nombre).join(' ')
          ).includes(q)
        )
      : PANES;

    pintarPanes(lista);
    if (hint) {
      hint.textContent = q
        ? `${lista.length} ${lista.length === 1 ? 'pan encontrado' : 'panes encontrados'}.`
        : 'Escribe para filtrar el pan del día.';
    }
    if (q) document.getElementById('panes')?.scrollIntoView({ block: 'start' });
  });

  input.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      input.value = '';
      pintarPanes();
      panel.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
}

// --- Menú en móvil ----------------------------------------------------------

function activarMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav-menu');
  if (!toggle || !nav) return;

  const cerrar = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const abierto = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(abierto));
  });

  nav.addEventListener('click', (ev) => {
    if (ev.target.closest('a')) cerrar();
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') cerrar();
  });
}

// --- ¿Estamos abiertos? -----------------------------------------------------

// Minutos desde medianoche, por día de la semana (0 = domingo).
const HORARIO = {
  0: [[8 * 60, 13 * 60 + 30]],
  1: [],
  2: [[7 * 60, 14 * 60], [17 * 60, 20 * 60]],
  3: [[7 * 60, 14 * 60], [17 * 60, 20 * 60]],
  4: [[7 * 60, 14 * 60], [17 * 60, 20 * 60]],
  5: [[7 * 60, 14 * 60], [17 * 60, 20 * 60]],
  6: [[7 * 60, 14 * 60]]
};

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

function comoHora(minutos) {
  const h = String(Math.floor(minutos / 60)).padStart(2, '0');
  const m = String(minutos % 60).padStart(2, '0');
  return `${h}:${m}`;
}

function proximaApertura(dia, minutosAhora) {
  for (let salto = 0; salto < 8; salto++) {
    const d = (dia + salto) % 7;
    for (const [inicio] of HORARIO[d]) {
      if (salto > 0 || inicio > minutosAhora) {
        if (salto === 0) return `hoy a las ${comoHora(inicio)}`;
        if (salto === 1) return `mañana a las ${comoHora(inicio)}`;
        return `el ${DIAS[d]} a las ${comoHora(inicio)}`;
      }
    }
  }
  return null;
}

function actualizarEstado(ahora = new Date()) {
  const caja = document.getElementById('estado-tienda');
  if (!caja) return;

  const dia = ahora.getDay();
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  const tramo = HORARIO[dia].find(([inicio, fin]) => minutos >= inicio && minutos < fin);

  caja.classList.remove('is-open', 'is-closed');

  if (tramo) {
    caja.classList.add('is-open');
    caja.textContent = `Tomando pedidos · hasta las ${comoHora(tramo[1])}`;
  } else {
    caja.classList.add('is-closed');
    const siguiente = proximaApertura(dia, minutos);
    caja.textContent = siguiente
      ? `Fuera de horario · contestamos ${siguiente}`
      : 'Fuera de horario';
  }
}

// --- Formulario de encargos -------------------------------------------------

function hoyISO() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

const REGLAS = {
  nombre: (v) => (v.trim().length >= 2 ? '' : 'Escribe tu nombre.'),
  telefono: (v) =>
    /^[+()\d\s-]{9,}$/.test(v.trim()) ? '' : 'Necesitamos un teléfono para confirmarte el encargo.',
  pan: (v) => (v ? '' : 'Elige qué pan quieres.'),
  cantidad: (v) => {
    const n = Number(v);
    if (!Number.isInteger(n) || n < 1) return 'La cantidad mínima es 1.';
    if (n > 50) return 'Para más de 50 piezas, llámanos.';
    return '';
  },
  fecha: (v) => {
    if (!v) return 'Dinos qué día lo recoges.';
    if (v < hoyISO()) return 'Elige una fecha de hoy en adelante.';
    if (HORARIO[new Date(`${v}T12:00:00`).getDay()].length === 0) return 'Los lunes cerramos, elige otro día.';
    return '';
  }
};

function mostrarError(campo, mensaje) {
  const salida = document.querySelector(`[data-error-for="${campo.name}"]`);
  if (salida) salida.textContent = mensaje;
  if (mensaje) campo.setAttribute('aria-invalid', 'true');
  else campo.removeAttribute('aria-invalid');
}

function activarRellenoEnFormulario(form) {
  const campo = document.getElementById('campo-relleno');
  const select = form.elements.relleno;
  if (!campo || !select) return;

  select.innerHTML = RELLENOS.map(
    (r) => `<option value="${r.id}">${r.nombre}${r.precio ? ` — ${MXN.format(r.precio)}` : ''}</option>`
  ).join('');

  const revisar = () => {
    const opcion = buscarOpcion(form.elements.pan.value);
    campo.hidden = !(opcion && opcion.pan.rellenable);
  };
  revisar();
  form.elements.pan.addEventListener('change', revisar);
}

function activarFormulario() {
  const form = document.getElementById('order-form');
  if (!form) return;

  const estado = document.getElementById('form-status');
  activarRellenoEnFormulario(form);
  const fecha = form.elements.fecha;
  if (fecha) {
    fecha.min = hoyISO();
    fecha.value = hoyISO();
  }

  Object.keys(REGLAS).forEach((nombre) => {
    const campo = form.elements[nombre];
    if (!campo) return;
    campo.addEventListener('blur', () => mostrarError(campo, REGLAS[nombre](campo.value)));
    campo.addEventListener('input', () => {
      if (campo.getAttribute('aria-invalid') === 'true') mostrarError(campo, REGLAS[nombre](campo.value));
    });
  });

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let primerFallo = null;
    Object.keys(REGLAS).forEach((nombre) => {
      const campo = form.elements[nombre];
      if (!campo) return;
      const mensaje = REGLAS[nombre](campo.value);
      mostrarError(campo, mensaje);
      if (mensaje && !primerFallo) primerFallo = campo;
    });

    if (primerFallo) {
      estado.className = 'form-status err';
      estado.textContent = 'Revisa los campos marcados.';
      primerFallo.focus();
      return;
    }

    const opcion = buscarOpcion(form.elements.pan.value);
    const cantidad = Number(form.elements.cantidad.value);
    const relleno = opcion.pan.rellenable
      ? RELLENOS.find((r) => r.id === form.elements.relleno.value)
      : null;
    // Casi todos los rellenos van incluidos en el precio del croissant, pero
    // alguno (jamón y queso, Magnum) tiene el suyo y sustituye al del pan.
    const total = (relleno && relleno.precio ? relleno.precio : opcion.precio) * cantidad;

    estado.className = 'form-status ok';
    estado.textContent =
      `¡Gracias, ${form.elements.nombre.value.trim()}! Apuntado: ${cantidad} × ${opcion.etiqueta}` +
      `${relleno ? ` con ${relleno.nombre.toLowerCase()}` : ''} (${MXN.format(total)}). ` +
      `Te escribimos al ${form.elements.telefono.value.trim()} para confirmar.`;

    form.reset();
    if (fecha) fecha.value = hoyISO();
  });
}

// --- Volver arriba y cookies ------------------------------------------------

function activarVolverArriba() {
  const boton = document.getElementById('to-top');
  if (!boton) return;

  const revisar = () => { boton.hidden = window.scrollY < 600; };
  revisar();
  window.addEventListener('scroll', revisar, { passive: true });
  boton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function activarCookies() {
  const aviso = document.getElementById('cookies');
  const boton = document.getElementById('cookies-ok');
  if (!aviso || !boton) return;

  let aceptado = false;
  try { aceptado = localStorage.getItem('cookies-ok') === '1'; } catch { /* modo privado */ }

  aviso.hidden = aceptado;
  boton.addEventListener('click', () => {
    aviso.hidden = true;
    try { localStorage.setItem('cookies-ok', '1'); } catch { /* modo privado */ }
  });
}

// --- Arranque ---------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  pintarPanes();
  pintarRellenos();
  rellenarSelector();
  activarBuscador();
  activarMenu();
  actualizarEstado();
  activarFormulario();
  activarVolverArriba();
  activarCookies();
  setInterval(() => actualizarEstado(), 60000);
});
