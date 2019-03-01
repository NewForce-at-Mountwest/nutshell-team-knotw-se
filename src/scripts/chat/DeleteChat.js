import ChatCollection from "./ChatCollection"
import ChatList from "./ChatList"

const activateDeleteButtons = () => {
    document.querySelector("#chat-output").addEventListener("click", () => {
        if(event.target.classList.contains("delete-chat")){
            const idToDelete = event.target.id.split("-")[2];
            ChatCollection.deleteChat(idToDelete)
            .then(ChatList)
        }
    })
}

export default activateDeleteButtons;