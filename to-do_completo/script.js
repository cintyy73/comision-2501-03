// ===============================
// Lista de invitados 15 años
// Ejemplo educativo: localStorage, sessionStorage y filtros con URLSearchParams
// ===============================

/*
========================================
EXPLICACIÓN TEÓRICA Y PASO A PASO
========================================

--- ¿Qué es localStorage? ---
localStorage es una API de JavaScript que permite guardar datos en el navegador de forma permanente.
- Los datos persisten aunque cierres el navegador o apagues la computadora.
- Ideal para guardar listas, configuraciones, preferencias, etc.
- Se accede con localStorage.setItem(clave, valor) y localStorage.getItem(clave).

--- ¿Qué es sessionStorage? ---
sessionStorage es similar a localStorage, pero los datos solo duran mientras la pestaña esté abierta.
- Si cierras la pestaña, los datos se borran.
- Útil para datos temporales de la sesión actual.
- Se accede con sessionStorage.setItem(clave, valor) y sessionStorage.getItem(clave).

--- ¿Qué es URLSearchParams? ---
URLSearchParams es una API para leer y modificar los parámetros de la URL (lo que está después del ?).
- Permite filtrar, buscar o navegar por diferentes vistas usando la URL.
- Ejemplo: index.html?categoria=Familia
- Se accede con new URLSearchParams(window.location.search) y métodos como get(), set(), delete().

========================================
PASO A PASO EN EL CÓDIGO
========================================

1. Al cargar la página, se leen los datos guardados en localStorage y sessionStorage.
2. El usuario puede agregar invitados usando el formulario.
3. Cada vez que se agrega o elimina un invitado, la lista se guarda en localStorage y sessionStorage.
4. La función mostrarInvitados() revisa si hay un filtro en la URL (?categoria=Familia) y muestra solo los invitados de esa categoría.
5. Los botones de filtro modifican la URL usando URLSearchParams y actualizan la vista sin recargar la página.
6. Así, el usuario puede ver todos los invitados o solo los de una categoría específica, y los datos se mantienen guardados.

========================================
Ejemplo de uso:
----------------------------------------
// Guardar en localStorage
localStorage.setItem('clave', 'valor');
// Leer de localStorage
localStorage.getItem('clave');

// Guardar en sessionStorage
sessionStorage.setItem('clave', 'valor');
// Leer de sessionStorage
sessionStorage.getItem('clave');

// Leer parámetro de la URL
const params = new URLSearchParams(window.location.search);
const categoria = params.get('categoria');

// Modificar parámetro de la URL
params.set('categoria', 'Familia');

========================================
*/

/*
========================================
¿QUÉ ES JSON?
========================================
JSON (JavaScript Object Notation) es un formato de texto ligero para intercambiar datos.
- Es fácil de leer y escribir para humanos y máquinas.
- Se usa para guardar y enviar información entre aplicaciones web y servidores.
- En JavaScript, puedes convertir objetos a JSON con JSON.stringify(objeto) y volver a objeto con JSON.parse(texto).

Ejemplo:
----------------------------------------
const persona = { nombre: "Ana", edad: 15 };
const textoJSON = JSON.stringify(persona); // '{"nombre":"Ana","edad":15}'
const objeto = JSON.parse(textoJSON); // { nombre: "Ana", edad: 15 }
----------------------------------------
*/

// ---- VARIABLES GLOBALES ----
// Aquí guardamos todos los invitados en memoria (se actualiza con local/session storage)
let invitados = [];

// ---- ELEMENTOS DEL DOM ----
// Obtenemos los elementos del formulario y la lista para manipularlos desde JS
const formulario = document.getElementById('guestRegistrationForm');
const nombreInput = document.getElementById('guestNameInput');
const relacionSelect = document.getElementById('relationshipSelect');
const listaContainer = document.getElementById('guestListContainer');

// ---- INICIALIZACIÓN DE LA APP ----
// Al cargar la página, traemos los datos guardados y mostramos la lista
// También conectamos el formulario para agregar invitados
// Usamos localStorage y sessionStorage para persistencia
// Usamos URLSearchParams para filtrar por categoría

document.addEventListener('DOMContentLoaded', function() {
    cargarInvitadosLocal(); // Recupera invitados guardados permanentemente
    cargarInvitadosSession(); // Recupera invitados guardados solo en la sesión
    mostrarInvitados(); // Muestra la lista en pantalla
    formulario.addEventListener('submit', agregarInvitado); // Permite agregar nuevos invitados
});

// ---- AGREGAR INVITADO ----
// Esta función se ejecuta al enviar el formulario
// Toma los datos del input y select, los valida y los agrega a la lista
// Luego guarda la lista en localStorage y sessionStorage
function agregarInvitado(event) {
    event.preventDefault(); // Evita que la página se recargue
    const nombre = nombreInput.value.trim();
    const relacion = relacionSelect.value;
    if (!nombre) {
        alert('Por favor, ingresa un nombre');
        return;
    }
    // Creamos el objeto invitado
    const nuevoInvitado = {
        id: Date.now(), // ID único usando timestamp
        nombre: nombre,
        relacion: relacion
    };
    invitados.push(nuevoInvitado); // Lo agregamos a la lista
    guardarInvitadosLocal(); // Guardamos en localStorage
    guardarInvitadosSession(); // Guardamos en sessionStorage
    mostrarInvitados(); // Actualizamos la vista
    formulario.reset(); // Limpiamos el formulario
}

// ---- MOSTRAR INVITADOS ----
// Esta función muestra la lista de invitados en pantalla
// Si hay un filtro en la URL (?categoria=Familia), solo muestra esa categoría
// Usa URLSearchParams para leer el filtro
function mostrarInvitados() {
    // Filtrar invitados por categoría desde la URL
    const params = new URLSearchParams(window.location.search);
    const categoriaFiltrada = params.get("categoria");
    let invitadosFiltrados = invitados;
    if (categoriaFiltrada) {
        invitadosFiltrados = invitados.filter(inv => inv.relacion === categoriaFiltrada);
        console.log(`🔍 Filtrando por: ${categoriaFiltrada}`);
    }
    // Mostrar información del filtro activo
    const infoFiltro = categoriaFiltrada ? 
        `<p><strong>📋 Mostrando: ${categoriaFiltrada} (${invitadosFiltrados.length} invitados)</strong></p>` : 
        `<p><strong>📋 Mostrando: Todos los invitados (${invitadosFiltrados.length})</strong></p>`;
    if (invitadosFiltrados.length === 0) {
        listaContainer.innerHTML = infoFiltro + '<p>No hay invitados para mostrar</p>';
        return;
    }
    // Renderiza la lista en HTML
    const listaHTML = invitadosFiltrados.map(inv => `
        <div class="guest-list-item">
            <span>${inv.nombre}</span>
            <span>${inv.relacion}</span>
            <button onclick="eliminarInvitado(${inv.id})">Eliminar</button>
        </div>
    `).join('');
    listaContainer.innerHTML = infoFiltro + listaHTML;
}

// ---- ELIMINAR INVITADO ----
// Elimina un invitado por su ID y actualiza la lista y el almacenamiento
function eliminarInvitado(id) {
    invitados = invitados.filter(inv => inv.id !== id);
    guardarInvitadosLocal();
    guardarInvitadosSession();
    mostrarInvitados();
}

// ---- LOCALSTORAGE ----
// Guarda la lista de invitados de forma permanente (aunque cierres el navegador)
function guardarInvitadosLocal() {
    localStorage.setItem('invitados-15', JSON.stringify(invitados));
    console.log('✅ Guardado en localStorage:', invitados);
}
// Recupera la lista de invitados guardada en localStorage
function cargarInvitadosLocal() {
    const guardados = localStorage.getItem('invitados-15');
    if (guardados) {
        invitados = JSON.parse(guardados);
        console.log('📂 Cargados desde localStorage:', invitados);
    }
}

// ---- SESSIONSTORAGE ----
// Guarda la lista de invitados solo para la sesión actual (se borra al cerrar la pestaña)
function guardarInvitadosSession() {
    sessionStorage.setItem('invitados-15', JSON.stringify(invitados));
    console.log('✅ Guardado en sessionStorage:', invitados);
}
// Recupera la lista de invitados guardada en sessionStorage
function cargarInvitadosSession() {
    const guardados = sessionStorage.getItem('invitados-15');
    if (guardados) {
        invitados = JSON.parse(guardados);
        console.log('📂 Cargados desde sessionStorage:', invitados);
    }
}

// ---- FILTRO POR CATEGORÍA (URLSearchParams) ----
// Esta función cambia el filtro de la URL y actualiza la vista
// Se usa para mostrar solo una categoría de invitados
function filtrarPorCategoria(categoria) {
    const url = new URL(window.location); // Creamos un objeto URL con la actual
    if (categoria) {
        url.searchParams.set('categoria', categoria); // Agregamos el filtro
        console.log(`🔍 Aplicando filtro: ${categoria}`);
    } else {
        url.searchParams.delete('categoria'); // Quitamos el filtro
        console.log('🔍 Mostrando todos los invitados');
    }
    window.history.pushState({}, '', url); // Cambiamos la URL sin recargar
    mostrarInvitados(); // Actualizamos la vista
}