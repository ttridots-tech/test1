// Get references to elements
const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Add button click event
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value;

    if (taskText === '')
        return alert('Please enter a task.');

    // Create a new list item
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = taskText;

    // Create delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'btn btn-danger btn-sm';

    // When delete clicked
    delBtn.addEventListener('click', () => {
        li.remove();
    });

    // Append button to li, and li to list
    li.appendChild(delBtn);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = '';
});
