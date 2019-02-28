import apiFetch from "./apiManager"
import printTaskBuilder from "./printTaskBuilder"
import form from "./taskForm"

const print = () => {
    document.querySelector("#print-task").innerHTML = ""
    apiFetch.allTask()
    .then(tasks => {
        tasks.forEach(singleTask => {
            document.querySelector("#print-task").innerHTML += printTaskBuilder(singleTask)
        })
    })
}

export default print