<?php
include 'conexion.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$ci = $data['ci'] ?? null;

if (!$ci) {
    echo json_encode(['success' => false, 'message' => 'CI no proporcionado']);
    exit;
}

$sql = "DELETE FROM usuariosp WHERE ci = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $ci);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'No se pudo eliminar']);
}
$stmt->close();
$conn->close();
?>
