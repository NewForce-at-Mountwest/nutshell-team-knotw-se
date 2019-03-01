const buildChat = (singleChatObj) => {
    console.log(singleChatObj);
    return `<div class="form" id="chat-form">
    <h3 class="chat-user">${singleChatObj.user.user}:</h3>
    <p id="new-message">${singleChatObj.message}</p>
    <button class="edit-chat" id="edit-${singleChatObj.id}">Edit</button>
    <button class="delete-chat" id="delete-${singleChatObj.id}">Delete</button>
 </div>`
 }
 export default buildChat;