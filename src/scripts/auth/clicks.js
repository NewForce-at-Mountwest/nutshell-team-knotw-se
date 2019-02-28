import register from "./register"
import handleLogin from "./login";
import handleLogout from "./logout"

const clicks = {
    reg: () => {
        document.querySelector("#register-btn").addEventListener("click", () => {
            register.reg()
        })
    },
    register: () => {
        document.querySelector("body").addEventListener("click", () => {
            if (event.target.classList.contains("create-btn")){
                register.handleRegister()
            }
        })
    },
    firstLog: () => {
        document.querySelector("#login-btnn").addEventListener("click", () => {
            handleLogin.firstLog()
        })
    },
    login: () => {
        document.querySelector("body").addEventListener("click", () => {
            if(event.target.classList.contains("login")){
            handleLogin.login()
            }
        })
    },
    logout: () => {
        document.querySelector("body").addEventListener("click", () => {
            if(event.target.classList.contains("logout")){
            handleLogout()
            }

        })
    }
}
export default clicks