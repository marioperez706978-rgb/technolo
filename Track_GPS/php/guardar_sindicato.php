<?php
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = isset($_POST['nombreSindicato']) ? trim($_POST['nombreSindicato']) : '';
    $federacion = isset($_POST['federacionSelect']) ? intval($_POST['federacionSelect']) : 0;
    if ($nombre === '' || $federacion === 0) {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
        exit;
    }
    require_once __DIR__ . '/conexion.php';
    if (!$conn || $conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . ($conn ? $conn->connect_error : 'No se pudo cargar la conexión')]);
        exit;
    }
    $stmt = $conn->prepare('INSERT INTO sindicatos (nombresi, id_federaciones) VALUES (?, ?)');
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Error en prepare: ' . $conn->error]);
        $conn->close();
        exit;
    }
    $stmt->bind_param('si', $nombre, $federacion);
    $ok = $stmt->execute();
    if ($ok) {
        echo json_encode(['success' => true, 'message' => 'Sindicato guardado']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al guardar: ' . $stmt->error]);
    }
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
