import ChatCollection from "./ChatCollection";
import handleEditedChat from "./SaveEdit";


const activateEditButton = () => {
    document.querySelector("#chat-output").addEventListener("click", () => {
        if(event.target.classList.contains("edit")){
            ChatCollection.getSingleChat(event.target.id.split("-")[1])
            .then((singleChat) => {
                document.querySelector("#new-message").value = singleChat.message;
                document.querySelector("#send-chat").textContent = "Edit Chat";
                document.querySelector("#send-chat").id= `edit-chat-${singleChat.id}`;
                handleEditedChat();

            })
        }
    })
}

export default activateEditButton;