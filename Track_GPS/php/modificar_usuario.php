<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

set_exception_handler(function($e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error del servidor: ' . $e->getMessage()]);
    exit;
});

require_once __DIR__ . '/conexion.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data || !isset($data['ci'])) {
        echo json_encode(['success' => false, 'message' => 'Datos insuficientes.']);
        exit;
    }

    $ci_original = isset($data['ci_original']) ? $data['ci_original'] : $data['ci'];

    // Actualizar la contraseña (contrasena_hash) con el hash del valor ingresado
    $contrasena = isset($data['contrasena_hash']) ? $data['contrasena_hash'] : $data['ci'];
    $nuevo_hash = password_hash($contrasena, PASSWORD_DEFAULT);
    $sql = "UPDATE usuarios SET nombre=?, apellido=?, telefono=?, correo_electronico=?, departamento=?, direccion=?, nacionalidad=?, nombre_usuario=?, ci=?, contrasena_hash=? WHERE ci=?";
    $sql = "UPDATE usuarios SET nombre=?, apellido=?, telefono=?, correo_electronico=?, departamento=?, direccion=?, nacionalidad=?, nombre_usuario=?, ci=?, contrasena_hash=?, activo=? WHERE ci=?";
    $stmt = $conn->prepare($sql);
    $nombre = $data['nombre'];
    $apellido = $data['apellido'];
    $telefono = $data['telefono'];
    $correo_electronico = $data['correo_electronico'];
    $departamento = $data['departamento'];
    $direccion = $data['direccion'];
    $nacionalidad = $data['nacionalidad'];
    $nombre_usuario = $data['nombre_usuario'];
    $ci = $data['ci'];
    $activo = intval($data['activo']);
    $contrasena_hash = $nuevo_hash;
    $ci_original_var = $ci_original;
    $stmt->bind_param('ssssssssssis',
        $nombre,
        $apellido,
        $telefono,
        $correo_electronico,
        $departamento,
        $direccion,
        $nacionalidad,
        $nombre_usuario,
        $ci,
        $contrasena_hash,
        $activo,
        $ci_original_var
    );
    $ok1 = $stmt->execute();
    $stmt->close();

    $ok2 = true;
    // Modificar vehículos
    if (!empty($data['vehiculos']) && is_array($data['vehiculos'])) {
        foreach ($data['vehiculos'] as $veh) {
            if (!empty($veh['id'])) {
                $sqlv = "UPDATE vehiculos SET tipoV=?, marcaV=?, anioV=?, placa=? WHERE id=?";
                $stmtv = $conn->prepare($sqlv);
                $stmtv->bind_param('ssisi',
                    $veh['tipoV'],
                    $veh['marcaV'],
                    $veh['anioV'],
                    $veh['placa'],
                    $veh['id']
                );
                $ok2 = $ok2 && $stmtv->execute();
                $stmtv->close();
            }
        }
    }
    // Eliminar vehículos
    $ok3 = true;
    if (!empty($data['vehiculos_eliminar']) && is_array($data['vehiculos_eliminar'])) {
        foreach ($data['vehiculos_eliminar'] as $idVeh) {
            $sqlDel = "DELETE FROM vehiculos WHERE id=?";
            $stmtDel = $conn->prepare($sqlDel);
            $stmtDel->bind_param('i', $idVeh);
            $ok3 = $ok3 && $stmtDel->execute();
            $stmtDel->close();
        }
    }
    $conn->close();
    echo json_encode(['success' => $ok1 && $ok2 && $ok3]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error del servidor: ' . $e->getMessage()]);
}
