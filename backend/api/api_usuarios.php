<?php

require __DIR__ . "/../logs/log.php"; // Importar el archivo de configuración de registro de errores

// Habilitar CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Manejar preflight OPTIONS
if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    http_response_code(200);
    exit();
}

require __DIR__ . "/../controlador/usuarios.php"; // Importar el controlador

// Obtener el método de la solicitud HTTP (GET, POST, PUT, DELETE)
$requestMethod = $_SERVER["REQUEST_METHOD"];

if ($requestMethod == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    // Registro de usuario
    if (
        isset($data['nombre_usuario']) && isset($data['apellido_usuario']) && isset($data['email']) &&
        isset($data['tipo']) && isset($data['password'])
    ) {
        registrarUsuario($data['nombre_usuario'], $data['apellido_usuario'], $data['email'], $data['tipo'], $data['password']);
    }
    // Login de usuario
    elseif (isset($data['nombre_usuario']) && isset($data['password'])) {
        loginUsuario($data['nombre_usuario'], $data['password']);
    } else {
        echo json_encode(["error" => "Datos insuficientes"]);
    }
}
