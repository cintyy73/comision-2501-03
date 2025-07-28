
# Clase 04 - Módulo III: Eventos en JavaScript

## 🌐 Web Reactiva
Una web reactiva es aquella que responde a eventos generados por el navegador o el usuario, permitiendo una experiencia más interactiva.

## ⚡ ¿Qué son los Eventos?
Un evento es una acción que ocurre en la página web (como clicks, teclas presionadas o cargas de página). Pueden ser generados tanto por el usuario como por el navegador.

### Ejemplos de eventos comunes:
- Click en un botón
- Escribir en un input
- Presionar una tecla

## ✅ Eventos Comunes

| Evento        | ¿Cuándo ocurre?                             | Ejemplo                            |
|---------------|---------------------------------------------|------------------------------------|
| `onclick`     | Al hacer clic                               | `<button onclick="...">`         |
| `ondblclick`  | Al hacer doble clic                         | `<div ondblclick="...">`         |
| `onmouseover` | Al pasar el mouse encima                    | `<img onmouseover="...">`        |
| `onmousemove` | Al mover el mouse sobre un elemento         | `<div onmousemove="...">`        |
| `onscroll`    | Al hacer scroll                             | `window.onscroll = function...`    |
| `onkeydown`   | Al presionar una tecla                      | `<input onkeydown="...">`        |
| `onload`      | Cuando la página se carga                   | `<body onload="...">`            |
| `onsubmit`    | Al enviar un formulario                     | `<form onsubmit="...">`          |

## 🧠 Objeto `Event`
El objeto `Event` es creado automáticamente cuando ocurre un evento y contiene información sobre el mismo.

### Propiedades y Métodos Comunes
- `event.target`: Elemento que disparó el evento.
- `event.type`: Tipo de evento.
- `event.key`: Tecla presionada (solo para teclado).
- `event.clientX/Y`: Coordenadas del mouse.
- `event.preventDefault()`: Previene la acción por defecto.
- `event.stopPropagation()`: Detiene la propagación del evento.

## 🛠 Event Handler
Un "handler" es una función que responde a un evento.

```js
button.onclick = function() {
  alert("¡Hiciste clic!");
};
```

También se puede usar `addEventListener`.

## 🖱 Eventos del Mouse
- `onmouseover`: cuando el mouse entra.
- `onmouseout`: cuando el mouse sale.

## ⌨️ Eventos del Teclado
- `onkeydown`: al presionar una tecla.
- `onkeyup`: al soltarla.
- `onkeypress`: al presionar y soltar.

## 🌀 Propagación de Eventos (Bubbling)
El evento fluye desde el nodo raíz hasta el objetivo y vuelve:
1. Captura
2. Objetivo
3. Burbujeo

Se puede detener con `event.stopPropagation()`.

## 🔁 Callbacks
Funciones que se pasan como argumentos a otras funciones.

```js
miFuncion('texto', (a, b) => a + b);
```

## 🚀 Triggers
Acciones que disparan reacciones programadas. Ej: un clic que abre un modal.

---


