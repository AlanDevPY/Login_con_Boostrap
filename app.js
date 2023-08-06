const inputName = document.getElementById('inputName');
const inputPassword = document.getElementById('inputPassword');
const btnSend = document.getElementById('btnSend');


btnSend.addEventListener('click', () => {
    let usuarioName = inputName.value;
    let usuarioPassword = inputPassword.value;

   if(usuarioName === 'alanromet' && usuarioPassword === "1234"){
    window.location.href ='https://www.google.com/'
   }else{
    inputName.value =''
    inputPassword.value =''
   }
});