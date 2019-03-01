// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import ArticleList from "./ArticleList.js"
import ArticleForm from "./ArticleForm.js"
import activateDeleteButtons from "./ArticleDeletion.js"
import activateEditButtons from "./ArticleEditForm.js";

// This Module Builds the [News] Article List-View Once a user has Logged In
const loadPageAfterLogin = () => {
// Builds Logout Button
// document.querySelector("#form-output").innerHTML = logOutHandler.renderLogOutButton();
// Add 'Click' Event to Logout Button
// logOutHandler.activateLogOutButton();
//Builds Article Form
document.querySelector("#form-output").innerHTML += ArticleForm.buildForm();
// Adds Event Listener to Save Button
ArticleForm.activateSaveButton();
// Builds [News] Article List
ArticleList();
// Activate Delete Button(s)
activateDeleteButtons();
// Activate Edit Button(s)
activateEditButtons();
}

export default loadPageAfterLogin;