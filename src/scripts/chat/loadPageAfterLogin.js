import ChatList from "./ChatList"
import ChatForm from "./ChatForm"
import activateDeleteButtons from "./DeleteChat"
import activateEditButtons from "./EditChat";

// This module builds the chat list view once a user has logged in
const loadPageAfterLogin = () => {
//Builds Chat Form
document.querySelector("#form-output").innerHTML += ChatForm.renderChatForm();
// Adds event listener to send button
ChatForm.activateSendButton();
// Builds Chat List
ChatList();

// Activate Delete Buttons
activateDeleteButtons();
// Activate Edit Buttons
activateEditButtons();

}

export default loadPageAfterLogin;