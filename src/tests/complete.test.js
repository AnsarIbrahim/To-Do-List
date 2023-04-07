import { saveLocal } from '../live.js';
import status from '../complete.js';

jest.mock('../live.js', () => ({
  saveLocal: jest.fn(),
}));

describe('status', () => {
  let list;
  const item = {
    description: 'Task 3',
    isCompleted: false,
    index: 3,
  };

  beforeEach(() => {
    list = [
      {
        description: 'Task 2',
        isCompleted: false,
        index: 2,
      },
      {
        description: 'Task 1',
        isCompleted: false,
        index: 1,
      },
    ];
  });

  test('complete the status', () => {
    const newList = status(item, list);
    expect(saveLocal).toHaveBeenCalled();
    expect(newList).toEqual([{ description: 'Task 2', isCompleted: false, index: 2 }, { description: 'Task 1', isCompleted: false, index: 1 }]);
  });
});
