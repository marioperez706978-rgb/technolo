
function mostrarToastPlaca(mensaje) {
  const toast = document.getElementById('toastPlaca');
  const toastMsg = document.getElementById('toastPlacaMsg');
  toastMsg.textContent = mensaje;
  toast.style.display = 'block';
  const bsToast = new bootstrap.Toast(toast, { delay: 2500 });
  bsToast.show();
  toast.addEventListener('hidden.bs.toast', function() {
    toast.style.display = 'none';
  }, { once: true });
}

// Ejemplo de uso tras el fetch:
// fetch('php/guardar_vehiculo.php', { ... })
//   .then(res => res.json())
//   .then(data => {
//     if (!data.success && data.message.includes('Placa ya en uso')) {
//       mostrarToastPlaca(data.message);
//     }
//   });
// Suponiendo que tienes el id del usuario en JS, por ejemplo:
const id_usuario = window.ID_USUARIO || 1; // Reemplaza por el id real del usuario logueado

// ...existing code para radios y inputServicio...

// Actualizar el input tipoServicioSeleccionado automáticamente al cambiar el radio
const radios = document.querySelectorAll('input[name="clasevehiculo"]');
const inputServicio = document.getElementById('tipoServicioSeleccionado');
if (radios && inputServicio) {
  radios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.checked) {
        inputServicio.value = this.value;
      }
    });
  });
  // Inicializar el valor al cargar
  const checked = document.querySelector('input[name="clasevehiculo"]:checked');
  if (checked) inputServicio.value = checked.value;
}
