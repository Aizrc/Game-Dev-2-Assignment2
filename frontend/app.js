document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('user-form');
    const userList = document.getElementById('user-list');
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');

    // Fetch and display users
    function fetchUsers() {
        fetch('http://127.0.0.1:5000/users')
            .then(response => response.json())
            .then(users => {
                userList.innerHTML = '';
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = user.name;
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = () => deleteUser(user.id);
                    li.appendChild(deleteButton);
                    userList.appendChild(li);
                });
            });
    }

    // Fetch and display tasks
    function fetchTasks() {
        fetch('http://127.0.0.1:5000/tasks')
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';
                tasks.forEach(task => {
                    const li = document.createElement('li');
                    li.textContent = `${task.title}: ${task.description}`;
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.onclick = () => deleteTask(task.id);
                    li.appendChild(deleteButton);
                    taskList.appendChild(li);
                });
            });
    }

    // Add user
    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userName = document.getElementById('user-name').value;
        fetch('http://127.0.0.1:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: userName })
        })
        .then(response => response.json())
        .then(() => {
            fetchUsers();
            userForm.reset();
        });
    });

    // Add task
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskTitle = document.getElementById('task-title').value;
        const taskDesc = document.getElementById('task-desc').value;
        fetch('http://127.0.0.1:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: taskTitle, description: taskDesc })
        })
        .then(response => response.json())
        .then(() => {
            fetchTasks();
            taskForm.reset();
        });
    });

    // Delete user
    function deleteUser(id) {
        fetch(`http://127.0.0.1:5000/users/${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchUsers());
    }

    // Delete task
    function deleteTask(id) {
        fetch(`http://127.0.0.1:5000/tasks/${id}`, {
            method: 'DELETE'
        })
        .then(() => fetchTasks());
    }

    // Initial fetch
    fetchUsers();
    fetchTasks();
});