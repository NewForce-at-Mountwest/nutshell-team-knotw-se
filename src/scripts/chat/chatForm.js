// A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
import ChatCollection from "../ChatCollection";
import buildChatObject from "./ChatObj";
import ChatList from "./ChatList";

const ChatForm = {
  buildForm: () => {
    return `
    <div class="form" id="chat-form">
      <h3>Send New Message</h3>
      <form action="">
        <input type="text"  id="new-message" placeholder="New Message">
      </form>
       <button id="send-chat">Send Message</button>
    </div>`;
  },
  activateSendButton: () => {
      document.querySelector("#chat-output").addEventListener("click", () => {
        if(event.target.id === "new-message"){

            // Get the user's input
            const messageVal = document.querySelector("#new-message").value;

            // Turn the user's input into an object
            const objectToPost = buildChatObject(messageVal);

            // Save the object to our database
            ChatCollection.sendNewMessage(objectToPost)
            .then(() => {
                // Once the POST is complete, print all the chats again
                ChatList();

                // Clear the form values
                document.querySelector("#new-message").value = "";
            })

        }

      })
  }
};

export default ChatForm;