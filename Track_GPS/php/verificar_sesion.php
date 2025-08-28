<?php
// Desactivar errores en producción
ini_set('display_errors', 0);
ini_set('display_startup_errors', 0);
error_reporting(0);
// Cookies seguras para la sesión
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1); // Solo si usas HTTPS
session_start();
header('Content-Type: application/json');
$respuesta = ['autenticado' => false];

// Función para log privado de errores
function log_error($mensaje) {
    error_log(date('[Y-m-d H:i:s] ') . $mensaje . PHP_EOL, 3, __DIR__ . '/errores_privados.log');
}
// Expiración de sesión por inactividad (ejemplo: 30 minutos)
$expiracion = 1800; // 1800 segundos = 30 minutos
if (isset($_SESSION['id']) && isset($_SESSION['last_activity'])) {
    if (time() - $_SESSION['last_activity'] > $expiracion) {
        session_unset();
        session_destroy();
        $respuesta['autenticado'] = false;
    } else {
        $_SESSION['last_activity'] = time(); // Actualiza tiempo de actividad
        $respuesta['autenticado'] = true;
        if (isset($_SESSION['rol_id'])) {
            $respuesta['redirect'] = ($_SESSION['rol_id'] == 1) ? 'paginas/listau.html' : 'paginas/usu.php';
        } else {
            $respuesta['redirect'] = 'paginas/usu.php';
        }
    }
}
echo json_encode($respuesta);
