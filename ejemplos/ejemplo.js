// Carrera Front End - Clase 4
// Ejercicios integrados DOM y formularios
// Cada bloque tiene comentarios para remarcar la teoría y facilitar commits paso a paso

// 1. Capturando y mostrando datos de un formulario
// Teoría: preventDefault evita recarga, value obtiene datos, mostramos en un div
const formDatos = document.getElementById('formDatos');
formDatos.addEventListener('submit', function(e) {
  e.preventDefault(); // Evita recarga
  const nombre = document.getElementById('nombre').value;
  const edad = document.getElementById('edad').value;
  document.getElementById('datosMostrados').textContent = `Nombre: ${nombre}, Edad: ${edad}`;
});

// 2. Evitando el envío de un formulario si hay errores
// Teoría: Validamos antes de enviar, mostramos errores en HTML
const formLogin = document.getElementById('formLogin');
formLogin.addEventListener('submit', function(e) {
  e.preventDefault();
  let ok = true;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // Limpiar errores
  document.getElementById('errorEmail').textContent = '';
  document.getElementById('errorPassword').textContent = '';
  // Validar email
  if (!email.includes('@')) {
    document.getElementById('errorEmail').textContent = 'El email debe contener @';
    ok = false;
  }
  // Validar password
  if (password.length < 6) {
    document.getElementById('errorPassword').textContent = 'La contraseña debe tener al menos 6 caracteres';
    ok = false;
  }
  if (ok) {
    formLogin.submit(); // Solo si todo es correcto (en este ejemplo recarga, puedes quitarlo si no quieres recarga)
  }
});

// 3. Limitando el número de caracteres en un textarea
// Teoría: input detecta cambios, actualizamos contador, evitamos exceder el límite
const textarea = document.getElementById('comentario');
const contador = document.getElementById('contador');
textarea.addEventListener('input', function() {
  const max = 150;
  const restante = max - textarea.value.length;
  contador.textContent = `${restante} caracteres restantes`;
  if (restante < 0) {
    textarea.value = textarea.value.slice(0, max);
    contador.textContent = '0 caracteres restantes';
  }
});

// 4. Selección de opciones con radio y checkbox
// Teoría: querySelector para radio, querySelectorAll para checkbox
const btnSeleccion = document.getElementById('mostrarSeleccion');
btnSeleccion.addEventListener('click', function() {
  // Radio
  const color = document.querySelector('input[name="color"]:checked');
  // Checkbox
  const hobbies = document.querySelectorAll('input[name="hobby"]:checked');
  let mensaje = '';
  if (!color) mensaje += 'Selecciona un color. ';
  if (hobbies.length === 0) mensaje += 'Selecciona al menos un pasatiempo.';
  if (mensaje) {
    document.getElementById('seleccionMostrada').textContent = mensaje;
    document.getElementById('seleccionMostrada').style.color = '#c0392b';
    return;
  }
  // Mostrar selección
  const hobbiesArr = Array.from(hobbies).map(h => h.value);
  document.getElementById('seleccionMostrada').style.color = '#2c3e50';
  document.getElementById('seleccionMostrada').textContent = `Color: ${color.value}, Pasatiempos: ${hobbiesArr.join(', ')}`;
});

// 5. Generando una URL dinámica con location.search
// Teoría: location.href para redirigir, location.search para leer parámetros
const formRedir = document.getElementById('formRedirigir');
const bienvenida = document.getElementById('bienvenida');
formRedir.addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = document.getElementById('nombreRedir').value;
  // Redirigir agregando el nombre como parámetro
  location.href = location.pathname + '?nombre=' + encodeURIComponent(nombre);
});
// Mostrar mensaje si hay parámetro nombre
const params = new URLSearchParams(location.search);
if (params.has('nombre')) {
  bienvenida.textContent = `¡Bienvenida, ${params.get('nombre')}!`;
}

// Desafío Extra: Calculadora
// Teoría: Capturamos valores, operación y mostramos resultado sin recargar
const formCalc = document.getElementById('formCalc');
formCalc.addEventListener('submit', function(e) {
  e.preventDefault();
  const n1 = parseFloat(document.getElementById('num1').value);
  const n2 = parseFloat(document.getElementById('num2').value);
  const op = document.getElementById('operacion').value;
  let resultado = '';
  if (op === '/' && n2 === 0) {
    resultado = 'No se puede dividir por cero';
  } else {
    switch(op) {
      case '+': resultado = n1 + n2; break;
      case '-': resultado = n1 - n2; break;
      case '*': resultado = n1 * n2; break;
      case '/': resultado = n1 / n2; break;
    }
  }
  document.getElementById('resultadoCalc').textContent = `Resultado: ${resultado}`;
});
