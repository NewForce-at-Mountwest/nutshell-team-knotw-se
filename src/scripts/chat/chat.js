const buildChat = (singleChatObj) => {
    console.log(singleChatObj);
    return `<div class="form" id="chat-form">
    <h3 class="chat-user">${singleChatObj.user.user}:</h3>
    <p id="new-message">${singleChatObj.message}</p>
    <button class="delete" id="delete-${singleChatObj.id}">Delete</button>
    <button class="edit" id="edit-${singleChatObj.id}">Edit</button>
 </div>`
 }
 export default buildChat;