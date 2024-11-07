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

function createDeleteButtonUI() {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.textContent = 'Delete';
  return deleteButton;
}

function createListItemContainerUI() {
  const taskName = document.createElement('div');
  taskName.className = 'task-name';
  return taskName;
}

export function createTaskElement(task) {
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
