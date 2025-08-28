
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = isset($data['id']) ? intval($data['id']) : 0;
if ($id <= 0) {
    echo json_encode(['success' => false, 'message' => 'ID inválido']);
    exit;
}

if (!isset($conn) || !$conn || $conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos.']);
    exit;
}

$stmt = $conn->prepare('DELETE FROM sindicatos WHERE id = ?');
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error en prepare: ' . $conn->error]);
    $conn->close();
    exit;
}
$stmt->bind_param('i', $id);
$ok = $stmt->execute();
if (!$ok) {
    echo json_encode(['success' => false, 'message' => 'Error al eliminar: ' . $stmt->error]);
    $stmt->close();
    $conn->close();
    exit;
}
$stmt->close();
$conn->close();
echo json_encode(['success' => true]);
