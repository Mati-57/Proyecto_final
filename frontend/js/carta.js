const API_URL = "../../backend/api/api_productos.php"; // URL base del endpoint para productos (API REST PHP)

window.onload = function () {
  listarProductosCarta();
};

let productos = []; // Variable array para almacenar los productos

// Obtener todos los productos (GET)
function listarProductosCarta() {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      productos = data;
      mostrarCartaPorCategoria(productos, "Carnes", "carnesContainer");
      mostrarCartaPorCategoria(productos, "Bebidas", "bebidasContainer");
      mostrarCartaPorCategoria(productos, "Pastas", "pastasContainer");
    })
    .catch((err) => console.error("Error al obtener productos:", err));
}

// Mostrar productos por categoría en su overlay
function mostrarCartaPorCategoria(productos, categoria, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  const filtrados = productos.filter(
    (p) => p.categoria.trim().toLowerCase() === categoria.toLowerCase()
  );
  if (filtrados.length === 0) {
    container.innerHTML = "<p>No hay productos en esta categoría.</p>";
    return;
  }
  let html = "";
  filtrados.forEach((p) => {
    html += `
      <div class="grid-item">
        <img src="" alt="${p.nombre}" />
        <h3>${p.nombre}</h3>
        <p class="descripcion">${p.descripcion}</p>
        <p class="precio">$${p.precio}</p>
      </div>
    `;
  });
  container.innerHTML = html;
}

// Mostrar overlay de la categoría seleccionada
function mostrarOverlay(categoria) {
  document.getElementById("carnes").style.display = "none";
  document.getElementById("bebidas").style.display = "none";
  document.getElementById("pastas").style.display = "none";
  document.getElementById(categoria).style.display = "block";
}

// Ocultar todos los overlays
function cerrarOverlay() {
  document.getElementById("carnes").style.display = "none";
  document.getElementById("bebidas").style.display = "none";
  document.getElementById("pastas").style.display = "none";
}