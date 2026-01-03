const form = document.getElementById('form');
const progress = document.getElementById('progress');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();
    const formData = new FormData(form);

    xhr.open('POST', form.action);

    xhr.upload.onprogress = (event) => {
        if (event.loaded !== event.total) {
            progress.value = event.loaded / event.total;
        }else{
            progress.value = 1;
            alert('Файл загружен!');
        }
    };

    xhr.send(formData);
});
