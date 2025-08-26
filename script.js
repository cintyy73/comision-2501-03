

/*
1. setTimeout:
  - Para mostrar un mensaje temporal (ej: "Guardado exitosamente" y ocultarlo después de 2 segundos).
  - Para retrasar la ejecución de una función (ej: animaciones, efectos visuales).

2. Promesa y .then:
  - Cuando se realiza una petición a una API (ej: pedir datos de usuarios a un servidor).
  - Para cargar archivos, imágenes o recursos externos y saber cuándo están listos.

3. async/await:
  - Para escribir código que espera respuestas de servidores de forma más legible.
  - En funciones que necesitan esperar varios pasos asíncronos (ej: autenticar usuario, luego cargar su perfil).
*/

// 1. Usando setTimeout (simula esperar)
console.log("Ejemplo 1: setTimeout");
console.log("Empiezo");
setTimeout(() => {
  console.log("Terminé de esperar 1 segundo");
}, 1000);
console.log("Sigo con otras cosas");

// 2. Usando una Promesa básica y .then
console.log("\nEjemplo 2: Promesa y .then");
const promesa = new Promise((resolve) => {
  setTimeout(() => {
    resolve("¡Listo!");
  }, 1000);
});
promesa.then((mensaje) => {
  console.log(mensaje); // Imprime: ¡Listo!
});

// 3. Usando async/await para esperar una Promesa
console.log("\nEjemplo 3: async/await");
function esperar() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Terminé"), 1000);
  });
}
async function main() {
  console.log("Empiezo");
  const resultado = await esperar();
  console.log(resultado); // Imprime: Terminé
  console.log("Fin");
}
main();
