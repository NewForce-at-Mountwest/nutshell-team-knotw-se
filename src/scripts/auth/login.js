import apiFetch from "./apiManager"
import authForm from "./forms";
const handleLogin = {
    login: () => {
        console.log("hello")

        const userVal = document.querySelector("#login-name").value;
        const passVal = document.querySelector("#login-pass").value;

        apiFetch.userLogin(userVal)
            .then((parsedUser) => {
                if (passVal === parsedUser[0].password) {
                    document.querySelector("#home").innerHTML = ""
                    document.querySelector("#home").innerHTML = authForm.main()
                    sessionStorage.setItem("userId", parsedUser[0].id)
                } else {
                    alert("WRONG!")
                }
            })
    },
    firstLog: () => {
        document.querySelector("#home").innerHTML = ""
        document.querySelector("#home").innerHTML = authForm.login()
    }
}

export default handleLogin