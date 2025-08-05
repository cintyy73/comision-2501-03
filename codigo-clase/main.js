const $ = (selector) => document.querySelector(selector)
// function $ () {
//     return document.querySelector(selector)
// }

const initSidebar = () => {
    const sidebar = $('#sidebar')
    const openSidebar = $('#open-sidebar')
    const sidebarLinks = document.querySelectorAll('a')

    sidebarLinks.forEach(link=>{
       link.addEventListener('click', ()=>{
        sidebar.style.display= 'none'
       })
    })

    openSidebar.addEventListener('click', (e)=>{
        sidebar.style.display = "block"
        e.stopPropagation();
    })

    document.addEventListener('click', (e)=>{
        if(!sidebar.contains(e.target) && e.target !== sidebarLinks){
            sidebar.style.display ='none'
        }
    })
}

const initModal = () => {
    const modalButton = $("#modal-button"); // Botón para abrir el modal
    const modal = $("#modal"); // Contenedor del modal
    const closeModal = $("#closeModal"); // Botón de cierre dentro del modal
    const loginForm = $("#loginForm"); // Formulario de login
    const emailInput = $("#email"); // Campo de email
    const passwordInput = $("#password"); // Campo de contraseña
    const emailError = $("#emailError"); // Mensaje de error para el email
    const passwordError = $("#passwordError"); // Mensaje de error para la contraseña
    const formStatus = $("#formStatus"); // Mensaje de estado del formulario


    modalButton.addEventListener('click', function () {
        modal.classList.add('show')
    })

    closeModal.addEventListener('click',  function () {
        modal.classList.remove('show')
    })

     document.addEventListener('click', (e)=>{
       if(e.target === modal){
        modal.classList.remove('show')
       }
    })
}

const initCollapse = () =>{
    const collapseButton = $("#collapseButton"); // Botón para alternar el collapse
    const collapseContent = $("#collapseContent"); // Contenido a mostrar/ocultar

    console.log( collapseContent.style.display)
    collapseButton.addEventListener('click', function () {
        if(collapseContent.style.display === "none"){
            collapseContent.style.display = 'block'
        } else {
            collapseContent.style.display = "none"
        }
    })

}

document.addEventListener('DOMContentLoaded', ()=>{
 initSidebar()
 initModal() 
 initCollapse()
})
