const API_URL = 'http://localhost:3000/api';

function signup() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => alert(data.message || data.error));
}

function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => alert(data.message || data.error));
}

function logout() {
  fetch(`${API_URL}/auth/logout`, { method: 'POST' })
    .then(res => res.json())
    .then(data => alert(data.message));
}

function createTask() {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!title || !description) return alert('Title and description required');

  fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  })
    .then(res => res.json())
    .then(task => {
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      loadTasks();
    });
}

function loadTasks() {
  const filter = document.getElementById('filter').value;
  const url = filter ? `${API_URL}/tasks?completed=${filter}` : `${API_URL}/tasks`;

  fetch(url)
    .then(res => res.json())
    .then(tasks => {
      const list = document.getElementById('taskList');
      list.innerHTML = '';

      tasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `card p-3 mb-2 ${task.completed ? 'bg-success-subtle' : ''}`;
        div.innerHTML = `
          <h5>${task.title}</h5>
          <p>${task.description}</p>
          <p><strong>Status:</strong> ${task.completed ? '✅ Completed' : '❌ Not Completed'}</p>
          <button class="btn btn-sm btn-warning me-2" onclick="toggleTask('${task._id}', ${!task.completed})">Mark as ${task.completed ? 'Incomplete' : 'Completed'}</button>
          <button class="btn btn-sm btn-danger" onclick="deleteTask('${task._id}')">Delete</button>
        `;
        list.appendChild(div);
      });
    });
}

function toggleTask(id, newStatus) {
  fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: newStatus })
  })
    .then(res => res.json())
    .then(loadTasks);
}

function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' })
    .then(() => loadTasks());
}

window.onload = loadTasks;