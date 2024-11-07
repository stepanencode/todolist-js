import { createTaskElement } from '../ui/uiComponents.js';
import { filterTasks } from '../logic/taskFilters.js';

export function renderList(tasksList, currentFilter, todoList) {
  todoList.innerHTML = '';

  filterTasks(tasksList, currentFilter).forEach((task) => {
    const taskElement = createTaskElement(task);
    todoList.appendChild(taskElement);
  });
}
