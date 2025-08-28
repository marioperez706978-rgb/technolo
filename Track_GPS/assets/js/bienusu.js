// Obtener nombre completo del usuario y mostrarlo
window.addEventListener('DOMContentLoaded', async function() {
  try {
    const res = await fetch('../php/info_usuario_completa.php');
    const data = await res.json();
    if (data.success && data.usuario) {
      const nombre = data.usuario.nombre || '';
      const apellido = data.usuario.apellido || '';
      document.getElementById('nombreCompletoUsuario').textContent = nombre + ' ' + apellido;
    } else {
      document.getElementById('nombreCompletoUsuario').textContent = '';
    }
  } catch (err) {
    document.getElementById('nombreCompletoUsuario').textContent = '';
  }
});