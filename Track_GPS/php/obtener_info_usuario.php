<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';

$data = json_decode(file_get_contents('php://input'), true);
$ci = $data['ci'] ?? '';
if ($ci === '') {
    echo json_encode(['success' => false, 'message' => 'CI no proporcionado']);
    exit;
}

$sql = "SELECT * FROM usuarios WHERE ci = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $ci);
$stmt->execute();
$res = $stmt->get_result();
$usuario = $res->fetch_assoc();
$stmt->close();


$vehiculos = [];
if ($usuario && isset($usuario['id'])) {
    $sqlv = "SELECT v.*, f.nombrefe AS federacion, s.nombresi AS sindicato FROM vehiculos v
             LEFT JOIN federaciones f ON v.id_federaciones = f.id
             LEFT JOIN sindicatos s ON v.id_sindicatos = s.id
             WHERE v.id_usuarios = ?";
    $stmtv = $conn->prepare($sqlv);
    $stmtv->bind_param('i', $usuario['id']);
    $stmtv->execute();
    $resv = $stmtv->get_result();
    while ($row = $resv->fetch_assoc()) {
        $vehiculos[] = $row;
    }
    $stmtv->close();
}
$conn->close();
if ($usuario) {
    echo json_encode(['success' => true, 'usuario' => $usuario, 'vehiculos' => $vehiculos]);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
}
