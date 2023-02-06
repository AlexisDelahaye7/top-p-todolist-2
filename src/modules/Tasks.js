import { tasksList, updateLocalStorage } from "./Storage"
import { fulltaskContent } from "./UI";


/* Fonction globale de recherche dans tasksList */
/*      Cette méthode n'a pas été choisie car elle est moins performante
        pour la dans de grandes arrays
        Cependant, le code reste là dans le cas ou nous souhaiterions changer la structure de l'array à l'avenir
        Il m'est également utile pour comprendre le fonctionnement de findTask() 

function findTask(project, task) {
  let projectIndex;
  let taskIndex;

  for (let i = 0; i < tasksList.length; i++) {
    if (tasksList[i][0] === project) {
      projectIndex = i;
      break;
    }
  }

  for (let i = 1; i < tasksList[projectIndex].length; i++) {
    if (tasksList[projectIndex][i][0] === task) {
      taskIndex = i;
      break;
    }
  }

  return {
    projectIndex: function() {
      return projectIndex;
    },
    projectArray: function() {
      return tasksList[projectIndex];
    },
    taskIndex: function() {
      return taskIndex;
    },
    taskArray: function() {
      return tasksList[projectIndex][taskIndex];
    },
  };
}
*/

/* Fonction globale de recheche dans tasksList */

export function findTask(project, task) {
    const projectArray = tasksList.find(([p]) => p === project);
    const projectIndex = tasksList.indexOf(projectArray);
    const taskArray = projectArray.find(([t]) => t === task);
    const taskIndex = projectArray.indexOf(taskArray);

    return {
        projectIndex: function() {
            return projectIndex;
        },
        projectArray: function() {
            return projectArray;
        },
        taskIndex: function() {
            return taskIndex;
        },
        taskArray: function() {
            return taskArray;
        },
    };
}

const thisTask = (function(){
    let methods = {}

    methods.updateStatus = function(e){
        let name = methods.getName(e)
        updateLocalStorage().status(name, e.target.checked)

    }

    methods.getName = function(e){
        let taskElement = e.target.closest('.task')
        let nameElement = Array.from(taskElement.children).find(child => child.tagName === "SPAN")
        return nameElement.textContent
    }

    return methods
})()

export {thisTask}