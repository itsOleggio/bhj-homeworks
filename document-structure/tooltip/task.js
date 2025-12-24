const tooltips = document.querySelectorAll('.has-tooltip');

tooltips.forEach(element => {
    element.addEventListener('mouseover', (e) => {
        e.preventDefault();

        let tooltip = element.querySelector('.tooltip_active');

        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.textContent = element.title;
            tooltip.classList.add('tooltip');
            tooltip.classList.add('tooltip_active');

            document.body.appendChild(tooltip);

            const coords = element.getBoundingClientRect();
            const left = coords.left + (element.offsetWidth - tooltip.offsetWidth) / 2;
            const top = coords.top - tooltip.offsetHeight + 50;

            tooltip.style.top = top + 'px';
            tooltip.style.left = left + 'px';
        }
    })
    element.addEventListener('mouseleave', (e) => {
        e.preventDefault();

        let tooltip = document.querySelector('.tooltip_active');

        if (tooltip) {
            tooltip.remove();
        }
    })
})