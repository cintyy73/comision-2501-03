
// Función para seleccionar un solo elemento del DOM
const $ = (selector) => document.querySelector(selector);
// Función para seleccionar todos los elementos que coincidan con el selector
const $$ = (selector) => document.querySelectorAll(selector);

// Función de prueba que imprime los números del 1 al 3 en consola
function test() {
  for (let i = 1; i <= 3; i++) {
    console.log(i);
  }
}

// Selecciona el formulario por su id
const form = $("#form-register");
// Selecciona el div donde se mostrarán los mensajes de error
const errorMessage = $("#error");

// Evento que se ejecuta cuando se envía el formulario
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que el formulario se envíe y recargue la página
  let errors =[]; // Array para guardar los mensajes de error

  // Obtiene el valor del campo nombre
  const inputName = $('input[name="name"]').value;
  // Obtiene el valor del campo email
  const email = $('input[name="email"]').value;
  // Obtiene todos los inputs de género (radio buttons)
  const inputsGender = $$('input[name="gender"]');
  // Obtiene el valor del select de tipo de teléfono
  const typePhone = $('select[name="type-phone"]').value;
  // Obtiene el valor del campo número de teléfono
  const phoneNumber = $('input[name="phone-number"]').value;
  let genderCheck = ""; // Variable para guardar el género seleccionado

  // Recorre los radio buttons para ver cuál está seleccionado
  for (let i = 0; i < inputsGender.length; i++) {
    if (inputsGender[i].checked) {
      genderCheck = inputsGender[i].value;
    }
  }


  // Normalización de datos
  // Nombre en mayúsculas, email en minúsculas, teléfono solo números
  const nombreNormalizado = inputName.trim().toUpperCase();
  const emailNormalizado = email.trim().toLowerCase();
  const telefonoNormalizado = phoneNumber.replace(/\D/g, "");

  // Validaciones
  if (inputName.trim() === "") {
    errors.push("El nombre es obligatorio."); // Si el nombre está vacío, agrega error
  }

  if (email.trim() === "" || !email.includes("@")) {
    errors.push("El correo electrónico no es válido."); // Si el email está vacío o no tiene @, agrega error
  }

  if (genderCheck === "") {
    errors.push("Debe seleccionar un género."); // Si no se seleccionó género, agrega error
  }

  if (typePhone === "") {
    errors.push("Debe seleccionar un tipo de teléfono."); // Si no se seleccionó tipo de teléfono, agrega error
  }

  
  if (phoneNumber.trim() === "" || isNaN(phoneNumber)) {
    errors.push("Debe ingresar un número de teléfono válido."); // Si el número está vacío o no es numérico, agrega error
  }

  // Muestra en consola los valores ingresados
  console.log({
    "Nombre:": inputName,
    "Email:": email,
    "Género": genderCheck,
    "Tipo de teléfono: ": typePhone,
    "Número de teléfono": phoneNumber,
  });

  // Si hay errores, muestra la lista de errores y hace visible el div
  if(errors.length>0){
    let list = `<ul>`;
    for (let i = 0; i < errors.length; i++) {
      list += `<li>${errors[i]}</li>`;
    }
    list += `</ul>`;
    errorMessage.innerHTML = list;
    errorMessage.style.display='block';
    return;
  }

  // Si no hay errores, muestra el mensaje en el div de bienvenida y lo estiliza
  errorMessage.style.display = 'none';
  const bienvenida = document.getElementById('bienvenida');
  bienvenida.style.display = 'block';
  form.style.display = 'none';
  bienvenida.innerHTML = `
    <span class="emoji">🎉</span>
    <h1>¡Bienvenido/a!</h1>
    <p><strong>Nombre:</strong> ${inputName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Género:</strong> ${genderCheck}</p>
    <p><strong>Tipo de teléfono:</strong> ${typePhone}</p>
    <p><strong>Número de teléfono:</strong> ${phoneNumber}</p>
    <hr style="margin:1.5rem 0; border:0; border-top:1px solid #ffd60a;">
    <p style="color:#ff9100; font-size:1.2rem; margin:0;">¡Gracias por registrarte! <span class='emoji'>🥳</span></p>
  `;
});


