import edit from '../edit.js';
import { saveLocal } from '../live.js';

jest.mock('../live.js', () => ({
  saveLocal: jest.fn(),
}));
describe('edit', () => {
  let list;
  const text = {
    value: '',
  };
  const i = 0;

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

  test('should edit text', () => {
    list = edit(text, i, list);
    expect(saveLocal).toHaveBeenCalled();
  });
});
