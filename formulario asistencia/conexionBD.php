<?php 
	
	// // Clase para la coneccion correcta a la base de datos
	class Cconexion {

		function conexionBD() {
			// Declaracion de variables de conexion
			$host = 'localhost';
			$dbname = 'poligono';
			$username = 'usercogno';
			$pass = 'Cogno123@abc*';

			try {
				// Respuesta positiva de la conexion a base de datos
				$conn = new PDO("mysql:host=$host;dbname=$dbname",$username,$pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"));
			} catch (PDOException $error) {
				// Respuesta negativa de la conexion a base de datos
				echo ("No se logro conectar a la base de datos $dbname, error: $error");
			}
			return $conn;
		}	
	}

?>