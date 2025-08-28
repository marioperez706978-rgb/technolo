
// Al cargar el modal, ocultar federación y sindicato
document.addEventListener('DOMContentLoaded', function() {
  function setServicio(tipo) {
    document.getElementById('tipoServicioSeleccionado').value = tipo.toUpperCase();
  }
  var modal = document.getElementById('modalAgregarVehiculo');
  if (modal) {
    modal.addEventListener('show.bs.modal', function() {
      document.getElementById('grupoFederacion').style.display = 'none';
      document.getElementById('grupoSindicato').style.display = 'none';
      document.getElementById('tipoServicioSeleccionado').value = '';
      document.getElementById('servicio_publico').checked = false;
      document.getElementById('servicio_particular').checked = false;
    });
  }
  document.getElementById('servicio_publico').addEventListener('change', function() {
    if (this.checked) {
      document.getElementById('grupoFederacion').style.display = '';
      document.getElementById('grupoSindicato').style.display = '';
      setServicio('PUBLICO');
    }
  });
  document.getElementById('servicio_particular').addEventListener('change', function() {
    if (this.checked) {
      document.getElementById('grupoFederacion').style.display = 'none';
      document.getElementById('grupoSindicato').style.display = 'none';
      setServicio('Particular');
    }
  });
});