// let tasksList = [];
let tasksList = new Map();
let taskId = 1;

const todoList = document.getElementById('todo-list');
const form = document.getElementById('todo-form');

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

function createTaskElement(task) {
  const container = createListItemUI(task);
  const itemContainer = createListItemContainerUI();
  const marker = createDoneMarkerUI(task);
  const text = createTaskTextUI(task);
  const buttonContainer = createTaskButtonsUI();
  const deleteButton = createDeleteButtonUI();

  if (task.isChecked) {
    text.classList.add('completed');
  }

  itemContainer.appendChild(marker);
  itemContainer.appendChild(text);
  container.appendChild(itemContainer);
  buttonContainer.appendChild(deleteButton);
  container.appendChild(buttonContainer);

  return container;
}

function renderList() {
  todoList.innerHTML = '';

  tasksList.forEach((task) => {
    const taskElement = createTaskElement(task);
    // console.log('task', task);
    todoList.appendChild(taskElement);
  });
}

function getInputFieldValue() {
  const input = document.getElementById('todo-input');
  const taskText = input.value.trim();
  return taskText === '' ? null : taskText;
}

// function addTaskToList(taskText) {
//   const newTask = {
//     text: taskText,
//     isChecked: false,
//     id: taskId++,
//   };
//   tasksList.push(newTask);
//   return newTask;
// }

function addTaskToList(taskText) {
  const newTask = {
    text: taskText,
    isChecked: false,
    id: taskId++,
  };
  tasksList.set(newTask.id, newTask);
  return newTask;
}

function removeTaskFromList(taskId) {
  tasksList.delete(Number(taskId));
}

function convertArrayToMap(dataArray) {
  return new Map(dataArray.map((item) => [item.id, item]));
}

async function fetchTasks() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
}

// function processFetchedTasks(data) {
//   tasksList = data.map((item) => ({
//     text: item.title,
//     isChecked: item.completed,
//     id: item.id,
//   }));
// }

function processFetchedTasks(data) {
  data.forEach((item) => {
    const task = {
      text: item.title,
      isChecked: item.completed,
      id: item.id,
    };
    tasksList.set(task.id, task);
  });
  console.log('processFetchedTasks tasksList', tasksList);
}

async function loadTasks() {
  try {
    const data = await fetchTasks();
    const newDataMap = convertArrayToMap(data);
    // console.log('newDataMap', newDataMap);
    processFetchedTasks(newDataMap);
    renderList();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function handleAddTask(event) {
  event.preventDefault();
  const taskText = getInputFieldValue();
  if (!taskText) return;

  addTaskToList(taskText);
  renderList();
  form.reset();
}

function handleRemoveTask(event) {
  if (event.target.classList.contains('delete')) {
    const taskId = event.target.closest('li').getAttribute('data-id');
    removeTaskFromList(taskId);
    renderList();
  }
}

form.addEventListener('submit', handleAddTask);
todoList.addEventListener('click', handleRemoveTask);

loadTasks();
