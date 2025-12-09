const tab = Array.from(document.querySelectorAll('.tab'));
const tab__content = Array.from(document.querySelectorAll('.tab__content'));

tab.forEach((item, index) => {
    item.addEventListener('click', () => {
        tab.forEach((item) => {
            item.classList.remove('tab_active');
        })
        tab__content.forEach((item) => {
            item.classList.remove('tab__content_active');
        })
        item.classList.add('tab_active');
        tab__content[index].classList.add('tab__content_active');
    })
});



