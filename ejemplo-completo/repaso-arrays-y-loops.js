// 📚 REPASO: MÉTODOS DE ARRAY Y LOOPS FOR
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

// 🔄 LOOPS FOR - EJEMPLOS

function ejemploForBasico() {
    console.log("=== FOR BÁSICO ===");
    let resultado = "Recorriendo con FOR básico:<br>";
    
    // For básico - útil cuando necesitas el índice
    for (let i = 0; i < frutas.length; i++) {
        resultado += `Índice ${i}: ${frutas[i]}<br>`;
        console.log(`Índice ${i}: ${frutas[i]}`);
    }
    
    document.getElementById("resultadoForBasico").innerHTML = resultado;
}

function ejemploForOf() {
    console.log("=== FOR...OF ===");
    let resultado = "Recorriendo con FOR...OF (solo valores):<br>";
    
    // For...of - cuando solo necesitas los valores
    for (const fruta of frutas) {
        resultado += `🍎 ${fruta}<br>`;
        console.log(`🍎 ${fruta}`);
    }
    
    document.getElementById("resultadoForOf").innerHTML = resultado;
}

function ejemploForIn() {
    console.log("=== FOR...IN ===");
    let resultado = "Recorriendo con FOR...IN (índices):<br>";
    
    // For...in - recorre índices/propiedades
    for (const indice in frutas) {
        resultado += `Posición ${indice}: ${frutas[indice]}<br>`;
        console.log(`Posición ${indice}: ${frutas[indice]}`);
    }
    
    document.getElementById("resultadoForIn").innerHTML = resultado;
}

// 🛠️ MÉTODOS DE ARRAY - EJEMPLOS

function ejemploForEach() {
    console.log("=== FOREACH ===");
    let resultado = "forEach - Ejecutar acción para cada elemento:<br>";
    
    // forEach: ejecuta una función para cada elemento
    estudiantes.forEach((estudiante, indice) => {
        resultado += `${indice + 1}. ${estudiante.nombre} (${estudiante.edad} años)<br>`;
        console.log(`${indice + 1}. ${estudiante.nombre} (${estudiante.edad} años)`);
    });
    
    document.getElementById("resultadoForEach").innerHTML = resultado;
}

function ejemploMap() {
    console.log("=== MAP ===");
    let resultado = "map() - Crear array nuevo transformando elementos:<br>";
    
    // map: crea un nuevo array transformando cada elemento
    const nombresEnMayuscula = estudiantes.map(estudiante => estudiante.nombre.toUpperCase());
    const numerosDuplicados = numeros.map(num => num * 2);
    
    resultado += `Nombres originales: ${estudiantes.map(e => e.nombre).join(", ")}<br>`;
    resultado += `Nombres en MAYÚSCULA: ${nombresEnMayuscula.join(", ")}<br><br>`;
    resultado += `Números originales: ${numeros.join(", ")}<br>`;
    resultado += `Números duplicados: ${numerosDuplicados.join(", ")}<br>`;
    
    console.log("Nombres en mayúscula:", nombresEnMayuscula);
    console.log("Números duplicados:", numerosDuplicados);
    
    document.getElementById("resultadoMap").innerHTML = resultado;
}

function ejemploFilter() {
    console.log("=== FILTER ===");
    let resultado = "filter() - Crear array nuevo con elementos que cumplan condición:<br>";
    
    // filter: crea un nuevo array con elementos que pasan la prueba
    const estudiantesProgramacion = estudiantes.filter(estudiante => estudiante.carrera === "Programación");
    const numerosPares = numeros.filter(num => num % 2 === 0);
    const estudiantesNotaAlta = estudiantes.filter(estudiante => estudiante.nota >= 8);
    
    resultado += `Estudiantes de Programación:<br>`;
    estudiantesProgramacion.forEach(e => {
        resultado += `- ${e.nombre} (Nota: ${e.nota})<br>`;
    });
    
    resultado += `<br>Números pares: ${numerosPares.join(", ")}<br>`;
    resultado += `<br>Estudiantes con nota >= 8:<br>`;
    estudiantesNotaAlta.forEach(e => {
        resultado += `- ${e.nombre}: ${e.nota}<br>`;
    });
    
    console.log("Estudiantes de Programación:", estudiantesProgramacion);
    console.log("Números pares:", numerosPares);
    
    document.getElementById("resultadoFilter").innerHTML = resultado;
}

function ejemploFind() {
    console.log("=== FIND ===");
    let resultado = "find() - Encontrar el PRIMER elemento que cumpla condición:<br>";
    
    // find: devuelve el PRIMER elemento que cumple la condición
    const estudianteConNotaAlta = estudiantes.find(estudiante => estudiante.nota > 9);
    const numeroMayorA5 = numeros.find(num => num > 5);
    const estudianteLuis = estudiantes.find(estudiante => estudiante.nombre === "Luis");
    
    resultado += `Primer estudiante con nota > 9: ${estudianteConNotaAlta ? estudianteConNotaAlta.nombre + " (" + estudianteConNotaAlta.nota + ")" : "No encontrado"}<br>`;
    resultado += `Primer número > 5: ${numeroMayorA5}<br>`;
    resultado += `Buscar a Luis: ${estudianteLuis ? estudianteLuis.nombre + " - " + estudianteLuis.carrera : "No encontrado"}<br>`;
    
    console.log("Estudiante con nota alta:", estudianteConNotaAlta);
    console.log("Estudiante Luis:", estudianteLuis);
    
    document.getElementById("resultadoFind").innerHTML = resultado;
}

function ejemploSomeEvery() {
    console.log("=== SOME y EVERY ===");
    let resultado = "some() y every() - Verificar condiciones:<br>";
    
    // some: ¿al menos uno cumple la condición?
    // every: ¿todos cumplen la condición?
    
    const algunoMayorDe23 = estudiantes.some(estudiante => estudiante.edad > 23);
    const todosMayoresDe18 = estudiantes.every(estudiante => estudiante.edad >= 18);
    const todosNotaMayorA5 = estudiantes.every(estudiante => estudiante.nota >= 5);
    const algunoConNotaPerfecta = estudiantes.some(estudiante => estudiante.nota === 10);
    
    resultado += `¿Algún estudiante mayor de 23? ${algunoMayorDe23 ? "SÍ" : "NO"}<br>`;
    resultado += `¿Todos los estudiantes son mayores de 18? ${todosMayoresDe18 ? "SÍ" : "NO"}<br>`;
    resultado += `¿Todos tienen nota >= 5? ${todosNotaMayorA5 ? "SÍ" : "NO"}<br>`;
    resultado += `¿Alguno tiene nota perfecta (10)? ${algunoConNotaPerfecta ? "SÍ" : "NO"}<br>`;
    
    console.log("Verificaciones:", { algunoMayorDe23, todosMayoresDe18, todosNotaMayorA5 });
    
    document.getElementById("resultadoSomeEvery").innerHTML = resultado;
}

function ejemploReduce() {
    console.log("=== REDUCE ===");
    let resultado = "reduce() - Reducir array a un solo valor:<br>";

    // Ejemplo 1: Sumar todos los números del array
    // El método reduce recibe una función que se ejecuta para cada elemento,
    // acumulando el resultado en 'acumulador'. El segundo parámetro es el valor inicial (0).
    const sumaNumeros = numeros.reduce((acumulador, numero) => acumulador + numero, 0);

    // Ejemplo 2: Calcular el promedio de notas de los estudiantes
    // Primero sumamos todas las notas usando reduce, luego dividimos por la cantidad de estudiantes.
    const promedioNotas = estudiantes.reduce((suma, estudiante) => suma + estudiante.nota, 0) / estudiantes.length;

    // Ejemplo 3: Contar cuántos estudiantes hay por cada carrera
    // Usamos reduce para construir un objeto donde la clave es la carrera y el valor es la cantidad de estudiantes.
    // Si la carrera ya existe en el objeto, sumamos 1; si no, la inicializamos en 1.
    const estudiantesPorCarrera = estudiantes.reduce((contador, estudiante) => {
        // Si la carrera ya existe, sumamos 1; si no, la inicializamos en 1
        contador[estudiante.carrera] = (contador[estudiante.carrera] || 0) + 1;
        return contador;
    }, {});

    resultado += `<strong>Ejemplo 1:</strong> Suma de números 1-10: ${sumaNumeros}<br>`;
    resultado += `<strong>Ejemplo 2:</strong> Promedio de notas: ${promedioNotas.toFixed(2)}<br>`;
    resultado += `<strong>Ejemplo 3:</strong> Estudiantes por carrera:<br>`;

    // Mostramos el resultado de la agrupación por carrera
    for (const carrera in estudiantesPorCarrera) {
        resultado += `- ${carrera}: ${estudiantesPorCarrera[carrera]} estudiantes<br>`;
    }

    // También mostramos los resultados en consola para ver la estructura de los datos
    console.log("Suma de números:", sumaNumeros); // Ejemplo 1
    console.log("Promedio de notas:", promedioNotas); // Ejemplo 2
    console.log("Estudiantes agrupados por carrera:", estudiantesPorCarrera); // Ejemplo 3

    // Mostramos el resultado en el HTML
    document.getElementById("resultadoReduce").innerHTML = resultado;
}

function ejemploSort() {
    console.log("=== SORT ===");
    let resultado = "sort() - Ordenar elementos:<br>";
    
    // sort: ordena los elementos (MODIFICA el array original)
    const frutasOrdenadas = [...frutas].sort(); // Copia para no modificar original
    const numerosOrdenados = [...numeros].sort((a, b) => b - a); // Descendente
    
    // Ordenar estudiantes por diferentes criterios
    const estudiantesPorNombre = [...estudiantes].sort((a, b) => a.nombre.localeCompare(b.nombre));
    const estudiantesPorNota = [...estudiantes].sort((a, b) => b.nota - a.nota); // Mayor a menor
    const estudiantesPorEdad = [...estudiantes].sort((a, b) => a.edad - b.edad); // Menor a mayor
    
    resultado += `Frutas ordenadas: ${frutasOrdenadas.join(", ")}<br>`;
    resultado += `Números (mayor a menor): ${numerosOrdenados.join(", ")}<br><br>`;
    
    resultado += `Estudiantes por nombre:<br>`;
    estudiantesPorNombre.forEach(e => resultado += `- ${e.nombre}<br>`);
    
    resultado += `<br>Estudiantes por nota (mayor a menor):<br>`;
    estudiantesPorNota.forEach(e => resultado += `- ${e.nombre}: ${e.nota}<br>`);
    
    console.log("Ordenados por nombre:", estudiantesPorNombre);
    console.log("Ordenados por nota:", estudiantesPorNota);
    
    document.getElementById("resultadoSort").innerHTML = resultado;
}

// 🎯 EJERCICIO INTEGRADOR
function ejercicioIntegrador() {
    console.log("=== EJERCICIO INTEGRADOR ===");
    let resultado = "🎯 <strong>Ejercicio Práctico Integrador</strong><br><br>";
    
    // 1. Filtrar estudiantes de Programación
    const programadores = estudiantes.filter(e => e.carrera === "Programación");
    resultado += `1. Estudiantes de Programación: ${programadores.length}<br>`;
    
    // 2. Calcular promedio de notas de programadores
    const promedioProgramadores = programadores.reduce((suma, e) => suma + e.nota, 0) / programadores.length;
    resultado += `2. Promedio de notas (Programación): ${promedioProgramadores.toFixed(2)}<br>`;
    
    // 3. Encontrar el mejor estudiante
    const mejorEstudiante = estudiantes.reduce((mejor, actual) => 
        actual.nota > mejor.nota ? actual : mejor
    );
    resultado += `3. Mejor estudiante: ${mejorEstudiante.nombre} (${mejorEstudiante.nota})<br>`;
    
    // 4. Crear lista de nombres en mayúscula de estudiantes aprobados (nota >= 7)
    const aprobadosEnMayuscula = estudiantes
        .filter(e => e.nota >= 7)
        .map(e => e.nombre.toUpperCase());
    resultado += `4. Aprobados (nota >= 7): ${aprobadosEnMayuscula.join(", ")}<br>`;
    
    // 5. Verificar si todos los estudiantes son mayores de edad
    const todosMayoresDeEdad = estudiantes.every(e => e.edad >= 18);
    resultado += `5. ¿Todos son mayores de edad? ${todosMayoresDeEdad ? "SÍ" : "NO"}<br>`;
    
    // 6. Contar estudiantes por rango de edad usando for y if
    let menores22 = 0;
    let entre22y23 = 0;
    let mayores23 = 0;
    
    for (let i = 0; i < estudiantes.length; i++) {
        const edad = estudiantes[i].edad;
        if (edad < 22) {
            menores22++;
        } else if (edad <= 23) {
            entre22y23++;
        } else {
            mayores23++;
        }
    }
    
    resultado += `<br>6. Distribución por edad:<br>`;
    resultado += `- Menores de 22: ${menores22}<br>`;
    resultado += `- Entre 22-23: ${entre22y23}<br>`;
    resultado += `- Mayores de 23: ${mayores23}<br>`;
    
    // 7. Crear reporte completo combinando varios métodos
    resultado += `<br>7. <strong>Reporte Completo:</strong><br>`;
    estudiantes
        .sort((a, b) => b.nota - a.nota) // Ordenar por nota
        .forEach((estudiante, indice) => {
            const estado = estudiante.nota >= 7 ? "✅ APROBADO" : "❌ REPROBADO";
            resultado += `${indice + 1}° lugar: ${estudiante.nombre} - ${estudiante.nota} ${estado}<br>`;
        });
    
    console.log("Ejercicio completado");
    console.log("Programadores:", programadores);
    console.log("Mejor estudiante:", mejorEstudiante);
    
    document.getElementById("resultadoEjercicio").innerHTML = resultado;
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

// Ejercicios adicionales para que practiquen las alumnas
console.log("🎓 EJERCICIOS PARA PRACTICAR:");
console.log("1. Crear un array de productos con nombre, precio y categoría");
console.log("2. Filtrar productos por categoría");
console.log("3. Calcular el precio total usando reduce");
console.log("4. Encontrar el producto más caro");
console.log("5. Crear una lista de nombres de productos en mayúscula");
console.log("6. Verificar si hay productos con precio > 1000");

// Datos adicionales para ejercicios
const productos = [
    { nombre: "Laptop", precio: 80000, categoria: "Tecnología" },
    { nombre: "Mouse", precio: 2500, categoria: "Tecnología" },
    { nombre: "Escritorio", precio: 15000, categoria: "Muebles" },
    { nombre: "Silla", precio: 8500, categoria: "Muebles" },
    { nombre: "Monitor", precio: 25000, categoria: "Tecnología" }
];

console.log("Productos para practicar:", productos);
