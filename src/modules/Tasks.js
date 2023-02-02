import { tasksList, updateLocalStorage } from "./Storage"

export function findProjectDetails(projectName){
    return tasksList.find(e => e = projectName)
}


export function findTaskDetails(projectName, taskName){
    const projectDetails = findProjectDetails(projectName)
    for(let i = 1; i < projectDetails.length; i++){
        if(projectDetails[i][0] == taskName) return projectDetails[i]
    }
}

export function thisTask(){
    let methods = {}

    methods.updateStatus = function(e){
        let name = methods.getName(e)
        updateLocalStorage.status(name, e.target.checked)

    }

    methods.getName = function(e){
        let taskElement = e.target.closest('.task')
        let nameElement = Array.from(taskElement.children).find(child => child.tagName === "SPAN")
        let name = nameElement.textContent
        return name
    }

    return methods
}