import ChatCollection from "./ChatCollection";
import handleEditedChat from "./SaveEdit";


const editChatButton = () => {

    document.querySelector("#chat-output").addEventListener("click", () => {
        if(event.target.classList.contains("edit-chat")){
            console.log(event.target.id);
            ChatCollection.getSingleChat(event.target.id.split("-")[2])
            .then((singleChat) => {
                document.querySelector("#new-message-input").value = `${singleChat.message}`;
                document.querySelector("#send-chat").textContent = "Edit Chat";
                document.querySelector("#send-chat").id= `edit-chat-${singleChat.id}`;
                handleEditedChat();

            })
        }
    })
}

export default editChatButton;