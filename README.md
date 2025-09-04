# Rick and Morty Cards con Filtros Dinámicos

## Descripción
Este ejercicio muestra cómo consumir la API pública de Rick and Morty para renderizar tarjetas de personajes y aplicar filtros dinámicos por nombre, especie, estado y género. Utiliza Bulma para los estilos y JavaScript moderno (ES6+).

---

# Guía paso a paso para recrear el ejercicio de Rick and Morty Cards

## 1. Crear la estructura de archivos
Crea una carpeta y dentro los archivos:
- `index.html`
- `app.js`
- `README.md`

## 2. Agregar Bulma al HTML
En el `<head>` de tu HTML:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
```

## 3.
- API: Permite obtener datos externos en formato JSON.
- fetch: Método nativo para consumir APIs.
- Bulma: Framework CSS para estilos rápidos y responsivos.
- Arrow functions: Sintaxis moderna y concisa.
- Manipulación del DOM: Para mostrar y actualizar los datos en la página.
- Filtros automáticos: Mejoran la experiencia del usuario.

## Paso a paso para replicar el ejercicio

### 1. Estructura de archivos
- `index.html`: Estructura y filtros del formulario.
- `app.js`: Lógica de consumo de API, renderizado y filtrado.
- `README.md`: Explicación y guía.

### 2. Teoría
#### ¿Qué es una API?
Una API (Interfaz de Programación de Aplicaciones) permite que dos sistemas se comuniquen. En este caso, la API de Rick and Morty expone datos de personajes en formato JSON accesible vía HTTP.

#### ¿Qué es fetch?
`fetch` es una función nativa de JavaScript para hacer peticiones HTTP y obtener datos de servidores externos. Devuelve una promesa que se resuelve con la respuesta.

#### ¿Qué es Bulma?
Bulma es un framework CSS moderno basado en Flexbox, que facilita la creación de interfaces responsivas y atractivas sin escribir mucho CSS.

#### ¿Qué es el DOM?
El DOM (Document Object Model) es la representación en memoria de la estructura HTML. Usamos métodos como `getElementById` para acceder y modificar elementos.

#### ¿Qué es un filtro dinámico?
Un filtro dinámico actualiza los resultados en tiempo real, sin necesidad de recargar la página ni presionar un botón. Se logra escuchando eventos como `input` y `change` en los campos del formulario.

---

### 3. Implementación

#### a) Crear el HTML
Incluye Bulma y define los filtros:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
<!-- ...formulario con filtros por nombre, especie, estado y género... -->
```

#### b) Crear el JS
- Usar `fetch` para obtener personajes y especies.
- Renderizar tarjetas con los datos.
- Aplicar colores según estado y género usando clases Bulma.
- Escuchar eventos en los filtros para actualizar los resultados automáticamente.

#### c) Lógica de filtrado
- El filtro por nombre usa el evento `input`.
- Los filtros de especie, estado y género usan el evento `change`.
- Al cambiar cualquier filtro, se hace una nueva petición a la API y se actualizan las tarjetas.

#### d) Mejoras y buenas prácticas
- Usar funciones flecha y helpers para código más limpio.
- Evitar repeticiones con funciones como `getFilters` y `getTagClass`.
- Eliminar el botón de filtrado para UX más fluida.

---

## Recursos
- [API Rick and Morty](https://rickandmortyapi.com/documentation)
- [Bulma](https://bulma.io/documentation/)
- [fetch MDN](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)

---

