$(document).ready(function() {

  cargarCursos();
  cargarCursosCartas();
  cargarOperadores();
  cargarFecha();
  cargarFechaRecarga();
  cargarSeminarios();
  cargarSemtodos();
  cargarArmasDisparos();
  limites();
  cargarEmpresas();
  cargarLimitados();
  listar();
  $('#card-msj').hide();
  $('#card-loader').hide();
  window.iniciosession = false;


  setInterval(()=>{
    var url_php = "sysnros-verificar-pdt.php";

    $.ajax({
      type:'POST',
      url: url_php,
      dataType: 'json',
      async: true,
    }).done(function ajaxDone(res){
        if(res.pdt == true){
          iziToast.show({
            id: 'show',
            title: 'Advertencia!!!',
            titleColor: 'red',
            titleSize: '15',
            message: 'Existen Certificados PENDIENTES',
            messageColor: 'rgb(0, 0, 0)',
            position: 'topCenter',
            progressBarColor: 'rgb(0, 0, 0)',
            balloon: true,
            backgroundColor: '#FFFDA2', //  fffb88
            close: false,
            timeout: 10000,
          });
        }
        //if(res.pdt == false){
        //  console.log('SIN PENDIENTES');
        //}
    }).fail(function( jqXHR, textStatus, errorThrown ){
      
      console.log('fallo la llamada ajax en VERIFICAR PENDIENTES.');
      console.log(textStatus);
      console.log(errorThrown);
      console.log('Uncaught Error: ' + jqXHR.responseText);
    }).always(function ajaxSiempre(){
      console.log('Final de la llamada ajax.');
      $('#card-loader').hide();
    }); 

  },120000);

	


  
  $('#form-nro, #form-rpt, #form-mdf').keypress(function(evt) {

    if (evt.key == 'Enter') {
      let element = evt.target;
      let tabIndex = element.tabIndex + 1;
      if (tabIndex>8){
        tabIndex = 1;
      }
      var next = document.querySelector('[tabindex="'+tabIndex+'"]');
      if (next) {
        next.focus();
        evt.preventDefault();
      }
    }


  }); 

  $(document).on('change', '#curso', function(evento){
    
    var c = this.value;
    var o = $('#operador').val();
    
    data = new FormData;
    
    var data = {
      curso      : c,
      operador   : o
    }
    
    $.ajax({
      url: 'sysnros-buscar-precio.php',
      data: data,
      type: 'POST',
      success: function(respuesta) {
        
        if(!respuesta.error) {
          let datos = JSON.parse(respuesta);
          if (datos.length!=0){   
            $("#telefono").val(datos.telefono);
            $("#correo").val(datos.correo);
            $("#direccion").val(datos.direccion);
            $("#precio").val(datos.precio);

            if(datos.habilitar == 'S'){
              document.getElementById('telefono').readOnly = false;
              document.getElementById('correo').readOnly = false;
              document.getElementById('direccion').readOnly = false;
            }else{
              document.getElementById('telefono').readOnly = true;
              document.getElementById('correo').readOnly = true;
              document.getElementById('direccion').readOnly = true;
            }
         
          }else{
            $("#precio").val('');
          }
        }

      } 
    })
  });

  $(document).on('change', '#operador', function(evento){
    
    var sc = document.getElementById('curso');
    var c = sc.options[0].value;
    $("#curso").val(c);$("#curso").focus();$("#curso").select();$("#curso").click();
    var o = this.value;
    
    data = new FormData;

    var data = {
      curso      : c,
      operador   : o
    }
    $.ajax({
      url: 'sysnros-buscar-precio.php',
      data: data,
      type: 'POST',
      success: function(respuesta) {
        
        if(!respuesta.error) {
          let datos = JSON.parse(respuesta);
          if (datos.length!=0){  
            $("#telefono").val(datos.telefono);
            $("#correo").val(datos.correo);
            $("#direccion").val(datos.direccion);
            $("#precio").val(datos.precio);
            
            if(datos.habilitar == 'S'){
              document.getElementById('telefono').readOnly = false;
              document.getElementById('correo').readOnly = false;
              document.getElementById('direccion').readOnly = false;
            }else{
              document.getElementById('telefono').readOnly = true;
              document.getElementById('correo').readOnly = true;
              document.getElementById('direccion').readOnly = true;
            }
          }else{
            $("#precio").val('');
          }
        }

      } 
    })
  });


  $("#curso").change(function(){

    switch (this.value) {
      case '1201':
        $('#lblchkcomp').show(); $('#chkcomp').show(); 
        break;
      case '2201':
        $('#lblchkcomp').show(); $('#chkcomp').show(); 
        break;
      case '3201':
        $('#lblchkcomp').show(); $('#chkcomp').show(); 
        break;
      case '4201':
        $('#lblchkcomp').show(); $('#chkcomp').show(); 
        break;
      default:
        $('#lblchkcomp').hide(); $('#chkcomp').hide();  
    }

    $("#chkcomp").prop("checked", false);
    
 });

  //***********************************************************************************************//
  //******************************** VALIDACION FORMULARIO NRO ************************************//
  //***********************************************************************************************//
  $(document).on('submit', '#form-nro', function(evento){

    evento.preventDefault();     
    $('#card-msj').hide();
    var msj = '';
    var form = $(this);


    var data_form = {
      documento   : $('#documento',form).val(),
      apellido1   : $('#apellido1',form).val(),
      apellido2   : $('#apellido2',form).val(),
      nombre1     : $('#nombre1',form).val(),
      nombre2     : $('#nombre2',form).val(),
      curso       : $('#curso',form).val(),
      fecha       : $('#fecha',form).val(),
      fechasemana : $('#fechasemana',form).val(),
      operador    : $('#operador',form).val(),
      seminarios  : $('#seminario',form ).val(),
      check       : $('#chksemi',form ).prop('checked'),
      checkcarta  : $('#chkcarta',form ).prop('checked'),
      checkcomp   : $('#chkcomp',form ).prop('checked'),
      arma        : $('#armasmanejo',form).val(),
      cartuchos   : $('#dspmanejo',form).val(), 
      precio      : $('#precio',form).val(),
      correo      : $('#correo',form).val(),
      telefono    : $('#telefono',form).val(),
      direccion   : $('#direccion',form).val(),
      academia    : 'ACADEMIA COGNOSEGURIDAD LTDA',
      nro         : '',
      idpdt       : $('#idpdt',form).val(),
      pdt         : $('#pdt',form).val()
    }

    if(data_form.documento.length == 0) {
      msj += "Ingresar Documento de Identidad <br>";
  
    }else if(!validarnumeros(data_form.documento)){
      msj += "Documento de Identidad debe ser numérico <br>";
    }else if(data_form.documento < 100000){
      msj += "Documento de Identidad Invalido <br>";
    }

    if (data_form.apellido1.length == 0){
      msj += "Ingresar Primer Apellido <br>";
    }else if(!validarletras(data_form.apellido1)){
      msj += "Primer Apellido solo debe contener Letras <br>";
    }

    if ((data_form.apellido2.length !== 0)  && (!validarletras(data_form.apellido2))){
      msj += "Segundo Apellido solo debe contener Letras <br>";
    }

    if (data_form.nombre1.length == 0){
      msj += "Ingresar Primer Nombre <br>";
    }else if(!validarletras(data_form.nombre1)){
      msj += "Primer Apellido solo debe contener Letras <br>";
    }

    if (data_form.nombre2.length !== 0 && !validarletras(data_form.nombre2)){
      msj += "Segundo Nombre solo debe contener Letras <br>";
    }

    if( data_form.fecha.length == 0) {
      msj += "Ingresar Fecha de Emisión <br>";
    }else{
      var fechauno = new Date();
      var fechados = new Date(data_form.fecha);
      var resultado = fechauno.getTime() < fechados.getTime();

      if(resultado === true){
        msj += "La Fecha no puede ser mayor a hoy <br>";
      //}else{ 
      //  var fechaintro = new Date(fecha.value);
      //  if (fechaintro.getDay()!==4){
      //    msj += "La Fecha debe ser un viernes <br>";
      //  }else{
      //    var diff = fechauno - fechados;
      //    diferenciaDias = Math.floor(diff / (1000 * 60 * 60 * 24));
      //    if (diferenciaDias>21){
      //      msj += "La Fecha es muy antigua <br>";
      //    }
      //  }
      }
    }

    if(data_form.precio.precio == 0) {
      msj += "Ingresar Precio <br>";
  
    }else if(!validarnumeros(data_form.precio)){
      msj += "Precio debe ser numérico <br>";
    }else if(data_form.documento < 0){
      msj += "Precio Invalido <br>";
    }

    if (data_form.correo.length == 0) {
      msj += "Ingresar Correo Electronico <br>";
    }else{
      var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!expr.test(data_form.correo)) {
          msj += "Ingresar Correo Electronico VALIDO <br>";
      }
    }

    if(data_form.telefono.length < 10) {
      msj += "Ingresar Número Telefónico <br>";
  
    }else if(!validarnumeros(data_form.telefono)){
      var expr = /^(\d{10})$/;
      if (!expr.test(data_form.telefono)) {
        msj += "Ingresar Número Telefónico VALIDO <br>";
      }
    }
    
    if(data_form.check){
      if(data_form.seminarios.length == 0) {
        msj += "Seleccione Seminario(s) <br>";
      }
    }

    if (msj.length > 0 ){
      $('#card-msj').show();
      $('#mensaje').html(msj); 
      return false;
    } else {
      var url_php = "sysnros-validar-nro.php";
      
      $.ajax({
        beforeSend : function(){
          $('#card-loader').show();
          },
        type:'POST',
        url: url_php,
        data: data_form,
        dataType: 'json',
        async: true,
      }).done(function ajaxDone(res){
        if(res.error !== undefined){
          $('#card-msj').show();
          $('#mensaje').html(res.error); 
          return false;
        }

        if(res.url !== undefined){
          Swal.fire({
            position: 'center-centet',
            icon: 'success',
            title: 'Certificado Emitido !!!',
            showConfirmButton: false,
            timer: 2500
          })

          if(res.dwn !== 'N') { 
            $("#oculto").attr('src', res.zip); 
            location.reload();
          }

          location.reload();
        }

        if(res.time !== undefined){
          location.href = res.time;
        }
        
      }).fail(function( jqXHR, textStatus, errorThrown ){
        
        console.log('fallo la llamada ajax en formulario.');
        console.log(textStatus);
        console.log(errorThrown);
        console.log('Uncaught Error: ' + jqXHR.responseText);
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada ajax.');
        $('#card-loader').hide();
      });  

      return false;
    }
    
  });


  //***********************************************************************************************//
  //*********************** VALIDACION FORMULARIO CORRECCIONES ************************************//
  //***********************************************************************************************//
  $(document).on('submit', '#form-mdf', function(evento){

    evento.preventDefault();     
    $('#card-msj').hide();
    var msj = '';
    var form = $(this);


    var data_form = {
      nro         : $('#nro',form).val(),
      documento   : $('#documento',form).val(),
      apellido1   : $('#apellido1',form).val(),
      apellido2   : $('#apellido2',form).val(),
      nombre1     : $('#nombre1',form).val(),
      nombre2     : $('#nombre2',form).val(),
      curso       : $('#curso',form).val(),
      fecha       : $('#fecha',form).val(),
      acta        : $('#acta',form).val(),
      asignado    : $('#asignado',form).val()
    }

    

    if (data_form.nro.length == 0){
      msj += "Ingresar NRO <br>";
    }

    if(data_form.documento.length == 0) {
      msj += "Ingresar Documento de Identidad <br>";
  
    }else if(!validarnumeros(data_form.documento)){
      msj += "Documento de Identidad debe ser numérico <br>";
    }else if(data_form.documento < 100000){
      msj += "Documento de Identidad Invalido <br>";
    }

    if (data_form.apellido1.length == 0){
      msj += "Ingresar Primer Apellido <br>";
    }else if(!validarletras(data_form.apellido1)){
      msj += "Primer Apellido solo debe contener Letras <br>";
    }

    if ((data_form.apellido2.length !== 0)  && (!validarletras(data_form.apellido2))){
      msj += "Segundo Apellido solo debe contener Letras <br>";
    }

    if (data_form.nombre1.length == 0){
      msj += "Ingresar Primer Nombre <br>";
    }else if(!validarletras(data_form.nombre1)){
      msj += "Primer Apellido solo debe contener Letras <br>";
    }

    if (data_form.nombre2.length !== 0 && !validarletras(data_form.nombre2)){
      msj += "Segundo Nombre solo debe contener Letras <br>";
    }

    if( data_form.fecha.length == 0) {
      msj += "Ingresar Fecha de Emisión <br>";
    }else{
      var fechauno = new Date();
      var fechados = new Date(data_form.fecha);
      var resultado = fechauno.getTime() < fechados.getTime();

      if(resultado === true){
        msj += "La Fecha no puede ser mayor a hoy <br>";
      }
    }
    
    
    if (msj.length > 0 ){
      $('#card-msj').show();
      $('#mensaje').html(msj); 
      return false;
    } else {
      var url_php = "sysnros-validar-correcciones.php";
      
      $.ajax({
        beforeSend : function(){
          $('#card-loader').show();
          },
        type:'POST',
        url: url_php,
        data: data_form,
        dataType: 'json',
        async: true,
      }).done(function ajaxDone(res){
        if(res.error !== undefined){
          $('#card-msj').show();
          $('#mensaje').html(res.error); 
          return false;
        }
        if(res.url !== undefined){
          Swal.fire({
            position: 'center-centet',
            icon: 'success',
            title: 'Certificado Enviado a Corregir !!!',
            showConfirmButton: false,
            timer: 2000
          })
		    if(res.dwn !== 'N') { $("#oculto").attr('src', res.zip); }
            //location.reload();
        }
        frm_modificar()
      }).fail(function( jqXHR, textStatus, errorThrown ){
        
        console.log('fallo la llamada ajax en Correcciones.');
        console.log(textStatus);
        console.log(errorThrown);
        console.log('Uncaught Error: ' + jqXHR.responseText);
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada ajax.');
        $('#card-loader').hide();
      }); 

      return false;
    }
    
  });

  //***********************************************************************************************//
  //******************************** VALIDACION FORMULARIO MASIVO *********************************//
  //***********************************************************************************************//
  $(document).on('submit', '#form-masivo', function(evento){
    evento.preventDefault();
    $('#card-msj').hide();
    var msj = '';
    var form = $(this);

    var csvupload = $('#archivo').prop('files')[0];
    var fechasemana = $('#fechasemana',form).val(); 
    var archivocsv = new FormData;
    archivocsv.append('archivo',csvupload);
    archivocsv.append('fechasemana',fechasemana);

    
    

    var data_form = {
      archivo : $('#archivo',form).val(),
    }


    var valor = data_form.archivo;
    var extPermitidas = /(.csv|.CSV)$/i;

    if(data_form.archivo.length == 0) {
      msj += "Debe seleccionar Archivo CSV <br>";
  
    }else if(!extPermitidas.exec(valor)){
      msj += "El archivo debe ser .CSV <br>";
    }

    

    if (msj.length > 0 ){
      $('#card-msj').show();
      $('#mensaje').html(msj); 
      return false;
    } else {
      var url_php = "sysnros-validar-masivo.php";
      $.ajax({
        beforeSend : function(){
          $('#card-loader').show();
          },
        type:'POST',
        url: url_php,
        data: archivocsv,
        contentType: false,
        processData: false,
        dataType: 'json',
        async: true,

      }).done(function ajaxDone(res){
        if(res.error !== undefined){
          $('#card-msj').show();
          $('#mensaje').html(res.error); 
          $('#form-masivo')[0].reset();
          //document.getElementById('form-masivo').reset();
          return false;
        }
        if(res.url !== undefined){
          Swal.fire({
            position: 'center-centet',
            icon: 'success',
            title: 'Certificados Emitidos !!!',
            showConfirmButton: false,
            timer: 2500
          })
		  if(res.dwn !== 'N') { $("#oculto").attr('src', res.zip); }
          window.location = res.url;
        }
      }).fail(function( jqXHR, textStatus, errorThrown ){
        
        console.log('fallo la llamada ajax en masivo.');
        console.log(textStatus);
        console.log(errorThrown);
        console.log('Uncaught Error: ' + jqXHR.responseText);
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada ajax.');
        $('#card-loader').hide();
      }); 
      return false;
    }
  });
	
  //******************************** VALIDACION FORMULARIO AUTOGESTION *********************************//

  $(document).on('submit', '#form-autogestion', function(evento){

    evento.preventDefault();     
    $('#card-msj').hide();
    var msj = '';
    var form = $(this);

    var autogestion = $('#autogestion',form).val();
    var fechaautogestion = $('#fechaautogestion',form).val();
    var monto = $('#monto',form).val();
    var detalle = $('#detalle',form).val();
    var soporte = $('#soporte').prop('files')[0];
    
    var frmDATA = new FormData;

    frmDATA.append('autogestion',autogestion);
    frmDATA.append('fechaautogestion',fechaautogestion);
    frmDATA.append('monto',monto);
    frmDATA.append('detalle',detalle);
    frmDATA.append('soporte',soporte);

    // var data_form = {
    //   autogestion      : $('#autogestion',form).val(),
    //   fechaautogestion : $('#fechaautogestion',form).val(),
    //   monto            : $('#monto',form).val(),
    //   detalle          : $('#detalle',form).val(),
    //   soporte          : $('#soporte').prop('files')[0]
    // }

    var extPermitidas = /(.png|.gif|.jpg|.jpeg|.pdf|.PNG|.GIF|.JPG|.JPEG|.PDF)$/i;

    if (monto == 0){
      msj += "Ingresar Monto a Recargar <br>";
    }else if(!validarsaldos(monto)){
      msj += "Solo ingresar numeros en Monto a Recargar<br>";
    }

    if (detalle.length == 0){
      msj += "Ingresar Detalle de la Recarga <br>";
    }

    
    
    if (soporte == undefined){
      msj += "Ingresar Soporte <br>";
    }else{
      if(soporte.length !== 0) {
        
        //var filename = $('#soporte').val().replace(/C:\\fakepath\\/i, '');
        var valor = $('#soporte').val().replace(/C:\\fakepath\\/i, '');
        if(!extPermitidas.exec(valor)){
            msj += "Archivo:  "+valor+"  NO PERMITIDO <br>";
        }
      }
    }

    if (msj.length > 0 ){
      $('#card-msj').show();
      $('#mensaje').html(msj); 
      return false;
    } else {

      Swal.fire({
        title: '¡¡¡ Advertencia !!!',
        text: "¿Confirma la Recarga?",
        imageUrl: 'img/advertencia-mano.png',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'NO',
        confirmButtonText: ' SI '
      }).then((result) => {
        if (result.isConfirmed) {
          var url_php = "sysnros-validar-recarga.php";
          $.ajax({

            beforeSend : function(){$('#card-loader').show();},

            type        :'POST',
            url         : url_php,
            data        : frmDATA,
            contentType : false,
            processData : false,
            dataType    : 'json',
            async       : true,

          }).done(function ajaxDone(res){
            if(res.error !== undefined){
              $('#card-msj').show();
              $('#mensaje').html(res.error); 
              return false;
            }
            if(res.url !== undefined){
              Swal.fire({
                position: 'center-centet',
                icon: 'success',
                title: 'Recarga Realizada !!!',
                showConfirmButton: false,
                timer: 2000
              })
            }
            location.href = res.url;
            
          }).fail(function( jqXHR, textStatus, errorThrown ){
            
            console.log('fallo la llamada ajax en Correcciones.');
            console.log(textStatus);
            console.log(errorThrown);
            console.log('Uncaught Error: ' + jqXHR.responseText);
          }).always(function ajaxSiempre(){
            console.log('Final de la llamada ajax.');
            $('#card-loader').hide();
          }); 
          return false;
        }
      });  
    }   
  });

  //******************************** VALIDACION AUTORIZACION RECARGAS *********************************//

  $(document).on('click', '#btn-pass', function(evento){
    evento.preventDefault()
    $('#card-msj').hide();
    var msj = '';
    
    var passw = $('#autorizacion').val();
    
    
    
    if (passw.length == 0){
      msj += "Debe ingresar: Contraseña <br>";
    }
    
    if (msj.length > 0 ){
      $('#card-msj').show();
      $('#mensaje').html(msj); 
      return false;
    } else {

      var frmdata = new FormData;
      frmdata.append('password',passw);
      
      var url_php = "sysnros-validar-autorizacion.php";


      $.ajax({
        type:'POST',
        url: url_php,
        data: frmdata,
        contentType: false,
        processData: false,
        dataType: 'json',
        async: true,
      }).done(function ajaxDone(res){
        if(res.error !== undefined){
          $('#card-msj').show();
          $('#mensaje').html(res.error); 
          return false;
        }
        if(res.login !== undefined){
          $('#idautorizacion').attr('hidden',true); 
          $('#form-autogestion').attr('hidden',false); 
        }
      }).fail(function ajaxFail(res){
        console.log('fallo la llamada ajax autorizacion.');
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada ajax autorizacion.');
      }); 
      return false;
    }
  });

  //***********************************************************************************************//
  //********************************** BUSQUEDA DE DATOS NRO **************************************//
  //***********************************************************************************************//
  $('#documento').blur(function() {
    
      if($('#documento').val()) {
        let search = $('#documento').val();
        
        $.ajax({
          url: 'sysnros-buscar.php',
          data: {search},
          type: 'POST',
          success: function(respuesta) {
            if(!respuesta.error) {
              let datos = JSON.parse(respuesta);
              if (datos.length!=0){   
                $("#apellido1").val(datos[datos.length-1]['1apellido']);
                $("#apellido2").val(datos[datos.length-1]['2apellido']);
                $("#nombre1").val(datos[datos.length-1]['1nombre']);
                $("#nombre2").val(datos[datos.length-1]['2nombre']);
                
              }else{

                $("#apellido1").val('');
                $("#apellido2").val('');
                $("#nombre1").val('');
                $("#nombre2").val('');
              }
            }
          } 
        })
      }
    });


  //***********************************************************************************************//
  //*************************** BUSQUEDA DE DATOS MODIFICAR  **************************************//
  //***********************************************************************************************//
  $('#nro').blur(function() {
    
    if($('#nro').val()) {
      let search = $('#nro').val();
      
      $.ajax({
        url: 'sysnros-buscar-nro.php',
        data: {search},
        type: 'POST',
        success: function(respuesta) {
          if(!respuesta.error) {
            let datos = JSON.parse(respuesta);
            if (datos.length!=0){   

              var fec = datos[datos.length-1]['fecha'].split('/');
              var f = fec[2]+'/'+fec[1]+'/'+fec[0];
              var fecha = new Date(f);
              
              var diaNro = fecha.getDate();
              var mesNro = fecha.getMonth()+1;
              var anoNro = fecha.getFullYear();
              $("#documento").val(datos[datos.length-1]['documento']);
              $("#apellido1").val(datos[datos.length-1]['1apellido']);
              $("#apellido2").val(datos[datos.length-1]['2apellido']);
              $("#nombre1").val(datos[datos.length-1]['1nombre']);
              $("#nombre2").val(datos[datos.length-1]['2nombre']);
              $("#curso").val(datos[datos.length-1]['codigo']);$("#curso").focus();$("#curso").select();
              $("#fecha").val(anoNro+'-'+("0"+mesNro).slice(-2)+'-'+("0"+diaNro).slice(-2));
              $("#acta").val(datos[datos.length-1]['acta']);
              $("#asignado").val(datos[datos.length-1]['asignado']);
            }else{
              $("#documento").val('');
              $("#apellido1").val('');
              $("#apellido2").val('');
              $("#nombre1").val('');
              $("#nombre2").val('');
              $("#curso").val('');
              $("#fecha").val('');
              $("#acta").val('');
              $("#asignado").val('');
            }
          }
        } 
      })
    }
  });


    $(document).on('change', '#chksemi', function(){

      if($(this).prop('checked')){
        $('#seminario').show();
      }else{
        $('#seminario').hide();
      }
    });


    $(document).on('change', '#chknuevo', function(){

      if($(this).prop('checked')){
        $('#seminario1').hide();
        $('#nombre').show();
        $('#intensidad').show();
        $('#empresas').show();
      }else{
        $('#seminario1').show();
        $('#nombre').hide();
        $('#intensidad').hide();
        $('#empresas').hide();
      }
    });


    //***********************************************************************************************//
    //********************************** VALIDACION SALIDA DEL SISTEMA ******************************//
    //***********************************************************************************************//
    $(document).on('click', '#item-salir', function(evento){
      evento.preventDefault();
      Swal.fire({
        title: '¡¡¡ Advertencia !!!',
        text: "¿Confirma Salir del Sistema?",
        imageUrl: 'img/advertencia-mano.png',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'NO',
        confirmButtonText: ' SI '
      }).then((result) => {
        if (result.isConfirmed) {
          window.location = "sysnros-logout.php";
        }
      })
      
    });


  //***********************************************************************************************//
  //******************************** VALIDACION FORMULARIO CARTAS *********************************//
  //***********************************************************************************************//
  $(document).on('submit', '#form-carta', function(evento){

    evento.preventDefault();     
    $('#card-msj').hide();
    var msj = '';
    var form = $(this);
    

    var data_form = {
      documento : $('#documento',form).val(),
      apellido1 : $('#apellido1',form).val(),
      apellido2 : $('#apellido2',form).val(),
      nombre1 : $('#nombre1',form).val(),
      nombre2 : $('#nombre2',form).val(),
      academia : $('#academia',form).val(),
      nro : $('#nro',form).val(),
      curso : $('#cursocartas',form).val(),
      fecha : $('#fechacar',form).val(),
      arma : $('#armasmanejo',form).val(),
      cartuchos : $('#dspmanejo',form).val()
      //arma : $('input:radio[name=arma]:checked').val(),
      //cartuchos : $('input:radio[name=cartuchos]:checked').val()
    }

    if(data_form.documento.length == 0) {
      msj += "Ingresar Documento de Identidad <br>";
  
    }else if(!validarnumeros(data_form.documento)){
      msj += "Documento de Identidad debe ser numérico <br>";
    }else if(data_form.documento < 100000){
      msj += "Documento de Identidad Invalido <br>";
    }

    if (data_form.apellido1.length == 0){
      msj += "Ingresar Primer Apellido <br>";
    }else if(!validarletras(data_form.apellido1)){
      msj += "Primer Apellido solo debe contener Letras <br>";
    }

    if ((data_form.apellido2.length !== 0)  && (!validarletras(data_form.apellido2))){
      msj += "Segundo Apellido solo debe contener Letras <br>";
    }

    if (data_form.nombre1.length == 0){
      msj += "Ingresar Primer Nombre <br>";
    }else if(!validarletras(data_form.nombre1)){
      msj += "Primer Apellido solo debe contener Letras <br>";
    }

    if (data_form.nombre2.length !== 0 && !validarletras(data_form.nombre2)){
      msj += "Segundo Nombre solo debe contener Letras <br>";
    }

    if (data_form.academia.length == 0){
      msj += "Ingresar Academia <br>";
    }

    if (data_form.nro.length == 0 || data_form.nro == 'ECSP1162-'){
      msj += "Ingresar Número NRO <br>";
    }

    if( data_form.fecha.length == 0) {
      msj += "Ingresar Fecha de Emisión <br>";
    }else{
      
      var fechauno = new Date();
      var fechados = new Date(data_form.fecha.value);
      var resultado = fechauno.getTime() < fechados.getTime();
      
  
      if(resultado === true){
        msj += "La Fecha no puede ser mayor a hoy <br>";
      }
    }

    if (msj.length > 0 ){
      $('#card-msj').show();
      $('#mensaje').html(msj); 
      return false;
    } else {
      var url_php = "sysnros-validar-cartas.php";
      
      $.ajax({
        beforeSend : function(){
          $('#card-loader').show();
          },
        type:'POST',
        url: url_php,
        data: data_form,
        dataType: 'json',
        async: true,
      }).done(function ajaxDone(res){
        if(res.error !== undefined){
          $('#card-msj').show();
          $('#mensaje').html(res.error); 
          return false;
        }
        if(res.url !== undefined){
          Swal.fire({
            position: 'center-centet',
            icon: 'success',
            title: 'Carta de Tiro Emitida !!!',
            showConfirmButton: false,
            timer: 2500
          })
			if(res.dwn !== 'N') { $("#oculto").attr('src', res.zip); }
          	location.reload();
        }
      }).fail(function( jqXHR, textStatus, errorThrown ){
        
        console.log('fallo la llamada ajax en carta.');
        console.log(textStatus);
        console.log(errorThrown);
        console.log('Uncaught Error: ' + jqXHR.responseText);
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada ajax.');
        $('#card-loader').hide();
      }); 

      return false;
    }



    
  });

  //***********************************************************************************************//
  //************************* VALIDACION FORMULARIO REPORTE CAPACITACIONES ************************//
  //***********************************************************************************************//
  $(document).on('submit', '#form-rptcapa', function(evento){
    evento.preventDefault();     
    $('#card-msj').hide();
    var msj = '';
    var form = $(this);
    

    var data_form = {
      fecha1   : $('#rptfecha1',form).val(),
      fecha2   : $('#rptfecha2',form).val(),
      reporte : $('input:radio[name=optrep]:checked').val()
    }
    
    if(data_form.fecha1.length == 0) {
      msj += "Ingresar Fecha Desde <br>";
    }
    if(data_form.fecha2.length == 0) {
      msj += "Ingresar Fecha Hasta <br>";
    }
    if(data_form.fecha2 < data_form.fecha1 ) {
      msj += "Ingresar Fecha Correctamente (La fecha desde es mayor) <br>"; 
    }


    if (msj.length > 0 ){
      $('#card-msj').show();
      $('#mensaje').html(msj); 
      return false;
    } else {
      var url_php = "sysnros-validar-rptcap.php";
      
      $.ajax({
        beforeSend : function(){
          $('#card-loader').show();
          },
        type:'POST',
        url: url_php,
        data: data_form,
        dataType: 'json',
        async: true,
      }).done(function ajaxDone(res){
        if(res.error !== undefined){
          $('#card-msj').show();
          $('#mensaje').html(res.error); 
          return false;
        }
        if(res.url !== undefined){
          Swal.fire({
            position: 'center-centet',
            icon: 'success',
            title: 'Reporte Descargado !!!',
            showConfirmButton: false,
            timer: 2500
          })
          $("#oculto").attr('src', res.url);
          //window.location = res.url;
        }
      }).fail(function( jqXHR, textStatus, errorThrown ){
        
        console.log('fallo la llamada ajax en rpt capacitaciones.');
        console.log(textStatus);
        console.log(errorThrown);
        console.log('Uncaught Error: ' + jqXHR.responseText);
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada ajax.');
        $('#card-loader').hide();
      }); 

      return false;
    }
  });


  //***********************************************************************************************//
  //************************ VALIDACION FORMULARIO SEMINARIOS / CURSOS **************************//
  //*********************************************************************************************//
  $(document).on('submit', '#form-semcur', function(evento){

    evento.preventDefault();     
    $('#card-msj').hide();
    var msj = '';
    var form = $(this);
    var isChecked = document.getElementById('chknuevo').checked;

    var data_form = {
      documento  : $('#documento',form).val(),
      apellido1  : $('#apellido1',form).val(),
      apellido2  : $('#apellido2',form).val(),
      nombre1    : $('#nombre1',form).val(),
      nombre2    : $('#nombre2',form).val(),
      curso      : $('#seminario1',form).val(),
      arma       : $('#armasmanejo',form).val(),
      disparos   : $('#dspmanejo',form).val(),
      nuevo      : isChecked,
      nombre     : $('#nombre',form).val(),
      intensidad : $('#intensidad',form).val(),
      empresas   : $('#empresas',form).val(),
      fecha      : $('#fechasemcur',form).val()
    }

    
    if(data_form.documento.length == 0) {
      msj += "Ingresar Documento de Identidad <br>";
  
    }else if(!validarnumeros(data_form.documento)){
      msj += "Documento de Identidad debe ser numérico <br>";
    }else if(data_form.documento < 100000){
      msj += "Documento de Identidad Invalido <br>";
    }

    if (data_form.apellido1.length == 0){
      msj += "Ingresar Primer Apellido <br>";
    }else if(!validarletras(data_form.apellido1)){
      msj += "Primer Apellido solo debe contener Letras <br>";
    }

    if ((data_form.apellido2.length !== 0)  && (!validarletras(data_form.apellido2))){
      msj += "Segundo Apellido solo debe contener Letras <br>";
    }

    if (data_form.nombre1.length == 0){
      msj += "Ingresar Primer Nombre <br>";
    }else if(!validarletras(data_form.nombre1)){
      msj += "Primer Apellido solo debe contener Letras <br>";
    }

    if (data_form.nombre2.length !== 0 && !validarletras(data_form.nombre2)){
      msj += "Segundo Nombre solo debe contener Letras <br>";
    }

    if( data_form.fecha.length == 0) {
      msj += "Ingresar Fecha de Emisión <br>";
    }else{
      var fechauno = new Date();
      var fechados = new Date(data_form.fecha);
      var resultado = fechauno.getTime() < fechados.getTime();

      if(resultado === true){
        msj += "La Fecha no puede ser mayor a hoy <br>";
      }
    }

    
    if(isChecked){
      if (data_form.nombre.length == 0){
        msj += "Ingresar Nombre del Seminario / Curso <br>";
      }
      if (data_form.intensidad.length == 0){
        msj += "Ingresar Intensidad Horaria <br>";
      }
    
    }

    if (msj.length > 0 ){
      $('#card-msj').show();
      $('#mensaje').html(msj); 
      return false;
    } else {
      var url_php = "sysnros-validar-semcur.php";
      
      $.ajax({
        beforeSend : function(){
          $('#card-loader').show();
          },
        type:'POST',
        url: url_php,
        data: data_form,
        dataType: 'json',
        async: true,
      }).done(function ajaxDone(res){
        if(res.error !== undefined){
          $('#card-msj').show();
          $('#mensaje').html(res.error); 
          return false;
        }
        if(res.url !== undefined){
          Swal.fire({
            position: 'center-centet',
            icon: 'success',
            title: 'Seminario / Curso Emitido !!!',
            showConfirmButton: false,
            timer: 2500
          })
		  if(res.dwn !== 'N') { $("#oculto").attr('src', res.zip); }
          location.reload();
        }
      }).fail(function( jqXHR, textStatus, errorThrown ){
        
        console.log('fallo la llamada ajax en Seminario / Curso.');
        console.log(textStatus);
        console.log(errorThrown);
        console.log('Uncaught Error: ' + jqXHR.responseText);
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada Seminario / Curso.');
        $('#card-loader').hide();
      }); 

      return false;
    }
  
  });  


  $(document).on('change', '#chkcarta', function(){

    if($(this).prop('checked')){
      $('#msjarma').show();
      $('#itmarma').show();
    }else{
      $('#msjarma').hide();
      $('#itmarma').hide();
    }
  });

  $(document).on('change', '#seminario1', function(evento){

      var armamento = $('#seminario1').val().substr(3,1);
      //if(($('#seminario1').val() == '007') || ($('#seminario1').val() == '009')){
      if(armamento == 'S'){
        $('#msjarma').show();
        $('#itmarma').show();
      }else{
        $('#msjarma').hide();
        $('#itmarma').hide();
      }
   
  });

  $(document).on('click', '#btn-abort', function(evento){ //*** BOTON CANCELAR ***//
    evento.preventDefault();
    window.location = "sysnros-tablero.php";
  });


  //*****************************************************************************************************************************************************************//
  //**************************************************************** BTN-PDT PARA PENDIENTES ************************************************************************//
  //*****************************************************************************************************************************************************************//


  $(document).on('click', '#btn-pdt', function(evento){ //*** BOTON PENDIENTES ***//
    evento.preventDefault();
    var objeto = {};
    
    var plantilla = '';
    
    var url_php = "sysnros-cargar-pdt.php";

    $.ajax({
      beforeSend : function(){
        $('#card-loader').show();
        },
      type:'POST',
      url: url_php,
      data: objeto,
      dataType: 'json',
      async: true,
    }).done(function ajaxDone(res){
      if(res.error !== undefined){
        $('#card-msj').show();
        $('#mensaje').html(res.error); 
        return false;
      }
      var varhtml = '';

      if(res.datos !== undefined){
        
        plantilla +=`<thead id="tabla-thead" class="table-dark">
                      <tr style="width: 680px">
            
                      <th style="width: 200px; color: #F5F5F5" scope="col">Operador</th>
                      <th style="width: 150px; color: #F5F5F5" scope="col">Alumno</th>
                      <th style="width: 100px; color: #F5F5F5" scope="col">Documento</th>
                      <th style="width: 350px; color: #F5F5F5" scope="col">Curso</th> 
                      <th style="width: 50x; color: #F5F5F5" scope="col">Cargar</th>
                      <th style="width: 50x; color: #F5F5F5" scope="col">Borrar</th>
                      </tr>
                    </thead>

                    <tbody id="tabla-body">`;

          $('#tabla-pdt').append(plantilla);
          plantilla ='';
              
        res.datos.forEach(data=>{
          
          
          plantilla += `<tr>
                            <td style="width: 200px">${data.operador}</td>
                            <td style="width: 150px">${data.alumno}</td>
                            <td style="width: 100px; text-align: right;">${data.documento}</td>
                            <td style="width: 350px">${data.curso}</td>
                            <td style="width: 80px">
                                <button id="btn-cargar-pdt" class="btn btn-primary" onclick="" value="${data.id}/${data.codope}/${data.ape1}/${data.ape2}/${data.nom1}/${data.nom2}/${data.documento}/${data.codcur}/${data.telefono}/${data.direccion}/${data.correo}/${data.precio}"></button>
                            </td>
                            <td style="width: 80px">
                                <button id="btn-del-pdt" class="btn btn-danger
                                " onclick="" value="${data.id}/${data.ape1}/${data.ape2}/${data.nom1}/${data.nom2}/${data.documento}/${data.codcur}"></button>
                            </td>
                      <tr>`;

          $('#tabla-body').append(plantilla);
          plantilla ='';
        });
        plantilla += `</tbody>`;
        $('#tabla-body').append(plantilla);
        $('#modal').modal("show");
        plantilla ='';
        
      }
    }).fail(function( jqXHR, textStatus, errorThrown ){
      console.log('fallo la llamada ajax en formulario.');
      console.log(textStatus);
      console.log(errorThrown);
      console.log('Uncaught Error: ' + jqXHR.responseText);
    }).always(function ajaxSiempre(){
      console.log('Final de la llamada ajax.');
      $('#card-loader').hide();
    }); 
    return false;
  });



  //*****************************************************************************************************************************************************************//
  //*************************************************************** FIN BTN-CARGAR-PDT ******************************************************************************//
  //*****************************************************************************************************************************************************************//

  $(document).on('click', '#btn-cargar-pdt', function(evento){ //*** BOTON CARGAR PENDIENTES ***//
    evento.preventDefault();
    var objeto = {};
    var datos = this.value.split('/');
    
    $("#documento").val(datos[6]);
    $("#apellido1").val(datos[2]);
    $("#apellido2").val(datos[3]);
    $("#nombre1").val(datos[4]);
    $("#nombre2").val(datos[5]);
    $("#curso").val(datos[7]);$("#curso").focus();$("#curso").select();
    $("#telefono").val(datos[8]);
    $("#direccion").val(datos[9]);
    $("#correo").val(datos[10]);
    $("#precio").val(datos[11]);
    $("#operador").val(datos[1]);
    $("#idpdt").val(datos[0]);
    $("#pdt").val("S");

    document.getElementById('telefono').readOnly = true;
    document.getElementById('correo').readOnly = true;
    document.getElementById('direccion').readOnly = true;


    $('#tabla-thead').remove();
    $('#tabla-body').remove();
    $('#modal').modal("hide");
  });
  

  //*****************************************************************************************************************************************************************//
  //*************************************************************** FIN BTN-CARGAR-CORRECCION ***********************************************************************//
  //*****************************************************************************************************************************************************************//

  $(document).on('click', '#btn-cargar-correccion', function(evento){ //*** BOTON CARGAR CORRECCIONES ***//
    evento.preventDefault();
    var objeto = {};
    var datos = this.value.split('/');

    
    var f = datos[8]+'/'+datos[7]+'/'+datos[6];
    var fecha = new Date(f);
    
    var diaNro = fecha.getDate();
    var mesNro = fecha.getMonth()+1;
    var anoNro = fecha.getFullYear();

    $("#nro").val('ECSP1162-'+datos[0]);
    $("#apellido1").val(datos[1]);
    $("#apellido2").val(datos[2]);
    $("#nombre1").val(datos[3]);
    $("#nombre2").val(datos[4]);
    $("#documento").val(datos[5]);
    $("#fecha").val(anoNro+'-'+("0"+mesNro).slice(-2)+'-'+("0"+diaNro).slice(-2));
    $("#curso").val(datos[9]);$("#curso").focus();$("#curso").select();
    $("#acta").val(datos[10]);
    $("#asignado").val(datos[11]);
    $('#tabla-thead').remove();
    $('#tabla-body').remove();
    $('#modal').modal("hide");
    $('#btnenviar').click();
  });


  //*****************************************************************************************************************************************************************//
  //*************************************************************** BTN-DEL-PDT *************************************************************************************//
  //*****************************************************************************************************************************************************************//

  $(document).on('click', '#btn-del-pdt', function(evento){ //*** BOTON ELIMINAR PENDIENTES ***//
    evento.preventDefault();
    var objeto = {};
    var datos = this.value.split('/');
    var nombres = datos[1]+" "+datos[2]+" "+datos[3]+" "+datos[4]
    
    $("#idpdt").val(datos[0]);

    var form = $(this);

    var data_form = {
      idpdt       : datos[0],
      documento   : datos[5],
      codcurso    : datos[6]
    }

    var resultado = window.confirm('Seguro de Eliminar Pendiente: '+nombres);
    if (resultado === true) {
      var url_php = "sysnros-borrar-pdt.php";
      $.ajax({
        beforeSend : function(){
          $('#card-loader').show();
          },
        type:'POST',
        url: url_php,
        data: data_form,
        dataType: 'json',
        async: true,
      }).done(function ajaxDone(res){
        if(res.error !== undefined){
          $('#card-msj').show();
          $('#mensaje').html(res.error); 
          return false;
        }
        if(res.borrar !== undefined){
          
          $('#tabla-thead').remove();
          $('#tabla-body').remove();
          $('#modal').modal("hide");
          $('#btn-pdt').click();
         
        }
      }).fail(function( jqXHR, textStatus, errorThrown ){
        
        console.log('fallo la llamada ajax en borrar pendiente.');
        console.log(textStatus);
        console.log(errorThrown);
        console.log('Uncaught Error: ' + jqXHR.responseText);
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada ajax.');
        $('#card-loader').hide();
      });
        
    }

    return false;

  });

  //*****************************************************************************************************************************************************************//
  //*************************************************************** BTN-DEL-CORRECCIONES ****************************************************************************//
  //*****************************************************************************************************************************************************************//

  $(document).on('click', '#btn-del-correccion', function(evento){ //*** BOTON ELIMINAR PENDIENTES ***//
    evento.preventDefault();
    var objeto = {};
    var datos = this.value.split('/');
    var nombres = datos[1]+" "+datos[2]+" "+datos[3]+" "+datos[4]
    
    $("#idpdt").val(datos[0]);

    var form = $(this);

    var data_form = {
      nro         : datos[0]
    }

    var resultado = window.confirm('Seguro de Eliminar Corrección: '+nombres);
    if (resultado === true) {
      var url_php = "sysnros-borrar-correccion.php";
      $.ajax({
        beforeSend : function(){
          $('#card-loader').show();
          },
        type:'POST',
        url: url_php,
        data: data_form,
        dataType: 'json',
        async: true,
      }).done(function ajaxDone(res){
        if(res.error !== undefined){
          $('#card-msj').show();
          $('#mensaje').html(res.error); 
          return false;
        }
        if(res.borrar !== undefined){
          
          $('#tabla-thead').remove();
          $('#tabla-body').remove();
          $('#modal').modal("hide");
          $('#btn-correccion').click();
         
        }
      }).fail(function( jqXHR, textStatus, errorThrown ){
        
        console.log('fallo la llamada ajax en borrar pendiente.');
        console.log(textStatus);
        console.log(errorThrown);
        console.log('Uncaught Error: ' + jqXHR.responseText);
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada ajax.');
        $('#card-loader').hide();
      });
        
    }

    return false;

  });


  //*****************************************************************************************************************************************************************//
  //**************************************************************** BTN-PDT PARA CORRECCIONES **********************************************************************//
  //*****************************************************************************************************************************************************************//


  $(document).on('click', '#btn-correccion', function(evento){ 
    //frm_modificar();
    evento.preventDefault();
    
    var objeto = {};
    
    var plantilla = '';
    
    var url_php = "sysnros-cargar-correciones.php";
    //var url_php = "sysnros-cargar-pdt.php";

    $.ajax({
      beforeSend : function(){
        $('#card-loader').show();
        },
      type:'POST',
      url: url_php,
      data: objeto,
      dataType: 'json',
      async: true,
    }).done(function ajaxDone(res){
      if(res.error !== undefined){
        $('#card-msj').show();
        $('#mensaje').html(res.error); 
        return false;
      }
      var varhtml = '';

      if(res.datos !== undefined){
        
        plantilla +=`<thead id="tabla-thead" class="table-dark">
                      <tr style="width: 680px">
            
                          <th style="width: 100px; color: #F5F5F5; text-align: center;" scope="col">Nro</th>
                          <th style="width: 250px; color: #F5F5F5; text-align: center;" scope="col">Alumno</th>
                          <th style="width: 100px; color: #F5F5F5; text-align: center;" scope="col">Documento</th>
                          <th style="width: 300px; color: #F5F5F5; text-align: center;" scope="col">Curso</th> 
                          <th style="width: 50px; color: #F5F5F5; text-align: center;" scope="col">Fecha</th> 
                          <th style="width: 50x; color: #F5F5F5; text-align: center;" scope="col">Cargar</th>
                          <th style="width: 50x; color: #F5F5F5; text-align: center;" scope="col">Borrar</th>
                      </tr>
                    </thead>

                    <tbody id="tabla-body">`;

          $('#tabla-correcion').append(plantilla);
          plantilla ='';
              
        res.datos.forEach(data=>{
          
          //varhtml += '<p>' + data.registro + ' - ' + data.nombres +'</p>';
          //var nro = data.nro.replace('ECSP1162-','');

          data.nro = data.nro.replace('ECSP1162-','');

          plantilla += `<tr>
                            <td style="width: 100px; text-align: center;">${data.nro}</td>
                            <td style="width: 250px">${data.alumno}</td>
                            <td style="width: 100px; text-align: right;">${data.documento}</td>
                            <td style="width: 300px">${data.curso}</td>
                            <td style="width: 50px">${data.fecha}</td>
                            <td style="width: 80px">
                                <button id="btn-cargar-correccion" class="btn btn-primary" onclick="" value="${data.nro}/${data.ape1}/${data.ape2}/${data.nom1}/${data.nom2}/${data.documento}/${data.fecha}/${data.codcur}/${data.acta}/${data.asignado}" style="margin:0 auto;"></button>
                            </td>
                            <td style="width: 80px">
                                <button id="btn-del-correccion" class="btn btn-danger
                                " onclick="" value="${data.nro}/${data.ape1}/${data.ape2}/${data.nom1}/${data.nom2}/${data.documento}/${data.codcur}"></button>
                            </td>
                      <tr>`;

          $('#tabla-body').append(plantilla);
          plantilla ='';
        });
        plantilla += `</tbody>`;
        $('#tabla-body').append(plantilla);
        $('#modal').modal("show");
        plantilla ='';
        
      }
    }).fail(function( jqXHR, textStatus, errorThrown ){
      console.log('fallo la llamada ajax en formulario.');
      console.log(textStatus);
      console.log(errorThrown);
      console.log('Uncaught Error: ' + jqXHR.responseText);
    }).always(function ajaxSiempre(){
      console.log('Final de la llamada ajax.');
      $('#card-loader').hide();
    }); 
    return false;
  });


  $(document).on('click', '#btn-modal-cerrar', function(evento){ //*** BOTON CERRAR MODAL ***//
    evento.preventDefault();
    $('#tabla-thead').remove();
    $('#tabla-body').remove();
    $('#modal').modal("hide");
  });

  $(document).on('click', '#btn-modal-cerrar-correcion', function(evento){ //*** BOTON CERRAR MODAL CORRECCIONES***//
    evento.preventDefault();
    $('#tabla-thead').remove();
    $('#tabla-body').remove();
    $('#modal').modal("hide");
    $("#cuadro2").slideUp("slow");
		$("#cuadro1").slideDown("slow");
  });

  $('#modal').modal({backdrop: 'static', keyboard: false});

  

  function cargarCursos(){
    $.ajax({
      url: 'sysnros-cargarcursos.php',
      type: 'GET',
      success: function(respuesta) {
        var datos = JSON.parse(respuesta);
        var plantilla = '';
        datos.forEach(dato => {
          plantilla += '<option value='+dato.codigo+'>'+dato.curso+'</option>';
        });
        $('#curso').html(plantilla);$("#curso").select();
      }
    });

  }

  function cargarSeminarios(){
    $.ajax({
      url: 'sysnros-cargarseminarios.php',
      type: 'GET',
      success: function(respuesta) {
        var datos = JSON.parse(respuesta);
        var plantilla = '';
        datos.forEach(dato => {
          plantilla += '<option value='+dato.codigo+'>'+dato.nombre+'</option>';
        });
        $('#seminario').html(plantilla);
      }
    });

  }

  function cargarSemtodos(){
    $.ajax({
      url: 'sysnros-cargarsemtodos.php',
      type: 'GET',
      success: function(respuesta) {
        var datos = JSON.parse(respuesta);
        var plantilla = '';
        datos.forEach(dato => {
          plantilla += '<option value='+dato.codigo+dato.armamento+'>'+dato.nombre+'</option>';
        });
        $('#seminario1').html(plantilla);
      }
    });

  }

  function cargarCursosCartas(){
    $.ajax({
      url: 'sysnros-cargarcursoscartas.php',
      type: 'GET',
      success: function(respuesta) {
        var datos = JSON.parse(respuesta);
        var plantilla = '';
        datos.forEach(dato => {
          plantilla += '<option value='+dato.codigo+'>'+dato.curso+'</option>';
        });
        $('#cursocartas').html(plantilla);
      }
    });

  }

  function cargarOperadores(){
    $.ajax({
      url: 'sysnros-cargaroperadores.php',
      type: 'GET',
      success: function(respuesta) {
        var datos = JSON.parse(respuesta);
        var plantilla = '';
        datos.forEach(dato => {
          
          if (dato.codigo == dato.codcontable){   
            precio    = dato.precio11
            telefono  = dato.telefono
            correo    = dato.correo
            direccion = dato.direccion
          }
          plantilla += '<option value='+dato.codigo+'>'+dato.nombre+'</option>';
        });
        $('#operador').html(plantilla);$("#operador").select();
        $('#precio').val(precio);
        $('#telefono').val(telefono);
        $('#correo').val(correo);
        $('#direccion').val(direccion);
      }
    });
  }

  function cargarEmpresas(){
    $.ajax({
      url: 'sysnros-cargaremp.php',
      type: 'GET',
      success: function(respuesta) {
        var datos = JSON.parse(respuesta);
        var plantilla = '';
        datos.forEach(dato => {
          plantilla += '<option value='+dato.id+'>'+dato.nombre+'</option>';
        });
        $('#empresas').html(plantilla);
      }
    });
  }

  function cargarArmasDisparos(){
    //var armas    = new Array("Revolver", "Pistola", "Revolver y Pistola","Escopeta","Revolver y Escopeta","Pistola y Escopeta");
    //var disparos = new Array("6 Disparos","9 Disparos"); 

    $.ajax({
      url: 'sysnros-cargararmas.php',
      type: 'GET',
      success: function(respuesta) {
        var datos = JSON.parse(respuesta);
        var plantilla = '';
        datos.forEach(dato => {
          plantilla += '<option value='+dato.codigo+'>'+dato.arma+'</option>';
        });
        $('#armasmanejo').html(plantilla);
      }
    });

    $.ajax({
      url: 'sysnros-cargardisparos.php',
      type: 'GET',
      success: function(respuesta) {
        var datos = JSON.parse(respuesta);
        var plantilla = '';
        datos.forEach(dato => {
          var disp = dato.numero + ' disparos';
          plantilla += '<option value='+dato.codigo+'>'+disp+'</option>';
        });
        $('#dspmanejo').html(plantilla);
      }
    });

  }

  function cargarFecha(){
    var fechaActual = new Date();
    var fechaNro    = new Date();
    var fechasemcur = new Date();

    switch (fechaActual.getDay()){
      case 5:
        fechaNro = fechaActual;
        break;
      case 6:
        diasRestar = 1;
        fechaNro.setDate(fechaActual.getDate()-diasRestar)
        break;
      default:
        diasRestar = 2+fechaActual.getDay();
        fechaNro.setDate(fechaActual.getDate()-diasRestar);
        break;
    }
    
	  var dianro = fechaNro.getDate();
    var mesnro = fechaNro.getMonth()+1;
    var anonro = fechaNro.getFullYear();

    var diasemcur = fechasemcur.getDate();
    var messemcur = fechasemcur.getMonth()+1;
    var anosemcur = fechasemcur.getFullYear();
	  
    $("#fechasemcur").val(anosemcur+'-'+("0"+messemcur).slice(-2)+'-'+("0"+diasemcur).slice(-2));
    $("#fechacar").val(anosemcur+'-'+("0"+messemcur).slice(-2)+'-'+("0"+diasemcur).slice(-2));
	  $("#fecha").val(anonro+'-'+("0"+mesnro).slice(-2)+'-'+("0"+dianro).slice(-2));
    $("#fechasemana").val(anonro+'-'+("0"+mesnro).slice(-2)+'-'+("0"+dianro).slice(-2));
  }
	
	function cargarFechaRecarga(){
    var fechaActual = new Date();
  
	  var dianro = fechaActual.getDate();
    var mesnro = fechaActual.getMonth()+1;
    var anonro = fechaActual.getFullYear();
  
	  $("#fechaautogestion").val(anonro+'-'+("0"+mesnro).slice(-2)+'-'+("0"+dianro).slice(-2));
    
  }

  function validarnumeros(valor) {
    if(!/^([0-9])*$/.test(valor)){
      return false;
    } else {
      return true;
    }
  }
  function validarletras(valor) {

    if(!/^([A-Z ÑÁÉÍÓÚ])*$/.test(valor.toUpperCase())){
      return false;
    } else {
      return true;
    }
  }
	
	function validarsaldos(valor) {
    if(!/^([0-9 -])*$/.test(valor)){
      return false;
    } else {
      return true;
    }
  }

  function limites(){
      
      $.ajax({
        url: 'sysnros-limites.php',
        type: 'POST',
        dataType: 'json',
        async: true,
      }).done(function ajaxDone(res){
        if(res.error == undefined){
            alert('Sin Cupo de NROs... Contacte con en Administrador!!!');
          return false;
        }
        if(res.url !== undefined){
        
          window.location = res.url;
        }
      }).fail(function( jqXHR, textStatus, errorThrown ){
        
        console.log('fallo la llamada ajax en limites.');
        console.log(textStatus);
        console.log(errorThrown);
        console.log('Uncaught Error: ' + jqXHR.responseText);
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada ajax en limites.');
        $('#card-loader').hide();
      }); 

      return false;

  }

  function listar(){

    $("#cuadro2").slideUp("slow");
		$("#cuadro1").slideDown("slow");
    
    var table = $("#reporte").DataTable({

      //"destroy":true,
      "language": {
        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
            "sFirst":    "Primero",
            "sLast":     "Último",
            "sNext":     "Siguiente",
            "sPrevious": "Anterior"
        },
        "sProcessing":"Procesando..."
      },
      
      responsive: "true",
      processing: "true",
      dom: 'Bfrtilp',       
      buttons:[ 
        {
          extend:    'excelHtml5',
          text:      '<i class="fas fa-file-excel"></i> ',
          titleAttr: 'Exportar a Excel',
          className: 'btn btn-dark'
        },
        {
          extend:    'pdfHtml5',
          text:      '<i class="fas fa-file-pdf"></i> ',
          titleAttr: 'Exportar a PDF',
          className: 'btn btn-danger'
        },
        {
          extend:    'print',
          text:      '<i class="fa fa-print"></i> ',
          titleAttr: 'Imprimir',
          className: 'btn btn-warning'
        },
      ],        
      ajax:{
        "method" : "POST",
        "url"    : "sysnros-cargarlibro.php"
      },
      "columns" : [
        {"data":"expedicion"},
        {"data":"nombre"},
        {"data":"cedula"},
        {"data":"diploma"},
        {"data":"curso"},
        {"data":"agencia"},
        {"data":"acta", "visible":false },
        {"data":"intensidad", "visible":false},
        {"data":"codigo", "visible":false},
        {"data":"ape1", "visible":false},
        {"data":"ape2", "visible":false},
        {"data":"nom1", "visible":false},
        {"data":"nom2", "visible":false},
        {"data":"asignado", "visible":false},
        {"defaultContent": "<div style='text-align:center;'><button type='button' class='download btn btn-secundary'><i class='fas fa-download'></i></div>"},
        {"defaultContent": "<div style='text-align:center;'><button type='button' class='editar btn btn-secundary'><i class='fas fa-edit'></i></div>"}
        
      ],
      
    });

    obtener_listar("#reporte tbody", table);
    obtener_editar("#reporte tbody", table);
  } 


  $("#btn_volver").on("click", function(){
    //listar();
    $("#cuadro2").slideUp("slow");
		$("#cuadro1").slideDown("slow");
  });
  

  function obtener_listar(tbody, table) {

  
    $(tbody).on("click", "button.download", function(){
      var data = table.row($(this).parents("tr")).data();

      //evento.preventDefault();  
         
      $('#card-msj').hide();
      
      var data_form = {
        documento  : data.cedula,
        nombre     : data.nombre,
        nro        : 'ECSP1162-'+data.diploma,
        curso      : data.curso,
        fecha      : data.expedicion,
        intensidad : data.intensidad,
        codigo     : data.codigo,
        ape1       : data.ape1,
        ape2       : data.ape2,
        nom1       : data.nom1,
        nom2       : data.nom2
      }

      var url_php = "sysnros-validar-download.php";
      
      $.ajax({
        beforeSend : function(){
          $('#card-loader').show();
          },
        type:'POST',
        url: url_php,
        data: data_form,
        dataType: 'json',
        async: true,
      }).done(function ajaxDone(res){
        if(res.error !== undefined){
          $('#card-msj').show();
          $('#mensaje').html(res.error); 
          return false;
        }
        if(res.url !== undefined){
          Swal.fire({
            position: 'center-centet',
            icon: 'success',
            title: 'Certificado Descargado !!!',
            showConfirmButton: false,
            timer: 2500
          })
        
          var link = document.createElement('a');
          link.href = res.url;
          link.download = res.pdf;
          link.dispatchEvent(new MouseEvent('click'));
          
        }
      }).fail(function( jqXHR, textStatus, errorThrown ){
        
        console.log('fallo la llamada ajax en Descargado.');
        console.log(textStatus);
        console.log(errorThrown);
        console.log('Uncaught Error: ' + jqXHR.responseText);
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada Descargado.');
        $('#card-loader').hide();
      }); 

      return false;
        
    });

    
  } 

  function obtener_editar(tbody, table) {

    $(tbody).on("click", "button.editar", function(){
      var data = table.row($(this).parents("tr")).data();

              
      $('#card-msj').hide();
     
      var arrayfecha = data.expedicion.split('/'); 
      f= arrayfecha[2]+'/'+arrayfecha[1]+'/'+arrayfecha[0];
      fecha =new Date(f);
      
      var diaNro = fecha.getDate();
      var mesNro = fecha.getMonth()+1;
      var anoNro = fecha.getFullYear();

      $("#fecha").val(anoNro+'-'+("0"+mesNro).slice(-2)+'-'+("0"+diaNro).slice(-2));
      $("#documento").val( data.cedula );
			$("#apellido1").val( data.ape1 );
      $("#apellido2").val( data.ape2 );
      $("#nombre1").val( data.nom1 );
      $("#nombre2").val( data.nom2 );
			$("#curso").val(data.codigo);
      $("#curso").focus();$("#curso").select();
      $("#nro").val('ECSP1162-'+data.diploma);
      $("#acta").val(data.acta);
      $("#asignado").val(data.asignado);
      

      $("#cuadro2").slideDown("slow");
			$("#cuadro1").slideUp("slow");

      
        
    });
  }

  function frm_modificar(){
          
      $('#card-msj').hide();
      $("#documento").val( '' );
      $("#apellido1").val( '' );
      $("#apellido2").val( '' );
      $("#nombre1").val( '' );
      $("#nombre2").val( '' );
      $("#curso").val('001');$("#curso").focus();$("#curso").select();
      $("#nro").val('ECSP1162-');
  }

  $(document).on('submit', '#form-rpt', function(evento,table){

    evento.preventDefault();     
    $('#card-msj').hide();
    var msj = '';
    var form = $(this);


    var data_form = {
      documento   : $('#documento',form).val(),
      apellido1   : $('#apellido1',form).val(),
      apellido2   : $('#apellido2',form).val(),
      nombre1     : $('#nombre1',form).val(),
      nombre2     : $('#nombre2',form).val(),
      curso       : $('#curso',form).val(),
      fecha       : $('#fecha',form).val(),
      nro         : $('#nro',form).val(),
      acta        : $('#acta',form).val(),
      asignado    : $('#asignado',form).val()
    }

    if(data_form.documento.length == 0) {
      msj += "Ingresar Documento de Identidad <br>";
  
    }else if(!validarnumeros(data_form.documento)){
      msj += "Documento de Identidad debe ser numérico <br>";
    }else if(data_form.documento < 100000){
      msj += "Documento de Identidad Invalido <br>";
    }

    if (data_form.apellido1.length == 0){
      msj += "Ingresar Primer Apellido <br>";
    }else if(!validarletras(data_form.apellido1)){
      msj += "Primer Apellido solo debe contener Letras <br>";
    }

    if ((data_form.apellido2.length !== 0)  && (!validarletras(data_form.apellido2))){
      msj += "Segundo Apellido solo debe contener Letras <br>";
    }

    if (data_form.nombre1.length == 0){
      msj += "Ingresar Primer Nombre <br>";
    }else if(!validarletras(data_form.nombre1)){
      msj += "Primer Apellido solo debe contener Letras <br>";
    }

    if (data_form.nombre2.length !== 0 && !validarletras(data_form.nombre2)){
      msj += "Segundo Nombre solo debe contener Letras <br>";
    }

    if( data_form.fecha.length == 0) {
      msj += "Ingresar Fecha de Emisión <br>";
    }else{
      var fechauno = new Date();
      var fechados = new Date(data_form.fecha);
      var resultado = fechauno.getTime() < fechados.getTime();

      if(resultado === true){
        msj += "La Fecha no puede ser mayor a hoy <br>";
      }
    }
    
    if (msj.length > 0 ){
      $('#card-msj').show();
      $('#mensaje').html(msj); 
      return false;
    } else {
      var url_php = "sysnros-validar-modificar.php";
      
      $.ajax({
        beforeSend : function(){
          $('#card-loader').show();
          },
        type:'POST',
        url: url_php,
        data: data_form,
        dataType: 'json',
        async: true,
      }).done(function ajaxDone(res){
        if(res.error !== undefined){
          $('#card-msj').show();
          $('#mensaje').html(res.error); 
          return false;
        }
        if(res.url !== undefined){
          Swal.fire({
            position: 'center-centet',
            icon: 'success',
            title: 'Certificado Actualizado !!!',
            showConfirmButton: false,
            timer: 2500
          })
          $('#reporte').DataTable().ajax.reload();
          $('#reporte').DataTable().search( res.url ).draw();
          
          $("#cuadro2").slideUp("slow")
		      $("#cuadro1").slideDown("slow")

        }
      }).fail(function( jqXHR, textStatus, errorThrown ){
        
        console.log('fallo la llamada ajax en Reporte.');
        console.log(textStatus);
        console.log(errorThrown);
        console.log('Uncaught Error: ' + jqXHR.responseText);
      }).always(function ajaxSiempre(){
        console.log('Final de la llamada ajax.');
        $('#card-loader').hide();
      }); 

      return false;
    }



    
  });
	
	function cargarLimitados(){
    $.ajax({
      url: 'sysnros-cargar-autogestion.php',
      type: 'GET',
      success: function(respuesta) {
        var datos = JSON.parse(respuesta);
        var plantilla = '';
        datos.forEach(dato => {
          plantilla += '<option value='+dato.codigo+'>'+dato.nombre+'</option>';
        });
        $('#autogestion').html(plantilla);
      }
    });
  }
	

	// ********************************************************************************** //
    // *********************** INTERACCION CRAR NUEVO POLIGONO ************************** //
    // ********************************************************************************** //

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
                <div class="row"> 
                    <button type="button" id="cancelar_consulta" class="btn-close" aria-label="Close"></button>
                </div>
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

            $('#cancelar_consulta').click(function(e) {
                e.preventDefault();
                Swal.close();
            });

            // Obtener la fecha actual en el formato YYYY-MM-DD
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0!
            var yyyy = today.getFullYear();

            today = yyyy + '-' + mm + '-' + dd;
        
            // Establecer la fecha actual como valor mínimo para el input date
            document.getElementById("fecha_poligono").min = today;

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
                    <div class="row"> 
                        <button type="button" id="cancelar_consulta" class="btn-close" aria-label="Close"></button>
                    </div>
                    <form id="form_consulta_poligono_rango_fecha" class="mt-4 ">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-floating">
                                    <input type="date" class="form-control" name="Rango de inicio" required id="fecha_inicio" placeholder="Rango inicial">
                                    <label for="fecha_inicio">Rango inicial</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-floating">
                                    <input type="date" class="form-control" name="Rango de fin" required id="fecha_fin" disabled placeholder="Rango fin">
                                    <label for="fecha_fin">Rango de fin</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <button type="submit" class="btn_enviar">BUSCAR</button>
                            </div>
                        </div>
                    </form>
                    <div class="row mt-4 border-bottom">
                        <div class="col-md-12">
                            <table class="table table-striped" id="tabla_poligonos" style="display:none">
                                <thead>
                                    <tr>
                                        <th class="campo_table numero">#</th>
                                        <th class="campo_table codigo">Codigo</th>
                                        <th class="campo_table documento">Docente</th>
                                        <th class="campo_table entrega">Sede</th>
                                        <th class="campo_table celular">Fecha del poligono</th>
                                        <th class="campo_table entrega">Estado</th>
                                        <th class="campo_table entrega">Cerrar</th>
                                        <th class="campo_table entrega">Participantes</th>
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

                 // Cuando cambia la fecha de inicio
                $('#fecha_inicio').change(function() {
                    // Obtener el valor de la fecha de inicio
                    var fechaInicio = $(this).val();
                    // Establecer la fecha mínima en el input de fecha de fin
                    $('#fecha_fin').prop('disabled', false);
                    $('#fecha_fin').attr('min', fechaInicio);
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
                                <th class="campo_table"><button value="${dato.cod_poli}" class="btn btn-danger w-100 btn_close_poligono">Cerrar</button></th>
                                <th class="campo_table">${dato.cantidad_registros}</th>
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
                    <div class="row"> 
                        <button type="button" id="cancelar_consulta" class="btn-close" aria-label="Close"></button>
                    </div>
                    <form id="form_consulta_poligono_rango_fecha" class="mt-4 pb-4 border-bottom">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-floating">
                                    <input type="date" class="form-control" name="Rango de inicio" required id="fecha_inicio" placeholder="Rango inicial">
                                    <label for="fecha_inicio">Rango inicial</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-floating">
                                    <input type="date" class="form-control" name="Rango de fin" required id="fecha_fin" disabled placeholder="Rango fin">
                                    <label for="fecha_fin">Rango de fin</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <button type="submit" class="btn_enviar">BUSCAR</button>
                            </div>
                        </div>
                    </form>
                    <div class="row mt-4 border-bottom" id="cont_poligonos" style="display:none">
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
                                        <th class="campo_table correo">Participantes</th>
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

                 // Cuando cambia la fecha de inicio
                $('#fecha_inicio').change(function() {
                    // Obtener el valor de la fecha de inicio
                    var fechaInicio = $(this).val();
                    // Establecer la fecha mínima en el input de fecha de fin
                    $('#fecha_fin').prop('disabled', false);
                    $('#fecha_fin').attr('min', fechaInicio);
                });

            }

        });

    });

    $(document).on('submit', '#form_consulta_poligono_rango_fecha' , function (e) {
        e.preventDefault();
        let form = $(this);
        let url = "./drivers/consulta_poli_por_fecha.php";
        let plantilla = "";
        let data_form = {
            fecha_inicio:           $('#fecha_inicio',form).val(),
            fecha_fin :             $('#fecha_fin', form).val()
        }

        console.log(data_form);

        $.ajax({
            type: "POST",
            url: url,
            data: data_form,
            dataType: "json",
            async: true
        })
        .done(function ajaxDone(res) {

            if (res.cont.mensaje !== undefined) {

                $('#tabla_poligonos').show();
                $('#cont_poligonos').show();

                if (res.arraydatos !== undefined) {

                    let x = 1;

                    plantilla += `
                        <thead>
                            <tr>
                                <th class="campo_table numero">#</th>
                                <th class="campo_table codigo">Codigo</th>
                                <th class="campo_table documento">Docente</th>
                                <th class="campo_table">Sede</th>
                                <th class="campo_table celular">Fecha del poligono</th>
                                <th class="campo_table correo">Estado</th>
                                <th class="campo_table correo">Participantes</th>
                            </tr>
                        </thead>
                        <tbody id="btable_poligono">

                        </tbody>
                    `

                    res.arraydatos.datos.forEach(dato => {
                        plantilla += `
                                <tr>
                                    <th class="campo_table">${x++}</th>
                                    <th class="campo_table">${dato.cod_poli}</th>
                                    <th class="campo_table">${dato.nom_doce} ${dato.ape_doce}</th>
                                    <th class="campo_table">${dato.sede}</th>
                                    <th class="campo_table">${dato.fecha_programada}</th>
                                    <th class="campo_table">${dato.estado}</th>
                                    <th class="campo_table">${dato.cantidad_registros}</th>
                                </tr>
                        `;   
                    });

                    $('#tabla_poligonos').html(plantilla);

                };   

            }

            if (res.cont.error !== undefined) {

                plantilla += res.cont.error;

                $('#tabla_poligonos').html(plantilla);

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
            <div class="row"> 
                <button type="button" id="cancelar_consulta" class="btn-close" aria-label="Close"></button>
            </div>
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

        $('#cancelar_consulta').click(function(e) {
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

    // ********************************************************************************************** //
  // ************************************ CERRAR POLIGONO ***************************************** //
  // ********************************************************************************************** //

  $(document).on('click', '.btn_close_poligono', function(e) {
    e.preventDefault();

    var cerrar = $(this).val();
    let url = "./drivers/cerrar_poligono.php";

    Swal.fire({
        title: '¿Deseas cerrar el polígono?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Ejecutar la solicitud AJAX para cerrar el polígono
            $.ajax({
                url: url,
                type: 'POST', 
                data: { codigo: cerrar },
                success: function(response) {
                    // Mostrar un mensaje de éxito
                    Swal.fire({
                        icon: 'success',
                        title: 'Polígono cerrado',
                        text: response.message
                    });
                },
                error: function(xhr, status, error) {
                    // Mostrar un mensaje de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No se pudo cerrar el polígono. Inténtalo de nuevo.'
                    });
                }
            });
        }
    });
});
});

