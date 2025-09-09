
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

// Obtenemos todas las especies disponibles en la API
// También obtenemos los estados y géneros únicos
// Usamos Set para almacenar valores únicos de especie, estado y género.
// Set es una estructura de datos de ES6 que no permite duplicados, ideal para recolectar valores únicos de un array.
const fetchAllFilters = async () => {
  const speciesSet = new Set();
  const statusSet = new Set();
  const genderSet = new Set();
  let nextUrl = API_URL;
  while (nextUrl) {
    const res = await fetch(nextUrl);
    if (!res.ok) break;
    const data = await res.json();
    data.results.forEach(char => {
      speciesSet.add(char.species);
      statusSet.add(char.status);
      genderSet.add(char.gender);
    });
    nextUrl = data.info.next;
  }
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

// Obtiene personajes según los filtros seleccionados
// Usamos parámetros de búsqueda en la URL para filtrar desde la API
const fetchCharacters = async (params = {}) => {
  // EJEMPLO ALTERNATIVO: Concatenar filtros usando template strings
  // (No recomendado para producción, pero útil para entender cómo funcionan los filtros)
  // let url = `${API_URL}?`;
  // if (params.name) url += `name=${params.name}&`;
  // if (params.species) url += `species=${params.species}&`;
  // if (params.status) url += `status=${params.status}&`;
  // if (params.gender) url += `gender=${params.gender}&`;
  // url = url.slice(0, -1); // Eliminar el último &
  // // fetch(url) ...
  // Creamos la URL base y agregamos los filtros como parámetros de búsqueda
  // Usamos el objeto URL para manipular la query string de forma segura y legible
  const url = new URL(API_URL);
  // Recorremos los filtros y los agregamos si tienen valor
  // Esto permite que la API devuelva solo los personajes que cumplen con los criterios
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });
  // Realizamos la petición HTTP con fetch
  // fetch devuelve una promesa que se resuelve con la respuesta del servidor
  const res = await fetch(url);
  // Si la respuesta no es exitosa, devolvemos un array vacío
  if (!res.ok) return [];
  // Convertimos la respuesta en JSON para poder trabajar con los datos
  const data = await res.json();
  // La API devuelve los personajes en la propiedad 'results'. Si no existe, devolvemos array vacío
  return data.results || [];
};

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
    if (v === 'male') return 'is-link'; 
    if (v === 'female') return 'is-warning';
    if (v === 'genderless') return 'is-info'; 
    return 'is-light'; 
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

// Carga los personajes y los muestra en pantalla
// Se llama cada vez que el usuario cambia un filtro
const loadAndRender = async (params = {}) => {
  cards.innerHTML = '<progress class="progress is-small is-primary" max="100">Cargando...</progress>';
  const characters = await fetchCharacters(params);
  renderCards(characters);
};



// Obtiene los valores actuales de los filtros
// Así evitamos repetir código y centralizamos la lógica
const getFilters = () => ({
  name: $("name").value.trim(),
  species: $("species").value,
  status: $("status").value,
  gender: $("gender").value
});

// Ejecuta el filtrado cada vez que el usuario interactúa
const triggerFilter = () => loadAndRender(getFilters());


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

// Función para limpiar todos los filtros
const clearFilters = () => {
  $("name").value = '';
  $("species").value = '';
  $("status").value = '';
  $("gender").value = '';
  triggerFilter();
};

// Evento para el botón de limpiar filtros
$("clear-filters").addEventListener('click', (e) => {
  e.preventDefault();
  clearFilters();
});

// Carga inicial y especies
// Inicializa la app: llena el select de especies y muestra los personajes
const init = async () => {
  // Llenar selects dinámicamente
  const { species, status, gender } = await fetchAllFilters();
  
  // Función auxiliar para llenar cualquier select con opciones
  const fillSelect = (selectElement, options, lowercase = false) => {
    options.forEach(option => {
      const optionElement = document.createElement('option');
      // Opcional: convertir a minúsculas para el value
      optionElement.value = lowercase ? option.toLowerCase() : option;
      optionElement.textContent = option;
      selectElement.appendChild(optionElement);
    });
  };
  
  // Llenamos los tres selects con una sola función
  fillSelect(speciesSelect, species);
  fillSelect(statusSelect, status, true); // Convertimos a minúsculas
  fillSelect(genderSelect, gender, true); // Convertimos a minúsculas
  triggerFilter();
};

init();