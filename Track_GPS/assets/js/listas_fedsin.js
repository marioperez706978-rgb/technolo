// Script para mostrar y eliminar federaciones y sindicatos en un modal

document.addEventListener('DOMContentLoaded', function() {
  // Modal editar federación
  let modalEditarFederacion;
  let idFederacionEditar = null;
  if (document.getElementById('modalEditarFederacion')) {
    modalEditarFederacion = new bootstrap.Modal(document.getElementById('modalEditarFederacion'));
  }

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-modificar-fed') || (e.target.closest('.btn-modificar-fed'))) {
      const btn = e.target.closest('.btn-modificar-fed');
      idFederacionEditar = btn.dataset.id;
      document.getElementById('inputIdFederacion').value = idFederacionEditar;
      document.getElementById('inputNombreFederacion').value = btn.dataset.nombre;
      modalEditarFederacion.show();
    }
  });

  document.getElementById('btnGuardarFederacion')?.addEventListener('click', function() {
    const id = document.getElementById('inputIdFederacion').value;
    const nuevoNombre = document.getElementById('inputNombreFederacion').value.trim();
    if (nuevoNombre !== '') {
      fetch('../php/modificar_federacion.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, nombre: nuevoNombre })
      })
      .then(res => res.json())
      .then(resp => {
        if (resp.success) {
          cargarListas();
          mostrarMensajeCentral('¡Federación modificada!', 'info');
          modalEditarFederacion.hide();
        } else {
          mostrarMensajeCentral('No se pudo modificar.', 'danger');
        }
      });
    }
  });
  // Modal editar sindicato
  let modalEditarSindicato;
  let idSindicatoEditar = null;
  if (document.getElementById('modalEditarSindicato')) {
    modalEditarSindicato = new bootstrap.Modal(document.getElementById('modalEditarSindicato'));
  }

  // Evento único para abrir el modal de edición de sindicato

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-modificar-sin') || (e.target.closest('.btn-modificar-sin'))) {
      const btn = e.target.closest('.btn-modificar-sin');
      idSindicatoEditar = btn.dataset.id;
      const inputId = document.getElementById('inputIdSindicato');
      const inputNombre = document.getElementById('inputNombreSindicato');
      inputId.value = idSindicatoEditar;
      inputNombre.value = btn.dataset.nombre;
      // Aseguramos que el input esté siempre editable
      inputNombre.removeAttribute('readonly');
      inputNombre.removeAttribute('disabled');
      inputNombre.readOnly = false;
      inputNombre.disabled = false;
      inputNombre.classList.remove('disabled');
      inputNombre.style.pointerEvents = 'auto';
      inputNombre.style.backgroundColor = '';
      // Cerrar modal principal si está abierto
      const modalListas = document.getElementById('modalListasFedSin');
      if (modalListas && modalListas.classList.contains('show')) {
        bootstrap.Modal.getInstance(modalListas)?.hide();
      }
      setTimeout(() => { modalEditarSindicato.show(); inputNombre.focus(); }, 300);
    }
    if (e.target.classList.contains('btn-modificar-fed') || (e.target.closest('.btn-modificar-fed'))) {
      const btn = e.target.closest('.btn-modificar-fed');
      idFederacionEditar = btn.dataset.id;
      document.getElementById('inputIdFederacion').value = idFederacionEditar;
      document.getElementById('inputNombreFederacion').value = btn.dataset.nombre;
      // Cerrar modal principal si está abierto
      const modalListas = document.getElementById('modalListasFedSin');
      if (modalListas && modalListas.classList.contains('show')) {
        bootstrap.Modal.getInstance(modalListas)?.hide();
      }
      setTimeout(() => { modalEditarFederacion.show(); }, 300);
    }
  });

  document.getElementById('btnGuardarSindicato')?.addEventListener('click', function() {
    const id = document.getElementById('inputIdSindicato').value;
    const nuevoNombre = document.getElementById('inputNombreSindicato').value.trim();
    if (nuevoNombre !== '') {
      fetch('../php/modificar_sindicato.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, nombre: nuevoNombre })
      })
      .then(res => res.json())
      .then(resp => {
        if (resp.success) {
          cargarListas();
          mostrarMensajeCentral('¡Sindicato modificado!', 'info');
          modalEditarSindicato.hide();
        } else {
          mostrarMensajeCentral('No se pudo modificar.', 'danger');
        }
      });
    }
  });
  // Evento para modificar sindicato
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-modificar-sin') || (e.target.closest('.btn-modificar-sin'))) {
      const btn = e.target.closest('.btn-modificar-sin');
  // ...el código para mostrar el modal ya está implementado arriba...
    }
  });
  const btnAbrirModalListas = document.getElementById('btnAbrirModalListas');
  if (!btnAbrirModalListas) return;

  btnAbrirModalListas.addEventListener('click', function() {
    cargarListas();
    const modal = new bootstrap.Modal(document.getElementById('modalListasFedSin'));
    modal.show();
  });

  function cargarListas() {
    // Federaciones
    fetch('../php/listar_federaciones.php')
      .then(res => res.json())
      .then(data => {
        const listaFed = document.getElementById('listaFederaciones');
        if (data.success && Array.isArray(data.federaciones)) {
          listaFed.innerHTML = data.federaciones.map(f =>
            `<li class="list-group-item d-flex justify-content-between align-items-center">
              <span>${f.nombre}</span>
              <div class="d-flex gap-2">
                <button class="btn btn-info btn-sm btn-ver-fed" data-id="${f.id}" data-nombre="${f.nombre}">Ver</button>
                <button class="btn btn-warning btn-sm btn-modificar-fed" data-id="${f.id}" data-nombre="${f.nombre}">Modificar</button>
                <button class="btn btn-danger btn-sm btn-eliminar-fed" data-id="${f.id}">Eliminar</button>
              </div>
            </li>`
          ).join('');
        } else {
          listaFed.innerHTML = '<li class="list-group-item">No hay federaciones registradas.</li>';
        }
  asignarEventosEliminar('fed');
  asignarEventosVerFed();
  function asignarEventosVerFed() {
    document.querySelectorAll('.btn-ver-fed').forEach(btn => {
      btn.onclick = function() {
        const idFed = this.dataset.id;
        const nombreFed = this.dataset.nombre;
        fetch('../php/listar_sindicatos.php?id_federacion=' + idFed)
          .then(res => res.json())
          .then(data => {
            const listaSin = document.getElementById('listaSindicatos');
            let html = '';
            if (data.success && Array.isArray(data.sindicatos) && data.sindicatos.length > 0) {
              html += '<ul class="list-group">' +
                data.sindicatos.map(s =>
                  `<li class='list-group-item d-flex justify-content-between align-items-center'>
                    <span>${s.nombre}</span>
                    <div class="d-flex gap-2">
                      <button class="btn btn-warning btn-sm btn-modificar-sin" data-id="${s.id}" data-nombre="${s.nombre}">Modificar</button>
                      <button class="btn btn-danger btn-sm btn-eliminar-sin" data-id="${s.id}">Eliminar</button>
                    </div>
                  </li>`
                ).join('') +
                '</ul>';
            } else {
              html += '<div class="alert alert-info">No hay sindicatos registrados para esta federación.</div>';
            }
            listaSin.innerHTML = html;
            asignarEventosEliminar('sin');
          });
      };
    });
  }
      });
    // Sindicatos
    fetch('../php/listar_sindicatos.php')
      .then(res => res.json())
      .then(data => {
        const listaSin = document.getElementById('listaSindicatos');
        if (data.success && Array.isArray(data.sindicatos)) {
          listaSin.innerHTML = data.sindicatos.map(s =>
            `<li class="list-group-item d-flex justify-content-between align-items-center">
              <span>${s.nombre}</span>
              <div class="d-flex gap-2">
                
                <button class="btn btn-danger btn-sm btn-eliminar-sin" data-id="${s.id}">Eliminar</button>
                <button class="btn btn-warning btn-sm btn-modificar-sin" data-id="${s.id}" data-nombre="${s.nombre}">Modificar</button>
              </div>
            </li>`
          ).join('');
        } else {
          listaSin.innerHTML = '<li class="list-group-item">No hay sindicatos registrados.</li>';
        }
        asignarEventosEliminar('sin');
      });
  }

  function mostrarMensajeCentral(mensaje, color = 'success') {
    let noti = document.getElementById('notificacionCentral');
    let msg = document.getElementById('notificacionMensaje');
    if (!noti) {
      noti = document.createElement('div');
      noti.id = 'notificacionCentral';
      noti.className = 'modal fade';
      noti.tabIndex = -1;
      noti.innerHTML = `<div class="modal-dialog modal-dialog-centered"><div class="modal-content bg-${color} text-white text-center" style="border-radius: 1rem; box-shadow: 0 0 20px #0002;"><div class="modal-body"><span id="notificacionMensaje" style="font-size:1.2rem;"></span></div></div></div>`;
      document.body.appendChild(noti);
      msg = document.getElementById('notificacionMensaje');
    }
    msg.textContent = mensaje;
    noti.classList.add('show');
    noti.style.display = 'block';
    setTimeout(() => {
      noti.classList.remove('show');
      noti.style.display = 'none';
    }, 1500);
  }

  function asignarEventosEliminar(tipo) {
    if (tipo === 'fed') {
      document.querySelectorAll('.btn-eliminar-fed').forEach(btn => {
        btn.onclick = function() {
          if (confirm('¿Estás seguro de eliminar esta federación?')) {
            fetch('../php/eliminar_federacion.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: this.dataset.id })
            })
            .then(res => res.json())
            .then(resp => {
              if (resp.success) {
                cargarListas();
                mostrarMensajeCentral('¡Eliminado exitosamente!');
              } else alert('No se pudo eliminar.');
            });
          }
        };
      });
    } else {
      document.querySelectorAll('.btn-eliminar-sin').forEach(btn => {
        btn.onclick = function() {
          if (confirm('¿Estás seguro de eliminar este sindicato?')) {
            fetch('../php/eliminar_sindicato.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: this.dataset.id })
            })
            .then(res => res.json())
            .then(resp => {
              if (resp.success) {
                cargarListas();
                mostrarMensajeCentral('¡Eliminado exitosamente!');
              } else alert('No se pudo eliminar.');
            });
          }
        };
      });
    }
  }
});
