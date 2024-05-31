<?php

include_once ("./conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto -> conexionBD();

?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!-- <link rel="stylesheet" href="sweetalert2/dist/sweetalert2.min.css"> -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="stylesheet" href="css/main.css">
    <title>Formulario asistencia poligono</title>
</head>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body class="d-flex justify-content-center align-items-center">

    <div class="container w-50">
        <div class="card">
            <div class="card-body w-100" >
                <form id="form_ingreso_docente">
                    <h1 class="card-title text-center">INGRESO PARA DOCENTES DE POLIGONO</h1>
                    <div class="form-floating mb-3 mt-4">
                        <input type="text" class="form-control" id="user_doc" required placeholder="name@example.com" oninput="this.value = this.value.toUpperCase()">
                        <label for="user_doc">Codigo de docente</label>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="pass_log" required placeholder="Password">
                        <label for="pass_log">Contraseña</label>
                    </div>
                    <button class="btn btn-primary mt-3 w-100">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    </div>
        

    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <!-- Conexion de documento JS -->
    <script src="js/main.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

</body>
</html>