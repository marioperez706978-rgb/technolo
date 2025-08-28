document.addEventListener('DOMContentLoaded', function() {
  const cerrarSesionBtn = document.getElementById('cerrarSesion');
  if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.clear(); 
  window.location.href = '../index.html';
    });
  }
  document.getElementById('btnInfoUsuario')?.addEventListener('click', async function(e) {
    e.preventDefault();
    let usuario = null;
    try {
      usuario = JSON.parse(localStorage.getItem('usuario'));
    } catch {}
    if (!usuario || !usuario.ci) {
      document.getElementById('infoUsuarioBody').innerHTML = '<div class="alert alert-danger">No hay información de usuario disponible.</div>';
      new bootstrap.Modal(document.getElementById('modalInfoUsuario')).show();
      return;
    }
    
    const resp = await fetch('../php/obtener_info_usuario.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ci: usuario.ci })
    });
    const data = await resp.json();
    if (data.success && data.usuario) {
      const u = data.usuario;
      let html = `<h5 class='mb-3 text-primary'>Datos de Usuario</h5>
        <ul class='list-group mb-3'>
          <li class='list-group-item'><b>ID usuario:</b> ${u.id || ''}</li>
          <li class='list-group-item'><b>Usuario:</b> ${u.nombre_usuario || ''}</li>
          <li class='list-group-item'><b>Nombre:</b> ${u.nombre || ''} ${u.apellido || ''}</li>
          <li class='list-group-item'><b>Correo:</b> ${u.correo_electronico || ''}</li>
          <li class='list-group-item'><b>CI:</b> ${u.ci || ''}</li>
          <li class='list-group-item'><b>Teléfono:</b> ${u.telefono || ''}</li>
          <li class='list-group-item'><b>Departamento:</b> ${u.departamento || ''}</li>
          <li class='list-group-item'><b>Dirección:</b> ${u.direccion || ''}</li>
          <li class='list-group-item'><b>Fecha de registro:</b> ${u.fecha_registro || ''}</li>
        </ul>`;
      if (data.vehiculo) {
        const v = data.vehiculo;
        html += `<h5 class='mb-3 text-success'>Datos de Vehículo</h5>
        <ul class='list-group'>
          <li class='list-group-item'><b>Tipo:</b> ${v.tipoV || ''}</li>
          <li class='list-group-item'><b>Marca:</b> ${v.marcaV || ''}</li>
          <li class='list-group-item'><b>Año:</b> ${v.anioV || ''}</li>
          <li class='list-group-item'><b>Placa:</b> ${v.placa || ''}</li>
          <li class='list-group-item'><b>Federación:</b> ${v.federacion || ''}</li>
          <li class='list-group-item'><b>Sindicato:</b> ${v.sindicato || ''}</li>
        </ul>`;
      } else {
        html += `<div class='alert alert-info'>No hay vehículo registrado.</div>`;
      }
      document.getElementById('infoUsuarioBody').innerHTML = html;
      new bootstrap.Modal(document.getElementById('modalInfoUsuario')).show();
    } else {
      document.getElementById('infoUsuarioBody').innerHTML = '<div class="alert alert-danger">No se pudo obtener la información del usuario.</div>';
      new bootstrap.Modal(document.getElementById('modalInfoUsuario')).show();
    }
  });
});