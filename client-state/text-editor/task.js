const textArea = document.getElementById('editor');
const clearBtn = document.getElementById('btn-clear');

function saveToLocalStore(key = 'text', value){
    localStorage.setItem(key, value);
    console.log('Saved');
}

function loadFromLocalStore(){
    return localStorage.getItem('text')
}

document.addEventListener('DOMContentLoaded', () =>{
    if(textArea.value.length === 0){
        textArea.value = loadFromLocalStore();
    }
    textArea.addEventListener('input', () =>{
        saveToLocalStore('text', textArea.value);
    })

    clearBtn.addEventListener('click', () =>{
        textArea.value = '';
    })
})