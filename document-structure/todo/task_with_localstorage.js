const input = document.getElementById('task__input');
const btnSend = document.getElementById('tasks__add');
const list = document.getElementById('tasks__list');

renderTask();

function addTask(taskText) {
    if (taskText.length === 0) {
        let error__message = document.querySelector('.error-message');

        if (!error__message) {
            error__message.textContent = 'Введите задачу';
            console.log(error__message)
            document.body.appendChild(error__message);
        }
    } else {
        const tasks = getTask();
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTask();
        input.value = '';
    }
}

function getTask() {
    const tasksJSON = localStorage.getItem('tasks');
    console.log(tasksJSON);
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}


function renderTask() {
    list.innerHTML = '';

    const tasks = getTask();

    for (let i = 0; i < tasks.length; i++) {
        const task__title = document.createElement('div');
        task__title.classList.add('task');
        task__title.innerHTML = `
            <div class="task__title">${tasks[i]}</div>
            <a href="#" class="task__remove" data-index="${i}">&times;</a>
        `;
        list.appendChild(task__title);
    }
}

btnSend.addEventListener('click', (e) => {
    e.preventDefault();
    const taskText = input.value.trim();
    addTask(taskText);
});

list.addEventListener('click', (e) => {
    e.preventDefault();

    const tasks = getTask();

    const removeBtn = e.target.closest('.task__remove');
    if (removeBtn) {
        const index = parseInt(removeBtn.dataset.index);
        tasks.splice(index, 1);

        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTask();
    }
});