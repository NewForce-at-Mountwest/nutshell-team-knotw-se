const buildChatObject = (idParam, messageParam) => {
    return {
      id: idParam,
      message: messageParam,
      userId: sessionStorage.getItem("userId")
    };
  };
  
  export default buildChatObject;