// JS para ejercicios Fetch MockAPI con Bulma
// URL base de la API
const API_URL = 'https://68af86d6b91dfcdd62bc7e9b.mockapi.io/api/students';

// ==========================================
// EJERCICIO 1: GET - Obtener Estudiantes
// ==========================================
document.getElementById('btn-obtener-usuarios').addEventListener('click', async () => {
  const resultadoDiv = document.getElementById('resultado-get');
  resultadoDiv.innerHTML = '<p>Cargando estudiantes...</p>';
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const estudiantes = await response.json();
    resultadoDiv.innerHTML = `
      <p class="has-text-success">✅ Estudiantes obtenidos correctamente: ${estudiantes.length}</p>
      <pre><code>${JSON.stringify(estudiantes.slice(0, 3), null, 2)}${estudiantes.length > 3 ? '\n...' : ''}</code></pre>
    `;
    console.log('Estudiantes obtenidos:', estudiantes);
  } catch (error) {
    resultadoDiv.innerHTML = `<p class="has-text-danger">❌ Error: ${error.message}</p>`;
    console.error('Error al obtener estudiantes:', error);
  }
});

// ==========================================
// EJERCICIO 2: POST - Crear Estudiante
// ==========================================
document.getElementById('form-crear-usuario').addEventListener('submit', async (event) => {
  event.preventDefault();
  const resultadoDiv = document.getElementById('resultado-post');
  resultadoDiv.innerHTML = '<p>Creando estudiante...</p>';
  const nombre = document.getElementById('nombre').value;
  const pais = document.getElementById('pais').value;
  const trabajo = document.getElementById('trabajo').value;
  const avatar = document.getElementById('avatar').value || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;
  const nuevoEstudiante = {
    name: nombre,
    country: pais,
    job: trabajo,
    avatar: avatar
  };
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoEstudiante)
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const estudianteCreado = await response.json();
    resultadoDiv.innerHTML = `
      <p class="has-text-success">✅ Estudiante creado correctamente</p>
      <pre><code>${JSON.stringify(estudianteCreado, null, 2)}</code></pre>
    `;
    document.getElementById('form-crear-usuario').reset();
  } catch (error) {
    resultadoDiv.innerHTML = `<p class="has-text-danger">❌ Error: ${error.message}</p>`;
    console.error('Error al crear estudiante:', error);
  }
});

// ==========================================
// EJERCICIO 3: PUT - Actualizar Estudiante
// ==========================================
document.getElementById('form-actualizar-usuario').addEventListener('submit', async (event) => {
  event.preventDefault();
  const resultadoDiv = document.getElementById('resultado-put');
  const id = document.getElementById('id-actualizar').value;
  const nombre = document.getElementById('nombre-actualizar').value;
  const pais = document.getElementById('pais-actualizar').value;
  const trabajo = document.getElementById('trabajo-actualizar').value;
  const datosActualizados = {};
  if (nombre) datosActualizados.name = nombre;
  if (pais) datosActualizados.country = pais;
  if (trabajo) datosActualizados.job = trabajo;
  if (Object.keys(datosActualizados).length === 0) {
    resultadoDiv.innerHTML = `<p class="has-text-danger">❌ Error: Debes completar al menos un campo para actualizar</p>`;
    return;
  }
  resultadoDiv.innerHTML = '<p>Actualizando estudiante...</p>';
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosActualizados)
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const estudianteActualizado = await response.json();
    resultadoDiv.innerHTML = `
      <p class="has-text-success">✅ Estudiante actualizado correctamente</p>
      <pre><code>${JSON.stringify(estudianteActualizado, null, 2)}</code></pre>
    `;
  } catch (error) {
    resultadoDiv.innerHTML = `<p class="has-text-danger">❌ Error: ${error.message}</p>`;
    console.error('Error al actualizar estudiante:', error);
  }
});

// ==========================================
// EJERCICIO 4: DELETE - Eliminar Estudiante
// ==========================================
document.getElementById('form-eliminar-usuario').addEventListener('submit', async (event) => {
  event.preventDefault();
  const resultadoDiv = document.getElementById('resultado-delete');
  const id = document.getElementById('id-eliminar').value;
  if (!confirm(`¿Estás seguro de eliminar el estudiante con ID ${id}?`)) return;
  resultadoDiv.innerHTML = '<p>Eliminando estudiante...</p>';
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const resultado = await response.json();
    resultadoDiv.innerHTML = `
      <p class="has-text-success">✅ Estudiante eliminado correctamente</p>
      <pre><code>${JSON.stringify(resultado, null, 2)}</code></pre>
    `;
  } catch (error) {
    resultadoDiv.innerHTML = `<p class="has-text-danger">❌ Error: ${error.message}</p>`;
    console.error('Error al eliminar estudiante:', error);
  }
});

// ==========================================
// CRUD Completo
// ==========================================
const btnMostrarUsuarios = document.getElementById('btn-mostrar-usuarios');
const btnMostrarFormCrear = document.getElementById('btn-mostrar-form-crear');
const formCrearContainer = document.getElementById('form-crear-container');
const formEditarContainer = document.getElementById('form-editar-container');
const formCrudCrear = document.getElementById('form-crud-crear');
const formCrudEditar = document.getElementById('form-crud-editar');
const btnCancelarCrear = document.getElementById('btn-cancelar-crear');
const btnCancelarEditar = document.getElementById('btn-cancelar-editar');
const usuariosContainer = document.getElementById('usuarios-container');

async function cargarUsuarios() {
  usuariosContainer.innerHTML = '<p>Cargando estudiantes...</p>';
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const estudiantes = await response.json();
    mostrarUsuariosEnDOM(estudiantes);
  } catch (error) {
    usuariosContainer.innerHTML = `<p class="has-text-danger">❌ Error al cargar estudiantes: ${error.message}</p>`;
    console.error('Error al cargar estudiantes:', error);
  }
}

function mostrarUsuariosEnDOM(estudiantes) {
  if (estudiantes.length === 0) {
    usuariosContainer.innerHTML = '<p>No hay estudiantes para mostrar.</p>';
    return;
  }
  usuariosContainer.innerHTML = '';
  estudiantes.forEach(estudiante => {
    const userCard = document.createElement('div');
    userCard.className = 'box is-flex is-align-items-center mb-3';
    userCard.innerHTML = `
      <figure class="image is-64x64 mr-4">
        <img src="${estudiante.avatar || 'https://via.placeholder.com/150'}" onerror="this.src='https://via.placeholder.com/150'">
      </figure>
      <div class="mr-auto">
        <h3 class="title is-5 mb-1">${estudiante.name}</h3>
        <p>${estudiante.country} • ${estudiante.job}</p>
        <small>ID: ${estudiante.id}</small>
      </div>
      <div class="buttons">
        <button class="button is-warning" onclick="editarUsuario('${estudiante.id}', '${estudiante.name}', '${estudiante.country}', '${estudiante.job}', '${estudiante.avatar}')">Editar</button>
        <button class="button is-danger" onclick="eliminarUsuarioCrud('${estudiante.id}')">Eliminar</button>
      </div>
    `;
    usuariosContainer.appendChild(userCard);
  });
}

window.editarUsuario = function(id, name, country, job, avatar) {
  document.getElementById('crud-editar-id').value = id;
  document.getElementById('crud-editar-nombre').value = name;
  document.getElementById('crud-editar-pais').value = country;
  document.getElementById('crud-editar-trabajo').value = job;
  document.getElementById('crud-editar-avatar').value = avatar;
  formCrearContainer.style.display = 'none';
  formEditarContainer.style.display = 'block';
};

window.eliminarUsuarioCrud = async function(id) {
  if (confirm(`¿Estás seguro de eliminar el estudiante con ID ${id}?`)) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      alert('Estudiante eliminado correctamente');
      cargarUsuarios();
    } catch (error) {
      alert(`Error al eliminar estudiante: ${error.message}`);
      console.error('Error al eliminar estudiante:', error);
    }
  }
};

btnMostrarUsuarios.addEventListener('click', cargarUsuarios);
btnMostrarFormCrear.addEventListener('click', () => {
  formEditarContainer.style.display = 'none';
  formCrearContainer.style.display = 'block';
});
btnCancelarCrear.addEventListener('click', () => {
  formCrudCrear.reset();
  formCrearContainer.style.display = 'none';
});
btnCancelarEditar.addEventListener('click', () => {
  formEditarContainer.style.display = 'none';
});
formCrudCrear.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nombre = document.getElementById('crud-nombre').value;
  const pais = document.getElementById('crud-pais').value;
  const trabajo = document.getElementById('crud-trabajo').value;
  const avatar = document.getElementById('crud-avatar').value || `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nombre, country: pais, job: trabajo, avatar: avatar })
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    alert('Estudiante creado correctamente');
    formCrudCrear.reset();
    formCrearContainer.style.display = 'none';
    cargarUsuarios();
  } catch (error) {
    alert(`Error al crear estudiante: ${error.message}`);
    console.error('Error al crear estudiante:', error);
  }
});
formCrudEditar.addEventListener('submit', async (event) => {
  event.preventDefault();
  const id = document.getElementById('crud-editar-id').value;
  const nombre = document.getElementById('crud-editar-nombre').value;
  const pais = document.getElementById('crud-editar-pais').value;
  const trabajo = document.getElementById('crud-editar-trabajo').value;
  const avatar = document.getElementById('crud-editar-avatar').value;
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nombre, country: pais, job: trabajo, avatar: avatar })
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    alert('Estudiante actualizado correctamente');
    formEditarContainer.style.display = 'none';
    cargarUsuarios();
  } catch (error) {
    alert(`Error al actualizar estudiante: ${error.message}`);
    console.error('Error al actualizar estudiante:', error);
  }
});
// No se cargan estudiantes hasta que el usuario haga clic en el botón
