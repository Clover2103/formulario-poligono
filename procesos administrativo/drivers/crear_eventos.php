<?php

session_start();
$cont = [];
include_once("../conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto -> conexionBD();

date_default_timezone_set('America/Bogota');

$nombre                 = $_POST['nombre'];
$fec_ini                = $_POST['fec_ini'];
$fec_fin                = $_POST['fec_fin'];
$fecha_creacion         = date("Y-m-d H:i:s");

try {
    $query = "INSERT INTO eventos_especiales (nombre, fecha_inicio, fecha_fin, fecha_creacion)
        VALUES (:nombre,:fec_ini,:fec_fin,:fecha_creacion)";
    $insert = $conexion->prepare("$query");
    $insert -> bindParam(':nombre',$nombre,PDO::PARAM_STR);
    $insert -> bindParam(':fec_ini',$fec_ini,PDO::PARAM_STR);
    $insert -> bindParam(':fec_fin',$fec_fin,PDO::PARAM_STR);
    $insert -> bindParam(':fecha_creacion',$fecha_creacion,PDO::PARAM_STR);
    $insert->execute();
    $cont['mensaje'] = 'Se programo correctamente el evento para el dia ' . $fec_ini . '</b>';
} catch (PDOException $e) {
    $cont['error'] =  'Surgio un error ' . $e->getMessage();
}

echo json_encode($cont);

?>
