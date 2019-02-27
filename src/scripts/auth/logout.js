import authForm from "./forms"
import clicks from "./clicks"
const handleLogout = () => {
    sessionStorage.removeItem("userId")
    document.querySelector("#jh-home").innerHTML = ""
    document.querySelector("#jh-home").innerHTML = authForm.home()
    document.querySelector("#eventFormContainer").innerHTML = ""
    document.querySelector("#eventContainer").innerHTML = ""
    document.querySelector("#login").innerHTML = ""
    clicks.reg();
    clicks.register();
    clicks.firstLog();
    clicks.login();
    clicks.logout()
}
export default handleLogout