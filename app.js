const inputName = document.getElementById('inputName');
const inputPassword = document.getElementById('inputPassword');
const btnSend = document.getElementById('btnSend');


btnSend.addEventListener('click', () => {
    let usuarioName = inputName.value;
    let usuarioPassword = inputPassword.value;

   if(usuarioName === '123' && usuarioPassword === "123"){
    window.location.href ='tareas.html'
   }else{
    inputName.value =''
    inputPassword.value =''
   }
});

// // Función para recargar la página
// function recargarPagina() {
//     location.reload();
//   }
  
//   // Establecer un temporizador para recargar la página cada 5 segundos (5000 milisegundos)
//   setTimeout(recargarPagina, 5000);
  