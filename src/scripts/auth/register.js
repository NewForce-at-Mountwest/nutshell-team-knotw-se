import userObj from "./objectBuilder"
import apiFetch from "./apiManager"
import authForm from "./forms"
import printAllEvents from "../events/printAllEvents";
import form from "../task/taskForm"
import loadPageAfterLogin from "../NewsArticle/loadPageAfterLogin";

const register = {

    reg: () => {
        document.querySelector("#jh-home").innerHTML = ""
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
                // // document.querySelector("#login").innerHTML = authForm.main()
                // document.querySelector("#jh-home").innerHTML = ""
                // document.querySelector("#task").innerHTML = form.createTask();
                // document.querySelector("#login").innerHTML = authForm.main();
                // printAllEvents();
                document.querySelector("#register").innerHTML = ""
                document.querySelector("#jh-home").innerHTML = ""
                document.querySelector("#task").innerHTML = form.createTask();
                document.querySelector(".logout_1").innerHTML = form.loggout();
                printAllEvents()
                print()
                loadPageAfterLogin();
            })
    // const userInput = userObj(nameVal, emailVal, userVal, passVal)
    // apiFetch.addUser(userInput)
    // .then((parsedUser) => {
    //     sessionStorage.setItem("userId", parsedUser.id)
    //     document.querySelector("#register").innerHTML = ""
    //     // document.querySelector("#login").innerHTML = authForm.main()
    //     document.querySelector("#task").innerHTML = form.taskForm();
    //     document.querySelector("#login").innerHTML = authForm.main();
    //     printAllEvents();
    //     loadPageAfterLogin();
    // })
    }
}

export default register