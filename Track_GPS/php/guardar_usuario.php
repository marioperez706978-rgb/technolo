
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
require_once __DIR__ . '/conexion.php';
if (!isset($conn) || !$conn || $conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Error de conexión a la base de datos.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = htmlspecialchars(trim($_POST['nombre'] ?? ''));
    $apellido = htmlspecialchars(trim($_POST['apellido'] ?? ''));
    $correo = filter_var(trim($_POST['correo_electronico'] ?? ''), FILTER_SANITIZE_EMAIL);
    $telefono = filter_var(trim($_POST['telefono'] ?? ''), FILTER_SANITIZE_NUMBER_INT);
    $departamento = htmlspecialchars(trim($_POST['departamento'] ?? ''));
    $direccion = htmlspecialchars(trim($_POST['direccion'] ?? ''));
    $nacionalidad = htmlspecialchars(trim($_POST['nacionalidad'] ?? ''));
    $ci = htmlspecialchars(trim($_POST['ci'] ?? ''));
    $contrasena = trim($_POST['contrasena_hash'] ?? '');
    $nombre_usuario = htmlspecialchars(trim($_POST['nombre_usuario'] ?? ''));
   


    if ($nombre === '' || $apellido === '' || $telefono === '' || $nombre_usuario === '' || $contrasena === '') {
        echo json_encode(['success' => false, 'message' => 'Faltan datos obligatorios']);
        exit;
    }
    // Validar correo solo si se proporciona
    if ($correo !== '' && !filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Correo electrónico no válido']);
        exit;
    }
    // Validar teléfono (ejemplo: mínimo 7 dígitos)
    if (strlen($telefono) < 7) {
        echo json_encode(['success' => false, 'message' => 'Teléfono no válido']);
        exit;
    }

    // Verificar CI duplicado en usuarios
    $stmt = $conn->prepare('SELECT ci FROM usuarios WHERE ci = ?');
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Error en prepare: ' . $conn->error]);
        $conn->close();
        exit;
    }
    $stmt->bind_param('s', $ci);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'CI ya registrado, revise bien sus datos o use otro']);
        $stmt->close();
        $conn->close();
        exit;
    }
    $stmt->close();
    // Verificar CI duplicado en usuariosp
    $stmt = $conn->prepare('SELECT ci FROM usuariosp WHERE ci = ?');
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Error en prepare: ' . $conn->error]);
        $conn->close();
        exit;
    }
    $stmt->bind_param('s', $ci);
    $stmt->execute();
    $stmt->store_result();
    if ($stmt->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'CI ya registrado, revise bien sus datos o use otro']);
        $stmt->close();
        $conn->close();
        exit;
    }
    $stmt->close();

    $contrasena_hash = password_hash($contrasena, PASSWORD_DEFAULT);
    $stmt = $conn->prepare('INSERT INTO usuariosp (nombre, apellido, correo_electronico, telefono, departamento, direccion, nacionalidad, ci, contrasena_hash, nombre_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Error en prepare: ' . $conn->error]);
        $conn->close();
        exit;
    }
    $stmt->bind_param('ssssssssss', $nombre, $apellido, $correo, $telefono, $departamento, $direccion, $nacionalidad, $ci, $contrasena_hash, $nombre_usuario);
    $ok = $stmt->execute();
    if ($ok) {
        echo json_encode(['success' => true, 'message' => 'Usuario registrado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al guardar: ' . $stmt->error]);
    }
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
}
