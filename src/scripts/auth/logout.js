import authForm from "./forms"
const handleLogout = () => {
    sessionStorage.removeItem("userId")
    document.querySelector("#home").innerHTML = ""
    document.querySelector("#home").innerHTML = authForm.home()
}

export default handleLogout