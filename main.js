const tasksList = [];
let taskId = 1;

const todoList = document.getElementById('todo-list');
const form = document.getElementById('todo-form');

function createListItemUI() {
  const li = document.createElement('li');
  const taskName = document.createElement('div');
  taskName.className = 'task-name';

  li.appendChild(taskName);

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

function createDeleteButtonUI() {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.textContent = 'Delete';

  return deleteButton;
}

function createEditButtonUI() {
  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.textContent = 'Edit';

  return editButton;
}

function addTaskToDOM(task) {
  const container = createListItemUI();
  const text = createTaskTextUI(task);
  const marker = createDoneMarkerUI(task);
  const buttonContainer = createTaskButtonsUI();
  const deleteButton = createDeleteButtonUI();
  const editButton = createEditButtonUI();

  container.appendChild(marker);
  container.appendChild(text);
  container.appendChild(buttonContainer);

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  todoList.appendChild(container);

  deleteTaskUI(deleteButton, container);
  editButtonUI(editButton, text, task);
}

function deleteTaskUI(deleteButton, container) {
  deleteButton.addEventListener('click', () => {
    container.remove();
  });
}

function editButtonUI(editButton, text, task) {
  editButton.addEventListener('click', () => {
    const newTaskText = prompt('Edit task:', task.text);
    if (newTaskText !== null && newTaskText !== '') {
      text.textContent = newTaskText;
    }
  });
}

function getInputFieldValue() {
  const input = document.getElementById('todo-input');
  const taskText = input.value;

  if (taskText === '') return;
  return taskText;
}

function addTask(event) {
  event.preventDefault();
  const inputValue = getInputFieldValue();

  const newTask = {
    text: inputValue,
    isChecked: false,
    id: taskId++,
  };

  tasksList.push(newTask);

  addTaskToDOM(newTask);

  inputValue = '';
}

form.addEventListener('submit', addTask);
