 function mostrarToast(mensaje, tipo = 'info') {
  const toast = document.getElementById('toastRegistro');
  const toastMsg = document.getElementById('toastRegistroMsg');
  toastMsg.textContent = mensaje;
  toast.classList.remove('bg-info', 'bg-success', 'bg-danger');
  if (tipo === 'success') toast.classList.add('bg-success');
  else if (tipo === 'danger') toast.classList.add('bg-danger');
  else toast.classList.add('bg-info');
  toast.style.display = 'block';
  const bsToast = new bootstrap.Toast(toast, { delay: 2500 });
  bsToast.show();
  toast.addEventListener('hidden.bs.toast', function() {
    toast.style.display = 'none';
  }, { once: true });
}

// Sincronizar CI con contraseña y hacerla solo lectura
document.addEventListener('DOMContentLoaded', function() {
  const ciInput = document.getElementById('ci');
  const passInput = document.getElementById('contrasena_hash');
  if (ciInput && passInput) {
    ciInput.addEventListener('input', function() {
      passInput.value = ciInput.value;
    });
    // Inicializar contraseña si ya hay valor en CI
    passInput.value = ciInput.value;
  }
});

// Mostrar/ocultar contraseña registro (fuera del submit)
document.getElementById('togglePasswordReg').addEventListener('click', function() {
  const input = document.getElementById('contrasena_hash');
  const icon = document.getElementById('icon-eye-reg');
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('bi-eye');
    icon.classList.add('bi-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('bi-eye-slash');
    icon.classList.add('bi-eye');
  }
});



// Interceptar el submit para mostrar el modal y evitar el envío directo
document.getElementById('formRegistroUsuario').addEventListener('submit', function(e) {
  e.preventDefault();
  // Validación extra
  const nombre = document.getElementById('nombre').value.trim();
  const apellido = document.getElementById('apellido').value.trim();
  const ci = document.getElementById('ci').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const correoInput = document.getElementById('correo_electronico');
  const correo = correoInput.value.trim();

  if (nombre.length < 2) {
    mostrarToast('El nombre debe tener al menos 2 caracteres', 'danger');
    document.getElementById('nombre').focus();
    return;
  }
  if (apellido.length < 2) {
    mostrarToast('El apellido debe tener al menos 2 caracteres', 'danger');
    document.getElementById('apellido').focus();
    return;
  }
  if (ci.length < 5) {
    mostrarToast('El CI debe tener al menos 5 dígitos', 'danger');
    document.getElementById('ci').focus();
    return;
  }
  if (telefono.length < 7) {
    mostrarToast('El teléfono debe tener al menos 7 dígitos', 'danger');
    document.getElementById('telefono').focus();
    return;
  }
  if (correo.length > 0) {
    // Solo validar formato si hay algo escrito
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correo)) {
      mostrarToast('El correo electrónico no es válido', 'danger');
      correoInput.focus();
      return;
    }
  }
  // Mostrar modal de confirmación con los datos
  const form = e.target;
  const formData = new FormData(form);
  let html = `<div class="d-flex justify-content-center">
    <table class="table table-bordered table-sm mb-0" style="max-width: 500px; min-width: 320px; background: #fff;">
      <tbody>
        <tr><th class="text-end bg-light fw-normal" style="width: 45%; padding-right: 1.5rem;">Nombre:</th><td class="ps-3">${formData.get('nombre') || ''}</td></tr>
        <tr><th class="text-end bg-light fw-normal" style="padding-right: 1.5rem;">Apellido:</th><td class="ps-3">${formData.get('apellido') || ''}</td></tr>
        <tr><th class="text-end bg-light fw-normal" style="padding-right: 1.5rem;">Departamento:</th><td class="ps-3">${formData.get('departamento') || ''}</td></tr>
        <tr><th class="text-end bg-light fw-normal" style="padding-right: 1.5rem;">Nacionalidad:</th><td class="ps-3">${formData.get('nacionalidad') || ''}</td></tr>
        <tr><th class="text-end bg-light fw-normal" style="padding-right: 1.5rem;">CI:</th><td class="ps-3">${formData.get('ci') || ''}</td></tr>
        <tr><th class="text-end bg-light fw-normal" style="padding-right: 1.5rem;">Teléfono:</th><td class="ps-3">${formData.get('telefono') || ''}</td></tr>
        <tr><th class="text-end bg-light fw-normal" style="padding-right: 1.5rem;">Dirección:</th><td class="ps-3">${formData.get('direccion') || ''}</td></tr>
        <tr><th class="text-end bg-light fw-normal" style="padding-right: 1.5rem;">Correo electrónico:</th><td class="ps-3">${formData.get('correo_electronico') || ''}</td></tr>
        <tr><th class="text-end bg-light fw-normal" style="padding-right: 1.5rem;">Nombre de usuario:</th><td class="ps-3">${formData.get('nombre_usuario') || ''}</td></tr>
        <tr><th class="text-end bg-light fw-normal" style="padding-right: 1.5rem;">Contraseña:</th><td class="ps-3">${formData.get('contrasena_hash') || ''}</td></tr>
      </tbody>
    </table>
  </div>`;

  // Función para mostrar el texto de la opción seleccionada en vez del valor
  function getSelectText(selectId, value) {
    const select = document.getElementById(selectId);
    if (!select) return value;
    const opt = select.querySelector(`option[value="${value}"]`);
    return opt ? opt.textContent : value;
  }
  document.getElementById('confirmacionBody').innerHTML = html;
  var modal = new bootstrap.Modal(document.getElementById('modalConfirmacion'));
  modal.show();

  // Guardar formData para el envío posterior
  window._formDataRegistro = formData;
});

// Evento para el botón de Confirmar y Enviar
document.getElementById('btnConfirmarEnvio').addEventListener('click', function() {
  const formData = window._formDataRegistro;
  if (!formData) return;
  mostrarToast('Solicitud enviada', 'info');
  fetch('../php/guardar_usuario.php', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      mostrarToast(data.message, 'success');
      document.getElementById('formRegistroUsuario').reset();
      var modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('modalConfirmacion'));
      modal.hide();
      setTimeout(function() {
  window.location.href = '../index.html';
      }, 1200); // espera 1.2 segundos para mostrar el toast
    } else {
      mostrarToast(data.message, 'danger');
    }
  })
  .catch(() => {
    mostrarToast('Error de conexión', 'danger');
  });
});
