<?php

session_start();
$cont = [];
include_once("../conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto -> conexionBD();

$nomb_docente               = $_POST['nomb_docente'];
$ape_docente                = $_POST['ape_docente'];
$porciones                  = explode(" ", $nomb_docente);

// Cracion de codigo
// Caracteres del nombre
$primer_nombre              = $porciones[0];
$caracter_pn                = substr($primer_nombre, 0 , 1);
if (!empty($porciones[1]) && $porciones[1] !== " ") {
    $segundo_nombre         = $porciones[1];
    $caracter_sn            = substr($segundo_nombre, 0 , 1);
}

// Caracteres del apellido
$porciones                  = explode(" ", $ape_docente);
$primer_apellido            = $porciones[0];
$caracter_pa                = substr($primer_apellido,0 , 1);
if (!empty($porciones[1]) && $porciones[1] !== " ") {
    $segundo_apellido       = $porciones[1];
    $caracter_sa            = substr($segundo_apellido,0 , 1);
}
$codigo_docente             = $caracter_pn . (!empty($caracter_sn) ? $caracter_sn : "") . $caracter_pa . (!empty($caracter_sa) ? $caracter_sa : "");

$fec_nacimiento             = $_POST['fec_nacimiento'];
$sede_docente               = $_POST['sede_docente'];
try {
    $query = "INSERT INTO docentes (cod_docente, nom_doce, ape_doce, fec_nac, ciudad)
        VALUES (:codigo_docente, :nomb_docente, :ape_docente, :fec_nacimiento, :sede_docente)";
    $insert = $conexion->prepare("$query");
    $insert -> bindParam(':codigo_docente',$codigo_docente,PDO::PARAM_STR);
    $insert -> bindParam(':nomb_docente',$nomb_docente,PDO::PARAM_STR);
    $insert -> bindParam(':ape_docente',$ape_docente,PDO::PARAM_STR);
    $insert -> bindParam(':fec_nacimiento',$fec_nacimiento,PDO::PARAM_STR);
    $insert -> bindParam(':sede_docente',$sede_docente,PDO::PARAM_STR);
    $insert->execute();
    $cont['mensaje'] = 'Se Realizo correctamente la creacion del usuario ' . $nomb_docente . ' ' . $ape_docente ;
} catch (PDOException $e) {
    $cont['error'] =  'Surgio un error ' . $e->getMessage();
}

echo json_encode($cont);

?>