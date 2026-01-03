
const loader = document.getElementById('loader');
const itemContainer = document.getElementById('items');

function getTime(){
    const Data = new Date();
    let hour = Data.getHours();
    let minute = Data.getMinutes();
    let second = Data.getSeconds();

    console.log('Данные обновлены:' + hour + ':' + minute + ':' + second);
}

function loadDataLocalStorage() {
    const cachedData = localStorage.getItem('currentData');
    const cachedTimestamp = localStorage.getItem('currentTimestamp');

    if (cachedData && cachedTimestamp) {
        const now = Date.now();
        const cachedAge = now - parseInt(cachedTimestamp);

        if (cachedAge < 60000) {
            displayData(JSON.parse(cachedData));
            fetchData();
            return;
        }
    }
    fetchData();
}

function fetchData(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');

    xhr.onload = () =>{
        try{
            const response = JSON.parse(xhr.response);

            localStorage.setItem('currentData', JSON.stringify(response));
            localStorage.setItem('currentTimestamp', Date.now().toString());
            displayData(response);
        }
        catch(e){
            console.log('Ошибка:', e);
        }
    }
    xhr.send();
    getTime();
}

function displayData(response){
    try{
        // response = JSON.parse(response);
        const valutes = response.response.Valute;
        const itemsArray = Object.values(valutes || {});
        itemContainer.innerHTML = '';

        itemsArray.forEach((item) => {
            const itemElement = document.createElement('div');

            itemElement.classList.add('item');
            itemElement.innerHTML = `
                <div class="item__code">
                    ${item.CharCode}
                </div>
                <div class="item__value">
                    ${item.Value}
                </div>
                <div class="item__value">
                    руб.
                </div>
                `;
            itemContainer.appendChild(itemElement);
        });
        loader.classList.remove('loader_active');
    } catch (e) {
        const itemElement = document.createElement('div');
        console.log('Ошибка:', e);
        itemElement.innerHTML = `
                <div class="item__code">
                  Ошибка ${e}
                </div>
            `
        loader.classList.remove('loader_active');
        document.getElementById('items').appendChild(itemElement);
    }
}

document.addEventListener('DOMContentLoaded', () =>{
    loader.classList.add('loader_active');
    loadDataLocalStorage();
    setInterval(loadDataLocalStorage, 60000);
});



