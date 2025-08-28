<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';

$sql = "SELECT u.nombre, u.apellido, u.ci, u.telefono, u.rol_id, u.nombre_usuario, u.activo, u.ci, v.placa FROM usuarios u LEFT JOIN vehiculos v ON v.id_usuarios = u.id";
$usuarios = [];
$res = $conn->query($sql);
if ($res) {
    while ($row = $res->fetch_assoc()) {
        $usuarios[] = [
            'nombre' => $row['nombre'],
            'apellido' => $row['apellido'],
            'ci' => $row['ci'],
            'telefono' => $row['telefono'],
            'rol_id' => $row['rol_id'],
            'nombre_usuario' => $row['nombre_usuario'],
            'contrasena_hash' => $row['ci'],
            'placa' => $row['placa'] ?? '',
            'activo' => isset($row['activo']) ? $row['activo'] : 1
        ];
    }
    $conn->close();
    echo json_encode(['success' => true, 'usuarios' => $usuarios]);
} else {
    $error = $conn->error;
    $conn->close();
    echo json_encode(['success' => false, 'message' => 'Error en la consulta SQL', 'error' => $error]);
}
