import { saveLocal } from './live.js';

export function add(list) {
  const input = document.querySelector('#newTask');
  if (input.value !== '') {
    list.push({ description: document.querySelector('#newTask').value, isCompleted: false, index: list.length + 1 });
    document.querySelector('#newTask').value = '';
    saveLocal(list);
  }
}

export function remove(list, i) {
  if (i > list.length + 1 || i < 0) {
    return;
  }
  const filteredArr = list.filter((task) => task.index !== i);
  saveLocal(filteredArr);
  // eslint-disable-next-line consistent-return
  return filteredArr;
}

export function updateIndex(list) {
  let i = 1;
  list.forEach((elem) => {
    elem.index = i;
    i += 1;
  });
}

export function removeDone(list) {
  list = list.filter((elem) => elem.isCompleted === false);
  updateIndex(list);
  saveLocal(list);
}
