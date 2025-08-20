Clase 11 - Desestructuración, Operadores y Copias en JavaScript

En esta clase veremos conceptos fundamentales de JavaScript moderno que hacen el código más limpio, legible y eficiente.

Asignación por Desestructuración

Operadores Spread y Rest

Inmutabilidad

Pasaje por Valor vs Pasaje por Referencia

Shallow Copy vs Deep Copy

📌 1. Asignación por Desestructuración

La desestructuración es una forma de extraer datos de arrays u objetos y asignarlos a variables de manera más concisa.

🔹 En Arrays

Se basa en la posición de los elementos.

```js
const numeros = [10, 20, 30];
const [primero, segundo] = numeros;
console.log(primero); // 10
console.log(segundo); // 20

// Saltando valores
const [a, , c] = numeros;
console.log(c); // 30
```

🔹 En Objetos

Se basa en el nombre de las propiedades.


```js
const { nombre, edad } = persona;
console.log(nombre); // "Ana"
console.log(edad);   // 25
```

```js
// Con valores por defecto
const { ciudad = "Desconocida" } = persona;
console.log(ciudad); // "Desconocida"
```


✅ Ventajas: código más limpio y menos repetitivo.
⚠️ Cuidado: en estructuras muy profundas puede volverse confuso.

📌 2. Renombrando Variables

Podemos renombrar variables al desestructurar para evitar conflictos:

```js
const usuario = { id: 1, nombre: "Lucía" };
const { nombre: userName } = usuario;
console.log(userName); // "Lucía"
```


También podemos combinar renombrado y valores por defecto:

```js
const { rol: role = "Invitado" } = usuario;
console.log(role); // "Invitado"
```

📌 3. Desestructuración Anidada

Se usa cuando hay objetos o arrays dentro de otros.

```js
const empleado = {
  nombre: "Santiago",
  direccion: {
    ciudad: "Buenos Aires",
    pais: "Argentina"
  }
};
const { direccion: { ciudad, pais } } = empleado;
console.log(ciudad); // "Buenos Aires"
console.log(pais);   // "Argentina"
```

📌 4. Operadores Spread (...) y Rest (...)

Ambos usan ... pero no son lo mismo.

🔹 Spread (expandir)

Sirve para expandir los valores de un array u objeto.

```js
// En Arrays
const numeros = [1, 2, 3];
const nuevos = [...numeros, 4, 5];
console.log(nuevos); // [1, 2, 3, 4, 5]

// En Objetos
const persona = { nombre: "Ana", edad: 25 };
const clon = { ...persona, ciudad: "Córdoba" };
console.log(clon);
```

🔹 Rest (agrupar)

Sirve para agrupar varios elementos en una sola variable.

// En Funciones
```js
function sumar(...numeros) {
  return numeros.reduce((total, n) => total + n, 0);
}
console.log(sumar(1, 2, 3, 4)); // 10

// En Arrays
const [primero, ...resto] = [10, 20, 30, 40];
console.log(resto); // [20, 30, 40]

// En Objetos
const { nombre, ...otros } = { nombre: "Ana", edad: 25, ciudad: "Córdoba" };
console.log(otros); // { edad: 25, ciudad: "Córdoba" }
```

📌 Diferencia clave:

Spread → expande los elementos (deconstruye).

Rest → agrupa los elementos (construye).

📌 5. Inmutabilidad

La inmutabilidad evita modificar los datos originales y trabajar siempre con copias.

```js
const persona = { nombre: "Ana", edad: 25 };

// ❌ Mal: muta el objeto
persona.edad = 30;

// ✅ Bien: crear copia con spread
const personaCopia = { ...persona, edad: 30 };
```


En arrays se usan métodos que crean nuevas versiones: map(), filter(), concat().

📌 6. Pasaje por Valor vs Pasaje por Referencia

Por Valor → tipos primitivos (string, number, boolean, etc.)

Por Referencia → objetos y arrays

// Por valor
let a = 10;
console.log(a); // 10 (independiente)
```js
let a = 10;
let b = a;
📌 7. Shallow Copy vs Deep Copy
console.log(a); // 10 (independiente)

// Por referencia
let obj1 = { nombre: "Ana" };
let obj2 = obj1;
obj2.nombre = "Lucía";
console.log(obj1.nombre); // "Lucía" (mismo objeto en memoria)
```
 Shallow Copy (copia superficial)

Copia solo el primer nivel. Los objetos anidados siguen compartiendo referencia.

copia1.direccion.ciudad = "Rosario";
```js
const persona = { nombre: "Ana", direccion: { ciudad: "Córdoba" } };
const copia1 = { ...persona };

copia1.direccion.ciudad = "Rosario";
console.log(persona.direccion.ciudad); // "Rosario" 😱
```

🔹 Deep Copy (copia profunda)

Crea una copia completa, incluyendo objetos anidados.

La forma más usada es con:

```js
const copia2 = JSON.parse(JSON.stringify(persona));


📖 Explicación:

JSON.stringify(objeto) → convierte el objeto en un texto JSON.

JSON.parse(texto) → convierte ese texto nuevamente en un objeto nuevo.

Resultado: un objeto totalmente nuevo, sin referencias compartidas.

copia2.direccion.ciudad = "Mendoza";
const persona = { nombre: "Ana", direccion: { ciudad: "Córdoba" } };
const copia2 = JSON.parse(JSON.stringify(persona));

copia2.direccion.ciudad = "Mendoza";
console.log(persona.direccion.ciudad); // "Córdoba" 🎉 (independiente)
```


⚠️ Limite: esta técnica no funciona con funciones, Date, Map, Set, etc., ya que JSON no los soporta.

✅ Resumen

La desestructuración simplifica la extracción de datos.

Spread expande valores, Rest los agrupa.

La inmutabilidad evita errores y hace el código más seguro.

Diferenciar valor vs referencia es clave para evitar bugs.

Una shallow copy no es suficiente si hay anidaciones → usar deep copy con JSON.parse(JSON.stringify()) u otras técnicas.