function $(selector) {
  return document.querySelector(selector);
}

console.log($("#message"));
let container = document.getElementById("container");
let button = $("#show");
let button2 = $("#double");

// Seleccionar por atributos específicos
const elemento = $("[data-info]");
const botones = document.querySelectorAll('[type="button"]');
const enlaces = document.querySelectorAll('a[href^="https"]');

button.addEventListener("click", function () {
  console.log("ver mas");
  container.innerHTML = "<p>Insertado desde js</p>";
  container.style.cssText = "background: yellow; font-size: 50px; color: blue";
});

function show() {
  console.log("ver doble");
  container.innerHTML += "<p>Insertado doble desde js</p>";
}

button2.addEventListener("click", show);

const second = container.children[1];
console.log(second);
console.log(second.parentElement);

console.log("Anterior:", second.previousElementSibling);
console.log("Siguiente:", second.nextElementSibling);

const first = document.getElementById("container").children[0];

const button3 = document.createElement("button");
const text = document.createTextNode("Clickear");
button3.appendChild(text);
document.body.appendChild(button3);

button3.addEventListener("click", function () {
  const message = document.createElement("p");
  message.innerText = "Muchas gracias vuelva prontos";
  document.body.appendChild(message);
});

const container_message = $("#message");

function showMessage(title, text, student) {
  container_message.innerHTML = `
  <h2>${title}</h2>
  <p>${text}</p>
  <p>Saludos ${student}</p>
  `;
}

showMessage("Bienvenidos", "a nuestra tercer clase", 'Cintia')