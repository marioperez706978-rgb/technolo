

// Mostrar/ocultar contraseña con el checkbox "recordarme"
const checkbox = document.getElementById('recordarme');
const input = document.getElementById('contrasena');
checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    input.type = 'text';
  } else {
    input.type = 'password';
  }
});

document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value.trim();
  const contrasena = document.getElementById('contrasena').value;
  const errorDiv = document.getElementById('loginError');
  errorDiv.classList.add('d-none');
  errorDiv.textContent = '';
  const resp = await fetch('php/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, contrasena })
  });
  const data = await resp.json();
  if (data.success) {
   
    if (data.usuario) {
      localStorage.setItem('usuario', JSON.stringify(data.usuario));
    }
    window.location.href = data.redirect;
  } else {
    errorDiv.textContent = data.message || 'Error de autenticación';
    errorDiv.classList.remove('d-none');
  }
});