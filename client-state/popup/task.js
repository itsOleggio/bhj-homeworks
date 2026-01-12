const modalSubscribeWindow = document.getElementById('subscribe-modal');
const closeSubscribeWindow = document.querySelector('.modal__close_times');

function addCookieInfo(name, value, days){
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

closeSubscribeWindow.addEventListener('click', () => {
    modalSubscribeWindow.classList.remove('modal_active');
    addCookieInfo('popup', 'true', 30);
})

window.addEventListener('DOMContentLoaded', () => {
    if(!document.cookie.includes('popup=true')) {
        modalSubscribeWindow.classList.add('modal_active')
    }
})