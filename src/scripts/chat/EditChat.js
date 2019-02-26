import ChatCollection from "../ChatCollection";
import handleEditedChat from "./SaveEdit";


const activateEditButton = () => {
    document.querySelector("#chat-output").addEventListener("click", () => {
        if(event.target.classList.contains("edit")){
            ChatCollection.getSingleChat(event.target.id.split("-")[1])
            .then((singleChat) => {
                document.querySelector("#chat-message").value = singleChat.message;
                document.querySelector("#send-message").textContent = "Edit Contact";
                document.querySelector("#send-message").id= `edit-contact-${singleChat.id}`;

                handleEditedChat();

            })
        }
    })
}

export default activateEditButton;