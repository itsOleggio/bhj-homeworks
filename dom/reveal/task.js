const reveal = document.querySelectorAll('.reveal');

for(let element of reveal){
    window.addEventListener('scroll', ()=>
    {
        isVisiable(element)
    })
}

function isVisiable(el){
    const {top, bottom} = el.getBoundingClientRect();

    if(top < 0){
        return el.classList.remove('reveal_active');
    }
    else if(bottom > window.innerHeight){
        return  el.classList.remove('reveal_active')
    }
    return el.classList.add('reveal_active')
}

