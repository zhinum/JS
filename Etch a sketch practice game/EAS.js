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
const head = document.querySelector(".header");
const button = document.createElement("button");
button.textContent = "CLICK ME";
head.appendChild(button);
button.addEventListener("click", () => {
  let value = +prompt("Enter number of squares from 1 to 100.");
  displayGridBoxes(value);
});
function setUpGrid(number) {
  let container = document.querySelector(".container");
  container.setAttribute(
    "style",
    `display: grid; grid-template-columns: repeat(${number},1fr); grid-template-rows: repeat(${number}, auto); gap: 5px;`,
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
    prompt("You didnt enter a number, enter a number from 1 to 100");
  }
}
