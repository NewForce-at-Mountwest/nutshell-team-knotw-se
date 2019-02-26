import authForm from "./forms"
const handleLogout = () => {
    sessionStorage.removeItem("userId")
    document.querySelector("#jh-home").innerHTML = ""
    document.querySelector("#jh-home").innerHTML = authForm.home()
}

export default handleLogout