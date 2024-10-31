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
const searchInput = document.getElementById('search-input');

function loadTasks() {
  fetchTasks()
    .then((data) => {
      const newDataMap = convertArrayToMap(data);
      processFetchedTasks(newDataMap, tasksList);
      renderList(tasksList, currentFilter, todoList);
      updateActiveFilterButton();
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
  updateActiveFilterButton();
}

function updateActiveFilterButton() {
  allTasksButton.classList.remove('active');
  completedTasksButton.classList.remove('active');
  incompletedTasksButton.classList.remove('active');

  switch (currentFilter) {
    case FILTERS.ALL:
      allTasksButton.classList.add('active');
      break;
    case FILTERS.COMPLETED:
      completedTasksButton.classList.add('active');
      break;
    case FILTERS.INCOMPLETED:
      incompletedTasksButton.classList.add('active');
      break;
  }
}

function showAllTasks() {
  handleFilterChange(FILTERS.ALL);
}

function showCompletedTasks() {
  handleFilterChange(FILTERS.COMPLETED);
}

function showIncompletedTasks() {
  handleFilterChange(FILTERS.INCOMPLETED);
}

function handleSearch() {
  const searchQuery = searchInput.value.toLowerCase();
  const filteredTasks = new Map();

  for (const [id, task] of tasksList) {
    if (task.text.toLowerCase().includes(searchQuery)) {
      filteredTasks.set(id, task);
    }
  }

  renderList(filteredTasks, currentFilter, todoList);
}

form.addEventListener('submit', handleAddTask);
todoList.addEventListener('click', handleRemoveTask);
allTasksButton.addEventListener('click', showAllTasks);
completedTasksButton.addEventListener('click', showCompletedTasks);
incompletedTasksButton.addEventListener('click', showIncompletedTasks);
searchInput.addEventListener('input', handleSearch);

loadTasks();
