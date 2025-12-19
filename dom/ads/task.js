const rotatorCases = document.querySelectorAll('.rotator__case');

let currentIndex = 0;
let intervalId;

function Rotation(){
    const speed = rotatorCases[currentIndex].getAttribute('data-speed')
    const time = speed ? Number(speed) : 1000;

    if(intervalId) clearInterval(intervalId);

    intervalId = setInterval(() =>{
        rotatorCases[currentIndex].classList.remove('rotator__case_active');
        currentIndex = (currentIndex + 1) % rotatorCases.length;
        rotatorCases[currentIndex].classList.add('rotator__case_active')
        rotatorCases[currentIndex].style.color = rotatorCases[currentIndex].getAttribute('data-color');
        console.log(currentIndex);
        // clearInterval(intervalId);
        Rotation();
    }, time)
}

if(rotatorCases.length > 0){
    Rotation();
}



