<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';


$data = json_decode(file_get_contents('php://input'), true);
if (!isset($data['ci'])) {
    echo json_encode(['success' => false, 'message' => 'CI no proporcionado.']);
    exit;
}
$ci = $data['ci'];


$sql = "SELECT * FROM usuariosp WHERE ci = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error al preparar consulta', 'error' => $conn->error]);
    exit;
}
$stmt->bind_param('s', $ci);
$stmt->execute();
$res = $stmt->get_result();
if ($row = $res->fetch_assoc()) {
    echo json_encode(['success' => true, 'usuario' => $row]);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
}
$stmt->close();
$conn->close();
