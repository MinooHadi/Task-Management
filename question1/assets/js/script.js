// get localstorage
function loadFromLocalstorage(key) {
  let value = localStorage.getItem(key);
  if (value) {
    value = JSON.parse(value);
  } else {
    value = [];
  }
  return value;
}

// update localstorage
function updateLocalstorage(key, value) {
  if (!value) {
    return;
  }
  let prevValue = loadFromLocalstorage(key);
  prevValue.push(value);
  let updateValue = JSON.stringify(prevValue);
  localStorage.setItem(key, updateValue);
}

// remove item from localstorage
function removeById(key, id) {
  let tasks = loadFromLocalstorage(key);
  tasks = tasks.filter((item) => item.id != id);
  tasks = JSON.stringify(tasks);
  localStorage.setItem(key, tasks);
}

// get data from form inputs and create task card
function saveTodos() {
  event.preventDefault();
  const form = document.querySelector("form");
  const title = document.querySelector("#title").value;
  const start = document.querySelector("#start").value;
  const description = document.querySelector("#description").value;
  const end = document.querySelector("#end").value;

  let newTodoCard = {
    title,
    start,
    description,
    end,
    id: Date.now(),
  };

  updateLocalstorage("todos", newTodoCard);

  fillTasksBoard("todos");
  form.reset();
}

// fill boards
function fillTasksBoard(key) {
  let tasksList = loadFromLocalstorage(key);
  const wrapper = document.querySelector(`.wrapper-${key}`);
  const taskBoard = document.querySelector(`.${key}-board`);
  wrapper.innerHTML = "";

  for (let task of tasksList) {
    let taskCard = document.createElement("div");
    taskCard.classList.add(key);
    taskCard.innerHTML = `
      <div class="hedear">
              <h4>${task.title}</h4>
              <i class="fa fa-close" data-id="${task.id}" onclick="deleteTodo(this)"></i>
            </div>
            <div class="content">
              <div class="date">
                <div>
                  <h5>Start:</h5>
                  <p>${task.start}</p>
                </div>
                <div>
                  <h5>End:</h5>
                  <p>${task.end}</p>
                </div>
              </div>
              <div class="description">
                <h5>Description:</h5>
                <p>${task.description}</p>
              </div>
            </div>
            <div class="footer">
              <button class="todo-btn" data-id="${task.id}" onclick="clickHandler(this, 'todos')"><i class="fa fa-list-ul"></i></button>
              <button class="doing-btn" data-id="${task.id}" onclick="clickHandler(this, 'doings')"><i class="fa fa-spinner"></i></button>
              <button class="done-btn" data-id="${task.id}" onclick="clickHandler(this, 'dones')">
                <i class="fa fa-check-square-o"></i>
              </button>
            </div>
      `;
    wrapper.append(taskCard);
  }
  taskBoard.append(wrapper);
}

function refresh() {
  fillTasksBoard("todos");
  fillTasksBoard("doings");
  fillTasksBoard("dones");
}

// change tasks state
function clickHandler(elem, key) {
  let board = elem.parentElement.parentElement.className;
  let dataId = elem.getAttribute("data-id");
  let tasks = loadFromLocalstorage(board);
  if (tasks && board != key) {
    let selectedTodoIndex = tasks.findIndex((item) => item.id == dataId);
    let newDoingCard = tasks[selectedTodoIndex];
    updateLocalstorage(key, newDoingCard);
    removeById(board, dataId);

    refresh();
  }
}

// delet task from boards
function deleteTodo(elem) {
  let board = elem.parentElement.parentElement.className;
  let dataId = elem.getAttribute("data-id");
  removeById(board, dataId);
  refresh();
}

window.addEventListener("DOMContentLoaded", refresh);
