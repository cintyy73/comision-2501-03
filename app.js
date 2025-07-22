console.log(document);
console.log(document.body.nodeType); // 1 (elemento)
console.log(document.body.childNodes[0].nodeType); // 3 (texto)

console.log(window.innerWidth);
console.log(document.title);


window.alert('Hola desde window');

let parrafo = document.querySelector('p');
parrafo.classList.add('destacado');
parrafo.classList.remove('texto');
parrafo.classList.toggle('oculto');
console.log(parrafo.classList.contains('destacado')); // true

let img = document.getElementById("imagen-perfil");
console.log(img.getAttribute("src"));
img.setAttribute("alt", "Nueva descripción");
// img.removeAttribute("src"); // Comentado para mantener la imagen visible

function cambiarTodo() {
  // Cambiar el título principal
  document.getElementById('titulo-principal').innerText = '¡Título cambiado!';
  
  // Cambiar la imagen de portada
  let imgPortada = document.querySelector('#imagen-portada');
  imgPortada.setAttribute('src', 'https://cdn.pixabay.com/photo/2025/06/27/07/36/dragon-9683286_1280.jpg');
  
  // Cambiar el subtítulo
  document.getElementById('subtitulo').innerText = '¡DOM Modificado!';
}

// Función separada para toggle del párrafo
function toggleParrafo() {
  document.querySelector('.parrafo').classList.toggle('resaltado');
}

// Función para alternar modo claro/oscuro
function toggleModo() {
  document.body.classList.toggle('dark');
  
  // Cambiar texto del botón según el modo
  const botonModo = document.querySelector('button[onclick="toggleModo()"]');
  if (document.body.classList.contains('dark')) {
    botonModo.innerText = 'Modo Claro';
  } else {
    botonModo.innerText = 'Modo Oscuro';
  }
}
