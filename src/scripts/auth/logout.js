import authForm from "./forms"
// import authForm from "./auth/forms";
import clicks from "./clicks"
const handleLogout = () => {
    sessionStorage.removeItem("userId")
    console.log("Hello")
    document.querySelector("#new-task-container").innerHTML = ""
    document.querySelector("#print-task").innerHTML = ""
    document.querySelector("#jh-home").innerHTML = authForm.home()
// Attempting to make it where after you logout you can log back in / thought importing all the clicks would work but it doesn't look like it .:)
    clicks.reg()
    clicks.register()
    clicks.firstLog()
    clicks.logout()



}

export default handleLogout