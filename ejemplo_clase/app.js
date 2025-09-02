const API_URL = "https://68af86d6b91dfcdd62bc7e9b.mockapi.io/api/students";

async function obtenerUsuarios() {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const datos = await response.json();
    mostrarUsuariosEnDOM(datos);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
}

const usuariosContainer = document.getElementById("tabla-estudiantes");
function mostrarUsuariosEnDOM(datos) {
  if (datos.length === 0) {
    usuariosContainer.innerHTML = '<tr><td colspan="4">No hay datos para mostrar.</td></tr>';
    return;
  }
  usuariosContainer.innerHTML = "";
  datos.forEach(({ country, name, avatar, id }) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${name}</td>
      <td>${country}</td>
      <td><img src="${avatar || 'https://via.placeholder.com/150'}" alt="avatar" style="width:48px;height:48px;object-fit:cover;border-radius:50%;" onerror="this.src='https://via.placeholder.com/150'" /></td>
      <td>
        <button class="button is-warning is-small" onclick="editUser('${id}')">Editar</button>
        <button class="button is-danger is-small" onclick="deleteUser('${id}')">Eliminar</button>
      </td>
    `;
    usuariosContainer.appendChild(fila);
  });
}

//  DELETE
window.deleteUser = async function (id) {
  if (confirm(`¿Estás seguro de eliminar el estudiante con ID ${id}?`)) {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      alert("Estudiante eliminado correctamente");
      obtenerUsuarios();
    } catch (error) {
      alert(`Error al eliminar estudiante: ${error.message}`);
      console.error("Error al eliminar estudiante:", error);
    }
  }
};

// POST CREAR USUARIO
const form = document.querySelector("#form-estudiante");
const btnAbrirCrear = document.getElementById("btn-abrir-crear");
const btnCancelar = document.getElementById("btn-cancelar");
const btnGuardar = document.getElementById("btn-guardar");
let editUserId = null;

function mostrarForm(modo = "crear") {
  form.style.display = "block";
  btnGuardar.textContent = modo === "editar" ? "Actualizar" : "Guardar";
}
function ocultarForm() {
  form.style.display = "none";
  form.reset();
  editUserId = null;
  btnGuardar.textContent = "Guardar";
}

btnAbrirCrear.addEventListener("click", () => {
  form.reset();
  editUserId = null;
  mostrarForm("crear");
});
btnCancelar.addEventListener("click", ocultarForm);

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const id = document.getElementById("id").value;
//   const name = document.getElementById("nombre").value;
//   const country = document.getElementById("pais").value;
//   const avatar = document.getElementById("avatar").value;

//   const response = await fetch(`${API_URL}`, { //id
//     method: "POST", //put
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       name,
//       avatar,
//       country,
//     }),
//   });
//   if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
//   alert("Estudiante creado correctamente"); //actualizado
//   obtenerUsuarios();
// });

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("nombre").value;
  const country = document.getElementById("pais").value;
  const avatar = document.getElementById("avatar").value;
  try {
    let response;
    if (editUserId) {
      response = await fetch(`${API_URL}/${editUserId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, avatar, country }),
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      alert("Estudiante actualizado correctamente");
    } else {
      response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, avatar, country }),
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      alert("Estudiante creado correctamente");
    }
    obtenerUsuarios();
    ocultarForm();
  } catch (error) {
    alert(`Error: ${error.message}`);
    console.error(error);
  }
});

window.editUser = async function (id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const user = await response.json();
    document.getElementById("nombre").value = user.name;
    document.getElementById("pais").value = user.country;
    document.getElementById("avatar").value = user.avatar;
    editUserId = id;
    mostrarForm("editar");
    form.scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    alert(`Error al cargar usuario: ${error.message}`);
    console.error(error);
  }
};
obtenerUsuarios();


