import authForm from "./auth/forms";
import clicks from "./auth/clicks"
import activateEditButton from "./task/edit"
import handleEditTask from "./task/handleEdit"



// task imports
// import form from "./task/taskForm"
import taskClicks from "./task/clicks"


document.querySelector("#jh-home").innerHTML = authForm.home();
clicks.reg()
clicks.register()
clicks.firstLog()
clicks.login()
clicks.logout()

// document.querySelector("#task").innerHTML = form.newTaskForm()
taskClicks.newTask()
taskClicks.saveTask()
taskClicks.deleteTask()
activateEditButton()
handleEditTask()
