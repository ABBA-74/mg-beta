/////////////////////////////////////////////////////////////////////////
//////////// CheckendGame
export default function displayEndGame(flipCard, isGameWin = false) {
  const msgEndGame = document.querySelector("#msg-end-game h2");
  const cards = document.querySelectorAll(".card");
  const replayBtn = document.getElementById("play");
  const audioBtn = document.getElementById("audio");

  msgEndGame.style.display = "block";
  replayBtn.style.display = "block";
  audioBtn.style.display = "block";
  cards.forEach((card) => card.removeEventListener("click", flipCard));
  msgEndGame.innerText = isGameWin ? "You win" : "Game over";
}
