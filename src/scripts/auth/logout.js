import authForm from "./forms"
const handleLogout = () => {
    sessionStorage.removeItem("userId")
    document.querySelector("#jh-home").innerHTML = ""
    document.querySelector("#jh-home").innerHTML = authForm.home()
    document.querySelector("#eventFormContainer").innerHTML = ""
    document.querySelector("#eventContainer").innerHTML = ""
    document.querySelector("#login").innerHTML = ""
}
export default handleLogout