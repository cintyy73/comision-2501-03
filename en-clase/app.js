const API_URL = "https://68af4654b91dfcdd62bbe419.mockapi.io/api";

const container = document.getElementById("container");

function getUsers() {
  fetch(`${API_URL}/student`)
    .then((response) => {
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      return response.json();
    })
    .then((users) => {
      showUsers(users);
    })
    .catch((error) => {
      console.log(error);
    });
}

getUsers();

function showUsers(users) {
  users.forEach(({ name, avatar, job, country, id }) => {
    // const {name, avatar, job, country} = user;

    const column = document.createElement("div");
    column.innerHTML = `
        <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${avatar}" alt="${name}">
          </figure>
        </div>
        <div class="card-content">
          <p class="title is-5">${name}</p>
          <p class="subtitle is-6">${job}</p>
          <p><i class="fas fa-flag"></i> ${country}</p>
        </div>
        <footer class="card-footer">


          class="card-footer-item">Editar<button>
          <a href="#" class="card-footer-item">Eliminar</a>
        </footer>
      </div>
    `;
    container.appendChild(column);
  });
}


const new_user = {
  name: "Melany Coscia",
  country: "Argentinaa",
  job: "Ux designer - Developer",
};

function editUser(update_user, id) {
  fetch(`${API_URL}/student/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update_user),
  })
    .then((resp) => resp.json())
    .then((datos) => console.log("datos:", datos));
}

function newUser(update_user) {
  fetch(`${API_URL}/student`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update_user),
  })
    .then((resp) => resp.json())
    .then((datos) => console.log("datos:", datos));
}

function deleteUser (id) {
      fetch(`${API_URL}/student/${id}`, {method: "DELETE"} )
      .then(res=> getUsers())
}

deleteUser(4)