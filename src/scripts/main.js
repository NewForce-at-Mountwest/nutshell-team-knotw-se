
import ChatForm from "./Chat/ChatForm.js";
import loadPageAfterLogin from "./Chat/loadPageAfterLogin.js";
import authForm from "./auth/forms";
import clicks from "./auth/clicks"
import activateEditButton from "./task/edit"
import handleEditTask from "./task/handleEdit"
import apiFetch from "./auth/apiManager"
import handleLogin from "./auth/login"
import eventApiManager from "./events/apiManager"
import clickWizard from "./events/click"
// import handleLogin from "./auth/login"
// task imports
// import form from "./task/taskForm"
import taskClicks from "./task/clicks"
import activateDeleteButtons from "./chat/DeleteChat"
import activateEditButtons from "./chat/EditChat"
import handleEditedChat from "./chat/SaveEdit"


// apiFetch();
document.querySelector("#jh-home").innerHTML = authForm.home();
clicks.reg()
clicks.register()
clicks.firstLog()
clicks.login()
clicks.logout()
ChatForm.activateSendButton();
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
activateDeleteButtons();
// Activate Edit Buttons
activateEditButtons();
handleEditedChat();
