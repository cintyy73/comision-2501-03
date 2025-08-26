## Ejemplos sencillos de asincronía

### 1. Usando `setTimeout` (simula esperar)

`setTimeout` es una función que permite ejecutar código después de que pase cierto tiempo. No bloquea el flujo principal: el programa sigue corriendo mientras espera.

```js
console.log("Empiezo");
setTimeout(() => {
  console.log("Terminé de esperar 1 segundo");
}, 1000);
console.log("Sigo con otras cosas");
```
**¿Qué pasa aquí?**
- Se imprime "Empiezo".
- Se programa una tarea para dentro de 1 segundo (1000 ms).
- Se imprime "Sigo con otras cosas" inmediatamente.
- Después de 1 segundo, se imprime "Terminé de esperar 1 segundo".
Así, el código no se detiene mientras espera.

---

### 2. Usando una Promesa básica y `.then`

Las Promesas son objetos que representan una tarea que terminará en el futuro (puede salir bien o mal). `.then` permite ejecutar código cuando la Promesa se resuelve correctamente.

```js
const promesa = new Promise((resolve) => {
  setTimeout(() => {
    resolve("¡Listo!");
  }, 1000);
});

promesa.then((mensaje) => {
  console.log(mensaje); // Imprime: ¡Listo!
});
```

**¿Qué pasa aquí?**
- Se crea una Promesa que se resuelve después de 1 segundo.
- Cuando la Promesa termina, `.then` recibe el resultado y lo imprime.
- El código dentro de `.then` solo se ejecuta cuando la Promesa está lista.

#### ¿Qué es `.then`?
El método `.then` se usa para decirle a la Promesa qué hacer cuando termine. Recibe una función que se ejecuta cuando la Promesa se resuelve correctamente. Si la Promesa falla, se puede usar `.catch` para manejar el error.

---

### 3. Usando `async/await` para esperar una Promesa

`async/await` es una forma moderna y sencilla de trabajar con Promesas. Permite escribir código asíncrono que parece síncrono, facilitando la lectura y el mantenimiento.

```js
function esperar() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Terminé"), 1000);
  });
}

async function main() {
  console.log("Empiezo");
  const resultado = await esperar();
  console.log(resultado); // Imprime: Terminé
  console.log("Fin");
}

main();
```

**¿Qué pasa aquí?**
- La función `esperar` devuelve una Promesa que se resuelve en 1 segundo.
- La función `main` es `async`, lo que permite usar `await`.
- `await esperar()` pausa la ejecución de `main` hasta que la Promesa se resuelve.
- Se imprime "Empiezo", luego (tras 1 segundo) "Terminé", y finalmente "Fin".
Esto hace que el código sea más fácil de seguir, como si fuera síncrono, pero sin bloquear el hilo principal.
# Clase 12 — Introducción a la asincronía en JavaScript

> **Objetivo:** Al finalizar esta clase, vas a entender cómo funciona la asincronía en el navegador (Web APIs + Event Loop), usar **Promesas**, y escribir código más legible con **`async/await`**. Además, vas a practicar con ejemplos reales.

---

## Ejemplos sencillos de asincronía

### 1. Usando `setTimeout` (simula esperar)

```js
console.log("Empiezo");
setTimeout(() => {
  console.log("Terminé de esperar 1 segundo");
}, 1000);
console.log("Sigo con otras cosas");
```
**Salida:**
Empiezo
Sigo con otras cosas
Terminé de esperar 1 segundo

---

### 2. Usando una Promesa básica y `.then`

```js
const promesa = new Promise((resolve) => {
  setTimeout(() => {
    resolve("¡Listo!");
  }, 1000);
});

promesa.then((mensaje) => {
  console.log(mensaje); // Imprime: ¡Listo!
});
```

#### ¿Qué es `.then`?
El método `.then` se usa para decirle a la Promesa qué hacer cuando termine. Recibe una función que se ejecuta cuando la Promesa se resuelve correctamente. Si la Promesa falla, se puede usar `.catch`.

---

### 3. Usando `async/await` para esperar una Promesa

```js
function esperar() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Terminé"), 1000);
  });
}

async function main() {
  console.log("Empiezo");
  const resultado = await esperar();
  console.log(resultado); // Imprime: Terminé
  console.log("Fin");
}

main();
```

## 1) Por qué existe la asincronía

JavaScript en el navegador corre en **un solo hilo** (single-thread). Si una tarea tarda (llamada a una API), **no queremos bloquear** la UI. La asincronía permite: “**iniciá esto, y mientras tanto seguí con otras cosas**”.

### Analogía rápida

Pedís un café (tarea lenta). Mientras esperás, respondés mensajes (otras tareas). Cuando el café está listo, te llaman (evento) y lo retirás (callback).

---

## 2) Síncrono vs Asíncrono

| Característica         | Síncrono                           | Asíncrono                                           |
| ---------------------- | ---------------------------------- | --------------------------------------------------- |
| Orden de ejecución     | Línea por línea                    | Se delegan tareas lentas y se continúa con lo demás |
| Bloqueo del hilo       | **Sí**, si algo tarda              | **No**, el hilo principal sigue libre               |
| Experiencia de usuario | Puede “congelarse”                 | Fluida (spinner, UI responde)                       |
| Casos de uso           | Cálculos rápidos, lógica inmediata | Red, timers, E/S, animaciones, eventos del usuario  |

### Mini-ejemplo conceptual

```js
// Síncrono (bloquea si tarda)
hacerCalculoPesado(); // ← si tarda 2s, la UI queda congelada 2s
console.log("siguiente línea");

// Asíncrono (no bloquea)
setTimeout(() => {
  console.log("Listo!");
}, 2000);
console.log("siguiente línea"); // se ejecuta enseguida
```

---

3. La asincronía en el navegador: Web APIs + Cola + Event Loop

Imaginemos que JavaScript es un chef 👨‍🍳 que cocina de a una receta a la vez (single-thread).
Si algo tarda, le pide ayuda a sus ayudantes (Web APIs del navegador) y ellos avisan cuando terminan.
Un mesero (Event Loop) se encarga de organizar los pedidos en listas (colas) y entregárselos al chef en el orden correcto.

📊 Esquema del Event Loop
+----------------------+
| Call Stack | 👨‍🍳 Chef (ejecuta JS)
+----------------------+
↑
|
+--------------------------+
| Event Loop 🔄 | 🍽️ Mesero (organiza tareas)
+--------------------------+
↑ ↑
(Microtasks) (Macrotasks)
Promesas .then setTimeout, setInterval,
queueMicrotask eventos (click, teclado)

           +------+             +------+
           | Cola |             | Cola |
           |Micro |             |Macro |
           +------+             +------+
              ↑                    ↑
        +------------+      +--------------+
        | Web APIs   |      |  Web APIs    |
        |  (ayudantes)       (ayudantes)   |
        +------------+      +--------------+
           setTimeout         fetch
           fetch              eventos
           etc...             etc...

📌 Orden de ejecución: setTimeout vs Promise

El Event Loop siempre atiende primero todas las microtasks (Promesas) antes de pasar a la siguiente macrotask (Timers, eventos).

```js
console.log("A");

setTimeout(() => console.log("B (macrotask: setTimeout)"), 0);

Promise.resolve().then(() => console.log("C (microtask: Promise.then)"));

console.log("D");
// 👉 Orden real: A, D, C, B
```

🔎 Explicación:

A se ejecuta en el stack.

setTimeout se delega a Web APIs → vuelve después a la cola de macrotasks.

Promise.then se delega → vuelve a la cola de microtasks.

D se ejecuta en el stack.

El Event Loop revisa:

¿Hay microtasks? ✅ Ejecuta C.

¿Ahora sí? Pasa a una macrotask → ejecuta B.

1. **Call Stack**: donde se ejecuta tu JS (hilo principal).
2. **Web APIs** del navegador: `setTimeout`, `fetch`, eventos de click, etc.
3. **Colas**:
   - **Macrotasks/Task Queue**: `setTimeout`, `setInterval`, `MessageChannel`, eventos.
   - **Microtasks/Microtask Queue**: `Promise.then`, `queueMicrotask`, `MutationObserver`.
4. **Event Loop**: cuando el stack está libre, mueve tareas desde las colas al stack.
   - **Orden**: primero vacía **microtasks**, luego toma **una** macrotask, y vuelve a empezar.

### Ejemplo de orden (microtask vs macrotask)

```js
console.log("A");
setTimeout(() => console.log("B (macrotask)"), 0);
Promise.resolve().then(() => console.log("C (microtask)"));
console.log("D");
// Orden real: A, D, C, B
```

---

## 4) **Promesas (Promise)**

Una **Promesa** representa un resultado “futuro”: _pendiente_ → _resuelta_ (fulfilled) o _rechazada_ (rejected).


```js
const promesa = new Promise((resolve, reject) => {
  const exito = Math.random() > 0.5;
  setTimeout(() => {
    if (exito) {
      resolve("OK ✅");
    } else {
      reject("Error ❌");
    }
  }, 500);
});

promesa
  .then((msg) => console.log("then:", msg)) // Se ejecuta si todo sale bien
  .catch((err) => console.log("catch:", err)) // Se ejecuta si hay error
  .finally(() => console.log("fin")); // Se ejecuta siempre
```

// Explicación de .then:
// Cuando la promesa termina correctamente, .then recibe el resultado y lo usa.
// Si hay error, .catch lo maneja. .finally se ejecuta siempre, pase lo que pase.

### Composición útil

```js
// Paralelo
const [u, pdtos] = await Promise.all([fetchUsers(), fetchProducts()]);

// Tolerante a fallos
const resultados = await Promise.allSettled([fetchA(), fetchB()]);
```

---

## 5) **`async` / `await`**

Syntactic sugar para **promesas**: se lee como código síncrono pero **no bloquea**.

```js
async function cargar() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error("Falló la carga:", e.message);
  } finally {
    console.log("Listo.");
  }
}
```

### Secuencial vs Paralelo con `await`

```js
// ❌ Secuencial (más lento)
const a = await fetchA();
const b = await fetchB();

// ✅ Paralelo (más rápido)
const [a2, b2] = await Promise.all([fetchA(), fetchB()]);
```

---

## 6) **Timers** y eventos (Web APIs)

- `setTimeout(fn, ms)`: ejecuta **una vez** luego de `ms`.
- `setInterval(fn, ms)`: ejecuta **repetidamente** cada `ms`.
- Eventos: `addEventListener("click", handler)` → se encola el handler cuando ocurre.

```js
document.querySelector("#btn").addEventListener("click", () => {
  console.log("Click! (evento del usuario)");
});
```

---

## 7) **Abortar `fetch`** con `AbortController` (extra)

```js
const controller = new AbortController();
const signal = controller.signal;

fetch("https://jsonplaceholder.typicode.com/users", { signal })
  .then((r) => r.json())
  .then(console.log)
  .catch((err) => {
    if (err.name === "AbortError") console.log("Petición cancelada");
    else console.error(err);
  });

// …en otro momento:
controller.abort();
```

---


## 8) Ejercicios en vivo (para usar con los .js adjuntos)

1. **Orden real**: predecir salida y luego ejecutar `A-D-C-B` (micro vs macro).
2. **Refactor**: pasar un código con `.then` a `async/await` con `try/catch`.
3. **Paralelizar**: convertir dos `await` secuenciales a `Promise.all`.
4. **Errores**: simular 404 y manejar mensaje de error visible al usuario.
5. **Abortar**: iniciar `fetch`, cancelar a los 300 ms y verificar `AbortError`.

