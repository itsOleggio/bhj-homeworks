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

