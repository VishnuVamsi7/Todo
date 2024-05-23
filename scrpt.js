document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();
    
    if (task) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');
        
        li.innerHTML = `${task} <span class="deleteBtn">X</span>`;
        taskList.appendChild(li);
        
        li.querySelector('.deleteBtn').addEventListener('click', function() {
            li.remove();
        });
        
        taskInput.value = '';
    }
});
