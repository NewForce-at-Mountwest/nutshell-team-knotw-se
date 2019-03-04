// const printTaskBuilder = (tasks) => {
//     return `
//     <div class="print-task" id="task-print">
//     <h1>${tasks.task}</h1>
//     <p>${tasks.date}</p>
//     <button class="task-delete-btn" id="task-delete-${tasks.id}">Delete</button>
//     <button class="edit" id="task-edit-${tasks.id}">Edit</button>
//     </div>
//     `
// }

// export default printTaskBuilder
const printTaskBuilder = (tasks) => {
    return `
    <div class="print-task" id="task-print">
    <label class ="checkbox">
    <div id= "possibly-${tasks.id}" class = "checkbox-h1">
    <input class="checkbox" id="checkbox-${tasks.id}" type="checkbox" ${task.completed === true? "checked" : ""}</><h1 class = "check-h1">${tasks.task}</h1>
    </div>
    </label>
    <p>${tasks.date}</p>
    <button class="edit" id="task-edit-${tasks.id}">Update</button>
    <button class="task-delete-btn" id="task-delete-${tasks.id}">Delete</button>
    </div>
    `
}

export default printTaskBuilder