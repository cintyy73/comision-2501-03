const $ = (selector) => document.querySelector(selector);

let invitados = [];

// Elementos del DOM
const formulario = $("#guestRegistrationForm");
const nombreInput = $("#guestNameInput");
const relacionSelect = $("#relationshipSelect");
const listaContainer = $("#guestListContainer");

document.addEventListener("DOMContentLoaded", function () {
  formulario.addEventListener("submit", agregarInvitado);
  obtenerInvitados()
  mostrarInvitados()
});

function agregarInvitado(e) {
  e.preventDefault();

  const nombre = nombreInput.value.trim();
  const relacion = relacionSelect.value;

  if (!nombre) {
    alert("ingrese un invitado");
    return;
  }

  const nuevoInvitado = {
    id: Date.now(),
    nombre,
    relacion,
  };

  invitados.push(nuevoInvitado);

  mostrarInvitados();
  guardarInvitadosLocal()
  console.log(invitados);
}

function mostrarInvitados() {
  const params = new URLSearchParams(window.location.search)
 const categoriaFiltrada = params.get("categoria")
    let invitadosFiltrados = invitados;

 if(categoriaFiltrada){
  invitadosFiltrados = invitados.filter(inv => inv.relacion === categoriaFiltrada)
 }


    if(invitados.length === 0) {
        listaContainer.innerHTML = `<p>No hay invitados en tu lista</p>`;
        return;
    }

    listaContainer.innerHTML = invitadosFiltrados.map(
        (invitado) => ` <div>
                <p>${invitado.nombre}</p>
                <p>${invitado.relacion}</p>
                <button id="delete" onclick="eliminarInvitado(${invitado.id})" type="button">Eliminar</button>
            </div>`
    ).join('');
}

function eliminarInvitado (id) {
    invitados = invitados.filter(inv => inv.id !== id);
    guardarInvitadosLocal()
    mostrarInvitados();
  }

function guardarInvitadosLocal () {
  localStorage.setItem('invitados', JSON.stringify(invitados))

}

function obtenerInvitados (){
  const guardados = localStorage.getItem('invitados')

  if(guardados) {
    invitados = JSON.parse(guardados)
  }
}

function filtrarPorCategoria(categoria){
  const url = new URL(window.location) // Creamos un objeto URL con la actual

  if(categoria){
    url.searchParams.set('categoria', categoria)
  }else {
    url.searchParams.delete('categoria')
  }
  window.history.pushState({}, '', url); // Cambiamos la URL sin recargar

  mostrarInvitados()
}










const textJSON = {
  "nombre": "Geo",
  "edad": "36"
}
const textObject = {
  nombre: "Geo",
  edad: "36"
}
/*--- ¿Qué es localStorage? ---
localStorage es una API de JavaScript que permite guardar datos en el navegador de forma permanente.
- Los datos persisten aunque cierres el navegador o apagues la computadora.
- Ideal para guardar listas, configuraciones, preferencias, etc.
- Se accede con localStorage.setItem(clave, valor) y localStorage.getItem(clave).

--- ¿Qué es sessionStorage? ---
sessionStorage es similar a localStorage, pero los datos solo duran mientras la pestaña esté abierta.
- Si cierras la pestaña, los datos se borran.
- Útil para datos temporales de la sesión actual.
- Se accede con sessionStorage.setItem(clave, valor) y sessionStorage.getItem(clave).
*/