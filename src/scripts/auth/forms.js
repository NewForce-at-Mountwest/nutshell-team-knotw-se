// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import loadPageAfterLogin from "../NewsArticle/loadPageAfterLogin"

const authForm = {
    home: () => {
        return `
        <div id="home-container">
        <h1>Welcome to NutShell <img class= "icon" src="https://static.thenounproject.com/png/195426-200.png" alt="" ></h1>
        <div id ="home-button">
        <div id ="login-div"><button id="login-btnn">Login</button></div>
        <div id ="register"><button id="register-btn">Register</button></div>
        </div>
        </div>
        `

    },
    register: () => {
        return `
        <div id="register-attempt">
            <form id="register-form">
            <div id="input-fields">
            <input id="name-register" placeholder="Name" type="text">
            <input id="email-register" placeholder="Email" type="email">
            <input id="username-register" placeholder="Username" type="text">
            <input id="password-register" placeholder="Password" type="password">
            </div>
          </form>
          <button id="create-btn" class="create-btn">Create Account</button>
          </div>
          `

    },
    login: () => {
        return `
        <div id="login-attempt">
        <form id="login-form">
        <input id="login-name" placeholder="Name" type="text">
        <input id="login-pass" placeholder="Password" type="text">
        </form>
        <button id = "jh-attempt" class="login">Login</button>
        </div>
        `
    },

    main: () => {
        loadPageAfterLogin();
        // return `
        // <button id = "logoutButton" class="logout">Logout</button>
        // `
    }
}

export default authForm