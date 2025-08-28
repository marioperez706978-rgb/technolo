<?php

header('Content-Type: application/json');
require_once 'conexion.php';


$input = json_decode(file_get_contents('php://input'), true);
$ci = isset($input['ci']) ? $input['ci'] : '';

if (!$ci) {
    echo json_encode(['success' => false, 'message' => 'CI no recibido']);
    exit;
}

$logFile = __DIR__ . '/eliminar_usuario_error.log';
file_put_contents($logFile, date('Y-m-d H:i:s') . " - CI recibido: $ci\n", FILE_APPEND);

try {
    
    $stmt = $conn->prepare('SELECT id, ci FROM usuarios WHERE ci = ?');
    $stmt->bind_param('s', $ci);
    $stmt->execute();
    $result = $stmt->get_result();
    $usuario = $result->fetch_assoc();
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - Resultado búsqueda usuario: " . json_encode($usuario) . "\n", FILE_APPEND);

    if (!$usuario) {
        file_put_contents($logFile, date('Y-m-d H:i:s') . " - Usuario no encontrado para CI: $ci\n", FILE_APPEND);
        echo json_encode(['success' => false, 'message' => 'No se encontró el usuario.']);
        exit;
    }
    $id_usuario = $usuario['id'];
    $ci_encontrado = $usuario['ci'];
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - Usuario encontrado: id=$id_usuario, ci=$ci_encontrado\n", FILE_APPEND);

   
    $stmt2 = $conn->prepare('DELETE FROM usuarios WHERE id = ?');
    $stmt2->bind_param('i', $id_usuario);
    $stmt2->execute();
    $usuariosEliminados = $stmt2->affected_rows;
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - Usuarios eliminados: $usuariosEliminados para id: $id_usuario\n", FILE_APPEND);

    if ($usuariosEliminados > 0) {
        echo json_encode(['success' => true]);
    } else {
        file_put_contents($logFile, date('Y-m-d H:i:s') . " - No se pudo eliminar el usuario id: $id_usuario\n", FILE_APPEND);
        echo json_encode(['success' => false, 'message' => 'No se pudo eliminar el usuario.']);
    }
    $stmt->close();
    $stmt2->close();
} catch (Exception $e) {
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - Error: " . $e->getMessage() . "\n", FILE_APPEND);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
