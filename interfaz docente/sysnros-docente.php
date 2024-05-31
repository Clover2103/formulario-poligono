<?php

// Conexion a la base de datos de poligono

session_start();
include_once ("./conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto -> conexionBD();

$docente = $_SESSION["cod_docente"];

$query = "SELECT * FROM poligono_programado WHERE cod_docente = :cod_doce AND  estado = abierto";
$smst = $conexion->prepare($query);
$smst->execute();
$infpol = $smst->fetchAll(PDO::FETCH_OBJ);



?>

<!DOCTYPE html>
<html lang="en">

<!-- Llamada del componente head del documento -->

<!-- <?php
// include_once ("./int/sysnros-head.php");
?> -->

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="sweetalert2/dist/sweetalert2.min.css"> -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="css/main.css">
    <title>Formulario asistencia poligono</title>
</head>

<!-- Cuerpo de la pagina -->

<body>

    <!-- Inlclucion de nav -->

    <?php
        include_once ("./int/sysnros-nav.php");
    ?>

    <div class="main-head">
        <div class="container mt-4">
            <div class="row">

            </div>
        </div>
    </div>

    <!-- <?php
    // include_once ("./int/sysnros-footer.php");
    ?> -->

    <!-- Conexion de libreria JQUERY -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <!-- Conexion de documento JS -->
    <script src="js/main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>