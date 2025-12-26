const tooltips = document.querySelectorAll('.has-tooltip');

tooltips.forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();

        const activeTooltip = document.querySelector('.tooltip_active');

        if (activeTooltip && activeTooltip.previousElementSibling === element) {
            // console.log('Удаляем');
            activeTooltip.remove();
            return;
        }

        document.querySelectorAll('.tooltip_active').forEach(t => t.remove());

        // console.log('Создаем');
        const tooltip = document.createElement('div');
        tooltip.textContent = element.title;
        tooltip.classList.add('tooltip');
        tooltip.classList.add('tooltip_active');

        element.insertAdjacentElement('afterend', tooltip);

        const coords = element.getBoundingClientRect();
        const left = coords.left + (element.offsetWidth - tooltip.offsetWidth) / 2;
        const top = coords.top - tooltip.offsetHeight;

        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';

    })
})