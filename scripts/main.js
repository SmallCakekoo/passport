// Variables globales para almacenar datos del JSON
let claves = {};
let mundosInfo = {};

// Función para cargar datos desde el JSON
async function cargarDatos() {
  try {
    const response = await fetch("data/mundos.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    claves = data.claves;
    mundosInfo = data.mundosInfo;

    // Una vez cargados los datos, inicializar la aplicación
    inicializarAplicacion();
  } catch (error) {
    console.error("Error cargando datos:", error);
    // Fallback: usar datos por defecto si falla el fetch
    alert("Error cargando datos. Por favor, recarga la página.");
  }
}

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

  let invitadosHTML = "";
  if (info.invitados && info.invitados.length > 0) {
    invitadosHTML = `
      <div class="world-guests">
        <h4>Invitados especiales:</h4>
        <div class="guests-grid">
          ${info.invitados
            .map(
              (invitado) => `
            <div class="guest-card">
              <img src="${invitado.imagen}" alt="${invitado.nombre}" class="guest-image">
              <div class="guest-info">
                <h5>${invitado.nombre}</h5>
                <i class="guest-rol">Rol: ${invitado.rol}</i>
                <p class="guest-room">Salón: ${invitado.salón}</p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  worldInfoContent.innerHTML = `
    <h3>${info.titulo}</h3>
    <p class="world-description">${info.descripcion}</p>
    <div class="world-areas">
      <h4>Puedes estar desde:</h4>
      <ul>
        ${info.areas.map((area) => `<li>${area}</li>`).join("")}
      </ul>
    </div>
    ${invitadosHTML}
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

// Función de inicialización de la aplicación
function inicializarAplicacion() {
  console.log("Inicializando aplicación..."); // Debug

  // Verificar que los elementos existen
  console.log("Botón anterior:", prevBtn); // Debug
  console.log("Botón siguiente:", nextBtn); // Debug
  console.log("Páginas encontradas:", pages.length); // Debug

  cargarProgreso();
  actualizarInsignias();
  mostrarPagina(1);

  console.log("Inicialización completada"); // Debug
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM cargado, cargando datos..."); // Debug

  // Cargar datos del JSON antes de inicializar
  cargarDatos();
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
