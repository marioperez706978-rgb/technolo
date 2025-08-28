
                document.getElementById('cerrarSesion').addEventListener('click', async function(e) {
                  e.preventDefault();
                  // Llamar al backend para destruir la sesión
                  await fetch('../php/logout.php', { method: 'POST', credentials: 'include' });
                  // Cerrar todos los modales abiertos (Bootstrap 5)
                  document.querySelectorAll('.modal.show').forEach(modalEl => {
                    const modalInstance = bootstrap.Modal.getInstance(modalEl);
                    if (modalInstance) modalInstance.hide();
                  });
                  // Limpiar todos los formularios
                  document.querySelectorAll('form').forEach(f => f.reset());
                  // Limpiar cache y datos sensibles
                  if ('caches' in window) {
                    caches.keys().then(function(names) {
                      for (let name of names) caches.delete(name);
                    });
                  }
                  // Limpiar almacenamiento local y de sesión
                  localStorage.clear();
                  sessionStorage.clear();
                  // Evitar volver con el botón atrás
                  window.location.replace('../index.html');
                  window.history.pushState(null, '', '../index.html');
                });
                // Forzar verificación de sesión en cada carga de página protegida
                window.addEventListener('pageshow', function(event) {
                  if (event.persisted) {
                    window.location.reload();
                  }
                });
