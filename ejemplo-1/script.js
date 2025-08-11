const $ = (selector) => document.querySelector(selector);

let invitados = [];

// Elementos del DOM
const formulario = $("#guestRegistrationForm");
const nombreInput = $("#guestNameInput");
const relacionSelect = $("#relationshipSelect");
const listaContainer = $("#guestListContainer");

document.addEventListener("DOMContentLoaded", function () {
  formulario.addEventListener("submit", agregarInvitado);
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
  console.log(invitados);
}

function mostrarInvitados() {
    if(invitados.length === 0) {
        listaContainer.innerHTML = `<p>No hay invitados en tu lista</p>`;
        return;
    }

    listaContainer.innerHTML = invitados.map(
        (invitado) => ` <div>
                <p>${invitado.nombre}</p>
                <p>${invitado.relacion}</p>
                <button id="delete" onclick="eliminarInvitado(${invitado.id})" type="button">Eliminar</button>
            </div>`
    ).join('');
}

function eliminarInvitado (id) {
    invitados = invitados.filter(inv => inv.id !== id);
    mostrarInvitados();
}


