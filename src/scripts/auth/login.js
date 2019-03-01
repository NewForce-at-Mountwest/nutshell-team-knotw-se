import apiFetch from "./apiManager"
import authForm from "./forms";
import form from "../task/taskForm"
import print from "../task/printTask"
import printAllEvents from "../events/printAllEvents"
import clickWizard from "../events/click"


const handleLogin = {
    firstLog: () => {
        document.querySelector("#jh-home").innerHTML = ""
        document.querySelector("#jh-home").innerHTML = authForm.login()
    },
    login: () => {
        const userVal = document.querySelector("#login-name").value;
        const passVal = document.querySelector("#login-pass").value;
        apiFetch.userLogin(userVal)
            .then((parsedUser) => {
                if(passVal === parsedUser[0].password) {
                    document.querySelector("#jh-home").innerHTML = ""
                    // document.querySelector("#jh-home").innerHTML = authForm.main()
                    // document.querySelector("#task").innerHTML = form.taskForm();
                    document.querySelector("#task").innerHTML = form.createTask();
                    sessionStorage.setItem("userId", parsedUser[0].id)
                    printAllEvents()
                    print()
                } else {
                    alert("Wrong password, try again!");
                }
            })
    }
}
export default handleLogin