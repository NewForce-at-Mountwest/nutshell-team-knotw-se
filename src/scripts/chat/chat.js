const Chat = (singleChatObj) => {
    return `<div class="form" id="chat-form">
    <h3>Make Changes?</h3>
    <h3>${singleChatObj.userId}:</h3>
    <p><input type="text" id="new-message">${singleChatObj.message}</p>
    <button class="delete" id="delete-${singleChatObj.id}">Delete</button>
    <button class="edit" id="edit-${singleChatObj.id}">Edit</button>
 </div>`
 }
 
 export default Chat;
