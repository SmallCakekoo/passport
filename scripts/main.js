// Configuración de palabras clave y insignias
const claves = {
  ejecutivo: {
    palabra: "liderazgo",
    badge: "badge-ejecutivo-large",
    status: "status-ejecutivo",
  },
  social: {
    palabra: "servicio",
    badge: "badge-social-large",
    status: "status-social",
  },
  oficios: {
    palabra: "práctica",
    badge: "badge-oficios-large",
    status: "status-oficios",
  },
  emprendimiento: {
    palabra: "creatividad",
    badge: "badge-emprendimiento-large",
    status: "status-emprendimiento",
  },
};

// Información de los mundos
const mundosInfo = {
  ejecutivo: {
    titulo: "Mundo Ejecutivo",
    motto: "Lidera, Decide, Transforma",
    imagen: "assets/mundos/ejecutivo.png",
    descripcion:
      "Si tu vocación se enfoca en el mundo corporativo, empresas e instituciones de diferente índole, y sientes que tu proyecto de vida te llama a crecer y contribuir al crecimiento de alguna organización, entonces este es tu lugar para mover la inspiración en otros/as.",
    areas: [
      "El liderazgo de organizaciones y personal",
      "Puestos de gestión de recursos",
      "Toma de decisiones estratégicas",
      "Relaciones públicas",
      "Asesorías organizacionales",
      "Crecimiento y plan carrera en empresas",
    ],
  },
  social: {
    titulo: "Mundo Social",
    motto: "Profesiones al servicio de la vida",
    imagen: "assets/mundos/social.png",
    descripcion:
      "Este mundo convoca a aquellas personas que se sienten llamadas a servir y transformar a las comunidades en las que viven y/o se relacionan. Ven si te permites conocer, escuchar, sentir la historia, el dolor, el amor y las alegrías de las comunidades y está dispuesto a vivir sus luchas y hacer parte de la transformación de sus mundos.",
    areas: [
      "Formulación y ejecución de proyectos sociales",
      "Liderazgo social",
      "Participación en colectivos, grupos sociales, organizaciones no-gubernamentales (ONG)",
      "Gestión y participación desde proyectos y actividades de intervención",
      "Servicios de salud y bienestar",
      "Voluntariados y cooperación internacional",
      "Educación, pedagogía, formación y enseñanza a diversas poblaciones",
    ],
  },
  oficios: {
    titulo: "Mundo Oficios",
    motto: "Maestros de la práctica. La vocación del corazón a la práctica",
    imagen: "assets/mundos/oficios.png",
    descripcion:
      "Este mundo convoca a quienes, con sus manos, saberes y oficios, hacen posible la vida diaria de nuestras comunidades. Personas que transforman, reparan, crean, cuidan, cocinan, construyen y sostienen desde lo práctico y lo esencial. Ven si sientes que tu vocación está en lo concreto, en lo útil, en lo que se hace con destreza, compromiso y amor por los demás.",
    areas: [
      "Oficios de reparación, mantenimiento y construcción",
      "Cocina tradicional y/o comunitaria",
      "Oficios de cuidado (niñez, personas mayores, personas con discapacidad)",
      "Producción artesanal, manualidades y oficios artísticos",
      "Agricultura, jardinería y oficios ligados a la tierra",
      "Transporte, logística y apoyo comunitario",
      "Artistas formados o autodidactas (músicos, bailarines, actores, entre otros)",
    ],
  },
  emprendimiento: {
    titulo: "Mundo Emprendimiento",
    motto: "Crea Sendas, impulsa el crecimiento",
    imagen: "assets/mundos/emprendimiento.png",
    descripcion:
      "Este mundo es para las personas soñadoras que se atreven a transformar ideas en realidades. Si sientes el deseo de crear algo propio, de resolver necesidades, de proponer alternativas o generar impacto a través de proyectos sostenibles, este es tu espacio. Aquí nacen negocios, iniciativas comunitarias, marcas personales y propuestas que abren oportunidades para ti y para otros.",
    areas: [
      "Creación de productos o marcas propias",
      "Negocios digitales",
      "Innovadores y Startups",
      "Desarrolladores de Producto",
      "Creadores de contenido / Influencers",
      "Diseñadores de Marca / Branding",
      "Coach de negocios o vida",
      "Consultores independientes",
      "Freelancers (diseño, programación, marketing, etc.)",
      "Empresarios de impacto social o ambiental",
      "Gestores de innovación y tecnología",
      "Producción y venta de alimentos",
      "Comercio digital / E-commerce",
      "Iniciativas independientes en arte, moda, tecnología, educación",
    ],
  },
};

// Estado de la aplicación
let progreso = {};
let paginaActual = 1;
const totalPaginas = 7;

// Elementos del DOM
const pages = document.querySelectorAll(".page");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageIndicator = document.getElementById("page-indicator");
const openPassportBtn = document.getElementById("open-passport-btn");
const keywordBtn = document.getElementById("keyword-btn");
const helpBtn = document.getElementById("help-btn");
const modal = document.getElementById("modal");
const helpModal = document.getElementById("help-modal");
const mapModal = document.getElementById("map-modal");
const closeModal = document.getElementById("close-modal");
const closeHelp = document.getElementById("close-help");
const closeMap = document.getElementById("close-map");
const submitKeyword = document.getElementById("submit-keyword");
const keywordInput = document.getElementById("keyword-input");
const modalMessage = document.getElementById("modal-message");
const worldInfoModal = document.getElementById("world-info-modal");
const closeWorldInfo = document.getElementById("close-world-info");
const worldInfoContent = document.getElementById("world-info-content");

// Cargar progreso desde localStorage
function cargarProgreso() {
  const guardado = localStorage.getItem("progresoPasaporte");
  if (guardado) {
    progreso = JSON.parse(guardado);
  } else {
    progreso = {
      ejecutivo: false,
      social: false,
      oficios: false,
      emprendimiento: false,
    };
  }
}

// Guardar progreso en localStorage
function guardarProgreso() {
  localStorage.setItem("progresoPasaporte", JSON.stringify(progreso));
}

// Actualizar insignias en todas las páginas
function actualizarInsignias() {
  Object.keys(claves).forEach((mundo) => {
    const badge = document.getElementById(claves[mundo].badge);
    const status = document.getElementById(claves[mundo].status);
    const medal = document.getElementById(`medal-${mundo}`);

    if (progreso[mundo]) {
      // Crear imagen del mundo desbloqueado
      badge.innerHTML = `<img src="${mundosInfo[mundo].imagen}" alt="${mundosInfo[mundo].titulo}" class="world-badge-image">`;
      badge.classList.remove("locked");
      badge.classList.add("unlocked");
      status.textContent = "Desbloqueado";
      status.classList.add("unlocked");
      if (medal) {
        medal.innerHTML = `<img src="${mundosInfo[mundo].imagen}" alt="${mundosInfo[mundo].titulo}" class="world-medal-image">`;
        medal.classList.add("unlocked");
      }
    } else {
      badge.innerHTML = `<img src="${mundosInfo[mundo].imagen}" alt="${mundosInfo[mundo].titulo}" class="world-badge-image locked">`;
      badge.classList.remove("unlocked");
      badge.classList.add("locked");
      status.textContent = "Bloqueado";
      status.classList.remove("unlocked");
      if (medal) {
        medal.innerHTML = `<img src="${mundosInfo[mundo].imagen}" alt="${mundosInfo[mundo].titulo}" class="world-medal-image locked">`;
        medal.classList.remove("unlocked");
      }
    }
  });

  // Actualizar contador de medallas
  actualizarContadorMedallas();
}

// Actualizar contador de medallas
function actualizarContadorMedallas() {
  const medallasObtenidas = Object.values(progreso).filter(
    (valor) => valor
  ).length;
  const totalMedallas = Object.keys(claves).length;

  const contadorElement = document.getElementById("medals-count");
  const totalElement = document.getElementById("total-medals");

  if (contadorElement) {
    contadorElement.textContent = medallasObtenidas;
  }
  if (totalElement) {
    totalElement.textContent = totalMedallas;
  }
}

// Mostrar información de un mundo específico
function mostrarInfoMundo(mundo) {
  const info = mundosInfo[mundo];
  if (!info) return;

  worldInfoContent.innerHTML = `
    <h3>${info.titulo}</h3>
    <p class="world-description">${info.descripcion}</p>
    <div class="world-areas">
      <h4>Puedes estar desde:</h4>
      <ul>
        ${info.areas.map((area) => `<li>${area}</li>`).join("")}
      </ul>
    </div>
  `;

  worldInfoModal.classList.remove("hidden");
}

// Cerrar modal de información de mundos
function cerrarModalInfoMundo() {
  worldInfoModal.classList.add("hidden");
}

// Navegación entre páginas
function mostrarPagina(numero) {
  console.log("Navegando a página:", numero); // Debug

  // Ocultar todas las páginas
  pages.forEach((page) => {
    page.classList.remove("active");
    page.style.display = "none";
  });

  // Mostrar la página actual
  const pagina = document.getElementById(`page-${numero}`);
  if (pagina) {
    pagina.classList.add("active");
    pagina.style.display = "block";
    console.log("Página mostrada:", pagina.id); // Debug
  } else {
    console.error("Página no encontrada:", numero); // Debug
  }

  // Actualizar indicador de página
  pageIndicator.textContent = `${numero} / ${totalPaginas}`;

  // Actualizar estado de botones de navegación
  if (prevBtn) {
    prevBtn.disabled = numero === 1;
    console.log("Botón anterior disabled:", numero === 1); // Debug
  }
  if (nextBtn) {
    nextBtn.disabled = numero === totalPaginas;
    console.log("Botón siguiente disabled:", numero === totalPaginas); // Debug
  }

  // Ocultar navegación en la portada
  const nav = document.querySelector(".page-navigation");
  if (numero === 1) {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }
}

function paginaAnterior() {
  console.log("Botón anterior clickeado, página actual:", paginaActual); // Debug
  if (paginaActual > 1) {
    paginaActual--;
    console.log("Navegando a página anterior:", paginaActual); // Debug
    mostrarPagina(paginaActual);
  }
}

function paginaSiguiente() {
  console.log("Botón siguiente clickeado, página actual:", paginaActual); // Debug
  if (paginaActual < totalPaginas) {
    paginaActual++;
    console.log("Navegando a página siguiente:", paginaActual); // Debug
    mostrarPagina(paginaActual);
  }
}

// Event listeners para navegación
prevBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("Click en botón anterior"); // Debug
  paginaAnterior();
});

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("Click en botón siguiente"); // Debug
  paginaSiguiente();
});

// Event listeners para navegación táctil en móviles
prevBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("Touch en botón anterior"); // Debug
  paginaAnterior();
});

nextBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log("Touch en botón siguiente"); // Debug
  paginaSiguiente();
});

// Navegación con teclado
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    paginaAnterior();
  } else if (e.key === "ArrowRight") {
    paginaSiguiente();
  }
});

// Botón para abrir pasaporte (ir a página 2)
openPassportBtn.addEventListener("click", () => {
  paginaActual = 2;
  mostrarPagina(paginaActual);
});

// Modal de palabra clave, utils
keywordBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  keywordInput.value = "";
  modalMessage.textContent = "";
  keywordInput.focus();
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Modal de ayuda
helpBtn.addEventListener("click", () => {
  helpModal.classList.remove("hidden");
});

closeHelp.addEventListener("click", () => {
  helpModal.classList.add("hidden");
});

// Modal del mapa
document.getElementById("show-map-btn").addEventListener("click", () => {
  mapModal.classList.remove("hidden");
});

closeMap.addEventListener("click", () => {
  mapModal.classList.add("hidden");
});

// Cerrar modales haciendo clic fuera
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
  if (e.target === helpModal) {
    helpModal.classList.add("hidden");
  }
  if (e.target === mapModal) {
    mapModal.classList.add("hidden");
  }
  if (e.target === worldInfoModal) {
    cerrarModalInfoMundo();
  }
});

// Enviar palabra clave
submitKeyword.addEventListener("click", verificarPalabra);
keywordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    verificarPalabra();
  }
});

function verificarPalabra() {
  const valor = keywordInput.value.trim().toLowerCase();
  let encontrado = false;

  Object.keys(claves).forEach((mundo) => {
    if (valor === claves[mundo].palabra && !progreso[mundo]) {
      progreso[mundo] = true;
      guardarProgreso();
      actualizarInsignias();

      const nombreMundo = mundo.charAt(0).toUpperCase() + mundo.slice(1);
      modalMessage.textContent = `¡Insignia de ${nombreMundo} desbloqueada!`;
      modalMessage.style.color = "var(--green)";

      encontrado = true;

      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 2000);
    }
  });

  if (!encontrado) {
    modalMessage.textContent = "Palabra incorrecta o ya ingresada.";
    modalMessage.style.color = "var(--accent-pink)";
  }
}

// Botón de reinicio
document.getElementById("restart-btn").addEventListener("click", () => {
  if (
    confirm(
      "¿Estás seguro de que quieres reiniciar el pasaporte? Se perderá todo el progreso."
    )
  ) {
    progreso = {
      ejecutivo: false,
      social: false,
      oficios: false,
      emprendimiento: false,
    };
    guardarProgreso();
    actualizarInsignias();
    paginaActual = 1;
    mostrarPagina(paginaActual);
  }
});

// Event listeners para botones de información de mundos
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("world-info-btn")) {
    const mundo = e.target.getAttribute("data-world");
    mostrarInfoMundo(mundo);
  }
});

// Cerrar modal de información de mundos
closeWorldInfo.addEventListener("click", cerrarModalInfoMundo);

// Cerrar modal de información de mundos haciendo clic fuera
window.addEventListener("click", (e) => {
  if (e.target === worldInfoModal) {
    cerrarModalInfoMundo();
  }
});

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, inicializando..."); // Debug

  // Verificar que los elementos existen
  console.log("Botón anterior:", prevBtn); // Debug
  console.log("Botón siguiente:", nextBtn); // Debug
  console.log("Páginas encontradas:", pages.length); // Debug

  cargarProgreso();
  actualizarInsignias();
  mostrarPagina(1);

  console.log("Inicialización completada"); // Debug
});

// Función para ir a una página específica (útil para debugging)
function irAPagina(numero) {
  if (numero >= 1 && numero <= totalPaginas) {
    paginaActual = numero;
    mostrarPagina(paginaActual);
  }
}

// Exponer función globalmente para debugging
window.irAPagina = irAPagina;
