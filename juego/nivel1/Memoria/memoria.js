const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let  aciertos = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    aciertos = aciertos + 1
    background: 'https://i.pinimg.com/originals/e5/6a/32/e56a323f548f6b622eb095b48e86d5dd.gif';
  }

  if (aciertos == 6) {

    Swal.fire({
  title: '¡Completaste el nivel 1!',
  text: '¡Has desbloqueado la insignia de protector de animales!',
  width: 400,
  icon: 'success',
  padding: '2em',
  timer: 9000,
  timerProgressBar: true,
  confirmButtonColor: '#309991',
  backdrop: `
    rgba(0,0,123,0.4)
    url("monis.gif")
    left top
    no-repeat
  `
})
  }
  else {
    isMatch ? disableCards() : unflipCards();
  }
}