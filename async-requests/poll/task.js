const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.querySelector('.poll__answers');

function fetchData(method, url, body = null, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);

    xhr.onload = () => {
        try {
            if (xhr.status >= 200 && xhr.status < 300) {
                const response = JSON.parse(xhr.response);
                onSuccess(response);
            } else {
                alert(`Ошибка ${xhr.status}`);
            }
        } catch (e) {
            console.log('Ошибка:', e);
        }
    };

    if (method === 'POST') {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }

    xhr.send(body);
}


function displayInfo(response) {
    const title = response.data.title;
    const answers = response.data.answers;

    const id = response.id;

    const itemElement = document.createElement('div');

    itemElement.classList.add('poll__title');
    itemElement.innerHTML = `${title}`;
    pollTitle.appendChild(itemElement);

    answers.forEach(answer => {
        const answerElement = document.createElement('button');
        answerElement.classList.add('poll__answer');
        answerElement.innerHTML = `${answer}`;
        pollAnswers.appendChild(answerElement);
    })

    const button = document.querySelectorAll('.poll__answer');

    button.forEach((item, index) => {
        item.addEventListener('click', () => {
            // alert(`Спасибо, ваш голос учтен! Вы выбрали: ${item.innerHTML}`);
            getResult(id, index);
        });
    });
}

function displayResult(response) {
    pollAnswers.innerHTML = '';
    const sum = response.stat.reduce((acc, item) => acc + item.votes, 0);
    response.stat.forEach(item => {
        const persent = ((item.votes / sum) * 100).toFixed(2);
        const itemElement = document.createElement('div');
        const itemResult = document.createElement('b');
        itemElement.classList.add('poll__result');
        itemElement.innerHTML = `${item.answer}: `;
        itemResult.innerHTML = `${persent}%`;
        pollAnswers.appendChild(itemElement);
        itemElement.appendChild(itemResult);
    })
}

function getResult(vote, answer) {
    fetchData(
        'POST',
        'https://students.netoservices.ru/nestjs-backend/poll',
        `vote=${vote}&answer=${answer}`,
        displayResult
    );
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData(
        'GET',
        'https://students.netoservices.ru/nestjs-backend/poll',
        null,
        displayInfo
    );
});