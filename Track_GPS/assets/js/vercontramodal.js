// Mostrar/ocultar contraseña en modal de configuración
document.getElementById('togglePasswordConfig')?.addEventListener('click', function() {
  const input = document.getElementById('contrasenaConfig');
  const icon = document.getElementById('icon-eye-config');
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
