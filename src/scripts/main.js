import authForm from "./auth/forms";
import clicks from "./auth/clicks"
import apiFetch from "./auth/apiManager"
import eventApiManager from "./events/apiManager"
import printAllEvents from "./events/printAllEvents"
// import handleLogin from "./auth/login"


document.querySelector("#jh-home").innerHTML = authForm.home();
clicks.reg()
clicks.register()
clicks.firstLog()
clicks.login()
apiFetch.addUser()
clicks.logout()

eventApiManager.getAllEvents()
printAllEvents()
