document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);

document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('allBtn').addEventListener('click', () => filterTasks('all'));
document.getElementById('completedBtn').addEventListener('click', () => filterTasks('completed'));
document.getElementById('incompleteBtn').addEventListener('click', () => filterTasks('incomplete'));

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    
    if (task) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span>${task}</span>
            <div>
                <span class="editBtn">Edit</span>
                <span class="deleteBtn">X</span>
            </div>
        `;
        taskList.appendChild(li);
        
        li.querySelector('.deleteBtn').addEventListener('click', function() {
            li.remove();
            saveTasksToLocalStorage();
        });

        li.querySelector('.editBtn').addEventListener('click', function() {
            const newTask = prompt("Edit task:", li.firstElementChild.textContent);
            if (newTask) {
                li.firstElementChild.textContent = newTask;
                saveTasksToLocalStorage();
            }
        });

        li.firstElementChild.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasksToLocalStorage();
        });
        
        taskInput.value = '';
        saveTasksToLocalStorage();
    }
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll('#taskList li');
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'incomplete':
                task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                break;
        }
    });
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(task => {
        tasks.push({
            text: task.firstElementChild.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <span class="editBtn">Edit</span>
                <span class="deleteBtn">X</span>
            </div>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);

        li.querySelector('.deleteBtn').addEventListener('click', function() {
            li.remove();
            saveTasksToLocalStorage();
        });

        li.querySelector('.editBtn').addEventListener('click', function() {
            const newTask = prompt("Edit task:", li.firstElementChild.textContent);
            if (newTask) {
                li.firstElementChild.textContent = newTask;
                saveTasksToLocalStorage();
            }
        });

        li.firstElementChild.addEventListener('click', function() {
            li.classList.toggle('completed');
            saveTasksToLocalStorage();
        });
    });
}
