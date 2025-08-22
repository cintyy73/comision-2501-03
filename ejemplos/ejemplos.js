// Resumen
// La desestructuración simplifica la extracción de datos.
// Spread expande valores, Rest los agrupa.
// La inmutabilidad evita errores y hace el código más seguro.
// Diferenciar valor vs referencia es clave para evitar bugs.
// Una shallow copy no es suficiente si hay anidaciones → usar deep copy con JSON.parse(JSON.stringify()) u otras técnicas.

// 1) 📦 Desestructuración en Arrays

// Imaginemos que tenemos una lista de productos en un carrito de compras:

// Ejemplo 1: Desestructuración de arrays
const carrito_1 = ["Mouse", "Teclado", "Monitor"];
console.log("Producto 1:", carrito_1[0]);
console.log("Producto 2:", carrito_1[1]);
const [producto1_1, producto2_1, producto3_1] = carrito_1;
console.log("Producto 1:", producto1_1); // Mouse
console.log("Producto 2:", producto2_1); // Teclado
console.log("Producto 3:", producto3_1); // Monitor
// 💡 Para qué sirve: Acceder a valores fácilmente sin escribir carrito[0], carrito[1], etc.

// Ejemplo 2: Desestructuración de objetos
const usuario_1 = {
  nombre: "Cintia",
  edad: 25,
  email: "cintia@mail.com"
};
console.log("Usuario:", usuario_1.nombre);
console.log("Edad:", usuario_1.edad);
const { nombre: nombre_1, edad: edad_1, email: email_1 } = usuario_1;
console.log(`Usuario: ${nombre_1}, Edad: ${edad_1}, Email: ${email_1}`);
// � Para qué sirve: Hace el código más limpio, sobre todo si tenemos que usar las propiedades varias veces.
// Ejemplo 3: Spread para copiar y modificar objetos
const usuario_2 = {
  nombre: "Cintia",
  edad: 25,
  ciudad: "Buenos Aires"
};
// Actualización mutando el original (❌ no recomendado)
usuario_2.edad = 26;
// Con spread (✅ inmutable)
const usuarioActualizado_2 = { ...usuario_2, edad: 26 };
console.log("Original:", usuario_2); 
console.log("Actualizado:", usuarioActualizado_2); 
// 💡 Para qué sirve: Evitar errores cuando varias partes de la app dependen del mismo objeto (ej. en React).
// Ejemplo 4: Rest para agrupar propiedades restantes
const usuario_3 = {
  nombre: "Cintia",
  edad: 25,
  ciudad: "Buenos Aires",
  rol: "admin"
};
const { rol: rol_3, ...otrosDatos_3 } = usuario_3;
console.log("Rol:", rol_3); 
console.log("Otros datos:", otrosDatos_3); 
// 💡 Para qué sirve: Elegir lo que queremos usar y dejar todo lo demás agrupado → muy útil cuando una API devuelve mucha información.
// Ejemplo 5: Spread + Rest en Arrays
const carrito_2 = ["Mouse", "Teclado", "Monitor", "Parlantes"];
const [primero_2, ...resto_2] = carrito_2;
console.log("Primer producto:", primero_2); // Mouse
console.log("Otros productos:", resto_2);   // ["Teclado", "Monitor", "Parlantes"]
const copiaCarrito_2 = [...carrito_2];
console.log("Copia del carrito:", copiaCarrito_2);
// 💡 Para qué sirve: Manejar listas dinámicas de productos o usuarios.
// Ejemplo 6: Shallow Copy vs Deep Copy
const usuario_4 = {
  nombre: "Cintia",
  direccion: {
    ciudad: "Buenos Aires",
    pais: "Argentina"
  }
};
// Shallow copy (copia superficial con spread)
const copia1_4 = { ...usuario_4 };
copia1_4.direccion.ciudad = "Córdoba";
console.log("Original:", usuario_4.direccion.ciudad); // Córdoba (😱 se modificó)
// Deep copy (copia profunda con JSON)
const copia2_4 = JSON.parse(JSON.stringify(usuario_4));
copia2_4.direccion.ciudad = "Rosario";
console.log("Original:", usuario_4.direccion.ciudad); // Córdoba
console.log("Copia profunda:", copia2_4.direccion.ciudad); // Rosario
// 💡 Para qué sirve: Cuando trabajamos con datos complejos (objetos dentro de objetos) y necesitamos asegurarnos de que los cambios no afecten al original.

const usuarioActualizado_2 = { ...usuario_2, edad: 26 };
console.log("Original:", usuario_2); 
  nombre: "Cintia",
  edad: 25,
console.log("Actualizado:", usuarioActualizado_2); 
};

const usuario_3 = {
  nombre: "Cintia",
  edad: 25,
  ciudad: "Buenos Aires",
  rol: "admin"
};
console.log("Original:", usuario); 
// { nombre: "Cintia", edad: 25, ciudad: "Buenos Aires" }

const { rol: rol_3, ...otrosDatos_3 } = usuario_3;
// { nombre: "Cintia", edad: 26, ciudad: "Buenos Aires" }
console.log("Rol:", rol_3); 
console.log("Otros datos:", otrosDatos_3); 
// 💡 Para qué sirve: Evitar errores cuando varias partes de la app dependen del mismo objeto (ej. en React).

const carrito_2 = ["Mouse", "Teclado", "Monitor", "Parlantes"];

// Queremos mostrar solo algunos datos del usuario y guardar el resto en otra variable:

const [primero_2, ...resto_2] = carrito_2;
const usuario = {
console.log("Primer producto:", primero_2); // Mouse
console.log("Otros productos:", resto_2);   // ["Teclado", "Monitor", "Parlantes"]
  ciudad: "Buenos Aires",
  rol: "admin"
};
const copiaCarrito_2 = [...carrito_2];
console.log("Copia del carrito:", copiaCarrito_2);
// rol queda aparte y otrosDatos agrupa el resto de propiedades
const { rol, ...otrosDatos } = usuario;
const usuario_4 = {
  nombre: "Cintia",
  direccion: {
    ciudad: "Buenos Aires",
    pais: "Argentina"
  }
};

// 💡 Para qué sirve: Elegir lo que queremos usar y dejar todo lo demás agrupado → muy útil cuando una API devuelve mucha información.

copia1_4 = { ...usuario_4 };

// Queremos separar el primer producto del resto del carrito:
console.log("Original:", usuario_4.direccion.ciudad); // Córdoba (😱 se modificó)
// Ejemplo de spread y rest en arrays
const carrito = ["Mouse", "Teclado", "Monitor", "Parlantes"];

copia2_4 = JSON.parse(JSON.stringify(usuario_4));
// Separamos el primero y agrupamos el resto
const [primero, ...resto] = carrito;
console.log("Original:", usuario_4.direccion.ciudad); // Córdoba
console.log("Copia profunda:", copia2_4.direccion.ciudad); // Rosario
console.log("Otros productos:", resto);   // ["Teclado", "Monitor", "Parlantes"]

// 🔹 Spread para clonar el carrito
// Clonamos el array con spread
const copiaCarrito = [...carrito];
console.log("Copia del carrito:", copiaCarrito);


// 💡 Para qué sirve: Manejar listas dinámicas de productos o usuarios.

// 6) 🔄 Shallow Copy vs Deep Copy

// Un usuario tiene una dirección anidada. Queremos cambiar la ciudad en una copia sin tocar el original.

// Ejemplo de shallow copy vs deep copy
const usuario = {
  nombre: "Cintia",
  direccion: {
    ciudad: "Buenos Aires",
    pais: "Argentina"
  }
};

// 🔹 Shallow copy (copia superficial con spread)
// Solo copia el objeto principal, no los anidados
const copia1 = { ...usuario };
copia1.direccion.ciudad = "Córdoba";

console.log("Original:", usuario.direccion.ciudad); // Córdoba (😱 se modificó)

// 🔹 Deep copy (copia profunda con JSON)
// Copia todo el objeto, incluidos los anidados
const copia2 = JSON.parse(JSON.stringify(usuario));
copia2.direccion.ciudad = "Rosario";

console.log("Original:", usuario.direccion.ciudad); // Córdoba
console.log("Copia profunda:", copia2.direccion.ciudad); // Rosario


// 💡 Para qué sirve: Cuando trabajamos con datos complejos (objetos dentro de objetos) y necesitamos asegurarnos de que los cambios no afecten al original.