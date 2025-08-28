<?php

$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'technology';
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'message' => 'Error de conexión: ' . $conn->connect_error,
        'debug' => [
            'host' => $host,
            'user' => $user,
            'pass' => $pass,
            'db' => $db
        ]
    ]);
    exit;
}

