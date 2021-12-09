import random from "lodash.random";
import shuffle from "lodash.shuffle";

const words = ["april", "june", "july", "august", "january", "february", "march", "may", "september", "october", "november", "december"];

const currentWord = words[random(0, words.length - 1)];

const shuffleWord = shuffle(currentWord).join("");

const dragContainer = document.querySelector(".drag-container");
const dropContainer = document.querySelector(".drop-container");
const notification = document.querySelector(".notification");

const getDropContainerValues = () => {
  const dropElements = Array.from(dropContainer.querySelectorAll("div"));
  const dropValues = [];
  dropElements.forEach((dropElement) => {
    dropValues.push(dropElement.innerText.trim());
  });

  return dropValues.join("")
};

for (var i = 0; i < shuffleWord.length; i++) {
  // draggables
  const dragItem = document.createElement("div");
  dragItem.setAttribute("draggable", true);
  const currentCharac = shuffleWord[i];
  dragItem.innerHTML = currentCharac;
  dragContainer.appendChild(dragItem);

  dragItem.addEventListener("dragstart", (e) => {
    dragItem.classList.add("dragging");

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", currentCharac);
  });

  dragItem.addEventListener("dragend", (e) => {
    dragItem.classList.remove("dragging");
  });

  // dropables
  const dropItem = document.createElement("div");
  dropContainer.appendChild(dropItem);

  dropItem.addEventListener("dragenter", (e) => {
    dropItem.classList.add("drag-select");

    e.dataTransfer.dropEffect = "move";
  });

  dropItem.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  dropItem.addEventListener("drop", (e) => {
    dropItem.classList.remove("drag-select");
    const data = e.dataTransfer.getData("text/plain");

    dropItem.innerHTML = data;

    if (getDropContainerValues() === currentWord) {
        notification.style.display = "flex"

        setTimeout(() => {
            notification.style.display = "none"
        }, 3000);
    }
  });
}
