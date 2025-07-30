function $ (selector) {
    return  document.querySelector(selector)
}

let btnSaludo = $('#btnSaludo')
let container_message  = $('#message')
const hover =$('#hoverBox')


function saludar (message) {
container_message.textContent = message
}

// btnSaludo.addEventListener("ondblclick", () => saludar('Hola!') )
btnSaludo.addEventListener("dblclick", () => saludar('Hola!') )


hover.addEventListener('mouseover', ()=>{
    hover.style.background = "blue"
})

hover.addEventListener('mouseout', ()=>{
    hover.style.background = "red"
})

$('#tecladoInput').addEventListener('keydown', (e)=>{
    $('#keyMsg').textContent = `Tecla presionada = ${e.key}`
    console.log(e.key)
})

function stop (e){
    e.preventDefault()
     $("#linkMsg").textContent = "Se evitó la redirección.";
}

$('#enlace').addEventListener('click', stop)

