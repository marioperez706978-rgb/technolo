const currentYear = new Date().getFullYear();
const startYear = currentYear - 80; 
const selectAnio = document.getElementById('anioVehiculo');
for (let year = currentYear; year >= startYear; year--) {
const option = document.createElement('option');
option.value = year;
option.textContent = year;
selectAnio.appendChild(option);}
