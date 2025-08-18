# Teoría y fundamentos del ejemplo

Este proyecto muestra cómo crear una landing page moderna y responsive usando Bulma, Font Awesome y JavaScript modular. A continuación se explican los conceptos principales utilizados:

---

## Bulma CSS

Bulma es un framework CSS basado en Flexbox que permite crear interfaces web responsivas y modernas sin necesidad de escribir CSS personalizado. Sus componentes principales son:

- **Navbar**: Barra de navegación fija y adaptable. [Ver documentación](https://bulma.io/documentation/components/navbar/)
- **Cards**: Tarjetas para mostrar información de manera visual y ordenada. [Ver documentación](https://bulma.io/documentation/components/card/)
- **Columns**: Sistema de grillas para distribuir elementos en filas y columnas. [Ver documentación](https://bulma.io/documentation/layout/columns/)
- **Formularios**: Campos, botones, radios y checkboxes estilizados. [Ver documentación](https://bulma.io/documentation/form/general/)
- **Footer**: Pie de página con diseño profesional. [Ver documentación](https://bulma.io/documentation/layout/footer/)

---

## Font Awesome

Font Awesome es una librería de iconos vectoriales que se integra fácilmente con Bulma y otros frameworks. Permite agregar iconos visuales a botones, cards, formularios y más. [Ver documentación](https://fontawesome.com/icons)

---

## JavaScript modular

El ejemplo utiliza JavaScript moderno y modular para manejar la interacción del usuario:

- **Selección de elementos**: Se usa la función `$` para seleccionar elementos del DOM de forma sencilla.
- **Validación en tiempo real**: Los campos del formulario se validan mientras el usuario escribe, mostrando feedback visual inmediato.
- **Eventos**: Se emplea `addEventListener` para escuchar eventos como `input` y `submit`.
- **Lógica separada**: La lógica de validación y la manipulación del DOM están separadas en funciones para facilitar el mantenimiento.

Referencias:
- [MDN: querySelector](https://developer.mozilla.org/es/docs/Web/API/Document/querySelector)
- [MDN: addEventListener](https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener)

---

## Flujo del ejemplo

1. El usuario navega por las secciones usando la navbar fija.
2. Visualiza carreras y cursos en cards con iconos y descripciones.
3. Completa el formulario de contacto, que valida los datos en tiempo real.
4. Al enviar el formulario, los datos se muestran en consola y se da feedback visual.

---

## Recursos útiles

- [Bulma: Todos los componentes](https://bulma.io/documentation/)
- [Font Awesome: Todos los iconos](https://fontawesome.com/icons)
- [MDN: JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
# Teoría y Utilidad de Bulma CSS

Bulma es un framework CSS moderno basado en Flexbox que permite crear interfaces web responsivas y atractivas de forma sencilla. A continuación se detallan los principales conceptos y componentes utilizados en el ejemplo:

## 1. Contenedor principal (`.container`)
Sirve para centrar y limitar el ancho del contenido, haciendo que la página se vea ordenada en cualquier dispositivo.

## 2. Encabezados (`.title`, `.subtitle`)
Permiten crear títulos y subtítulos con estilos predefinidos y opciones de alineación, tamaño y color.

## 3. Sistema de columnas (`.columns`, `.column`)
Bulma utiliza Flexbox para crear grillas responsivas. Las columnas pueden tener diferentes tamaños y se adaptan automáticamente a móviles, tablets y computadoras usando modificadores como `.is-half`, `.is-one-quarter`, `.is-full-mobile`, `.is-half-tablet`, `.is-one-third-desktop`.

## 4. Offset (`.is-offset-*`)
Permite desplazar columnas hacia la derecha sin necesidad de agregar columnas vacías, logrando diseños más flexibles.

## 5. Columnas anidadas
Se pueden crear grillas dentro de otras columnas para organizar mejor el contenido.

## 6. Tarjetas (`.card`)
Las tarjetas son componentes visuales que agrupan imágenes, títulos y textos de forma atractiva y ordenada.

## 7. Botones (`.button`)
Bulma ofrece botones con diferentes colores, tamaños y estilos. Se pueden personalizar con modificadores como `.is-primary`, `.is-danger`, `.is-outlined` y agregar íconos con `.icon`.

## 8. Helpers
Clases que permiten modificar rápidamente colores de fondo (`.has-background-*`), alineación de texto (`.has-text-centered`), márgenes (`.mt-5`), etc.

## 9. Formularios (`.field`, `.input`, `.textarea`, `.button`)
Bulma facilita la creación de formularios estilizados y accesibles, con soporte para íconos y agrupación de campos.

## 10. Navbar (`.navbar`)
El navbar es un componente de navegación responsivo que incluye menú hamburguesa para móviles, enlaces y botones personalizados.

## 11. Responsividad
Bulma utiliza modificadores para adaptar el diseño a diferentes tamaños de pantalla sin necesidad de media queries manuales.

## 12. Íconos
Se pueden integrar íconos de Font Awesome fácilmente en botones, inputs y otros elementos para mejorar la experiencia visual.

---

## ¿Para qué sirve Bulma?
- Crear páginas web modernas y responsivas rápidamente.
- Organizar el contenido en grillas flexibles.
- Personalizar estilos sin escribir CSS desde cero.
- Mejorar la accesibilidad y la experiencia de usuario.

## ¿Cómo se usa?
1. Se incluye el enlace a Bulma en el `<head>` del HTML.
2. Se aplican las clases de Bulma a los elementos HTML según la documentación.
3. Se combinan componentes y helpers para lograr el diseño deseado.

---

**Documentación oficial:** [https://bulma.io/documentation/](https://bulma.io/documentation/)
