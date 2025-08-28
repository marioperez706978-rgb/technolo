<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';


$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No se recibieron datos.']);
    exit;
}


ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/aceptar_usuario_error.log');
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    error_log("[PHP ERROR] $errstr en $errfile:$errline");
    return false;
});
set_exception_handler(function($e) {
    error_log("[PHP EXCEPTION] " . $e->getMessage() . "\n" . $e->getTraceAsString());
    echo json_encode(['success' => false, 'message' => 'Excepción: ' . $e->getMessage()]);
    exit;
});


$usuario_fields = [
    'nombre', 'apellido', 'correo_electronico', 'telefono', 'departamento', 'direccion',
    'nacionalidad', 'ci', 'contrasena_hash', 'nombre_usuario'
];
$usuario_values = [];
foreach ($usuario_fields as $field) {
    $usuario_values[$field] = isset($data[$field]) ? $data[$field] : null;
}





$sql_usuario = "INSERT INTO usuarios (nombre, apellido, correo_electronico, telefono, departamento, direccion, nacionalidad, ci, contrasena_hash, nombre_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt_usuario = $conn->prepare($sql_usuario);
if (!$stmt_usuario) {
    echo json_encode(['success' => false, 'message' => 'Error al preparar usuario', 'error' => $conn->error]);
    exit;
}
$stmt_usuario->bind_param(
    'ssssssssss',
    $usuario_values['nombre'],
    $usuario_values['apellido'],
    $usuario_values['correo_electronico'],
    $usuario_values['telefono'],
    $usuario_values['departamento'],
    $usuario_values['direccion'],
    $usuario_values['nacionalidad'],
    $usuario_values['ci'],
    $usuario_values['contrasena_hash'],
    $usuario_values['nombre_usuario']
);
if (!$stmt_usuario->execute()) {
    echo json_encode(['success' => false, 'message' => 'Error al insertar usuario', 'error' => $stmt_usuario->error]);
    exit;
}
$id_usuario = $stmt_usuario->insert_id;
$stmt_usuario->close();




if (isset($data['ci'])) {
    $sql_del = "DELETE FROM usuariosp WHERE ci = ?";
    $stmt_del = $conn->prepare($sql_del);
    if ($stmt_del) {
        $stmt_del->bind_param('s', $data['ci']);
        $stmt_del->execute();
        $stmt_del->close();
    }
}

$conn->close();
echo json_encode(['success' => true, 'message' => 'Usuario aceptado y datos guardados.']);
