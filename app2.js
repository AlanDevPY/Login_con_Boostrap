function redirectionPage(){
    window.location.href = 'index.html'
};

setTimeout(redirectionPage,600000)

const btnSesion = document.getElementById('btnSesion')

btnSesion.addEventListener('click', () => {
    window.location.href = 'index.html'
});