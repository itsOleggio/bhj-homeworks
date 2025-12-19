const buttons = document.querySelectorAll('a.font-size');
const content = document.querySelectorAll('p');
const textColorBtns = document.querySelectorAll('.book__control_color .color')
const bgColorBtns = document.querySelectorAll('.book__control_background .color');

for(let link of buttons){
    link.dataset.size = link.dataset.size || "default";

    link.addEventListener('click', event =>{
        event.preventDefault();

        const newSize = event.target.dataset.size;
        // console.log(newSize);

        buttons.forEach(btn => btn.classList.remove('font-size_active'))
        event.target.classList.add('font-size_active')

        changeSize(newSize);

    })
}

function changeSize(newSize) {
    content.forEach(paragraph => {
        paragraph.classList.remove('book_fs-small', 'book_fs-big');
    });

    if (newSize === 'small') {
        content.forEach(paragraph => {
            paragraph.classList.add('book_fs-small');
        });
    } else if (newSize === 'big') {
        content.forEach(paragraph => {
            paragraph.classList.add('book_fs-big');
        });
    }
}

textColorBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        textColorBtns.forEach(b => b.classList.remove('color_active'));
        this.classList.add('color_active');
    });
});

bgColorBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        bgColorBtns.forEach(b => b.classList.remove('color_active'));
        this.classList.add('color_active');
    });
});


