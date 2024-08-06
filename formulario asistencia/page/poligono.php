<?php

// Conexion a base de datos poligono

include_once ("../conexionBD.php");
$objeto = new Cconexion();
$conexion = $objeto -> conexionBD();

?>

<!-- Estructura HTML5 -->
<!DOCTYPE html>
<html lang="en">

<!-- Llamada del elemento head -->
<?php
include_once ("../components/head.php");
?>

<!-- Cuerpo de la pagina -->
<body>

    <!-- Estructura del formulario -->
    <form id="form_asistencia_poli" >

        <!-- Primera seccion de validacion del codigo de poligono -->
        <section id="body-cod" class="secc_prin_2 ">
            <h2>VALIDACION CODIGO DE POLIGONO</h2>
            <div class="val-cod form-floating">
                <input type="text" class="form-control" name="numero documento" maxlength="6" id="cod_poli" placeholder="CODIGO DE POLIGONO *" oninput="this.value = this.value.toUpperCase()">
                <label for="cod_poli">INGRESE CODIGO DE POLIGONO</label>
            </div>
            <p id="p-error" class="text-danger" style="display:none">Codigo de poligono incorrecto</p>
            <button class="btn_enviar" id="vali_codigo" >VERIFICAR <img src="../img/validacion/diana.svg" class="w-20px h-20px" alt="diana"></button>
        </section>

        <!-- Segunda seccion estructura completa de formulario de asistencia poligono -->
        <div id="body-form" style="display:none">
            <section class="secc_prin">
                <h2>ASISTENCIA POLÍGONO - ACADEMIA COGNOSEGURIDAD LTDA</h2>
                <p>
                    Registro asistencia ejercicio practico de tiro, en 
                    las instalaciones de Cognoseguridad LTDA. 
                    De esta manera aportamos nuestro granito de arena a cuidar 
                    el planeta con menos impresiones. Recuerda siempre 
                    verificar tus datos antes de enviar tu respuesta.
                </p>
            </section>
            <section class="input">
                <div class="form-floating w-100">
                    <input type="number" class="form-control" name="numero documento" id="numero_doc" placeholder="N° de documento *">
                    <label for="numero_doc">N° de documento <span>*</span></label>
                </div>
            </section>
            <section class="input">
                <div class="form-floating w-100">
                    <input type="text" class="form-control" name="nombres" id="nombres" placeholder="Nombres *">
                    <label for="nombres">Nombres <span>*</span></label>
                </div>
            </section>
            <section class="input">
                <div class="form-floating w-100">
                    <input type="text" class="form-control" name="apellidos" id="apellidos" placeholder="Apellidos *">
                    <label for="apellidos">Apellidos <span>*</span></label>
                </div>
            </section>
            <section class="input">
                <div class="form-floating w-100">
                    <input type="number" class="form-control" name="celular" id="celular" placeholder="Celular *">
                    <label for="celular">Celular <span>*</span></label>
                </div>
            </section>
            <section class="input">
                <div class="form-floating w-100">
                    <input type="email" class="form-control" name="correo electronico" id="correo" placeholder="Correo electronico *">
                    <label for="correo">Correo electronico<span>*</span></label>
                </div>
            </section>
            <section class="input">
                <div class="form-floating w-100">
                    <input type="text" class="form-control" name="contacto de emergencia" id="cont_emerg" placeholder="Nombre de contacto de emergencia *">
                    <label for="cont_emerg">Nombre de contacto de emergencia <span>*</span></label>
                </div>
            </section>
            <section class="input">
                <div class="form-floating w-100">
                    <input type="number" class="form-control" name="celular contacto de emergencia" id="num_cont_emerg" placeholder="Celular de contacto de emergencia *">
                    <label for="num_cont_emerg">Celular de contacto de emergencia <span>*</span></label>
                </div>
            </section>
            <section class="input">
                <div class="form-floating w-100">
                    <select class="form-select" id="enfoque" aria-label="Selecciona el enfoque de ejercicio practico">
                        <option value="">Seleccionar enfoque</option>
                        <option value="VIGILANCIA">VIGILANCIA</option>
                        <option value="SUPERVISOR">SUPERVISOR</option>
                        <option value="ESCOLTA">ESCOLTA</option>
                        <option value="OPERADOR DE MEDIOS">OPERADOR DE MEDIOS</option>
                        <option value="DCCAE (PISTOLA)">DCCAE (PISTOLA)</option>
                        <option value="DCCAE (REVOLVER)">DCCAE (REVOLVER)</option>
                    </select>
                    <label for="enfoque">Selecciona el enfoque de ejercicio practico <span>*</span></label>
                </div>
            </section>
            <section class="input">
                <div class="form-floating w-100">
                    <select class="form-select" id="entrega" aria-label="Entrega documento fisico o digital">
                        <option value="">Seleccionar</option>
                        <option value="FISICO">FISICO</option>
                        <option value="DIGITAL">DIGITAL</option>
                    </select>
                    <label for="entrega">Entrega documento fisico o digital <span>*</span></label>
                </div>
            </section>
            <section class="input_doc">
                <label for="documento">Carga tu documento de identidad <span>*</span></label>
                <label for="documento" id="custom-file-label" class="custom-file-label">Cargar documento</label>
                <input type="file" name="documento" id="documento" style="display:none">
            </section>

            <!-- Contenedor mensaje de en caso de campos incompletos -->
            <div id="contMsg" class="contMsg">
                <div class="contMsgCon" id="contMsgCon">
                    <div class="contMsgConIn" id="contMsgConIn">
                        <div id="contMsgConM" class="contMsgConM"></div>
                    </div>    
                </div>
            </div>

            <!-- Contenedor de botones de interaccion -->
            <section class="input_envio">
                <button type="submit" id="envio" class="btn_enviar_form">Enviar</button>
                <button id="borrar" class="btn_borrar"><u>Borrar formulario</u></button>
            </section>
        </div>
    </form>

    <!-- Contenedor de ventana emergente de respuesta positiva -->
    <div id="contMsgOk" class="contMsgOk">
        <div class="contMsgConOk" id="contMsgConOk">
            <div class="contMsgConInOk" id="contMsgConInOk">
                <div id="contMsgConMOk" class="contMsgConMOk"></div>
                <div id="contMsgConMOk2" class="contMsgConMOkImg">
                    <img src="../img/form/chulo_confirmacion.png" alt="chulo">
                </div>
                <div id="contMsgConMOk3" class="contMsgConMOk"></div>
                <!-- Boton de interaccion para finalizar proceso -->
                <button id="fin_form"><u>Finalizar formulario</u></button>
            </div>    
        </div>
    </div>

    <!-- Conexion de libreria de JQuery  -->
    <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
    <!-- Conexion de documento JS -->
    <script src="../js/app.js"></script>

    <!-- Script de validacion de codigo del poligono -->
    <script>
        $('#vali_codigo').click(function (e) { 
            e.preventDefault();
            let cod_poli = $('#cod_poli').val()
            const url = "../drivers/controlador_validar_codigo.php";
            let msg = "";

            // Llamada ajax

            $.ajax({
                type: "post",
                url: url,
                data: { cod_poli: cod_poli },
                dataType: "json",
                async: true
            })
            
            // Respuesta ajax

            .done(function ajaxDone(res){

                // Respuesta positiva

                if (res.mensaje !== undefined) {
                    $('#body-form').css('display', 'block');
                    $('#body-cod').css('display', 'none');
                }

                // Respuesta negativa

                if (res.error !== undefined) {
                    $('#p-error').css('display', 'block');
                    setTimeout(function() {
                        $('#p-error').css('display', 'none');
                    }, 3000); // 3000 milisegundos = 3 segundos
                }

            });
        });
    </script>
</body>
</html>