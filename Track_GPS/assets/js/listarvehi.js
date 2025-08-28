const btnListaVehiculos = document.getElementById('btnListaVehiculos');
if (btnListaVehiculos) {
  btnListaVehiculos.addEventListener('click', function(e) {
    e.preventDefault();
    fetch('../php/listar_placas_usuario.php')
      .then(res => res.json())
      .then(data => {
        const body = document.getElementById('listaPlacasBody');
          if (data.success && data.vehiculos && data.vehiculos.length > 0) {
            let html = '<div class="table-responsive"><table class="table table-bordered table-striped"><thead><tr>' +
              '<th>Tipo</th><th>Marca</th><th>Año</th><th>Placa</th><th>Uso del vehículo</th><th>Federación</th><th>Sindicato</th></tr></thead><tbody>';
            data.vehiculos.forEach(vehiculo => {
              html += `<tr><td>${vehiculo.tipoV}</td><td>${vehiculo.marcaV}</td><td>${vehiculo.anioV}</td><td>${vehiculo.placa}</td><td>${vehiculo.clasevehiculo || ''}</td><td>${vehiculo.federacion || ''}</td><td>${vehiculo.sindicato || ''}</td><</tr>`;
            });
            html += '</tbody></table></div>';
            body.innerHTML = html;
        } else {
          body.innerHTML = '<div class="alert alert-warning">No hay vehículos registrados.</div>';
        }
        const modal = new bootstrap.Modal(document.getElementById('modalListaVehiculos'));
        modal.show();
      })
      .catch(() => {
        const body = document.getElementById('listaPlacasBody');
        body.innerHTML = '<div class="alert alert-danger">Error al cargar la lista.</div>';
        const modal = new bootstrap.Modal(document.getElementById('modalListaVehiculos'));
        modal.show();
      });
  });
}
