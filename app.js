let title = document.getElementById("title");
let element = document.querySelector("#two");
let img = document.querySelector("img");
let subtitle = document.querySelector(".heading");
let cat = document.getElementById("cat");

console.log(document);

console.log(document.querySelector("h1"));
console.log(document.querySelector("p"));
console.log(document.querySelectorAll("p"));
console.log(document.querySelector(".heading"));

console.log(document.querySelector(".tres"));

console.log(document.querySelector("#title"));

document.getElementById("title");
console.log(document.getElementsByClassName("tres"));

function changeTitle() {
  title.style.color = "red";
}

console.log(element.classList);

function changeP() {
  element.classList.toggle("parrafo-cambiado");
  console.log({ "clase del parrafo": element.classList });
}

function darkMode() {
  document.body.classList.toggle("dark");
  console.log(document.body.classList.contains("dark"));
}

console.log(title.classList.contains("tres"));
console.log(title.classList.contains("heading"));

function imgHasAttribute() {
  if (img.hasAttribute("src")) {
    alert("Tiente src sí!!!!");
    console.log(img.getAttribute("src"));
  } else {
    alert("noooooo tiene src");
  }
}

function imgRemoveAttribute() {
  img.removeAttribute("src");
}

function imgChangeAttribute() {
  img.setAttribute(
    "src",
    "https://media.istockphoto.com/id/2151266859/photo/a-cat-in-a-blue-hoodie-with-a-gold-chain-and-sunglasses-lies-near-the-bills-orange-background.jpg?s=1024x1024&w=is&k=20&c=cErvHbYaMCmxrz4j6-_RarFDUZqETNWLiF9dSzwNzlY="
  );
}

// subtitle.style.color = 'red'

function hideCat() {
  if (img.classList.contains("img-none")) {
    //oculto
    console.log(img.classList);
    img.classList.remove("img-none"); //quito ocultar
    img.classList.add("img-show"); //muestro
    console.log(img.classList);
    cat.innerText = "Chau Gatito";
  } else {
    console.log(img.classList);
    img.classList.remove("img-show"); //quito mostrar
    img.classList.add("img-none"); //oculto
    console.log(img.classList);
    cat.innerText = "Hola Gatito";
  }
}
