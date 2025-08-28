
window.addEventListener('DOMContentLoaded', async function() {
  try {
    const res = await fetch('php/verificar_sesion.php');
    const data = await res.json();
    if (data.autenticado && data.redirect) {
      window.location.href = data.redirect;
    }
  } catch (err) {
   
  }
});

// Envío seguro del login por AJAX
document.getElementById('loginForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value.trim();
  const contrasena = document.getElementById('contrasena').value;
  const loginError = document.getElementById('loginError');
  loginError.classList.add('d-none');
  loginError.textContent = '';
  try {
    const res = await fetch('php/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ usuario, contrasena })
    });
    const data = await res.json();
    if (data.success) {
      window.location.href = data.redirect;
    } else {
      loginError.textContent = 'Usuario o contraseña incorrectos.';
      loginError.classList.remove('d-none');
      document.getElementById('contrasena').value = '';
    }
  } catch (err) {
    loginError.textContent = 'Error de conexión. Intente de nuevo.';
    loginError.classList.remove('d-none');
    document.getElementById('contrasena').value = '';
  }
});