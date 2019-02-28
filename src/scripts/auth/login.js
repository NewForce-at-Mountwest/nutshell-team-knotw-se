import apiFetch from "./apiManager"
import authForm from "./forms";
import loadPageAfterLogin from "../Chat/loadPageAfterLogin";
const handleLogin = {
    login: () => {
        console.log("hello")

        const userVal = document.querySelector("#login-name").value;
        const passVal = document.querySelector("#login-pass").value;

        apiFetch.userLogin(userVal)
            .then((parsedUser) => {
                if (passVal === parsedUser[0].password) {
                    document.querySelector("#jh-home").innerHTML = ""
                    document.querySelector("#jh-home").innerHTML = authForm.main()
                    sessionStorage.setItem("userId", parsedUser[0].id)
                    loadPageAfterLogin();
                } else {
                    alert("WRONG!")
                }
            })
    },
    firstLog: () => {
        document.querySelector("#jh-home").innerHTML = ""
        document.querySelector("#jh-home").innerHTML = authForm.login()
    }
}

export default handleLogin