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

function createDoneMarkerUI() {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.isChecked;

  return checkbox;
}

function createTaskTextUI() {
  const span = document.createElement('span');
  span.textContent = task.text;
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
  const text = createTaskTextUI();
  const marker = createDoneMarkerUI();
  const buttonContainer = createTaskButtonsUI();
  const deleteButton = createDeleteButtonUI();
  const editButton = createEditButtonUI();

  container.append(marker);
  container.appendChild(text);
  container.appendChild(buttonContainer);

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  todoList.appendChild(container);
}

function DeleteTask() {
  container.remove();
}

function EditTask() {
  const newTaskText = prompt('Edit task:', span.textContent);
  if (newTaskText !== null && newTaskText !== '') {
    span.textContent = newTaskText;
  }
}

function getInputFieldValue() {
  const input = document.getElementById('todo-input');
  const taskText = input.value;

  if (taskText === '') return;
  return taskText;
}

function AddTask(event) {
  event.preventDefault();
  const inputValue = getInputFieldValue();

  const newTask = {
    text: inputValue,
    isChecked: false,
    id: taskId,
  };

  tasksList.push(newTask);

  addTaskToDOM(newTask);
  console.log(newTask);

  inputValue = '';
}

form.addEventListener('submit', AddTask);
deleteButton.addEventListener('click', DeleteTask);
editButton.addEventListener('click', EditTask);
