const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const statusMessage = document.getElementById('status-message');

// Charger les tâches initiales
async function fetchTodos() {
    try {
        const response = await fetch(`${API_URL}?_limit=5`); // Limiter à 5 pour l'exemple
        const todos = await response.json();
        todos.forEach(todo => renderTodo(todo));
    } catch (error) {
        showStatus('Erreur de chargement des tâches', 'error');
    }
}

// Afficher une tâche dans le DOM
function renderTodo(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    li.innerHTML = `
        <span>${todo.title}</span>
        ${!todo.completed ? `<button class="done-btn" onclick="completeTodo(${todo.id}, this)">Terminé</button>` : ''}
    `;
    todoList.appendChild(li);
}

// Ajouter une tâche (POST)
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = todoInput.value.trim();
    if (!title) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                completed: false,
                userId: 1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            const newTodo = await response.json();
            // Note: JSONPlaceholder ne persiste pas réellement, donc on l'ajoute manuellement au DOM
            renderTodo(newTodo);
            todoInput.value = '';
            showStatus('Tâche ajoutée avec succès !', 'success');
        }
    } catch (error) {
        showStatus('Erreur lors de l\'ajout', 'error');
    }
});

// Marquer comme terminé (PUT)
async function completeTodo(id, btn) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                completed: true
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            const li = btn.parentElement;
            li.classList.add('completed');
            btn.remove();
            showStatus('Tâche mise à jour !', 'success');
        }
    } catch (error) {
        showStatus('Erreur lors de la mise à jour', 'error');
    }
}

// Afficher un message de statut
function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = type;
    setTimeout(() => {
        statusMessage.textContent = '';
        statusMessage.className = '';
    }, 3000);
}

// Initialisation
fetchTodos();
