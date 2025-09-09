const URL_BASE = "https://rickandmortyapi.com/api/character?";

const $ = (e) => document.querySelector(e);

const cards = $("#cards");
const genderSelect = $("#gender");
const statusSelect = $("#status");
const speciesSelect = $("#species");

const fetchAllFilters = async () => {
  const speciesSet = new Set();
  const statusSet = new Set();
  const genderSet = new Set();

  let nextUrl = URL_BASE;

  while (nextUrl) {
    const res = await fetch(nextUrl);
    if (!res.ok) break;
    const data = await res.json();
    data.results.forEach((character) => {
      speciesSet.add(character.species);
      statusSet.add(character.status);
      genderSet.add(character.gender);
    });

    nextUrl = data.info.next;
  }

  return {
    species: [...speciesSet].sort(),
    status: [...statusSet].sort(),
    gender: [...genderSet].sort(),
  };
};

const fetchCharacters = async (params = {}) => {
  const url = new URL(URL_BASE);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value);
  });

  const res = await fetch(url);
  if (!res.ok) return [];

  const data = await res.json();
  return data.results;
};

const getTagClass =(type, value) =>{
  const v = value.toLowerCase()

  if(type === 'status') {
    if(v === 'dead') return 'is-danger'
    if(v === 'alive') return 'is-success'
    return 'is-dark'
   }
if (type === 'gender') {
    if (v === 'male') return 'is-link'; 
    if (v === 'female') return 'is-warning';
    if (v === 'genderless') return 'is-info'; 
    return 'is-light'; 

  }
  return ''
}
const renderCards = (characters) => {
  cards.innerHTML = "";
  characters.forEach(({species, name, status, gender, image}) => {
  // characters.forEach((char) => {
  // const {species, name, image, status, gender} =char
    const column = document.createElement("div");
    column.className = "column is-one-quarter";
    column.innerHTML = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${image}" alt="${name}">
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-5">${name}</p>
         <p><strong>Género: </strong><span class="tag ${getTagClass('gender', gender)}">${gender}</span></p>
         <p><strong>Status: </strong><span class="tag ${getTagClass('status', status)}">${status}</span>}</p>
         <p><strong>Especie: </strong>${species}</p>

        </div>
      </div>
    `;
    cards.appendChild(column);
  });
};


const getFilters = () => {
  return {
    name: $("#name").value,
    gender: $("#gender").value,
    status: $("#status").value,
    species: $("#species").value,
  };
};

const loadAndRender = async (params = {}) => {
  cards.innerHTML =
    '<progress class="progress is-small is-primary" max="100">Cargando...</progress>';
  const characters = await fetchCharacters(params);
  renderCards(characters);
};

const triggerFilter = () => loadAndRender(getFilters());
const clearFilters = () => {
  $("name").value = '';
  $("species").value = '';
  $("status").value = '';
  $("gender").value = '';
  triggerFilter();
};
$("#name").addEventListener("input", triggerFilter);
$("#gender").addEventListener("change", triggerFilter);
$("#status").addEventListener("change", triggerFilter);
$("#species").addEventListener("change", triggerFilter);
// Evento para el botón de limpiar filtros
$("clear-filters").addEventListener('click', (e) => {
  e.preventDefault();
  clearFilters();
});
const init = async () => {
  const { species, status, gender } = await fetchAllFilters();
  const fillSelect = (selectElement, options, lowercase = false) => {
    options.forEach((option) => {
      if (!option) return;
      const optionElement = document.createElement("option");
      optionElement.value = lowercase ? option.toLowerCase() : option;
      optionElement.textContent = option;
      selectElement.appendChild(optionElement);
    });
  };
  fillSelect(speciesSelect, species);
  fillSelect(statusSelect, status, true);
  fillSelect(genderSelect, gender, true);
  triggerFilter();
};
init();
