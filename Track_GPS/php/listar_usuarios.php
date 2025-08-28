<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';


$sql = "SELECT nombre, apellido, correo_electronico, telefono, departamento, direccion, nacionalidad, ci, contrasena_hash, nombre_usuario FROM usuariosp";
$usuarios = [];
$res = $conn->query($sql);
if ($res) {
    while ($row = $res->fetch_assoc()) {
        $usuarios[] = [
            'nombre' => $row['nombre'],
            'apellido' => $row['apellido'],
            'correo_electronico' => $row['correo_electronico'],
            'telefono' => $row['telefono'],
            'departamento' => $row['departamento'],
            'direccion' => $row['direccion'],
            'nacionalidad' => $row['nacionalidad'],
            'ci' => $row['ci'],
            'contrasena_hash' => $row['contrasena_hash'],
            'nombre_usuario' => $row['nombre_usuario']
        ];
    }
    $conn->close();
    echo json_encode(['success' => true, 'usuarios' => $usuarios]);
} else {
    $error = $conn->error;
    $conn->close();
    echo json_encode(['success' => false, 'message' => 'Error en la consulta SQL', 'error' => $error]);
}
