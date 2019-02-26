import userObj from "./objectBuilder"
import apiFetch from "./apiManager"
import authForm from "./forms"

const register = {

    reg: () => {
    document.querySelector("#home").innerHTML = ""
    document.querySelector("#register").innerHTML = authForm.register();
    },

    handleRegister: () => {
    const nameVal = document.querySelector("#name-register").value;
    const emailVal = document.querySelector("#email-register").value;
    const userVal = document.querySelector("#username-register").value;
    const passVal = document.querySelector("#password-register").value;

    const userInput = userObj(nameVal, emailVal, userVal, passVal)
    apiFetch.addUser(userInput)
    .then((parsedUser) => {
        sessionStorage.setItem("userId", parsedUser.id)
        // document.querySelector("#register").innerHTML = ""
        // document.querySelector("#login").innerHTML = authForm.login();
    })
    }
}

export default register