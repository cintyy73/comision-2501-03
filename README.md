# Guía paso a paso para desarrollar `app-completo.js`

Este README te ayudará a enseñar y construir el proyecto Rick and Morty paso a paso, con teoría, mensajes de commit sugeridos y el código que debes ir agregando en cada etapa.

---

## 1. Mostrar personajes básicos
**Commit:** `feat: muestra personajes en pantalla usando fetch`
**Teoría:** Aprender a consumir una API con `fetch` y mostrar datos en el DOM.
```js
const API_URL = 'https://rickandmortyapi.com/api/character';
const cards = document.getElementById('cards');

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    data.results.forEach(char => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<img src="${char.image}" alt="${char.name}"><p>${char.name}</p>`;
      cards.appendChild(div);
    });
  });
```

---

## 2. Agregar filtro por nombre
**Commit:** `feat: agrega filtro por nombre de personaje`
**Teoría:** Cómo usar inputs y parámetros en la URL para filtrar resultados.
```js
const nameInput = document.getElementById('name');
nameInput.addEventListener('input', () => {
  const name = nameInput.value;
  fetch(`${API_URL}?name=${name}`)
    .then(res => res.json())
    .then(data => {
      cards.innerHTML = '';
      data.results.forEach(char => {
        // ...igual que antes...
      });
    });
});
```

---

## 3. Agregar selects para especie, estado y género
**Commit:** `feat: agrega selects dinámicos para especie, estado y género`
**Teoría:** Obtener valores únicos de la API y llenar selects dinámicamente.
```js
const speciesSelect = document.getElementById('species');
const statusSelect = document.getElementById('status');
const genderSelect = document.getElementById('gender');

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const speciesSet = new Set();
    data.results.forEach(char => speciesSet.add(char.species));
    speciesSet.forEach(species => {
      const opt = document.createElement('option');
      opt.value = species;
      opt.textContent = species;
      speciesSelect.appendChild(opt);
    });
  });
```

---

## 4. Filtrar personajes por todos los campos
**Commit:** `feat: filtra personajes por nombre, especie, estado y género`
**Teoría:** Usar varios filtros y construir la URL con parámetros dinámicos.
```js
function getFilters() {
  return {
    name: nameInput.value,
    species: speciesSelect.value,
    status: statusSelect.value,
    gender: genderSelect.value
  };
}

function fetchAndRender() {
  const params = getFilters();
  let url = API_URL + '?';
  Object.entries(params).forEach(([key, value]) => {
    if (value) url += `${key}=${value}&`;
  });
  fetch(url)
    .then(res => res.json())
    .then(data => {
      cards.innerHTML = '';
      (data.results || []).forEach(char => {
        // ...igual que antes...
      });
    });
}

nameInput.addEventListener('input', fetchAndRender);
speciesSelect.addEventListener('change', fetchAndRender);
statusSelect.addEventListener('change', fetchAndRender);
genderSelect.addEventListener('change', fetchAndRender);
```

---

## 5. Manejar paginación
**Commit:** `feat: agrega paginación para navegar entre páginas de resultados`
**Teoría:** Usar los links `info.next` y `info.prev` de la API para navegar.
```js
let nextPage = null;
let prevPage = null;

function fetchAndRender(url = API_URL) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      cards.innerHTML = '';
      (data.results || []).forEach(char => {
        // ...igual que antes...
      });
      nextPage = data.info.next;
      prevPage = data.info.prev;
    });
}

document.getElementById('next-btn').addEventListener('click', () => {
  if (nextPage) fetchAndRender(nextPage);
});
document.getElementById('prev-btn').addEventListener('click', () => {
  if (prevPage) fetchAndRender(prevPage);
});
```

---

## 6. Mejorar la visualización de tarjetas
**Commit:** `style: mejora el diseño de las tarjetas con Bulma`
**Teoría:** Usar clases de Bulma para mostrar estado y género con colores.
```js
function getTagClass(type, value) {
  if (type === 'status') {
    if (value === 'Alive') return 'is-success';
    if (value === 'Dead') return 'is-danger';
    return 'is-dark';
  }
  // ...igual para género...
}

div.innerHTML = `
  <img src="${char.image}" alt="${char.name}">
  <p>${char.name}</p>
  <span class="tag ${getTagClass('status', char.status)}">${char.status}</span>
`;
```

---

## 7. Manejar errores y mensajes al usuario
**Commit:** `fix: muestra mensajes si no hay resultados o hay error de API`
**Teoría:** Mostrar notificaciones si no se encuentran personajes o hay error de red.
```js
fetch(url)
  .then(res => res.json())
  .then(data => {
    if (!data.results || data.results.length === 0) {
      cards.innerHTML = '<div>No se encontraron personajes.</div>';
      return;
    }
    // ...renderizar...
  })
  .catch(() => {
    cards.innerHTML = '<div>Error al cargar los datos.</div>';
  });
```

---

## 8. Agregar botón para limpiar filtros
**Commit:** `feat: agrega botón para limpiar todos los filtros`
**Teoría:** Permitir al usuario reiniciar todos los filtros y mostrar todos los personajes.
```js
const clearBtn = document.getElementById('clear-filters');
clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  nameInput.value = '';
  speciesSelect.value = '';
  statusSelect.value = '';
  genderSelect.value = '';
  fetchAndRender();
});
```

---

## 9. Modularizar el código
**Commit:** `refactor: centraliza funciones auxiliares y mejora la legibilidad`
**Teoría:** Separar funciones y eventos para mejorar la organización y reutilización.
```js
function fillSelect(select, options) {
  select.innerHTML = '';
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
}
// ...y así para otras funciones auxiliares...
```

---

Sigue este orden para enseñar y construir el proyecto, explicando la teoría y mostrando el código en cada commit.
