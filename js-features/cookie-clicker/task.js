/* var 1
let cookie = document.getElementById("cookie");
let counter = document.getElementById("clicker__counter");
let counterSpeed = document.getElementById("clicker__timer");

let counterClick = 0;
let time = 0;
let timeStart = false;

let timer = function () {
    timeStart = true;
    setInterval(function () {
        time += 0.01;
        counterSpeed.textContent = (counterClick / time).toFixed(2);
    }, 10);
}
cookie.onclick = function () {

    counterClick++;
    counter.textContent = counterClick;

    if (!timeStart) {
        timer();
    }

    cookie.style.width = "400px";
    setTimeout(function () {
        cookie.style.width = "200px";
    }, 100)

}
*/


// var. 2


const cookie = document.getElementById("cookie");
const counter = document.getElementById("clicker__counter");
const counterSpeed = document.getElementById("clicker__timer");

let prevTimestamp = Date.now();

cookie.onclick = () => {
    cookie.width = ++counter.textContent % 2 ? 400 : 200;
    const elapsedTime = (Date.now() - prevTimestamp) / 1000; // сколько прошло секунд
    counterSpeed.textContent = (1 / elapsedTime).toFixed(2);
    prevTimestamp = Date.now();
}
