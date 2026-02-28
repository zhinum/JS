const listItems = document.querySelector("ul");
const form = document.querySelector("form");
const input = document.querySelector("#item");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const itemS = input.value.trim();

  if (itemS === "") return;
  const itemSelected = itemS.charAt(0).toUpperCase() + itemS.slice(1);

  const newList = document.createElement("li");
  const addedItem = document.createElement("span");
  const delButton = document.createElement("button");
  addedItem.textContent = itemSelected;
  delButton.textContent = "delete";
  newList.appendChild(addedItem);
  newList.appendChild(delButton);
  listItems.appendChild(newList);
  input.value = "";
  delButton.addEventListener("click", () => newList.remove());
});
