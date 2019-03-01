const ChatCollection = {
  sendNewMessage: (objectToPost) => {
    return fetch("http://localhost:8087/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objectToPost)
    });
  },
  getAllChats: () => {
    return fetch("http://localhost:8087/messages?_expand=user")
    .then(messages => messages.json());
   },
  deleteChat: (chatId) => {
    return fetch(`http://localhost:8087/messages/${chatId}`, {
      method: "DELETE"
    })
  },
  getSingleChat: (chatId) => fetch(`http://localhost:8087/messages/${chatId}`)
    .then(r => r.json()),

  editChat: (chatId, chatObj) => {
    return fetch(`http://localhost:8087/messages/${chatId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chatObj)
    });
  }
};
export default ChatCollection;