import buildChatObject from "./ChatObj";
import ChatCollection from "./ChatCollection";
import ChatList from "./ChatList";
import ChatForm from "./ChatForm";

const handleEditedChat = () => {
  document.querySelector("#form-output").addEventListener("click", () => {
    if (event.target.id.includes("edit")) {
      console.log(event.target.id);
      // Get the user's input
      const messageVal = document.querySelector("#new-message-input").value;
      console.log(messageVal);
      const chatId = event.target.id.split("-")[2];
      // Turn the user's input into an object
      const objectToPost = buildChatObject(messageVal);
      console.log(objectToPost);

      ChatCollection.editChat(chatId, objectToPost).then(() => {
        // console.log(chatId, objectToPost);
        // console.log();
        document.querySelector("#form-output").innerHTML = ChatForm.renderChatForm();
        ChatList();
      });
    }
  });
};

export default handleEditedChat;