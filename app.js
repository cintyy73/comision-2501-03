// const numeros = [10, 20, 30];

// console.log(numeros[0]);

// const [primero, segundo] = numeros;

// console.log(primero); // 10
// console.log(segundo); // 20

// // Saltando valores
// const [a, , c] = numeros;
// console.log(c); // 30

const careers_data = [
  {
    title: "Frontend",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
    icons: [
      { class: "fab fa-html5", color: "has-text-danger" },
      { class: "fab fa-css3-alt", color: "has-text-info" },
      { class: "fab fa-js", color: "has-text-warning" },
      { class: "fab fa-react", color: "has-text-primary" },
    ],
    description:
      "La carrera de Frontend te prepara para crear interfaces web modernas y responsivas usando HTML, CSS, JavaScript y frameworks como React. Aprenderás sobre diseño, accesibilidad y experiencia de usuario.",
  },
  {
    title: "Fullstack",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=500&q=80",
    icons: [
      { class: "fab fa-html5", color: "has-text-danger" },
      { class: "fab fa-css3-alt", color: "has-text-info" },
      { class: "fab fa-js", color: "has-text-warning" },
      { class: "fab fa-react", color: "has-text-primary" },
    ],
    description:
      "La carrera de Frontend te prepara para crear interfaces web modernas y responsivas usando HTML, CSS, JavaScript y frameworks como React. Aprenderás sobre diseño, accesibilidad y experiencia de usuario.",
  },
];

// const [frontend] = careers_data;

// console.log(frontend.title);

// const persona = {
//   nombre: "cintia",
//   edad: 25,
// };

// const { edad } = persona;

// const { icons, title, description } = frontend;

// console.log(icons);

// icons.map((i) => console.log(i));

// // Con valores por defecto
// const { ciudad = "Desconocida" } = persona;
// console.log(ciudad); // "Desconocida"

// const usuario = {
//   id: 1,
//   apellido: "Lucía",
// };

// const alumnos = {
//   id: 2,
//   apellido: "geo",
// };

// const { apellido } = usuario;

// const { apellido: apellido_alumnos } = alumnos;

// console.log(apellido);
// console.log(apellido_alumnos);

// // const { apellido: userName } = usuario;
// // console.log(userName); // "Lucía"
const empleado = {
  nombre: "Santiago",
  direccion: {
    ciudad: "Buenos Aires",
    pais: "Argentina",
  },
};

const nuevo = { ...empleado}

nuevo.nombre = "cordoba"

console.log(empleado.nombre)

console.log(nuevo.nombre)


// const {direccion : { pais, pepe }} = empleado;

// console.log(direccion.pais)

// const numeros = [1, 2, 3];

// const nuevo_array = [4, 5, 6];

// const todos = [...numeros, ...nuevo_array];

// const ia = {};
// const ada2025 = [...careers_data, ia];

// const empleado_completo = {
//   ...empleado,
//   pepe: "pepe",
// };
// console.log(empleado_completo);

// const [primero, ...resto] = [10, 20, 30, 40];

// console.log(resto); // [20, 30, 40]

// const [alumna_aprobada, , ...en_revision] = ["geo", "meli", "pame"];

// console.log(alumna_aprobada);
// console.log(en_revision);

// const persona = { nombre: "Carlos", password: 30, pais: "Argentina" };
// const { password, ...datosRestantes } = persona;

// console.log( password); // Carlos
// console.log( datosRestantes); // { edad: 30, pais: 'Argentina' }


// // persona.password=32
// const personaCopia = { ...persona, password: 32 };
// console.log(personaCopia.password)

// let a = 10
// let b = a

// b=20

// console.log(b, a)

let obj1 = { nombre: "Ana" };

let obj2 = obj1;
console.log(obj2, obj1)

obj2.nombre = "pepe"

console.log(obj2, obj1)