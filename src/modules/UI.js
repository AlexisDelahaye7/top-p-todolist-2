import {getLocalStorage, tasksList} from "./Storage"
import closestWithinChildren from "./CustomFunctions"
import { findProjectDetails, findTaskDetails, thisTask } from "./Tasks"

let currentProject = 'Inbox'

const loadAllTasksOnUI = (function(){
    getLocalStorage()
    let thisProjectTasks = findProjectDetails(currentProject)

    for(let i = 1; i < thisProjectTasks.length; i++){
        loadUniqueTaskOnUI(thisProjectTasks[i])
    }
})()

function loadUniqueTaskOnUI(taskArray){
    const tasksListDOM = document.querySelector('#tasks-list')
    
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task')
    taskDiv.addEventListener('click', fulltaskContent().show)
    
    const statusInput = document.createElement('input')
    statusInput.setAttribute('type', 'checkbox')
    statusInput.addEventListener('click', thisTask().updateStatus)

    const nameSpan = document.createElement('span')
    nameSpan.textContent = taskArray[0]

    tasksListDOM.appendChild(taskDiv)
    taskDiv.appendChild(statusInput)
    taskDiv.appendChild(nameSpan)
}

function fulltaskContent(){
    const methods = {}

    const fulltaskBackground = document.querySelector('#fulltask-background')
    
    methods.show = function(e){
        if(e.target.tagName === 'INPUT') return
        let clickedTaskNameElement = e.target.closest('span')
        if(clickedTaskNameElement === null){
            clickedTaskNameElement = Array.from(e.target.children).find(child => child.tagName === "SPAN");
        }

        fulltaskBackground.style.display = ''
        let thisTaskDetails = findTaskDetails(currentProject, clickedTaskNameElement.textContent)

        console.log(thisTaskDetails)
    }

    methods.hide = function(e){
        fulltaskBackground.style.display = 'none'
    }

    return methods
}

const taskForm = (function(){
    const methods = {}

    const taskFormElement = document.getElementById('task-form')
    
    methods.show = function(){
        taskFormElement.style.display = ''
        addtaskButton.style.display = 'none'
    }
    
    methods.hide = function(){
        addtaskButton.style.display = ''
        taskFormElement.style.display = 'none'
    }
    

    return methods
})()


const addtaskButton = document.querySelector('#addtask-button')
addtaskButton.addEventListener('click', taskForm.show)

const closeFormButton = document.querySelector('#form-close')
closeFormButton.addEventListener('click', taskForm.hide)

const closeFulltaskButton = document.querySelector('#fulltask-close')
closeFulltaskButton.addEventListener('click', fulltaskContent().hide)

export default {taskForm, currentProject}