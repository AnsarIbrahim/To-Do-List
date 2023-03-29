import './style.css';

const tasks = [
  {
    description: 'wash the Dishes',
    completed: false,
    index: 1,
  },
  {
    description: 'complete To Do list Project',
    completed: false,
    index: 2,
  },
];

function renderTaskList() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', (event) => {
      task.completed = event.target.checked;
      // eslint-disable-next-line no-use-before-define
      checkAllCompleted();
    });
    listItem.appendChild(checkbox);

    const description = document.createElement('span');
    description.innerText = task.description;
    if (task.completed) {
      description.classList.add('completed');
    }
    listItem.appendChild(description);

    taskList.appendChild(listItem);
  });
}

function checkAllCompleted() {
  const allCompleted = tasks.every((task) => task.completed);
  const clearAllButton = document.getElementById('clear-all');
  clearAllButton.disabled = !allCompleted;
}

renderTaskList();
checkAllCompleted();
