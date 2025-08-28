<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
$usuario = $data['usuario'] ?? '';
$contrasena = $data['contrasena'] ?? '';

if ($usuario === '' || $contrasena === '') {
    echo json_encode(['success' => false, 'message' => 'Usuario y contraseña requeridos']);
    exit;
}



// Permitir múltiples usuarios con el mismo nombre_usuario
$sql = "SELECT * FROM usuarios WHERE nombre_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $usuario);
$stmt->execute();
$res = $stmt->get_result();
$usuario_encontrado = null;
while ($row = $res->fetch_assoc()) {
    if (password_verify($contrasena, $row['contrasena_hash'])) {
        $usuario_encontrado = $row;
        break;
    }
}
$stmt->close();

if ($usuario_encontrado) {
    if (isset($usuario_encontrado['activo']) && $usuario_encontrado['activo'] == 0) {
        echo json_encode(['success' => false, 'message' => 'Usuario inhabilitado. Comuníquese con soporte técnico']);
        $conn->close();
        exit;
    }
    // Regenerar el ID de sesión para evitar secuestro
    session_regenerate_id(true);
    // Guardar el id real y el rol del usuario en la sesión
    $_SESSION['id'] = $usuario_encontrado['id'];
    $_SESSION['rol_id'] = $usuario_encontrado['rol_id'];
    // Guardar el tiempo de última actividad
    $_SESSION['last_activity'] = time();
    $rol_id = (int)$usuario_encontrado['rol_id'];
    $redirect = ($rol_id === 1) ? 'paginas/listau.html' : 'paginas/usu.php';
    unset($usuario_encontrado['contrasena_hash']);
    echo json_encode(['success' => true, 'redirect' => $redirect, 'usuario' => $usuario_encontrado]);
} else {
    echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
}
$conn->close();
