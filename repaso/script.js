// 📚 REPASO: MÉTODOS DE ARRAY Y LOOPS FOR
const $ = (selector) => document.querySelector(selector);

// Datos de ejemplo para practicar
const estudiantes = [
  { nombre: "Ana", edad: 22, carrera: "Programación", nota: 8.5 },
  { nombre: "Luis", edad: 20, carrera: "Diseño", nota: 7.2 },
  { nombre: "María", edad: 24, carrera: "Programación", nota: 9.1 },
  { nombre: "Carlos", edad: 21, carrera: "Marketing", nota: 6.8 },
  { nombre: "Sofía", edad: 23, carrera: "Programación", nota: 8.9 },
];

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const frutas = ["manzana", "banana", "pera", "uva", "naranja"];

function ejemploForBasico() {
  for (let i = 0; i < frutas.length; i++) {
    console.log(`índice= ${i}, fruta= ${frutas[i]}`);
  }
}

function ejemploForOf() {
  for (const fruta of frutas) {
    console.log(`🟢${fruta}`);
  }


}

function ejemploForIn() {
  for (const indice in frutas) {
    console.log(`posición= ${indice}, fruta= ${frutas[indice]}`);
  }
}

function ejemploForEach () {
    estudiantes.forEach((estudiante, indice)=>{
          console.log(`${indice+1}. ${estudiante.nombre} (${estudiante.edad} años)`);
    })
}


function ejemploMap (){
    const nombresEnMayuscula = estudiantes.map((estudiante)=>estudiante.nombre.toUpperCase())

    const edadesDobles = estudiantes.map((estudiante)=>estudiante.edad *2)
    console.log(edadesDobles)
}

function ejemploFilter() {

    // Filtra estudiantes de Programación
    const estudiantesProgramacion = estudiantes.filter(e => e.carrera === "Programación");
    // Filtra números pares
    const numerosPares = numeros.filter(num => num % 2 === 0);
    // Filtra estudiantes con nota alta
    const estudiantesNotaAlta = estudiantes.filter(e => e.nota >= 8);
    console.log("Estudiantes de Programación:", estudiantesProgramacion);
    console.log("Números pares:", numerosPares);
    console.log("Estudiantes con nota >= 8:", estudiantesNotaAlta);
}


function ejemploFind () {
    const estudianteConNotaAlta = estudiantes.find(e => e.nota > 9);

    const estudianteLuis = estudiantes.find(e => e.nombre === 'Luis' );
    console.log(estudianteLuis)
    }

function ejemploSomeEvery() {
    // ¿Algún estudiante mayor de 23?
    const algunoMayorDe23 = estudiantes.some(e => e.edad > 23);
    // ¿Todos los estudiantes son mayores de 18?
    const todosMayoresDe18 = estudiantes.every(e => e.edad >= 18);
    // ¿Todos tienen nota >= 5?
    const todosNotaMayorA5 = estudiantes.every(e => e.nota >= 5);
    // ¿Alguno tiene nota perfecta?
    const algunoConNotaPerfecta = estudiantes.some(e => e.nota === 10);
    console.log("¿Algún estudiante mayor de 23?", algunoMayorDe23);
    console.log("¿Todos los estudiantes son mayores de 18?", todosMayoresDe18);
    console.log("¿Todos tienen nota >= 5?", todosNotaMayorA5);
    console.log("¿Alguno tiene nota perfecta (10)?", algunoConNotaPerfecta);
}


function ejemploSort() {
    // Ordena frutas alfabéticamente
    const frutasOrdenadas = [...frutas].sort();
    // Ordena números de mayor a menor
    const numerosOrdenados = [...numeros].sort((a, b) => b - a);
    // Ordena estudiantes por nombre
    const estudiantesPorNombre = [...estudiantes].sort((a, b) => a.nombre.localeCompare(b.nombre));
    // Ordena estudiantes por nota (mayor a menor)
    const estudiantesPorNota = [...estudiantes].sort((a, b) => b.nota - a.nota);
    // Ordena estudiantes por edad (menor a mayor)
    const estudiantesPorEdad = [...estudiantes].sort((a, b) => a.edad - b.edad);
    console.log("Frutas ordenadas:", frutasOrdenadas);
    console.log("Números (mayor a menor):", numerosOrdenados);
    console.log("Estudiantes por nombre:", estudiantesPorNombre);
    console.log("Estudiantes por nota:", estudiantesPorNota);
    console.log("Estudiantes por edad:", estudiantesPorEdad);
}

function ejemploReduce (){
    const promedioNotas = estudiantes.reduce((suma, estudiante)=> suma + estudiante.nota, 0 ) / estudiantes.length;
    console.log(promedioNotas)
}







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
