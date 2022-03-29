export default function displayScore(nb, maxCard) {
  const scoreLabel = document.getElementById("score");
  scoreLabel.style.display = "block";
  scoreLabel.innerText = `${nb} / ${maxCard / 2}`;
}
