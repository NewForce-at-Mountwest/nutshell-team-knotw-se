import BuildChat from "./Chat.js"
import ChatCollection from "../ChatCollection.js"

// A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.


const ChattList = () => {
    document.querySelector("#chat-output").innerHTML = "";
    ChatCollection.getAllChats()
    .then(chats => {
        chats.forEach(singleChat => {
            document.querySelector("#chat-output").innerHTML += BuildChat(singleChat);
        })

    })
}

export default ChatList;