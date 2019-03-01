const apiFetch = {
    addUser: (parsedUser) => {
        return fetch("http://localhost:8087/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parsedUser)
        }).then(r => r.json())
    },
    allUsers: () => {
        return fetch("http://localhost:8087/users")
        .then(r => r.json())
    },
    userLogin: (user) => {
        return fetch(`http://localhost:8087/users?user=${user}`)
        .then(r => r.json())

     }
}
 export default apiFetch;