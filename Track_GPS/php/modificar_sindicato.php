<?php
require_once 'conexion.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? '';
$nombre = $data['nombre'] ?? '';
if ($id && $nombre) {
    $stmt = $conn->prepare("UPDATE sindicatos SET nombresi = ? WHERE id = ?");
    $stmt->bind_param('si', $nombre, $id);
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
}
$conn->close();
?>
