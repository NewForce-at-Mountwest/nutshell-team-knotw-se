const apiFetch = {
    singleTask: () => {
        return fetch("http://localhost:8089/tasks")
            .then(r => r.json())
    },
    addtask: (tasks) => {
        return fetch("http://localhost:8089/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tasks)
        }).then(r => r.json())
    },
    allTask: () => {
        const activeUserId = sessionStorage.getItem("userId");
        return fetch(`http://localhost:8089/tasks?userId=${activeUserId}`)
        .then(r=>r.json())
    },
    deleteTask: (taskId) => {
        return fetch(`http://localhost:8089/tasks/${taskId}`, {
           method: "DELETE"
        })
    },
    editTask: (taskId, userInput) => {
        return fetch(`http://localhost:8089/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInput)
        })
    },
    editSingle: (taskId) => {
        return fetch(`http://localhost:8089/tasks/${taskId}`)
        .then(r=>r.json())
    },
    markAsComplete: (taskId) => {
        return fetch(`http://localhost:8089/tasks/${taskId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({completed: "true"})
        });
      },
      markAsIncomplete: (taskId) => {
        return fetch(`http://localhost:8089/tasks/${taskId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({completed: "false"})
        });
      }
}

export default apiFetch