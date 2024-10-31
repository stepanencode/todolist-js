import { API_URL } from '../constants/constants.js';

export async function fetchTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`Error: ${response.status}`);
  return await response.json();
}

export function convertArrayToMap(dataArray) {
  return new Map(dataArray.map((item) => [item.id, item]));
}

export function processFetchedTasks(data, tasksList) {
  data.forEach((item) => {
    const task = {
      text: item.title,
      isChecked: item.completed,
      id: item.id,
    };
    tasksList.set(task.id, task);
  });
}
