import { tasksList, updateLocalStorage } from "./Storage"
import { loadProjectsInNav, switchCurrentProject } from "./UI"
import { loadAllTasksOnUI } from "./UI"

export const project = function(e){
    let methods = {}

    const createProjectButton = document.querySelector('#create-project-button')
    const createProjectClose = document.querySelector('#create-project-close')
    const createProjectInput = document.querySelector('#create-project-input')
    const createProjectSubmit = document.querySelector('#create-project-submit')
    
    methods.toggle = function(e){
        let projectElement = e.target.closest('.project-li')
        let projectName = Array.from(projectElement.children).find(child => child.classList.contains('project-name'))
        switchCurrentProject(projectName.textContent)
        loadAllTasksOnUI()
    }

    methods.openForm = function(e){

        createProjectButton.style.backgroundColor = '#ddd'
        createProjectButton.classList.add('li-with-gap')
        createProjectClose.style.display = ''
        createProjectInput.style.display = ''
        createProjectSubmit.style.display = ''
    }

    methods.closeForm = function(e){
        e.stopPropagation()
        createProjectButton.style.backgroundColor = ''
        createProjectButton.classList.remove('li-with-gap')
        createProjectClose.style.display = 'none'
        createProjectInput.value = ''
        createProjectInput.style.display = 'none'
        createProjectSubmit.style.display = 'none'
    }

    methods.submitForm = function(e){
        e.stopPropagation()
        if(createProjectInput.value === '') return window.alert('choose a project name')
        for(let i = 0; i < tasksList.length; i++){
            if(createProjectInput.value === tasksList[i][0]){
                createProjectInput.value = ''
                return window.alert('project name non-available')
            }
        }
        updateLocalStorage().createProject(createProjectInput.value)
        loadAllTasksOnUI()
        loadProjectsInNav()
        methods.closeForm(e)
        console.log(tasksList)
    }

    return methods
}