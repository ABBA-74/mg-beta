/////////////////////////////////////////////////////////////////////////
// Generate grid of cards on DOM
export default function generateGridCards(
  formatArrGrid,
  col,
  maxCard,
  collectionImg
) {
  const grid = document.getElementById("grid");
  // Remove all child element
  while (grid.firstChild) {
    grid.removeChild(grid.lastChild);
  }
  let arrCard = formatArrGrid(collectionImg, maxCard / 2);
  // Set nb of col with grid + create element
  grid.style.gridTemplateColumns = `repeat(${col},1fr)`;
  for (let i = 0; i < maxCard; i++) {
    let el = document.createElement("div");
    el.setAttribute("data-idcard", `${arrCard[i].id}`);
    el.setAttribute("data-idgrid", i);
    let img = document.createElement("img");
    img.setAttribute("src", `${arrCard[i].src}`);
    el.appendChild(img);

    el.classList.add("card");
    grid.appendChild(el);
  }
  return arrCard;
}
