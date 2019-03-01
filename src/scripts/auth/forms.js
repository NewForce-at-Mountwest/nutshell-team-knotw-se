// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import loadPageAfterLogin from "../NewsArticle/loadPageAfterLogin"

const authForm = {
    home: () => {
        return `
        <div id="home-container">
        <h1>Welcome to NutShell</h1>
        <div id ="home-button">
        <div id ="login-div"><button id="login-btnn">Login</button></div>
        <div id ="register"><button id="register-btn">Register</button></div>
        </div>
        </div>
        `

    },
    register: () => {
        return `
        <div id="register">
            <form id="register-form">
            <input id="name-register" placeholder="Name" type="text">
            <input id="email-register" placeholder="Email" type="email">
            <input id="username-register" placeholder="Username" type="text">
            <input id="password-register" placeholder="Password" type="password">
          </form>
          <button id="create-btn" class="create-btn">Create Account</button>
          </div>
          `

    },
    login: () => {
        return `
        <form id="login-form">
        <input id="login-name" placeholder="Name" type="text">
        <input id="login-pass" placeholder="Password" type="text">
        </form>
        <button id = "login" class="login">Login</button>
        `
    },

    main: () => {
        loadPageAfterLogin();
    }
}

export default authForm