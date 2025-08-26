// Clase 12 — Ejemplos guiados paso a paso
// Ejecutá este archivo en el navegador con <script> o en Node (excepto partes DOM).
// Sugerencia: abrí la consola para ver el orden real de ejecución.

/* =========================
 * 1) SÍNCRONO vs ASÍNCRONO
 * ========================= */
console.log("1) Sincrónico vs Asíncrono");

// Síncrono (bloqueante — ejemplo artificial con busy loop)
function bloquear(ms = 500) {
  const fin = Date.now() + ms;
  while (Date.now() < fin) {} // NO hagas esto en producción, solo para demostrar bloqueo
}

console.log("  - Antes del bloqueo");
bloquear(200); // bloquea ~200ms
console.log("  - Después del bloqueo");

// Asíncrono con setTimeout
console.log("  - Inicio asíncrono");
setTimeout(() => console.log("  - Timer listo (macrotask)"), 0);
console.log("  - Fin asíncrono\n");


/* =============================
 * 2) EVENT LOOP: MICRO vs MACRO
 * ============================= */
console.log("2) Event Loop — Orden real (microtask vs macrotask)");
console.log("   A (stack)");
setTimeout(() => console.log("   B (macrotask: setTimeout 0)"), 0);
Promise.resolve().then(() => console.log("   C (microtask: Promise.then)"));
console.log("   D (stack)");
// Orden: A, D, C, B
console.log("");


/* ======================
 * 3) PROMESAS BÁSICAS
 * ====================== */
console.log("3) Promesas: crear, resolver, rechazar");

function tareaAsincronaOK(ms = 300) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`OK después de ${ms}ms`), ms);
  });
}

function tareaAsincronaError(ms = 300) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Fallo después de ${ms}ms`)), ms);
  });
}

tareaAsincronaOK(150)
  .then(msg => console.log("   then:", msg))
  .finally(() => console.log("   finally: terminó OK"));

tareaAsincronaError(200)
  .then(msg => console.log("   (no llega)", msg))
  .catch(err => console.log("   catch:", err.message))
  .finally(() => console.log("   finally: terminó con error"));

console.log("");


/* ===============================================
 * 4) COMPOSICIÓN: Promise.all / allSettled / race
 * =============================================== */
console.log("4) Composición de promesas");

const pa = tareaAsincronaOK(100);
const pb = tareaAsincronaOK(250);
Promise.all([pa, pb]).then(values => {
  console.log("   Promise.all ->", values);
});

Promise.allSettled([tareaAsincronaOK(120), tareaAsincronaError(180)]).then(rs => {
  console.log("   allSettled ->", rs.map(x => x.status).join(", "));
});

Promise.race([tareaAsincronaOK(90), tareaAsincronaOK(200)]).then(val => {
  console.log("   race -> primero en resolverse:", val);
});

console.log("");


/* ========================
 * 5) ASYNC / AWAIT + ERRORES
 * ======================== */
console.log("5) async/await, try/catch");

async function demoAsyncAwait() {
  try {
    const ok = await tareaAsincronaOK(100);
    console.log("   await OK ->", ok);
    await tareaAsincronaError(100); // lanza
    console.log("   (no llega)");
  } catch (e) {
    console.log("   catch await ->", e.message);
  } finally {
    console.log("   finally await -> siempre");
  }
}
demoAsyncAwait();

console.log("");

/* =========================================
 * Ejemplo extra: fetch con .then/.catch
 * ========================================= */
console.log("Ejemplo extra: fetch con .then/.catch");

// Realiza una petición GET a la API de posts
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(respuesta => {
    // Verifica si la respuesta fue exitosa
    if (!respuesta.ok) throw new Error("Error HTTP: " + respuesta.status);
    // Convierte la respuesta a JSON
    return respuesta.json();
  })
  .then(posts => {
    // Muestra la cantidad de posts y el primero como ejemplo
    console.log("Cantidad de posts:", posts.length);
    console.log("Primer post:", posts[0]);
  })
  .catch(error => {
    // Si ocurre un error, lo muestra
    console.log("Error al obtener posts:", error.message);
  })
  .finally(() => {
    // Este bloque se ejecuta siempre
    console.log("Petición finalizada.");
  });


/* ===========================================
 * 6) Secuencial vs Paralelo con async/await
 * =========================================== */
console.log("6) Secuencial vs Paralelo");

// ❌ Secuencial (espera uno y recién después el otro)
async function secuencial() {
  const t1 = Date.now();
  const a = await tareaAsincronaOK(200);
  const b = await tareaAsincronaOK(200);
  console.log("   Secuencial:", [a, b], "tiempo:", Date.now() - t1, "ms");
}

// ✅ Paralelo (inicia ambas y espera a las dos)
async function paralelo() {
  const t1 = Date.now();
  const [a, b] = await Promise.all([tareaAsincronaOK(200), tareaAsincronaOK(200)]);
  console.log("   Paralelo  :", [a, b], "tiempo:", Date.now() - t1, "ms");
}

secuencial().then(paralelo);

console.log("");


/* ===================================
 * 7) fetch + try/catch + finally
 *    (en navegador; Node requiere fetch global)
 * =================================== */
console.log("7) fetch + async/await");
async function cargarTodo() {
  if (typeof fetch !== "function") {
    console.log("   fetch no disponible en este entorno.");
    return;
  }
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    console.log("   TODO:", data.title);
  } catch (e) {
    console.log("   Error fetch ->", e.message);
  } finally {
    console.log("   Listo fetch.");
  }
}
cargarTodo();

console.log("");


/* ====================================
 * 8) AbortController (extra opcional)
 * ==================================== */
console.log("8) AbortController (cancelar fetch)");

async function demoAbort() {
  if (typeof fetch !== "function" || typeof AbortController !== "function") {
    console.log("   AbortController no disponible en este entorno.");
    return;
  }
  const controller = new AbortController();
  const signal = controller.signal;

  const promise = fetch("https://jsonplaceholder.typicode.com/users", { signal })
    .then(r => r.json())
    .then(users => console.log("   Usuarios:", users.length))
    .catch(err => {
      if (err.name === "AbortError") console.log("   Petición cancelada");
      else console.log("   Error:", err.message);
    });

  setTimeout(() => controller.abort(), 100); // cancelamos a los 100ms
  await promise;
}
demoAbort();

console.log("");


/* =========================================
 * 9) DOM (solo si corre en navegador)
 *    Evento de click como ejemplo de Web API
 * ========================================= */
if (typeof document !== "undefined") {
  const btn = document.createElement("button");
  btn.textContent = "Hacé clic (evento del usuario)";
  btn.style.margin = "8px";
  document.body.appendChild(btn);

  btn.addEventListener("click", () => {
    console.log("   [DOM] Click recibido → handler en cola de tareas");
    setTimeout(() => console.log("   [DOM] setTimeout después del click"), 0);
    Promise.resolve().then(() => console.log("   [DOM] microtask después del click"));
  });
}
