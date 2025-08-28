document.addEventListener('DOMContentLoaded', function() {
      let usuariosData = [];
      const lista = document.getElementById('listaUsuariosDef');
      const inputBusqueda = document.getElementById('busquedaPlaca');
      const inputBusquedaCI = document.getElementById('busquedaCI');

      function renderUsuarios(usuarios) {
        lista.innerHTML = '';
        // Filtrar por placa y por CI
        let valorPlaca = inputBusqueda.value.trim().toLowerCase();
        let valorCI = inputBusquedaCI.value.trim();
        let filtrados = usuarios.filter(u => {
          let placaMatch = valorPlaca === '' || (u.placa || '').toLowerCase().includes(valorPlaca);
          let ciMatch = valorCI === '' || (u.ci || '').toString().includes(valorCI);
          return placaMatch && ciMatch;
        });
        // Ordenar: primero los que tienen vehículo, luego los que no, y los inactivos al final
        filtrados.sort((a, b) => {
          // Inactivos al final
          if (a.activo != b.activo) return b.activo - a.activo;
          // Luego por vehículo
          const tieneVehiculoA = !!a.placa && a.placa.trim() !== '';
          const tieneVehiculoB = !!b.placa && b.placa.trim() !== '';
          if (tieneVehiculoA === tieneVehiculoB) return 0;
          return tieneVehiculoA ? -1 : 1;
        });
        if (filtrados.length === 0) {
          lista.innerHTML = '<tr><td colspan="6" class="text-center">No hay usuarios registrados</td></tr>';
          document.getElementById('paginacionUsuarios').innerHTML = '';
          return;
        }
  // Filtrar: ocultar usuarios con rol_id 1
  filtrados = filtrados.filter(u => u.rol_id != 1);
        // Paginación
        const usuariosPorPagina = 10;
        let paginaActual = window.paginaActualUsuarios || 1;
        const totalPaginas = Math.ceil(filtrados.length / usuariosPorPagina);
        if (paginaActual > totalPaginas) paginaActual = totalPaginas;
        if (paginaActual < 1) paginaActual = 1;
        window.paginaActualUsuarios = paginaActual;
        const inicio = (paginaActual - 1) * usuariosPorPagina;
        const fin = inicio + usuariosPorPagina;
        const usuariosPagina = filtrados.slice(inicio, fin);
        usuariosPagina.forEach(usuario => {
          let acciones = `
            <button class="btn btn-info btn-sm me-1 btn-info-usuario" data-ci="${usuario.ci}">Información</button>
            <button class="btn btn-warning btn-sm me-1 btn-editar-usuario" data-ci="${usuario.ci}">Modificar</button>
          `;
          if (usuario.rol_id != 1) {
            acciones += `<button class="btn btn-danger btn-sm btn-eliminar-usuario" data-ci="${usuario.ci}">Eliminar</button>`;
          }
          lista.innerHTML += `
            <tr>
              <td>${usuario.nombre || ''}</td>
              <td>${usuario.apellido || ''}</td>
              <td>${usuario.telefono || ''}</td>
              <td>${usuario.placa || ''}</td>
              <td style="text-align:center; font-weight:bold; color:${usuario.activo == 1 ? '#198754' : '#dc3545'};">
                ${usuario.activo == 1 ? 'Activo' : 'Inactivo'}
              </td>
              <td class="text-center">
                ${acciones}
              </td>
            </tr>
          `;
        });
        // Renderizar paginación
        const paginacion = document.getElementById('paginacionUsuarios');
        let htmlPag = '';
        htmlPag += `<li class="page-item${paginaActual === 1 ? ' disabled' : ''}"><a class="page-link" href="#" data-pag="prev">&laquo;</a></li>`;
        for (let i = 1; i <= totalPaginas; i++) {
          htmlPag += `<li class="page-item${i === paginaActual ? ' active' : ''}"><a class="page-link" href="#" data-pag="${i}">${i}</a></li>`;
        }
        htmlPag += `<li class="page-item${paginaActual === totalPaginas ? ' disabled' : ''}"><a class="page-link" href="#" data-pag="next">&raquo;</a></li>`;
        paginacion.innerHTML = htmlPag;
        // Eventos de paginación
        paginacion.querySelectorAll('a.page-link').forEach(a => {
          a.addEventListener('click', function(e) {
            e.preventDefault();
            let pag = this.getAttribute('data-pag');
            if (pag === 'prev') pag = paginaActual - 1;
            else if (pag === 'next') pag = paginaActual + 1;
            else pag = parseInt(pag);
            window.paginaActualUsuarios = pag;
            renderUsuarios(usuarios);
            setTimeout(asignarEventos, 10);
          });
        });
      }

      fetch('../php/listar_usuarios_def.php')
        .then(res => res.json())
        .then(data => {
          if (data.success && Array.isArray(data.usuarios)) {
            usuariosData = data.usuarios;
            renderUsuarios(usuariosData);

            // Filtro en tiempo real por placa
            inputBusqueda.addEventListener('input', function() {
              renderUsuarios(usuariosData);
              setTimeout(asignarEventos, 10);
            });
            inputBusquedaCI.addEventListener('input', function() {
              renderUsuarios(usuariosData);
              setTimeout(asignarEventos, 10);
            });

            setTimeout(asignarEventos, 10);
          } else {
            renderUsuarios([]);
          }
        });

      function asignarEventos() {
        document.querySelectorAll('.btn-info-usuario').forEach(btn => {
          btn.addEventListener('click', function() {  
            const ci = this.getAttribute('data-ci');
            fetch('../php/obtener_info_usuario.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ci })
            })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                const u = data.usuario;
                const vehiculos = Array.isArray(data.vehiculos) ? data.vehiculos : [];
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
                          <li class='list-group-item'><b>Nacionalidad:</b> ${u.nacionalidad || ''}</li>
                          <li class='list-group-item'><b>Fecha de registro:</b> ${u.fecha_registro || ''}</li>
                        </ul>`;
                if (vehiculos.length > 0) {
                  html += `<h5 class='mb-3 text-success'>Vehículos Registrados</h5>`;
                  vehiculos.forEach((v, idx) => {
                    html += `<div class='mb-2'><b>Vehículo #${idx + 1}</b></div>
                      <ul class='list-group mb-3'>
                        <li class='list-group-item'><b>Tipo:</b> ${v.tipoV || ''}</li>
                        <li class='list-group-item oninput="this.value = this.value.toUpperCase()"'><b>Marca:</b> ${v.marcaV || ''}</li>
                        <li class='list-group-item'><b>Año:</b> ${v.anioV || ''}</li>
                        <li class='list-group-item oninput="this.value = this.value.toUpperCase()"'><b>Placa:</b> ${v.placa || ''}</li>
                        <li class='list-group-item'><b>Federación:</b> ${v.federacion || ''}</li>
                        <li class='list-group-item'><b>Sindicato:</b> ${v.sindicato || ''}</li>
                        <li class='list-group-item'><b>Uso del vehículo:</b> ${v.clasevehiculo || ''}</li>
                      </ul>`;
                  });
                } else {
                  html += `<div class='alert alert-info'>No hay vehículo registrado.</div>`;
                }
                html += `<div class='mt-3 text-end'><a class='btn btn-danger' href="../php/reporte3.php?ci=${encodeURIComponent(u.ci)}" target="_blank"><i class="bi bi-file-earmark-pdf"></i> Descargar PDF</a></div>`;
                document.getElementById('modalInfoBody').innerHTML = html;
                const modal = new bootstrap.Modal(document.getElementById('modalInfoUsuario'));
                modal.show();
              } else {
                alert('No se pudo obtener la información completa.');
              }
            })
            .catch(() => alert('Error de red o servidor.'));
          });
        });
             
              document.querySelectorAll('.btn-editar-usuario').forEach(btn => {
                btn.addEventListener('click', function() {
                  const ci = this.getAttribute('data-ci');
                  fetch('../php/obtener_info_usuario.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ci })
                  })
                  .then(res => res.json())
                  .then(data => {
                    if (data.success) {
                      const u = data.usuario;
                      const vehiculos = Array.isArray(data.vehiculos) ? data.vehiculos : [];
                      const tipos = ['BUS', 'MINIBUS', 'MICRO', 'TTRUFI', 'TAXI', 'CARRY', 'CAMIONETA', 'VAN', 'FURGON', 'COMBI', 'MOTO', 'MOTOTAXI', 'CAMION', 'VOLQUETE', 'AMBULANCIA', 'ESCOLAR', 'PARTICULAR'];
                      let html = `<h6>Datos de usuario</h6>
                        <div class="row">
                          <div class="col-md-12 mb-2"><label>Nombre de usuario<input type="text" class="form-control" name="nombre_usuario" value="${u.nombre_usuario || ''}"></label></div>
                          <div class="col-md-6 mb-2"><label>Nombre<input type="text" class="form-control" name="nombre" value="${u.nombre || ''}"></label></div>
                          <div class="col-md-6 mb-2"><label>Apellido<input type="text" class="form-control" name="apellido" value="${u.apellido || ''}"></label></div>
                          <div class="col-md-6 mb-2"><label>Cédula<input type="text" class="form-control" name="ci" id="ciEditar" value="${u.ci || ''}"></label></div>
                          <input type="hidden" name="ci_original" value="${u.ci || ''}">
                          <div class="col-md-6 mb-2"><label>Teléfono<input type="text" class="form-control" name="telefono" value="${u.telefono || ''}"></label></div>
                          <div class="col-md-6 mb-2"><label>Correo electrónico<input type="email" class="form-control" name="correo_electronico" value="${u.correo_electronico || ''}"></label></div>
                          <div class="col-md-6 mb-2"><label>Departamento<input type="text" class="form-control" name="departamento" value="${u.departamento || ''}"></label></div>
                          <div class="col-md-6 mb-2"><label>Dirección<input type="text" class="form-control" name="direccion" value="${u.direccion || ''}"></label></div>
                          <div class="col-md-6 mb-2"><label>Nacionalidad<input type="text" class="form-control" name="nacionalidad" value="${u.nacionalidad || ''}"></label></div>
                          <div class="col-md-6 mb-2"><label>Contraseña<input type="text" class="form-control" name="contrasena_hash" id="contrasenaEditar" value="${u.ci || ''}"></label></div>
                          <div class="col-md-6 mb-2 d-flex align-items-center"><label class="me-2">Estado:</label>
                            <div class="form-check form-switch">
                              <input class="form-check-input" type="checkbox" id="switchActivo" name="activo" ${u.activo == 1 ? 'checked' : ''}>
                              <label class="form-check-label" for="switchActivo">${u.activo == 1 ? 'Activo' : 'Inactivo'}</label>
                            </div>
                          </div>
                        </div>`;
                      html += `<h6 class="mt-3">Vehículos del usuario</h6>`;
                      if (vehiculos.length > 0) {
                        vehiculos.forEach((v, idx) => {
                          let tipoOptions = tipos.map(t => `<option value="${t}" ${v.tipoV === t ? 'selected' : ''}>${t}</option>`).join('');
                          html += `<div class="vehiculo-edit-block border rounded p-2 mb-3" data-id-vehiculo="${v.id}">
                            <div class="row align-items-end">
                              <div class="col-md-3 mb-2"><label>Tipo<select class="form-control" name="tipoV_${v.id}">${tipoOptions}</select></label></div>
                              <div class="col-md-3 mb-2"><label>Marca<input type="text" class="form-control" name="marcaV_${v.id}" value="${v.marcaV || ''}" oninput="this.value = this.value.toUpperCase()"></label></div>
                              <div class="col-md-2 mb-2"><label>Año<input type="number" class="form-control" name="anioV_${v.id}" value="${v.anioV || ''}"></label></div>
                              <div class="col-md-2 mb-2"><label>Placa<input type="text" class="form-control" name="placa_${v.id}" value="${v.placa || ''}" oninput="this.value = this.value.toUpperCase()"></label></div>
                              <div class="col-md-2 mb-2 d-flex align-items-center"><button type="button" class="btn btn-danger btn-sm btn-eliminar-vehiculo" data-id-vehiculo="${v.id}">Eliminar</button></div>
                            </div>
                          </div>`;
                        });
                      } else {
                        html += `<div class='alert alert-info'>No hay vehículo registrado.</div>`;
                      }
                      document.getElementById('modalEditarBody').innerHTML = html;

                      // Eliminar vehículo (solo visual, se envía al backend en submit)
                      const vehiculosAEliminar = new Set();
                      document.querySelectorAll('.btn-eliminar-vehiculo').forEach(btn => {
                        btn.addEventListener('click', function() {
                          const idVeh = this.getAttribute('data-id-vehiculo');
                          vehiculosAEliminar.add(idVeh);
                          this.closest('.vehiculo-edit-block').remove();
                        });
                      });

                      // Actualizar el token CSRF antes de mostrar el modal

                      let modalEditarUsuario;
                      fetch('../php/obtener_csrf.php')
                        .then(res => res.json())
                        .then(data => {
                          const csrfInput = document.getElementById('csrf_token_editar');
                          if (csrfInput && data.csrf_token) {
                            csrfInput.value = data.csrf_token;
                          }
                          modalEditarUsuario = new bootstrap.Modal(document.getElementById('modalEditarUsuario'));
                          modalEditarUsuario.show();
                        });

                      // Sincronizar CI con contraseña en edición
                      const ciEditar = document.getElementById('ciEditar');
                      const passEditar = document.getElementById('contrasenaEditar');
                      if (ciEditar && passEditar) {
                        ciEditar.addEventListener('input', function() {
                          passEditar.value = ciEditar.value;
                        });
                        // Inicializar contraseña si ya hay valor en CI
                        passEditar.value = ciEditar.value;
                      }

                      const form = document.getElementById('formEditarUsuario');
                      form.onsubmit = function(e) {
                        e.preventDefault();
                        const formData = new FormData(form);
                        const datos = {};
                        formData.forEach((v, k) => datos[k] = v);
                        // Estado activo/inactivo
                        datos.activo = document.getElementById('switchActivo').checked ? 1 : 0;
                        // Asegurarse de enviar ci_original aunque el usuario cambie la cédula
                        if (!datos.ci_original) {
                          datos.ci_original = datos.ci;
                        }
                        // Asegurarse de que la contraseña enviada sea igual al CI
                        datos.contrasena_hash = datos.ci;

                        // Recopilar datos de vehículos editados
                        datos.vehiculos = [];
                        document.querySelectorAll('.vehiculo-edit-block').forEach(block => {
                          const idVeh = block.getAttribute('data-id-vehiculo');
                          datos.vehiculos.push({
                            id: idVeh,
                            tipoV: form[`tipoV_${idVeh}`]?.value || '',
                            marcaV: form[`marcaV_${idVeh}`]?.value || '',
                            anioV: form[`anioV_${idVeh}`]?.value || '',
                            placa: form[`placa_${idVeh}`]?.value || ''
                          });
                        });

                        // Vehículos a eliminar
                        datos.vehiculos_eliminar = Array.from(vehiculosAEliminar);

                        // Agregar token CSRF
                        const csrfInput = document.getElementById('csrf_token_editar');
                        if (csrfInput) {
                          datos.csrf_token = csrfInput.value;
                        }

                        fetch('../php/modificar_usuario.php', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(datos)
                        })
                        .then(async res => {
                          if (!res.ok) {
                            let msg = 'Error de red o servidor.';
                            try {
                              const data = await res.json();
                              msg = data.message || msg;
                            } catch {}
                            throw new Error(msg);
                          }
                          return res.json();
                        })
                        .then(resp => {
                          if (resp.success) {
                            if (modalEditarUsuario) modalEditarUsuario.hide();
                            mostrarNotificacion('Datos actualizados correctamente.');
                            setTimeout(() => location.reload(), 1500);
                          } else {
                            alert(resp.message || 'No se pudo actualizar.');
                          }
                        })
                        .catch(err => alert(err.message || 'Error de red o servidor.'));
                      };
                    } else {
                      alert('No se pudo obtener la información para editar.');
                    }
                  })
                  .catch(() => alert('Error de red o servidor.'));
                });
              });
          
              document.querySelectorAll('.btn-eliminar-usuario').forEach(btn => {
                btn.addEventListener('click', function() {
                  const ci = this.getAttribute('data-ci');
                  if(confirm('¿Está seguro que desea eliminar este usuario?')) {
                    fetch('../php/eliminar_usuario.php', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ ci })
                    })
                    .then(res => res.json())
                    .then(resp => {
                      if(resp.success) {
                        mostrarNotificacion('Usuario eliminado correctamente.');
                        setTimeout(() => location.reload(), 1500);
                      } else {
                        alert('No se pudo eliminar: ' + (resp.message || 'Error desconocido'));
                      }
                    })
                    .catch(() => alert('Error de red o servidor.'));
                  }
                });
              });
      }
      // Fin de asignarEventos
    });