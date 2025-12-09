class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElementSeconds = container.querySelector('.timer__seconds')
    this.timerElementMicroSecond = container.querySelector('.microseconds__seconds')

    this.reset();

    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  timer(countCharter) {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.microIntervalId) clearInterval(this.microIntervalId);

    let seconds = countCharter.length;
    let micro = 99;

    this.timerElementSeconds.textContent = seconds;
    this.timerElementMicroSecond.textContent =
        micro.toString().padStart(2, '0');

    this.microIntervalId = setInterval(() => {

      micro--;

      if (micro < 0) {
        micro = 99;
      }

      this.timerElementMicroSecond.textContent =
          micro.toString().padStart(2, '0');

    }, 10);

    this.intervalId = setInterval(() => {
      seconds--;

      this.timerElementSeconds.textContent = seconds;

      if (seconds <= 0) {
        clearInterval(this.intervalId);
        clearInterval(this.microIntervalId);
        this.fail();
      }

    }, 1000);
  }



  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода символа вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */

    document.addEventListener('keydown', event =>{
      if(event.key === this.currentSymbol.textContent){
          this.success();
      }
      else{
          this.fail();
      }
    })
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
    this.timer(word);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

