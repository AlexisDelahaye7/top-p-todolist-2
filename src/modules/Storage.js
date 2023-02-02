let tasksList = [
    [
        'Inbox',
        ['Task One homepage', 'description', 'date', 'priority', 'status'],
        ['Task Two homepage', 'description', 'date', 'priority', 'status'],
        ['Task Three homepage', 'description', 'date', 'priority', 'status']
    ],
    [
        'Custom project',
        ['Task One custom', 'description', 'date', 'priority', 'status'],
        ['Task Two custom', 'description', 'date', 'priority', 'status']
    ],
]

const updateLocalStorage = (function(){
    const methods = {}

    methods.status = function(taskName, value){
        // HERE
        console.log(`${taskName} ${value}`)
    }
    
    return methods
})()

function setLocalStorage(){
    console.log('setLocalStorage')
    return window.localStorage.setItem('tasks2', JSON.stringify(tasksList))
}

function getLocalStorage(){
    console.log('getLocalStorage')
    if(JSON.parse(window.localStorage.getItem('tasks2')) == null){
        setLocalStorage()
    } else {
        tasksList = JSON.parse(window.localStorage.getItem('tasks2'))
    }
}



export {getLocalStorage, tasksList, updateLocalStorage}