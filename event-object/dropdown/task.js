const ProgLanguageList = document.querySelector('.dropdown__list');
const menuSelection= document.querySelector('.dropdown');
const menuItems = Array.from(document.querySelectorAll('.dropdown__item'));
const value = document.querySelector('.dropdown__value');

menuSelection.addEventListener('click', () => {
    ProgLanguageList.classList.toggle('dropdown__list_active');
});

menuItems.forEach(item =>{
    item.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        value.textContent = item.textContent;
        ProgLanguageList.classList.remove('dropdown__list_active');
    })
})