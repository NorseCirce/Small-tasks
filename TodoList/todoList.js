const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Stack to hold the last 5 deleted tasks
const deletedTasksStack = [];

// Add Task Function
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
});

// Function to create a new task element
function createTaskElement(taskText) {
    const li = document.createElement('li');

    // Create task content with checkbox and label
    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const label = document.createElement('label');
    label.textContent = taskText;

    taskContent.appendChild(checkbox);
    taskContent.appendChild(label);

    // Add event listener for checkbox to toggle 'done' class
    checkbox.addEventListener('change', () => {
        li.classList.toggle('done');
    });

    // Create trashcan button
    const trashBtn = document.createElement('button');
    trashBtn.className = 'trash-btn';
    trashBtn.innerHTML = '🗑️';

    // Add event listener for trashcan button to remove task
    trashBtn.addEventListener('click', () => {
        deleteTask(li, taskText);
    });

    // Append task content and trashcan button to the list item
    li.appendChild(taskContent);
    li.appendChild(trashBtn);

    return li;
}

// Delete Task Function
function deleteTask(li, taskText) {
    // Add the task to the deleted tasks stack
    if (deletedTasksStack.length >= 5) {
        deletedTasksStack.shift(); // Remove the oldest task if stack exceeds 5
    }
    deletedTasksStack.push(taskText);

    // Remove the task from the list
    taskList.removeChild(li);
}

// Undo Last Delete (Ctrl+Z)
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'z') {
        if (deletedTasksStack.length > 0) {
            const lastDeletedTask = deletedTasksStack.pop();
            const restoredTask = createTaskElement(lastDeletedTask);
            taskList.appendChild(restoredTask);
        } else {
            alert("No tasks to undo!");
        }
    }
});
