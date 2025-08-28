
document.addEventListener('DOMContentLoaded', function() {

  const federacionSelect = document.getElementById('federacionSelect');
  if(federacionSelect) {
    fetch('../php/listar_federaciones.php')
      .then(res => res.json())
      .then(data => {
        federacionSelect.innerHTML = '<option value="">Seleccione una federación</option>';
        if(data.success && Array.isArray(data.federaciones)) {
          data.federaciones.forEach(fed => {
            federacionSelect.innerHTML += `<option value="${fed.id}">${fed.nombre}</option>`;
          });
        }
      });
  }


  const formFederacion = document.getElementById('formFederacion');
  if(formFederacion) {
    formFederacion.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(formFederacion);
      fetch('../php/guardar_federacion.php', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          let noti = document.getElementById('notificacionCentralFed');
          if (!noti) {
            noti = document.createElement('div');
            noti.id = 'notificacionCentralFed';
            noti.className = 'modal fade show';
            noti.tabIndex = -1;
            noti.style.display = 'block';
            noti.style.zIndex = '9999';
            noti.innerHTML = `<div class="modal-dialog modal-dialog-centered"><div class="modal-content bg-success text-white text-center" style="border-radius: 1rem; box-shadow: 0 0 20px #0002;"><div class="modal-body"><span style="font-size:1.2rem;">Federación agregada</span></div></div></div>`;
            document.body.appendChild(noti);
          } else {
            noti.classList.add('show');
            noti.style.display = 'block';
          }
          setTimeout(() => {
      // Recargar solo el select de federaciones y limpiar sindicatos
      fetch('../php/listar_federaciones.php')
        .then(res => res.json())
        .then(data => {
          federacionSelect.innerHTML = '<option value="">Seleccione una federación</option>';
          if(data.success && Array.isArray(data.federaciones)) {
            data.federaciones.forEach(fed => {
              federacionSelect.innerHTML += `<option value="${fed.id}">${fed.nombre}</option>`;
            });
          }
        });
      const sindicatoSelect = document.getElementById('sindicato');
      if(sindicatoSelect) {
        sindicatoSelect.innerHTML = '<option value="" selected disabled>Selecciona un sindicato</option>';
      }
      noti.classList.remove('show');
      noti.style.display = 'none';
    }, 1800);
    // El reload recarga la pantalla y no es necesario ocultar el modal ni resetear el formulario aquí
        } else {
          let noti = document.getElementById('notificacionCentralSinError');
          if (!noti) {
            noti = document.createElement('div');
            noti.id = 'notificacionCentralSinError';
            noti.className = 'modal fade show';
            noti.tabIndex = -1;
            noti.style.display = 'block';
            noti.style.zIndex = '9999';
            noti.innerHTML = `<div class="modal-dialog modal-dialog-centered"><div class="modal-content bg-danger text-white text-center" style="border-radius: 1rem; box-shadow: 0 0 20px #0002;"><div class="modal-body"><span style="font-size:1.2rem;">Error: ${data.message}</span></div></div></div>`;
            document.body.appendChild(noti);
          } else {
            noti.classList.add('show');
            noti.style.display = 'block';
            noti.querySelector('span').textContent = 'Error: ' + data.message;
          }
          setTimeout(() => {
            noti.classList.remove('show');
            noti.style.display = 'none';
          }, 2200);
        }
      })
      .catch(() => {
        let noti = document.getElementById('notificacionCentralSinError');
        if (!noti) {
          noti = document.createElement('div');
          noti.id = 'notificacionCentralSinError';
          noti.className = 'modal fade show';
          noti.tabIndex = -1;
          noti.style.display = 'block';
          noti.style.zIndex = '9999';
          noti.innerHTML = `<div class="modal-dialog modal-dialog-centered"><div class="modal-content bg-danger text-white text-center" style="border-radius: 1rem; box-shadow: 0 0 20px #0002;"><div class="modal-body"><span style="font-size:1.2rem;">Error de red o servidor.</span></div></div></div>`;
          document.body.appendChild(noti);
        } else {
          noti.classList.add('show');
          noti.style.display = 'block';
          noti.querySelector('span').textContent = 'Error de red o servidor.';
        }
        setTimeout(() => {
          noti.classList.remove('show');
          noti.style.display = 'none';
        }, 2200);
      });
    });
  }

 
  const formSindicato = document.getElementById('formSindicato');
  if(formSindicato) {
    formSindicato.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(formSindicato);
      fetch('../php/guardar_sindicato.php', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if(data.success) {
          let noti = document.getElementById('notificacionCentralSin');
          if (!noti) {
            noti = document.createElement('div');
            noti.id = 'notificacionCentralSin';
            noti.className = 'modal fade show';
            noti.tabIndex = -1;
            noti.style.display = 'block';
            noti.style.zIndex = '9999';
            noti.innerHTML = `<div class="modal-dialog modal-dialog-centered"><div class="modal-content bg-success text-white text-center" style="border-radius: 1rem; box-shadow: 0 0 20px #0002;"><div class="modal-body"><span style="font-size:1.2rem;">Sindicato agregado</span></div></div></div>`;
            document.body.appendChild(noti);
          } else {
            noti.classList.add('show');
            noti.style.display = 'block';
          }
          setTimeout(() => {
            noti.classList.remove('show');
            noti.style.display = 'none';
          }, 1800);
          formSindicato.reset();
          var modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalSindicato'));
          modal.hide();
        } else {
          let noti = document.getElementById('notificacionCentralSinError');
          if (!noti) {
            noti = document.createElement('div');
            noti.id = 'notificacionCentralSinError';
            noti.className = 'modal fade show';
            noti.tabIndex = -1;
            noti.style.display = 'block';
            noti.style.zIndex = '9999';
            noti.innerHTML = `<div class="modal-dialog modal-dialog-centered"><div class="modal-content bg-danger text-white text-center" style="border-radius: 1rem; box-shadow: 0 0 20px #0002;"><div class="modal-body"><span style="font-size:1.2rem;">Error: ${data.message}</span></div></div></div>`;
            document.body.appendChild(noti);
          } else {
            noti.classList.add('show');
            noti.style.display = 'block';
            noti.querySelector('span').textContent = 'Error: ' + data.message;
          }
          setTimeout(() => {
            noti.classList.remove('show');
            noti.style.display = 'none';
          }, 2200);
        }
      })
      .catch(() => {
        let noti = document.getElementById('notificacionCentralSinError');
        if (!noti) {
          noti = document.createElement('div');
          noti.id = 'notificacionCentralSinError';
          noti.className = 'modal fade show';
          noti.tabIndex = -1;
          noti.style.display = 'block';
          noti.style.zIndex = '9999';
          noti.innerHTML = `<div class="modal-dialog modal-dialog-centered"><div class="modal-content bg-danger text-white text-center" style="border-radius: 1rem; box-shadow: 0 0 20px #0002;"><div class="modal-body"><span style="font-size:1.2rem;">Error de red o servidor.</span></div></div></div>`;
          document.body.appendChild(noti);
        } else {
          noti.classList.add('show');
          noti.style.display = 'block';
          noti.querySelector('span').textContent = 'Error de red o servidor.';
        }
        setTimeout(() => {
          noti.classList.remove('show');
          noti.style.display = 'none';
        }, 2200);
      });
    });
  }
});