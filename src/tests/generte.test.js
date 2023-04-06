import jsdom from 'jsdom';
import { add, remove } from '../generte.js';
import { saveLocal } from '../live.js';

// Import JSDOM and initialize it

const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
});
global.window = dom.window;
global.document = window.document;

jest.mock('../live.js', () => ({
  saveLocal: jest.fn(),
}));

describe('add', () => {
  let list;

  beforeEach(() => {
    // Initialize the list
    list = [{ description: 'Task 1', isCompleted: false, index: 1 }];
  });

  afterEach(() => {
    // Reset the mock after each test
    jest.clearAllMocks();
  });

  test('should add a new task to the list and call saveLocal', () => {
    // Arrange
    const newTask = 'Task 2';
    const inputField = document.createElement('input');
    inputField.id = 'newTask';
    inputField.value = newTask;
    document.body.appendChild(inputField);

    // Act
    add(list);

    // Assert
    expect(list).toHaveLength(2);
    expect(list[1].description).toEqual(newTask);
    expect(list[1].isCompleted).toBeFalsy();
    expect(list[1].index).toEqual(2);
    expect(saveLocal).toHaveBeenCalledTimes(1);
    expect(saveLocal).toHaveBeenCalledWith(list);
    expect(inputField.value).toEqual('');
  });

  test('should not add a new task to the list if the input field is empty', () => {
    // Arrange
    const inputField = document.createElement('input');
    inputField.id = 'newTask';
    inputField.value = '';
    document.body.appendChild(inputField);

    // Act
    add(list);

    // Assert
    expect(list).toHaveLength(1);
    expect(saveLocal).not.toHaveBeenCalled();
    expect(inputField.value).toEqual('');
  });
});

describe('remove', () => {
  let list;

  beforeEach(() => {
    // Initialize the list
    list = [
      { description: 'Task 1', isCompleted: false, index: 1 },
      { description: 'Task 2', isCompleted: false, index: 2 },
      { description: 'Task 3', isCompleted: true, index: 3 },
    ];
  });

  afterEach(() => {
    // Reset the mock after each test
    jest.clearAllMocks();
  });

  test('should remove a task from the list and call saveLocal', () => {
    // Arrange
    const indexToRemove = 1;

    // Act
    list = remove(list, indexToRemove);

    // Assert
    expect(list).toHaveLength(2);
    expect(list[0].description).toEqual('Task 2');
    expect(list[0].isCompleted).toBeFalsy();
    expect(list[0].index).toEqual(2);
    expect(list[1].description).toEqual('Task 3');
    expect(list[1].isCompleted).toBeTruthy();
    expect(list[1].index).toEqual(3);
    expect(saveLocal).toHaveBeenCalledTimes(1);
    expect(saveLocal).toHaveBeenCalledWith(list);
  });

  test('should not remove a task if the index is invalid and not call saveLocal', () => {
    // Arrange
    const indexToRemove = 5;

    // Act
    remove(list, indexToRemove);

    // Assert
    expect(list).toHaveLength(3);
    expect(list[0].description).toEqual('Task 1');
    expect(list[0].isCompleted).toBeFalsy();
    expect(list[0].index).toEqual(1);
    expect(list[1].description).toEqual('Task 2');
    expect(list[1].isCompleted).toBeFalsy();
    expect(list[1].index).toEqual(2);
    expect(list[2].description).toEqual('Task 3');
    expect(list[2].isCompleted).toBeTruthy();
    expect(list[2].index).toEqual(3);
    expect(saveLocal).not.toHaveBeenCalled();
  });
});