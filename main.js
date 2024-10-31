import { FILTERS } from './src/constants/constants.js';
import {
  fetchTasks,
  convertArrayToMap,
  processFetchedTasks,
} from './src/logic/dataFetching.js';
import {
  addTaskToList,
  removeTaskFromList,
  getInputFieldValue,
} from './src/logic/taskActions.js';
import { renderList } from './src/logic/render.js';

let tasksList = new Map();
let currentFilter = FILTERS.ALL;

const todoList = document.getElementById('todo-list');
const form = document.getElementById('todo-form');
const allTasksButton = document.getElementById('all-tasks');
const completedTasksButton = document.getElementById('completed-tasks');
const incompletedTasksButton = document.getElementById('incompleted-tasks');

function loadTasks() {
  fetchTasks()
    .then((data) => {
      const newDataMap = convertArrayToMap(data);
      processFetchedTasks(newDataMap, tasksList);
      renderList(tasksList, currentFilter, todoList);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}

function handleAddTask(event) {
  event.preventDefault();
  const taskText = getInputFieldValue();
  if (!taskText) return;

  addTaskToList(tasksList, taskText);
  renderList(tasksList, currentFilter, todoList);
  form.reset();
}

function handleRemoveTask(event) {
  if (event.target.classList.contains('delete')) {
    const taskId = event.target.closest('li').getAttribute('data-id');
    removeTaskFromList(tasksList, taskId);
    renderList(tasksList, currentFilter, todoList);
  }
}

function handleFilterChange(filterType) {
  currentFilter = filterType;
  renderList(tasksList, currentFilter, todoList);
}

form.addEventListener('submit', handleAddTask);
todoList.addEventListener('click', handleRemoveTask);
allTasksButton.addEventListener('click', () => handleFilterChange(FILTERS.ALL));
completedTasksButton.addEventListener('click', () =>
  handleFilterChange(FILTERS.COMPLETED)
);
incompletedTasksButton.addEventListener('click', () =>
  handleFilterChange(FILTERS.INCOMPLETED)
);

loadTasks();
