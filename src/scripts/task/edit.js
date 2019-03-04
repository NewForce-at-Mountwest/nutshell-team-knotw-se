import apiFetch from "./apiManager"
import handleEditTask from "./handleEdit"
import form from "./taskForm"
// first edit click

const activateEditButton = () => {
    // debugger;
    document.querySelector("body").addEventListener("click", () => {
        // debugger;
        if (event.target.classList.contains("edit")) {
            console.log(event.target.id.split("-"))
            apiFetch.editSingle(event.target.id.split("-")[2])
                .then((singleTask) => {
                    document.querySelector("#task").innerHTML = ""
                    document.querySelector("#task").innerHTML = form.taskForm()
                    document.querySelector("#main-task").value = singleTask.task;
                    document.querySelector("#complete-date").value = singleTask.date;

                    document.querySelector("#save-task").textContent = "Edit Task";
                    document.querySelector("#save-task").classList.add("newClass")
                    document.querySelector("#save-task").classList.remove("save-task")
                    document.querySelector("#save-task").id = `update-task-${singleTask.id}`
                })
        }
    })
}

export default activateEditButton;