import { add, removeDone } from '../live.js';

jest.mock('../mock/test.js');

describe('Testing add and remove functions', () => {
  test('Adding a new task', () => {
    /* Arrange */
    document.body.innerHTML = '<form id="taskForm" action="POST" class="input-icon">'
      + '<input class="todo-input" type="text" name="New Task" id="newTask" placeholder="Add to your list..." required>'
      + '<button id="taskSubmit" type="submit"><i class="fas fa-plus-square icon"></i></button>'
      + '</form>';

    const list = JSON.parse(localStorage.getItem('list')) || []; // [1]

    /* Act */
    add('clicked'); // [2] list.length + 1
    const newList = JSON.parse(localStorage.getItem('list'));
    const newListLength = newList.length;

    /* Assert */
    expect(newListLength).toBe(list.length + 1);
    expect(newList[newListLength - 1].description).toBe('newTask');
  });
  test('Removing a task', () => {
    /* Arrange */
    const list = JSON.parse(localStorage.getItem('list'));

    /* Act */
    removeDone(1);
    const newList = JSON.parse(localStorage.getItem('list'));

    /* Assert */
    expect(newList.length).toBe(list.length - 1);
  });
});