// Verificar sesión antes de mostrar la página
fetch('../php/verificar_sesion.php', { credentials: 'include' })
  .then(res => res.json())
  .then(data => {
    if (!data.autenticado) {
  window.location.replace('../index.html');
    }
  })
  .catch(() => {
  window.location.replace('../index.html');
  });