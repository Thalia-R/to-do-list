import { key } from "../settings.js";
import { saveToStorage, getFromStorage } from "../utils/storage.js";

export default function updateView(listTasks) {
  const listContainer = document.querySelector("ul");

  listContainer.innerHTML = "";

  listTasks.forEach(function (listTask) {
    let checked = "";

    if (listTask.complete) {
      checked = "checked";
    }

    listContainer.innerHTML += `<li><input ${checked} type="checkbox" data-id="${listTask.id}" /><span class="${checked}">${listTask.task}</span> <i class="fa fa-trash" data-id="${listTask.id}"> </li>`;
  });

  if (listTasks.length === 0) {
    listContainer.innerHTML += `<p class="message">List is empty</p>`;
  }

  const checkboxes = document.querySelectorAll("li input");
  checkboxes.forEach(function (checkBox) {
    checkBox.addEventListener("click", toggleComplete.bind(checkBox));
  });

  const trashCans = document.querySelectorAll("li i");
  trashCans.forEach(function (can) {
    can.addEventListener("click", removeFromList.bind(can));
  });
}

export function addToList(task) {
  const taskList = getFromStorage(key);

  taskList.push(task);

  savelist(key, taskList);
}

function removeFromList(event) {
  const deleteTask = event.target.dataset.id;
  const key = "list";

  var listTasks = getFromStorage(key);

  const newList = listTasks.filter((task) => task.id != deleteTask);

  savelist(key, newList);
}

function toggleComplete(event) {
  const id = event.target.dataset.id;
  const checked = event.target.checked;

  updateList(id, checked);
}

function updateList(id, checked) {
  var listTasks = getFromStorage(key);
  const thistaskIndex = listTasks.findIndex((task) => task.id === parseInt(id));

  listTasks[thistaskIndex].complete = checked;

  savelist(key, listTasks);
}

function savelist(key, list) {
  saveToStorage(key, list);
  updateView(list);
}
