<?php

header('Content-Type: application/json');

$conn = new mysqli('localhost', 'root', '', 'technology');
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $conn->connect_error]);
    exit;
}

$res = $conn->query('SELECT id, nombrefe FROM federaciones ORDER BY nombrefe ASC');
if (!$res) {
    echo json_encode(['success' => false, 'message' => 'Error en la consulta: ' . $conn->error]);
    $conn->close();
    exit;
}

$federaciones = [];
while ($row = $res->fetch_assoc()) {
    $federaciones[] = [
        'id' => $row['id'],
        'nombre' => $row['nombrefe']
    ];
}
$conn->close();
echo json_encode(['success' => true, 'federaciones' => $federaciones]);
