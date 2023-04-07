import deleteTodo from '../deleteTodo.js';
import { saveLocal } from '../live.js';

jest.mock('../live.js', () => ({
  saveLocal: jest.fn(),
}));
describe('delete item', () => {
  let list;
  beforeEach(() => {
    list = [
      {
        description: 'Task 3',
        completed: false,
        index: 3,
      },
      {
        description: 'Task 2',
        completed: false,
        index: 2,
      },
      {
        description: 'Task 1',
        completed: false,
        index: 1,
      },
    ];
  });
  test('should delete item of given index', () => {
    const newList = deleteTodo(1, list);
    expect(saveLocal).toHaveBeenCalled();
    expect(newList).toEqual([{ description: 'Task 3', completed: false, index: 3 }, { description: 'Task 2', completed: false, index: 2 },
    ]);
  });
});