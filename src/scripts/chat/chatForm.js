// A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
import ChatCollection from "./ChatCollection";
import buildChatObject from "./ChatObj";
import ChatList from "./ChatList";
// import ChatList from "./ChatList";

const ChatForm = {
  renderChatForm: () => {
    return `<div class="form" id="form-output">
      <h3>Send New Message</h3>
      <form action="">
        <input type="text"  id="new-message-input" placeholder="New Message">
      </form>
       <button id="send-chat">Send Message</button>
    </div>`;
  },
  activateSendButton: () => {
    document.querySelector("#form-output").addEventListener("click", () => {
      if (event.target.id === "send-chat") {
        const messageVal = document.querySelector("#new-message-input").value;
        const objectToPost = buildChatObject(messageVal);
        ChatCollection.sendNewMessage(objectToPost);
        ChatList();
      }

    }
    )
  }
}

export default ChatForm;