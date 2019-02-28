import buildChat from "./Chat.js"
import ChatCollection from "./ChatCollection.js"
import ChatForm from "./ChatForm.js"

// A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.


const ChatList = () => {
    document.querySelector("#chat-output").innerHTML = "";
    let userId = sessionStorage.getItem("userId");
    ChatCollection.getAllChats()
    .then(chat => {
        chat.forEach(singleChat => {
            document.querySelector("#chat-output").innerHTML += buildChat(singleChat);
        })

    })
}
export default ChatList;
