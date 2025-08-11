// ===============================
// Versión solo consola de los ejemplos de métodos de array y loops
// Este archivo muestra cómo usar los métodos de array y los loops en JavaScript
// Todos los resultados se muestran por consola
// ===============================

// Datos de ejemplo para practicar
const estudiantes = [ // Array de objetos con datos de estudiantes
    { nombre: "Ana", edad: 22, carrera: "Programación", nota: 8.5 },
    { nombre: "Luis", edad: 20, carrera: "Diseño", nota: 7.2 },
    { nombre: "María", edad: 24, carrera: "Programación", nota: 9.1 },
    { nombre: "Carlos", edad: 21, carrera: "Marketing", nota: 6.8 },
    { nombre: "Sofía", edad: 23, carrera: "Programación", nota: 8.9 }
];

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Array de números
const frutas = ["manzana", "banana", "pera", "uva", "naranja"]; // Array de frutas

// Ejemplo de loop for básico: recorre el array usando índices
// ACLARACIÓN: El bucle for clásico permite recorrer un array usando el índice, útil cuando necesitas la posición de cada elemento.
// DEVUELVE: No retorna ningún valor, solo ejecuta acciones por cada elemento.
function ejemploForBasicoConsola() {
    console.log("=== FOR BÁSICO ===");
    for (let i = 0; i < frutas.length; i++) {
        // Muestra el índice y el valor
        console.log(`Índice ${i}: ${frutas[i]}`);
    }
}

// Ejemplo de loop for...of: recorre el array mostrando solo los valores
// ACLARACIÓN: for...of recorre los valores del array directamente, sin usar el índice.
// DEVUELVE: No retorna ningún valor, solo ejecuta acciones por cada elemento.
function ejemploForOfConsola() {
    console.log("=== FOR...OF ===");
    for (const fruta of frutas) {
        console.log(`🍎 ${fruta}`);
    }
}

// Ejemplo de loop for...in: recorre el array mostrando los índices
// ACLARACIÓN: for...in recorre los índices (o claves) del array, útil para acceder a la posición de cada elemento.
// DEVUELVE: No retorna ningún valor, solo ejecuta acciones por cada elemento.
function ejemploForInConsola() {
    console.log("=== FOR...IN ===");
    for (const indice in frutas) {
        console.log(`Posición ${indice}: ${frutas[indice]}`);
    }
}

// Ejemplo de forEach: ejecuta una función para cada elemento del array
// ACLARACIÓN: forEach ejecuta una función para cada elemento del array, ideal para realizar acciones sin crear un nuevo array.
// DEVUELVE: No retorna ningún valor, solo ejecuta acciones por cada elemento.
function ejemploForEachConsola() {
    console.log("=== FOREACH ===");
    estudiantes.forEach((estudiante, indice) => {
        // Muestra el nombre y la edad de cada estudiante
        console.log(`${indice + 1}. ${estudiante.nombre} (${estudiante.edad} años)`);
    });
}

// Ejemplo de map: crea nuevos arrays transformando los elementos
// ACLARACIÓN: map crea un nuevo array aplicando una transformación a cada elemento del array original.
// DEVUELVE: Un nuevo array con los elementos transformados.
function ejemploMapConsola() {
    console.log("=== MAP ===");
    // Convierte los nombres a mayúscula
    const nombresEnMayuscula = estudiantes.map(e => e.nombre.toUpperCase());
    // Duplica los números
    const numerosDuplicados = numeros.map(num => num * 2);
    console.log("Nombres en mayúscula:", nombresEnMayuscula);
    console.log("Números duplicados:", numerosDuplicados);
}

// Ejemplo de filter: crea nuevos arrays con elementos que cumplen una condición
// ACLARACIÓN: filter devuelve un nuevo array solo con los elementos que cumplen la condición especificada.
// DEVUELVE: Un nuevo array con los elementos que cumplen la condición.
function ejemploFilterConsola() {
    console.log("=== FILTER ===");
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

// Ejemplo de find: busca el primer elemento que cumple una condición
// ACLARACIÓN: find devuelve el primer elemento del array que cumple la condición dada, o undefined si no existe.
// DEVUELVE: El primer elemento que cumple la condición, o undefined si no hay ninguno.
function ejemploFindConsola() {
    console.log("=== FIND ===");
    // Busca el primer estudiante con nota > 9
    const estudianteConNotaAlta = estudiantes.find(e => e.nota > 9);
    // Busca el primer número mayor a 5
    const numeroMayorA5 = numeros.find(num => num > 5);
    // Busca al estudiante llamado Luis
    const estudianteLuis = estudiantes.find(e => e.nombre === "Luis");
    console.log("Primer estudiante con nota > 9:", estudianteConNotaAlta);
    console.log("Primer número > 5:", numeroMayorA5);
    console.log("Buscar a Luis:", estudianteLuis);
}

// Ejemplo de some y every: verifican condiciones en el array
// ACLARACIÓN: some verifica si al menos un elemento cumple la condición; every verifica si todos los elementos la cumplen.
// DEVUELVE: some retorna true o false; every retorna true o false.
function ejemploSomeEveryConsola() {
    console.log("=== SOME y EVERY ===");
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

// Ejemplo de reduce: combina todos los elementos en un solo valor
// ACLARACIÓN: reduce permite recorrer el array y acumular un resultado, como sumar, promediar o agrupar datos.
// DEVUELVE: Un único valor (número, objeto, string, etc.) resultado de la acumulación.
function ejemploReduceConsola() {
    console.log("=== REDUCE ===");
    // Ejemplo 1: Sumar todos los números del array
    // ACLARACIÓN: reduce permite recorrer el array y acumular un resultado, en este caso la suma de todos los números.
    // El método reduce recibe una función que se ejecuta para cada elemento,
    // acumulando el resultado en 'acumulador'. El segundo parámetro es el valor inicial (0).
    const sumaNumeros = numeros.reduce((acumulador, numero) => acumulador + numero, 0);

    // Ejemplo 2: Calcular el promedio de notas de los estudiantes
    // ACLARACIÓN: primero sumamos todas las notas usando reduce y luego dividimos por la cantidad de estudiantes para obtener el promedio.
    const promedioNotas = estudiantes.reduce((suma, estudiante) => suma + estudiante.nota, 0) / estudiantes.length;

    // Ejemplo 3: Contar cuántos estudiantes hay por cada carrera
    // ACLARACIÓN: reduce permite agrupar y contar elementos en un objeto, útil para estadísticas o agrupaciones.
    // Usamos reduce para construir un objeto donde la clave es la carrera y el valor es la cantidad de estudiantes.
    // Si la carrera ya existe en el objeto, sumamos 1; si no, la inicializamos en 1.
    const estudiantesPorCarrera = estudiantes.reduce((contador, estudiante) => {
        // Si la carrera ya existe, sumamos 1; si no, la inicializamos en 1
        contador[estudiante.carrera] = (contador[estudiante.carrera] || 0) + 1;
        return contador;
    }, {});

    console.log("Suma de números:", sumaNumeros); // Ejemplo 1
    console.log("Promedio de notas:", promedioNotas); // Ejemplo 2
    console.log("Estudiantes agrupados por carrera:", estudiantesPorCarrera); // Ejemplo 3
}

// Ejemplo de sort: ordena los elementos del array
// ACLARACIÓN: sort ordena los elementos del array según el criterio que definas, modificando el array o una copia.
// DEVUELVE: El array ordenado (modifica el original si no usas copia).
function ejemploSortConsola() {
    console.log("=== SORT ===");
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

// Ejercicio integrador: combina varios métodos de array para resolver un problema completo
// ACLARACIÓN: Este ejercicio muestra cómo combinar varios métodos de array y loops para obtener información y estadísticas de los datos.
// DEVUELVE: No retorna valor, solo muestra resultados por consola.
function ejercicioIntegradorConsola() {
    console.log("=== EJERCICIO INTEGRADOR ===");
    // 1. Filtrar estudiantes de Programación
    const programadores = estudiantes.filter(e => e.carrera === "Programación");
    // 2. Calcular promedio de notas de programadores
    const promedioProgramadores = programadores.reduce((suma, e) => suma + e.nota, 0) / programadores.length;
    // 3. Encontrar el mejor estudiante
    const mejorEstudiante = estudiantes.reduce((mejor, actual) => actual.nota > mejor.nota ? actual : mejor);
    // 4. Lista de aprobados en mayúscula
    const aprobadosEnMayuscula = estudiantes.filter(e => e.nota >= 7).map(e => e.nombre.toUpperCase());
    // 5. Verificar si todos son mayores de edad
    const todosMayoresDeEdad = estudiantes.every(e => e.edad >= 18);
    // 6. Contar estudiantes por rango de edad usando for y if
    let menores22 = 0, entre22y23 = 0, mayores23 = 0;
    for (let i = 0; i < estudiantes.length; i++) {
        const edad = estudiantes[i].edad;
        if (edad < 22) menores22++;
        else if (edad <= 23) entre22y23++;
        else mayores23++;
    }
    // Mostrar resultados
    console.log("Estudiantes de Programación:", programadores.length);
    console.log("Promedio de notas (Programación):", promedioProgramadores);
    console.log("Mejor estudiante:", mejorEstudiante);
    console.log("Aprobados (nota >= 7):", aprobadosEnMayuscula);
    console.log("¿Todos son mayores de edad?", todosMayoresDeEdad);
    console.log("Distribución por edad:", { menores22, entre22y23, mayores23 });
    // 7. Reporte completo ordenado por nota
    estudiantes.sort((a, b) => b.nota - a.nota).forEach((estudiante, indice) => {
        const estado = estudiante.nota >= 7 ? "✅ APROBADO" : "❌ REPROBADO";
        console.log(`${indice + 1}° lugar: ${estudiante.nombre} - ${estudiante.nota} ${estado}`);
    });
}

// Ejecuta todos los ejemplos por consola
function mostrarTodosLosEjemplosConsola() {
    ejemploForBasicoConsola(); // For básico
    ejemploForOfConsola();     // For...of
    ejemploForInConsola();     // For...in
    ejemploForEachConsola();   // forEach
    ejemploMapConsola();       // map
    ejemploFilterConsola();    // filter
    ejemploFindConsola();      // find
    ejemploSomeEveryConsola(); // some y every
    ejemploReduceConsola();    // reduce
    ejemploSortConsola();      // sort
    ejercicioIntegradorConsola(); // Ejercicio integrador
}

// Para probar todos los ejemplos, descomenta la siguiente línea:
// mostrarTodosLosEjemplosConsola();
