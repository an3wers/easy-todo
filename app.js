const $input = document.querySelector('input')
const $btn = document.querySelector('button')
const $list = document.querySelector('#list')
let tasks = []
const date = new Date()

class Task {
    constructor(value) {
        this.value = value
        this.isDone = false
        this.id = date
        this.date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
    }

}


$btn.addEventListener('click', getTask)

function getTask() {
    if ($input.value) {

       
        const task = new Task($input.value)
        
        tasks.push(task)
        $input.value = ''

        // добавление массива tasks в локал сторедж
        localStorage.setItem('task', JSON.stringify(tasks))
        displayTaskFromLS()

    }


}


function displayTaskFromLS() {

    if (localStorage.getItem('task')) {
        tasks = JSON.parse(localStorage.getItem('task'))

        const htmlData = tasks.map(el => {
            return `
            <li data-id="${el.id}">
                <div><span class="text">${el.value}</span><span data-task="${el.id}" class="remove">Удалить</span> <span data-task="${el.id}" class="done">Сделано</span></div>
                <div class="task-date">${el.date}</div>
            </li>
            `
        }).reverse()

        $list.innerHTML = ''
        $list.insertAdjacentHTML('afterbegin', htmlData.join(''))
    }

}



function removeTask() {
    $list.addEventListener('click', event => {
        if (event.target.classList.contains('remove')) {

            // console.log(event.target.getAttribute('data-task'))

            const removeBtnIndex = event.target.getAttribute('data-task')

            let delObj = tasks.findIndex(el => {
                return el.id == removeBtnIndex
            })

            // console.log(delObj)
            tasks.splice(delObj, 1)
            localStorage.setItem('task', JSON.stringify(tasks))

            displayTaskFromLS()

        }
    })
}


if (localStorage.getItem('task')) {
    displayTaskFromLS()
    removeTask()
}

