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

$stmt = $conn->prepare('DELETE FROM federaciones WHERE id = ?');
$stmt->bind_param('i', $id);
$ok = $stmt->execute();
$stmt->close();
$conn->close();
echo json_encode(['success' => $ok]);
