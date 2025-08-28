
          document.addEventListener('DOMContentLoaded', function() {
                                        document.getElementById('configCuenta')?.addEventListener('click', function(e) {
                                                // Obtener usuario con rol_id 1
                                                fetch('../php/listar_usuarios_def.php')
                                                    .then(res => res.json())
                                                    .then(data => {
                                                        if (data.success && Array.isArray(data.usuarios)) {
                                                            const admin = data.usuarios.find(u => u.rol_id == 1);
                                                            if (admin) {
                                                                document.getElementById('usuarioConfig').value = admin.nombre_usuario || '';
                                                                document.getElementById('contrasenaConfig').value = admin.contrasena_hash || '';
                                                            }
                                                        }
                                                    });
                                        });

                    document.getElementById('formConfigCuenta')?.addEventListener('submit', function(e) {
                        e.preventDefault();
                        const usuario = document.getElementById('usuarioConfig').value.trim();
                        const contrasena = document.getElementById('contrasenaConfig').value;
                        fetch('../php/listar_usuarios_def.php')
                            .then(res => res.json())
                            .then(data => {
                                if (data.success && Array.isArray(data.usuarios)) {
                                    const admin = data.usuarios.find(u => u.rol_id == 1);
                                    if (admin) {
                                        fetch('../php/modificar_usuario.php', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ nombre_usuario: usuario, contrasena_hash: contrasena, ci: admin.ci, ci_original: admin.ci, solo_config: true })
                                        })
                                        .then(res => res.json())
                                        .then(data => {
                                            if (data.success) {
                                                alert('Datos actualizados correctamente.');
                                                document.getElementById('modalConfigCuenta').querySelector('.btn-close').click();
                                            } else {
                                                alert(data.message || 'No se pudo actualizar.');
                                            }
                                        })
                                        .catch(() => alert('Error de red o servidor.'));
                                    }
                                }
                            });
                    });
           document.getElementById('cerrarSesion')?.addEventListener('click', function(e) {
          e.preventDefault();
          localStorage.clear();
          window.location.href = '../index.html';
          });
         });
