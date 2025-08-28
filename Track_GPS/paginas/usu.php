<?php
session_start();
// Exponer el ID de usuario si está logueado
if (isset($_SESSION['id'])) {
  echo '<script>window.ID_USUARIO = ' . intval($_SESSION['id']) . ';</script>';
}
// Generar token CSRF si no existe
if (empty($_SESSION['csrf_token'])) {
  $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"> 
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      .toast {
        min-width: 280px;
        font-size: 1rem;
      }
    </style>
  <title>REGISTRO DE USUARIO</title>

    <style>
         .nav-link.custom-hover:hover {
          color: #f36020 !important; 
          }
        
        .custom-card h2 {
            color: white;
            font-weight: 300; 
        }
        .table-custom {
            background-color: #5d6265; 
            color: white; 
        }
        .table-custom th {
            background-color: #343a40; 
            color: white;
            border-bottom: 2px solid #6c757d; 
        }
        .table-custom td {
            border-top: 1px solid #6c757d; 
            padding: 0.75rem; 
        }
        .btn-aprobar {
            background-color: #28a745; 
            border-color: #28a745;
            color: white;
        }
        .btn-rechazar {
            background-color: #dc3545; 
            border-color: #dc3545;
            color: white;
        }
        .tamaño-modal-width{
            max-width: 90%;
        }
        /* Mejorar la presentación de la información del usuario */
  #infoUsuarioBody .user-info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px 24px;
    margin-bottom: 2rem;
  }
  #infoUsuarioBody .user-info-label {
    font-weight: bold;
    color: #343a40;
    text-transform: capitalize;
  }
  #infoUsuarioBody .user-info-value {
    color: #495057;
    word-break: break-all;
  }
  #infoUsuarioBody .vehiculos-title {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    font-size: 1.1rem;
    color: #0d6efd;
    font-weight: 600;
    letter-spacing: 1px;
  }
  #infoUsuarioBody .table {
    background: #fff;
  }
  #infoUsuarioBody .table th {
    background: #e9ecef;
    color: #212529;
    font-weight: 600;
  }
  #infoUsuarioBody .table td {
    color: #495057;
  }
  .navbar, .dropdown-menu {
  z-index: 3000 !important;
}
    </style>
</head>
<body style="background-color :#b3b3b3;">
     <nav class="navbar navbar-expand-lg navbar-light shadow-sm rounded-bottom" style="margin-bottom: 32px; background-color: #000000ff;">
      <div class="container-fluid align-items-center">
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="../assets/images/logo5.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top me-2">
          <span class="d-flex flex-column lh-1">
            <!--<span style="font-weight: bold; color: #ff6a2c; font-size: 1.5rem; letter-spacing: 2px;">TECHNOLOGY</span>
            <span style="font-size: 1rem; color: #b3b3b3; margin-top: -2px;">for the world</span>
          </span>-->
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style="border-color: #fff;">
              <span class="navbar-toggler-icon" style="filter: invert(1);"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
          <li class="nav-item">
            <a class="nav-link fw-semibold custom-hover" style="color:#ffffff; text-align: center;" href="#" id="btnAgregarVehiculo" data-bs-toggle="modal" data-bs-target="#modalAgregarVehiculo">AGREGAR <br>NUEVO VEHICULO</a>
          </li>
        <li class="nav-item">
          <a class="nav-link fw-semibold custom-hover" style="color:#ffffff; text-align: center;" href="#" id="btnListaVehiculos">LISTA <br> DE VEHICULOS</a>
        </li>
<!-- Modal para registrar vehículo -->
<div class="modal fade" id="modalAgregarVehiculo" tabindex="-1" aria-labelledby="modalAgregarVehiculoLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header text-white" style="background-color: #ff410f;">
        <h5 class="modal-title" id="modalAgregarVehiculoLabel">REGISTRAR VEHICULOS</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <form id="formVehiculo">
        <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($_SESSION['csrf_token']); ?>">
        <div class="modal-body">
          <div class="mb-3">
            <label for="tipoVehiculo" class="form-label">Tipo de Vehículo</label>
            <select class="form-select" id="tipoV" name="tipoV" required>
              <option value="">Seleccione...</option>
              <option value="BUS">BUS</option>
                 <option value="MINIBUS">MINIBUS</option>
                 <option value="MICRO">MICRO</option>
                 <option value="TRUFI">TRUFI</option>
                 <option value="TAXI">TAXI</option>
                 <option value="CARRY">CARRY</option>
                 <option value="CAMIONETA">CAMIONETA</option>
                 <option value="VAN">VAN</option>
                 <option value="FURGON">FURGON</option>
                 <option value="COMBI">COMBI</option>
                 <option value="MOTO">MOTO</option>
                 <option value="MOTOTAXI">MOTOTAXI</option>
                 <option value="CAMION">CAMION</option>
                 <option value="VOLQUETE">VOLQUETE</option>
                 <option value="AMBULANCIA">AMBULANCIA</option>
                 <option value="ESCOLAR">ESCOLAR</option>
                 <option value="PARTICULAR">PARTICULAR</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="anioVehiculo" class="form-label">Año</label>
            <select class="form-select" id="anioVehiculo" name="anioV" required>
              <option value="" selected disabled>Selecciona Año</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="marcaVehiculo" class="form-label">Marca</label>
            <input type="text" class="form-control" id="marcaV" name="marcaV" oninput="this.value = this.value.toUpperCase()" required>
          </div>
          <div class="mb-3">
            <label for="placaVehiculo" class="form-label">Placa</label>
            <input type="text" class="form-control" id="placa" name="placa" maxlength="7" oninput="this.value = this.value.toUpperCase()" pattern="^(\d{3}[A-Za-z]{3}|\d{4}[A-Za-z]{3})$" required>
            </div>
            <div class="mb-3 d-flex align-items-center">
              <label class="form-label me-3 mb-0">Tipo de Servicio:</label>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="clasevehiculo" id="servicio_publico" value="PUBLICO" required>
                <label class="form-check-label" for="servicio_publico">PUBLICO</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="clasevehiculo" id="servicio_particular" value="PARTICULAR" required>
                <label class="form-check-label" for="servicio_particular">PARTICULAR</label>
              </div>
          </div>
          <div class="mb-3">
            <label for="tipoServicioSeleccionado" class="form-label">Servicio Seleccionado</label>
            <input type="text" class="form-control" id="tipoServicioSeleccionado" name="tipoServicioSeleccionado" readonly>
          </div>
          <div class="mb-3">
            <div id="grupoFederacion" style="display:none;">
              <label for="federacion" class="form-label">Federación</label>
              <select class="form-select" id="federacion" name="id_federaciones">
                 <option value="" selected disabled>Selecciona una federación</option>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <div id="grupoSindicato" style="display:none;">
              <label for="sindicato" class="form-label">Sindicato</label>
              <select class="form-select" id="sindicato" name="id_sindicatos">
                 <option value="" selected disabled>Selecciona un sindicato</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn" style="background-color:#000000ff; color:white;" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn" style="background-color:#ff410f; color:white;">Registrar</button>
              </div>
            </div>
          </div>
        </div>
        <!-- Modal de confirmación de datos de vehículo -->
        <div class="modal fade" id="modalConfirmarVehiculo" tabindex="-1" aria-labelledby="modalConfirmarVehiculoLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header" style="background-color: #ff410f; color: white;">
                <h5 class="modal-title" id="modalConfirmarVehiculoLabel">CONFIRMAR DATOS DE VEHICULO</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" id="btnCerrarConfirmarVehiculo"></button>
              </div>
              <div class="modal-body">
                <ul class="list-group" id="listaDatosVehiculo"></ul>
                <div class="alert alert-info mt-3 mb-0">¿Son correctos estos datos?</div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn" style="background-color:#000000ff; color:white;" data-bs-dismiss="modal" id="btnCancelarConfirmarVehiculo">Cancelar</button>
                <button type="button" class="btn" style="background-color:#ff410f; color:white;"id="btnConfirmarRegistro">Confirmar y Registrar</button>
              </div>
            </div>
          </div>
        </div>
        <li class="nav-item">
               <a class="nav-link fw-semibold custom-hover" style="color:#ffffff; text-align: center;" href="#" id="btnInfoUsuario">INFORMACION <br> DE USUARIO</a>
            </li>
            <li class="nav-item dropdown ms-2">
              <a href="#" class="nav-link dropdown-toggle p-0" style="text-align: center;" id="dropdownUsuario" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="display: flex; align-items: center;">
                <img src="../assets/images/usu.png" alt="Usuario" width="48" height="48" style="border-radius:50%;object-fit:cover;">
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUsuario">
                <li><a class="dropdown-item" href="#" id="cerrarSesion">Cerrar sesión</a></li>
              </ul>
            </li>
      </form>
    </div>
  </div>
</div>


            




<div class="modal fade" id="modalInfoUsuario" tabindex="-1" aria-labelledby="modalInfoUsuarioLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header text-white justify-content-center" style="background-color:#ff410f; color:white;">
        <h5 class="modal-title w-100 text-center" id="modalInfoUsuarioLabel">INFORMACION DE USUARIO</h5>
        <button type="button" class="btn-close position-absolute end-0 me-3" data-bs-dismiss="modal" aria-label="Cerrar" id="cerrarInfoUsuario"></button>
      </div>
      <div class="modal-body" id="infoUsuarioBody" style="background: #f8f9fa;">
        <!-- Aquí se mostrará la información -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" style="background-color:#000000ff; color:white;" data-bs-dismiss="modal" id="cerrarInfoUsuario2">Cerrar</button>
      </div>
    </div>
  </div>
</div>


<!-- Modal para mostrar placas de vehículos -->
<div class="modal fade" id="modalListaVehiculos" tabindex="-1" aria-labelledby="modalListaVehiculosLabel" aria-hidden="true">
  <div class="modal-dialog tamaño-modal-width modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header text-white justify-content-center" style="background-color: #ff410f;">
        <h5 class="modal-title w-100 text-center" id="modalListaVehiculosLabel">VEHICULOS REGISTRADOS</h5>
        <button type="button" class="btn-close position-absolute end-0 me-3" data-bs-dismiss="modal" aria-label="Cerrar"></button>
      </div>
      <div class="modal-body" id="listaPlacasBody">
        <!-- Aquí se mostrará la lista -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn" style="background-color:#ff410f; color:white;">Ubicación</button>
        <button type="button" class="btn" style="background-color:#000000ff; color:white;" data-bs-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>


          </ul>
        </div>
      </div>
    </nav>
<br>

<?php
// usuario está inhabilitado o no
$usuario_inhabilitado = false;
if (isset($_SESSION['id'])) {
    require_once '../php/conexion.php';
    $id_usuario = intval($_SESSION['id']);
    $sql = "SELECT activo FROM usuarios WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id_usuario);
    $stmt->execute();
    $res = $stmt->get_result();
    if ($row = $res->fetch_assoc()) {
        if (isset($row['activo']) && $row['activo'] == 0) {
            $usuario_inhabilitado = true;
        }
    }
    $stmt->close();
    $conn->close();
}
?>
<?php if ($usuario_inhabilitado): ?>
  <div style="position: fixed; top: 80px; left: 0; width: 100vw; height: calc(100vh - 80px); min-height: 350px; background: rgba(0,0,0,0.7); z-index: 2000; display: flex; align-items: center; justify-content: center;">
    <div style="background: #fff; padding: 32px 48px; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.2); text-align: center;">
      <h2 class="text-danger" style="font-weight: bold;">Usuario inhabilitado</h2>
      <p class="text-danger fs-5">Comuníquese con soporte técnico</p>
    </div>
  </div>
<?php else: ?>
  <div id="bienvenidaUsuario" style="position: fixed; top: 80px; left: 0; width: 100vw; height: calc(100vh - 80px); min-height: 350px; background: url('../assets/images/fondpavl.jpg') center center/cover no-repeat; z-index: 1000; display: flex; align-items: center; justify-content: center;">
<style>
  .dropdown-menu {
    z-index: 2000 !important;
  }
</style>
      <div style="position: absolute; top: 0; left: 0; width: 100vw; height: 100%; background: rgba(0,0,0,0.55);"></div>
      <div style="position: relative; z-index: 2; text-align: center; width: 100vw;">
        <h2 class="text-white fs-1" style="font-weight: bold; text-shadow: 2px 2px 8px #000;">¡¡¡BIENVENIDO!!!</h2>
        <br>
        <h3 class="text-white fs-2" id="nombreCompletoUsuario" style="text-shadow: 2px 2px 8px #000;"></h3>
      </div>
    </div>
<?php endif; ?>


<script src="../assets/js/bienusu.js"></script>
<script src="../assets/js/federacionsindicatosdeslis.js"></script>
<script src="../assets/js/listarvehi.js"></script>
<script src="../assets/js/federacios.js"></script>
<script src="../assets/js/informaciontotal.js"></script>
<script src="../assets/js/registrosusveh.js"></script>
<script src="../assets/js/año.js"></script>
<script src="../assets/js/informacion.js"></script>
<script src="../assets/js/listarvehiculousuario.js"></script>
<script src="../assets/js/cerrar.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>