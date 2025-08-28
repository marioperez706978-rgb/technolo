document.addEventListener('DOMContentLoaded', function () {
  fetch('../php/listar_usuarios.php')
    .then(res => res.json())
    .then(data => {
      const lista = document.getElementById('listaUsuarios');
      lista.innerHTML = '';
      let usuarios = data.success && Array.isArray(data.usuarios) ? data.usuarios : [];

      // --- CONFIGURACIÓN DE PAGINACIÓN ---
      let currentPage = 1;
      let rowsPerPage = 10; // cantidad de filas por página
      const pagination = document.getElementById('pagination');

      // Mover el input de filtro debajo del título
      const container = document.querySelector('.container.mt-5');
      const filtroDiv = document.createElement('div');
      filtroDiv.className = 'mb-3 text-center';
      filtroDiv.innerHTML = `
        <input type="text" id="inputFiltroCI" class="form-control w-50 d-inline-block" placeholder="Buscar por cédula..." style="max-width:300px;">
      `;
      const titulo = container.querySelector('h3');
      container.insertBefore(filtroDiv, titulo.nextSibling);

      let filtroCI = '';

      function renderTable() {
        lista.innerHTML = '';
        let usuariosFiltrados = filtroCI ? usuarios.filter(u => (u.ci || '').toString().includes(filtroCI)) : usuarios;
        let start = (currentPage - 1) * rowsPerPage;
        let end = start + rowsPerPage;
        let paginatedUsers = usuariosFiltrados.slice(start, end);

        if (paginatedUsers.length === 0) {
          lista.innerHTML = '<tr><td colspan="10" class="text-center">No hay usuarios registrados</td></tr>';
          return;
        }

        paginatedUsers.forEach(usuario => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${usuario.nombre || ''}</td>
            <td>${usuario.apellido || ''}</td>
            <td>${usuario.ci || ''}</td>
            <td>${usuario.telefono || ''}</td>
            <td class="text-center">
              <button class="btn btn-success btn-sm me-1 btn-aceptar">Aceptar</button>
              <button class="btn btn-danger btn-sm btn-rechazar">Rechazar</button>
            </td>
          `;
          tr.dataset.usuario = JSON.stringify(usuario);
          lista.appendChild(tr);
        });

        // Agregar eventos a los botones después de renderizar la tabla
        // Mostrar modal de aceptar
        document.querySelectorAll('.btn-aceptar').forEach(btn => {
          btn.addEventListener('click', function () {
            const usuario = JSON.parse(this.closest('tr').dataset.usuario);
            window.usuarioSeleccionado = usuario;
            const modalAceptar = new bootstrap.Modal(document.getElementById('modalConfirmarAceptar'));
            modalAceptar.show();
          });
        });
        // Mostrar modal de rechazar
        document.querySelectorAll('.btn-rechazar').forEach(btn => {
          btn.addEventListener('click', function () {
            const usuario = JSON.parse(this.closest('tr').dataset.usuario);
            window.usuarioSeleccionado = usuario;
            const modalRechazar = new bootstrap.Modal(document.getElementById('modalConfirmarRechazar'));
            modalRechazar.show();
          });
        });

        renderPagination();
      }

      function renderPagination() {
        pagination.innerHTML = '';
        let totalPages = Math.ceil(usuarios.length / rowsPerPage);

        for (let i = 1; i <= totalPages; i++) {
          let li = document.createElement('li');
          li.className = `page-item ${i === currentPage ? 'active' : ''}`;
          li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
          li.addEventListener('click', function (e) {
            e.preventDefault();
            currentPage = i;
            renderTable();
          });
          pagination.appendChild(li);
        }
      }

      renderTable(); // dibuja la primera página

        // Acción aceptar usuario
        document.getElementById('btnConfirmarAceptar').addEventListener('click', function () {
          if (!window.usuarioSeleccionado) return;
          fetch('../php/aceptar_usuario.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(window.usuarioSeleccionado)
          })
          .then(res => res.json())
          .then(resp => {
            if (resp.success) {
              mostrarToast('Usuario aceptado', 'bg-success');
              usuarios = usuarios.filter(u => u.ci !== window.usuarioSeleccionado.ci);
              renderTable();
              // Ocultar modal de aceptar
              const modalAceptar = bootstrap.Modal.getInstance(document.getElementById('modalConfirmarAceptar'));
              if (modalAceptar) modalAceptar.hide();
            } else {
              mostrarToast('Error al aceptar: ' + (resp.message || 'Error'), 'bg-danger');
            }
          })
          .catch(() => mostrarToast('Error de conexión', 'bg-danger'));
        });

        // Acción rechazar usuario
        document.getElementById('btnConfirmarRechazar').addEventListener('click', function () {
          if (!window.usuarioSeleccionado) return;
          fetch('../php/rechazar_usuario.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ci: window.usuarioSeleccionado.ci })
          })
          .then(res => res.json())
          .then(resp => {
            if (resp.success) {
              mostrarToast('Usuario rechazado', 'bg-danger');
              usuarios = usuarios.filter(u => u.ci !== window.usuarioSeleccionado.ci);
              renderTable();
              // Ocultar modal de rechazar
              const modalRechazar = bootstrap.Modal.getInstance(document.getElementById('modalConfirmarRechazar'));
              if (modalRechazar) modalRechazar.hide();
            } else {
              mostrarToast('Error al rechazar: ' + (resp.message || 'Error'), 'bg-danger');
            }
          })
          .catch(() => mostrarToast('Error de conexión', 'bg-danger'));
        });

        // Función para mostrar notificaciones tipo toast
        function mostrarToast(mensaje, clase) {
          var toast = document.getElementById('toastNoti');
          var toastMsg = document.getElementById('toastNotiMsg');
          toastMsg.textContent = mensaje;
          toast.className = 'toast align-items-center text-white border-0 position-fixed top-50 start-50 translate-middle ' + clase;
          toast.style.display = 'block';
          // Ocultar el toast automáticamente después de 2 segundos
          setTimeout(() => { toast.style.display = 'none'; }, 2000);
          // Ocultar el toast si se hace clic en la X
          toast.querySelector('.btn-close').onclick = function() {
            toast.style.display = 'none';
          };
        }

        // Evento para el input de filtro
        const inputFiltro = document.getElementById('inputFiltroCI');
        inputFiltro.addEventListener('input', function() {
          filtroCI = this.value.trim();
          currentPage = 1;
          renderTable();
        });
    });
});