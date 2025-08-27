# 📘 Clase 13 — CORS, Fetch, Then y Catch

## 📑 Índice
- [🔹 ¿Qué es CORS?](#-qué-es-cors)
- [🔹 ¿Qué es fetch?](#-qué-es-fetch)
- [🔹 Ejemplo de uso con fetch](#-ejemplo-de-uso-con-fetch)
  - [GET — Obtener datos](#get--obtener-datos)
  - [POST — Crear un nuevo usuario](#post--crear-un-nuevo-usuario)
  - [PUT — Actualizar un usuario](#put--actualizar-un-usuario)
  - [DELETE — Eliminar un usuario](#delete--eliminar-un-usuario)
- [🔹 .then() y Promesas](#-then-y-promesas)
- [🔹 .catch() y manejo de errores](#-catch-y-manejo-de-errores)
- [🔹 Async/Await (forma más limpia)](#-asyncawait-forma-más-limpia)
- [📌 Resumen](#-resumen)

---

## 🔹 ¿Qué es CORS?
CORS (**Cross-Origin Resource Sharing**) es una política de seguridad de los navegadores.  
👉 Evita que una web (ejemplo: `tusitio.com`) pueda pedir datos a otro dominio (`api.otrodominio.com`) sin permiso.

### ¿Qué es un "origen"?
Un **origen** se define por:
- Protocolo (`http` o `https`)
- Dominio (`tusitio.com`)
- Puerto (`:3000`)

Si alguno cambia, se considera otro origen.

### ¿Por qué existe?
Para **proteger tus datos** de sitios maliciosos que podrían intentar acceder a tus sesiones (ej: Gmail).

### ¿Qué pasa si falla?
- Verás un **error CORS en la consola** del navegador.  
- No se puede arreglar desde el **frontend**.  
- El **servidor** debe permitir tu origen con una cabecera HTTP:  

```http
Access-Control-Allow-Origin: *
```

o bien:

```http
Access-Control-Allow-Origin: https://tusitio.com
```

⚠️ En desarrollo, podés usar un **proxy** o configurar CORS en tu backend.

---

## 🔹 ¿Qué es fetch?
`fetch` es una función nativa de JavaScript para hacer peticiones HTTP asíncronas (GET, POST, PUT, DELETE).  

👉 Se usa para consumir **APIs** sin recargar la página.

### Datos que puede traer:
- JSON (lo más común)  
- Texto  
- HTML  
- Imágenes  

---

## 🔹 Ejemplo de uso con fetch

### GET — Obtener datos
```js
fetch("https://68af4654b91dfcdd62bbe419.mockapi.io/api/users")
  .then(response => {
    if (!response.ok) throw new Error("Error en la respuesta");
    return response.json(); // Convertir a JSON
  })
  .then(data => {
    console.log("Usuarios:", data);
  })
  .catch(error => {
    console.error("Hubo un error:", error);
  });
```

---

### POST — Crear un nuevo usuario
```js
fetch("https://68af4654b91dfcdd62bbe419.mockapi.io/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Nuevo Usuario",
    country: "Argentina",
    job: "Frontend Developer",
    avatar: "https://placekitten.com/200/200"
  })
})
  .then(response => response.json())
  .then(newUser => console.log("Usuario creado:", newUser))
  .catch(error => console.error("Error:", error));
```

---

### PUT — Actualizar un usuario
```js
fetch("https://68af4654b91dfcdd62bbe419.mockapi.io/api/users/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Usuario Actualizado",
    job: "Backend Developer"
  })
})
  .then(response => response.json())
  .then(updatedUser => console.log("Usuario actualizado:", updatedUser))
  .catch(error => console.error("Error:", error));
```

---

### DELETE — Eliminar un usuario
```js
fetch("https://68af4654b91dfcdd62bbe419.mockapi.io/api/users/2", {
  method: "DELETE"
})
  .then(response => response.json())
  .then(deletedUser => console.log("Usuario eliminado:", deletedUser))
  .catch(error => console.error("Error:", error));
```

---

## 🔹 .then() y Promesas
- **`.then()`** se ejecuta cuando una promesa se resuelve bien.  
- Permite encadenar pasos: primero convertir la respuesta, luego usar los datos.  
- Ayuda a evitar el **callback hell**.  

Ejemplo:
```js
fetch("https://68af4654b91dfcdd62bbe419.mockapi.io/api/users")
  .then(r => r.json())
  .then(data => console.log("Usuarios:", data));
```

---

## 🔹 .catch() y manejo de errores
Se ejecuta cuando **algo falla**, por ejemplo:  
- URL mal escrita  
- El servidor no responde  
- Error 404 o 500  

Ejemplo:
```js
fetch("https://api.inexistente.com/data")
  .then(r => r.json())
  .catch(error => console.error("Error detectado:", error));
```

---

## 🔹 Async/Await (forma más limpia)
```js
async function obtenerUsuarios() {
  try {
    const response = await fetch("https://68af4654b91dfcdd62bbe419.mockapi.io/api/users");
    if (!response.ok) throw new Error("Error en la respuesta");
    const data = await response.json();
    console.log("Usuarios:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

obtenerUsuarios();
```

---

## 📌 Resumen
- **CORS** protege a los usuarios → lo habilita el servidor, no el frontend.  
- **fetch** permite pedir/enviar datos con promesas.  
- **`.then()`** → manejar respuestas exitosas.  
- **`.catch()`** → manejar errores.  
- **async/await** → sintaxis más simple para trabajar con promesas.  
