import updateView, { addToList } from "./components/list.js";
import { getFromStorage } from "./utils/storage.js";
import { key } from "./settings.js";

const listTasks = getFromStorage(key);
updateView(listTasks);

const listInput = document.querySelector("input");
const button = document.querySelector("button");

button.addEventListener("click", addTask);

function addTask() {
  const taskValue = listInput.value.trim();

  if (taskValue.length >= 1) {
    const newTask = { id: Date.now(), task: taskValue, complete: false };
    listInput.value = "";
    listInput.focus();

    addToList(newTask);
  }
}
