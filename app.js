// Array to store tasks
let tasks = [];

// Load existing tasks from localStorage on page load
window.onload = function() {
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
  }
};

// Handle form submission
document.getElementById('todo-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get contributor name and task content
  const name = document.getElementById('contributor-name').value;
  const content = document.getElementById('task-content').value;

  // Create a new task object
  const task = {
    name: name,
    content: content,
    completed: false,
    timestamp: new Date().toLocaleString()
  };

  // Add the new task to the array and save it
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Clear the form fields
  document.getElementById('contributor-name').value = '';
  document.getElementById('task-content').value = '';

  // Re-render tasks
  renderTasks();
});

// Function to render tasks on the page
function renderTasks() {
  const tasksContainer = document.getElementById('tasks-container');
  tasksContainer.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    
    const taskContent = document.createElement('p');
    taskContent.textContent = task.content;
    if (task.completed) {
      taskContent.classList.add('completed');
    }

    const contributor = document.createElement('p');
    contributor.textContent = `Contributed by ${task.name} on ${task.timestamp}`;
    contributor.className = 'contributor';

    const actions = document.createElement('div');
    actions.className = 'actions';

    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Undo' : 'Complete';
    completeButton.className = 'complete-btn';
    completeButton.addEventListener('click', () => toggleComplete(index));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => deleteTask(index));

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    
    taskElement.appendChild(taskContent);
    taskElement.appendChild(contributor);
    taskElement.appendChild(actions);
    tasksContainer.appendChild(taskElement);
  });
}

// Function to toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Function to toggle task completion
function toggleComplete(index) {
  const taskElement = document.querySelectorAll('.task')[index];
  tasks[index].completed = !tasks[index].completed;
  
  // Animate task completion: add completed class for strike-through and background change
  if (tasks[index].completed) {
    taskElement.classList.add('completed');

    // Optional: Add fade-out or slide-out after 3 seconds (for task moving to completed state)
    setTimeout(() => {
      // Use either fade-out or slide-out depending on preference
      // taskElement.classList.add('fade-out'); // Uncomment for fade-out
      taskElement.classList.add('slide-out');   // Uncomment for slide-out
    }, 3000);  // Wait 3 seconds before applying fade-out/slide-out effect

    // Optionally remove task from view after animation completes
    setTimeout(() => {
      taskElement.style.display = 'none'; // Hide task after animation
    }, 5000);  // 5 seconds total for animation and removal

  } else {
    // If task is marked as incomplete, remove the animations
    taskElement.classList.remove('completed', 'fade-out', 'slide-out');
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}


// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Handle search input to filter tasks
document.getElementById('search-tasks').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  filterTasks(searchTerm);
});

// Function to filter tasks based on search term
function filterTasks(searchTerm) {
  const taskElements = document.querySelectorAll('.task');

  taskElements.forEach((taskElement) => {
    const taskText = taskElement.querySelector('p').textContent.toLowerCase();
    const contributorText = taskElement.querySelector('.contributor').textContent.toLowerCase();

    if (taskText.includes(searchTerm) || contributorText.includes(searchTerm)) {
      // Show the task if it matches the search term
      taskElement.style.display = 'flex';
    } else {
      // Hide the task if it doesn't match the search term
      taskElement.style.display = 'none';
    }
  });
}
