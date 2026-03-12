const createGridBoxes = function (number) {
  let container = setUpGrid(number);
  container.innerHTML = "";
  for (let i = 1; i <= number ** 2; i++) {
    let box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute(
      "style",
      "height:auto; width:100%; aspect-ratio:1/1; background: white; border: 1px solid black",
    );
    createHoverEffect(box);
    container.appendChild(box);
  }
  return container;
};
function setUpGrid(number) {
  let container = document.querySelector(".container");
  container.setAttribute(
    "style",
    `max-height: 80vmin; max-width: 80vmin; margin: auto; display: grid; grid-template-columns: repeat(${number},1fr); grid-template-rows: repeat(${number}, 1fr); gap: 5px;`,
  );
  return container;
}
function createHoverEffect(box) {
  box.addEventListener("mouseenter", (e) => {
    e.target.style.background = "black";
  });
}
function displayGridBoxes(value) {
  if (!Number.isNaN(value) && value <= 100 && value > 0) {
    createGridBoxes(value);
  } else {
    alert("You didnt enter a number, enter a number from 1 to 100");
  }
}
const head = document.querySelector(".header");
const button = document.createElement("button");
button.textContent = "CLICK ME";
head.appendChild(button);
button.addEventListener("click", () => {
  let value = +prompt("Enter number of squares from 1 to 100.");
  displayGridBoxes(value);
});

//problems i encountered during this project..
//1.hover effect choosing the right colour was essential.
//2 in displayGridBoxes to check for NaN was necessary incase a word was entered
//3 the width in the grid was always defined but the height was flattened due to a lack of content. this was fixed with aspect ratio: 1/1 which forces the height of the boxes to follow the width..
//4 i noticed an overflow when theres a large amount of numbers to fix that i set the max height and width of the container to 100vmin and 100vmin.Pls note you can change this with your preference.
// Happy to admit that ai tools aided my completion of this project.
