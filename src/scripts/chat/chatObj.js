const buildChatObject = (messageParam) => {
    return {
      message: messageParam,
      userId: sessionStorage.getItem("userId")
    };
  };
export default buildChatObject;