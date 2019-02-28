import form from "./taskForm"
import print from "./printTask"
import handleLogout from "../auth/logout"
import taskObj from "./objectBuilder"
import apiFetch from "./apiManager"


const taskClicks = {
    createTask: () => {
        document.querySelector("body").addEventListener("click", () => {
            if(event.target.classList.contains("create-new-task")){
                document.querySelector("#task").innerHTML = form.taskForm()
            }
        })

    },
    newTask: () => {
        // document.querySelector("#new-task").addEventListener("click", () => {
        //     document.querySelector("#task").innerHTML = form.taskForm()
        //     print()
        // })
        document.querySelector("body").addEventListener("click", () => {
            if (event.target.classList.contains("new-task")) {
                document.querySelector("#task").innerHTML = form.taskForm()
            }
        })
    },
    saveTask: () => {
        document.querySelector("body").addEventListener("click", () => {
            if (event.target.classList.contains("save-task")) {
                const taskVal = document.querySelector("#main-task").value;
                const dateVal = document.querySelector("#complete-date").value;

                const userInput = taskObj(taskVal, dateVal)
                apiFetch.addtask(userInput)
                    .then(() => {
                        print()
                        document.querySelector("#main-task").value = ""
                        document.querySelector("#complete-date").value = ""
                    })
            } else if(event.target.classList.contains("checkbox")){
                const taskId = event.target.id.split("-")[1]; // 14
                console.log(taskId)
                if(document.querySelector(`#checkbox-${taskId}`).checked){
                  apiFetch.markAsComplete(taskId)
                  document.querySelector(`#possibly-${taskId}`).classList.add("checked-class")
                // document.querySelector("#task-print").innerHTML = ""
                } else {
                  apiFetch.markAsIncomplete(taskId)
                  document.querySelector(`#possibly-${taskId}`).classList.remove("checked-class")
                }
            }
        })
    },
    // saveTask: () => {
    //     document.querySelector("body").addEventListener("click", () => {
    //         if (event.target.classList.contains("save-task")) {
    //             const taskVal = document.querySelector("#main-task").value;
    //             const dateVal = document.querySelector("#complete-date").value;

    //             const userInput = taskObj(taskVal, dateVal)
    //             apiFetch.addtask(userInput)
    //                 .then(() => {
    //                     print()
    //                     document.querySelector("#main-task").value = ""
    //                     document.querySelector("#complete-date").value = ""
    //                 })

    //         }
    //     })
    // },
    logout: () => {
        document.querySelector("body").addEventListener("click", () => {
            if (event.target.classList.contains("logout"))
                handleLogout()
        })
    },
    deleteTask: () => {
        document.querySelector("body").addEventListener("click", () => {
            if (event.target.classList.contains("task-delete-btn")) {
                const deleteId = event.target.id.split("-")[2];
                apiFetch.deleteTask(deleteId)
                    .then(() => {
                        print()
                    })
            }
        })
    }
}

export default taskClicks