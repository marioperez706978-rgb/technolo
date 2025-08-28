document.addEventListener('DOMContentLoaded', function() {
        // ... (Tu código JavaScript existente para el select de año) ...

        // Obtener el input de la placa
        const inputPlaca = document.getElementById('placa');

        // Añadir un "event listener" para cuando el usuario escribe (input)
        inputPlaca.addEventListener('input', function() {
            // Convertir el valor del input a mayúsculas y asignarlo de nuevo
            this.value = this.value.toUpperCase();
        });

        // Opcional: También puedes hacer que se convierta a mayúsculas al perder el foco (blur)
        /*
        inputPlaca.addEventListener('blur', function() {
            this.value = this.value.toUpperCase();
        });
        */
    });