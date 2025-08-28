document.addEventListener('DOMContentLoaded', function() {
  var token = window.CSRF_TOKEN || localStorage.getItem('csrf_token') || sessionStorage.getItem('csrf_token');
  if(token) {
    document.getElementById('csrf_token_editar').value = token;
  }
});
