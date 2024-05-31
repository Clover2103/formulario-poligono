<!-- NAVIGATION -->
<nav class="navbar navbar-expand-lg navbar-dark bg-primary" style="z-index:6666">
    <div class="container-fluid">   
    
        <a class="navbar-brand">
            <!-- <img src="img/security.png" height="60px"> -->
        </a>
        <button class="navbar-toggler" data-bs-target="#menu" data-bs-toggle="collapse" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="menu">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a href="sysnros-tablero.php" class="nav-link">Inicio</a>
                </li> 
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="desplegable" role="button" data-bs-toggle="dropdown" aria-expanded="false">Procesar Cerficados</a>
                    <ul class="dropdown-menu" aria-labelledby="desplegable">
                      <li><a href="sysnros-formulario.php" class="dropdown-item active">Emitir Certificado</a></li>
                      <li><a href="sysnros-masivo.php" class="dropdown-item">Carga Masiva Certificado</a></li>
                      <!-- <?php  if($_SESSION['tipo'] == '1' || $_SESSION['tipo'] == '2') { echo '

                      <li><a href="sysnros-frm-correcciones.php" class="dropdown-item">Correcciones de Certificados</a></li>

                      '; } ?> -->
                    </ul>
                </li>
                <!-- <?php  if($_SESSION['admin'] == 'S' && $_SESSION['tipo'] == '0') { echo '<li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="procesos" role="button" data-bs-toggle="dropdown" aria-expanded="false">Procesos</a>
                    <ul class="dropdown-menu" aria-labelledby="procesos">
                      <li><a href="sysnros-frmcarta.php" class="dropdown-item active">Emitir Carta de Tiro</a></li>
					            <li><a href="sysnros-frm-semcur.php" class="dropdown-item">Emitir Seminarios / Cursos</a></li>
                      <li><a href="sysnros-reporte.php" class="dropdown-item">Libro de Matricula</a></li>
                      <li><a href="sysnros-rptcapa.php" class="dropdown-item">Reporte Administrativo</a></li>
                      <li><a href="sysnros-consulta-poli.php" class="dropdown-item">Poligono</a></li>
                    </ul>
                </li> 
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="procesos" role="button" data-bs-toggle="dropdown" aria-expanded="false">Mantenimiento</a>
                    <ul class="dropdown-menu" aria-labelledby="procesos">
                      <li><a href="" class="dropdown-item active">Usuarios</a></li>
                      <li><a href="" class="dropdown-item">Tramitadores</a></li>
                    </ul>
                </li>'; } ?>  -->

                <!-- <?php  if($_SESSION['admin'] == 'N' && $_SESSION['tipo'] == '1') { echo '<li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="procesos" role="button" data-bs-toggle="dropdown" aria-expanded="false">Procesos</a>
                    <ul class="dropdown-menu" aria-labelledby="procesos">
                      <li><a href="sysnros-frmcarta.php" class="dropdown-item active">Emitir Carta de Tiro</a></li>
					            <li><a href="sysnros-frm-semcur.php" class="dropdown-item">Emitir Seminarios / Cursos</a></li>
                      <li><a href="sysnros-rptcapa.php" class="dropdown-item">Reporte Administrativo</a></li> 
                    </ul>
                </li> 
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="procesos" role="button" data-bs-toggle="dropdown" aria-expanded="false">Mantenimiento</a>
                    <ul class="dropdown-menu" aria-labelledby="procesos">
                      <li><a href="" class="dropdown-item active">Usuarios</a></li>
                      <li><a href="" class="dropdown-item">Tramitadores</a></li>
                    </ul>
                </li>'; } ?> 

                <?php  if($_SESSION['admin'] == 'N' && $_SESSION['limitado'] == 'S' ) { echo '<li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="procesos" role="button" data-bs-toggle="dropdown" aria-expanded="false">Procesos</a>
                    <ul class="dropdown-menu" aria-labelledby="procesos">
					            <li><a href="sysnros-frm-semcur.php" class="dropdown-item">Emitir Seminarios / Cursos</a></li>                      
                    </ul>
                </li> '; } ?>  -->


                <li class="nav-item">
                    <a href="#" id="item-salir" class="nav-link">Salir</a>
                </li> 
            </ul>
                 
        </div>    
        <!-- <span class="navbar-text text-black-50 fw-bolder"><?php echo 'Bienvenido: '.strtoupper($_SESSION['nombre'])?></span> -->
        
    </div>
</nav>
  