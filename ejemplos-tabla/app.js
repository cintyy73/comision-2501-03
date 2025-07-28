// Función abreviada para seleccionar elementos
const $ = (selector) => document.querySelector(selector);

// onload
window.addEventListener('load', () => {
  console.log('Evento: onload - La página ha cargado.');
});

// onclick
$('#btn-click').addEventListener('click', () => {
  alert('Hiciste clic');
  console.log('Evento: onclick');
});

// ondblclick
$('#box-dblclick').addEventListener('dblclick', (e) => {
  e.target.style.backgroundColor = '#a2d5f2';
  console.log('Evento: ondblclick - Color cambiado');
});

// onmouseover y onmouseout
$('#img-hover').addEventListener('mouseover', (e) => {
  const tooltip = $('#tooltip');
  tooltip.style.left = e.pageX + 'px';
  tooltip.style.top = e.pageY + 'px';
  tooltip.style.display = 'block';
  console.log('Evento: onmouseover - Tooltip mostrado');
});

$('#img-hover').addEventListener('mouseout', () => {
  $('#tooltip').style.display = 'none';
  console.log('Evento: onmouseout - Tooltip oculto');
});

// onmousemove
$('#box-move').addEventListener('mousemove', (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  $('#coords').textContent = `Coordenadas: (${x}, ${y})`;
  console.log(`Evento: onmousemove - Coordenadas: (${x}, ${y})`);
});

// onscroll
$('#scroll-box').addEventListener('scroll', () => {
  console.log('Evento: onscroll - Scroll detectado');
});

// onkeydown
$('#key-input').addEventListener('keydown', (event) => {
  console.log(`Evento: onkeydown - Tecla: ${event.key}`);
});

// onsubmit
$('#formulario').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevenir envío real
  alert('Formulario enviado correctamente.');
  console.log('Evento: onsubmit - Formulario enviado');
});
