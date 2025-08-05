/* ========================================
   TECHSTORE - SISTEMA DE COMPONENTES WEB
   Funcionalidad JavaScript para e-commerce
   ======================================== */

// ========================================
// VARIABLES GLOBALES Y ESTADO DE LA APP
// ========================================

// Estado del carrito de compras
let cart = {
    items: [
        { id: 1, name: "iPhone 15 Pro", price: 1199, quantity: 1, image: "📱" },
        { id: 3, name: "AirPods Pro 2", price: 249, quantity: 2, image: "🎧" }
    ],
    total: 0
};

// Estado de las configuraciones de usuario
let userSettings = {
    notifications: false,
    newsletter: false,
    recommendations: true,
    twoFactor: false
};

// ========================================
// FUNCIONES DEL COMPONENTE SIDEBAR
// ========================================

/**
 * Alternar la visibilidad del sidebar
 * Función principal para mostrar/ocultar el menú lateral
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (!sidebar) {
        console.error('Sidebar element not found');
        return;
    }
    
    // Verificar el estado actual del sidebar
    const isOpen = sidebar.classList.contains('sidebar-open') || 
                   sidebar.style.transform === 'translateX(0px)' ||
                   window.getComputedStyle(sidebar).transform === 'matrix(1, 0, 0, 1, 0, 0)';
    
    if (isOpen) {
        // Cerrar sidebar
        sidebar.classList.remove('sidebar-open');
        sidebar.style.transform = 'translateX(-100%)';
        if (menuToggle) {
            menuToggle.innerHTML = '☰ Menú';
            menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        }
        
        // Remover overlay si existe
        removeOverlay();
    } else {
        // Abrir sidebar
        sidebar.classList.add('sidebar-open');
        sidebar.style.transform = 'translateX(0)';
        if (menuToggle) {
            menuToggle.innerHTML = '✕ Cerrar';
            menuToggle.setAttribute('aria-label', 'Cerrar menú de navegación');
        }
        
        // Crear overlay para cerrar al hacer clic fuera
        createOverlay();
    }
    
    console.log('Sidebar toggled:', !isOpen ? 'opened' : 'closed');
}

/**
 * Crear overlay para cerrar sidebar al hacer clic fuera
 */
function createOverlay() {
    // Remover overlay existente si lo hay
    removeOverlay();
    
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
        cursor: pointer;
    `;
    
    // Cerrar sidebar al hacer clic en el overlay
    overlay.addEventListener('click', () => {
        toggleSidebar();
    });
    
    document.body.appendChild(overlay);
}

/**
 * Remover overlay del sidebar
 */
function removeOverlay() {
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
        overlay.remove();
    }
}

// ========================================
// FUNCIONES DEL COMPONENTE COLLAPSE
// ========================================

/**
 * Alternar el estado de un elemento collapse
 * @param {string} id - ID del elemento collapse a alternar
 */
function toggleCollapse(id) {
    const content = document.getElementById(id);
    const header = content?.parentElement?.querySelector('.collapse-header');
    const icon = header?.querySelector('.collapse-icon');
    
    if (!content) {
        console.error(`Collapse element with id '${id}' not found`);
        return;
    }
    
    const isOpen = content.classList.contains('collapse-open');
    
    if (isOpen) {
        // Cerrar collapse
        content.classList.remove('collapse-open');
        content.style.maxHeight = '0';
        content.style.padding = '0 20px';
        if (icon) icon.textContent = '▼';
        if (header) header.setAttribute('aria-expanded', 'false');
        
        console.log(`Collapse '${id}' closed`);
    } else {
        // Abrir collapse
        content.classList.add('collapse-open');
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.padding = '20px';
        if (icon) icon.textContent = '▲';
        if (header) header.setAttribute('aria-expanded', 'true');
        
        console.log(`Collapse '${id}' opened`);
        
        // Ajustar altura después de la transición
        setTimeout(() => {
            if (content.classList.contains('collapse-open')) {
                content.style.maxHeight = 'none';
            }
        }, 300);
    }
}

// ========================================
// FUNCIONES DEL COMPONENTE MODAL
// ========================================

/**
 * Abrir un modal específico
 * @param {string} modalId - ID del modal a abrir
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    
    if (!modal) {
        console.error(`Modal with id '${modalId}' not found`);
        return;
    }
    
    // Actualizar contenido dinámico según el tipo de modal
    if (modalId === 'cartModal') {
        updateCartModal();
    }
    
    modal.style.display = 'flex';
    modal.classList.add('modal-open');
    document.body.style.overflow = 'hidden'; // Prevenir scroll del body
    
    // Focus trap para accesibilidad
    const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
        firstFocusable.focus();
    }
    
    console.log(`Modal '${modalId}' opened`);
}

/**
 * Cerrar un modal específico
 * @param {string} modalId - ID del modal a cerrar
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    
    if (!modal) {
        console.error(`Modal with id '${modalId}' not found`);
        return;
    }
    
    modal.style.display = 'none';
    modal.classList.remove('modal-open');
    document.body.style.overflow = ''; // Restaurar scroll del body
    
    console.log(`Modal '${modalId}' closed`);
}

/**
 * Cerrar modal al hacer clic fuera del contenido
 */
function setupModalClickOutside() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            const modalId = e.target.id;
            closeModal(modalId);
        }
    });
}

// ========================================
// FUNCIONES DEL CARRITO DE COMPRAS
// ========================================

/**
 * Actualizar el contenido del modal del carrito
 */
function updateCartModal() {
    calculateCartTotal();
    updateCartCount();
}

/**
 * Agregar producto al carrito
 * @param {number} id - ID del producto
 * @param {string} name - Nombre del producto
 * @param {number} price - Precio del producto
 * @param {string} image - Emoji o imagen del producto
 */
function addToCart(id, name, price, image = '📦') {
    const existingItem = cart.items.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`Cantidad actualizada: ${name}`, 'success');
    } else {
        cart.items.push({
            id: id,
            name: name,
            price: price,
            quantity: 1,
            image: image
        });
        showNotification(`Producto agregado: ${name}`, 'success');
    }
    
    updateCartCount();
    console.log('Product added to cart:', { id, name, price });
}

/**
 * Actualizar cantidad de un producto en el carrito
 * @param {number} id - ID del producto
 * @param {number} change - Cambio en la cantidad (+1 o -1)
 */
function updateQuantity(id, change) {
    const item = cart.items.find(item => item.id === id);
    
    if (!item) {
        console.error(`Item with id ${id} not found in cart`);
        return;
    }
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart.items = cart.items.filter(item => item.id !== id);
        showNotification(`Producto eliminado del carrito`, 'info');
    }
    
    updateCartModal();
    console.log('Cart quantity updated:', { id, newQuantity: item.quantity });
}

/**
 * Calcular el total del carrito
 */
function calculateCartTotal() {
    const subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxes = subtotal * 0.08; // 8% de impuestos
    cart.total = subtotal + taxes;
    
    return {
        subtotal: subtotal,
        taxes: taxes,
        total: cart.total
    };
}

/**
 * Actualizar el contador de productos en el carrito
 */
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// ========================================
// FUNCIONES DEL COMPONENTE TOGGLE
// ========================================

/**
 * Alternar el estado de un switch toggle
 * @param {HTMLElement} toggleElement - Elemento toggle a alternar
 */
function toggleSwitch(toggleElement) {
    if (!toggleElement) {
        console.error('Toggle element not provided');
        return;
    }
    
    const isActive = toggleElement.classList.contains('active');
    const toggleContainer = toggleElement.closest('.toggle-setting') || toggleElement.closest('.toggle-container');
    let statusElement = null;
    let settingKey = null;
    
    // Encontrar el elemento de estado
    if (toggleContainer) {
        statusElement = toggleContainer.querySelector('[id^="toggle-status-"]');
        
        // Determinar qué configuración se está cambiando
        if (statusElement) {
            const statusId = statusElement.id;
            const index = statusId.split('-').pop();
            
            switch (index) {
                case '1':
                    settingKey = 'notifications';
                    break;
                case '2':
                    settingKey = 'newsletter';
                    break;
                case '3':
                    settingKey = 'recommendations';
                    break;
                case '4':
                    settingKey = 'twoFactor';
                    break;
            }
        }
    }
    
    if (isActive) {
        // Desactivar toggle
        toggleElement.classList.remove('active');
        toggleElement.setAttribute('aria-checked', 'false');
        if (statusElement) {
            statusElement.textContent = 'Desactivado';
            statusElement.style.color = '#e74c3c';
        }
        if (settingKey) {
            userSettings[settingKey] = false;
        }
    } else {
        // Activar toggle
        toggleElement.classList.add('active');
        toggleElement.setAttribute('aria-checked', 'true');
        if (statusElement) {
            statusElement.textContent = 'Activado';
            statusElement.style.color = '#27ae60';
        }
        if (settingKey) {
            userSettings[settingKey] = true;
        }
    }
    
    // Guardar configuraciones en localStorage
    saveUserSettings();
    
    // Mostrar notificación de cambio
    const settingName = getSettingDisplayName(settingKey);
    const status = !isActive ? 'activado' : 'desactivado';
    showNotification(`${settingName} ${status}`, 'info');
    
    console.log('Toggle switched:', { settingKey, value: !isActive });
}

/**
 * Obtener el nombre de visualización de una configuración
 * @param {string} settingKey - Clave de la configuración
 * @returns {string} - Nombre para mostrar
 */
function getSettingDisplayName(settingKey) {
    const names = {
        notifications: 'Notificaciones de ofertas',
        newsletter: 'Newsletter semanal',
        recommendations: 'Recomendaciones personalizadas',
        twoFactor: 'Autenticación de dos factores'
    };
    
    return names[settingKey] || 'Configuración';
}

/**
 * Guardar configuraciones del usuario en localStorage
 */
function saveUserSettings() {
    try {
        localStorage.setItem('techstore_user_settings', JSON.stringify(userSettings));
        console.log('User settings saved:', userSettings);
    } catch (error) {
        console.error('Error saving user settings:', error);
    }
}

/**
 * Cargar configuraciones del usuario desde localStorage
 */
function loadUserSettings() {
    try {
        const saved = localStorage.getItem('techstore_user_settings');
        if (saved) {
            userSettings = { ...userSettings, ...JSON.parse(saved) };
            console.log('User settings loaded:', userSettings);
            
            // Aplicar configuraciones guardadas a los toggles
            applySettingsToToggles();
        }
    } catch (error) {
        console.error('Error loading user settings:', error);
    }
}

/**
 * Aplicar configuraciones guardadas a los elementos toggle
 */
function applySettingsToToggles() {
    const settings = [
        { key: 'notifications', statusId: 'toggle-status-1' },
        { key: 'newsletter', statusId: 'toggle-status-2' },
        { key: 'recommendations', statusId: 'toggle-status-3' },
        { key: 'twoFactor', statusId: 'toggle-status-4' }
    ];
    
    settings.forEach(({ key, statusId }) => {
        const statusElement = document.getElementById(statusId);
        const toggleElement = statusElement?.closest('.toggle-setting')?.querySelector('.toggle-switch');
        
        if (statusElement && toggleElement) {
            if (userSettings[key]) {
                toggleElement.classList.add('active');
                toggleElement.setAttribute('aria-checked', 'true');
                statusElement.textContent = 'Activado';
                statusElement.style.color = '#27ae60';
            } else {
                toggleElement.classList.remove('active');
                toggleElement.setAttribute('aria-checked', 'false');
                statusElement.textContent = 'Desactivado';
                statusElement.style.color = '#e74c3c';
            }
        }
    });
}

// ========================================
// FUNCIONES DE PRODUCTOS Y E-COMMERCE
// ========================================

/**
 * Ver detalles de un producto
 * @param {string} productId - ID del producto
 */
function viewProduct(productId) {
    console.log('Viewing product:', productId);
    
    // En una aplicación real, aquí cargarías los datos del producto
    // Por ahora, simplemente abrimos el modal de producto
    openModal('productModal');
    
    showNotification('Cargando detalles del producto...', 'info');
}

/**
 * Procesar el checkout
 */
function processCheckout() {
    // Validar formulario
    const form = document.getElementById('checkoutForm');
    if (form && !form.checkValidity()) {
        showNotification('Por favor, completa todos los campos requeridos', 'error');
        return;
    }
    
    // Simular procesamiento
    showNotification('Procesando tu compra...', 'info');
    
    setTimeout(() => {
        // Limpiar carrito
        cart.items = [];
        updateCartCount();
        
        // Cerrar modal
        closeModal('checkoutModal');
        
        // Mostrar confirmación
        showNotification('¡Compra realizada con éxito! Recibirás un email de confirmación.', 'success');
        
        console.log('Checkout completed successfully');
    }, 2000);
}

/**
 * Seleccionar método de pago en el checkout
 * @param {HTMLElement} paymentElement - Elemento de pago seleccionado
 */
function selectPayment(paymentElement) {
    // Remover selección anterior
    const allPayments = document.querySelectorAll('label[onclick*="selectPayment"]');
    allPayments.forEach(label => {
        label.style.borderColor = '#e1e8ed';
        label.style.background = 'white';
    });
    
    // Aplicar selección actual
    paymentElement.style.borderColor = '#3498db';
    paymentElement.style.background = '#f8f9fa';
    
    const paymentType = paymentElement.querySelector('input[name="payment"]').value;
    console.log('Payment method selected:', paymentType);
}

// ========================================
// SISTEMA DE NOTIFICACIONES
// ========================================

/**
 * Mostrar notificación al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, info, warning)
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Estilos CSS en línea para la notificación
    const colors = {
        success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
        error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' },
        warning: { bg: '#fff3cd', border: '#ffeaa7', text: '#856404' },
        info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' }
    };
    
    const color = colors[type] || colors.info;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color.bg};
        border: 1px solid ${color.border};
        color: ${color.text};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        max-width: 400px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Agregar icono según el tipo
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `${icons[type]} ${message}`;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 4 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 4000);
    
    console.log(`Notification shown: ${type} - ${message}`);
}

// ========================================
// FUNCIONES DE UTILIDAD Y ACCESIBILIDAD
// ========================================

/**
 * Manejar navegación con teclado
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Cerrar modales con Escape
        if (e.key === 'Escape') {
            const openModals = document.querySelectorAll('.modal-overlay[style*="flex"]');
            openModals.forEach(modal => {
                closeModal(modal.id);
            });
            
            // Cerrar sidebar si está abierto
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('sidebar-open')) {
                toggleSidebar();
            }
        }
        
        // Activar toggles con Enter o Espacio
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('toggle-switch')) {
            e.preventDefault();
            toggleSwitch(e.target);
        }
        
        // Activar collapse con Enter o Espacio
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('collapse-header')) {
            e.preventDefault();
            const collapseId = e.target.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            if (collapseId) {
                toggleCollapse(collapseId);
            }
        }
    });
}

/**
 * Agregar animaciones CSS para notificaciones
 */
function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ========================================

/**
 * Inicializar todos los componentes cuando el DOM esté listo
 */
function initializeApp() {
    console.log('🚀 TechStore App initialized');
    
    // Cargar configuraciones del usuario
    loadUserSettings();
    
    // Configurar navegación con teclado
    setupKeyboardNavigation();
    
    // Configurar cierre de modales al hacer clic fuera
    setupModalClickOutside();
    
    // Agregar estilos para notificaciones
    addNotificationStyles();
    
    // Actualizar contador del carrito
    updateCartCount();
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        showNotification('¡Bienvenido a TechStore! 🛒', 'success');
    }, 500);
    
    console.log('✅ All components initialized successfully');
}

// ========================================
// EVENT LISTENERS Y INICIALIZACIÓN
// ========================================

// Inicializar cuando el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // El DOM ya está cargado
    initializeApp();
}

// Manejar redimensionamiento de ventana para el sidebar responsivo
window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth > 768) {
        // En pantallas grandes, remover clases móviles
        sidebar.classList.remove('sidebar-open');
        sidebar.style.transform = '';
        removeOverlay();
        
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.innerHTML = '☰ Menú';
        }
    }
});

// Exportar funciones principales para uso global
window.TechStore = {
    toggleSidebar,
    toggleCollapse,
    openModal,
    closeModal,
    toggleSwitch,
    addToCart,
    updateQuantity,
    viewProduct,
    processCheckout,
    selectPayment,
    showNotification
};

console.log('📦 TechStore JavaScript module loaded successfully');
