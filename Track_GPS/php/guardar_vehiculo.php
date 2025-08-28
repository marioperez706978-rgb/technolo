<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

set_exception_handler(function($e) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Excepción: ' . $e->getMessage()]);
    exit;
});
set_error_handler(function($errno, $errstr, $errfile, $errline) {
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => "Error: $errstr en $errfile:$errline"]);
    exit;
});

header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';
$csrf_token = $_POST['csrf_token'] ?? '';
session_start();
// Control de acceso: solo usuarios autenticados pueden registrar vehículos
if (!isset($_SESSION['id'])) {
    echo json_encode(['success' => false, 'message' => 'Acceso denegado: usuario no autenticado.']);
    exit;
}
error_log('CSRF recibido: ' . $csrf_token);
error_log('CSRF sesión: ' . ($_SESSION['csrf_token'] ?? 'no existe'));
if (!isset($_SESSION['csrf_token']) || $csrf_token !== $_SESSION['csrf_token']) {
    echo json_encode(['success' => false, 'message' => 'Token CSRF inválido.']);
    exit;
}



$tipo = strtoupper(trim(htmlspecialchars($_POST['tipoV'] ?? '')));
$anio = filter_var($_POST['anioV'] ?? '', FILTER_VALIDATE_INT);
$marca = strtoupper(trim(htmlspecialchars($_POST['marcaV'] ?? '')));
$placa = strtoupper(trim(htmlspecialchars($_POST['placa'] ?? '')));
$federacion = filter_var($_POST['id_federaciones'] ?? null, FILTER_VALIDATE_INT, ["options" => ["default" => null]]);
$sindicato = filter_var($_POST['id_sindicatos'] ?? null, FILTER_VALIDATE_INT, ["options" => ["default" => null]]);
$id_usuario = filter_var($_POST['id_usuarios'] ?? '', FILTER_VALIDATE_INT);
$clasevehiculo = strtoupper(trim(htmlspecialchars($_POST['tipoServicioSeleccionado'] ?? '')));

// Validar formato de placa (ejemplo: 3-4 dígitos + 3 letras)
if (!preg_match('/^(\d{3,4}[A-Z]{3})$/', $placa)) {
    echo json_encode(['success' => false, 'message' => 'Formato de placa inválido']);
    exit;
}

// Validar campos obligatorios
// Validar placa duplicada
$stmtPlaca = $conn->prepare('SELECT id FROM vehiculos WHERE placa = ?');
$stmtPlaca->bind_param('s', $placa);
$stmtPlaca->execute();
$stmtPlaca->store_result();
if ($stmtPlaca->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Placa ya en uso. Por favor, revise e intente de nuevo.']);
    $stmtPlaca->close();
    $conn->close();
    exit;
}
$stmtPlaca->close();
if (!$tipo || !$anio || !$marca || !$placa || !$id_usuario || !$clasevehiculo) {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    exit;
}

// Si tipo es PÚBLICO, federación y sindicato son obligatorios
if (strtoupper($tipo) === 'PUBLICO' && (!$federacion || !$sindicato)) {
    echo json_encode(['success' => false, 'message' => 'Federación y sindicato son obligatorios para vehículos públicos']);
    exit;
}

// Convertir campos numéricos o null
$anio = (int)$anio;
$id_usuario = (int)$id_usuario;
$federacion = ($federacion === '' || is_null($federacion) || strtoupper($tipo) === 'PARTICULAR') ? null : (int)$federacion;
$sindicato = ($sindicato === '' || is_null($sindicato) || strtoupper($tipo) === 'PARTICULAR') ? null : (int)$sindicato;

// Preparar sentencia SQL y parámetros dinámicamente según si federacion/sindicato son null
if (is_null($federacion) && is_null($sindicato)) {
    $sql = 'INSERT INTO vehiculos (tipoV, anioV, marcaV, placa, clasevehiculo, id_federaciones, id_sindicatos, id_usuarios) VALUES (?, ?, ?, ?, ?, NULL, NULL, ?)';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sisssi', $tipo, $anio, $marca, $placa, $clasevehiculo, $id_usuario);
} elseif (is_null($federacion)) {
    $sql = 'INSERT INTO vehiculos (tipoV, anioV, marcaV, placa, clasevehiculo, id_federaciones, id_sindicatos, id_usuarios) VALUES (?, ?, ?, ?, ?, NULL, ?, ?)';

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sisssii', $tipo, $anio, $marca, $placa, $clasevehiculo, $sindicato, $id_usuario);
} elseif (is_null($sindicato)) {
    $sql = 'INSERT INTO vehiculos (tipoV, anioV, marcaV, placa, clasevehiculo, id_federaciones, id_sindicatos, id_usuarios) VALUES (?, ?, ?, ?, ?, ?, NULL, ?)';

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sisssii', $tipo, $anio, $marca, $placa, $clasevehiculo, $federacion, $id_usuario);
} else {
    $sql = 'INSERT INTO vehiculos (tipoV, anioV, marcaV, placa, clasevehiculo, id_federaciones, id_sindicatos, id_usuarios) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sisssiii', $tipo, $anio, $marca, $placa, $clasevehiculo, $federacion, $sindicato, $id_usuario);
}

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Error en prepare: ' . $conn->error, 'sql' => $sql]);
    $conn->close();
    exit;
}

$ok = $stmt->execute();

if ($ok) {
    echo json_encode(['success' => true, 'message' => 'Vehículo registrado correctamente']);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error al registrar: ' . $stmt->error,
        'sql' => $sql,
        'params' => [
            'tipo' => $tipo,
            'anio' => $anio,
            'marca' => $marca,
            'placa' => $placa,
            'federacion' => $federacion,
            'sindicato' => $sindicato,
            'id_usuario' => $id_usuario
        ]
    ]);
}

$stmt->close();
$conn->close();