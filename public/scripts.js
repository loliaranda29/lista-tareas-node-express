document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
  
    const loadTasks = () => {
      fetch('/list')
        .then((response) => response.json())
        .then((data) => {
          taskList.innerHTML = '';
          data.forEach((task) => {
            const listItem = document.createElement('li');
            const taskText = document.createElement('span');
            const completeButton = document.createElement('button');
            const deleteButton = document.createElement('button');
  
            taskText.textContent = task.description;
            listItem.appendChild(taskText);
  
            completeButton.textContent = 'Completar';
            completeButton.classList.add('complete');
            completeButton.addEventListener('click', () => completeTask(task.id));
            listItem.appendChild(completeButton);
  
            deleteButton.textContent = 'Eliminar';
            deleteButton.classList.add('delete');
            deleteButton.addEventListener('click', () => deleteTask(task.id));
            listItem.appendChild(deleteButton);
  
            if (task.isCompleted) {
              taskText.style.textDecoration = 'line-through';
              taskText.style.color = 'green';
            }
  
            taskList.appendChild(listItem);
          });
        });
    };
  
    loadTasks();
  
    const completeTask = (id) => {
      fetch('/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId: id }),
      })
        .then(() => {
          loadTasks();
        });
    };
  
    const deleteTask = (id) => {
      fetch('/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskId: id }),
      })
        .then(() => {
          loadTasks();
        });
    };
  
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const descriptionInput = document.getElementById('description');
      const description = descriptionInput.value.trim();
  
      if (description) {
        fetch('/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description }),
        })
          .then(() => {
            descriptionInput.value = '';
            loadTasks();
          });
      }
    });
  });
  