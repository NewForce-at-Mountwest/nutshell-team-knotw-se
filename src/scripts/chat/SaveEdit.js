import buildChatObject from "./ChatObj";
import ChatCollection from "./ChatCollection";
import ChatList from "./ChatList";
import ChatForm from "./ChatForm";

const handleEditedChat = () => {
  document.querySelector("#form-output").addEventListener("click", () => {
    if (event.target.id.includes("edit-chat")) {
      // Get the user's input
      const messageVal = document.querySelector("#new-message").value;
      const chatId = event.target.id.split("-")[2];

      // Turn the user's input into an object
      const objectToPost = buildChatObject(messageVal);

      ChatCollection.editChat(chatId, objectToPost).then(() => {
        ChatList();
        document.querySelector("#form-output").innerHTML = ChatForm.buildForm();
      });
    }
  });
};

export default handleEditedChat;