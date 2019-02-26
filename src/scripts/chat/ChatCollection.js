const ChatCollection = {
    sendNewChat: chatObj => {
      debugger;
      return fetch("http://localhost:8088/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(chatObj)
      });
    },
    getAllChats: () => {
      const activeUserId = sessionStorage.getItem("userId");
      return fetch(`http://localhost:8088/messages?userId=${activeUserId}`).then(r => r.json());
    },
    deleteChat: (chatId) => {
      return fetch(`http://localhost:8088/messages/${chatId}`, {
        method: "DELETE"
      })
    },
    getSingleChat: (chatId) => {
      return fetch(`http://localhost:8088/messages/${chatId}`)
      .then(r=> r.json())
    },
    editChat: (chatId, chatObj) => {
      return fetch(`http://localhost:8088/messages/${chatId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(chatObj)
      });
    }
  };
  
  export default ContactCollection;