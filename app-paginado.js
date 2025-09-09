// URL base de la API pública de Rick and Morty
const API_URL = 'https://rickandmortyapi.com/api/character';

// Helper para acceder rápido a elementos del DOM por id
// Usamos arrow function por sintaxis moderna y concisa
const $ = e => document.getElementById(e);
// Referencias a elementos del DOM
const cards = $("cards"); // Donde se renderizan las tarjetas
const filtersForm = $("filters"); // Formulario de filtros
const speciesSelect = $("species"); // Select de especies
const statusSelect = $("status"); // Select de estado
const genderSelect = $("gender"); // Select de género

// Obtenemos todas las especies, estados y géneros únicos recorriendo todas las páginas de la API
const fetchAllFilters = async () => {
  const speciesSet = new Set(); // Set para especies únicas
  const statusSet = new Set();  // Set para estados únicos
  const genderSet = new Set();  // Set para géneros únicos
  let nextUrl = API_URL;        // Comenzamos con la URL base
  // Recorremos todas las páginas de la API
  while (nextUrl) {
    // 1. Pedimos los datos de la página actual
    const res = await fetch(nextUrl); 
    // 2. Si la respuesta no es OK, salimos del bucle
    if (!res.ok) break;
    // 3. Convertimos la respuesta en JSON
    const data = await res.json();
    // 4. Recorremos los personajes de la página actual
    data.results.forEach(char => {
      // 5. Añadimos la especie, estado y género al Set correspondiente
      speciesSet.add(char.species);
      statusSet.add(char.status);
      genderSet.add(char.gender);
    });
    // 6. Actualizamos la URL para la siguiente página (si existe)
    nextUrl = data.info.next;
  }
  // 7. Devolvemos los valores únicos y ordenados
  return {
    species: [...speciesSet].sort(),
    status: [...statusSet].sort(),
    gender: [...genderSet].sort()
  };
};
// Usamos Set para evitar duplicados y paginación para obtener todas
const fetchAllSpecies = async () => {
  const speciesSet = new Set();
  let nextUrl = API_URL;
  while (nextUrl) {
    // fetch: método nativo para consumir APIs REST
    const res = await fetch(nextUrl);
    if (!res.ok) break;
    const data = await res.json();
    // Recorremos los resultados y guardamos la especie
    data.results.forEach(char => speciesSet.add(char.species));
    nextUrl = data.info.next; // Avanzamos a la siguiente página
  }
  return [...speciesSet].sort(); // Devolvemos especies ordenadas
};

// ...existing code...

// Devuelve la clase de color Bulma según estado o género
// Así damos feedback visual inmediato al usuario
const getTagClass = (type, value) => {
  const v = value.toLowerCase();
  if (type === 'status') {
    if (v === 'alive') return 'is-success'; // Verde para vivos
    if (v === 'dead') return 'is-danger'; // Rojo para muertos
    return 'is-dark'; // Gris para desconocido
  }
  if (type === 'gender') {
    if (v === 'male') return 'is-link'; // Azul para masculino
    if (v === 'female') return 'is-warning'; // Amarillo para femenino
    if (v === 'genderless') return 'is-info'; // Celeste para sin género
    return 'is-light'; // Gris claro para desconocido
  }
  return '';
};

// Renderiza las tarjetas de personajes en el DOM
// Usamos template literals para generar HTML dinámico
const renderCards = chars => {
  cards.innerHTML = '';
  if (!chars.length) {
    // Mensaje si no hay resultados
    cards.innerHTML = '<div class="notification is-warning">No se encontraron personajes.</div>';
    return;
  }
  chars.forEach(char => {
    const col = document.createElement('div');
    col.className = 'column is-one-quarter';
    col.innerHTML = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${char.image}" alt="${char.name}">
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-5">${char.name}</p>
          <p><strong>Especie:</strong> ${char.species}</p>
          <p><strong>Estado:</strong> <span class="tag ${getTagClass('status', char.status)}">${char.status}</span></p>
          <p><strong>Género:</strong> <span class="tag ${getTagClass('gender', char.gender)}">${char.gender}</span></p>
        </div>
      </div>
    `;
    cards.appendChild(col);
  });
};

// --- Paginación ---
let currentPage = 1;
let totalPages = 1;

// Crear controles de paginación en el DOM
const paginationContainer = document.createElement('div');
paginationContainer.id = 'pagination';
paginationContainer.className = 'pagination is-centered mt-4';
paginationContainer.innerHTML = `
  <button id="prev-page" class="button is-small" disabled>Anterior</button>
  <span id="page-info" class="mx-2">Página 1</span>
  <button id="next-page" class="button is-small" disabled>Siguiente</button>
`;
cards.parentNode.insertBefore(paginationContainer, cards.nextSibling);

const prevPageBtn = $("prev-page");
const nextPageBtn = $("next-page");
const pageInfo = $("page-info");

// Modificar fetchCharacters para aceptar página y devolver totalPages
const fetchCharacters = async (params = {}, page = 1) => {
  const url = new URL(API_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });
  url.searchParams.append('page', page);
  const res = await fetch(url);
  if (!res.ok) return { results: [], totalPages: 1 };
  const data = await res.json();
  return { results: data.results || [], totalPages: data.info?.pages || 1 };
};

// Actualiza los controles de paginación
const updatePaginationControls = () => {
  pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
  prevPageBtn.disabled = currentPage <= 1;
  nextPageBtn.disabled = currentPage >= totalPages;
};

// Renderiza las tarjetas de personajes en el DOM (sin cambios)
// ...existing code...

// Carga los personajes y los muestra en pantalla, con paginación
const loadAndRender = async (params = {}, page = 1) => {
  cards.innerHTML = '<progress class="progress is-small is-primary" max="100">Cargando...</progress>';
  const { results, totalPages: pages } = await fetchCharacters(params, page);
  totalPages = pages;
  renderCards(results);
  updatePaginationControls();
};

// Obtiene los valores actuales de los filtros
const getFilters = () => ({
  name: $("name").value.trim(),
  species: $("species").value,
  status: $("status").value,
  gender: $("gender").value
});

// Ejecuta el filtrado y resetea a la primera página
const triggerFilter = () => {
  currentPage = 1;
  loadAndRender(getFilters(), currentPage);
};

// Listeners para paginación
prevPageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadAndRender(getFilters(), currentPage);
  }
});
nextPageBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    loadAndRender(getFilters(), currentPage);
  }
});

// El formulario ya no tiene botón, pero dejamos el listener por si se envía con Enter
filtersForm.addEventListener('submit', e => {
  e.preventDefault();
  triggerFilter();
});

// Filtros automáticos: cada cambio actualiza los resultados
$("name").addEventListener('input', triggerFilter);
$("species").addEventListener('change', triggerFilter);
$("status").addEventListener('change', triggerFilter);
$("gender").addEventListener('change', triggerFilter);

// Función para limpiar todos los filtros y recargar personajes
const clearFilters = () => {
  $("name").value = '';
  $("species").value = '';
  $("status").value = '';
  $("gender").value = '';
  currentPage = 1;
  loadAndRender(getFilters(), currentPage);
};

// Evento para el botón de limpiar filtros
$("clear-filters").addEventListener('click', (e) => {
  e.preventDefault();
  clearFilters();
});

// Inicializa la app: llena el select de especies y muestra los personajes
const init = async () => {
  const { species, status, gender } = await fetchAllFilters();
  const fillSelect = (selectElement, options, lowercase = false) => {
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = lowercase ? option.toLowerCase() : option;
      optionElement.textContent = option;
      selectElement.appendChild(optionElement);
    });
  };
  fillSelect(speciesSelect, species);
  fillSelect(statusSelect, status, true);
  fillSelect(genderSelect, gender, true);
  loadAndRender(getFilters(), currentPage);
};

init();