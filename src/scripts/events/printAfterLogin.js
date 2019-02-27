import printAllEvents from "./printAllEvents"
import eventForm from "./eventForm"
import editForm from "./editForm"
import clicks from "../auth/clicks"
import handleLogout from "../auth/logout"
import clickWizard from "./click"


// This module builds the contact list view once a user has logged in
const loadEventsAfterLogin = () => {
// Builds logout button
document.querySelector("#jh-home").innerHTML = handleLogout();
// Add click event to logout button
clicks.logout();
//Builds Contact Form
document.querySelector("#eventFormContainer").innerHTML += eventForm.eventButton();
// Adds event listener to save button
clickWizard.addEventFunction();
clickWizard.saveEventFunction();
// Builds Contact List
printAllEvents();

// Activate Delete Buttons
clickWizard.deleteButtonFunction();
// Activate Edit Buttons
clickWizard.saveEditButtonFunction();
clickWizard.editButtonFunction();
}

export default loadEventsAfterLogin;