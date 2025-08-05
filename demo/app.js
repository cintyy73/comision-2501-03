// === COMPONENTE SIDEBAR ===
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Cerrar sidebar al hacer clic en enlaces (en móviles)
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
    });
});

// === COMPONENTE COLLAPSE ===
function toggleCollapse(collapseId) {
    const content = document.getElementById(collapseId);
    const header = content.previousElementSibling;
    
    // Toggle classes
    content.classList.toggle('active');
    header.classList.toggle('active');
    
    // Agregar animación suave
    if (content.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
    } else {
        content.style.maxHeight = '0px';
    }
}

// === COMPONENTE MODAL ===
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
    
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
    
    // Agregar evento para cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(modalId);
        }
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
}

// Cerrar modal al hacer clic en el overlay
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// === COMPONENTE TOGGLE ===
function toggleSwitch(element) {
    element.classList.toggle('active');
    
    // Encontrar el span de estado correspondiente
    const statusSpan = element.parentElement.querySelector('span[id*="toggle-status"]');
    
    if (element.classList.contains('active')) {
        statusSpan.textContent = 'Activado';
        statusSpan.style.color = '#27ae60';
        statusSpan.style.fontWeight = 'bold';
        
        // Mostrar notificación de cambio
        showNotification('Función activada correctamente', 'success');
    } else {
        statusSpan.textContent = 'Desactivado';
        statusSpan.style.color = '#e74c3c';
        statusSpan.style.fontWeight = 'normal';
        
        // Mostrar notificación de cambio
        showNotification('Función desactivada', 'info');
    }
}

// === SISTEMA DE NOTIFICACIONES ===
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 6px;
        color: white;
        font-weight: bold;
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    // Colores según el tipo
    switch(type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'warning':
            notification.style.background = '#f39c12';
            break;
        default:
            notification.style.background = '#3498db';
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// === NAVEGACIÓN SUAVE ===
document.addEventListener('DOMContentLoaded', function() {
    // Agregar navegación suave para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Cerrar sidebar en móviles después de navegar
                if (window.innerWidth <= 768) {
                    document.getElementById('sidebar').classList.remove('active');
                }
            }
        });
    });
});

// === FUNCIONES DE DEMOSTRACIÓN ADICIONALES ===

// Función para simular carga de datos en collapse
function loadDynamicContent(collapseId) {
    const content = document.getElementById(collapseId);
    const body = content.querySelector('.collapse-body');
    
    // Simular carga
    body.innerHTML = '<p>Cargando contenido...</p>';
    
    setTimeout(() => {
        body.innerHTML = `
            <h4>Contenido Dinámico Cargado</h4>
            <p>Este contenido se cargó dinámicamente después de expandir el collapse.</p>
            <div style="background: #f0f8ff; padding: 10px; border-left: 4px solid #3498db; margin: 10px 0;">
                <strong>Datos actualizados:</strong> ${new Date().toLocaleString()}
            </div>
        `;
    }, 1000);
}

// Función para validar formulario en modal
function validateForm() {
    const inputs = document.querySelectorAll('#formModal input, #formModal textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#27ae60';
        }
    });
    
    if (isValid) {
        showNotification('Formulario enviado correctamente', 'success');
        closeModal('formModal');
        // Reset form
        inputs.forEach(input => {
            input.value = '';
            input.style.borderColor = '#ddd';
        });
    } else {
        showNotification('Por favor, completa todos los campos', 'error');
    }
}

// === FUNCIONALIDADES AVANZADAS ===

// Auto-cerrar collapse cuando se abre otro
function autoCloseOtherCollapses(currentCollapseId) {
    const allCollapses = document.querySelectorAll('.collapse-content');
    
    allCollapses.forEach(collapse => {
        if (collapse.id !== currentCollapseId && collapse.classList.contains('active')) {
            collapse.classList.remove('active');
            collapse.previousElementSibling.classList.remove('active');
            collapse.style.maxHeight = '0px';
        }
    });
}

// Mejorar la función toggleCollapse para incluir auto-close
const originalToggleCollapse = toggleCollapse;
toggleCollapse = function(collapseId) {
    // Verificar si el collapse actual está cerrado
    const content = document.getElementById(collapseId);
    const wasOpen = content.classList.contains('active');
    
    // Si se va a abrir, cerrar otros primero
    if (!wasOpen) {
        autoCloseOtherCollapses(collapseId);
    }
    
    // Ejecutar la función original
    originalToggleCollapse(collapseId);
};

// === RESPONSIVE BEHAVIOR ===
window.addEventListener('resize', function() {
    const sidebar = document.getElementById('sidebar');
    
    // Auto-cerrar sidebar en pantallas grandes
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});

// === ACCESIBILIDAD ===
document.addEventListener('keydown', function(e) {
    // Navegación con teclado para toggles
    if (e.target.classList.contains('toggle-switch') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        toggleSwitch(e.target);
    }
    
    // Navegación con teclado para collapse headers
    if (e.target.classList.contains('collapse-header') && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        const collapseId = e.target.nextElementSibling.id;
        toggleCollapse(collapseId);
    }
});

// Agregar atributos de accesibilidad dinámicamente
document.addEventListener('DOMContentLoaded', function() {
    // Toggle switches
    const toggles = document.querySelectorAll('.toggle-switch');
    toggles.forEach((toggle, index) => {
        toggle.setAttribute('role', 'switch');
        toggle.setAttribute('aria-checked', 'false');
        toggle.setAttribute('tabindex', '0');
        toggle.setAttribute('aria-label', `Toggle opción ${index + 1}`);
    });
    
    // Collapse headers
    const collapseHeaders = document.querySelectorAll('.collapse-header');
    collapseHeaders.forEach((header, index) => {
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('tabindex', '0');
        header.setAttribute('aria-controls', header.nextElementSibling.id);
    });
    
    // Modal triggers
    const modalTriggers = document.querySelectorAll('[onclick*="openModal"]');
    modalTriggers.forEach(trigger => {
        trigger.setAttribute('aria-haspopup', 'dialog');
    });
});

// === PERSISTENCIA DE ESTADO ===
// Guardar estado de toggles en localStorage
function saveToggleState(toggleElement, state) {
    const toggleId = Array.from(document.querySelectorAll('.toggle-switch')).indexOf(toggleElement);
    localStorage.setItem(`toggle_${toggleId}`, state);
}

// Restaurar estado de toggles al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const toggles = document.querySelectorAll('.toggle-switch');
    
    toggles.forEach((toggle, index) => {
        const savedState = localStorage.getItem(`toggle_${index}`);
        if (savedState === 'true') {
            toggle.classList.add('active');
            const statusSpan = toggle.parentElement.querySelector('span[id*="toggle-status"]');
            statusSpan.textContent = 'Activado';
            statusSpan.style.color = '#27ae60';
            statusSpan.style.fontWeight = 'bold';
        }
    });
});

// Actualizar la función toggleSwitch para guardar estado
const originalToggleSwitch = toggleSwitch;
toggleSwitch = function(element) {
    originalToggleSwitch(element);
    saveToggleState(element, element.classList.contains('active'));
};

console.log('🚀 Componentes Web cargados correctamente');
console.log('📋 Componentes disponibles: Collapse, Sidebar, Modal, Toggle');
console.log('💡 Funcionalidades: Navegación suave, notificaciones, persistencia de estado');