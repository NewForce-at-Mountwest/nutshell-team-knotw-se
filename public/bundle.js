(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildChat = singleChatObj => {
  console.log(singleChatObj);
  return `<div class="form" id="chat-form">
    <h3 class="chat-user">${singleChatObj.user.user}:</h3>
    <p id="new-message">${singleChatObj.message}</p>
    <button class="delete" id="delete-${singleChatObj.id}">Delete</button>
    <button class="edit" id="edit-${singleChatObj.id}">Edit</button>
 </div>`;
};

var _default = buildChat;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const ChatCollection = {
  sendNewMessage: objectToPost => {
    return fetch("http://localhost:8089/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objectToPost)
    });
  },
  getAllChats: () => {
    return fetch("http://localhost:8089/messages?_expand=user").then(messages => messages.json());
  },
  deleteChat: chatId => {
    return fetch(`http://localhost:8089/messages/${chatId}`, {
      method: "DELETE"
    });
  },
  getSingleChat: chatId => fetch(`http://localhost:8089/messages/${chatId}`).then(r => r.json()),
  editChat: (chatId, chatObj) => {
    return fetch(`http://localhost:8089/messages/${chatId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(chatObj)
    });
  }
};
var _default = ChatCollection;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ChatCollection = _interopRequireDefault(require("./ChatCollection"));

var _ChatObj = _interopRequireDefault(require("./ChatObj"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactForm component that, when filled out and a submit button is pressed, adds a new contact to storage. It should import the ContactCollection component.
// import ChatList from "./ChatList";
const ChatForm = {
  renderChatForm: () => {
    return `<div class="form" id="form-output">
      <h3>Send New Message</h3>
      <form action="">
        <input type="text"  id="new-message-input" placeholder="New Message">
      </form>
       <button id="send-chat">Send Message</button>
    </div>`;
  },
  activateSendButton: () => {
    document.querySelector("#form-output").addEventListener("click", () => {
      if (event.target.id === "send-chat") {
        const messageVal = document.querySelector("#new-message").value;
        const objectToPost = (0, _ChatObj.default)(messageVal);

        _ChatCollection.default.sendNewMessage(objectToPost);
      }
    });
  }
};
var _default = ChatForm;
exports.default = _default;

},{"./ChatCollection":2,"./ChatObj":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Chat = _interopRequireDefault(require("./Chat.js"));

var _ChatCollection = _interopRequireDefault(require("./ChatCollection.js"));

var _ChatForm = _interopRequireDefault(require("./ChatForm.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// A ContactList component that displays all contacts. It should import the Contact component and the ContactCollection component.
const ChatList = () => {
  document.querySelector("#chat-output").innerHTML = "";
  let userId = sessionStorage.getItem("userId");

  _ChatCollection.default.getAllChats().then(chat => {
    chat.forEach(singleChat => {
      document.querySelector("#chat-output").innerHTML += (0, _Chat.default)(singleChat);
    });
  });
};

var _default = ChatList;
exports.default = _default;

},{"./Chat.js":1,"./ChatCollection.js":2,"./ChatForm.js":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildChatObject = messageParam => {
  return {
    message: messageParam,
    userId: sessionStorage.getItem("userId")
  };
};

var _default = buildChatObject;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ChatCollection = _interopRequireDefault(require("./ChatCollection"));

var _ChatList = _interopRequireDefault(require("./ChatList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const activateDeleteButtons = () => {
  document.querySelector("#chat-output").addEventListener("click", () => {
    if (event.target.classList.contains("delete")) {
      const idToDelete = event.target.id.split("-")[1];

      _ChatCollection.default.deleteChat(idToDelete).then(_ChatList.default);
    }
  });
};

var _default = activateDeleteButtons;
exports.default = _default;

},{"./ChatCollection":2,"./ChatList":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ChatCollection = _interopRequireDefault(require("./ChatCollection"));

var _SaveEdit = _interopRequireDefault(require("./SaveEdit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const activateEditButton = () => {
  document.querySelector("#chat-output").addEventListener("click", () => {
    if (event.target.classList.contains("edit")) {
      _ChatCollection.default.getSingleChat(event.target.id.split("-")[1]).then(singleChat => {
        document.querySelector("#new-message").value = singleChat.message;
        document.querySelector("#send-chat").textContent = "Edit Chat";
        document.querySelector("#send-chat").id = `edit-chat-${singleChat.id}`;
        (0, _SaveEdit.default)();
      });
    }
  });
};

var _default = activateEditButton;
exports.default = _default;

},{"./ChatCollection":2,"./SaveEdit":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ChatObj = _interopRequireDefault(require("./ChatObj"));

var _ChatCollection = _interopRequireDefault(require("./ChatCollection"));

var _ChatList = _interopRequireDefault(require("./ChatList"));

var _ChatForm = _interopRequireDefault(require("./ChatForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleEditedChat = () => {
  document.querySelector("#form-output").addEventListener("click", () => {
    if (event.target.id.includes("edit-chat")) {
      // Get the user's input
      const messageVal = document.querySelector("#new-message").value;
      const chatId = event.target.id.split("-")[2]; // Turn the user's input into an object

      const objectToPost = (0, _ChatObj.default)(messageVal);

      _ChatCollection.default.editChat(chatId, objectToPost).then(() => {
        (0, _ChatList.default)();
        document.querySelector("#form-output").innerHTML = _ChatForm.default.buildForm();
      });
    }
  });
};

var _default = handleEditedChat;
exports.default = _default;

},{"./ChatCollection":2,"./ChatForm":3,"./ChatList":4,"./ChatObj":5}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ChatList = _interopRequireDefault(require("./ChatList"));

var _ChatForm = _interopRequireDefault(require("./ChatForm"));

var _DeleteChat = _interopRequireDefault(require("./DeleteChat"));

var _EditChat = _interopRequireDefault(require("./EditChat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This module builds the chat list view once a user has logged in
const loadPageAfterLogin = () => {
  //Builds Chat Form
  document.querySelector("#form-output").innerHTML += _ChatForm.default.renderChatForm(); // Adds event listener to send button

  _ChatForm.default.activateSendButton(); // Builds Chat List


  (0, _ChatList.default)(); // Activate Delete Buttons

  (0, _DeleteChat.default)(); // Activate Edit Buttons

  (0, _EditChat.default)();
};

var _default = loadPageAfterLogin;
exports.default = _default;

},{"./ChatForm":3,"./ChatList":4,"./DeleteChat":6,"./EditChat":7}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const apiFetch = {
  addUser: parsedUser => {
    return fetch("http://localhost:8089/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parsedUser)
    }).then(r => r.json());
  },
  allUsers: () => {
    return fetch("http://localhost:8089/users").then(r => r.json());
  },
  userLogin: user => {
    return fetch(`http://localhost:8089/users?user=${user}`).then(r => r.json());
  }
};
var _default = apiFetch;
exports.default = _default;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _register = _interopRequireDefault(require("./register"));

var _login = _interopRequireDefault(require("./login"));

var _logout = _interopRequireDefault(require("./logout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const clicks = {
  reg: () => {
    document.querySelector("#register-btn").addEventListener("click", () => {
      _register.default.reg();
    });
  },
  register: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("create-btn")) {
        _register.default.handleRegister();
      }
    });
  },
  firstLog: () => {
    document.querySelector("#login-btnn").addEventListener("click", () => {
      _login.default.firstLog();
    });
  },
  login: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("login")) {
        console.log("hello");

        _login.default.login();
      }
    });
  },
  logout: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("logout")) {
        console.log("ajdak");
        (0, _logout.default)();
      }
    });
  }
};
var _default = clicks;
exports.default = _default;

},{"./login":13,"./logout":14,"./register":16}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
        `;
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
          `;
  },
  login: () => {
    return `
        <form id="login-form">
        <input id="login-name" placeholder="Name" type="text">
        <input id="login-pass" placeholder="Password" type="text">
        </form>
        <button id = "login" class="login">Login</button>
        `;
  },
  main: () => {
    return `
        <button id = "logout" class="logout">Logout</button>
        `;
  }
};
var _default = authForm;
exports.default = _default;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _forms = _interopRequireDefault(require("./forms"));

var _loadPageAfterLogin = _interopRequireDefault(require("../Chat/loadPageAfterLogin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleLogin = {
  login: () => {
    console.log("hello");
    const userVal = document.querySelector("#login-name").value;
    const passVal = document.querySelector("#login-pass").value;

    _apiManager.default.userLogin(userVal).then(parsedUser => {
      if (passVal === parsedUser[0].password) {
        document.querySelector("#jh-home").innerHTML = "";
        document.querySelector("#jh-home").innerHTML = _forms.default.main();
        sessionStorage.setItem("userId", parsedUser[0].id);
        (0, _loadPageAfterLogin.default)();
      } else {
        alert("WRONG!");
      }
    });
  },
  firstLog: () => {
    document.querySelector("#jh-home").innerHTML = "";
    document.querySelector("#jh-home").innerHTML = _forms.default.login();
  }
};
var _default = handleLogin;
exports.default = _default;

},{"../Chat/loadPageAfterLogin":9,"./apiManager":10,"./forms":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _forms = _interopRequireDefault(require("./forms"));

var _clicks = _interopRequireDefault(require("./clicks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleLogout = () => {
  sessionStorage.removeItem("userId");
  document.querySelector("#jh-home").innerHTML = "";
  document.querySelector("#jh-home").innerHTML = _forms.default.home();

  _clicks.default.reg();

  _clicks.default.register();

  _clicks.default.firstLog();

  _clicks.default.login();

  _clicks.default.logout();

  document.querySelector("#form-output").innerHTML = "";
};

var _default = handleLogout;
exports.default = _default;

},{"./clicks":11,"./forms":12}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const userObj = (nameParam, emailParam, userParam, passParam) => {
  return {
    name: nameParam,
    email: emailParam,
    user: userParam,
    password: passParam
  };
};

var _default = userObj;
exports.default = _default;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectBuilder = _interopRequireDefault(require("./objectBuilder"));

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _forms = _interopRequireDefault(require("./forms"));

var _ChatList = _interopRequireDefault(require("../Chat/ChatList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const register = {
  reg: () => {
    document.querySelector("#jh-home").innerHTML = "";
    document.querySelector("#register").innerHTML = _forms.default.register();
  },
  handleRegister: () => {
    const nameVal = document.querySelector("#name-register").value;
    const emailVal = document.querySelector("#email-register").value;
    const userVal = document.querySelector("#username-register").value;
    const passVal = document.querySelector("#password-register").value;
    const userInput = (0, _objectBuilder.default)(nameVal, emailVal, userVal, passVal);

    _apiManager.default.addUser(userInput).then(parsedUser => {
      sessionStorage.setItem("userId", parsedUser.id);
      document.querySelector("#register").innerHTML = "";
      document.querySelector("#login").innerHTML = _forms.default.main(); // ChatList.renderChatForm();
    });
  }
};
var _default = register;
exports.default = _default;

},{"../Chat/ChatList":4,"./apiManager":10,"./forms":12,"./objectBuilder":15}],17:[function(require,module,exports){
"use strict";

var _ChatForm = _interopRequireDefault(require("./Chat/ChatForm.js"));

var _loadPageAfterLogin = _interopRequireDefault(require("./Chat/loadPageAfterLogin.js"));

var _forms = _interopRequireDefault(require("./auth/forms"));

var _clicks = _interopRequireDefault(require("./auth/clicks"));

var _apiManager = _interopRequireDefault(require("./auth/apiManager"));

var _login = _interopRequireDefault(require("./auth/login"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// apiFetch();
document.querySelector("#jh-home").innerHTML = _forms.default.home();

_clicks.default.reg();

_clicks.default.register();

_clicks.default.firstLog();

_clicks.default.login();

_clicks.default.logout();

_ChatForm.default.activateSendButton();

},{"./Chat/ChatForm.js":3,"./Chat/loadPageAfterLogin.js":9,"./auth/apiManager":10,"./auth/clicks":11,"./auth/forms":12,"./auth/login":13}]},{},[17])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0NoYXQvQ2hhdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Q29sbGVjdGlvbi5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0TGlzdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0T2JqLmpzIiwiLi4vc2NyaXB0cy9DaGF0L0RlbGV0ZUNoYXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvRWRpdENoYXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvU2F2ZUVkaXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvbG9hZFBhZ2VBZnRlckxvZ2luLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2F1dGgvY2xpY2tzLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2Zvcm1zLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2xvZ2luLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2xvZ291dC5qcyIsIi4uL3NjcmlwdHMvYXV0aC9vYmplY3RCdWlsZGVyLmpzIiwiLi4vc2NyaXB0cy9hdXRoL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBLE1BQU0sU0FBUyxHQUFJLGFBQUQsSUFBbUI7QUFDakMsRUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLGFBQVo7QUFDQSxTQUFROzRCQUNnQixhQUFhLENBQUMsSUFBZCxDQUFtQixJQUFLOzBCQUMxQixhQUFhLENBQUMsT0FBUTt3Q0FDUixhQUFhLENBQUMsRUFBRztvQ0FDckIsYUFBYSxDQUFDLEVBQUc7UUFKakQ7QUFNRixDQVJGOztlQVNnQixTOzs7Ozs7Ozs7O0FDVGhCLE1BQU0sY0FBYyxHQUFHO0FBQ3JCLEVBQUEsY0FBYyxFQUFHLFlBQUQsSUFBa0I7QUFDaEMsV0FBTyxLQUFLLENBQUMsZ0NBQUQs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LEVBQTZDLEtBQTdEO0FBQ0EsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLEtBQTdEO0FBRUEsVUFBTSxTQUFTLEdBQUcsNEJBQVEsT0FBUixFQUFpQixRQUFqQixFQUEyQixPQUEzQixFQUFvQyxPQUFwQyxDQUFsQjs7QUFDQSx3QkFBUyxPQUFULENBQWlCLFNBQWpCLEVBQ0MsSUFERCxDQUNPLFVBQUQsSUFBZ0I7QUFDbEIsTUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixFQUFpQyxVQUFVLENBQUMsRUFBNUM7QUFDQSxNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLFNBQXBDLEdBQWdELEVBQWhEO0FBQ0EsTUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixFQUFpQyxTQUFqQyxHQUE2QyxlQUFTLElBQVQsRUFBN0MsQ0FIa0IsQ0FJbEI7QUFDSCxLQU5EO0FBT0M7QUFyQlksQ0FBakI7ZUF3QmUsUTs7Ozs7O0FDNUJmOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBR0E7QUFDQSxRQUFRLENBQUMsYUFBVCxDQUF1QixVQUF2QixFQUFtQyxTQUFuQyxHQUErQyxlQUFTLElBQVQsRUFBL0M7O0FBQ0EsZ0JBQU8sR0FBUDs7QUFDQSxnQkFBTyxRQUFQOztBQUNBLGdCQUFPLFFBQVA7O0FBQ0EsZ0JBQU8sS0FBUDs7QUFDQSxnQkFBTyxNQUFQOztBQUNBLGtCQUFTLGtCQUFUIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYnVpbGRDaGF0ID0gKHNpbmdsZUNoYXRPYmopID0+IHtcclxuICAgIGNvbnNvbGUubG9nKHNpbmdsZUNoYXRPYmopO1xyXG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZm9ybVwiIGlkPVwiY2hhdC1mb3JtXCI+XHJcbiAgICA8aDMgY2xhc3M9XCJjaGF0LXVzZXJcIj4ke3NpbmdsZUNoYXRPYmoudXNlci51c2VyfTo8L2gzPlxyXG4gICAgPHAgaWQ9XCJuZXctbWVzc2FnZVwiPiR7c2luZ2xlQ2hhdE9iai5tZXNzYWdlfTwvcD5cclxuICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGVcIiBpZD1cImRlbGV0ZS0ke3NpbmdsZUNoYXRPYmouaWR9XCI+RGVsZXRlPC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdFwiIGlkPVwiZWRpdC0ke3NpbmdsZUNoYXRPYmouaWR9XCI+RWRpdDwvYnV0dG9uPlxyXG4gPC9kaXY+YFxyXG4gfVxyXG4gZXhwb3J0IGRlZmF1bHQgYnVpbGRDaGF0OyIsImNvbnN0IENoYXRDb2xsZWN0aW9uID0ge1xyXG4gIHNlbmROZXdNZXNzYWdlOiAob2JqZWN0VG9Qb3N0KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvbWVzc2FnZXNcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0VG9Qb3N0KVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRBbGxDaGF0czogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg5L21lc3NhZ2VzP19leHBhbmQ9dXNlclwiKVxyXG4gICAgLnRoZW4obWVzc2FnZXMgPT4gbWVzc2FnZXMuanNvbigpKTtcclxuICAgfSxcclxuICBkZWxldGVDaGF0OiAoY2hhdElkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9tZXNzYWdlcy8ke2NoYXRJZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgfSlcclxuICB9LFxyXG4gIGdldFNpbmdsZUNoYXQ6IChjaGF0SWQpID0+IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvbWVzc2FnZXMvJHtjaGF0SWR9YClcclxuICAgIC50aGVuKHIgPT4gci5qc29uKCkpLFxyXG5cclxuICBlZGl0Q2hhdDogKGNoYXRJZCwgY2hhdE9iaikgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvbWVzc2FnZXMvJHtjaGF0SWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjaGF0T2JqKVxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBDaGF0Q29sbGVjdGlvbjsiLCIvLyBBIENvbnRhY3RGb3JtIGNvbXBvbmVudCB0aGF0LCB3aGVuIGZpbGxlZCBvdXQgYW5kIGEgc3VibWl0IGJ1dHRvbiBpcyBwcmVzc2VkLCBhZGRzIGEgbmV3IGNvbnRhY3QgdG8gc3RvcmFnZS4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxyXG5pbXBvcnQgQ2hhdENvbGxlY3Rpb24gZnJvbSBcIi4vQ2hhdENvbGxlY3Rpb25cIjtcclxuaW1wb3J0IGJ1aWxkQ2hhdE9iamVjdCBmcm9tIFwiLi9DaGF0T2JqXCI7XHJcbi8vIGltcG9ydCBDaGF0TGlzdCBmcm9tIFwiLi9DaGF0TGlzdFwiO1xyXG5cclxuY29uc3QgQ2hhdEZvcm0gPSB7XHJcbiAgcmVuZGVyQ2hhdEZvcm06ICgpID0+IHtcclxuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZvcm1cIiBpZD1cImZvcm0tb3V0cHV0XCI+XHJcbiAgICAgIDxoMz5TZW5kIE5ldyBNZXNzYWdlPC9oMz5cclxuICAgICAgPGZvcm0gYWN0aW9uPVwiXCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgIGlkPVwibmV3LW1lc3NhZ2UtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIk5ldyBNZXNzYWdlXCI+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICAgIDxidXR0b24gaWQ9XCJzZW5kLWNoYXRcIj5TZW5kIE1lc3NhZ2U8L2J1dHRvbj5cclxuICAgIDwvZGl2PmA7XHJcbiAgfSxcclxuICBhY3RpdmF0ZVNlbmRCdXR0b246ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJzZW5kLWNoYXRcIikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1tZXNzYWdlXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IG9iamVjdFRvUG9zdCA9IGJ1aWxkQ2hhdE9iamVjdChtZXNzYWdlVmFsKTtcclxuICAgICAgICBDaGF0Q29sbGVjdGlvbi5zZW5kTmV3TWVzc2FnZShvYmplY3RUb1Bvc3QpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhdEZvcm07IiwiaW1wb3J0IGJ1aWxkQ2hhdCBmcm9tIFwiLi9DaGF0LmpzXCJcclxuaW1wb3J0IENoYXRDb2xsZWN0aW9uIGZyb20gXCIuL0NoYXRDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IENoYXRGb3JtIGZyb20gXCIuL0NoYXRGb3JtLmpzXCJcclxuXHJcbi8vIEEgQ29udGFjdExpc3QgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYWxsIGNvbnRhY3RzLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuXHJcblxyXG5jb25zdCBDaGF0TGlzdCA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdC1vdXRwdXRcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpO1xyXG4gICAgQ2hhdENvbGxlY3Rpb24uZ2V0QWxsQ2hhdHMoKVxyXG4gICAgLnRoZW4oY2hhdCA9PiB7XHJcbiAgICAgICAgY2hhdC5mb3JFYWNoKHNpbmdsZUNoYXQgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXQtb3V0cHV0XCIpLmlubmVySFRNTCArPSBidWlsZENoYXQoc2luZ2xlQ2hhdCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IENoYXRMaXN0O1xyXG4iLCJjb25zdCBidWlsZENoYXRPYmplY3QgPSAobWVzc2FnZVBhcmFtKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlUGFyYW0sXHJcbiAgICAgIHVzZXJJZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgfTtcclxuICB9O1xyXG5leHBvcnQgZGVmYXVsdCBidWlsZENoYXRPYmplY3Q7IiwiaW1wb3J0IENoYXRDb2xsZWN0aW9uIGZyb20gXCIuL0NoYXRDb2xsZWN0aW9uXCJcclxuaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuL0NoYXRMaXN0XCJcclxuXHJcbmNvbnN0IGFjdGl2YXRlRGVsZXRlQnV0dG9ucyA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdC1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlXCIpKXtcclxuICAgICAgICAgICAgY29uc3QgaWRUb0RlbGV0ZSA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07XHJcbiAgICAgICAgICAgIENoYXRDb2xsZWN0aW9uLmRlbGV0ZUNoYXQoaWRUb0RlbGV0ZSlcclxuICAgICAgICAgICAgLnRoZW4oQ2hhdExpc3QpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZhdGVEZWxldGVCdXR0b25zOyIsImltcG9ydCBDaGF0Q29sbGVjdGlvbiBmcm9tIFwiLi9DaGF0Q29sbGVjdGlvblwiO1xyXG5pbXBvcnQgaGFuZGxlRWRpdGVkQ2hhdCBmcm9tIFwiLi9TYXZlRWRpdFwiO1xyXG5cclxuXHJcbmNvbnN0IGFjdGl2YXRlRWRpdEJ1dHRvbiA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdC1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdFwiKSl7XHJcbiAgICAgICAgICAgIENoYXRDb2xsZWN0aW9uLmdldFNpbmdsZUNoYXQoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsxXSlcclxuICAgICAgICAgICAgLnRoZW4oKHNpbmdsZUNoYXQpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LW1lc3NhZ2VcIikudmFsdWUgPSBzaW5nbGVDaGF0Lm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbmQtY2hhdFwiKS50ZXh0Q29udGVudCA9IFwiRWRpdCBDaGF0XCI7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbmQtY2hhdFwiKS5pZD0gYGVkaXQtY2hhdC0ke3NpbmdsZUNoYXQuaWR9YDtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVkaXRlZENoYXQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZhdGVFZGl0QnV0dG9uOyIsImltcG9ydCBidWlsZENoYXRPYmplY3QgZnJvbSBcIi4vQ2hhdE9ialwiO1xyXG5pbXBvcnQgQ2hhdENvbGxlY3Rpb24gZnJvbSBcIi4vQ2hhdENvbGxlY3Rpb25cIjtcclxuaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuL0NoYXRMaXN0XCI7XHJcbmltcG9ydCBDaGF0Rm9ybSBmcm9tIFwiLi9DaGF0Rm9ybVwiO1xyXG5cclxuY29uc3QgaGFuZGxlRWRpdGVkQ2hhdCA9ICgpID0+IHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tb3V0cHV0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmlkLmluY2x1ZGVzKFwiZWRpdC1jaGF0XCIpKSB7XHJcbiAgICAgIC8vIEdldCB0aGUgdXNlcidzIGlucHV0XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2VWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1tZXNzYWdlXCIpLnZhbHVlO1xyXG4gICAgICBjb25zdCBjaGF0SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzJdO1xyXG5cclxuICAgICAgLy8gVHVybiB0aGUgdXNlcidzIGlucHV0IGludG8gYW4gb2JqZWN0XHJcbiAgICAgIGNvbnN0IG9iamVjdFRvUG9zdCA9IGJ1aWxkQ2hhdE9iamVjdChtZXNzYWdlVmFsKTtcclxuXHJcbiAgICAgIENoYXRDb2xsZWN0aW9uLmVkaXRDaGF0KGNoYXRJZCwgb2JqZWN0VG9Qb3N0KS50aGVuKCgpID0+IHtcclxuICAgICAgICBDaGF0TGlzdCgpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuaW5uZXJIVE1MID0gQ2hhdEZvcm0uYnVpbGRGb3JtKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRWRpdGVkQ2hhdDsiLCJpbXBvcnQgQ2hhdExpc3QgZnJvbSBcIi4vQ2hhdExpc3RcIlxyXG5pbXBvcnQgQ2hhdEZvcm0gZnJvbSBcIi4vQ2hhdEZvcm1cIlxyXG5pbXBvcnQgYWN0aXZhdGVEZWxldGVCdXR0b25zIGZyb20gXCIuL0RlbGV0ZUNoYXRcIlxyXG5pbXBvcnQgYWN0aXZhdGVFZGl0QnV0dG9ucyBmcm9tIFwiLi9FZGl0Q2hhdFwiO1xyXG5cclxuLy8gVGhpcyBtb2R1bGUgYnVpbGRzIHRoZSBjaGF0IGxpc3QgdmlldyBvbmNlIGEgdXNlciBoYXMgbG9nZ2VkIGluXHJcbmNvbnN0IGxvYWRQYWdlQWZ0ZXJMb2dpbiA9ICgpID0+IHtcclxuLy9CdWlsZHMgQ2hhdCBGb3JtXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuaW5uZXJIVE1MICs9IENoYXRGb3JtLnJlbmRlckNoYXRGb3JtKCk7XHJcbi8vIEFkZHMgZXZlbnQgbGlzdGVuZXIgdG8gc2VuZCBidXR0b25cclxuQ2hhdEZvcm0uYWN0aXZhdGVTZW5kQnV0dG9uKCk7XHJcbi8vIEJ1aWxkcyBDaGF0IExpc3RcclxuQ2hhdExpc3QoKTtcclxuXHJcbi8vIEFjdGl2YXRlIERlbGV0ZSBCdXR0b25zXHJcbmFjdGl2YXRlRGVsZXRlQnV0dG9ucygpO1xyXG4vLyBBY3RpdmF0ZSBFZGl0IEJ1dHRvbnNcclxuYWN0aXZhdGVFZGl0QnV0dG9ucygpO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9hZFBhZ2VBZnRlckxvZ2luOyIsImNvbnN0IGFwaUZldGNoID0ge1xyXG4gICAgYWRkVXNlcjogKHBhcnNlZFVzZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJzZWRVc2VyKVxyXG4gICAgICAgIH0pLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhbGxVc2VyczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS91c2Vyc1wiKVxyXG4gICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgdXNlckxvZ2luOiAodXNlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3VzZXJzP3VzZXI9JHt1c2VyfWApXHJcbiAgICAgICAgLnRoZW4ociA9PiByLmpzb24oKSlcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcGlGZXRjaCIsImltcG9ydCByZWdpc3RlciBmcm9tIFwiLi9yZWdpc3RlclwiXHJcbmltcG9ydCBoYW5kbGVMb2dpbiBmcm9tIFwiLi9sb2dpblwiO1xyXG5pbXBvcnQgaGFuZGxlTG9nb3V0IGZyb20gXCIuL2xvZ291dFwiXHJcblxyXG5jb25zdCBjbGlja3MgPSB7XHJcbiAgICByZWc6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICByZWdpc3Rlci5yZWcoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXI6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNyZWF0ZS1idG5cIikpe1xyXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXIuaGFuZGxlUmVnaXN0ZXIoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBmaXJzdExvZzogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tYnRublwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBoYW5kbGVMb2dpbi5maXJzdExvZygpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBsb2dpbjogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJsb2dpblwiKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVsbG9cIilcclxuICAgICAgICAgICAgaGFuZGxlTG9naW4ubG9naW4oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBsb2dvdXQ6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibG9nb3V0XCIpKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWpkYWtcIilcclxuICAgICAgICAgICAgaGFuZGxlTG9nb3V0KClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsaWNrcyIsImNvbnN0IGF1dGhGb3JtID0ge1xyXG4gICAgaG9tZTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cImhvbWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGgxPldlbGNvbWUgdG8gTnV0U2hlbGw8L2gxPlxyXG4gICAgICAgIDxkaXYgaWQgPVwiaG9tZS1idXR0b25cIj5cclxuICAgICAgICA8ZGl2IGlkID1cImxvZ2luLWRpdlwiPjxidXR0b24gaWQ9XCJsb2dpbi1idG5uXCI+TG9naW48L2J1dHRvbj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkID1cInJlZ2lzdGVyXCI+PGJ1dHRvbiBpZD1cInJlZ2lzdGVyLWJ0blwiPlJlZ2lzdGVyPC9idXR0b24+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG5cclxuICAgIH0sXHJcbiAgICByZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cInJlZ2lzdGVyXCI+XHJcbiAgICAgICAgICAgIDxmb3JtIGlkPVwicmVnaXN0ZXItZm9ybVwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJuYW1lLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwiZW1haWwtcmVnaXN0ZXJcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgdHlwZT1cImVtYWlsXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJuYW1lLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInBhc3N3b3JkLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiPlxyXG4gICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cImNyZWF0ZS1idG5cIiBjbGFzcz1cImNyZWF0ZS1idG5cIj5DcmVhdGUgQWNjb3VudDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICBgXHJcblxyXG4gICAgfSxcclxuICAgIGxvZ2luOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8Zm9ybSBpZD1cImxvZ2luLWZvcm1cIj5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJsb2dpbi1uYW1lXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJsb2dpbi1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImxvZ2luXCIgY2xhc3M9XCJsb2dpblwiPkxvZ2luPC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfSxcclxuICAgIG1haW46ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImxvZ291dFwiIGNsYXNzPVwibG9nb3V0XCI+TG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhdXRoRm9ybSIsImltcG9ydCBhcGlGZXRjaCBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGF1dGhGb3JtIGZyb20gXCIuL2Zvcm1zXCI7XHJcbmltcG9ydCBsb2FkUGFnZUFmdGVyTG9naW4gZnJvbSBcIi4uL0NoYXQvbG9hZFBhZ2VBZnRlckxvZ2luXCI7XHJcbmNvbnN0IGhhbmRsZUxvZ2luID0ge1xyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpXHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLW5hbWVcIikudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGFzc1ZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tcGFzc1wiKS52YWx1ZTtcclxuXHJcbiAgICAgICAgYXBpRmV0Y2gudXNlckxvZ2luKHVzZXJWYWwpXHJcbiAgICAgICAgICAgIC50aGVuKChwYXJzZWRVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFzc1ZhbCA9PT0gcGFyc2VkVXNlclswXS5wYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLm1haW4oKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgcGFyc2VkVXNlclswXS5pZClcclxuICAgICAgICAgICAgICAgICAgICBsb2FkUGFnZUFmdGVyTG9naW4oKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXUk9ORyFcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBmaXJzdExvZzogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLmxvZ2luKClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlTG9naW4iLCJpbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vZm9ybXNcIlxyXG5pbXBvcnQgY2xpY2tzIGZyb20gXCIuL2NsaWNrc1wiXHJcbmNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcclxuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VySWRcIilcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gYXV0aEZvcm0uaG9tZSgpXHJcbiAgICBjbGlja3MucmVnKCk7XHJcbiAgIGNsaWNrcy5yZWdpc3RlcigpO1xyXG4gICBjbGlja3MuZmlyc3RMb2coKTtcclxuICAgY2xpY2tzLmxvZ2luKCk7XHJcbiAgIGNsaWNrcy5sb2dvdXQoKTtcclxuICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLW91dHB1dFwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVMb2dvdXQiLCJjb25zdCB1c2VyT2JqID0gKG5hbWVQYXJhbSwgZW1haWxQYXJhbSwgdXNlclBhcmFtLCBwYXNzUGFyYW0pID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICBuYW1lOiBuYW1lUGFyYW0sXHJcbiAgICBlbWFpbDogZW1haWxQYXJhbSxcclxuICAgIHVzZXI6IHVzZXJQYXJhbSxcclxuICAgIHBhc3N3b3JkOiBwYXNzUGFyYW1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJPYmoiLCJpbXBvcnQgdXNlck9iaiBmcm9tIFwiLi9vYmplY3RCdWlsZGVyXCJcclxuaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5pbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vZm9ybXNcIlxyXG5pbXBvcnQgQ2hhdExpc3QgZnJvbSBcIi4uL0NoYXQvQ2hhdExpc3RcIjtcclxuXHJcbmNvbnN0IHJlZ2lzdGVyID0ge1xyXG5cclxuICAgIHJlZzogKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJcIikuaW5uZXJIVE1MID0gYXV0aEZvcm0ucmVnaXN0ZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlUmVnaXN0ZXI6ICgpID0+IHtcclxuICAgIGNvbnN0IG5hbWVWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWUtcmVnaXN0ZXJcIikudmFsdWU7XHJcbiAgICBjb25zdCBlbWFpbFZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWwtcmVnaXN0ZXJcIikudmFsdWU7XHJcbiAgICBjb25zdCB1c2VyVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZS1yZWdpc3RlclwiKS52YWx1ZTtcclxuICAgIGNvbnN0IHBhc3NWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkLXJlZ2lzdGVyXCIpLnZhbHVlO1xyXG5cclxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IHVzZXJPYmoobmFtZVZhbCwgZW1haWxWYWwsIHVzZXJWYWwsIHBhc3NWYWwpXHJcbiAgICBhcGlGZXRjaC5hZGRVc2VyKHVzZXJJbnB1dClcclxuICAgIC50aGVuKChwYXJzZWRVc2VyKSA9PiB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCBwYXJzZWRVc2VyLmlkKVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5cIikuaW5uZXJIVE1MID0gYXV0aEZvcm0ubWFpbigpO1xyXG4gICAgICAgIC8vIENoYXRMaXN0LnJlbmRlckNoYXRGb3JtKCk7XHJcbiAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZWdpc3RlciIsIlxyXG5pbXBvcnQgQ2hhdEZvcm0gZnJvbSBcIi4vQ2hhdC9DaGF0Rm9ybS5qc1wiO1xyXG5pbXBvcnQgbG9hZFBhZ2VBZnRlckxvZ2luIGZyb20gXCIuL0NoYXQvbG9hZFBhZ2VBZnRlckxvZ2luLmpzXCI7XHJcbmltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9hdXRoL2Zvcm1zXCI7XHJcbmltcG9ydCBjbGlja3MgZnJvbSBcIi4vYXV0aC9jbGlja3NcIlxyXG5pbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXV0aC9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGhhbmRsZUxvZ2luIGZyb20gXCIuL2F1dGgvbG9naW5cIlxyXG5cclxuXHJcbi8vIGFwaUZldGNoKCk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5ob21lKCk7XHJcbmNsaWNrcy5yZWcoKVxyXG5jbGlja3MucmVnaXN0ZXIoKVxyXG5jbGlja3MuZmlyc3RMb2coKVxyXG5jbGlja3MubG9naW4oKVxyXG5jbGlja3MubG9nb3V0KClcclxuQ2hhdEZvcm0uYWN0aXZhdGVTZW5kQnV0dG9uKCk7Il19
