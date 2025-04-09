document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const message = document.getElementById('message');
    const listSidebar = document.getElementById('list-sidebar');
    const listTitle = document.getElementById('list-title');
    const newListBtn = document.getElementById('new-list-btn');
    const listDate = document.getElementById('list-date');

    let currentList = 'My Day';
    const lists = {
        'My Day': [],
        'Important': [],
        'Planned': [],
        'Tasks': [],
        'Shopping': []
    };

    const loadTasks = () => {
        taskList.innerHTML = '';
        lists[currentList].forEach(task => addTaskToDOM(task));
    };

    const saveTasks = () => {
        localStorage.setItem('lists', JSON.stringify(lists));
    };

    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.textContent = task;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            lists[currentList] = lists[currentList].filter(t => t !== task);
            saveTasks();
            loadTasks();
            showMessage('Task deleted');
        });
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    };

    const showMessage = (text) => {
        message.textContent = text;
        setTimeout(() => message.textContent = '', 2000);
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = taskInput.value.trim();
        if (task) {
            lists[currentList].push(task);
            saveTasks();
            loadTasks();
            showMessage('Task added');
            taskInput.value = '';
        }
    });

    listSidebar.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            document.querySelector('.list-sidebar .active').classList.remove('active');
            e.target.classList.add('active');
            currentList = e.target.textContent;
            listTitle.textContent = currentList;
            loadTasks();
        }
    });

    newListBtn.addEventListener('click', () => {
        const newListName = prompt('Enter new list name:');
        if (newListName && !lists[newListName]) {
            lists[newListName] = [];
            const li = document.createElement('li');
            li.textContent = newListName;
            listSidebar.appendChild(li);
            saveTasks();
        }
    });

    const savedLists = JSON.parse(localStorage.getItem('lists'));
    if (savedLists) {
        Object.assign(lists, savedLists);
    }

    loadTasks();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('Service Worker registered successfully.'))
            .catch((error) => console.error('Service Worker registration failed:', error));
    }

    document.getElementById('menu-btn').addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    });

    const setDefaultDate = () => {
        const today = new Date().toISOString().split('T')[0];
        listDate.value = today;
    };

    listDate.addEventListener('change', () => {
        showMessage(`Date updated to ${listDate.value}`);
    });

    setDefaultDate();
});
