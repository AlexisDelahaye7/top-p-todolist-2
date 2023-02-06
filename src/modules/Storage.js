import { currentProject, loadAllTasksOnUI, fulltaskContent } from "./UI"
import { switchCurrentProject } from "./UI"
import { findTask } from "./Tasks"

let tasksList = [
    [
        'Inbox',
        ['Good Task', 'This is a short description of the task', '2023-03-09', 'Normal', true],
        ['Task One homepage', 'description', '2023-03-09', 'Low', false],
        ['Task Two homepage', 'description', '2023-03-09', 'High', true],
        ['Task Three homepage', 'description', '2023-03-09', 'Normal', false]
    ],
    [
        'Custom',
        ['Task One custom', 'description', '2023-03-09', 'Low', true],
        ['Task Two custom', 'description', '2023-03-09', 'High', false]
    ],
]

const updateLocalStorage = function(){
    const methods = {}

    methods.status = function(taskName, value){
        let thisProjectIndex = findTask(currentProject, taskName).projectIndex()
        let thisTaskIndex = findTask(currentProject, taskName).taskIndex()

        tasksList[thisProjectIndex][thisTaskIndex][4] = value
        setLocalStorage()
    }

    methods.uniqueTask = function(project, initialTask, task, description, duedate, priority, value){
        let projectIndex = findTask(project).projectIndex()
        let taskIndex = findTask(project, initialTask).taskIndex()
        if(value === undefined || value === 'priority') value = tasksList[projectIndex][taskIndex][4]

        tasksList[projectIndex][taskIndex] = [task, description, duedate, priority, value]
        setLocalStorage()
        loadAllTasksOnUI()
        fulltaskContent().hide()
    }

    methods.deleteTask = function(projectName, taskName){
        let projectIndex = findTask(projectName).projectIndex()
        let taskIndex = findTask(projectName, taskName).taskIndex()
        tasksList[projectIndex].splice([taskIndex], 1)

        setLocalStorage()
        loadAllTasksOnUI()
        fulltaskContent().hide()
    }

    methods.createProject = function(projectName){
        tasksList.push([projectName])
        switchCurrentProject(projectName)
        setLocalStorage()
    }

    return methods
}

function setLocalStorage(){
    return window.localStorage.setItem('tasks2', JSON.stringify(tasksList))
}

function getLocalStorage(){
    if(JSON.parse(window.localStorage.getItem('tasks2')) == null){
        setLocalStorage()
    } else {
        tasksList = JSON.parse(window.localStorage.getItem('tasks2'))
    }
}



export {getLocalStorage, setLocalStorage, tasksList, updateLocalStorage}