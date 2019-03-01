import authForm from "./auth/forms";
import clicks from "./auth/clicks"
import activateEditButton from "./task/edit"
import handleEditTask from "./task/handleEdit"
// import apiFetch from "./auth/apiManager"
// import eventApiManager from "./events/apiManager"
import clickWizard from "./events/click"
// import handleLogin from "./auth/login"
// task imports
// import form from "./task/taskForm"
import taskClicks from "./task/clicks"
import chronology from "./NewsArticle/ArticleArrayDateSort"


document.querySelector("#jh-home").innerHTML = authForm.home();
clicks.reg()
clicks.register()
clicks.firstLog()
clicks.login()
clicks.logout()
// document.querySelector("#task").innerHTML = form.newTaskForm()
taskClicks.createTask();
taskClicks.newTask()
taskClicks.saveTask()
taskClicks.deleteTask()
activateEditButton()
handleEditTask()
clickWizard.addEventFunction()
clickWizard.saveEventFunction()
clickWizard.editButtonFunction()
clickWizard.saveEditButtonFunction()
clickWizard.deleteButtonFunction()

chronology();