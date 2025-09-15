# 📚 Clase 2: Manipulación del DOM con JavaScript

## 🧠 ¿Qué es el DOM?

El **DOM (Document Object Model)** es la estructura en forma de árbol que representa todos los elementos de una página HTML. JavaScript permite acceder, crear y modificar estos elementos de forma dinámica.

---

## 🔗 Relaciones entre Elementos

- **Padre**: Elemento que contiene a otros.
- **Hijo**: Elemento contenido dentro de un padre.
- **Hermanos (siblings)**: Elementos que comparten el mismo padre.

### 📌 Propiedades útiles:
- `element.parentElement` → accede al padre.
- `element.children` → accede a todos los hijos.
- `element.previousElementSibling` → hermano anterior.
- `element.nextElementSibling` → hermano siguiente.

---

## 🛠️ Crear Elementos en el DOM

JavaScript permite crear nuevos nodos con los siguientes métodos:

- `document.createElement("tag")`: crea un nodo HTML.
- `document.createTextNode("texto")`: crea un nodo de texto.
- `element.appendChild(child)`: inserta un nodo hijo dentro de otro nodo.

### 🧪 Ejemplo:
```js
const boton = document.createElement("button");
const texto = document.createTextNode("Ver más");
boton.appendChild(texto);
document.body.appendChild(boton);
```

---

## ✏️ Modificar el Contenido de un Elemento

### 🔸 `.innerHTML`
Permite leer o modificar el contenido **HTML** de un elemento.
```js
element.innerHTML = "<strong>Hola</strong>";
```

### 🔸 `.innerText`
Permite leer o modificar el **texto plano** de un elemento.
```js
element.innerText = "Hola";
```

---

## 🧩 Template Strings (Plantillas Literales)

Los **template strings** permiten insertar variables o expresiones directamente en un string utilizando comillas invertidas (`` ` ``):

```js
const nombre = "Ada";
const saludo = `Hola, ${nombre}`; // Resultado: "Hola, Ada"
```

También podés usarlos para insertar HTML dinámico:

```js
const titulo = "Bienvenid@";
const template = `<h1>${titulo}</h1>`;
document.body.innerHTML += template;
```

---

## ✅ Conclusión

Con estas herramientas podemos:
- Crear contenido HTML desde JavaScript.
- Modificar elementos y texto dinámicamente.
- Mejorar la interactividad de nuestras páginas web.

---


