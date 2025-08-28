document.addEventListener('DOMContentLoaded', function() {
    // Cargar federaciones en el select
    fetch('../php/listar_federaciones.php')
        .then(response => response.json())
        .then(data => {
            const federacionSelect = document.getElementById('federacion');
            if (data.success && Array.isArray(data.federaciones)) {
                data.federaciones.forEach(fed => {
                    const option = document.createElement('option');
                    option.value = fed.id;
                    option.textContent = fed.nombre;
                    federacionSelect.appendChild(option);
                });
            }
        });

    // Cargar sindicatos según federación seleccionada
    document.getElementById('federacion').addEventListener('change', function() {
        const idFederacion = this.value;
        const sindicatoSelect = document.getElementById('sindicato');
        sindicatoSelect.innerHTML = '<option value="" selected disabled>Selecciona un sindicato</option>';
        if (idFederacion) {
            fetch(`../php/listar_sindicatos.php?id_federacion=${idFederacion}`)
                .then(response => response.json())
                .then(data => {
                    if (data.success && Array.isArray(data.sindicatos)) {
                        data.sindicatos.forEach(sin => {
                            const option = document.createElement('option');
                            option.value = sin.id;
                            option.textContent = sin.nombre;
                            sindicatoSelect.appendChild(option);
                        });
                    }
                });
        }
    });

    // Registro de federación con toast visual Bootstrap
    const formFederacion = document.getElementById('formFederacion');
    if (formFederacion) {
        formFederacion.addEventListener('submit', function(e) {
            e.preventDefault();
            fetch('../php/guardar_federacion.php', {
                method: 'POST',
                body: new FormData(formFederacion)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    mostrarFederacionGuardada();
                    formFederacion.reset();
                    const modal = bootstrap.Modal.getInstance(document.getElementById('modalAgregarFederacion'));
                    if (modal) modal.hide();
                } else {
                    mostrarFederacionError(data.message || 'Error al registrar federación.');
                }
            })
            .catch(() => {
                mostrarFederacionError('Error de conexión.');
            });
        });
    }

    // Toast visual para éxito
    function mostrarFederacionGuardada() {
        let noti = document.getElementById('notificacionCentralFed');
        let msg;
        if (!noti) {
            noti = document.createElement('div');
            noti.id = 'notificacionCentralFed';
            noti.className = 'modal fade show';
            noti.tabIndex = -1;
            noti.style.display = 'block';
            noti.style.zIndex = '9999';
            noti.innerHTML = `<div class="modal-dialog modal-dialog-centered"><div class="modal-content bg-success text-white text-center" style="border-radius: 1rem; box-shadow: 0 0 20px #0002;"><div class="modal-body"><span id="notificacionMensajeFed" style="font-size:1.2rem;">Federación agregada</span></div></div></div>`;
            document.body.appendChild(noti);
            msg = document.getElementById('notificacionMensajeFed');
        } else {
            msg = document.getElementById('notificacionMensajeFed');
            msg.textContent = 'Federación agregada';
            noti.classList.add('show');
            noti.style.display = 'block';
        }
        setTimeout(() => {
            noti.classList.remove('show');
            noti.style.display = 'none';
        }, 1800);
    }

    // Toast visual para error
    function mostrarFederacionError(msg) {
        let toast = document.getElementById('toastFederacionError');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toastFederacionError';
            toast.className = 'toast align-items-center text-bg-danger border-0 position-fixed top-50 start-50 translate-middle';
            toast.style.zIndex = '9999';
            toast.style.minWidth = '300px';
            toast.innerHTML = `
                <div class="d-flex">
                    <div class="toast-body fw-semibold">
                        ${msg}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            `;
            document.body.appendChild(toast);
        } else {
            toast.querySelector('.toast-body').textContent = msg;
        }
        const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
        bsToast.show();
    }
});