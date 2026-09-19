/* Panadería El Europa — catálogo, buscador, horarios y encargos */

// --- Catálogo (solo pan) ----------------------------------------------------

const PANES = [
  {
    id: 'bolillo',
    nombre: 'Bolillo',
    etiqueta: 'El de diario',
    descripcion: 'Corteza delgada y crujiente, miga blanca. El de la torta de siempre.',
    precio: 4,
    peso: '90 g',
    forma: 'bolillo'
  },
  {
    id: 'telera',
    nombre: 'Telera',
    etiqueta: null,
    descripcion: 'Blanda y con sus dos surcos marcados. Aguanta bien el relleno.',
    precio: 4.5,
    peso: '100 g',
    forma: 'telera'
  },
  {
    id: 'baguette',
    nombre: 'Baguette tradición',
    etiqueta: null,
    descripcion: 'Masa poco hidratada y greñado a cuchilla. Mejor comerla el mismo día.',
    precio: 32,
    peso: '280 g',
    forma: 'baguette'
  },
  {
    id: 'masa-madre',
    nombre: 'Hogaza de masa madre',
    etiqueta: 'La favorita',
    descripcion: 'Harina de trigo molida a la piedra y 36 horas de frío. Corteza gruesa, miga húmeda.',
    precio: 75,
    peso: '1 kg',
    forma: 'hogaza'
  },
  {
    id: 'centeno',
    nombre: 'Pan de centeno y semillas',
    etiqueta: 'Integral',
    descripcion: '80 % centeno con linaza, girasol y ajonjolí. Denso y aguanta toda la semana.',
    precio: 85,
    peso: '900 g',
    forma: 'molde'
  },
  {
    id: 'especial',
    nombre: 'Hornada especial',
    etiqueta: 'Cada semana',
    descripcion: 'Esta semana: trenza de espelta con nuez. Cantidad limitada, se aparta.',
    precio: 95,
    peso: '750 g',
    forma: 'trenza'
  }
];

const FORMAS = {
  bolillo: `<svg viewBox="0 0 120 100" aria-hidden="true">
    <ellipse cx="60" cy="52" rx="44" ry="21" fill="#e3b374"/>
    <path d="M22 52c10-8 24-12 38-12s28 4 38 12" fill="none" stroke="#d9a05b" stroke-width="10" stroke-linecap="round"/>
    <path d="M34 48h52" stroke="#8b5424" stroke-width="4" stroke-linecap="round" opacity=".75"/>
  </svg>`,
  telera: `<svg viewBox="0 0 120 100" aria-hidden="true">
    <ellipse cx="60" cy="52" rx="46" ry="23" fill="#e8c08a"/>
    <g stroke="#b8793a" stroke-width="4" stroke-linecap="round" opacity=".8">
      <path d="M32 44h56"/><path d="M32 60h56"/>
    </g>
  </svg>`,
  baguette: `<svg viewBox="0 0 120 100" aria-hidden="true">
    <rect x="12" y="38" width="96" height="26" rx="13" fill="#e3b374"/>
    <path d="M12 51h96" stroke="#d9a05b" stroke-width="26" stroke-linecap="round" opacity=".35"/>
    <g stroke="#8b5424" stroke-width="3.5" stroke-linecap="round" opacity=".75">
      <path d="M28 46l8 9"/><path d="M48 44l8 11"/><path d="M68 44l8 11"/><path d="M88 46l8 9"/>
    </g>
  </svg>`,
  hogaza: `<svg viewBox="0 0 120 100" aria-hidden="true">
    <ellipse cx="60" cy="60" rx="48" ry="34" fill="#d9a05b"/>
    <ellipse cx="60" cy="55" rx="48" ry="32" fill="#e3b374"/>
    <g stroke="#8b5424" stroke-width="4" stroke-linecap="round" opacity=".7">
      <path d="M36 44l-7 20"/><path d="M53 40l-7 24"/><path d="M70 40l-7 24"/><path d="M87 44l-7 20"/>
    </g>
  </svg>`,
  molde: `<svg viewBox="0 0 120 100" aria-hidden="true">
    <path d="M24 70V44c0-12 16-18 36-18s36 6 36 18v26z" fill="#c98f4e"/>
    <path d="M24 66V44c0-12 16-18 36-18s36 6 36 18v22z" fill="#dda86a"/>
    <g fill="#6d431c" opacity=".7">
      <circle cx="46" cy="42" r="2.6"/><circle cx="62" cy="36" r="2.6"/>
      <circle cx="76" cy="44" r="2.6"/><circle cx="58" cy="50" r="2.6"/>
      <circle cx="40" cy="55" r="2.6"/><circle cx="80" cy="57" r="2.6"/>
    </g>
  </svg>`,
  trenza: `<svg viewBox="0 0 120 100" aria-hidden="true">
    <g stroke="#e3b374" stroke-width="20" stroke-linecap="round" fill="none">
      <path d="M20 56c14-14 26 14 40 0s26 14 40 0"/>
    </g>
    <g stroke="#c98f4e" stroke-width="5" stroke-linecap="round" fill="none" opacity=".8">
      <path d="M20 56c14-14 26 14 40 0s26 14 40 0"/>
    </g>
    <g fill="#7a4a1e" opacity=".65">
      <circle cx="38" cy="50" r="2.4"/><circle cx="60" cy="56" r="2.4"/><circle cx="82" cy="50" r="2.4"/>
    </g>
  </svg>`
};

const MXN = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

function tarjeta(pan) {
  return `
    <li class="bread-card" data-id="${pan.id}">
      <div class="art">${FORMAS[pan.forma] || ''}</div>
      <span class="tag${pan.etiqueta ? '' : ' tag-empty'}" ${pan.etiqueta ? '' : 'aria-hidden="true"'}>${pan.etiqueta || '—'}</span>
      <h3>${pan.nombre}</h3>
      <p class="desc">${pan.descripcion}</p>
      <div class="meta">
        <span class="price">${MXN.format(pan.precio)}</span>
        <span class="weight">${pan.peso}</span>
      </div>
    </li>`;
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
    PANES.map((pan) => `<option value="${pan.id}">${pan.nombre} — ${MXN.format(pan.precio)}</option>`).join('');
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
      ? PANES.filter((pan) => normalizar(`${pan.nombre} ${pan.descripcion} ${pan.etiqueta || ''}`).includes(q))
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
    caja.textContent = `Abierto ahora · cerramos a las ${comoHora(tramo[1])}`;
  } else {
    caja.classList.add('is-closed');
    const siguiente = proximaApertura(dia, minutos);
    caja.textContent = siguiente ? `Cerrado · abrimos ${siguiente}` : 'Cerrado';
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

function activarFormulario() {
  const form = document.getElementById('order-form');
  if (!form) return;

  const estado = document.getElementById('form-status');
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

    const pan = PANES.find((p) => p.id === form.elements.pan.value);
    const cantidad = Number(form.elements.cantidad.value);

    estado.className = 'form-status ok';
    estado.textContent =
      `¡Gracias, ${form.elements.nombre.value.trim()}! Apuntado: ${cantidad} × ${pan.nombre} ` +
      `(${MXN.format(pan.precio * cantidad)}). Te llamamos al ${form.elements.telefono.value.trim()} para confirmar.`;

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
  rellenarSelector();
  activarBuscador();
  activarMenu();
  actualizarEstado();
  activarFormulario();
  activarVolverArriba();
  activarCookies();
  setInterval(() => actualizarEstado(), 60000);
});
