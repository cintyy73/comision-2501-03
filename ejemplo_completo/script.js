// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
  // Utilidad para seleccionar elementos fácilmente
  const $ = selector => document.querySelector(selector);
  const getTargetMenu = burger => document.getElementById(burger.dataset.target);

  const toggleMenu = burger => {
    burger.classList.toggle('is-active');
    const targetMenu = getTargetMenu(burger);
    targetMenu?.classList.toggle('is-active');
  };

  const addBurgerListeners = () =>
    document.querySelectorAll('.navbar-burger').forEach(burger =>
      burger.addEventListener('click', () => toggleMenu(burger))
    );

  addBurgerListeners();
});

// Validación y submit de formulario Bulma

document.addEventListener('DOMContentLoaded', () => {
  // Utilidad para seleccionar elementos fácilmente
  const $ = selector => document.querySelector(selector);
  const form = $('#registerForm');
  const lastNameInput = $('#lastName');
  const lastNameIcon = $('#lastNameIcon');
  const lastNameHelp = $('#lastNameHelp');
  const emailInput = $('#email');
  const emailIcon = $('#emailIcon');
  const emailHelp = $('#emailHelp');
  const msg = $('#formMsg');

  // Validación en tiempo real para apellido
  lastNameInput.addEventListener('input', () => {
    if (lastNameInput.value.length >= 3) {
      lastNameInput.classList.add('is-success');
      lastNameInput.classList.remove('is-danger');
      lastNameIcon.innerHTML = '<i class="fas fa-check"></i>';
      lastNameHelp.textContent = 'This last name is valid';
      lastNameHelp.className = 'help is-success';
    } else {
      lastNameInput.classList.add('is-danger');
      lastNameInput.classList.remove('is-success');
      lastNameIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
      lastNameHelp.textContent = 'Last name must be at least 3 characters';
      lastNameHelp.className = 'help is-danger';
    }
  });

  // Validación en tiempo real para email
    // Evento 'input': se dispara cada vez que el usuario escribe o modifica el valor del campo email
    emailInput.addEventListener('input', () => {
      const emailVal = emailInput.value;
      // Validación de formato de email en tiempo real
      if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailVal)) {
        emailInput.classList.add('is-success');
        emailInput.classList.remove('is-danger');
        if (emailIcon) emailIcon.innerHTML = '<i class="fas fa-check"></i>';
        if (emailHelp) {
          emailHelp.textContent = 'Email válido';
          emailHelp.className = 'help is-success';
        }
      } else {
        emailInput.classList.add('is-danger');
        emailInput.classList.remove('is-success');
        if (emailIcon) emailIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        if (emailHelp) {
          emailHelp.textContent = 'Email inválido';
          emailHelp.className = 'help is-danger';
        }
      }
    });

  function getFormData() {
    return {
      firstName: $('#firstName').value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      reason: $('#reason').value.trim(),
      whatsapp: $('#whatsapp').checked,
      question: form.querySelector('input[name="question"]:checked')
    };
  }

  function validateForm(data) {
    if (!data.firstName || !data.lastName || !data.email || !data.reason || !data.question) {
      return 'Complete all required fields.';
    }
    if (data.lastName.length < 3) {
      return 'Last name must be at least 3 characters.';
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
      return 'Invalid email.';
    }
    return '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    msg.textContent = '';
    const data = getFormData();
    const error = validateForm(data);
    if (error) {
      msg.textContent = error;
      return;
    }
    msg.classList.remove('has-text-danger');
    msg.classList.add('has-text-success');
    msg.textContent = 'Form submitted!';
    // Mostrar datos en consola
    console.log({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      reason: data.reason,
      whatsapp: data.whatsapp,
      studiedBefore: data.question.value
    });
    form.reset();
    lastNameInput.classList.remove('is-success', 'is-danger');
    lastNameIcon.innerHTML = '';
    lastNameHelp.textContent = '';
    emailInput.classList.remove('is-success', 'is-danger');
    emailIcon.innerHTML = '';
    emailHelp.textContent = '';
  }

  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
});
