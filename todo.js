/*
    Listar tarefas
    Adicionar tarefa
    editar tarefa - talvez não seja bom ter essa possibilidade
    excluir tarefa
    persistir tarefas
*/

const div = document.querySelector('div')
const task = document.querySelector('#task')
const btn = document.querySelector('button')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

function persistTask(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function createButton() {
    let editeButton = document.createElement('button')
    let removeButton = document.createElement('button')

    editeButton.appendChild(document.createTextNode("editar"))
    removeButton.appendChild(document.createTextNode("remover"))

    return [editeButton, removeButton]
}

function listTasks() {
    let li = ''
    let ul = document.querySelector('ul')

    if(ul){
        div.removeChild(ul)
    }

    ul = document.createElement('ul')
    div.insertBefore(ul, task)

    tasks.forEach(({id, task}) => {
        li = document.createElement('li')
        li.setAttribute('id', id)

        btnEdit = createButton()[0]
        btnRemove = createButton()[1]

        btnEdit.onclick = () => console.log(id)
        btnRemove.onclick = () => removeTask(id)

        task = document.createTextNode(task)

        li.appendChild(task)
        //li.appendChild(btnEdit)
        li.appendChild(btnRemove)

        ul.appendChild(li)
    })

    task.value = ''
}

function addTask({value}) {
    const task = value
    const id = parseInt(Math.random() * 10000)

    tasks.push({id, task})

    persistTask(tasks)
    listTasks()
}

function removeTask(id) {
    const newTaskList = tasks.filter(task => task.id != id)
    tasks = [...newTaskList]

    persistTask(tasks)
    listTasks()
}

listTasks()
btn.addEventListener('click', () => addTask(task))