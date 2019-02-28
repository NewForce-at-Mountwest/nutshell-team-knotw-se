import taskObj from "./objectBuilder";
import apiFetch from "./apiManager";
import form from "./taskForm";
import print from "./printTask"
// after editing task

const handleEditedTask = () => {
    document.querySelector("body").addEventListener("click", () => {
        if (event.target.classList.contains("newClass")) {
            debugger;
            const taskName = document.querySelector("#main-task").value
            const taskDate = document.querySelector("#complete-date").value
            const taskId = event.target.id.split("-")[2];

            const object = taskObj(taskName, taskDate)
            apiFetch.editTask(taskId, object).then(() => {
                debugger;
                print()
                document.querySelector("#new-task-container").innerHTML = form.taskForm()
            })
        }
    })
}
export default handleEditedTask