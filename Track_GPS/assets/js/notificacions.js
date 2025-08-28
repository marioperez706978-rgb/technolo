function mostrarNotificacion(mensaje) {
      document.getElementById('notificacionMensaje').textContent = mensaje;
      var modal = new bootstrap.Modal(document.getElementById('notificacionCentral'));
      modal.show();
    }