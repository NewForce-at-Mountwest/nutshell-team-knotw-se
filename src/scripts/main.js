import authForm from "./auth/forms";
import clicks from "./auth/clicks"
import apiFetch from "./auth/apiManager"
// import handleLogin from "./auth/login"


document.querySelector("#jh-home").innerHTML = authForm.home();
clicks.reg()
clicks.register()
clicks.firstLog()
clicks.login()
apiFetch.addUser()
clicks.logout()
