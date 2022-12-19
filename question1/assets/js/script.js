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

  createTodoBoard();
  form.reset();
}

function createTodoBoard() {
  let todosList = loadFromLocalstorage("todos");
  const wrapper = document.querySelector(".wrapper-todo");
  const todoBoard = document.querySelector(".todo-board");
  wrapper.innerHTML = "";

  for (let todo of todosList) {
    let todoCard = document.createElement("div");
    todoCard.classList.add("todos");
    todoCard.innerHTML = `
    <div class="hedear">
            <h4>${todo.title}</h4>
            <i class="fa fa-close"></i>
          </div>
          <div class="content">
            <div class="date">
              <div>
                <h5>Start:</h5>
                <p>${todo.start}</p>
              </div>
              <div>
                <h5>End:</h5>
                <p>${todo.end}</p>
              </div>
            </div>
            <div class="description">
              <h5>Description:</h5>
              <p>${todo.description}</p>
            </div>
          </div>
          <div class="footer">
            <button class="todo-btn" data-id="${todo.id}" onclick="todo(this)"><i class="fa fa-list-ul"></i></button>
            <button class="doing-btn" data-id="${todo.id}" onclick="doing(this)"><i class="fa fa-spinner"></i></button>
            <button class="done-btn" data-id="${todo.id}" onclick="done(this)">
              <i class="fa fa-check-square-o"></i>
            </button>
          </div>
    `;
    wrapper.append(todoCard);
  }
  todoBoard.append(wrapper);
}

function createDoingBoard() {
  let doingsList = loadFromLocalstorage("doings");
  const wrapper = document.querySelector(".wrapper-doing");
  const doingBoard = document.querySelector(".doing-board");
  wrapper.innerHTML = "";

  for (let doing of doingsList) {
    if (!doing) {
      continue;
    }
    let doingCard = document.createElement("div");
    doingCard.classList.add("doings");
    doingCard.innerHTML = `
      <div class="hedear">
              <h4>${doing.title}</h4>
              <i class="fa fa-close"></i>
            </div>
            <div class="content">
              <div class="date">
                <div>
                  <h5>Start:</h5>
                  <p>${doing.start}</p>
                </div>
                <div>
                  <h5>End:</h5>
                  <p>${doing.end}</p>
                </div>
              </div>
              <div class="description">
                <h5>Description:</h5>
                <p>${doing.description}</p>
              </div>
            </div>
            <div class="footer">
              <button class="todo-btn" data-id="${doing.id}" onclick="todo(this)"><i class="fa fa-list-ul"></i></button>
              <button class="doing-btn" data-id="${doing.id}" onclick="doing(this)"><i class="fa fa-spinner"></i></button>
              <button class="done-btn" data-id="${doing.id}" onclick="done(this)">
                <i class="fa fa-check-square-o"></i>
              </button>
            </div>
      `;
    wrapper.append(doingCard);
  }
  doingBoard.append(wrapper);
}

function createDoneBoard() {
  let donesList = loadFromLocalstorage("dones");
  const wrapper = document.querySelector(".wrapper-done");
  const doneBoard = document.querySelector(".done-board");
  wrapper.innerHTML = "";

  for (let done of donesList) {
    let doneCard = document.createElement("div");
    doneCard.classList.add("dones");
    doneCard.innerHTML = `
      <div class="hedear">
              <h4>${done.title}</h4>
              <i class="fa fa-close"></i>
            </div>
            <div class="content">
              <div class="date">
                <div>
                  <h5>Start:</h5>
                  <p>${done.start}</p>
                </div>
                <div>
                  <h5>End:</h5>
                  <p>${done.end}</p>
                </div>
              </div>
              <div class="description">
                <h5>Description:</h5>
                <p>${done.description}</p>
              </div>
            </div>
            <div class="footer">
              <button class="todo-btn" data-id="${done.id}" onclick="todo(this)"><i class="fa fa-list-ul"></i></button>
              <button class="doing-btn" data-id="${done.id}" onclick="doing(this)"><i class="fa fa-spinner"></i></button>
              <button class="done-btn" data-id="${done.id}" onclick="done(this)">
                <i class="fa fa-check-square-o"></i>
              </button>
            </div>
      `;
    wrapper.append(doneCard);
  }
  doneBoard.append(wrapper);
}

function refresh() {
  createTodoBoard();
  createDoingBoard();
  createDoneBoard();
}
window.addEventListener("DOMContentLoaded", refresh);

function todo(elem) {
  let board = elem.parentElement.parentElement.className;
  let dataId = elem.getAttribute("data-id");
  let tasks = loadFromLocalstorage(board);
  if (tasks && board != "todos") {
    let selectedTodoIndex = tasks.findIndex((item) => item.id == dataId);
    let newDoingCard = tasks[selectedTodoIndex];
    updateLocalstorage("todos", newDoingCard);
    removeById(board, dataId);

    refresh();
  }
}

function doing(elem) {
  let board = elem.parentElement.parentElement.className;
  let dataId = elem.getAttribute("data-id");
  let tasks = loadFromLocalstorage(board);
  if (tasks && board != "doings") {
    let selectedTodoIndex = tasks.findIndex((item) => item.id == dataId);
    let newDoingCard = tasks[selectedTodoIndex];
    updateLocalstorage("doings", newDoingCard);
    removeById(board, dataId);

    refresh();
  }
}

function done(elem) {
  let board = elem.parentElement.parentElement.className;
  let dataId = elem.getAttribute("data-id");
  let tasks = loadFromLocalstorage(board);
  if (tasks && board != "dones") {
    let selectedTodoIndex = tasks.findIndex((item) => item.id == dataId);
    let newDoneCard = tasks[selectedTodoIndex];
    updateLocalstorage("dones", newDoneCard);
    removeById(board, dataId);

    refresh();
  }
}
