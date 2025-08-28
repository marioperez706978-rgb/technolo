<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'message' => 'No autenticado']);
    exit;
}
$id_usuario = $_SESSION['id'];

// Obtener datos del usuario
$sql_usuario = "SELECT * FROM usuarios WHERE id = ?";
$stmt = $conn->prepare($sql_usuario);
$stmt->bind_param('i', $id_usuario);
$stmt->execute();
$res = $stmt->get_result();
$usuario = $res->fetch_assoc();
$stmt->close();

// Obtener vehículos del usuario
$sql_vehiculos = "SELECT v.tipoV, v.marcaV, v.anioV, v.placa, v.clasevehiculo, f.nombrefe AS federacion, s.nombresi AS sindicato FROM vehiculos v LEFT JOIN federaciones f ON v.id_federaciones = f.id LEFT JOIN sindicatos s ON v.id_sindicatos = s.id WHERE v.id_usuarios = ? ORDER BY v.placa ASC";
$stmt2 = $conn->prepare($sql_vehiculos);
$stmt2->bind_param('i', $id_usuario);
$stmt2->execute();
$res2 = $stmt2->get_result();
$vehiculos = [];
while ($row = $res2->fetch_assoc()) {
    $vehiculos[] = $row;
}
$stmt2->close();
$conn->close();
echo json_encode(['success' => true, 'usuario' => $usuario, 'vehiculos' => $vehiculos]);
