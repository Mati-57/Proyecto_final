const API_URL = "http://localhost/Proyecto_final/backend/api/api_usuarios.php"; // URL base del endpoint

// Ejecutar al cargar la página
window.onload = function () {
    const form = document.getElementById('registerForm');
    if (form) {
        form.addEventListener('submit', enviarRegistro); // Asignar función al evento submit
    }
};

// Función para manejar el envío del formulario de registro
function enviarRegistro(event) {
    event.preventDefault(); // Prevenir recarga de página

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validar campos vacíos
    if (!nombre || !apellido || !email || !password) {
        alert("Completa todos los campos por favor");
        return;
    }

    // Enviar datos al backend
    registrarUsuario(nombre, apellido, email, password);
}

// Función para registrar un nuevo usuario (POST)
function registrarUsuario(nombre, apellido, email, password) {
    const datos = {
        nombre_usuario: nombre,
        apellido_usuario: apellido,
        email: email,
        tipo: "cliente",
        password: password
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    })
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            // Respuesta exitosa
            if (data.success) {
                alert(data.message + (data.insert_id ? `\nID usuario: ${data.insert_id}` : ''));
                document.getElementById('registerForm').reset();
            }
            // Error en la respuesta
            else if (data.error) {
                alert("Error: " + data.message + (data.error ? `\nDetalle: ${data.error}` : ''));
            }
            // Caso no esperado
            else {
                console.log("Respuesta inesperada:", data);
            }
        })
        .catch(err => console.error("Error al buscar productos:", err));
}

document.getElementById('buscadorProductos').addEventListener('input', function () {
    const texto = this.value.trim();
    if (texto === "") {
        listarProductos();
    } else {
        buscarProductos(texto);
    }
});
