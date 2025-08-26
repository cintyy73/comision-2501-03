// Clase 12 — Demo completa (Event Loop + Web APIs + Promesas + async/await)
// Este archivo crea una mini UI dinámica con JS puro (sin HTML previo).
// Incluir con: <script src="clase12_demo_completo.js"></script>

/* ========== Utilidades ========== */
function $(sel) { return document.querySelector(sel); }
function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.assign(node, props);
  for (const c of children) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  return node;
}

function log(...args) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}]`, ...args);
  const li = el("li", {}, [args.map(a => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" ")]);
  $("#loglist").appendChild(li);
}

/* ========== UI mínima ========== */
document.body.style.fontFamily = "system-ui, sans-serif";

const app = el("div", { id: "app", style: "max-width: 720px; margin: 24px auto; padding: 16px; border: 1px solid #444; border-radius: 12px;" }, [
  el("h2", {}, ["Clase 12 — Demo completa"]),
  el("p", {}, ["Incluye: Event Loop (macro/micro), Web APIs (click, setTimeout, fetch), Promesas y async/await, y cancelación con AbortController."]),
  el("div", { style: "display:flex; gap:8px; flex-wrap: wrap; margin: 12px 0;" }, [
    el("button", { id: "btnOrden", textContent: "Probar orden (A-D-C-B)" }),
    el("button", { id: "btnCargar", textContent: "Cargar usuarios" }),
    el("button", { id: "btnCancelar", textContent: "Cancelar carga" }),
  ]),
  el("div", { id: "estado", style: "margin: 8px 0; min-height: 24px;" }),
  el("ul", { id: "lista" }),
  el("h4", {}, ["Log:"]),
  el("ul", { id: "loglist", style: "font-family: ui-monospace, monospace; font-size: 13px; line-height: 1.4;" }),
]);

document.body.appendChild(app);

/* ========== 1) Event Loop: micro vs macro ========== */
$("#btnOrden").addEventListener("click", () => {
  log("Orden esperado: A, D, C, B");
  log("A");
  setTimeout(() => log("B (macrotask: setTimeout 0)"), 0);
  Promise.resolve().then(() => log("C (microtask: Promise.then)"));
  log("D");
});

/* ========== 2) Carga con fetch + async/await ========== */
let controller = null;

async function fetchUsers(signal) {
  // Simulamos latencia extra con un timer (no bloquea)
  await new Promise(r => setTimeout(r, 300));

  const res = await fetch("https://jsonplaceholder.typicode.com/users", { signal });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

async function fetchPosts(signal) {
  // En paralelo a usuarios para demostrar Promise.all
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", { signal });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json();
}

function setEstado(texto, busy = false) {
  $("#estado").textContent = texto;
  $("#btnCargar").disabled = busy;
  $("#btnCancelar").disabled = !busy;
  if (busy) {
    $("#estado").appendChild(el("span", { textContent: " ⏳" }));
  }
}

function renderUsuarios(users) {
  $("#lista").innerHTML = "";
  for (const u of users) {
    const item = el("li", {}, [
      `${u.name} `, el("small", { style: "opacity:.8" }, [`<${u.email}>`])
    ]);
    $("#lista").appendChild(item);
  }
}

$("#btnCargar").addEventListener("click", async () => {
  if (!("fetch" in window)) {
    log("Este ejemplo requiere fetch en el navegador.");
    return;
  }
  controller = new AbortController();
  const { signal } = controller;

  setEstado("Cargando usuarios y posts en paralelo…", true);
  log("Inicio de carga (async/await + Promise.all)");

  try {
    // Paralelizar para mejor rendimiento
    const [users, posts] = await Promise.all([fetchUsers(signal), fetchPosts(signal)]);
    log("Usuarios:", users.length, "| Posts:", posts.length);

    // Ejemplo: crear una promesa manual para demostrar then/catch
    await new Promise((resolve) => {
      setTimeout(() => {
        log("Promesa manual resuelta (macrotask)");
        resolve();
      }, 200);
    });

    renderUsuarios(users);
    setEstado("Listo ✅");
  } catch (e) {
    if (e.name === "AbortError") {
      setEstado("Carga cancelada ❌");
      log("AbortError: la solicitud fue cancelada");
    } else {
      setEstado("Error durante la carga ❌");
      log("Error:", e.message);
    }
  } finally {
    controller = null;
    $("#btnCargar").disabled = false;
    $("#btnCancelar").disabled = true;
    log("Finally: limpieza realizada");
  }
});

/* ========== 3) Cancelación con AbortController ========== */
$("#btnCancelar").addEventListener("click", () => {
  if (controller) {
    controller.abort();
  }
});
