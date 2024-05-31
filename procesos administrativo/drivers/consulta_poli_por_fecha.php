<?php

session_start();
$cont = [];
include_once("../conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto->conexionBD();

$fecha_inicio = $_POST['fecha_inicio'];
$fecha_fin = $_POST['fecha_fin'];

$query = "SELECT p.cod_poli, COUNT(a.numero_doc) as cantidad_personas,
    d.cod_docente, p.sede, p.fecha_programada, p.fecha_poligono, p.estado,
    d.nom_doce, d.ape_doce
    FROM poligono_programado p
    LEFT JOIN docentes d ON d.cod_docente = p.cod_docente 
    LEFT JOIN asistencia_poligono a ON a.cod_poli = p.cod_poli
    WHERE p.fecha_programada BETWEEN :fecha_inicio AND :fecha_fin
    GROUP BY p.cod_poli";
$smtp = $conexion->prepare($query);
$smtp->bindParam(':fecha_inicio', $fecha_inicio);
$smtp->bindParam(':fecha_fin', $fecha_fin);
$smtp->execute();

if ($smtp->rowCount() > 0) {
    $json = array();
    while ($inf_query = $smtp->fetch(PDO::FETCH_ASSOC)) {
        $json[] = array(
            'cod_poli'                  => $inf_query['cod_poli'],
            'cantidad_registros'        => $inf_query['cantidad_personas'], // Usar el conteo de asistencia_poligono como cantidad de registros
            'cod_docente'               => $inf_query['cod_docente'],
            'sede'                      => $inf_query['sede'],
            'fecha_programada'          => $inf_query['fecha_programada'],
            'fecha_poligono'            => $inf_query['fecha_poligono'],
            'estado'                    => $inf_query['estado'],
            'nom_doce'                  => $inf_query['nom_doce'],
            'ape_doce'                  => $inf_query['ape_doce']
        );
    }
    $cont['mensaje'] = 'correcto';
} else {
    $cont['error'] = 'No se encuentra ningun poligono en este rango de fecha';
}

$arraydatos['datos'] = isset($json) ? $json : array(); // Verifica si $json está definido antes de asignarlo
echo json_encode(array('cont' => $cont, 'arraydatos' => $arraydatos));

?>

