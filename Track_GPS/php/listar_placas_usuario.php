<?php
session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';

if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'message' => 'No autenticado']);
    exit;
}
$id_usuario = $_SESSION['id'];

$sql = "SELECT v.tipoV, v.marcaV, v.anioV, v.placa, v.clasevehiculo, f.nombrefe AS federacion, s.nombresi AS sindicato
FROM vehiculos v
LEFT JOIN federaciones f ON v.id_federaciones = f.id
LEFT JOIN sindicatos s ON v.id_sindicatos = s.id
WHERE v.id_usuarios = ?
ORDER BY v.placa ASC";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id_usuario);
$stmt->execute();
$res = $stmt->get_result();
$vehiculos = [];
while ($row = $res->fetch_assoc()) {
    $vehiculos[] = [
        'tipoV' => $row['tipoV'],
        'marcaV' => $row['marcaV'],
        'anioV' => $row['anioV'],
        'placa' => $row['placa'],
        'clasevehiculo' => $row['clasevehiculo'],
        'federacion' => $row['federacion'],
        'sindicato' => $row['sindicato']
    ];
}
$stmt->close();
$conn->close();
echo json_encode(['success' => true, 'vehiculos' => $vehiculos]);
