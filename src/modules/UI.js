import {getLocalStorage, tasksList} from "./Storage"
import { findTask, thisTask } from "./Tasks"

export let currentProject = 'Inbox'

const tasksListDOM = document.querySelector('#tasks-list')


export const loadAllTasksOnUI = function(){
    const currentProjectDOM = document.querySelector('#project-name')
    currentProjectDOM.textContent = currentProject
    
    tasksListDOM.innerHTML = ''
    getLocalStorage()

    let thisProjectTasks = findTask(currentProject).projectArray()

    for(let i = 1; i < thisProjectTasks.length; i++){
        loadUniqueTaskOnUI(thisProjectTasks[i])
    }
}

function loadUniqueTaskOnUI(taskArray){
    
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('task')
    taskDiv.addEventListener('click', fulltaskContent().show)
    
    const statusInput = document.createElement('input')
    statusInput.setAttribute('type', 'checkbox')
    statusInput.addEventListener('click', thisTask.updateStatus)

    const nameSpan = document.createElement('span')
    nameSpan.textContent = taskArray[0]

    tasksListDOM.appendChild(taskDiv)
    taskDiv.appendChild(statusInput)
    taskDiv.appendChild(nameSpan)
}

export function fulltaskContent(){
    const methods = {}

    const fulltaskBackground = document.querySelector('#fulltask-background')
    const fullstaskContent = document.querySelector('#fulltask-content')


    methods.show = function(e){
        if(e.target.tagName === 'INPUT') return
        let clickedTaskNameElement = e.target.closest('span')
        if(clickedTaskNameElement === null){
            clickedTaskNameElement = Array.from(e.target.children).find(child => child.tagName === "SPAN");
        }

        fulltaskBackground.style.display = ''

        let thisTaskDetails = findTask(currentProject, clickedTaskNameElement.textContent).taskArray()
        
        //Initialize fulltask 'form'
        fulltaskProject.textContent = currentProject
        fulltaskName.value = thisTaskDetails[0]
        fulltaskDescription.value = thisTaskDetails[1]
        fulltaskDuedate.value = thisTaskDetails[2]
        fulltaskPriority.value = thisTaskDetails[3]

        fulltaskName.dataset.initialname = fulltaskName.value
    }

    methods.hide = function(e){
        fulltaskBackground.style.display = 'none'
        fulltaskProject.textContent = ''
        fulltaskName.value = ''
        fulltaskDescription.value = ''
        fulltaskDuedate.value = ''
        fulltaskPriority.value = ''
    }



    return methods
}

export const taskForm = (function(){
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

    methods.create = function(e){
        e.preventDefault()
    }
    

    return methods
})()


/* Fulltask form */

const fulltaskProject = document.querySelector('#fulltask-project')
const fulltaskName = document.querySelector('#fulltask-name')
const fulltaskDescription = document.querySelector('#fulltask-description')
const fulltaskDuedate = document.querySelector('#fulltask-duedate')
const fulltaskPriority = document.querySelector('#fulltask-priority')
const closeFulltaskButton = document.querySelector('#fulltask-close')
closeFulltaskButton.addEventListener('click', fulltaskContent().hide)

/* Addtask form */

const addtaskButton = document.querySelector('#addtask-button')
addtaskButton.addEventListener('click', taskForm.show)
const closeFormButton = document.querySelector('#form-close')
closeFormButton.addEventListener('click', taskForm.hide)
const addtaskSubmit = document.querySelector('#addtask-submit')
addtaskSubmit.addEventListener('click', taskForm.create)


//AFTER
const fulltaskDelete = document.querySelector('#fulltask-delete')


const fulltaskSave = document.querySelector('#fulltask-save')
fulltaskSave.addEventListener('click', () => {thisTask.updateValues(fulltaskProject.textContent, fulltaskName.dataset.initialname, fulltaskName.value, fulltaskDescription.value, fulltaskDuedate.value, fulltaskPriority.value)})
