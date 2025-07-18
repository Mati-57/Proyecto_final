<?php
require_once __DIR__ . "/../config/conexion.php";

// Clase para estructurar las respuestas del modelo
class Respuesta
{
    public $success;
    public $message;
    public $insert_id;
    public $error;

    public function __construct($success, $message, $extra = null)
    {
        $this->success = $success;
        $this->message = $message;
        if ($success) {
            $this->insert_id = $extra;
        } else {
            $this->error = $extra;
        }
    }
}

// Definición de la clase Usuario que interactuará con la tabla 'usuario' en la base de datos
class Usuario
{
    private $conn; // Propiedad privada para almacenar la conexión mysqli

    // El constructor recibe el objeto $conn (conexión a la base de datos) y lo asigna a la propiedad $this->conn
    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    // Método para agregar un nuevo usuario
    public function agregar($nombre, $apellido, $nombre_usuario, $tipo, $contraseña)
    {
        $hash = password_hash($contraseña, PASSWORD_DEFAULT); //Encriptamos la contraseña

        $stmt = $this->conn->prepare("INSERT INTO usuario (nombre, apellido_usuario, nombre_usuario, tipo, password) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param('sssss', $nombre, $apellido, $nombre_usuario, $tipo, $hash);

        if ($stmt->execute()) {
            return new Respuesta(true, "Usuario agregado", $stmt->insert_id);
        } else {
            return new Respuesta(false, "Error al agregar el usuario", $stmt->error);
        }
    }

    // Método para login de usuario
    public function login($nombre_usuario, $password)
    {
        $sql = "SELECT * FROM usuario WHERE nombre_usuario = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param('s', $nombre_usuario);
        $stmt->execute();
        $respuesta = $stmt->get_result();
        $resultado = $respuesta->fetch_assoc();

        if ($resultado) {
            if (password_verify($password, $resultado['password'])) {
                error_log("[LOGIN DEBUG] password_verify: OK");
                return $resultado; // Devuelve los datos del usuario autenticado
            } else {
                error_log("[LOGIN DEBUG] password_verify: FAIL");
            }
        }
        return null; // Usuario no encontrado o contraseña incorrecta
    }
}
