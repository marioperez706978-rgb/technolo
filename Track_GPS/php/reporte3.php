<?php
require("fpdf-1h/fpdf.php");
require("conexion.php");

$pdf = new FPDF('P','cm','letter');
$pdf->settitle("Reporte de Usuario Aceptado",true);
$pdf->setmargins(2.5,2,2.5);
$pdf->addpage();
$pdf->image("../assets/images/fon3.png", ($pdf->GetPageWidth()-12)/2, ($pdf->GetPageHeight()-12)/2, 12, 12, 'PNG');
$pdf->image("../assets/images/logo4.png",2.2,2,7,2,'png');

$pdf->setfont('arial','',12);
$pdf->setxy(15,2.5);
$pdf->cell(0,0.7,'Fecha: '.date('d/m/Y'),0,1,'R');
$pdf->setfont('arial','B',18);
$pdf->setxy(2.5,5.2);
$pdf->cell(16,1.2,'INFORMACION USUARIO',0,1,'C');
$ci = $_GET['ci'] ?? '';
if ($ci !== '') {
    
    $sql = "SELECT * FROM usuarios WHERE ci = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $ci);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result && $result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        $sqlv = "SELECT v.*, f.nombrefe AS federacion, s.nombresi AS sindicato FROM vehiculos v
                 LEFT JOIN federaciones f ON v.id_federaciones = f.id
                 LEFT JOIN sindicatos s ON v.id_sindicatos = s.id
                 WHERE v.id_usuarios = ?";
        $stmtv = $conn->prepare($sqlv);
        $stmtv->bind_param("i", $usuario['id']);
        $stmtv->execute();
        $resv = $stmtv->get_result();
        $vehiculos = [];
        while ($row = $resv->fetch_assoc()) {
            $vehiculos[] = $row;
        }
        $stmtv->close();        
        $pdf->setfont('arial','B',12);
        $pdf->setfillcolor(180,210,245);
        $pdf->setxy(3,7.2);
        $pdf->cell(17,0.8,'DATOS DE USUARIO',1,1,'C',true);
        $pdf->setfont('arial','',11);
        $pdf->setx(3);
        $pdf->cell(3,0.7,'id: '.utf8_decode($usuario['id']),1,0,'L');
        $pdf->cell(8,0.7,'Usuario: '.utf8_decode($usuario['nombre_usuario']),1,0,'L');
        $pdf->cell(6,0.7,'Nombre: '.utf8_decode($usuario['nombre']),1,1,'L');      
        $pdf->setx(3);
        $pdf->cell(6.8,0.7,'Apellido: '.utf8_decode($usuario['apellido']),1,0,'L');
        $pdf->cell(4.2,0.7,'CI: '.utf8_decode($usuario['ci']),1,0,'L');
        $pdf->cell(6,0.7,'Departamento: '.utf8_decode($usuario['departamento']),1,1,'L');
        $pdf->setx(3);
        $pdf->cell(5,0.7,'Nacionalidad: '.utf8_decode($usuario['nacionalidad']),1,0,'L');
        $pdf->Cell(4,0.7, utf8_decode('Teléfono: ' . $usuario['telefono']), 1, 0, 'L');
        $pdf->cell(8,0.7,'Correo: '.utf8_decode($usuario['correo_electronico']),1,1,'L');
        $pdf->setx(3);
        $pdf->cell(17,0.7,utf8_decode('Dirección: '.$usuario['direccion']),1,1,'L');      
        if (!empty($vehiculos)) {
            foreach ($vehiculos as $vehiculo) {
                $pdf->setfont('arial','B',12);
                $pdf->setx(3);
                $pdf->setfillcolor(180,210,245);
                $pdf->cell(17,0.8,'DATOS DE VEHICULO',1,1,'C',true);
                $pdf->setfont('arial','',11);
                $pdf->setx(3);
                $pdf->cell(5,0.7,'T. vehiculo: '.utf8_decode($vehiculo['tipoV']),1,0,'L');
                $pdf->cell(4.5,0.7,'M.vehiculo: '.utf8_decode($vehiculo['marcaV']),1,0,'L');
                $pdf->Cell(4, 0.7, utf8_decode('Año vehiculo: '.$vehiculo['anioV']), 1, 0, 'L');
                $pdf->cell(3.5,0.7,'Placa: '.utf8_decode($vehiculo['placa']),1,1,'L');
                $pdf->setx(3);
                $pdf->cell(5,0.7,'Servicio: '.utf8_decode($vehiculo['clasevehiculo']),1,1,'L');
                $pdf->setx(3);
                $texto = 'Federación';
                $pdf->cell(3,1,utf8_decode($texto),1,0,'L');
                $pdf->cell(14,1,utf8_decode($vehiculo['federacion']),1,1,'L');
                $pdf->setx(3);
                $pdf->cell(2,1,'Sindicato:',1,0,'L');
                $pdf->cell(15,1,utf8_decode($vehiculo['sindicato']),1,1,'L');
            }
        }
    } else {
    $pdf->setfont('arial','B',14);
    $pdf->setfillcolor(255, 220, 220);
    $pdf->settextcolor(200,0,0);
    $pdf->setxy(2.5, 8);
    $pdf->cell(16,1,"¡Atención!",0,1,'C',true);
    $pdf->setfont('arial','',12);
    $pdf->setfillcolor(255,255,255);
    $pdf->settextcolor(0,0,0);
    $pdf->setxy(2.5, 9);
    $pdf->cell(16,1,"No se encontró el usuario con Cédula: " . utf8_decode($ci),0,1,'C');
    }
} else {
    $pdf->setfont('arial','B',14);
    $pdf->setfillcolor(255, 220, 220);
    $pdf->settextcolor(200,0,0);
    $pdf->setxy(2.5, 8);
    $pdf->cell(16,1,"¡Atención!",0,1,'C',true);
    $pdf->setfont('arial','',12);
    $pdf->setfillcolor(255,255,255);
    $pdf->settextcolor(0,0,0);
    $pdf->setxy(2.5, 9);
    $pdf->cell(16,1,"No se especificó una Cédula para el usuario.",0,1,'C');
}



$pdf->output();
?>