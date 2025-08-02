// Script para darle dinamismo al menú hamburgesa del Navbar

document.addEventListener("DOMContentLoaded", () => {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.getElementById("navbarNav");
  const navLinks = document.querySelectorAll(".nav-link");

  // Cerrar el menú al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarToggler.offsetParent !== null) {
        navbarToggler.click();
      }
    });
  });

  // Mostrar animación o cambio de ícono
  navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("active");
  });
});
