import taskObj from "./objectBuilder";
import apiFetch from "./apiManager";
import form from "./taskForm";
import print from "./printTask"
// after editing task

const handleEditedTask = () => {
    document.querySelector("body").addEventListener("click", () => {
        if (event.target.classList.contains("newClass")) {
            const taskName = document.querySelector("#main-task").value
            const taskDate = document.querySelector("#complete-date").value
            const taskId = event.target.id.split("-")[2];

            const object = taskObj(taskName, taskDate)
            apiFetch.editTask(taskId, object).then(() => {
                print()
                document.querySelector("#new-task-container").innerHTML = ""
                        document.querySelector("#task").innerHTML = form.createTask();
                // document.querySelector("#new-task-container").innerHTML = form.taskForm()
            })
        }
    })
}
export default handleEditedTask