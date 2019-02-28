
import ChatForm from "./Chat/ChatForm.js";
import loadPageAfterLogin from "./Chat/loadPageAfterLogin.js";
import authForm from "./auth/forms";
import clicks from "./auth/clicks"
import apiFetch from "./auth/apiManager"
import handleLogin from "./auth/login"


// apiFetch();
document.querySelector("#jh-home").innerHTML = authForm.home();
clicks.reg()
clicks.register()
clicks.firstLog()
clicks.login()
clicks.logout()
ChatForm.activateSendButton();