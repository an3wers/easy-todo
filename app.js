const $input = document.querySelector('input')
const $btn = document.querySelector('button')
const $list = document.querySelector('#list')
const $emptyState = document.querySelector('#empty-block')

let tasks = []
const date = new Date()

class Task {
    constructor(value) {
        this.value = value
        this.isDone = false
        this.id = Date.now()
        this.date = `${date.toLocaleString()}`
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

    if (localStorage.getItem('task') && localStorage.getItem('task') !== []) {
        tasks = JSON.parse(localStorage.getItem('task'))

        const htmlData = tasks.map(el => {
            return `
            <li data-state="${el.isDone}">
                <div><span class="text ${el.isDone ? 'done' : ''}">${el.value}</span><span data-task="${el.id}" class="remove">Удалить</span> <span data-task="${el.id}" class="done">Сделано</span></div>
                <div class="task-date">${el.date}</div>
            </li>
            `
        }).reverse()

    
        $list.innerHTML = ''
        $list.insertAdjacentHTML('afterbegin', htmlData.join(''))


        $list.classList.remove('hide')
        $emptyState.classList.add('hide')

       
    } else {
            $list.classList.add('hide')
            $emptyState.classList.remove('hide')
    }

}


function removeTask() {
    $list.addEventListener('click', event => {
        if (event.target.classList.contains('remove')) {


            const removeBtnIndex = event.target.getAttribute('data-task')

            let delObj = tasks.findIndex(el => {
                return el.id == removeBtnIndex
            })

            tasks.splice(delObj, 1)

            if (tasks.length > 0) {
                localStorage.setItem('task', JSON.stringify(tasks))
                displayTaskFromLS()

            } else {
                localStorage.setItem('task', JSON.stringify(tasks)) // пустой массив []
               
                $list.classList.add('hide')
                $emptyState.classList.remove('hide')

            }


        }
    })
}


function doneTask() {
    $list.addEventListener('click', event => {
        if(event.target.classList.contains('done')) {
            const doneBtnIndex = event.target.getAttribute('data-task')

            let doneObjIndex = tasks.findIndex(el => el.id == doneBtnIndex)
            
            tasks[doneObjIndex].isDone = true

            
            localStorage.setItem('task', JSON.stringify(tasks))
            displayTaskFromLS()
            


        }
    })
}


if (localStorage.getItem('task') && localStorage.getItem('task') !== '[]') {
    displayTaskFromLS()
    removeTask()
    doneTask()
    
} else {
    $list.classList.add('hide')
    $emptyState.classList.remove('hide')
    
}

