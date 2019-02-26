import ChattCollection from "../ContactCollection"
import ChatList from "./ChatList"

const activateDeleteButtons = () => {
    document.querySelector("#chat-output").addEventListener("click", () => {
        if(event.target.classList.contains("delete")){
            const idToDelete = event.target.id.split("-")[1];
            ChatCollection.deleteContact(idToDelete)
            .then(ChatList)
        }
    })
}

export default activateDeleteButtons;