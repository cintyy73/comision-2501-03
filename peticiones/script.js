// Ejemplo 1: fetch con .then
// Crear y mostrar el spinner
const spinner = document.createElement("div");
spinner.textContent = "Spinner async-await...";
spinner.style.border = "2px solid #888";
spinner.style.borderRadius = "8px";
spinner.style.padding = "12px";
spinner.style.margin = "16px auto";
spinner.style.width = "fit-content";
spinner.style.fontWeight = "bold";
  spinner.style.background= "yellow";

document.body.appendChild(spinner);
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(res => {
    console.log(res)
    if (!res.ok) throw new Error("Error HTTP: " + res.status);
    return res.json();
  })
  .then(posts => {
    posts.forEach(post => {
      // Crea un div para cada post
      const div = document.createElement("div");
      div.style.border = "1px solid #333";
      div.style.margin = "8px";
      div.style.padding = "8px";
      // Agrega el id y el title
      div.innerHTML = `<strong>ID:</strong> ${post.id}<br><strong>Título:</strong> ${post.title}`;
      document.body.appendChild(div);
    });
    // Quita el spinner cuando termina
    spinner.remove();
  })
  .catch(err => {
    console.log("Error al obtener posts:", err.message);
    spinner.remove();
  });

// Ejemplo 2: fetch con async/await
async function mostrarPosts() {
  // Crear y mostrar el spinner
  const spinner2 = document.createElement("div");
  spinner2.textContent = "Spinner con fetch...";
  spinner2.style.border = "2px solid #888";
  spinner2.style.borderRadius = "8px";
  spinner2.style.padding = "12px";
  spinner2.style.margin = "16px auto";
  spinner2.style.width = "fit-content";
  spinner2.style.background= "red";
  spinner2.style.fontWeight = "bold";
  document.body.appendChild(spinner2);
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Error HTTP: " + res.status);
    const posts = await res.json();
    posts.forEach(post => {
      const div = document.createElement("div");
      div.style.border = "1px solid #333";
      div.style.margin = "8px";
      div.style.padding = "8px";
      div.innerHTML = `<strong>ID:</strong> ${post.id}<br><strong>Título:</strong> ${post.title}`;
      document.body.appendChild(div);
    });
    // Quita el spinner cuando termina
    spinner2.remove();
  } catch (err) {
    console.log("Error al obtener posts:", err.message);
    spinner2.remove();
  }
}
mostrarPosts();
