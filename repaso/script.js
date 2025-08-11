// 📚 REPASO: MÉTODOS DE ARRAY Y LOOPS FOR
const $ = (selector) => document.querySelector(selector);
// Datos de ejemplo para practicar
const estudiantes = [
    { nombre: "Ana", edad: 22, carrera: "Programación", nota: 8.5 },
    { nombre: "Luis", edad: 20, carrera: "Diseño", nota: 7.2 },
    { nombre: "María", edad: 24, carrera: "Programación", nota: 9.1 },
    { nombre: "Carlos", edad: 21, carrera: "Marketing", nota: 6.8 },
    { nombre: "Sofía", edad: 23, carrera: "Programación", nota: 8.9 }
];

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const frutas = ["manzana", "banana", "pera", "uva", "naranja"];


// 💡 FUNCIONES UTILES PARA PRACTICAR
function mostrarTodosLosEjemplos() {
    console.log("Ejecutando todos los ejemplos...");
    ejemploForBasico();
    ejemploForOf();
    ejemploForIn();
    ejemploForEach();
    ejemploMap();
    ejemploFilter();
    ejemploFind();
    ejemploSomeEvery();
    ejemploReduce();
    ejemploSort();
    ejercicioIntegrador();
}