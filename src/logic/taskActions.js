let taskId = 1;

export function addTaskToList(tasksList, taskText) {
  const newTask = {
    text: taskText,
    isChecked: false,
    id: taskId++,
  };
  tasksList.set(newTask.id, newTask);
  return newTask;
}

export function removeTaskFromList(tasksList, taskId) {
  tasksList.delete(Number(taskId));
}

export function getInputFieldValue() {
  const input = document.getElementById('todo-input');
  const taskText = input.value.trim();
  return taskText === '' ? null : taskText;
}
