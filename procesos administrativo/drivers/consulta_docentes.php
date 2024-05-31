<?php

session_start();
$cont = [];
include_once("../conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto -> conexionBD();

$query = "SELECT * FROM docentes";
$insert = $conexion->prepare($query);
$insert->execute();
$json = array();

if ($insert->rowCount() > 0) {
    while ($inf_query = $insert->fetch(PDO::FETCH_ASSOC)) {
        $json[] = array(
            'cod_docente'           => $inf_query['cod_docente'],
            'nom_doce'              => $inf_query['nom_doce'],
            'ape_doce'              => $inf_query['ape_doce']
        );
    }
}

$arraydatos['datos'] = $json;
echo json_encode($arraydatos);

?>