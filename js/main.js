import { arrSimpsonsImg } from "./modules/arrSimpsonsImg.js";
import { arrOptionGame } from "./modules/arrOptionGame.js";
import formatArrGrid from "./modules/formatArrGrid.js";
import generateGridCards from "./modules/generateGridCards.js";
import displayEndGame from "./modules/displayEndGame.js";
let arrCard = [];
let nbCardSelected = 0;
let identicalCards = true;
let card1 = "";
let card2 = "";

let col;
let maxCard;

/////////////////////////////////////////////////////////////////////////
// Gestion retourne la carte

let cardsSelected = [];
let isMatchingCards = false;
let blockGrid = false;
function flipCard() {
  if (cardsSelected.includes(this) || blockGrid) return;

  cardsSelected.push(this);
  this.classList.add("active");

  if (cardsSelected.length === 2) {
    blockGrid = true;
    this.classList.add("active");
    isMatchingCards = isIdenticalCards(...cardsSelected);
    if (!isMatchingCards) {
    }
    setTimeout(() => {
      if (!isMatchingCards) {
        cardsSelected.forEach((card) => {
          card.classList.remove("active");
          card.classList.add("reverse");
        });
      }
    }, 1100);
    setTimeout(() => {
      if (!isMatchingCards) {
        cardsSelected.forEach((card) => card.classList.remove("reverse"));
      }
      cardsSelected = [];
      blockGrid = false;
    }, 1500);
  }
}

////////////////////////////////////////////////////////////////////////////
// Check if cards selected are identical
let nbRoundSucced = 0;
let nbRound = 0;
function isIdenticalCards(card1, card2) {
  nbRound++;
  // if identical cards >>> set true to isVisible for selected cards
  let isSameCard = card1.dataset.idcard === card2.dataset.idcard ? true : false;

  if (isSameCard) {
    nbRoundSucced++;
    // Remove event listener of cards matched
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    CheckEndGame(nbRoundSucced);
  }
  displayScore(nbRoundSucced);
  return isSameCard;
}

const displayScore = (nb) => {
  const scoreLabel = document.getElementById("score");
  scoreLabel.style.display = "block";
  scoreLabel.innerText = `${nb} / ${maxCard / 2}`;
};

/////////////////////////////////////////////////////////////////////////
//////////// CheckendGame
let isGameWin = false;
const CheckEndGame = (nb) => {
  isGameWin = nb === maxCard / 2;
  if (isGameWin) {
    clearInterval(intervalId);
    displayEndGame(flipCard, isGameWin);
  }
};

/////////////////////////////////////////////////////////////////////////
//////////// Gestion timer
const timerProgressBar = document.getElementById("timer-progress-bar");
const timerLabel = document.getElementById("timer");
let delay;
let timerValue;
let intervalId;

// progress bar
function animProgressBar() {
  let widthBar = 0;
  intervalId = setInterval(translateTimerBar, 1000);
  timerValue = 0;

  function translateTimerBar() {
    if (widthBar < delay) {
      widthBar++;
      let min = delay > 59 ? true : false;
      timerProgressBar.style.transform = `translateX(${
        (100 * widthBar) / delay
      }%)`;
      timerValue = delay - widthBar;
      timerLabel.innerText = min
        ? `${Math.floor(timerValue / 60)} : ` +
          (timerValue % 60 < 10 ? "0" : "") +
          (timerValue % 60)
        : (timerValue < 10 ? "0" : "") + (timerValue % 60);

      if (timerValue <= 10) {
        timerLabel.style.color = "#740000";
      }
    } else {
      clearInterval(intervalId);
      timer.style.color = "#740000";
      displayEndGame(flipCard);
    }
  }
}

//////////////////////////////////////////////////////////////////
//////////// Modal Setting
const msgIntro = document.getElementById("msg-intro");
const settingBtn = document.getElementById("setting");
const modal = document.getElementById("modal-opt");
const startBtn = document.getElementById("start-btn");
const reloadBtn = document.getElementById("reload-btn");
const levelBtns = document.querySelectorAll(
  ".modal-opt__body-level-group .btn"
);
const timerBtns = document.querySelectorAll(
  ".modal-opt__body-timer-group .btn"
);
let levelSelected;
let timerSelected;
const openModal = () => {
  modal.style.display = "block";
};
const closeModal = () => {
  modal.style.display = "none";
};
const outsideClickCloseModal = (e) => {
  e.target == modal && closeModal();
};
function setActiveLevelBtn() {
  levelBtns.forEach((levelBtn) => levelBtn.classList.remove("active"));
  this.classList.toggle("active");
}
function setActiveTimerBtn() {
  timerBtns.forEach((timerBtn) => timerBtn.classList.remove("active"));
  this.classList.toggle("active");
}

/////////////////////////////////////////////////////////////////////////
//////////// Init Options with reload btn inside modal
const initOptions = () => {
  levelBtns.forEach((levelBtn) => levelBtn.classList.remove("active"));
  timerBtns.forEach((timerBtn) => timerBtn.classList.remove("active"));
  timerBtns[0].classList.add("active");
  levelBtns[0].classList.add("active");
};

initOptions();

/////////////////////////////////////////////////////////////////////////
//////////// Start Game
const replayBtn = document.getElementById("play");

const startGame = () => {
  const msgEndGame = document.querySelector("#msg-end-game h2");
  const scoreLabel = document.getElementById("score");
  timerValue = 0;
  nbRoundSucced = 0;
  scoreLabel.innerText = "";
  clearInterval(intervalId);
  msgIntro.style.display = "none";
  msgEndGame.style.display = "none";
  replayBtn.style.display = "none";
  timerProgressBar.classList.add("d-none");
  timer.style.color = "#ddd";
  timerProgressBar.style.transform = "translateX(0%)";
  setTimeout(() => {
    timerProgressBar.classList.remove("d-none");
  }, 300);

  timer.classList.add("active");
  scoreLabel.classList.add("active");
  timerLabel.classList.add("active");
  arrCard = generateGridCards(formatArrGrid, col, maxCard, arrSimpsonsImg);
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.addEventListener("click", flipCard));
  animProgressBar();
};

/////////////////////////////////////////////////////////////////////////
//////////// Init Game
const initGame = () => {
  // Get level and timer selected by the player
  const activeLevel = document.querySelector(
    ".modal-opt__body-level-group .btn.active"
  );
  const levelList = [...levelBtns];
  levelSelected = levelList.indexOf(activeLevel);

  const timerList = [...timerBtns];
  const activeTimer = document.querySelector(
    ".modal-opt__body-timer-group .btn.active"
  );
  let timerSelected = timerList.indexOf(activeTimer);

  // Init variables of timer + Grid according to the setting made by the player
  delay = (timerSelected + 1) * 60;
  // Set variables for grid -- if Rnd Btn > Generate random grid between 12 / 16 / 20 / 24 cards
  if (levelSelected === 4) {
    let rnd = Math.floor(Math.random() * 4);
    col = arrOptionGame[rnd].col;
    maxCard = arrOptionGame[rnd].maxCard;
  } else {
    col = arrOptionGame[levelSelected].col;
    maxCard = arrOptionGame[levelSelected].maxCard;
  }
  startGame();
};

///////////////////////////////////////////////////////////////////
//// EVENT LISTENER
settingBtn.addEventListener("click", openModal);
startBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideClickCloseModal);
levelBtns.forEach((levelBtn) =>
  levelBtn.addEventListener("click", setActiveLevelBtn)
);
timerBtns.forEach((timerBtn) =>
  timerBtn.addEventListener("click", setActiveTimerBtn)
);
reloadBtn.addEventListener("click", initOptions);
startBtn.addEventListener("click", initGame);
replayBtn.addEventListener("click", initGame);
