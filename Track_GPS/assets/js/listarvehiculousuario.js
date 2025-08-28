// Interceptar el submit del formulario de vehículo para mostrar confirmación
document.addEventListener('DOMContentLoaded', function() {
  // Actualizar el token CSRF al abrir el modal de registro de vehículo
  const modalAgregarVehiculo = document.getElementById('modalAgregarVehiculo');
  if (modalAgregarVehiculo) {
    modalAgregarVehiculo.addEventListener('show.bs.modal', function() {
      fetch('../php/obtener_csrf.php')
        .then(res => res.json())
        .then(data => {
          const csrfInput = document.querySelector('#formVehiculo [name="csrf_token"]');
          if (csrfInput && data.csrf_token) {
            csrfInput.value = data.csrf_token;
          }
        });
    });
  }
  var formVehiculo = document.getElementById('formVehiculo');
  var modalConfirmar = new bootstrap.Modal(document.getElementById('modalConfirmarVehiculo'));
  var listaDatos = document.getElementById('listaDatosVehiculo');
  var btnConfirmar = document.getElementById('btnConfirmarRegistro');
  var submitPendiente = false;

  if (formVehiculo) {
    formVehiculo.addEventListener('submit', function(e) {
      // Solo mostrar el modal si NO se ha confirmado aún
      if (!window.vehiculoConfirmado) {
        e.preventDefault();
        // Obtener los datos del formulario
        var tipoV = document.getElementById('tipoV').value;
        var anioV = document.getElementById('anioVehiculo').value;
        var marcaV = document.getElementById('marcaV').value;
        var placa = document.getElementById('placa').value;
        var clase = document.querySelector('input[name="clasevehiculo"]:checked');
        var tipoServicio = document.getElementById('tipoServicioSeleccionado').value;

        var federacionSelect = document.getElementById('federacion');
        var sindicatoSelect = document.getElementById('sindicato');
        var federacionNombre = '';
        var sindicatoNombre = '';
        if (federacionSelect && federacionSelect.selectedIndex > 0) {
          federacionNombre = federacionSelect.options[federacionSelect.selectedIndex].text;
        }
        if (sindicatoSelect && sindicatoSelect.selectedIndex > 0) {
          sindicatoNombre = sindicatoSelect.options[sindicatoSelect.selectedIndex].text;
        }

        // Mostrar los datos en el modal
        listaDatos.innerHTML =
          '<li class="list-group-item"><b>Tipo:</b> ' + tipoV + '</li>' +
          '<li class="list-group-item"><b>Año:</b> ' + anioV + '</li>' +
          '<li class="list-group-item"><b>Marca:</b> ' + marcaV + '</li>' +
          '<li class="list-group-item"><b>Placa:</b> ' + placa + '</li>' +
          '<li class="list-group-item"><b>Servicio:</b> ' + (clase ? clase.value : '') + '</li>' +
          (tipoServicio ? '<li class="list-group-item"><b>Tipo Servicio:</b> ' + tipoServicio + '</li>' : '') +
          (federacionNombre ? '<li class="list-group-item"><b>Federación:</b> ' + federacionNombre + '</li>' : '') +
          (sindicatoNombre ? '<li class="list-group-item"><b>Sindicato:</b> ' + sindicatoNombre + '</li>' : '');

        modalConfirmar.show();
        return;
      }
      // Si ya se confirmó, limpiar la bandera para evitar dobles envíos
      window.vehiculoConfirmado = false;
    });

    btnConfirmar.addEventListener('click', function() {
      submitPendiente = true;
      // Recopilar datos del formulario
      // Log del valor del token CSRF antes de enviar
      var csrfInput = formVehiculo.querySelector('[name="csrf_token"]');
      if (csrfInput) {
        console.log('CSRF que se enviará:', csrfInput.value);
      } else {
        console.warn('No se encontró el campo csrf_token en el formulario');
      }
      var formData = new FormData(formVehiculo);
      formData.append('id_usuarios', window.ID_USUARIO || 1);
      modalConfirmar.hide();
      // Esperar a que cierre el modal antes de enviar
      setTimeout(function() {
        fetch('../php/guardar_vehiculo.php', {
          method: 'POST',
          body: formData
        })
        .then(async res => {
          let data, text;
          try {
            text = await res.text();
            data = JSON.parse(text);
          } catch (e) {
            alert('Respuesta inesperada del servidor: ' + (text || e.message));
            throw e;
          }
          if (data.success) {
            mostrarToastRegistroExitoso();
            formVehiculo.reset();
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalAgregarVehiculo'));
            if (modal) modal.hide();
          } else {
            let msg = data.message || 'Error al registrar vehículo';
            if (data.sql) msg += '\nSQL: ' + data.sql;
            if (data.params) msg += '\nPARAMS: ' + JSON.stringify(data.params);
            alert(msg);
          }
        })
        .catch((err) => {
          alert('Error de conexión al guardar vehículo: ' + (err && err.message ? err.message : err));
        });
        submitPendiente = false;
      }, 300);
    });
// Toast de éxito para registro de vehículo
function mostrarToastRegistroExitoso() {
  let toast = document.getElementById('toastRegistroExitoso');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastRegistroExitoso';
    toast.className = 'toast align-items-center text-bg-success border-0 position-fixed bottom-0 end-0 m-4';
    toast.style.zIndex = 9999;
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          <b>¡Vehículo registrado correctamente!</b>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
      </div>
    `;
    document.body.appendChild(toast);
  }
  var toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast, { delay: 2500 });
  toastBootstrap.show();
}

    // Si el usuario cierra el modal de confirmación, limpiar el flag
    document.getElementById('btnCancelarConfirmarVehiculo').addEventListener('click', function() {
      submitPendiente = false;
    });
    document.getElementById('btnCerrarConfirmarVehiculo').addEventListener('click', function() {
      submitPendiente = false;
    });
    document.getElementById('modalConfirmarVehiculo').addEventListener('hidden.bs.modal', function() {
      submitPendiente = false;
    });
  }
});