const login = document.querySelector('input[name="login"]');
const password = document.querySelector('input[name="password"]');
const form = document.getElementById('signin__form');
const btn = document.getElementById('signin__btn');
const btnLogout = document.getElementById('logout');


document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    btnLogout.addEventListener('click', logout);
})

function checkAuth(){
    const user_id = localStorage.getItem('user_id');
    if(user_id === null){
        openForm();
    } else {
        showInfo(user_id);
    }
}

function logout(){
    localStorage.removeItem('user_id');
    openForm();
}

function openForm() {
    document.getElementById('signin').classList.add('signin_active');
    document.getElementById('welcome').classList.remove('welcome_active');
}

function showInfo(userID) {
    document.getElementById('signin').classList.remove('signin_active');
    document.getElementById('welcome').classList.add('welcome_active');
    document.getElementById('user_id').textContent = userID;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        login: login.value,
        password: password.value
    };
    fetchData('POST', 'https://students.netoservices.ru/nestjs-backend/auth', data,
        function(response) {
        if(response.success) {
            localStorage.setItem('user_id', response.user_id);
            login.value = '';
            password.value = '';
            showInfo(response.user_id);
        }
        else {
            alert('Неверный логин/пароль');
        }
    });
})

function fetchData(method, url, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            try {
                const response = JSON.parse(xhr.responseText);
                // console.log('Успешный ответ:', response);
                callback(response);
            } catch (error) {
                // console.error('Ошибка парсинга JSON:', error);
                callback({ success: false, message: 'Ошибка парсинга JSON' });
            }
        } else {
            // console.error('Ошибка сервера:', xhr.status, xhr.statusText);
            callback({ success: false, message: 'Ошибка сервера' });
        }
    };

    xhr.onerror = function() {
        // console.error('Ошибка сети при выполнении запроса');
        callback({ success: false, message: 'Ошибка сети' });
    };

    xhr.send(JSON.stringify(data));
}

