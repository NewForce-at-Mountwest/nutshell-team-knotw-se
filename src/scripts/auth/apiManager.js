const apiFetch = {
    addUser: (parsedUser) => {
        return fetch("http://localhost:8089/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parsedUser)
        }).then(r => r.json())
    },
    allUsers: () => {
        return fetch("http://localhost:8089/users")
        .then(r => r.json())
    },
    userLogin: (user) => {
        return fetch(`http://localhost:8089/users?user=${user}`)
        .then(r => r.json())

    }
}


export default apiFetch