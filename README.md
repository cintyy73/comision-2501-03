# 🌐 Guía Completa: Manejo del DOM con JavaScript

## 📚 Tabla de Contenidos

1. [¿Qué es el DOM?](#-qué-es-el-dom)
2. [Componentes del DOM](#-componentes-del-dom)
3. [Objetos Importantes](#-objetos-importantes)
4. [Métodos de Selección](#-métodos-de-selección)
5. [Modificar Contenido](#-modificar-contenido)
6. [Crear y Agregar Elementos](#-crear-y-agregar-elementos)
7. [Event Listeners](#-event-listeners)
8. [Mejores Prácticas](#-mejores-prácticas)
9. [Ejercicios Prácticos](#-ejercicios-prácticos)
10. [Recursos Adicionales](#-recursos-adicionales)

---

## 📖 ¿Qué es el DOM?

El **DOM (Document Object Model)** es la representación que hace el navegador de una página HTML como un **árbol de nodos**. Es la interfaz que nos permite usar JavaScript para interactuar con elementos HTML.

### 🌳 Conceptos clave:
- **Cada etiqueta, atributo y texto** es un nodo del DOM
- JavaScript puede **leer, modificar, eliminar o agregar** nodos
- Es la **interfaz** entre el documento HTML y JavaScript
- Se crea automáticamente cuando el navegador carga una página

### 📋 Ejemplo de estructura DOM:
```
document
└── html
    ├── head
    │   ├── title
    │   └── meta
    └── body
        ├── div
        │   ├── h1
        │   └── p
        └── script
```

---

## 🧱 Componentes del DOM

### 📌 Principales componentes:

| Componente | Descripción | Ejemplo |
|------------|-------------|---------|
| **document** | Representa el documento completo | `document.title` |
| **element** | Cualquier etiqueta HTML | `<h1>`, `<div>`, `<p>` |
| **attribute** | Atributos de las etiquetas | `src`, `alt`, `href`, `class` |
| **nodeList** | Lista de nodos (como un array) | Resultado de `querySelectorAll()` |
| **text** | Contenido de texto dentro de elementos | "Hola mundo" |

---

## 🌐 Objetos Importantes

### 🪟 **window**
- Representa la **ventana del navegador**
- Es el objeto global en JavaScript del navegador
- Contiene todas las variables globales y funciones

```javascript
console.log(window.innerWidth);  // Ancho de la ventana
console.log(window.location);    // URL actual
window.alert("¡Hola!");         // Mostrar alerta
```

### 📄 **document**
- Representa el **DOM cargado** en la ventana
- Es una propiedad de window (`window.document`)
- Punto de entrada para manipular el DOM

```javascript
console.log(document.title);     // Título de la página
console.log(document.URL);       // URL del documento
document.body.style.background = "lightblue";
```

---

## 🔍 Métodos de Selección

### 🎯 Por ID (único elemento)
```javascript
// Selecciona UN elemento por su ID
const elemento = document.getElementById('miId');
```

### 🏷️ Por Clase
```javascript
// Métodos que devuelven múltiples elementos
const elementos = document.getElementsByClassName('miClase');
const elemento = document.querySelector('.miClase');        // Primer elemento
const todosElementos = document.querySelectorAll('.miClase'); // Todos los elementos
```

### 🏗️ Por Etiqueta
```javascript
// Seleccionar por tipo de etiqueta
const divs = document.getElementsByTagName('div');
const primerDiv = document.querySelector('div');
const todosDivs = document.querySelectorAll('div');
```

### 🔧 Por Atributo
```javascript
// Seleccionar por atributos específicos
const elemento = document.querySelector('[data-info]');
const botones = document.querySelectorAll('[type="button"]');
const enlaces = document.querySelectorAll('a[href^="https"]');
```

### 💡 **Recomendación**: Usa `querySelector()` y `querySelectorAll()` porque son más flexibles

---

## ✏️ Modificar Contenido

### 📝 Cambiar Texto
```javascript
const elemento = document.getElementById('miElemento');

// Solo texto (más seguro)
elemento.textContent = 'Nuevo texto';

// Texto con HTML (cuidado con XSS)
elemento.innerHTML = '<strong>Texto en negrita</strong>';
```

### 🏷️ Manipular Atributos
```javascript
// Establecer atributo
elemento.setAttribute('src', 'nueva-imagen.jpg');
elemento.setAttribute('alt', 'Descripción de la imagen');

// Obtener atributo
const valorSrc = elemento.getAttribute('src');

// Eliminar atributo
elemento.removeAttribute('alt');

// Propiedades directas (más común)
elemento.src = 'imagen.jpg';
elemento.className = 'nueva-clase';
elemento.id = 'nuevo-id';
```

### 🎨 Modificar Estilos
```javascript
// Estilos individuales
elemento.style.color = 'red';
elemento.style.backgroundColor = 'blue';
elemento.style.fontSize = '20px';

// Múltiples estilos
elemento.style.cssText = 'color: red; background: blue; font-size: 20px;';

// Agregar/quitar clases (recomendado)
elemento.classList.add('nueva-clase');
elemento.classList.remove('clase-vieja');
elemento.classList.toggle('activo');
elemento.classList.contains('activo'); // true/false
```

---

## ➕ Crear y Agregar Elementos

### 🆕 Crear Elementos
```javascript
// Crear nuevo elemento
const nuevoDiv = document.createElement('div');
nuevoDiv.textContent = 'Soy un div nuevo';
nuevoDiv.className = 'mi-clase';

// Crear elemento con contenido HTML
const nuevoParrafo = document.createElement('p');
nuevoParrafo.innerHTML = 'Texto con <strong>formato</strong>';
```

### 📌 Agregar al DOM
```javascript
// Agregar al final de un elemento
document.body.appendChild(nuevoDiv);
elemento.appendChild(nuevoParrafo);

// Insertar antes de otro elemento
elemento.insertBefore(nuevoDiv, primerHijo);

// Métodos modernos (más flexibles)
elemento.append(nuevoDiv);           // Al final
elemento.prepend(nuevoDiv);          // Al inicio
elemento.after(nuevoDiv);            // Después del elemento
elemento.before(nuevoDiv);           // Antes del elemento
```

### 🗑️ Eliminar Elementos
```javascript
// Método tradicional
elemento.removeChild(hijo);

// Método moderno (recomendado)
elemento.remove();

// Limpiar contenido
elemento.innerHTML = '';
elemento.textContent = '';
```

---

## 👂 Event Listeners

### 🎯 Agregar Eventos
```javascript
// Método recomendado
elemento.addEventListener('click', function() {
    console.log('¡Elemento clickeado!');
});

// Con función externa
function manejarClick() {
    console.log('¡Click manejado!');
}
elemento.addEventListener('click', manejarClick);

// Eventos comunes
elemento.addEventListener('mouseover', function() { /* hover */ });
elemento.addEventListener('keydown', function(event) { /* tecla presionada */ });
elemento.addEventListener('submit', function(event) { /* formulario enviado */ });
```

### 📋 Eventos Comunes
| Evento | Descripción | Cuándo ocurre |
|--------|-------------|---------------|
| `click` | Clic del mouse | Al hacer clic |
| `mouseover` | Mouse encima | Al pasar el mouse |
| `keydown` | Tecla presionada | Al presionar tecla |
| `submit` | Envío de formulario | Al enviar form |
| `load` | Página cargada | Al cargar página |
| `resize` | Ventana redimensionada | Al cambiar tamaño |

---

## ✅ Mejores Prácticas

### 🔒 1. Siempre verificar que el elemento existe
```javascript
const elemento = document.getElementById('miElemento');
if (elemento) {
    elemento.textContent = 'Texto modificado';
} else {
    console.error('Elemento no encontrado');
}
```

### ⏰ 2. Esperar a que el DOM esté listo
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Todo tu código aquí
    console.log('DOM completamente cargado');
});
```

### 🎯 3. Usar querySelector para mayor flexibilidad
```javascript
// Más flexible que getElementById
const elemento = document.querySelector('#miId');
const primerParrafo = document.querySelector('p');
const elementoComplejo = document.querySelector('.clase[data-activo="true"]');
```

### 🚀 4. Usar classList en lugar de className
```javascript
// ✅ Recomendado
elemento.classList.add('activo');

// ❌ Evitar
elemento.className += ' activo';
```

---

## 🎯 Ejercicios Prácticos

### 📝 Ejercicio 1: Cambiar Contenido
Crea un botón que cambie el texto de un párrafo al hacer clic.

```html
<p id="mensaje">Texto original</p>
<button id="cambiar">Cambiar texto</button>
```

**Solución:**
```javascript
document.getElementById('cambiar').addEventListener('click', function() {
    document.getElementById('mensaje').textContent = '¡Texto cambiado!';
});
```

### 🎨 Ejercicio 2: Cambiar Estilos
Crea botones para cambiar el color de un elemento.

```html
<div id="caja">Caja de colores</div>
<button onclick="cambiarColor('red')">Rojo</button>
<button onclick="cambiarColor('blue')">Azul</button>
```

**Solución:**
```javascript
function cambiarColor(color) {
    document.getElementById('caja').style.backgroundColor = color;
}
```

### ➕ Ejercicio 3: Agregar Elementos
Crea un campo de texto y un botón para agregar elementos a una lista.

```html
<input type="text" id="nuevoItem" placeholder="Escribe algo...">
<button id="agregar">Agregar</button>
<ul id="lista"></ul>
```

**Solución:**
```javascript
document.getElementById('agregar').addEventListener('click', function() {
    const input = document.getElementById('nuevoItem');
    const lista = document.getElementById('lista');
    
    if (input.value.trim() !== '') {
        const nuevoLi = document.createElement('li');
        nuevoLi.textContent = input.value;
        lista.appendChild(nuevoLi);
        input.value = ''; // Limpiar input
    }
});
```

---

## 🔧 Métodos Útiles para Debugging

### 🕵️ Inspeccionar elementos
```javascript
// Ver información del elemento
console.log(elemento);
console.log(elemento.tagName);        // Nombre de la etiqueta
console.log(elemento.attributes);     // Lista de atributos
console.log(elemento.children);       // Elementos hijos
console.log(elemento.parentElement);  // Elemento padre
```

### 📊 Información del documento
```javascript
// Estadísticas del DOM
console.log('Total elementos:', document.getElementsByTagName('*').length);
console.log('Total divs:', document.getElementsByTagName('div').length);
console.log('Título:', document.title);
console.log('URL:', document.URL);
```

---

## 🚨 Errores Comunes y Soluciones

### ❌ Error: "Cannot read property of null"
**Problema:** Intentar manipular un elemento que no existe.
```javascript
// ❌ Malo
document.getElementById('noExiste').textContent = 'texto';

// ✅ Bueno
const elemento = document.getElementById('miElemento');
if (elemento) {
    elemento.textContent = 'texto';
}
```

### ❌ Error: Ejecutar código antes de que el DOM esté listo
**Problema:** JavaScript se ejecuta antes de que los elementos existan.
```javascript
// ✅ Solución
document.addEventListener('DOMContentLoaded', function() {
    // Tu código aquí
});
```

### ❌ Error: Confundir textContent e innerHTML
```javascript
// Para texto plano (seguro)
elemento.textContent = 'Mi texto';

// Para HTML (cuidado con contenido de usuarios)
elemento.innerHTML = '<strong>Mi texto</strong>';
```

---

## 📚 Recursos Adicionales

### 📖 Documentación Oficial
- [MDN - DOM](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model)
- [MDN - Document](https://developer.mozilla.org/es/docs/Web/API/Document)
- [MDN - Element](https://developer.mozilla.org/es/docs/Web/API/Element)

### 🛠️ Herramientas de Desarrollo
- **DevTools del navegador**: F12 para inspeccionar elementos
- **Console**: Para probar código JavaScript
- **Elements**: Para ver la estructura del DOM

### 💡 Consejos para Seguir Aprendiendo
1. **Practica todos los días** con pequeños proyectos
2. **Experimenta** en la consola del navegador
3. **Lee código** de otros desarrolladores
---

## 🎉 ¡Felicitaciones!

Ahora tienes las herramientas necesarias para:
- ✅ Entender qué es y cómo funciona el DOM
- ✅ Seleccionar elementos de diferentes maneras
- ✅ Modificar contenido, atributos y estilos
- ✅ Crear y manipular elementos dinámicamente
- ✅ Manejar eventos de usuario
- ✅ Aplicar mejores prácticas

---

*💪 La programación se aprende practicando. *
