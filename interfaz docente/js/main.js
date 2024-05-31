$(document).ready(function () {

    // ********************************************************************************** //
    // *********************** INTERACCION CRAR NUEVO POLIGONO ************************** //
    // ********************************************************************************** //

    $(document).on('click','#crear_poli',function (e) { 
        e.preventDefault();

        let dato_vacio = " ";
        const url = "./drivers/consulta_docentes.php";
        
        $.ajax({
            type: "POST",
            url: url,
            data: { dato_vacio : dato_vacio} ,
            dataType: "json",
            async: true
        })
        .done(function ajaxDone(res){

            // Obtener datos de respuesta
            let data = res.datos;

            // Construir opciones del select
            let options = '';
            data.forEach(function(item) {
                options += `<option value="${item.cod_docente}">${item.nom_doce} ${item.ape_doce}</option>`;
            });

            // Insertar opciones en el select
            $('#docente').html(options);

            Swal.fire({
                title: "Formulario creacion de poligono",
                // Estructura creacion de nuevo poligono
                html: `
                <form id="form_crear_poligono" class="mt-4">
                    <div>
                        <div class="form-floating w-100 mt-3">
                            <select class="form-select" id="docente" required  aria-label="Seleccionar un docente">
                                <option value="">Seleccionar un docente</option>
                                ${options}
                            </select>
                            <label for="enfoque">Selecciona el docente <span>*</span></label>
                        </div>
                        <div class="form-floating mt-3">
                            <input type="text" class="form-control" name="sede" maxlength="6" id="sede" required placeholder="Sede en donce se realiza">
                            <label for="codigo_poli">Sede de poligono <span>*</span></label>  
                        </div>
                        <div class="form-floating mt-3">
                            <input type="date" class="form-control" name="Fecha de poligono" min="" required id="fecha_poligono" placeholder="Fecha de poligono">
                            <label for="codigo_poli">Fecha de poligono <span>*</span></label>  
                        </div>
                        <div class="row mt-3 justify-content-center align-items-center">
                            <div class="col-md-4 col-sl-4 mt-3">
                                <button type="submit" class="btn_enviar">CREAR</button>
                            </div>
                            <div class="col-md-4 col-sl-4 mt-3">
                                <button type="button" id="cancelar_poli" class="btn_enviar">CANCELAR</button>
                            </div>  
                        </div>
                    </div>
                </form>
                `,
                customClass: {
                    popup: 'swal-container' // Asigna la clase que define el tamaño máximo de altura para la caja blanca de la ventana emergente
                },
                allowOutsideClick: false,
                allowEspaceKey: false,
                allowEnterKey: false,
                stopKeydownPropagation: false,
                showConfirmButton: false
            });

            // Obtener la fecha actual en el formato YYYY-MM-DD
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
        
            // Establecer la fecha actual como valor mínimo para el input date
            document.getElementById("fecha_poligono").min = today;
    
            // Agregar evento para cerrar el Swal al hacer clic en CANCELAR dentro de esta llamada a Swal.fire()
            $('#cancelar_poli').click(function(e) {
                e.preventDefault();
                Swal.close();
            });

        });
        
    });

    // ********************************************************************************** //
    // ****************** EVENTO SUBMIT EN CREACION DE POLIGONO ************************* //
    // ********************************************************************************** //

    $(document).on('submit','#form_crear_poligono',function (e) { 
        e.preventDefault();

        let form = $(this);
        let url = "./drivers/crear_poligonos.php";

        var data_form = {
            docente:                $('#docente',form).val(),
            sede:                   $('#sede',form).val(),
            fecha_poligono:         $('#fecha_poligono',form).val()
        }

        $.ajax({
            type: "POST",
            url: url,
            data: data_form,
            dataType: "json",
            async: true
        })
        .done(function ajaxDone(res){

            if (res.mensaje !== undefined) {
                Swal.fire({
                    icon: "success",
                    html: res.mensaje
                });
            }

        });

    });

    // ********************************************************************************** //
    // ************************* FORMULARIO DE CONSULTA POLIGONO ************************ //
    // ********************************************************************************** //
    
    $(document).on('click','#consulta_poli',function (e) { 
        e.preventDefault();
        let url = "./drivers/consulta_poligonos_activos.php";
        let estado = "abierto";

        $.ajax({
            type: "POST",
            url: url,
            data: {estado : estado},
            dataType: "json",
            async: true
        })
        .done(function ajaxDone(res) {

            if (res.cont.mensaje !== undefined) {

                let plantilla = "";
                let x = 1;

                // Apertura de la ventana emergente con creacion de la cabeza de la tabla

                Swal.fire({
                    title: "Formulario consulta de poligono activos",

                    // Estructura de formulario de consulta poligono

                    html: `
                    <div class="row mt-4">
                        <div class="col-md-12">
                            <table class="table table-striped" id="tabla_poligonos" style="display:none">
                                <thead>
                                    <tr>
                                        <th class="campo_table numero">#</th>
                                        <th class="campo_table codigo">Codigo</th>
                                        <th class="campo_table documento">Docente</th>
                                        <th class="campo_table">Sede</th>
                                        <th class="campo_table celular">Fecha del poligono</th>
                                        <th class="campo_table correo">Estado</th>
                                    </tr>
                                </thead>
                                <tbody id="btable_poligono">

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <form id="form_consulta_poligono" class="mt-4">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="text" class="form-control" name="numero documento" required maxlength="6" id="codigo_poli" placeholder="Codigo poligono">
                                    <label for="codigo_poli">Codigo poligono</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <button type="submit" class="btn_enviar">BUSCAR</button>
                            </div>
                            <div class="col-md-3 justify-content-center align-items-center">
                                <button type="button" id="cancelar_consulta" class="btn_enviar">CANCELAR</button>
                            </div>  
                        </div>
                    </form>
                    <div class="row mt-4">
                        <div class="col-md-12">
                            <table class="table table-striped" id="tabla_personas">
                                
                            </table>
                        </div>
                    </div> 
                    `,
                    customClass: {
                        popup: 'swal-container' // Asigna la clase que define el tamaño máximo de altura para la caja blanca de la ventana emergente
                    },
                    width: "95%",
                    allowOutsideClick: false,
                    allowEspaceKey: false,
                    allowEnterKey: false,
                    stopKeydownPropagation: false,
                    showConfirmButton: false
                });

                // Agregar evento para cerrar el Swal al hacer clic en CANCELAR dentro de esta llamada a Swal.fire()

                $('#cancelar_consulta').click(function(e) {
                    e.preventDefault();
                    Swal.close();
                });

                // Creacion del cuerpo de la tabla de los poligonos activos

                if (res.arraydatos !== undefined) {

                    $('#tabla_poligonos').show();

                    res.arraydatos.datos.forEach(dato => {
                        plantilla += `
                                <tr>
                                    <th class="campo_table">${x++}</th>
                                    <th class="campo_table">${dato.cod_poli}</th>
                                    <th class="campo_table">${dato.nom_doce} ${dato.ape_doce}</th>
                                    <th class="campo_table">${dato.sede}</th>
                                    <th class="campo_table">${dato.fecha_programada}</th>
                                    <th class="campo_table">${dato.estado}</th>
                                </tr>
                        `;   
                    });

                    $('#btable_poligono').html(plantilla);

                };
            }

            if(res.cont.error !== undefined) {

                Swal.fire({
                    title: "Formulario consulta de poligono",

                    // Estructura de formulario de consulta poligono

                    html: `
                    <form id="form_consulta_poligono" class="mt-4">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="text" class="form-control" name="numero documento" required maxlength="6" id="codigo_poli" placeholder="Codigo poligono">
                                    <label for="codigo_poli">Codigo poligono</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <button type="submit" class="btn_enviar">BUSCAR</button>
                            </div>
                            <div class="col-md-3 justify-content-center align-items-center">
                                <button type="button" id="cancelar_consulta" class="btn_enviar">CANCELAR</button>
                            </div>  
                        </div>
                    </form>
                    <div class="row mt-4">
                        <div class="col-md-12">
                            <table class="table table-striped" id="tabla_personas">
                                
                            </table>
                        </div>
                    </div> 
                    `,
                    customClass: {
                        popup: 'swal-container' // Asigna la clase que define el tamaño máximo de altura para la caja blanca de la ventana emergente
                    },
                    width: "95%",
                    allowOutsideClick: false,
                    allowEspaceKey: false,
                    allowEnterKey: false,
                    stopKeydownPropagation: false,
                    showConfirmButton: false
                });

                // Agregar evento para cerrar el Swal al hacer clic en CANCELAR dentro de esta llamada a Swal.fire()

                $('#cancelar_consulta').click(function(e) {
                    e.preventDefault();
                    Swal.close();
                });

            }

        });

    });

    $('#tabla_personas').hide();
    
    // Consulta de los poligonos especificos y de las personas de cada poligono

    $(document).on('submit','#form_consulta_poligono',function (e) { 
        e.preventDefault();
        let form = $(this);
        let plantilla = "";
        let x = 1;
        
        var data_form = {
            codigo_poli:          $('#codigo_poli',form).val()
        }

        const url = "./drivers/consulta_poligono.php";
        $.ajax({
            type: "POST",
            url: url,
            data: data_form,
            dataType: "json",
            async: true
        })
        .done(function ajaxDone(res){

            if (res.cont.mensaje !== undefined) {
                plantilla += `
                    <thead>
                        <tr>
                            <th class="campo_table numero">#</th>
                            <th class="campo_table codigo">Codigo</th>
                            <th class="campo_table documento">Documento</th>
                            <th class="campo_table">Nombres</th>
                            <th class="campo_table">Apellidos</th>
                            <th class="campo_table celular">Celular</th>
                            <th class="campo_table correo">Correo</th>
                            <th class="campo_table">Emergencia</th>
                            <th class="campo_table n_contacto">Numero</th>
                            <th class="campo_table">Enfoque</th>
                            <th class="campo_table entrega">Entrega</th>
                        </tr>
                    </thead>
                    `;
                res.arraydatos.datos.forEach(dato => {
                    plantilla += `
                        <tbody>
                            <tr>
                                <th class="campo_table">${x++}</th>
                                <th class="campo_table">${dato.cod_poli}</th>
                                <th class="campo_table">${dato.numero_doc}</th>
                                <th class="campo_table">${dato.nombres}</th>
                                <th class="campo_table">${dato.apellidos}</th>
                                <th class="campo_table">${dato.celular}</th>
                                <th class="campo_table">${dato.correo}</th>
                                <th class="campo_table">${dato.emergencia}</th>
                                <th class="campo_table">${dato.cel_emergencia}</th>
                                <th class="campo_table">${dato.enfoque}</th>
                                <th class="campo_table">${dato.fisico}</th>
                            </tr>
                        </tbody>
                    `;
                });

                $('#tabla_personas').html(plantilla);
                $('#tabla_personas').show();
                
            }

            if (res.cont.error !== undefined) {
                $('#tabla_personas').html(res.cont.error);
                $('#tabla_personas').show();
            }

        });

    });

    // ********************************************************************************** //
    // ************************* FORMULARIO DE CEACION DOCENTE ************************** //
    // ********************************************************************************** //
    
    $(document).on('click','#crear_doce',function (e) { 
        e.preventDefault();
        Swal.fire({
            title: "Formulario Creacion de docentes",
            // Estructura creacion de nuevo  docente
            html: `
            <form id="form_crear_docente" class="mt-4">
                <div class="">
                    <div class="mt-3">
                        <div class="form-floating mt-3">
                            <input type="text" class="form-control" name="nombres del docente" required id="nomb_docente" placeholder="Nombres de doncente"  oninput="this.value = this.value.toUpperCase()">
                            <label for="nomb_docente">Nombres del docente <span>*</span></label>  
                        </div>
                        <div class="form-floating mt-3">
                            <input type="text" class="form-control" name="apellidos del docente" required id="ape_docente" placeholder="Apellidos de docente"  oninput="this.value = this.value.toUpperCase()">
                            <label for="ape_docente">Apellidos del docente <span>*</span></label>  
                        </div>
                        <div class="form-floating mt-3">
                            <input type="date" class="form-control" name="fecha nacimiento docente" required id="fec_nacimiento" placeholder="Fecha de nacimientos">
                            <label for="ape_docente">Fecha de nacimiento <span>*</span></label>  
                        </div>
                        <div class="form-floating mt-3">
                            <input type="text" class="form-control" name="sede" id="sede_docente" required placeholder="sede">
                            <label for="sede_docente">Sede <span>*</span></label>  
                        </div>
                    </div>
                    <div class="row mt-3 justify-content-center align-items-center">
                        <div class="col-md-4 mt-3">
                            <button type="submit" class="btn_enviar">CREAR</button>
                        </div>
                        <div class="col-md-4 mt-3">
                            <button type="button" id="cancelar" class="btn_enviar">CANCELAR</button>
                        </div>  
                    </div>
                </div>
            </form>
            `,
            customClass: {
                popup: 'swal-container' // Asigna la clase que define el tamaño máximo de altura para la caja blanca de la ventana emergente
            },
            allowOutsideClick: false,
            allowEspaceKey: false,
            allowEnterKey: false,
            stopKeydownPropagation: false,
            showConfirmButton: false
        });

        // Agregar evento para cerrar el Swal al hacer clic en CANCELAR
        $('#cancelar').click(function(e) {
            e.preventDefault();
            Swal.close();
        });
    });

    $(document).on('submit','#form_crear_docente', function (e) {
        e.preventDefault();
        let form = $(this);
        const url = "./drivers/crear_docentes.php";

        let data_form = {
            nomb_docente :          $('#nomb_docente',form).val(),
            ape_docente :           $('#ape_docente',form).val(),
            fec_nacimiento :        $('#fec_nacimiento',form).val(),
            sede_docente :          $('#sede_docente',form).val(),
        }

        $.ajax({
            type: "POST",
            url: url,
            data: data_form,
            dataType: "json",
            async: true
        })
        .done(function ajaxDone(res) {
            
            if (res.mensaje !== undefined) {
                Swal.fire({
                    icon: "success",
                    html: res.mensaje
                });    
            }

            if (res.error !== undefined) {
                Swal.fire({
                    icon: "error",
                    html: res.error
                });    
            }

        });

    });

    // ********************************************************************************** //
    // ************************* PROCESO DE PARA DOCENTES ******************************* //
    // ********************************************************************************** //

    // LOG IN

    $(document).on('submit','#form_ingreso_docente',function (e) { 
        e.preventDefault();
        let form = $(this);
        const url = "./drivers/consulta_log_docente.php";

        let data_form = {
            user_doc:       $('#user_doc',form).val(),
            pass_log:       $('#pass_log',form).val(),
        }

        $.ajax({
            type: "POST",
            url: url,
            data: data_form,
            dataType: "json",
            async: true
        })
        .done(function ajaxDone(res) {
            
            

        })
        ;
    });

});