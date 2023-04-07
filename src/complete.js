import { saveLocal } from './live.js';

export default function status(elem, list) {
  const newList = list.map((task) => {
    if (task === elem) {
      task.isCompleted = !task.isCompleted;
    }
    return task;
  });
  saveLocal(newList);
  return newList;
}
