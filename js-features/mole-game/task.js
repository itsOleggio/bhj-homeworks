let deadCounter = document.getElementById('dead');
let lostCounter = document.getElementById('lost');

let hole = document.querySelectorAll('.hole');


hole.forEach(hole =>{
    hole.addEventListener('click', () =>{
        if(hole.classList.contains('hole_has-mole')){
            deadCounter.textContent = (Number(deadCounter.textContent) + 1).toString();
            hole.classList.remove('hole_has-mole');
        }
        else{
            lostCounter.textContent = (Number(lostCounter.textContent) + 1).toString();
        }
        if (Number(lostCounter.textContent) === 10){
            reload('Вы проиграли!');
        }
        if(Number(deadCounter.textContent) === 5){
            reload('Вы выиграли!');
        }
    })
})

function reload(text){
    alert(text);
    deadCounter.textContent = '0';
    lostCounter.textContent = '0';
}