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

