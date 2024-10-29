<?php

// Conexion a la base de datos de poligono

include_once ("./conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto -> conexionBD();

?>

<!-- Creacion de estructura HTML5 -->

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

    <header class="main-header">
        <div class="container mt-4">
            <div class="row">
                <div class="col-md-3">
                    <a href="sysnros-consulta-poli.php">
                        <button class="btn btn-success w-100">Poligo</button>
                    </a>
                </div>
                <div class="col-md-3">
                    <a href="sysnros-creador-eventos.php">
                        <button class="btn btn-primary w-100">Eventos especiales</button>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- <?php
    // include_once ("./int/sysnros-footer.php");
    ?> -->

    <!-- Conexion de libreria JQUERY -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <!-- Conexion de documento JS -->
    <script src="js/app.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
</body>
</html>