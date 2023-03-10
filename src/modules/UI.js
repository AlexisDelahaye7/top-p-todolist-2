import {getLocalStorage, setLocalStorage, tasksList, updateLocalStorage} from "./Storage"
import { findTask, thisTask } from "./Tasks"
import { project } from "./Projects"

export let currentProject = 'Inbox'

const tasksListDOM = document.querySelector('#tasks-list')

export const switchCurrentProject = function(selectedProject){
    currentProject = selectedProject
}

export const loadProjectsInNav = function(){

    const projectsListDOM = document.querySelector('#projects-list')
    projectsListDOM.innerHTML = ''
    
    for(let i = 0; i < tasksList.length; i++){
        const li = document.createElement('li')
        li.addEventListener('click', project().toggle)
        li.classList.add('project-li')

        const spanIcon = document.createElement('span')
        spanIcon.classList.add('material-symbols-outlined')
        spanIcon.textContent = 'inbox'
        const spanTaskname = document.createElement('span')
        spanTaskname.classList.add('project-name')
        spanTaskname.textContent = tasksList[i][0]

        projectsListDOM.appendChild(li)
        li.appendChild(spanIcon)
        li.appendChild(spanTaskname)

        
        
    }
}

export const loadAllTasksOnUI = function(){
    const currentProjectDOM = document.querySelector('#current-project-name')
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
    console.log(taskArray[4])
    statusInput.checked = taskArray[4]
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
    const addtaskName = document.querySelector('#task-name')
    const addtaskDescription = document.querySelector('#task-description')
    const addtaskDuedate = document.querySelector('#task-duedate')
    const addtaskPriority = document.querySelector('#task-priority')


    methods.show = function(){
        taskFormElement.style.display = ''
        addtaskButton.style.display = 'none'
    }
    
    methods.hide = function(){
        addtaskName.value = ''
        addtaskDescription.value = ''
        addtaskDuedate.value = ''
        addtaskPriority.value = 'priority'
        
        addtaskButton.style.display = ''
        taskFormElement.style.display = 'none'
    }

    methods.create = function(e){
        e.preventDefault()
        if(addtaskPriority.value === 'priority') addtaskPriority.value = 'Normal'
        let createdTask = [addtaskName.value, addtaskDescription.value, addtaskDuedate.value, addtaskPriority.value, false]
        let currentProjectIndex = findTask(currentProject).projectIndex()
        tasksList[currentProjectIndex].push(createdTask)
        setLocalStorage()
        loadAllTasksOnUI()
        methods.hide()
    }
    

    return methods
})()

/* Create project Button */
const createProjectButton = document.querySelector('#create-project-button')
createProjectButton.addEventListener('click', project().openForm)
const createProjectClose = document.querySelector('#create-project-close')
createProjectClose.addEventListener('click', project().closeForm)
const createProjectSubmit = document.querySelector('#create-project-submit')
createProjectSubmit.addEventListener('click', project().submitForm)

/* Addtask form */

const addtaskButton = document.querySelector('#addtask-button')
addtaskButton.addEventListener('click', taskForm.show)
const closeFormButton = document.querySelector('#form-close')
closeFormButton.addEventListener('click', taskForm.hide)
const addtaskSubmit = document.querySelector('#addtask-submit')
addtaskSubmit.addEventListener('click', taskForm.create)


/* Fulltask form */

const fulltaskProject = document.querySelector('#fulltask-project')
const fulltaskName = document.querySelector('#fulltask-name')
const fulltaskDescription = document.querySelector('#fulltask-description')
const fulltaskDuedate = document.querySelector('#fulltask-duedate')
const fulltaskPriority = document.querySelector('#fulltask-priority')
const closeFulltaskButton = document.querySelector('#fulltask-close')
closeFulltaskButton.addEventListener('click', fulltaskContent().hide)
const fulltaskDelete = document.querySelector('#fulltask-delete')
fulltaskDelete.addEventListener('click', () => {updateLocalStorage().deleteTask(currentProject, fulltaskName.dataset.initialname)})
const fulltaskSave = document.querySelector('#fulltask-save')
fulltaskSave.addEventListener('click', () => {updateLocalStorage().uniqueTask(fulltaskProject.textContent, fulltaskName.dataset.initialname, fulltaskName.value, fulltaskDescription.value, fulltaskDuedate.value, fulltaskPriority.value)})
