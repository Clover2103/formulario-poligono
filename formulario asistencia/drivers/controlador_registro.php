<?php

$cont = [];
include_once("../conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto -> conexionBD();
date_default_timezone_set('America/Bogota');
// Obtener la fecha actual
$fecha_actual = getdate();
// Formatear el día con dos dígitos
$dia = sprintf("%02d", $fecha_actual['mday']);
// Formatear el mes con dos dígitos
$mes = sprintf("%02d", $fecha_actual['mon']);
// Formatear el año con cuatro dígitos
$año = $fecha_actual['year'];
// Crear la fecha formateada
$hoy = "$dia-$mes-$año";

$id                 = $hoy . "-" . $_POST["numero_doc"];
$numero_doc         = $_POST["numero_doc"];
$nombres            = strtoupper($_POST["nombres"]);
$apellidos          = strtoupper($_POST["apellidos"]);
$celular            = $_POST["celular"];
$correo             = $_POST["correo"];
$cont_emerg         = strtoupper($_POST["cont_emerg"]);
$num_cont_emerg     = $_POST["num_cont_emerg"];
$enfoque            = $_POST["enfoque"];
$entrega            = $_POST["entrega"];
$cod_poli           = $_POST["cod_poli"];

$targetDir = "../ids/$numero_doc/";

if (!file_exists($targetDir)){
    mkdir($targetDir,0755,true);
}

if(isset($_FILES['documento']["name"])){
    
    $extension = pathinfo($_FILES['documento']["name"],PATHINFO_EXTENSION);
    
    $file_name = 'Documento de ' . $nombres . ' ' . $apellidos . '.' .$extension;
    $add = $targetDir . $file_name;
    
    $documentoUser = "../ids/$numero_doc/$file_name";
    
    if(move_uploaded_file($_FILES['documento']["tmp_name"],$add)){}

}

try {
    
    $query = "SELECT COUNT(*) as total_registros FROM asistencia_poligono WHERE cod_poli = :cod_poli AND numero_doc = :numero_doc";
    $insert = $conexion->prepare($query);
    $insert->bindParam(':cod_poli', $cod_poli, PDO::PARAM_STR);
    $insert->bindParam(':numero_doc', $numero_doc, PDO::PARAM_STR);
    $insert->execute();

    $inf_query = $insert->fetch(PDO::FETCH_ASSOC);

    if ($inf_query['total_registros'] > 0) {
        $cont['error'] = "Usted ya realizo un registro para poligono el dia de hoy, verifique su numero de documento";
    } else {
        $query =("INSERT INTO asistencia_poligono (id,numero_doc,nombres,apellidos,celular,correo,emergencia,cel_emergencia,documento,enfoque,fisico,cod_poli)
        VALUES (:id,:num_doc,:nom,:ape,:celular,:correo,:cont_eme,:num_eme,:docu,:enfoque,:fisico,:cod_poli)");
        $insert = $conexion->prepare("$query");
        $insert -> bindParam(':id',$id,PDO::PARAM_STR);
        $insert -> bindParam(':num_doc',$numero_doc,PDO::PARAM_STR);
        $insert -> bindParam(':nom',$nombres,PDO::PARAM_STR);
        $insert -> bindParam(':ape',$apellidos,PDO::PARAM_STR);
        $insert -> bindParam(':celular',$celular,PDO::PARAM_STR);
        $insert -> bindParam(':correo',$correo,PDO::PARAM_STR);
        $insert -> bindParam(':cont_eme',$cont_emerg,PDO::PARAM_STR);
        $insert -> bindParam(':num_eme',$num_cont_emerg,PDO::PARAM_STR);
        $insert -> bindParam(':docu',$documentoUser,PDO::PARAM_STR);
        $insert -> bindParam(':enfoque',$enfoque,PDO::PARAM_STR);
        $insert -> bindParam(':fisico',$entrega,PDO::PARAM_STR);
        $insert -> bindParam(':cod_poli',$cod_poli,PDO::PARAM_STR);
        $insert->execute();

        $cont['mensaje'] = "Asistencia registrada satisfactoriamente ";
        $cont['mensaje2'] = "Por favor tome captura y enviar al numero 3105610135";
    }
        
} catch (PDOException $e) {
    $cont['error'] =  'Surgio un error ' . $e->getMessage();
}

echo json_encode($cont);

?>