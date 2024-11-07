import { FILTERS } from '../constants/constants.js';

export function filterTasks(tasksList, filterType) {
  return Array.from(tasksList.values()).filter((task) => {
    return (
      filterType === FILTERS.ALL ||
      (filterType === FILTERS.COMPLETED && task.isChecked) ||
      (filterType === FILTERS.INCOMPLETED && !task.isChecked)
    );
  });
}
