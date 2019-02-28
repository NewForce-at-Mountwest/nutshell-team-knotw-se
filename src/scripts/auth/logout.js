import authForm from "./forms"
import clicks from "./clicks"
const handleLogout = () => {
    sessionStorage.removeItem("userId")
    document.querySelector("#jh-home").innerHTML = ""
    document.querySelector("#jh-home").innerHTML = authForm.home()
    clicks.reg();
   clicks.register();
   clicks.firstLog();
   clicks.login();
   clicks.logout();
   document.querySelector("#form-output").innerHTML = "";
}

export default handleLogout