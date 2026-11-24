/**
 * ==========================================================================
 * js/main.js
 * Lógica global compartida en todas las páginas del portafolio:
 * 1. Menú móvil hamburguesa (abrir/cerrar y accesibilidad)
 * 2. Detección automática y asignación de clase 'active' al enlace actual
 * 3. Inserción dinámica del año en curso en el pie de página
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Menú Móvil Hamburguesa
  // -------------------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    // Alternar menú al hacer clic en el botón
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
    });

    // Cerrar el menú automáticamente al hacer clic en cualquier enlace
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Cerrar el menú si el usuario hace clic fuera de la barra de navegación
    document.addEventListener('click', (event) => {
      const isClickInside = menuToggle.contains(event.target) || navMenu.contains(event.target);
      if (!isClickInside && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 2. Detección del Enlace Activo (.nav-link.active)
  // -------------------------------------------------------------------------
  const currentPath = window.location.pathname;
  // Extraemos el nombre del archivo (ejemplo: 'about.html')
  let currentPage = currentPath.split('/').pop();

  // Si la ruta raíz está vacía o es '/', corresponde a 'index.html'
  if (!currentPage || currentPage === '') {
    currentPage = 'index.html';
  }

  const allNavLinks = document.querySelectorAll('.nav-menu .nav-link');
  allNavLinks.forEach((link) => {
    const linkHref = link.getAttribute('href');
    // Si el href coincide con el archivo actual, añadimos la clase 'active'
    if (linkHref === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // -------------------------------------------------------------------------
  // 3. Año Dinámico en el Footer
  // -------------------------------------------------------------------------
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
