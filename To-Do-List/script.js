const form = document.getElementById('form')
const formInput = document.getElementById('input')
const todos = document.getElementById('todos')

// read and disaply tasks from local storage
const tasks = JSON.parse(localStorage.getItem('tasks'))
if (tasks) {
    tasks.forEach(task => addNewTask(task))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addNewTask()
})

function addNewTask(task) {
    let todoText = formInput.value

    if (task) {
        todoText = task.text
    }

    if (todoText) {
        const taskEl = document.createElement('li')
        if (task && task.completed) {
            taskEl.classList.toggle('completed')
        }
        taskEl.innerText = todoText

        taskEl.addEventListener('click', () => {
            taskEl.classList.toggle('completed')
            updateLS()
        }
        )
        taskEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            taskEl.remove()
            updateLS()
        })

        todos.appendChild(taskEl)
        formInput.value = ""
        updateLS()
    }
}


function updateLS() {
    const taksNote = document.querySelectorAll('li')
    const tasks = []
    taksNote.forEach(task => tasks.push({
        text: task.innerText,
        completed: task.classList.contains('completed')
    }))
    localStorage.setItem('tasks', JSON.stringify(tasks))
}