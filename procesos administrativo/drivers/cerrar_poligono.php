<?php
session_start();
include_once("../conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto->conexionBD();

$codigoPoligono = $_POST['codigo'];

print_r($codigoPoligono . "Estoy en el back para cerrar codigo poligono");

try {
    // Actualizar el estado del polígono a 'cerrado'
    $query = "UPDATE poligono_programado SET estado = 'cerrado' WHERE cod_poli = :codigoPoligono";
    $update = $conexion->prepare($query);
    $update->bindParam(':codigoPoligono', $codigoPoligono, PDO::PARAM_STR);
    $update->execute();
    
    // Verificar si la actualización fue exitosa
    if ($update->rowCount() > 0) {
        $response = ['message' => 'El polígono ha sido cerrado correctamente.'];
    } else {
        $response = ['message' => 'No se encontró el polígono o ya está cerrado.'];
    }
} catch (PDOException $e) {
    $response = ['message' => 'Error: ' . $e->getMessage()];
}

echo json_encode($response);
?>
