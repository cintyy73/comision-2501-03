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

// Ejemplo 1: Desestructuración de arrays
const [frontend, fullstack] = careers_data;
console.log('Frontend:', frontend.title);
console.log('Fullstack:', fullstack.title);

// Ejemplo 2: Desestructuración de objetos
const { title, description, icons } = frontend;
console.log('Título:', title);
console.log('Descripción:', description);
console.log('Primer icono:', icons[0]);

// Ejemplo 3: Spread para copiar y modificar
const frontendCopy = { ...frontend, title: 'Frontend Avanzado' };
console.log('Copia modificada:', frontendCopy);

// Ejemplo 4: Rest para agrupar el resto de propiedades
const { title: tituloFront, ...restoFront } = frontend;
console.log('Título separado:', tituloFront);
console.log('Resto de propiedades:', restoFront);

// Ejemplo 5: Deep copy (copia profunda)
const deepCopy = JSON.parse(JSON.stringify(frontend));
deepCopy.title = 'Frontend Deep Copy';
console.log('Original:', frontend.title);
console.log('Deep Copy:', deepCopy.title);
