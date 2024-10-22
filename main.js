const tasksList = [];
let taskId = 1;

const todoList = document.getElementById('todo-list');
const form = document.getElementById('todo-form');

function createListItemUI() {
  const li = document.createElement('li');

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

function addTaskToDOM(task) {
  const container = createListItemUI();
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

  return { deleteButton, container };
}

// function deleteTaskUI(deleteButton, container) {
//   deleteButton.addEventListener('click', () => {
//     container.remove();
//   });
// }

function handleDeleteTask(container) {
  container.remove();
}

function deleteTaskEvent(deleteButton, container) {
  deleteButton.addEventListener('click', () => handleDeleteTask(container));
}

function getInputFieldValue() {
  const input = document.getElementById('todo-input');
  const taskText = input.value.trim();
  return taskText === '' ? null : taskText;
}

function addTask(event) {
  event.preventDefault();

  const inputValue = getInputFieldValue();
  if (!inputValue) return;

  const newTask = {
    text: inputValue,
    isChecked: false,
    id: taskId++,
  };

  tasksList.push(newTask);

  const { deleteButton, container } = addTaskToDOM(newTask);
  deleteTaskEvent(deleteButton, container);

  form.reset();
}

form.addEventListener('submit', addTask);
