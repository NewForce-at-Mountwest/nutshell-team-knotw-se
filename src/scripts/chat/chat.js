const buildChat = (singleChatObj) => {
    // console.log(singleChatObj.message);
    // console.log(singleChatObj.id)
    return `<div class="form" id="chat-form">
    <h3 class="chat-user">${singleChatObj.user.user}:</h3>
    <p id="new-message-input">${singleChatObj.message}</p>
    <button class="edit-chat" id="edit-chat-${singleChatObj.id}">Edit</button>
    <button class="delete-chat" id="delete-chat-${singleChatObj.id}">Delete</button>
 </div>`
 }
 export default buildChat;