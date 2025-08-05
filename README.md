# Componentes Web - Guía y Ejemplos

Este proyecto presenta una colección de componentes web comunes implementados con HTML, CSS y JavaScript puro (vanilla JS). Cada componente está diseñado para ser reutilizable, accesible y personalizable.

## Contenido

1. [Componentes Incluidos](#componentes-incluidos)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Explicación Técnica](#explicación-técnica)
4. [Modo Oscuro](#modo-oscuro)
5. [Evento DOMContentLoaded](#evento-domcontentloaded)
6. [Mejores Prácticas](#mejores-prácticas)

## Componentes Incluidos

### Sidebar
Un panel lateral de navegación que puede mostrarse y ocultarse. Proporciona enlaces a diferentes secciones de la página.

**Características:**
- Se muestra/oculta al hacer clic en un botón
- Se cierra automáticamente al hacer clic fuera de él o en un enlace
- Diseño responsivo

### Collapse
Un componente que permite mostrar u ocultar contenido, útil para FAQs o contenido expandible.

**Características:**
- Transición suave entre estados abierto/cerrado
- Interacción intuitiva con un solo botón

### Modal
Ventana emergente que aparece sobre el contenido principal. Incluye un formulario de login con validaciones.

**Características:**
- Overlay que oscurece el fondo
- Cierre mediante botón X o haciendo clic fuera
- Formulario con validaciones en tiempo real
- Mensajes de feedback para el usuario

### Toggle
Un interruptor simple que alterna la visibilidad del contenido.

**Características:**
- Cambio de texto en el botón según el estado
- Similar al collapse pero más simple

### Modo Oscuro
Un sistema de cambio de tema que permite alternar entre modo claro y oscuro.

**Características:**
- Persiste la preferencia del usuario mediante localStorage
- Aplica cambios globales a la interfaz
- Transiciones suaves entre modos

## Arquitectura del Proyecto

El proyecto sigue una arquitectura modular con separación clara de responsabilidades:

- **examples.html**: Estructura HTML y contenido
- **base.css**: Estilos fundamentales y normalizados
- **components.css**: Estilos específicos para cada componente
- **main.js**: Lógica de comportamiento de los componentes

### Patrón de Diseño

Utilizamos un enfoque basado en componentes donde cada funcionalidad está encapsulada en su propia función de inicialización, siguiendo principios similares a la programación orientada a objetos pero manteniéndose ligero.

## Explicación Técnica

### CSS

- **Variables CSS**: Utilizamos variables para gestionar colores, sombras y transiciones
- **Selectores específicos**: Evitamos selectores muy genéricos para prevenir conflictos
- **Transiciones**: Aplicamos transiciones suaves para mejorar la experiencia de usuario
- **Media queries**: (No incluidas pero recomendadas) Para adaptar componentes a diferentes dispositivos

### JavaScript

Nuestro JavaScript sigue un patrón de módulos donde cada componente se inicializa de forma independiente:

```javascript
// Patrón utilizado para cada componente
const initComponent = () => {
    // Seleccionar elementos
    // Configurar eventos
    // Definir comportamientos
};
```

Usamos una función auxiliar `$` como atajo para `document.querySelector` para simplificar la selección de elementos.

## Modo Oscuro

El modo oscuro se implementa mediante:

1. Variables CSS que definen colores para ambos modos
2. Una clase `dark-mode` en el elemento `body` que activa el tema oscuro
3. Almacenamiento de la preferencia en `localStorage`
4. Un toggle switch para permitir al usuario cambiar entre modos

```css
/* Ejemplo de implementación */
:root {
  --bg-color: #f5f5f5; /* Modo claro por defecto */
}

body.dark-mode {
  --bg-color: #121212; /* Modo oscuro cuando se activa la clase */
}

body {
  background-color: var(--bg-color);
  transition: background-color 0.3s ease;
}
```

## Evento DOMContentLoaded

### ¿Qué es DOMContentLoaded?

`DOMContentLoaded` es un evento que se dispara cuando el documento HTML ha sido completamente cargado y parseado, sin esperar a que terminen de cargarse hojas de estilo, imágenes y subframes. Este evento marca el punto en que el DOM (Document Object Model) está listo para ser manipulado con JavaScript.

### Diferencia con el evento load

- **DOMContentLoaded**: Se dispara cuando el HTML está completamente cargado y el DOM construido
- **load**: Se dispara cuando toda la página ha terminado de cargar, incluyendo todos los recursos (imágenes, estilos, scripts, etc.)

### Uso en este proyecto

En nuestro proyecto, utilizamos `DOMContentLoaded` para inicializar todos los componentes una vez que el DOM está listo:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    initSidebar();
    initCollapse();
    initModal();
    initToggle();
    initDarkMode();
});
```

Esto garantiza que:

1. Todos los elementos HTML que necesitamos manipular ya existen en el DOM
2. Podemos añadir eventos y modificar propiedades sin errores
3. La inicialización ocurre lo antes posible, sin esperar recursos que no son esenciales

### Buenas prácticas

- Siempre inicializa tu JavaScript después de que el DOM esté listo
- Coloca los scripts al final del body o usa `DOMContentLoaded` para asegurar que el HTML esté disponible
- Separa la inicialización de la definición de funciones para mejorar la organización del código

## Mejores Prácticas

1. **Separación de Responsabilidades**:
   - HTML para estructura
   - CSS para presentación
   - JavaScript para comportamiento

2. **Progressive Enhancement**:
   - Los componentes funcionan incluso si JavaScript está deshabilitado
   - CSS proporciona estilos base que luego son mejorados con JS

3. **Accesibilidad**:
   - Uso semántico de HTML
   - Atributos ARIA (recomendados para una implementación completa)
   - Navegación por teclado (en implementación)

4. **Rendimiento**:
   - JavaScript modular y ligero
   - Reutilización de funciones
   - Mínimas manipulaciones del DOM

5. **Mantenibilidad**:
   - Código comentado
   - Estructura clara
   - Nombres descriptivos de funciones y variables

---

## Uso de los componentes

Para utilizar estos componentes en tu proyecto:

1. Incluye los archivos CSS (base.css y components.css)
2. Incluye el archivo JavaScript (main.js)
3. Copia la estructura HTML del componente deseado
4. Personaliza según tus necesidades

## Personalización

Los componentes pueden personalizarse modificando las variables CSS o ajustando los estilos directamente en components.css.

---

---

## Teoría Básica: Bucles `for` en JavaScript

### 1. Bucle `for` Tradicional

El bucle `for` clásico es la estructura de repetición más común y versátil en JavaScript.

**Sintaxis:**
```javascript
for (inicialización; condición; actualización) {
    // Código a ejecutar
}
```

**Ejemplo:**
```javascript
// Contar del 1 al 5
for (let i = 1; i <= 5; i++) {
    console.log(i); // Muestra: 1, 2, 3, 4, 5
}

// Recorrer un array
const frutas = ['manzana', 'banana', 'naranja'];
for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i]);
}
```

**Casos de uso:**
- Cuando necesitas el índice del elemento
- Para iterar un número específico de veces
- Cuando necesitas control total sobre la iteración

### 2. Bucle `forEach`

El método `forEach` es específico para arrays y ejecuta una función para cada elemento del array.

**Sintaxis:**
```javascript
array.forEach((elemento, índice, arrayCompleto) => {
    // Código a ejecutar
});
```

**Ejemplos:**
```javascript
const colores = ['rojo', 'verde', 'azul'];

// Forma básica
colores.forEach(color => {
    console.log(color);
});

// Con índice
colores.forEach((color, index) => {
    console.log(`${index}: ${color}`);
});

// Ejemplo práctico: agregar clase CSS a elementos
const botones = document.querySelectorAll('.btn');
botones.forEach(boton => {
    boton.addEventListener('click', () => {
        console.log('Botón clickeado');
    });
});
```

**Características importantes:**
- No puede usar `break` o `continue`
- No retorna un nuevo array
- Ideal para efectos secundarios (modificar DOM, hacer peticiones, etc.)

### 3. Bucle `for...of`

El bucle `for...of` itera sobre valores de objetos iterables (arrays, strings, NodeLists, etc.).

**Sintaxis:**
```javascript
for (const elemento of iterable) {
    // Código a ejecutar
}
```

**Ejemplos:**
```javascript
// Con arrays
const numeros = [10, 20, 30];
for (const numero of numeros) {
    console.log(numero); // 10, 20, 30
}

// Con strings
const palabra = "Hola";
for (const letra of palabra) {
    console.log(letra); // H, o, l, a
}

// Con NodeList (elementos del DOM)
const elementos = document.querySelectorAll('.item');
for (const elemento of elementos) {
    elemento.style.color = 'blue';
}

// Con destructuring
const personas = [
    ['Juan', 25],
    ['María', 30],
    ['Carlos', 28]
];

for (const [nombre, edad] of personas) {
    console.log(`${nombre} tiene ${edad} años`);
}
```

**Ventajas:**
- Sintaxis más limpia que el for tradicional
- Funciona con cualquier objeto iterable
- Permite usar `break` y `continue`

### 4. Bucle `for...in`

El bucle `for...in` itera sobre las propiedades enumerables de un objeto.

**Sintaxis:**
```javascript
for (const propiedad in objeto) {
    // Código a ejecutar
}
```

**Ejemplos:**
```javascript
// Con objetos
const persona = {
    nombre: 'Ana',
    edad: 25,
    ciudad: 'Madrid'
};

for (const propiedad in persona) {
    console.log(`${propiedad}: ${persona[propiedad]}`);
}
// Resultado:
// nombre: Ana
// edad: 25
// ciudad: Madrid

// Con arrays (no recomendado, usa for...of)
const frutas = ['manzana', 'banana'];
for (const indice in frutas) {
    console.log(indice); // "0", "1" (como strings)
}
```

**Nota importante:** `for...in` itera sobre índices como strings en arrays, no sobre valores.

### Comparación y Cuándo Usar Cada Uno

| Bucle | Uso Principal | Ventajas | Desventajas |
|-------|---------------|----------|-------------|
| `for` | Control preciso, índices | Máximo control, funciona con todo | Más verboso |
| `forEach` | Arrays, efectos secundarios | Limpio, funcional | No permite break/continue |
| `for...of` | Valores de iterables | Limpio, flexible | Solo para iterables |
| `for...in` | Propiedades de objetos | Bueno para objetos | Confuso con arrays |

### Ejemplos Prácticos en Componentes Web

```javascript
// Inicializar múltiples componentes con forEach
const botones = document.querySelectorAll('.toggle-btn');
botones.forEach(boton => {
    boton.addEventListener('click', toggleContent);
});

// Crear elementos dinámicamente con for...of
const menuItems = ['Inicio', 'Acerca de', 'Contacto'];
const nav = document.querySelector('nav');

for (const item of menuItems) {
    const enlace = document.createElement('a');
    enlace.textContent = item;
    enlace.href = `#${item.toLowerCase()}`;
    nav.appendChild(enlace);
}

// Validar formulario con for...in
const campos = {
    nombre: document.querySelector('#nombre').value,
    email: document.querySelector('#email').value,
    mensaje: document.querySelector('#mensaje').value
};

for (const campo in campos) {
    if (!campos[campo]) {
        console.log(`El campo ${campo} es requerido`);
    }
}
```