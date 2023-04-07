import { saveLocal } from './live.js';

export default function deleteTodo(i, list) {
  const newList = list.filter((task) => task.index !== i);
  saveLocal(newList);
  return newList;
}