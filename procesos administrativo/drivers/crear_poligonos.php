<?php

session_start();
$cont = [];
include_once("../conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto -> conexionBD();

// Función para generar un código único de 6 letras en mayúsculas
function generarCodigo() {
    // Caracteres permitidos para el código
    $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $longitud = strlen($caracteres);

    // Genera un código aleatorio de 6 letras en mayúsculas
    $codigo = '';
    for ($i = 0; $i < 6; $i++) {
        $codigo .= $caracteres[rand(0, $longitud - 1)];
    }

    // Realiza un bucle hasta que se genere un código único que no esté en la base de datos
    while (codigoExisteEnBaseDeDatos($codigo)) {
        // Genera un nuevo código
        $codigo = '';
        for ($i = 0; $i < 6; $i++) {
            $codigo .= $caracteres[rand(0, $longitud - 1)];
        }
    }
    return $codigo;
}

// Función para verificar si un código ya existe en la base de datos
function codigoExisteEnBaseDeDatos($codigo) {
    global $conexion;

    // Prepara la consulta
    $query = "SELECT COUNT(*) FROM poligono_programado WHERE cod_poli = ?";
    $insert = $conexion->prepare($query);
    $insert->execute([$codigo]); // Enlaza el valor del código a la consulta preparada

    // Obtiene el resultado
    $resultado = $insert->fetchColumn();
    // Si el resultado es mayor que 0, significa que el código ya existe
    return $resultado > 0;
}

$codigoGenerado         = generarCodigo();
$docente                = $_POST['docente'];
$sede                   = $_POST['sede'];
$fecha_poligono         = $_POST['fecha_poligono'];
$fecha_actual = date("Y-m-d H:i:s");

try {
    $query = "INSERT INTO poligono_programado (cod_poli, cod_docente, sede, fecha_programada, fecha_poligono)
        VALUES (:codigoGenerado,:docente,:sede,:fecha_poligono,:fecha_actual)";
    $insert = $conexion->prepare("$query");
    $insert -> bindParam(':codigoGenerado',$codigoGenerado,PDO::PARAM_STR);
    $insert -> bindParam(':docente',$docente,PDO::PARAM_STR);
    $insert -> bindParam(':sede',$sede,PDO::PARAM_STR);
    $insert -> bindParam(':fecha_poligono',$fecha_poligono,PDO::PARAM_STR);
    $insert -> bindParam(':fecha_actual',$fecha_actual,PDO::PARAM_STR);
    $insert->execute();
    $cont['mensaje'] = 'Se programo correctamente el poligono para el dia ' . $fecha_poligono . ' El codigo del poligono es <b>' . $codigoGenerado . '</b>';
} catch (PDOException $e) {
    $cont['error'] =  'Surgio un error ' . $e->getMessage();
}

echo json_encode($cont);

?>
