import authForm from "./auth/forms";
import clicks from "./auth/clicks"
import apiFetch from "./auth/apiManager"
import eventApiManager from "./events/apiManager"
import clickWizard from "./events/click"
// import handleLogin from "./auth/login"


document.querySelector("#jh-home").innerHTML = authForm.home();
clicks.reg()
clicks.register()
clicks.firstLog()
clicks.login()
clicks.logout()
clickWizard.addEventFunction()
clickWizard.saveEventFunction()
clickWizard.editButtonFunction()
clickWizard.saveEditButtonFunction()
clickWizard.deleteButtonFunction()

