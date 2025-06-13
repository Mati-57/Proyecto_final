<?php   
// Conexión a la base de datos MySQL
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'el_palacio';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Mensaje de conexión exitosa
echo "Conexión exitosa a la base de datos: $dbname";
?>
    