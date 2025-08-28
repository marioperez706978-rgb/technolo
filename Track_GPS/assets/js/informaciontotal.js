// Mostrar información completa del usuario y sus vehículos
const btnInfoUsuario = document.getElementById('btnInfoUsuario');
if (btnInfoUsuario) {
  btnInfoUsuario.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('../php/info_usuario_completa.php')
      .then(res => res.json())
      .then(data => {
        const body = document.getElementById('infoUsuarioBody');
        if (data.success && data.usuario) {
          let html = '<div class="user-info-grid">';
                  const ocultar = ['contrasena_hash', 'rol_id', 'avatar', 'portada', 'ultima_sesion', 'activo', 'usuario_creador'];
                  for (const key in data.usuario) {
                    if (!ocultar.includes(key)) {
                      html += `<div class="user-info-label">${key.replace(/_/g, ' ').toUpperCase()}:</div><div class="user-info-value">${data.usuario[key]}</div>`;
                    }
          }
          html += '</div>';
          html += '<div class="vehiculos-title">Vehículos registrados</div>';
          if (data.vehiculos && data.vehiculos.length > 0) {
            html += '<div class="table-responsive"><table class="table table-bordered table-striped"><thead><tr>' +
              '<th>Tipo</th><th>Marca</th><th>Año</th><th>Placa</th><th>vehículo</th><th>Federación</th><th>Sindicato</th></tr></thead><tbody>';
            data.vehiculos.forEach(vehiculo => {
              html += `<tr><td>${vehiculo.tipoV}</td><td>${vehiculo.marcaV}</td><td>${vehiculo.anioV}</td><td>${vehiculo.placa}</td><td>${vehiculo.clasevehiculo || ''}</td><td>${vehiculo.federacion || ''}</td><td>${vehiculo.sindicato || ''}</td></tr>`;
            });
            html += '</tbody></table></div>';
          } else {
            html += '<div class="alert alert-warning">No hay vehículos registrados.</div>';
          }
          body.innerHTML = html;
        } else {
          body.innerHTML = '<div class="alert alert-danger">No se pudo cargar la información.</div>';
        }
        // Mostrar el modal y limpiar backdrop si es necesario
        const modalEl = document.getElementById('modalInfoUsuario');
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
        // Solución para el backdrop que no desaparece
        function limpiarBackdrop() {
          document.body.classList.remove('modal-open');
          const backdrops = document.querySelectorAll('.modal-backdrop');
          backdrops.forEach(b => b.remove());
        }
        document.getElementById('cerrarInfoUsuario').onclick = limpiarBackdrop;
        document.getElementById('cerrarInfoUsuario2').onclick = limpiarBackdrop;
        modalEl.addEventListener('hidden.bs.modal', limpiarBackdrop, { once: true });
      })
      .catch(() => {
        const body = document.getElementById('infoUsuarioBody');
        body.innerHTML = '<div class="alert alert-danger">Error al cargar la información.</div>';
        const modal = new bootstrap.Modal(document.getElementById('modalInfoUsuario'));
        modal.show();
      });
  });
}
