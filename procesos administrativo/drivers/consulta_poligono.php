<?php

    session_start();
    $cont = [];
    include_once("../conexionBD.php");
    $objeto = new Cconexion();
    $conexion = $objeto -> conexionBD();

    $codigo_poli          = $_POST['codigo_poli'];

    try {
        $query = "SELECT * FROM asistencia_poligono ap WHERE ap.cod_poli = :codigo";
        $insert = $conexion->prepare($query);
        $insert -> bindParam(':codigo',$codigo_poli,PDO::PARAM_STR);
        $insert->execute();
        $json = array();

        if ($insert->rowCount() > 0) {
            while ($inf_query = $insert->fetch(PDO::FETCH_ASSOC)) {
                $json[] = array(
                    'cod_poli'          => $inf_query['cod_poli'],
                    'numero_doc'        => $inf_query['numero_doc'],
                    'nombres'           => $inf_query['nombres'],
                    'apellidos'         => $inf_query['apellidos'],
                    'celular'           => $inf_query['celular'],
                    'correo'            => $inf_query['correo'],
                    'emergencia'        => $inf_query['emergencia'],
                    'cel_emergencia'    => $inf_query['cel_emergencia'],
                    'enfoque'           => $inf_query['enfoque'],
                    'fisico'            => $inf_query['fisico']
                );
            }
            $cont['mensaje'] = 'Se realizaron las modificaciones correspondientes';    
        } else {
            $cont['error'] = 'No se encuentran registros realizados para este poligono';
        }    
    } catch (PDOException $e) {
        $cont['error'] =  'Surgio un error ' . $e->getMessage();
    }

    $arraydatos['datos'] = $json;
    echo json_encode(array('cont' => $cont, 'arraydatos' => $arraydatos));

?>