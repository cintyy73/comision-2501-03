
# 🧾 Clase 5 – Formularios, Eventos y Validación en HTML y JavaScript

## 🔁 ¿Qué es el bucle `for`?

El bucle `for` en JavaScript nos permite repetir una acción varias veces, como recorrer una lista de elementos. Se compone de tres partes:

```js
for (inicialización; condición; actualización) {
  // Código a ejecutar en cada repetición
}
```

Por ejemplo, para mostrar los números del 1 al 3:

```js
for (let i = 1; i <= 3; i++) {
  console.log(i);
}
```

---

## 🧠 ¿Qué vas a aprender?
- Cómo estructurar formularios en HTML
- Cómo capturar datos con JavaScript
- Validar datos antes de enviarlos
- Normalizar datos para que tengan un formato común
- Conocer eventos específicos de los formularios

---

## 🧾 Estructura de un formulario en HTML

```html
<form id="miFormulario">
  <label>
    Nombre:
    <input type="text" name="nombre" />
  </label>
  <label>
    Edad:
    <input type="number" name="edad" />
  </label>
  <button type="submit">Enviar</button>
</form>
```

---

## 🧩 Elementos comunes en formularios

### Input

```html
<input type="text" name="usuario" />
<input type="radio" name="genero" value="femenino" />
<input type="radio" name="genero" value="masculino" checked />
<input type="checkbox" name="terminos" />
```

### Select

```html
<select name="pais">
  <option value="ar">Argentina</option>
  <option value="uy">Uruguay</option>
</select>
```

### Textarea

```html
<textarea name="comentario" maxlength="200"></textarea>
```

---

## ✋ Prevenir el envío por defecto

```js
const form = document.querySelector("#miFormulario");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Detiene el envío automático
  console.log("Validando formulario...");
});
```

---

## 📥 Obtener valores

### Input text y number

```js
const nombre = document.querySelector('input[name="nombre"]').value;
const edad = document.querySelector('input[name="edad"]').value;
```

### Radio buttons

```js
const radios = document.querySelectorAll('input[name="genero"]');
let genero;

for (let i = 0; i < radios.length; i++) {
  if (radios[i].checked) {
    genero = radios[i].value;
  }
}
```

### Checkboxes

```js
const checkbox = document.querySelector('input[name="terminos"]');
console.log(checkbox.checked); // true o false
```

---

## 🧹 Normalizar datos

Usamos métodos de texto para dejar los datos "limpios", por ejemplo sin mayúsculas o espacios extra.

### Ejemplo sin `.map()`

```js
const texto = " Shrek ; Toy Story ; Bichos ";
const lista = texto.split(";"); // Separa por punto y coma
const peliculas = [];

for (let i = 0; i < lista.length; i++) {
  const item = lista[i].trim().toLowerCase(); // Quita espacios y pasa a minúscula
  peliculas.push(item);
}

console.log(peliculas); // ["shrek", "toy story", "bichos"]
```

---

## ✅ Validación del lado del cliente

### Verificar campos obligatorios

```js
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const errores = [];
  const nombre = document.querySelector('input[name="nombre"]').value;

  if (nombre.trim() === "") {
    errores.push("El nombre es obligatorio.");
  }

  if (errores.length > 0) {
    console.log("Errores:", errores);
  } else {
    console.log("Formulario listo para enviar.");
  }
});
```

---

## 🌐 Objeto `location` y parámetros en la URL

### Ver la URL actual

```js
console.log(location.href);
```

### Recargar la página

```js
location.reload();
```

### Obtener parámetros (`?nombre=ana`)

```js
const params = new URLSearchParams(location.search);
const nombre = params.get("nombre");
console.log(nombre);
```

---

## 🔍 Validar vs Normalizar

| Validar                        | Normalizar                         |
|-------------------------------|------------------------------------|
| Verifica si los datos son correctos | Acomoda los datos en un formato uniforme |
| Evita errores de usuario       | Facilita guardarlos en la base de datos |


## 🔍 Validar vs Normalizar: ¿Cuál es la diferencia?

Aunque suelen ir de la mano, **validar** y **normalizar** tienen **propósitos diferentes** en el tratamiento de los datos que ingresan las personas usuarias a través de formularios.

---

### ✅ **Validar** datos

Validar es **revisar si los datos que se ingresaron cumplen ciertas reglas**. Es un filtro que se aplica **antes de aceptar o enviar la información**.

#### 🔒 ¿Para qué sirve?
- Evitar errores de usuario.
- Confirmar que la información es útil y esperada.
- No enviar formularios vacíos o mal completados.

#### 🧪 Ejemplos:

```js
const email = document.querySelector('input[name="email"]').value;

if (email === "") {
  console.log("El campo email no puede estar vacío");
}

if (!email.includes("@")) {
  console.log("Debe ser un email válido");
}
```

✔️ Valida que **el campo no esté vacío**  
✔️ Valida que **tenga un símbolo @**

---

### 🧹 **Normalizar** datos

Normalizar significa **modificar los datos para que tengan un formato uniforme**. Esto no verifica si son correctos, sino que **los transforma para que se comporten igual** sin importar cómo los escribió la persona.

#### 🔧 ¿Para qué sirve?
- Evita inconsistencias en la base de datos.
- Permite buscar o comparar datos sin errores.
- Asegura que el formato sea siempre igual.

#### 🧪 Ejemplo:

```js
const nombre = "  Ana María  ";
const nombreNormalizado = nombre.trim().toLowerCase();

console.log(nombreNormalizado); // "ana maría"
```

✔️ Elimina espacios extra  
✔️ Convierte a minúsculas

---

### 🧠 Resumen visual

| Validar                         | Normalizar                          |
|----------------------------------|--------------------------------------|
| Verifica si los datos son correctos | Acomoda los datos en un formato uniforme |
| Se hace **antes** de enviar los datos | Se hace **antes de guardar** los datos |
| Ayuda a detectar errores del usuario | Ayuda a estandarizar para guardar o comparar |
| Ej: verificar que no esté vacío     | Ej: eliminar espacios y pasar a minúscula |

---

### 🧩 ¿Por qué son importantes juntos?

Imaginá un campo de nombre en un formulario:

- Una persona escribe: `"  JUAN "`  
- Otra escribe: `"juan"`  
- Otra: `"Juan "`  

**Si no normalizamos**, esos datos quedarían distintos en la base de datos.  
**Si no validamos**, tal vez alguien deja el campo vacío o pone números.

💡 **Solución ideal**:  
1. **Validar** que el campo esté completo y solo tenga letras  
2. **Normalizar**: eliminar espacios, convertir a minúsculas
