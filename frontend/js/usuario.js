document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const usuario = document.getElementById("username").value;
    const contrasena = document.getElementById("password").value;
    const errorMsg = document.getElementById("errorMsg");

    if (usuario === "elpalacio" && contrasena === "palacio") {
      window.location.href = "../page/gestion.html";
    } else {
      errorMsg.textContent = "Usuario o contraseña incorrectos.";
    }
  });
