const $input = document.querySelector('input')
const $btn = document.querySelector('button')
const $list = document.querySelector('#list')
let tasks = []
let id = 0




class Task {
    constructor(value) {
        this.value = value
        // this.date = new Date
    }
  
}


$btn.addEventListener('click', getTask)

function getTask() {
    if ($input.value) {
       
        id++
        const task = new Task($input.value)
        task.id = id
        tasks.push(task)
        $input.value = ''

        // добавление массива tasks в локал сторедж
        localStorage.setItem('task', JSON.stringify(tasks))
        displayTaskFromLS()

    }

   
    

}



function displayTaskFromLS() {
    tasks = JSON.parse(localStorage.getItem('task'))
    
    const htmlData = tasks.map(el => {
        return `<li data-id="${el.id}"><span class="text">${el.value}</span><span data-task="${el.id}" class="remove">Удалить</span> <span data-task="${el.id}" class="done">Сделано</span></li>`
    }).reverse()

    $list.innerHTML = ''
    $list.insertAdjacentHTML('afterbegin', htmlData.join(''))

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
            tasks.splice(delObj,1)
            localStorage.setItem('task', JSON.stringify(tasks))
            
            displayTaskFromLS()

        }
    })
}

displayTaskFromLS()
removeTask()
