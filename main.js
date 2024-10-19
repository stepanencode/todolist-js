const tasksList = [];
let taskId = 1;

function addTaskToDOM(task) {
  const todoList = document.getElementById('todo-list');

  const li = document.createElement('li');

  const taskName = document.createElement('div');
  taskName.className = 'task-name';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.isChecked;

  const span = document.createElement('span');
  span.textContent = task.text;

  taskName.appendChild(checkbox);
  taskName.appendChild(span);

  const taskButtons = document.createElement('div');
  taskButtons.className = 'task-buttons';
  const editButton = document.createElement('button');
  editButton.className = 'edit';
  editButton.textContent = 'Edit';
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.textContent = 'Delete';

  taskButtons.appendChild(editButton);
  taskButtons.appendChild(deleteButton);

  li.appendChild(taskName);
  li.appendChild(taskButtons);

  todoList.appendChild(li);

  deleteButton.addEventListener('click', function () {
    li.remove();
  });

  editButton.addEventListener('click', function () {
    const newTaskText = prompt('Edit task:', span.textContent);
    if (newTaskText !== null && newTaskText !== '') {
      span.textContent = newTaskText;
    }
  });
}

function AddTask(event) {
  event.preventDefault();
  const input = document.getElementById('todo-input');
  const taskText = input.value;

  if (taskText === '') return;

  const newTask = {
    text: taskText,
    isChecked: false,
    id: taskId,
  };

  tasksList.push(newTask);

  addTaskToDOM(newTask);

  input.value = '';
}

const form = document.getElementById('todo-form');
form.addEventListener('submit', AddTask);
