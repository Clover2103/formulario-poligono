<?php

$cont = [];
include_once("../conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto->conexionBD();
$cod_poli = $_POST["cod_poli"];

$query = "SELECT * FROM poligono_programado WHERE cod_poli = :cod_poli AND estado = 'abierto'";
$insert = $conexion->prepare("$query");
$insert -> bindParam(':cod_poli',$cod_poli,PDO::PARAM_STR);
$insert->execute();
$contar = $insert->rowCount();

if ($contar === 1) {
    $cont['mensaje'] = "okay";
} else {
    $cont['error'] = "error";
}

echo json_encode($cont);

?>