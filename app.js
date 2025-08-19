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
    // Ejemplo de array de objetos con la info de las cards de carreras",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80",
    icons: [
      { class: "fab fa-html5", color: "has-text-danger" },
      { class: "fab fa-css3-alt", color: "has-text-info" },
      { class: "fab fa-js", color: "has-text-warning" },
      { class: "fab fa-react", color: "has-text-primary" },
    ],
    description:
      "La carrera de Fullstack te prepara para crear interfaces web modernas y responsivas usando HTML, CSS, JavaScript y frameworks como React. Aprenderás sobre diseño, accesibilidad y experiencia de usuario.",
  },
];
const $ = (selector) => document.querySelector(selector);
  const formData = $("#registerForm");

document.addEventListener("DOMContentLoaded", () => {
  const getTargetMenu = (burger) =>
    document.getElementById(burger.dataset.target);

  const toggleMenu = (burger) => {
    burger.classList.toggle("is-active");
    const targetMenu = getTargetMenu(burger);
    targetMenu?.classList.toggle("is-active");
  };

  const addBurgerListeners = () =>
    document
      .querySelectorAll(".navbar-burger")
      .forEach((burger) =>
        burger.addEventListener("click", () => toggleMenu(burger))
      );
  addCard(careers_data);
  addBurgerListeners();

  const form = $("#registerForm");
  const firstNameInput = $("#firstName");
  const lastNameInput = $("#lastName");
  const emailInput = $("#email");
  const reasonInput = $("#reason");
  const whatsappInput = $("#whatsapp");

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const datosForm = {
      nombre: firstNameInput.value.trim(),
      apellido: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      motivo: reasonInput.value.trim(),
      whatsapp: whatsappInput.checked,
      pregunta: form.querySelector('input[name="question"]:checked')?.value || null
    };
    console.log("Datos del formulario:", datosForm);
  });

  emailInput.addEventListener("input", () => {
    const emailValue = emailInput.value;

    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailValue)) {
      emailInput.classList.add("is-success");
      emailInput.classList.remove("is-danger");

      if (emailHelp) {
        emailHelp.textContent = "Email válido";
        emailHelp.className = "help is-success";
      }
    } else {
      emailInput.classList.add("is-danger");
      emailInput.classList.remove("is-success");
      if (emailHelp) {
        emailHelp.textContent = "Email inválido";
        emailHelp.className = "help is-danger";
      }
    }
  });
});
const addCard = (data) => {
  data.map(
    (careers) =>
      ($("#careers").innerHTML += `
   <div class="card mt-5 mb-5" style="max-width: 500px; margin: auto;">
        <div class="card-image">
            <figure class="image is-4by3">
                <img src=${careers.image}
                    alt="Frontend" />
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-content">
                    <p class="title is-4">${careers.title}</p>
                    <p class="subtitle is-6">Modalidad: on-line</p>
                </div>
            </div>
            <div class="tags mt-2">
                <span class="icon is-medium has-text-danger"><i class="fab fa-html5 fa-2x"></i></span>
                <span class="icon is-medium has-text-info"><i class="fab fa-css3-alt fa-2x"></i></span>
                <span class="icon is-medium has-text-warning"><i class="fab fa-js fa-2x"></i></span>
                <span class="icon is-medium has-text-primary"><i class="fab fa-react fa-2x"></i></span>
            </div>
            <div class="content">
                ${careers.description}
            </div>
        </div>
        </div>
        </div>
    </div>`)
  );
};
