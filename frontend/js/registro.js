const API_URL = "http://localhost/Proyecto_final/backend/api/api_usuarios.php";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('registerForm').addEventListener('submit', enviarRegistro);
});

function enviarRegistro(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!nombre || !apellido || !email || !password) {
        alert("Completa todos los campos por favor");
        return;
    }

    registrarUsuario(nombre, apellido, email, password);
}

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
            if (data.success) {
                alert(data.message + (data.insert_id ? `\nID usuario: ${data.insert_id}` : ''));
                document.getElementById('registerForm').reset();
            } else if (data.error) {
                alert("Error: " + data.message + (data.error ? `\nDetalle: ${data.error}` : ''));
            } else {
                console.log("Respuesta inesperada:", data);
            }
        })
        .catch(err => {
            console.error("Error en la solicitud:", err);
            alert("Error de conexión o servidor.");
        });
}
