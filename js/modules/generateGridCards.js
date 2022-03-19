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
    let divCard = document.createElement("div");
    divCard.classList.add("card");
    divCard.setAttribute("data-idcard", `${arrCard[i].id}`);
    divCard.setAttribute("data-idgrid", i);

    // Wrapper
    let divWrapper = document.createElement("div");
    divWrapper.classList.add("wrapper");
    // Front Card
    let divFront = document.createElement("div");
    divFront.classList.add("front");

    let divFrontContent = document.createElement("div");
    divFrontContent.classList.add("content");

    let imgFront = document.createElement("img");
    // imgFront.setAttribute("src", `${arrCard[i].src}`);
    imgFront.setAttribute("src", `${arrCard[0].src}`);
    divFrontContent.appendChild(imgFront);
    divFront.appendChild(divFrontContent);

    // Back Card
    let divBack = document.createElement("div");
    divBack.classList.add("back");

    let divBackContent = document.createElement("div");
    divBackContent.classList.add("content");

    let imgBack = document.createElement("img");
    imgBack.setAttribute("src", `${arrCard[i].src}`);

    divBackContent.appendChild(imgBack);
    divBack.appendChild(divBackContent);

    divWrapper.prepend(divFront);
    divWrapper.appendChild(divBack);

    divCard.appendChild(divWrapper);

    grid.appendChild(divCard);
  }
  return arrCard;
}
