import { currentProject, loadAllTasksOnUI } from "./UI"
import { findTask } from "./Tasks"

let tasksList = [
    [
        'Inbox',
        ['Good Task', 'This is a short description of the task', '2023-03-09', 'Normal', true],
        ['Task One homepage', 'description', '2023-03-09', 'priority', 'status'],
        ['Task Two homepage', 'description', '2023-03-09', 'priority', 'status'],
        ['Task Three homepage', 'description', '2023-03-09', 'priority', 'status']
    ],
    [
        'Custom',
        ['Task One custom', 'description', '2023-03-09', 'priority', 'status'],
        ['Task Two custom', 'description', '2023-03-09', 'priority', 'status']
    ],
]

const updateLocalStorage = function(){
    const methods = {}

    methods.status = function(taskName, value){
        let thisProjectIndex = findTask(currentProject, taskName).projectIndex()
        let thisTaskIndex = findTask(currentProject, taskName).taskIndex()
        console.log(`project index ${thisProjectIndex} + task index ${thisTaskIndex}`)

        tasksList[thisProjectIndex][thisTaskIndex][4] = value
        setLocalStorage()
    }

    methods.uniqueTask = function(project, initialTask, task, description, duedate, priority, value){
        let projectIndex = findTask(project).projectIndex()
        let taskIndex = findTask(project, initialTask).taskIndex()
        if(value === undefined) value = tasksList[projectIndex][taskIndex][4]

        tasksList[projectIndex][taskIndex] = [task, description, duedate, priority, value]
        console.log(tasksList[projectIndex][taskIndex])
        setLocalStorage()
        loadAllTasksOnUI()
        
    }

    return methods
}

function setLocalStorage(){
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