<?php

require_once __DIR__ . '/../modelo/usuario.php';
require_once __DIR__ . '/../config/conexion.php';

$usuarioModel = new Usuario($conn);

// Función para agregar un usuario
function agregarUsuario($nombre, $apellido, $nombre_usuario, $tipo, $contraseña)
{
    global $usuarioModel;
    $resultado = $usuarioModel->agregar($nombre, $apellido, $nombre_usuario, $tipo, $contraseña);
    if ($resultado->success) {
        echo json_encode(["mensaje" => $resultado->message, "id" => $resultado->insert_id]);
    } else {
        echo json_encode(["error" => $resultado->message, "detalle" => $resultado->error]);
    }
}

// Función para login de usuario
function loginUsuario($nombre_usuario, $password)
{
    global $usuarioModel;
    $resultado = $usuarioModel->login($nombre_usuario, $password);
    if ($resultado) {
        echo json_encode(["success" => true, "usuario" => $resultado]);
    } else {
        echo json_encode(["success" => false, "error" => "Usuario o contraseña incorrectos"]);
    }
}
