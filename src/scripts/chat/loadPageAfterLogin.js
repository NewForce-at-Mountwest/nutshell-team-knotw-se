import ChatList from "./ChatList"
import ChatForm from "./ChatForm"

// This module builds the chat list view once a user has logged in
const loadPageAfterLogin = () => {
//Builds Chat Form
document.querySelector("#form-output").innerHTML += ChatForm.renderChatForm();
// // Builds Chat List
ChatList();
}

export default loadPageAfterLogin;