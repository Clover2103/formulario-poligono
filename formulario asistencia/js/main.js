$(document).ready(function () {

    // ************************************************************************************************* //
    // ********************************** DECLARACION DE VARIABLES ************************************* //
    // ************************************************************************************************* //

    let numeros = "0123456789";
    let letras="abcdefghyjklmnñopqrstuvwxyz";

    let $cod_poli = $('#cod_poli');
    let $vali_codigo = $('#vali_codigo');

    // ************************************************************************************************* //
    // ********************************* DECLARACION DE FUNCIONES ************************************** //
    // ************************************************************************************************* //
    function validacion_num(texto){
        for(i=0; i<texto.length; i++){
           if (numeros.indexOf(texto.charAt(i),0)!=-1){
              return 1;
           }
        }
        return 0;
    }

    function validacion_letra(texto){
        texto = texto.toLowerCase();
        for(i=0; i<texto.length; i++){
            if (letras.indexOf(texto.charAt(i),0)!=-1){
                return 1;
            }
        }
        return 0;
    }

    // ************************************************************************************************* //
    // ********************************* VALIDACION DE CODIGO DE POLIGONO ****************************** //
    // ************************************************************************************************* //

    $vali_codigo.prop('disabled', true);
    $cod_poli.on('input', function() {
        if ($(this).val().length === 6) {
            $vali_codigo.prop('disabled', false);
            $('#vali_codigo').css('opacity', 1);
        } else {
            $vali_codigo.prop('disabled', true);
            $('#vali_codigo').css('opacity', 0.5);
        }
    });

    // ************************************************************************************************* //
    // ****************************** FORMULARIO ASISTENCIA POLIGONO *********************************** //
    // ************************************************************************************************* //

    // Incluye SweetAlert2 en tu HTML si aún no lo has hecho

$('#form_asistencia_poli').submit(function (e) { 
    e.preventDefault();
    let msg = "";
    let form = $(this);
    var frmDATA = new FormData();

    var documento = $('#documento', form).prop('files')[0];
    var numero_doc = $('#numero_doc', form).val();
    var nombres = $('#nombres', form).val();
    var apellidos = $('#apellidos', form).val();
    var celular = $('#celular', form).val();
    var correo = $('#correo', form).val();
    var cont_emerg = $('#cont_emerg', form).val();
    var num_cont_emerg = $('#num_cont_emerg', form).val();
    var enfoque = $('#enfoque', form).val();
    var entrega = $('#entrega', form).val();
    var cod_poli = $('#cod_poli', form).val();

    frmDATA.append('documento', documento);
    frmDATA.append('numero_doc', numero_doc);
    frmDATA.append('nombres', nombres);
    frmDATA.append('apellidos', apellidos);
    frmDATA.append('celular', celular);
    frmDATA.append('correo', correo);
    frmDATA.append('cont_emerg', cont_emerg);
    frmDATA.append('num_cont_emerg', num_cont_emerg);
    frmDATA.append('enfoque', enfoque);
    frmDATA.append('entrega', entrega);
    frmDATA.append('cod_poli', cod_poli);

    // Construcción array de los datos del formulario
    var data_form = {
        documento: $('#documento', form).val(),
        numero_doc: $('#numero_doc', form).val(),
        nombres: $('#nombres', form).val(),
        apellidos: $('#apellidos', form).val(),
        celular: $('#celular', form).val(),
        correo: $('#correo', form).val(),
        cont_emerg: $('#cont_emerg', form).val(),
        num_cont_emerg: $('#num_cont_emerg', form).val(),
        enfoque: $('#enfoque', form).val(),
        entrega: $('#entrega', form).val()
    };

    // Comprobación de parte del cliente de los campos completos
    data_form.documento == "" ? msg += "- Debe ingresar su documento de identidad <br>" : "";
    data_form.numero_doc == "" ? msg += "- Debe ingresar su numero de documento <br>" : "";
    (validacion_letra(data_form.numero_doc) === 1) ? msg += "- El numero de documento no puede tener letras <br>" : "";
    data_form.nombres == "" ? msg += "- Debe ingresar sus nombre <br>" : "";
    (validacion_num(data_form.nombres) === 1) ? msg += "- El nombre no puede contener numeros <br>" : "";
    data_form.apellidos == "" ? msg += "- Debe ingresar sus apellidos <br>" : "";
    (validacion_num(data_form.apellidos) === 1) ? msg += "- El apellido no puede contener numeros <br>" : "";
    data_form.celular == "" ? msg += "- Debe ingresar su numero celular <br>" : "";
    data_form.celular != "" ? (data_form.celular.length !== 10) ? msg += "- Ingrese un numero de telefono valido <br>" : "" : "";
    (validacion_letra(data_form.celular) === 1) ? msg += "- El numero de celular no puede tener letras <br>" : "";
    data_form.correo == "" ? msg += "- Debe ingresar su correo electronico <br>" : "";
    data_form.cont_emerg == "" ? msg += "- Debe ingresar una persona de contacto de emergencia <br>" : "";
    (validacion_num(data_form.cont_emerg) === 1) ? msg += "- El nombre del contacto no puede contener numeros <br>" : "";
    data_form.num_cont_emerg == "" ? msg += "- Debe ingresar numero de contacto de emergencia <br>" : "";
    (validacion_letra(data_form.num_cont_emerg) === 1) ? msg += "- El numero de contacto no puede tener letras <br>" : "";
    data_form.num_cont_emerg != "" ? (data_form.num_cont_emerg.length !== 10) ? msg += "- Ingrese un numero de telefono de emergencia valido <br>" : "" : "";
    data_form.enfoque == "" ? msg += "- Debe seleccionar un enfoque por el cual va a disparar" : "";
    data_form.entrega == "" ? msg += "- Debe seleccionar la forma de documento de identidad" : "";

    // En caso de que surja error
    if (msg !== "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            html: msg,
            confirmButtonText: 'Aceptar'
        });
    } else {
        // Muestra el SweetAlert2 de carga
        Swal.fire({
            title: 'Cargando...',
            text: 'Por favor, espere mientras procesamos la información.',
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Llamada AJAX
        const url = "../drivers/controlador_registro.php";
        $.ajax({
            type: "POST",
            url: url,
            data: frmDATA,
            contentType: false,
            processData: false,
            dataType: 'json',
            async: true
        })
        // Respuesta del AJAX
        .done(function ajaxDone(res) {
            // Cierra el SweetAlert2 de carga
            Swal.close();

            // Respuesta negativa
            if (res.error !== undefined) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: res.error,
                    confirmButtonText: 'Aceptar'
                });
                $('#contMsg').show();
                $('#contMsg').css("background-color", "red");
                $('#contMsgConM').html(res.error);
            }

            // Respuesta positiva
            if (res.mensaje !== undefined) {
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: res.mensaje,
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    $('#contMsgOk').show();
                    $('#contMsg').hide();
                    $('#contMsgConMOk').html(res.mensaje);
                    $('#contMsgConMOk3').html(res.mensaje2);
                    $("#envio").prop('disabled', true).css("opacity", "0.5");
                });
            }
        })
        .fail(function ajaxFail(jqXHR, textStatus, errorThrown) {
            // Cierra el SweetAlert2 de carga
            Swal.close();

            // Manejo de errores
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema con la solicitud.',
                confirmButtonText: 'Aceptar'
            });
        });
    }
});

// Recargar formulario de asistencia poligono
$('#borrar').click(function (e) { 
    e.preventDefault();
    location.reload();
});

$('#fin_form').click(function (e) { 
    e.preventDefault();
    location.reload();
});

// Interacción visual para cargar documento formulario
$('#documento').change(function (e) { 
    e.preventDefault();
    $('#custom-file-label').css("background-color", "#212C60");
    $('#custom-file-label').css("color", "#fff");
    $('#custom-file-label').text("Documento cargado");
});

});