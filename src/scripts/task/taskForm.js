const form = {
    newTaskForm: () => {
        return `
        <button id="new-task" class ="new-task">New Task</button>
        `
    },
    taskForm: () => {
        return `
        <div id="new-task-container">
        <form id="task">
            <input id="main-task" placeholder="Enter Task" type="text">
            <input id="complete-date" placeholder="Complete Date" type="date">
        </form>
        <button id="save-task" class="save-task">Save Task</button>
        </div>
        `
    },
    createTask: () => {
        return `
        <button id="create-new-task" class = "create-new-task">Create Task</button>
        `
    },
    loggout: () => {
        return `
        <button id = "logout" class="logout">Logout</button>
        `
    }
    //  <button id = "logout" class="logout">Logout</button> ^ push to createTask
    // editForm: () => {
    //     return `
    //     <form id="task">
    //         <input id="main-task" placeholder="Enter Task" type="text" value = ``>
    //         <input id="complete-date" placeholder="Complete Date" type="date">
    //     </form>
    //     <button id="save-task" class="save-task">Save Task</button>
    //     `

    // }
}

export default form