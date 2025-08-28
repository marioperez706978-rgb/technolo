
            document.addEventListener('DOMContentLoaded', function() {
            const placaInput = document.getElementById('placa');
            const form = placaInput.closest('form'); 

            if (form) {
                form.addEventListener('submit', function(event) {
              if (!placaInput.checkValidity()) {
                    event.preventDefault(); 
                    event.stopPropagation(); 
                    placaInput.classList.add('is-invalid'); 
                } else {
                    placaInput.classList.remove('is-invalid');
                }
            }, false);

            placaInput.addEventListener('input', function() {
              
                if (placaInput.value.length > 0) {
                    placaInput.classList.remove('is-invalid');
                }
                
            });

            placaInput.addEventListener('blur', function() {
               
                if (!placaInput.checkValidity() && placaInput.value.length > 0) {
                    placaInput.classList.add('is-invalid');
                } else {
                    placaInput.classList.remove('is-invalid');
                }
                });
              }
           });