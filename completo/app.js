/**
 * Clase 13 — DEMO COMPLETA (paso a paso + comentarios de teoría)
 *
 * 🔐 CORS (Cross-Origin Resource Sharing):
 * - Política de seguridad del navegador: si el front (origen A) intenta consultar una API (origen B)
 *   y el servidor B no permite el origen A, el navegador bloquea la respuesta.
 * - No se "arregla" desde el front. Lo habilita el servidor con cabeceras (p.ej. Access-Control-Allow-Origin).
 *
 * 🌐 fetch:
 * - API nativa del navegador para hacer peticiones HTTP asíncronas (GET, POST, PUT, DELETE, ...).
 * - Retorna una Promise. Por eso podemos usar .then/.catch o async/await.
 *
 * ✅ then/catch vs. ⛳ async/await:
 * - Ambos usan Promesas por debajo. Elige el estilo que más te guste.
 * - then/catch facilita encadenar pasos; async/await hace el código más "lineal" y legible.
 *
 * 🧩 CRUD sobre MockAPI:
 * - GET    -> obtener usuarios
 * - POST   -> crear usuario
 * - PUT    -> actualizar usuario
 * - DELETE -> eliminar usuario
 */

// ✅ Colección de MockAPI: users (coincide con el README)
const API_URL = "https://68af4654b91dfcdd62bbe419.mockapi.io/api/student";

// 🔧 Nodos de la UI
const alertas = document.getElementById("alertas");
const listaUsuarios = document.getElementById("usuarios-lista");
const cargando = document.getElementById("cargando");
const formCrear = document.getElementById("form-crear");
const btnThen = document.getElementById("btn-cargar-then");
const btnAsync = document.getElementById("btn-cargar-async");

// 🧠 Utilidad: mostrar/ocultar loading
function setLoading(visible) {
  cargando.style.display = visible ? "block" : "none";
}

// 🧠 Utilidad: notificaciones simples (Bulma)
function notify(message, type = "is-info") {
  const box = document.createElement("div");
  box.className = `notification ${type}`;
  box.innerHTML = `
    <button class="delete"></button>
    ${message}
  `;
  box.querySelector(".delete").addEventListener("click", () => box.remove());
  alertas.appendChild(box);
  setTimeout(() => box.remove(), 5000);
}

/* ------------------------------------------------------------------
 * GET — versión 1: usando then/catch (teoría de Promesas del README)
 * ------------------------------------------------------------------ */
function getUsersThen() {
  setLoading(true);

  fetch(API_URL)
    .then((response) => {
      // 👀 Validamos estado HTTP. fetch solo lanza error de red; 404/500 NO son error "técnico".
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      // 🧪 El primer then recibe la "respuesta cruda". Ahora la transformamos a JSON:
      return response.json();
    })
    .then((users) => {
      // ✅ El segundo then trabaja con los datos ya parseados.
      renderUsers(users);
      notify("Usuarios cargados con then/catch ✅", "is-success");
    })
    .catch((err) => {
      // ❌ Manejo de errores (URL mala, CORS, 404/500, etc.)
      console.error("Error GET (then/catch):", err);
      notify(`Error al cargar usuarios (then): ${err.message}`, "is-danger");
    })
    .finally(() => setLoading(false)); // 🔚 Siempre se ejecuta (éxito o error)
}

/* ------------------------------------------------------------------
 * GET — versión 2: usando async/await (azúcar sintáctico sobre Promesas)
 * ------------------------------------------------------------------ */
async function getUsersAsync() {
  try {
    setLoading(true);
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const users = await response.json();
    renderUsers(users);
    notify("Usuarios cargados con async/await ✅", "is-success");
  } catch (err) {
    console.error("Error GET (async/await):", err);
    notify(`Error al cargar usuarios (async): ${err.message}`, "is-danger");
  } finally {
    setLoading(false);
  }
}

/* ------------------------------------------------------------------
 * POST — Crear usuario (formulario)
 * - Importante enviar Content-Type: application/json y JSON.stringify(body)
 * ------------------------------------------------------------------ */
formCrear.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const country = document.getElementById("country").value.trim();
  const job = document.getElementById("job").value.trim();
  const avatar = document.getElementById("avatar").value.trim();

  if (!name || !country || !job || !avatar) {
    notify("Completa todos los campos para crear un usuario.", "is-warning");
    return;
  }

  try {
    setLoading(true);
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, country, job, avatar }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const newUser = await res.json();
    notify(`Usuario creado: ${newUser.name} 🎉`, "is-success");

    // Re-cargar lista (rápido: traer todos otra vez)
    await getUsersAsync();
    formCrear.reset();
  } catch (err) {
    console.error("Error POST:", err);
    notify(`No se pudo crear el usuario: ${err.message}`, "is-danger");
  } finally {
    setLoading(false);
  }
});

/* ------------------------------------------------------------------
 * PUT — Editar usuario (demostración simple con prompt)
 * - En una app real usarías un modal o un form dedicado.
 * ------------------------------------------------------------------ */
async function editUser(id) {
  try {
    // Pedimos nuevos valores. Mantén vacío para conservar.
    const name = prompt("Nuevo nombre (deja vacío para no cambiar):");
    const country = prompt("Nuevo país (deja vacío para no cambiar):");
    const job = prompt("Nuevo trabajo (deja vacío para no cambiar):");
    const avatar = prompt("Nuevo avatar URL (deja vacío para no cambiar):");

    // Primero obtenemos el usuario actual para "mergear" los cambios.
    const currentRes = await fetch(`${API_URL}/${id}`);
    if (!currentRes.ok) throw new Error(`HTTP ${currentRes.status}`);
    const current = await currentRes.json();

    const payload = {
      name: name?.trim() || current.name,
      country: country?.trim() || current.country,
      job: job?.trim() || current.job,
      avatar: avatar?.trim() || current.avatar,
    };

    setLoading(true);
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const updated = await res.json();
    notify(`Usuario actualizado: ${updated.name} ✨`, "is-info");
    await getUsersAsync();
  } catch (err) {
    console.error("Error PUT:", err);
    notify(`No se pudo actualizar: ${err.message}`, "is-danger");
  } finally {
    setLoading(false);
  }
}

/* ------------------------------------------------------------------
 * DELETE — Borrar usuario
 * ------------------------------------------------------------------ */
async function deleteUser(id) {
  if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;
  try {
    setLoading(true);
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    notify("Usuario eliminado 🗑️", "is-warning");
    await getUsersAsync();
  } catch (err) {
    console.error("Error DELETE:", err);
    notify(`No se pudo eliminar: ${err.message}`, "is-danger");
  } finally {
    setLoading(false);
  }
}

/* ------------------------------------------------------------------
 * Render — Dibuja las cards de usuarios en el DOM (Bulma)
 * ------------------------------------------------------------------ */
function renderUsers(users) {
  listaUsuarios.innerHTML = "";
  users.forEach((u) => {
    const col = document.createElement("div");
    col.className = "column is-one-quarter";

    col.innerHTML = `
      <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img class="avatar" src="${u.avatar}" alt="${u.name}" />
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-5">${u.name}</p>
          <p class="subtitle is-6">${u.job || "—"}</p>
          <p><i class="fas fa-flag"></i> ${u.country || "—"}</p>
          <p class="is-size-7 has-text-grey">ID: ${u.id}</p>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item has-text-info is-clickable" data-action="edit" data-id="${u.id}">
            <span class="icon"><i class="fa-solid fa-pen-to-square"></i></span>&nbsp;Editar
          </a>
          <a class="card-footer-item has-text-danger is-clickable" data-action="delete" data-id="${u.id}">
            <span class="icon"><i class="fa-solid fa-trash"></i></span>&nbsp;Eliminar
          </a>
        </footer>
      </div>
    `;

    // Delegamos eventos para editar/borrar
    col.querySelectorAll("[data-action='edit']").forEach((el) => {
      el.addEventListener("click", () => editUser(u.id));
    });
    col.querySelectorAll("[data-action='delete']").forEach((el) => {
      el.addEventListener("click", () => deleteUser(u.id));
    });

    listaUsuarios.appendChild(col);
  });
}

/* ------------------------------------------------------------------
 * Eventos de los botones principales (GET)
 * ------------------------------------------------------------------ */
btnThen.addEventListener("click", getUsersThen);
btnAsync.addEventListener("click", getUsersAsync);

/* ------------------------------------------------------------------
 * Inicio — Cargar lista automáticamente (elige la versión que prefieras)
 * ------------------------------------------------------------------ */
getUsersThen(); // ▶️ versión then/catch
// getUsersAsync(); // ▶️ versión async/await
