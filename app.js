const API_URL = "https://64f0b20c8a8b66ecf7799c5b.mockapi.io/api/v1/comisiones"; // tu mockapi

const $ = e => document.getElementById(e);
const container = $("cards-container");
const filterCommission = $("filter-commission");
const filterModule = $("filter-module");
const filterStatus = $("filter-status");
const btnFilter = $("btn-filter");
const btnNew = $("btn-new");

// 🔹 Obtener datos
const fetchCommissions = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener comisiones");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

// 🔹 Crear nueva comisión
const createCommission = async () => {
  const nombre = prompt("Nombre de la comisión:");
  if (!nombre) return;

  const nueva = {
    nombre,
    modulos: []
  };

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nueva)
    });
    if (!res.ok) throw new Error("Error al crear");
    init(); // refresca
  } catch (err) {
    console.error(err);
  }
};

// 🔹 Editar comisión
const updateCommission = async (id, currentName) => {
  const nuevoNombre = prompt("Nuevo nombre:", nombreActual);
  if (!nuevoNombre) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: nuevoNombre })
    });
    if (!res.ok) throw new Error("Error al actualizar");
    init();
  } catch (err) {
    console.error(err);
  }
};

// 🔹 Eliminar comisión
const deleteCommission = async (id) => {
  if (!confirm("¿Eliminar comisión?")) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar");
    init();
  } catch (err) {
    console.error(err);
  }
};

// 🔹 Render cards
const renderCards = (data) => {
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p class="has-text-centered">No hay resultados</p>`;
    return;
  }

  data.forEach(com => {
    const card = document.createElement("div");
    card.className = "column is-one-third";

    card.innerHTML = `
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">${com.nombre}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <strong>Módulos:</strong>
            <ul>
              ${com.modulos.map(m => `<li>${m.nombre} (${m.estado})</li>`).join("")}
            </ul>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item has-text-info" onclick="updateComision('${com.id}', '${com.nombre}')">✏️ Editar</a>
          <a href="#" class="card-footer-item has-text-danger" onclick="deleteComision('${com.id}')">🗑️ Eliminar</a>
        </footer>
      </div>
    `;

    container.appendChild(card);
  });
};

// 🔹 Filtros dinámicos desde la API
const loadFilters = (data) => {
  // Comisiones
  const comisiones = [...new Set(data.map(c => c.nombre))];
  filterComision.innerHTML = `<option value="">Todas las comisiones</option>` +
    comisiones.map(c => `<option value="${c}">${c}</option>`).join("");

  // Módulos
  const modulos = [...new Set(data.flatMap(c => c.modulos.map(m => m.nombre)))];
  filterModulo.innerHTML = `<option value="">Todos los módulos</option>` +
    modulos.map(m => `<option value="${m}">${m}</option>`).join("");

  // Estados dinámicos desde los módulos
  const estados = [...new Set(data.flatMap(c => c.modulos.map(m => m.estado)))];
  filterEstado.innerHTML = `<option value="">Todos los estados</option>` +
    estados.map(e => `<option value="${e}">${e}</option>`).join("");
};

// 🔹 Filtrar
const applyFilters = (data) => {
  let filtrado = [...data];

  if (filterComision.value) {
    filtrado = filtrado.filter(c => c.nombre === filterComision.value);
  }

  filtrado.forEach(c => {
    c.modulos = c.modulos.filter(m => {
      const filtroModulo = filterModulo.value ? m.nombre === filterModulo.value : true;
      const filtroEstado = filterEstado.value ? m.estado === filterEstado.value : true;
      return filtroModulo && filtroEstado;
    });
  });

  return filtrado.filter(c => c.modulos.length > 0 || (!filterModulo.value && !filterEstado.value));
};

// 🔹 Inicializar
const init = async () => {
  const data = await fetchCommissions();
  loadFilters(data);
  renderCards(data);

  btnFilter.onclick = () => {
    const filtered = applyFilters(data);
    renderCards(filtered);
  };

  btnNew.onclick = createCommission;
};

init();
