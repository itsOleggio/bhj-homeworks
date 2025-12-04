let currentElement = document.getElementById('timer');

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - (minutes * 60);
    let hours = Math.floor(minutes / 60);

    if (hours > 0) {
        minutes = minutes - (hours * 60);
    }

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    if (hours < 10) {
        hours = '0' + hours;
    }

    return hours + ':' + minutes + ':' + seconds;
}

function StartTimer(time){
    currentElement.innerHTML = formatTime(time);
    if(time > 0){
        setTimeout(function(){
            StartTimer(time - 1);
        }, 1000);
    }
    if (time === 0) {
        alert("Вы победили в конкурсе!")
        // setTimeout(function () {
        //     window.location = "https://github.com/itsOleggio";
        // }, 3000)
        window.location = "demo.gif";
    }
}


StartTimer(3);
// StartTimer(1200);