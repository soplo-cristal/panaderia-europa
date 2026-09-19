/* Panadería Europa — catálogo, menú, estado de apertura y formulario de encargos */

// --- Catálogo ---------------------------------------------------------------

const PANES = [
  {
    id: 'masa-madre',
    nombre: 'Hogaza de masa madre',
    etiqueta: 'El de siempre',
    descripcion: 'Harina de trigo molida a la piedra, 36 horas de frío. Corteza gruesa y miga húmeda.',
    precio: 4.60,
    peso: '1 kg',
    forma: 'hogaza'
  },
  {
    id: 'baguette',
    nombre: 'Baguette tradición',
    etiqueta: null,
    descripcion: 'Masa poco hidratada y greñado a cuchilla. Mejor comerla el mismo día.',
    precio: 1.80,
    peso: '280 g',
    forma: 'baguette'
  },
  {
    id: 'centeno',
    nombre: 'Pan de centeno y semillas',
    etiqueta: 'Integral',
    descripcion: '80 % centeno con lino, girasol y sésamo. Denso, aromático y aguanta toda la semana.',
    precio: 5.20,
    peso: '900 g',
    forma: 'molde'
  },
  {
    id: 'croissant',
    nombre: 'Croissant de mantequilla',
    etiqueta: null,
    descripcion: 'Laminado a mano con mantequilla de pasto. Sale del horno a las 7:00 y a las 11:30.',
    precio: 1.95,
    peso: '85 g',
    forma: 'croissant'
  },
  {
    id: 'especial',
    nombre: 'Hornada especial',
    etiqueta: 'Cada semana',
    descripcion: 'Esta semana: trenza de espelta con nueces y pasas. Cantidad limitada, se reserva.',
    precio: 6.40,
    peso: '750 g',
    forma: 'trenza'
  }
];

const FORMAS = {
  hogaza: `<svg viewBox="0 0 120 100" aria-hidden="true">
    <ellipse cx="60" cy="60" rx="48" ry="34" fill="#d9a05b"/>
    <ellipse cx="60" cy="55" rx="48" ry="32" fill="#e3b374"/>
    <g stroke="#8b5424" stroke-width="4" stroke-linecap="round" opacity=".7">
      <path d="M36 44l-7 20"/><path d="M53 40l-7 24"/><path d="M70 40l-7 24"/><path d="M87 44l-7 20"/>
    </g>
  </svg>`,
  baguette: `<svg viewBox="0 0 120 100" aria-hidden="true">
    <rect x="12" y="38" width="96" height="26" rx="13" fill="#e3b374"/>
    <path d="M12 51h96" stroke="#d9a05b" stroke-width="26" stroke-linecap="round" opacity=".35"/>
    <g stroke="#8b5424" stroke-width="3.5" stroke-linecap="round" opacity=".75">
      <path d="M28 46l8 9"/><path d="M48 44l8 11"/><path d="M68 44l8 11"/><path d="M88 46l8 9"/>
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
  croissant: `<svg viewBox="0 0 120 100" aria-hidden="true">
    <path d="M22 66c6-22 22-34 38-34s32 12 38 34c-10-6-20-4-26 2-8-8-16-8-24 0-6-6-16-8-26-2z" fill="#e3b374"/>
    <path d="M42 40c6 6 8 14 6 24M60 34c2 8 2 18-2 26M78 40c-6 6-8 14-6 24" stroke="#b8793a" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".75"/>
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

const EUR_FMT = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

function pintarPanes() {
  const grid = document.getElementById('bread-grid');
  if (!grid) return;

  grid.innerHTML = PANES.map((pan) => `
    <li class="bread-card">
      <div class="art">${FORMAS[pan.forma] || ''}</div>
      ${pan.etiqueta ? `<span class="tag">${pan.etiqueta}</span>` : ''}
      <h3>${pan.nombre}</h3>
      <p class="desc">${pan.descripcion}</p>
      <div class="meta">
        <span class="price">${EUR_FMT.format(pan.precio)}</span>
        <span class="weight">${pan.peso}</span>
      </div>
    </li>
  `).join('');
}

function rellenarSelector() {
  const select = document.getElementById('pan');
  if (!select) return;

  select.innerHTML =
    '<option value="">Elige un pan…</option>' +
    PANES.map((pan) => `<option value="${pan.id}">${pan.nombre} — ${EUR_FMT.format(pan.precio)}</option>`).join('');
}

// --- Menú en móvil ---------------------------------------------------------

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

// --- ¿Estamos abiertos? ----------------------------------------------------

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

// --- Formulario de encargos ------------------------------------------------

function hoyISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - offset).toISOString().slice(0, 10);
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
    const dia = new Date(`${v}T12:00:00`).getDay();
    if (HORARIO[dia].length === 0) return 'Los lunes está cerrado, elige otro día.';
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
      if (campo.getAttribute('aria-invalid') === 'true') {
        mostrarError(campo, REGLAS[nombre](campo.value));
      }
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
    const total = EUR_FMT.format(pan.precio * cantidad);

    estado.className = 'form-status ok';
    estado.textContent =
      `¡Gracias, ${form.elements.nombre.value.trim()}! Apuntado: ${cantidad} × ${pan.nombre} (${total}). ` +
      `Te llamamos al ${form.elements.telefono.value.trim()} para confirmar.`;

    form.reset();
    if (fecha) fecha.value = hoyISO();
  });
}

// --- Arranque --------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  pintarPanes();
  rellenarSelector();
  activarMenu();
  actualizarEstado();
  activarFormulario();
  setInterval(() => actualizarEstado(), 60000);
});
