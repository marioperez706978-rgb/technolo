<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = isset($_POST['nombreFederacion']) ? trim($_POST['nombreFederacion']) : '';
    if ($nombre === '') {
        echo json_encode(['success' => false, 'message' => 'Nombre vacío']);
        exit;
    }

   
    $conn = new mysqli('localhost', 'root', '', 'technology');
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $conn->connect_error]);
        exit;
    }

    $stmt = $conn->prepare('INSERT INTO federaciones (nombrefe) VALUES (?)');
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Error en prepare: ' . $conn->error]);
        $conn->close();
        exit;
    }
    $stmt->bind_param('s', $nombre);
    $ok = $stmt->execute();
    if ($ok) {
        echo json_encode(['success' => true, 'message' => 'Federación guardada']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al guardar: ' . $stmt->error]);
    }
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
