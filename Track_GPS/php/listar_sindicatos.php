<?php
header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';

$id_federacion = isset($_GET['id_federacion']) ? intval($_GET['id_federacion']) : 0;
if ($id_federacion === 0) {
    echo json_encode(['success' => false, 'message' => 'ID de federación no válido', 'sindicatos' => []]);
    exit;
}

$stmt = $conn->prepare('SELECT id, nombresi FROM sindicatos WHERE id_federaciones = ?');
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error en prepare: ' . $conn->error, 'sindicatos' => []]);
    $conn->close();
    exit;
}
$stmt->bind_param('i', $id_federacion);
$stmt->execute();
$result = $stmt->get_result();
$sindicatos = [];
while ($row = $result->fetch_assoc()) {
    $sindicatos[] = [
        'id' => $row['id'],
        'nombre' => $row['nombresi']
    ];
}
$stmt->close();
$conn->close();
echo json_encode(['success' => true, 'sindicatos' => $sindicatos]);
