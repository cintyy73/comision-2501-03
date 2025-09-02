# Guía de Uso de Fetch API con MockAPI

## Introducción

Esta guía explica paso a paso cómo realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) utilizando la Fetch API de JavaScript para conectarse a un servicio de MockAPI. El ejemplo incluye un HTML completo con una interfaz de usuario y un archivo JavaScript con las funciones detalladas.

## Archivos incluidos

1. `fetch_mockapi.html` - Interfaz gráfica completa para trabajar con la API
2. `fetch_mockapi.js` - Archivo JavaScript con funciones detalladas y explicaciones

## Conceptos principales

Esta guía cubre:

- Fetch API para realizar peticiones HTTP
- Async/await para manejar código asíncrono
- Operaciones CRUD (Create, Read, Update, Delete)
- Manejo de errores en peticiones asíncronas
- Manipulación del DOM para mostrar resultados

## Cómo usar estos ejemplos

1. Abre `fetch_mockapi.html` en tu navegador para ver la interfaz completa funcionando
2. Estudia `fetch_mockapi.js` para entender las funciones individuales con comentarios explicativos

## URL de la API de ejemplo

```
https://68af4654b91dfcdd62bbe419.mockapi.io/api/usuarios
```

## Estructura de datos

```javascript
{
  "id": "1",
  "createdAt": "2023-05-17T05:10:10.081Z",
  "name": "Nombre Usuario",
  "avatar": "https://ejemplo.com/imagen.jpg",
  "country": "País",
  "job": "Profesión"
}
```

## Operaciones disponibles

### Obtener todos los usuarios

```javascript
// Función para obtener usuarios
async function obtenerUsuarios() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
```

### Crear un nuevo usuario

```javascript
// Función para crear usuario
async function crearUsuario(datosUsuario) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosUsuario)
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### Actualizar un usuario existente

```javascript
// Función para actualizar usuario
async function actualizarUsuario(id, datosActualizados) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosActualizados)
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### Eliminar un usuario

```javascript
// Función para eliminar usuario
async function eliminarUsuario(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}
```


## Recursos adicionales

- [MDN Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [MDN Using Fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)
- [MockAPI Documentation](https://mockapi.io/docs)
