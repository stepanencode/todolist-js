let tasksList = [];
let taskId = 1;

const todoList = document.getElementById('todo-list');
const form = document.getElementById('todo-form');

// create DOM nodes
function createListItemUI(task) {
  const li = document.createElement('li');
  li.setAttribute('data-id', task.id);

  return li;
}

function createDoneMarkerUI(task) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.isChecked;

  return checkbox;
}

function createTaskTextUI(task) {
  const span = document.createElement('span');
  span.textContent = task.text;

  return span;
}

function createTaskButtonsUI() {
  const taskButtons = document.createElement('div');
  taskButtons.className = 'task-buttons';

  return taskButtons;
}

function createListItemContainerUI() {
  const taskName = document.createElement('div');
  taskName.className = 'task-name';

  return taskName;
}

function createDeleteButtonUI() {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.textContent = 'Delete';

  return deleteButton;
}

// actions with DOM
function addTaskToDOM(task) {
  const container = createListItemUI(task);
  const itemContainer = createListItemContainerUI();
  const text = createTaskTextUI(task);
  const marker = createDoneMarkerUI(task);
  const buttonContainer = createTaskButtonsUI();
  const deleteButton = createDeleteButtonUI();

  container.appendChild(itemContainer);
  itemContainer.appendChild(marker);
  itemContainer.appendChild(text);
  container.appendChild(buttonContainer);
  buttonContainer.appendChild(deleteButton);
  todoList.appendChild(container);
}

function removeTaskFromDOM(taskId) {
  const taskElement = document.querySelector(`li[data-id='${taskId}']`);
  if (taskElement) {
    taskElement.remove();
  }
}

// actions with state
function getInputFieldValue() {
  const input = document.getElementById('todo-input');
  const taskText = input.value.trim();

  return taskText === '' ? null : taskText;
}

function addTaskToList(taskText) {
  const newTask = {
    text: taskText,
    isChecked: false,
    id: taskId++,
  };
  tasksList.push(newTask);

  return newTask;
}

function removeTaskFromList(taskId) {
  tasksList = tasksList.filter((task) => task.id !== Number(taskId));
}

// handle events
function handleAddTask(event) {
  event.preventDefault();

  const taskText = getInputFieldValue();
  if (!taskText) return;

  const newTask = addTaskToList(taskText);
  addTaskToDOM(newTask);

  form.reset();
}

function handleRemoveTask(event) {
  if (event.target.classList.contains('delete')) {
    const taskId = event.target.closest('li').getAttribute('data-id');

    removeTaskFromList(taskId);
    removeTaskFromDOM(taskId);
  }
}

// add event listeners
form.addEventListener('submit', handleAddTask);
todoList.addEventListener('click', handleRemoveTask);
