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
    <button class="edit-chat" id="edit-${singleChatObj.id}">Edit</button>
    <button class="delete-chat" id="delete-${singleChatObj.id}">Delete</button>
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
        _login.default.login();
      }
    });
  },
  logout: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("logout")) {
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
        <h1>Welcome to NutShell <img class= "icon" src="https://static.thenounproject.com/png/195426-200.png" alt="" ></h1>
        <div id ="home-button">
        <div id ="login-div"><button id="login-btnn">Login</button></div>
        <div id ="register"><button id="register-btn">Register</button></div>
        </div>
        </div>
        `;
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
          `;
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
        `;
  },
  main: () => {
    return `
        <button id = "logoutButton" class="logout">Logout</button>
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

var _taskForm = _interopRequireDefault(require("../task/taskForm"));

var _printTask = _interopRequireDefault(require("../task/printTask"));

var _printAllEvents = _interopRequireDefault(require("../events/printAllEvents"));

var _click = _interopRequireDefault(require("../events/click"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleLogin = {
  firstLog: () => {
    document.querySelector("#jh-home").innerHTML = "";
    document.querySelector("#jh-home").innerHTML = _forms.default.login();
  },
  login: () => {
    const userVal = document.querySelector("#login-name").value;
    const passVal = document.querySelector("#login-pass").value;

    _apiManager.default.userLogin(userVal).then(parsedUser => {
      if (passVal === parsedUser[0].password) {
        document.querySelector("#jh-home").innerHTML = ""; // document.querySelector("#jh-home").innerHTML = authForm.main()
        // document.querySelector("#task").innerHTML = form.taskForm();

        document.querySelector("#task").innerHTML = _taskForm.default.createTask();
        sessionStorage.setItem("userId", parsedUser[0].id);
        (0, _loadPageAfterLogin.default)();
        (0, _printAllEvents.default)();
        (0, _printTask.default)();
      } else {
        alert("Wrong password, try again!");
      }
    });
  }
};
var _default = handleLogin;
exports.default = _default;

},{"../Chat/loadPageAfterLogin":9,"../events/click":19,"../events/printAllEvents":23,"../task/printTask":30,"../task/taskForm":32,"./apiManager":10,"./forms":12}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _forms = _interopRequireDefault(require("./forms"));

var _clicks = _interopRequireDefault(require("./clicks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import authForm from "./auth/forms";
const handleLogout = () => {
  sessionStorage.removeItem("userId");
  console.log("Hello");
  document.querySelector("#task").innerHTML = "";
  document.querySelector("#print-task").innerHTML = "";
  document.querySelector("#jh-home").innerHTML = _forms.default.home(); // Attempting to make it where after you logout you can log back in / thought importing all the clicks would work but it doesn't look like it .:)

  _clicks.default.reg();

  _clicks.default.register();

  _clicks.default.firstLog();

  _clicks.default.logout();

  document.querySelector("#eventFormContainer").innerHTML = "";
  document.querySelector("#eventContainer").innerHTML = "";
  document.querySelector("#login").innerHTML = "";
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

var _printAllEvents = _interopRequireDefault(require("../events/printAllEvents"));

var _taskForm = _interopRequireDefault(require("../task/taskForm"));

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
      document.querySelector("#register").innerHTML = ""; // document.querySelector("#login").innerHTML = authForm.main()

      document.querySelector("#task").innerHTML = _taskForm.default.taskForm();
      document.querySelector("#login").innerHTML = _forms.default.main();
      (0, _printAllEvents.default)();
    });
  }
};
var _default = register;
exports.default = _default;

},{"../Chat/ChatList":4,"../events/printAllEvents":23,"../task/taskForm":32,"./apiManager":10,"./forms":12,"./objectBuilder":15}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printAllEvents = _interopRequireDefault(require("./printAllEvents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const eventApiManager = {
  getAllEvents: userId => {
    return fetch(`http://localhost:8089/events/?userId=${userId}`).then(events => events.json());
  },
  postNewEvent: eventObject => {
    return fetch("http://localhost:8089/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventObject)
    });
  },
  deleteEvent: idToDelete => {
    fetch(`http://localhost:8089/events/${idToDelete}`, {
      method: "DELETE"
    }).then(() => {
      (0, _printAllEvents.default)();
    });
  },
  getSingleEvent: id => {
    return fetch(`http://localhost:8089/events/${id}`).then(response => response.json());
  },
  editEvent: (idParam, eventToEdit) => {
    return fetch(`http://localhost:8089/events/${idParam}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventToEdit)
    });
  }
};
var _default = eventApiManager;
exports.default = _default;

},{"./printAllEvents":23}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildSingleEvent = singleEvent => {
  return `
        <div id = "eventContainer-${singleEvent.id}" class = "allDaEvents">
            <h2>${singleEvent.name}</h2>
                <p>Date:  ${singleEvent.date}</p>
                <p>Location:  ${singleEvent.location}</p>
                <br>
            <button class="editButton" id= "editEventButton-${singleEvent.id}">Update</button> <button class="deleteButton" id= "deleteButton-${singleEvent.id}">Delete</button>
        </div>
        <hr>`;
};

var _default = buildSingleEvent;
exports.default = _default;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventForm = _interopRequireDefault(require("./eventForm"));

var _eventObject = _interopRequireDefault(require("./eventObject"));

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _printAllEvents = _interopRequireDefault(require("./printAllEvents"));

var _editForm = _interopRequireDefault(require("./editForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const clickWizard = {
  addEventFunction: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.id === "addEventButton") {
        document.querySelector("#eventFormContainer").innerHTML = _eventForm.default.eventFormInputs();
      }
    });
  },
  saveEventFunction: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("saveEventButton")) {
        const nameValue = document.querySelector("#eventFormName").value;
        const dateValue = document.querySelector("#eventFormDate").value;
        const locationValue = document.querySelector("#eventFormLocation").value;
        const newEventObject = (0, _eventObject.default)(nameValue, dateValue, locationValue);

        _apiManager.default.postNewEvent(newEventObject).then(_printAllEvents.default);

        document.querySelector("#eventFormName").value = "";
        document.querySelector("#eventFormDate").value = "";
        document.querySelector("#eventFormLocation").value = "";
      }
    });
  },
  editButtonFunction: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("editButton")) {
        let eventEditId = event.target.id.split("-")[1];

        _apiManager.default.getSingleEvent(eventEditId).then(singleEventInfo => {
          document.querySelector(`#eventContainer-${eventEditId}`).innerHTML = "";
          document.querySelector(`#eventContainer-${eventEditId}`).innerHTML = (0, _editForm.default)(singleEventInfo);
        });
      }
    });
  },
  saveEditButtonFunction: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("saveEditedEvent")) {
        const itemId = event.target.id.split("-")[1];
        const editedName = document.querySelector(`#eventEditName-${itemId}`).value;
        const editedDate = document.querySelector(`#eventEditDate-${itemId}`).value;
        const editedLocation = document.querySelector(`#eventEditLocation-${itemId}`).value;
        const editedEventObject = (0, _eventObject.default)(editedName, editedDate, editedLocation);

        _apiManager.default.editEvent(itemId, editedEventObject).then(_printAllEvents.default);
      }
    });
  },
  deleteButtonFunction: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("deleteButton")) {
        let eventDeleteId = event.target.id.split("-")[1];

        _apiManager.default.deleteEvent(eventDeleteId);
      }
    });
  }
};
var _default = clickWizard;
exports.default = _default;

},{"./apiManager":17,"./editForm":20,"./eventForm":21,"./eventObject":22,"./printAllEvents":23}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const eventEditFormBuilder = singleEvent => {
  return `<form id = "eventFormInputs">
                <input id = "eventEditName-${singleEvent.id}" placeholder = "name" value="${singleEvent.name}">
                <input id = "eventEditDate-${singleEvent.id}" placeholder = "date" value="${singleEvent.date}">
                <input id = "eventEditLocation-${singleEvent.id}" placeholder = "location" value="${singleEvent.location}">
            </form>
            <button id = "saveEditedEvent-${singleEvent.id}" class = "saveEditedEvent">Save event</button`;
};

var _default = eventEditFormBuilder;
exports.default = _default;

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const eventFormBuilder = {
  eventFormInputs: () => {
    return `<form id = "eventFormInputs">
                <input id = "eventFormName" placeholder = "name">
                <input id = "eventFormDate" placeholder = "date">
                <input id = "eventFormLocation" placeholder = "location">
            </form>
            <button id = "saveNewEvent" class = "saveEventButton">Save event</button`;
  },
  eventButton: `<hr><button id="addEventButton">Add an Event!</button>`
};
var _default = eventFormBuilder;
exports.default = _default;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildEventObject = (nameParam, dateParam, locationParam) => {
  return {
    name: nameParam,
    date: dateParam,
    location: locationParam,
    userId: sessionStorage.getItem("userId")
  };
};

var _default = buildEventObject;
exports.default = _default;

},{}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _buildSingleEvent = _interopRequireDefault(require("./buildSingleEvent"));

var _eventForm = _interopRequireDefault(require("./eventForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const printAllEvents = () => {
  let userId = sessionStorage.getItem("userId");
  document.querySelector("#eventFormContainer").innerHTML = _eventForm.default.eventButton;
  document.querySelector("#eventContainer").innerHTML = "";

  _apiManager.default.getAllEvents(userId).then(response => {
    response.forEach(singleEvent => {
      document.querySelector("#eventContainer").innerHTML += (0, _buildSingleEvent.default)(singleEvent);
    });
  });
};

var _default = printAllEvents;
exports.default = _default;

},{"./apiManager":17,"./buildSingleEvent":18,"./eventForm":21}],24:[function(require,module,exports){
"use strict";

var _ChatForm = _interopRequireDefault(require("./Chat/ChatForm.js"));

var _loadPageAfterLogin = _interopRequireDefault(require("./Chat/loadPageAfterLogin.js"));

var _forms = _interopRequireDefault(require("./auth/forms"));

var _clicks = _interopRequireDefault(require("./auth/clicks"));

var _edit = _interopRequireDefault(require("./task/edit"));

var _handleEdit = _interopRequireDefault(require("./task/handleEdit"));

var _apiManager = _interopRequireDefault(require("./auth/apiManager"));

var _login = _interopRequireDefault(require("./auth/login"));

var _apiManager2 = _interopRequireDefault(require("./events/apiManager"));

var _click = _interopRequireDefault(require("./events/click"));

var _clicks2 = _interopRequireDefault(require("./task/clicks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import handleLogin from "./auth/login"
// task imports
// import form from "./task/taskForm"
// apiFetch();
document.querySelector("#jh-home").innerHTML = _forms.default.home();

_clicks.default.reg();

_clicks.default.register();

_clicks.default.firstLog();

_clicks.default.login();

_clicks.default.logout();

_ChatForm.default.activateSendButton(); // document.querySelector("#task").innerHTML = form.newTaskForm()


_clicks2.default.createTask();

_clicks2.default.newTask();

_clicks2.default.saveTask();

_clicks2.default.deleteTask();

(0, _edit.default)();
(0, _handleEdit.default)();

_click.default.addEventFunction();

_click.default.saveEventFunction();

_click.default.editButtonFunction();

_click.default.saveEditButtonFunction();

_click.default.deleteButtonFunction();

},{"./Chat/ChatForm.js":3,"./Chat/loadPageAfterLogin.js":9,"./auth/apiManager":10,"./auth/clicks":11,"./auth/forms":12,"./auth/login":13,"./events/apiManager":17,"./events/click":19,"./task/clicks":26,"./task/edit":27,"./task/handleEdit":28}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const apiFetch = {
  singleTask: () => {
    return fetch("http://localhost:8089/tasks").then(r => r.json());
  },
  addtask: tasks => {
    return fetch("http://localhost:8089/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasks)
    }).then(r => r.json());
  },
  allTask: () => {
    const activeUserId = sessionStorage.getItem("userId");
    return fetch(`http://localhost:8089/tasks?userId=${activeUserId}`).then(r => r.json());
  },
  deleteTask: taskId => {
    return fetch(`http://localhost:8089/tasks/${taskId}`, {
      method: "DELETE"
    });
  },
  editTask: (taskId, userInput) => {
    return fetch(`http://localhost:8089/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInput)
    });
  },
  editSingle: taskId => {
    return fetch(`http://localhost:8089/tasks/${taskId}`).then(r => r.json());
  },
  markAsComplete: taskId => {
    return fetch(`http://localhost:8089/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: "true"
      })
    });
  },
  markAsIncomplete: taskId => {
    return fetch(`http://localhost:8089/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: "false"
      })
    });
  }
};
var _default = apiFetch;
exports.default = _default;

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taskForm = _interopRequireDefault(require("./taskForm"));

var _printTask = _interopRequireDefault(require("./printTask"));

var _logout = _interopRequireDefault(require("../auth/logout"));

var _objectBuilder = _interopRequireDefault(require("./objectBuilder"));

var _apiManager = _interopRequireDefault(require("./apiManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const taskClicks = {
  createTask: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("create-new-task")) {
        document.querySelector("#task").innerHTML = _taskForm.default.taskForm();
      }
    });
  },
  newTask: () => {
    // document.querySelector("#new-task").addEventListener("click", () => {
    //     document.querySelector("#task").innerHTML = form.taskForm()
    //     print()
    // })
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("new-task")) {
        document.querySelector("#task").innerHTML = _taskForm.default.taskForm();
      }
    });
  },
  saveTask: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("save-task")) {
        const taskVal = document.querySelector("#main-task").value;
        const dateVal = document.querySelector("#complete-date").value;
        const userInput = (0, _objectBuilder.default)(taskVal, dateVal);

        _apiManager.default.addtask(userInput).then(() => {
          (0, _printTask.default)();
          document.querySelector("#main-task").value = "";
          document.querySelector("#complete-date").value = "";
        });
      } else if (event.target.classList.contains("checkbox")) {
        const taskId = event.target.id.split("-")[1]; // 14

        console.log(taskId);

        if (document.querySelector(`#checkbox-${taskId}`).checked) {
          _apiManager.default.markAsComplete(taskId);

          document.querySelector(`#possibly-${taskId}`).classList.add("checked-class"); // document.querySelector("#task-print").innerHTML = ""
        } else {
          _apiManager.default.markAsIncomplete(taskId);

          document.querySelector(`#possibly-${taskId}`).classList.remove("checked-class");
        }
      }
    });
  },
  // saveTask: () => {
  //     document.querySelector("body").addEventListener("click", () => {
  //         if (event.target.classList.contains("save-task")) {
  //             const taskVal = document.querySelector("#main-task").value;
  //             const dateVal = document.querySelector("#complete-date").value;
  //             const userInput = taskObj(taskVal, dateVal)
  //             apiFetch.addtask(userInput)
  //                 .then(() => {
  //                     print()
  //                     document.querySelector("#main-task").value = ""
  //                     document.querySelector("#complete-date").value = ""
  //                 })
  //         }
  //     })
  // },
  logout: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("logout")) (0, _logout.default)();
    });
  },
  deleteTask: () => {
    document.querySelector("body").addEventListener("click", () => {
      if (event.target.classList.contains("task-delete-btn")) {
        const deleteId = event.target.id.split("-")[2];

        _apiManager.default.deleteTask(deleteId).then(() => {
          (0, _printTask.default)();
        });
      }
    });
  }
};
var _default = taskClicks;
exports.default = _default;

},{"../auth/logout":14,"./apiManager":25,"./objectBuilder":29,"./printTask":30,"./taskForm":32}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _handleEdit = _interopRequireDefault(require("./handleEdit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// first edit click
const activateEditButton = () => {
  // debugger;
  document.querySelector("body").addEventListener("click", () => {
    // debugger;
    if (event.target.classList.contains("edit")) {
      console.log("hello");
      console.log(event.target.id.split("-"));

      _apiManager.default.editSingle(event.target.id.split("-")[2]).then(singleTask => {
        document.querySelector("#main-task").value = singleTask.task;
        document.querySelector("#complete-date").value = singleTask.date;
        document.querySelector("#save-task").textContent = "Edit Task";
        document.querySelector("#save-task").classList.add("newClass");
        document.querySelector("#save-task").classList.remove("save-task");
        document.querySelector("#save-task").id = `edit-task-${singleTask.id}`;
      });
    }
  });
};

var _default = activateEditButton;
exports.default = _default;

},{"./apiManager":25,"./handleEdit":28}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectBuilder = _interopRequireDefault(require("./objectBuilder"));

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _taskForm = _interopRequireDefault(require("./taskForm"));

var _printTask = _interopRequireDefault(require("./printTask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// after editing task
const handleEditedTask = () => {
  document.querySelector("body").addEventListener("click", () => {
    if (event.target.classList.contains("newClass")) {
      debugger;
      const taskName = document.querySelector("#main-task").value;
      const taskDate = document.querySelector("#complete-date").value;
      const taskId = event.target.id.split("-")[2];
      const object = (0, _objectBuilder.default)(taskName, taskDate);

      _apiManager.default.editTask(taskId, object).then(() => {
        debugger;
        (0, _printTask.default)();
        document.querySelector("#new-task-container").innerHTML = _taskForm.default.taskForm();
      });
    }
  });
};

var _default = handleEditedTask;
exports.default = _default;

},{"./apiManager":25,"./objectBuilder":29,"./printTask":30,"./taskForm":32}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// const taskObj = (taskParam, dateParam) => {
//     return {
//         task: taskParam,
//         date: dateParam,
//         userId: sessionStorage.getItem("userId")
//     }
// }
// export default taskObj
const taskObj = (taskParam, dateParam, isItComplete) => {
  return {
    task: taskParam,
    date: dateParam,
    completed: isItComplete,
    userId: sessionStorage.getItem("userId")
  };
};

var _default = taskObj;
exports.default = _default;

},{}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _printTaskBuilder = _interopRequireDefault(require("./printTaskBuilder"));

var _taskForm = _interopRequireDefault(require("./taskForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const print = () => {
  document.querySelector("#print-task").innerHTML = "";

  _apiManager.default.allTask().then(tasks => {
    tasks.forEach(singleTask => {
      document.querySelector("#print-task").innerHTML += (0, _printTaskBuilder.default)(singleTask);
    });
  });
};

var _default = print;
exports.default = _default;

},{"./apiManager":25,"./printTaskBuilder":31,"./taskForm":32}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// const printTaskBuilder = (tasks) => {
//     return `
//     <div class="print-task" id="task-print">
//     <h1>${tasks.task}</h1>
//     <p>${tasks.date}</p>
//     <button class="task-delete-btn" id="task-delete-${tasks.id}">Delete</button>
//     <button class="edit" id="task-edit-${tasks.id}">Edit</button>
//     </div>
//     `
// }
// export default printTaskBuilder
const printTaskBuilder = tasks => {
  return `
    <div class="print-task" id="task-print">
    <label class ="checkbox">
    <div id= "possibly-${tasks.id}">
    <input class="checkbox" id="checkbox-${tasks.id}" type="checkbox" ${task.completed === true ? "checked" : ""}<h1 class = "check-h1">${tasks.task}</h1>
    </div>
    </label>
    <p>${tasks.date}</p>
    <button class="task-delete-btn" id="task-delete-${tasks.id}">Delete</button>
    <button class="edit" id="task-edit-${tasks.id}">Edit</button>
    </div>  
    `;
};

var _default = printTaskBuilder;
exports.default = _default;

},{}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const form = {
  newTaskForm: () => {
    return `
        <button id="new-task" class ="new-task">New Task</button>
        `;
  },
  taskForm: () => {
    return `
        <div id="new-task-container">
        <button id = "logout" class="logout">Logout</button>
        <form id="task">
            <input id="main-task" placeholder="Enter Task" type="text">
            <input id="complete-date" placeholder="Complete Date" type="date">
        </form>
        <button id="save-task" class="save-task">Save Task</button>
        </div>
        `;
  },
  createTask: () => {
    return `
        <button id="create-new-task" class = "create-new-task">Create Task</button>
        <button id = "logout" class="logout">Logout</button>
        `;
  } // editForm: () => {
  //     return `
  //     <form id="task">
  //         <input id="main-task" placeholder="Enter Task" type="text" value = ``>
  //         <input id="complete-date" placeholder="Complete Date" type="date">
  //     </form>
  //     <button id="save-task" class="save-task">Save Task</button>
  //     `
  // }

};
var _default = form;
exports.default = _default;

},{}]},{},[24])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0NoYXQvQ2hhdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Q29sbGVjdGlvbi5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0TGlzdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0T2JqLmpzIiwiLi4vc2NyaXB0cy9DaGF0L0RlbGV0ZUNoYXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvRWRpdENoYXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvU2F2ZUVkaXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvbG9hZFBhZ2VBZnRlckxvZ2luLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2F1dGgvY2xpY2tzLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2Zvcm1zLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2xvZ2luLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2xvZ291dC5qcyIsIi4uL3NjcmlwdHMvYXV0aC9vYmplY3RCdWlsZGVyLmpzIiwiLi4vc2NyaXB0cy9hdXRoL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvYXBpTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2J1aWxkU2luZ2xlRXZlbnQuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9jbGljay5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2VkaXRGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRPYmplY3QuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9wcmludEFsbEV2ZW50cy5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdGFzay9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy90YXNrL2NsaWNrcy5qcyIsIi4uL3NjcmlwdHMvdGFzay9lZGl0LmpzIiwiLi4vc2NyaXB0cy90YXNrL2hhbmRsZUVkaXQuanMiLCIuLi9zY3JpcHRzL3Rhc2svb2JqZWN0QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvdGFzay9wcmludFRhc2suanMiLCIuLi9zY3JpcHRzL3Rhc2svcHJpbnRUYXNrQnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvdGFzay90YXNrRm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxNQUFNLFNBQVMsR0FBSSxhQUFELElBQW1CO0FBQ2pDLEVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsU0FBUTs0QkFDZ0IsYUFBYSxDQUFDLElBQWQsQ0FBbUIsSUFBSzswQkFDMUIsYUFBYSxDQUFDLE9BQVE7eUNBQ1AsYUFBYSxDQUFDLEVBQUc7NkNBQ2IsYUFBYSxDQUFDLEVBQUc7UUFKMUQ7QUFNRixDQVJGOztlQVNnQixTOzs7Ozs7Ozs7O0FDVGhCLE1BQU0sY0FBYyxHQUFHO0FBQ3JCLEVBQUEsY0FBYyxFQUFHLFlBQUQsSUFBa0I7QUFDaEMsV0FBTyxLQUFLLENBQUMsZ0NBQUQsRUFBbUM7QUFDN0MsTUFBQSxNQUFNLEVBQUUsTUFEcUM7QUFFN0MsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFEVCxPQUZvQztBQUs3QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFlBQWY7QUFMdUMsS0FBbkMsQ0FBWjtBQU9ELEdBVG9CO0FBVXJCLEVBQUEsV0FBVyxFQUFFLE1BQU07QUFDakIsV0FBTyxLQUFLLENBQUMsNkNBQUQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUEsR0FibUI7QUFjckIsRUFBQSxVQUFVLEVBQUcsTUFBRCxJQUFZO0FBQ3RCLFdBQU8sS0FBSyxDQUFFLGtDQUFpQyxNQUFPLEVBQTFDLEVBQTZDO0FBQ3ZELE1BQUEsTUFBTSxFQUFFO0FBRCtDLEtBQTdDLENBQVo7QUFHRCxHQWxCb0I7QUFtQnJCLEVBQUEs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QixHQUF5QixTQUF6QixHQUFxQyxFQUFHLDBCQUF5QixLQUFLLENBQUMsSUFBSzs7O1NBRzNJLEtBQUssQ0FBQyxJQUFLO3NEQUNrQyxLQUFLLENBQUMsRUFBRzt5Q0FDdEIsS0FBSyxDQUFDLEVBQUc7O0tBVDlDO0FBWUgsQ0FiRDs7ZUFlZSxnQjs7Ozs7Ozs7OztBQzNCZixNQUFNLElBQUksR0FBRztBQUNULEVBQUEsV0FBVyxFQUFFLE1BQU07QUFDZixXQUFROztTQUFSO0FBR0gsR0FMUTtBQU1ULEVBQUEsUUFBUSxFQUFFLE1BQU07QUFDWixXQUFROzs7Ozs7Ozs7U0FBUjtBQVVILEdBakJRO0FBa0JULEVBQUEsVUFBVSxFQUFFLE1BQU07QUFDZCxXQUFROzs7U0FBUjtBQUlILEdBdkJRLENBd0JUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7QUFqQ1MsQ0FBYjtlQW9DZSxJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiY29uc3QgYnVpbGRDaGF0ID0gKHNpbmdsZUNoYXRPYmopID0+IHtcclxuICAgIGNvbnNvbGUubG9nKHNpbmdsZUNoYXRPYmopO1xyXG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZm9ybVwiIGlkPVwiY2hhdC1mb3JtXCI+XHJcbiAgICA8aDMgY2xhc3M9XCJjaGF0LXVzZXJcIj4ke3NpbmdsZUNoYXRPYmoudXNlci51c2VyfTo8L2gzPlxyXG4gICAgPHAgaWQ9XCJuZXctbWVzc2FnZVwiPiR7c2luZ2xlQ2hhdE9iai5tZXNzYWdlfTwvcD5cclxuICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LWNoYXRcIiBpZD1cImVkaXQtJHtzaW5nbGVDaGF0T2JqLmlkfVwiPkVkaXQ8L2J1dHRvbj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtY2hhdFwiIGlkPVwiZGVsZXRlLSR7c2luZ2xlQ2hhdE9iai5pZH1cIj5EZWxldGU8L2J1dHRvbj5cclxuIDwvZGl2PmBcclxuIH1cclxuIGV4cG9ydCBkZWZhdWx0IGJ1aWxkQ2hhdDsiLCJjb25zdCBDaGF0Q29sbGVjdGlvbiA9IHtcclxuICBzZW5kTmV3TWVzc2FnZTogKG9iamVjdFRvUG9zdCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg5L21lc3NhZ2VzXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iamVjdFRvUG9zdClcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2V0QWxsQ2hhdHM6ICgpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9tZXNzYWdlcz9fZXhwYW5kPXVzZXJcIilcclxuICAgIC50aGVuKG1lc3NhZ2VzID0+IG1lc3NhZ2VzLmpzb24oKSk7XHJcbiAgIH0sXHJcbiAgZGVsZXRlQ2hhdDogKGNoYXRJZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvbWVzc2FnZXMvJHtjaGF0SWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgIH0pXHJcbiAgfSxcclxuICBnZXRTaW5nbGVDaGF0OiAoY2hhdElkKSA9PiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L21lc3NhZ2VzLyR7Y2hhdElkfWApXHJcbiAgICAudGhlbihyID0+IHIuanNvbigpKSxcclxuXHJcbiAgZWRpdENoYXQ6IChjaGF0SWQsIGNoYXRPYmopID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L21lc3NhZ2VzLyR7Y2hhdElkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY2hhdE9iailcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ2hhdENvbGxlY3Rpb247IiwiLy8gQSBDb250YWN0Rm9ybSBjb21wb25lbnQgdGhhdCwgd2hlbiBmaWxsZWQgb3V0IGFuZCBhIHN1Ym1pdCBidXR0b24gaXMgcHJlc3NlZCwgYWRkcyBhIG5ldyBjb250YWN0IHRvIHN0b3JhZ2UuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuaW1wb3J0IENoYXRDb2xsZWN0aW9uIGZyb20gXCIuL0NoYXRDb2xsZWN0aW9uXCI7XHJcbmltcG9ydCBidWlsZENoYXRPYmplY3QgZnJvbSBcIi4vQ2hhdE9ialwiO1xyXG4vLyBpbXBvcnQgQ2hhdExpc3QgZnJvbSBcIi4vQ2hhdExpc3RcIjtcclxuXHJcbmNvbnN0IENoYXRGb3JtID0ge1xyXG4gIHJlbmRlckNoYXRGb3JtOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJmb3JtXCIgaWQ9XCJmb3JtLW91dHB1dFwiPlxyXG4gICAgICA8aDM+U2VuZCBOZXcgTWVzc2FnZTwvaDM+XHJcbiAgICAgIDxmb3JtIGFjdGlvbj1cIlwiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiICBpZD1cIm5ldy1tZXNzYWdlLWlucHV0XCIgcGxhY2Vob2xkZXI9XCJOZXcgTWVzc2FnZVwiPlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICAgICA8YnV0dG9uIGlkPVwic2VuZC1jaGF0XCI+U2VuZCBNZXNzYWdlPC9idXR0b24+XHJcbiAgICA8L2Rpdj5gO1xyXG4gIH0sXHJcbiAgYWN0aXZhdGVTZW5kQnV0dG9uOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tb3V0cHV0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIGlmIChldmVudC50YXJnZXQuaWQgPT09IFwic2VuZC1jaGF0XCIpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctbWVzc2FnZVwiKS52YWx1ZTtcclxuICAgICAgICBjb25zdCBvYmplY3RUb1Bvc3QgPSBidWlsZENoYXRPYmplY3QobWVzc2FnZVZhbCk7XHJcbiAgICAgICAgQ2hhdENvbGxlY3Rpb24uc2VuZE5ld01lc3NhZ2Uob2JqZWN0VG9Qb3N0KTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoYXRGb3JtOyIsImltcG9ydCBidWlsZENoYXQgZnJvbSBcIi4vQ2hhdC5qc1wiXHJcbmltcG9ydCBDaGF0Q29sbGVjdGlvbiBmcm9tIFwiLi9DaGF0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBDaGF0Rm9ybSBmcm9tIFwiLi9DaGF0Rm9ybS5qc1wiXHJcblxyXG4vLyBBIENvbnRhY3RMaXN0IGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGFsbCBjb250YWN0cy4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXHJcblxyXG5cclxuY29uc3QgQ2hhdExpc3QgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXQtb3V0cHV0XCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKTtcclxuICAgIENoYXRDb2xsZWN0aW9uLmdldEFsbENoYXRzKClcclxuICAgIC50aGVuKGNoYXQgPT4ge1xyXG4gICAgICAgIGNoYXQuZm9yRWFjaChzaW5nbGVDaGF0ID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGF0LW91dHB1dFwiKS5pbm5lckhUTUwgKz0gYnVpbGRDaGF0KHNpbmdsZUNoYXQpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgZGVmYXVsdCBDaGF0TGlzdDtcclxuIiwiY29uc3QgYnVpbGRDaGF0T2JqZWN0ID0gKG1lc3NhZ2VQYXJhbSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWVzc2FnZTogbWVzc2FnZVBhcmFtLFxyXG4gICAgICB1c2VySWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgIH07XHJcbiAgfTtcclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRDaGF0T2JqZWN0OyIsImltcG9ydCBDaGF0Q29sbGVjdGlvbiBmcm9tIFwiLi9DaGF0Q29sbGVjdGlvblwiXHJcbmltcG9ydCBDaGF0TGlzdCBmcm9tIFwiLi9DaGF0TGlzdFwiXHJcblxyXG5jb25zdCBhY3RpdmF0ZURlbGV0ZUJ1dHRvbnMgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXQtb3V0cHV0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZVwiKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkVG9EZWxldGUgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgICAgICBDaGF0Q29sbGVjdGlvbi5kZWxldGVDaGF0KGlkVG9EZWxldGUpXHJcbiAgICAgICAgICAgIC50aGVuKENoYXRMaXN0KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFjdGl2YXRlRGVsZXRlQnV0dG9uczsiLCJpbXBvcnQgQ2hhdENvbGxlY3Rpb24gZnJvbSBcIi4vQ2hhdENvbGxlY3Rpb25cIjtcclxuaW1wb3J0IGhhbmRsZUVkaXRlZENoYXQgZnJvbSBcIi4vU2F2ZUVkaXRcIjtcclxuXHJcblxyXG5jb25zdCBhY3RpdmF0ZUVkaXRCdXR0b24gPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXQtb3V0cHV0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRcIikpe1xyXG4gICAgICAgICAgICBDaGF0Q29sbGVjdGlvbi5nZXRTaW5nbGVDaGF0KGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV0pXHJcbiAgICAgICAgICAgIC50aGVuKChzaW5nbGVDaGF0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1tZXNzYWdlXCIpLnZhbHVlID0gc2luZ2xlQ2hhdC5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kLWNoYXRcIikudGV4dENvbnRlbnQgPSBcIkVkaXQgQ2hhdFwiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kLWNoYXRcIikuaWQ9IGBlZGl0LWNoYXQtJHtzaW5nbGVDaGF0LmlkfWA7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVFZGl0ZWRDaGF0KCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFjdGl2YXRlRWRpdEJ1dHRvbjsiLCJpbXBvcnQgYnVpbGRDaGF0T2JqZWN0IGZyb20gXCIuL0NoYXRPYmpcIjtcclxuaW1wb3J0IENoYXRDb2xsZWN0aW9uIGZyb20gXCIuL0NoYXRDb2xsZWN0aW9uXCI7XHJcbmltcG9ydCBDaGF0TGlzdCBmcm9tIFwiLi9DaGF0TGlzdFwiO1xyXG5pbXBvcnQgQ2hhdEZvcm0gZnJvbSBcIi4vQ2hhdEZvcm1cIjtcclxuXHJcbmNvbnN0IGhhbmRsZUVkaXRlZENoYXQgPSAoKSA9PiB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLW91dHB1dFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5pZC5pbmNsdWRlcyhcImVkaXQtY2hhdFwiKSkge1xyXG4gICAgICAvLyBHZXQgdGhlIHVzZXIncyBpbnB1dFxyXG4gICAgICBjb25zdCBtZXNzYWdlVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctbWVzc2FnZVwiKS52YWx1ZTtcclxuICAgICAgY29uc3QgY2hhdElkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsyXTtcclxuXHJcbiAgICAgIC8vIFR1cm4gdGhlIHVzZXIncyBpbnB1dCBpbnRvIGFuIG9iamVjdFxyXG4gICAgICBjb25zdCBvYmplY3RUb1Bvc3QgPSBidWlsZENoYXRPYmplY3QobWVzc2FnZVZhbCk7XHJcblxyXG4gICAgICBDaGF0Q29sbGVjdGlvbi5lZGl0Q2hhdChjaGF0SWQsIG9iamVjdFRvUG9zdCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgQ2hhdExpc3QoKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tb3V0cHV0XCIpLmlubmVySFRNTCA9IENoYXRGb3JtLmJ1aWxkRm9ybSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhhbmRsZUVkaXRlZENoYXQ7IiwiaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuL0NoYXRMaXN0XCJcclxuaW1wb3J0IENoYXRGb3JtIGZyb20gXCIuL0NoYXRGb3JtXCJcclxuaW1wb3J0IGFjdGl2YXRlRGVsZXRlQnV0dG9ucyBmcm9tIFwiLi9EZWxldGVDaGF0XCJcclxuaW1wb3J0IGFjdGl2YXRlRWRpdEJ1dHRvbnMgZnJvbSBcIi4vRWRpdENoYXRcIjtcclxuXHJcbi8vIFRoaXMgbW9kdWxlIGJ1aWxkcyB0aGUgY2hhdCBsaXN0IHZpZXcgb25jZSBhIHVzZXIgaGFzIGxvZ2dlZCBpblxyXG5jb25zdCBsb2FkUGFnZUFmdGVyTG9naW4gPSAoKSA9PiB7XHJcbi8vQnVpbGRzIENoYXQgRm9ybVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tb3V0cHV0XCIpLmlubmVySFRNTCArPSBDaGF0Rm9ybS5yZW5kZXJDaGF0Rm9ybSgpO1xyXG4vLyBBZGRzIGV2ZW50IGxpc3RlbmVyIHRvIHNlbmQgYnV0dG9uXHJcbkNoYXRGb3JtLmFjdGl2YXRlU2VuZEJ1dHRvbigpO1xyXG4vLyBCdWlsZHMgQ2hhdCBMaXN0XHJcbkNoYXRMaXN0KCk7XHJcblxyXG4vLyBBY3RpdmF0ZSBEZWxldGUgQnV0dG9uc1xyXG5hY3RpdmF0ZURlbGV0ZUJ1dHRvbnMoKTtcclxuLy8gQWN0aXZhdGUgRWRpdCBCdXR0b25zXHJcbmFjdGl2YXRlRWRpdEJ1dHRvbnMoKTtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvYWRQYWdlQWZ0ZXJMb2dpbjsiLCJjb25zdCBhcGlGZXRjaCA9IHtcclxuICAgIGFkZFVzZXI6IChwYXJzZWRVc2VyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg5L3VzZXJzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyc2VkVXNlcilcclxuICAgICAgICB9KS50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgYWxsVXNlcnM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvdXNlcnNcIilcclxuICAgICAgICAudGhlbihyID0+IHIuanNvbigpKVxyXG4gICAgfSxcclxuICAgIHVzZXJMb2dpbjogKHVzZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS91c2Vycz91c2VyPSR7dXNlcn1gKVxyXG4gICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcblxyXG4gICAgIH1cclxufVxyXG4gZXhwb3J0IGRlZmF1bHQgYXBpRmV0Y2g7IiwiaW1wb3J0IHJlZ2lzdGVyIGZyb20gXCIuL3JlZ2lzdGVyXCJcclxuaW1wb3J0IGhhbmRsZUxvZ2luIGZyb20gXCIuL2xvZ2luXCI7XHJcbmltcG9ydCBoYW5kbGVMb2dvdXQgZnJvbSBcIi4vbG9nb3V0XCJcclxuXHJcbmNvbnN0IGNsaWNrcyA9IHtcclxuICAgIHJlZzogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlZ2lzdGVyLnJlZygpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICByZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY3JlYXRlLWJ0blwiKSl7XHJcbiAgICAgICAgICAgICAgICByZWdpc3Rlci5oYW5kbGVSZWdpc3RlcigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGZpcnN0TG9nOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1idG5uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGhhbmRsZUxvZ2luLmZpcnN0TG9nKClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGxvZ2luOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImxvZ2luXCIpKXtcclxuICAgICAgICAgICAgaGFuZGxlTG9naW4ubG9naW4oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBsb2dvdXQ6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibG9nb3V0XCIpKXtcclxuICAgICAgICAgICAgaGFuZGxlTG9nb3V0KClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsaWNrcyIsImNvbnN0IGF1dGhGb3JtID0ge1xyXG4gICAgaG9tZTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cImhvbWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGgxPldlbGNvbWUgdG8gTnV0U2hlbGwgPGltZyBjbGFzcz0gXCJpY29uXCIgc3JjPVwiaHR0cHM6Ly9zdGF0aWMudGhlbm91bnByb2plY3QuY29tL3BuZy8xOTU0MjYtMjAwLnBuZ1wiIGFsdD1cIlwiID48L2gxPlxyXG4gICAgICAgIDxkaXYgaWQgPVwiaG9tZS1idXR0b25cIj5cclxuICAgICAgICA8ZGl2IGlkID1cImxvZ2luLWRpdlwiPjxidXR0b24gaWQ9XCJsb2dpbi1idG5uXCI+TG9naW48L2J1dHRvbj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkID1cInJlZ2lzdGVyXCI+PGJ1dHRvbiBpZD1cInJlZ2lzdGVyLWJ0blwiPlJlZ2lzdGVyPC9idXR0b24+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG5cclxuICAgIH0sXHJcbiAgICByZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cInJlZ2lzdGVyLWF0dGVtcHRcIj5cclxuICAgICAgICAgICAgPGZvcm0gaWQ9XCJyZWdpc3Rlci1mb3JtXCI+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJpbnB1dC1maWVsZHNcIj5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwibmFtZS1yZWdpc3RlclwiIHBsYWNlaG9sZGVyPVwiTmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImVtYWlsLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIHR5cGU9XCJlbWFpbFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJ1c2VybmFtZS1yZWdpc3RlclwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJwYXNzd29yZC1yZWdpc3RlclwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICA8YnV0dG9uIGlkPVwiY3JlYXRlLWJ0blwiIGNsYXNzPVwiY3JlYXRlLWJ0blwiPkNyZWF0ZSBBY2NvdW50PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIGBcclxuXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgaWQ9XCJsb2dpbi1hdHRlbXB0XCI+XHJcbiAgICAgICAgPGZvcm0gaWQ9XCJsb2dpbi1mb3JtXCI+XHJcbiAgICAgICAgPGlucHV0IGlkPVwibG9naW4tbmFtZVwiIHBsYWNlaG9sZGVyPVwiTmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgPGlucHV0IGlkPVwibG9naW4tcGFzc1wiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8YnV0dG9uIGlkID0gXCJqaC1hdHRlbXB0XCIgY2xhc3M9XCJsb2dpblwiPkxvZ2luPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgfSxcclxuICAgIG1haW46ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImxvZ291dEJ1dHRvblwiIGNsYXNzPVwibG9nb3V0XCI+TG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhdXRoRm9ybSIsImltcG9ydCBhcGlGZXRjaCBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGF1dGhGb3JtIGZyb20gXCIuL2Zvcm1zXCI7XHJcbmltcG9ydCBsb2FkUGFnZUFmdGVyTG9naW4gZnJvbSBcIi4uL0NoYXQvbG9hZFBhZ2VBZnRlckxvZ2luXCI7XHJcbmltcG9ydCBmb3JtIGZyb20gXCIuLi90YXNrL3Rhc2tGb3JtXCJcclxuaW1wb3J0IHByaW50IGZyb20gXCIuLi90YXNrL3ByaW50VGFza1wiXHJcbmltcG9ydCBwcmludEFsbEV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL3ByaW50QWxsRXZlbnRzXCJcclxuaW1wb3J0IGNsaWNrV2l6YXJkIGZyb20gXCIuLi9ldmVudHMvY2xpY2tcIlxyXG5cclxuXHJcbmNvbnN0IGhhbmRsZUxvZ2luID0ge1xyXG4gICAgZmlyc3RMb2c6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5sb2dpbigpXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VyVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1uYW1lXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHBhc3NWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLXBhc3NcIikudmFsdWU7XHJcbiAgICAgICAgYXBpRmV0Y2gudXNlckxvZ2luKHVzZXJWYWwpXHJcbiAgICAgICAgICAgIC50aGVuKChwYXJzZWRVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihwYXNzVmFsID09PSBwYXJzZWRVc2VyWzBdLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gYXV0aEZvcm0ubWFpbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IGZvcm0udGFza0Zvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS5jcmVhdGVUYXNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCBwYXJzZWRVc2VyWzBdLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRQYWdlQWZ0ZXJMb2dpbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaW50QWxsRXZlbnRzKClcclxuICAgICAgICAgICAgICAgICAgICBwcmludCgpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV3JvbmcgcGFzc3dvcmQsIHRyeSBhZ2FpbiFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlTG9naW4iLCJpbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vZm9ybXNcIlxyXG4vLyBpbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vYXV0aC9mb3Jtc1wiO1xyXG5pbXBvcnQgY2xpY2tzIGZyb20gXCIuL2NsaWNrc1wiXHJcbmNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcclxuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VySWRcIilcclxuICAgIGNvbnNvbGUubG9nKFwiSGVsbG9cIilcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW50LXRhc2tcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLmhvbWUoKVxyXG4vLyBBdHRlbXB0aW5nIHRvIG1ha2UgaXQgd2hlcmUgYWZ0ZXIgeW91IGxvZ291dCB5b3UgY2FuIGxvZyBiYWNrIGluIC8gdGhvdWdodCBpbXBvcnRpbmcgYWxsIHRoZSBjbGlja3Mgd291bGQgd29yayBidXQgaXQgZG9lc24ndCBsb29rIGxpa2UgaXQgLjopXHJcbiAgICBjbGlja3MucmVnKClcclxuICAgIGNsaWNrcy5yZWdpc3RlcigpXHJcbiAgICBjbGlja3MuZmlyc3RMb2coKVxyXG4gICAgY2xpY2tzLmxvZ291dCgpXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybUNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Q29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5cIikuaW5uZXJIVE1MID0gXCJcIlxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGhhbmRsZUxvZ291dCIsImNvbnN0IHVzZXJPYmogPSAobmFtZVBhcmFtLCBlbWFpbFBhcmFtLCB1c2VyUGFyYW0sIHBhc3NQYXJhbSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgIG5hbWU6IG5hbWVQYXJhbSxcclxuICAgIGVtYWlsOiBlbWFpbFBhcmFtLFxyXG4gICAgdXNlcjogdXNlclBhcmFtLFxyXG4gICAgcGFzc3dvcmQ6IHBhc3NQYXJhbVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlck9iaiIsImltcG9ydCB1c2VyT2JqIGZyb20gXCIuL29iamVjdEJ1aWxkZXJcIlxyXG5pbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9mb3Jtc1wiXHJcbmltcG9ydCBDaGF0TGlzdCBmcm9tIFwiLi4vQ2hhdC9DaGF0TGlzdFwiO1xyXG5pbXBvcnQgcHJpbnRBbGxFdmVudHMgZnJvbSBcIi4uL2V2ZW50cy9wcmludEFsbEV2ZW50c1wiO1xyXG5pbXBvcnQgZm9ybSBmcm9tIFwiLi4vdGFzay90YXNrRm9ybVwiXHJcblxyXG5jb25zdCByZWdpc3RlciA9IHtcclxuXHJcbiAgICByZWc6ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLnJlZ2lzdGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZVJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICBjb25zdCBuYW1lVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lLXJlZ2lzdGVyXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZW1haWxWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsLXJlZ2lzdGVyXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgdXNlclZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWUtcmVnaXN0ZXJcIikudmFsdWU7XHJcbiAgICBjb25zdCBwYXNzVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZC1yZWdpc3RlclwiKS52YWx1ZTtcclxuXHJcbiAgICBjb25zdCB1c2VySW5wdXQgPSB1c2VyT2JqKG5hbWVWYWwsIGVtYWlsVmFsLCB1c2VyVmFsLCBwYXNzVmFsKVxyXG4gICAgYXBpRmV0Y2guYWRkVXNlcih1c2VySW5wdXQpXHJcbiAgICAudGhlbigocGFyc2VkVXNlcikgPT4ge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgcGFyc2VkVXNlci5pZClcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLm1haW4oKVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLnRhc2tGb3JtKCk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpblwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5tYWluKCk7XHJcbiAgICAgICAgcHJpbnRBbGxFdmVudHMoKTtcclxuICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyIiwiaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuL3ByaW50QWxsRXZlbnRzXCI7XHJcbmNvbnN0IGV2ZW50QXBpTWFuYWdlciA9IHtcclxuICAgICAgICBnZXRBbGxFdmVudHM6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9ldmVudHMvP3VzZXJJZD0ke3VzZXJJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihldmVudHMgPT4gZXZlbnRzLmpzb24oKSlcclxuICAgIH0sICBwb3N0TmV3RXZlbnQ6IGV2ZW50T2JqZWN0ID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvZXZlbnRzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnRPYmplY3QpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9LCBkZWxldGVFdmVudDogKGlkVG9EZWxldGUpID0+IHtcclxuICAgICAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L2V2ZW50cy8ke2lkVG9EZWxldGV9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJpbnRBbGxFdmVudHMoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSwgZ2V0U2luZ2xlRXZlbnQ6IChpZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L2V2ZW50cy8ke2lkfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sICBlZGl0RXZlbnQ6IChpZFBhcmFtLCBldmVudFRvRWRpdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L2V2ZW50cy8ke2lkUGFyYW19YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGV2ZW50VG9FZGl0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRBcGlNYW5hZ2VyOyIsImNvbnN0IGJ1aWxkU2luZ2xlRXZlbnQgPSAoc2luZ2xlRXZlbnQpID0+IHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZCA9IFwiZXZlbnRDb250YWluZXItJHtzaW5nbGVFdmVudC5pZH1cIiBjbGFzcyA9IFwiYWxsRGFFdmVudHNcIj5cclxuICAgICAgICAgICAgPGgyPiR7c2luZ2xlRXZlbnQubmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgPHA+RGF0ZTogICR7c2luZ2xlRXZlbnQuZGF0ZX08L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5Mb2NhdGlvbjogICR7c2luZ2xlRXZlbnQubG9jYXRpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdEJ1dHRvblwiIGlkPSBcImVkaXRFdmVudEJ1dHRvbi0ke3NpbmdsZUV2ZW50LmlkfVwiPlVwZGF0ZTwvYnV0dG9uPiA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlQnV0dG9uXCIgaWQ9IFwiZGVsZXRlQnV0dG9uLSR7c2luZ2xlRXZlbnQuaWR9XCI+RGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGhyPmBcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRTaW5nbGVFdmVudDsiLCJpbXBvcnQgZXZlbnRGb3JtQnVpbGRlciBmcm9tIFwiLi9ldmVudEZvcm1cIjtcclxuaW1wb3J0IGJ1aWxkRXZlbnRPYmplY3QgZnJvbSBcIi4vZXZlbnRPYmplY3RcIjtcclxuaW1wb3J0IGV2ZW50QXBpTWFuYWdlciBmcm9tIFwiLi9hcGlNYW5hZ2VyXCI7XHJcbmltcG9ydCBwcmludEFsbEV2ZW50cyBmcm9tIFwiLi9wcmludEFsbEV2ZW50c1wiO1xyXG5pbXBvcnQgZXZlbnRFZGl0Rm9ybUJ1aWxkZXIgZnJvbSBcIi4vZWRpdEZvcm1cIjtcclxuY29uc3QgY2xpY2tXaXphcmQgPSB7XHJcbiAgICBhZGRFdmVudEZ1bmN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJhZGRFdmVudEJ1dHRvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybUNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBldmVudEZvcm1CdWlsZGVyLmV2ZW50Rm9ybUlucHV0cygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfSxcclxuICAgIHNhdmVFdmVudEZ1bmN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzYXZlRXZlbnRCdXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtTmFtZVwiKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtRGF0ZVwiKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybUxvY2F0aW9uXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RXZlbnRPYmplY3QgPSBidWlsZEV2ZW50T2JqZWN0KG5hbWVWYWx1ZSwgZGF0ZVZhbHVlLCBsb2NhdGlvblZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50QXBpTWFuYWdlci5wb3N0TmV3RXZlbnQobmV3RXZlbnRPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocHJpbnRBbGxFdmVudHMpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1OYW1lXCIpLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtRGF0ZVwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybUxvY2F0aW9uXCIpLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZWRpdEJ1dHRvbkZ1bmN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0QnV0dG9uXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnRFZGl0SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLmdldFNpbmdsZUV2ZW50KGV2ZW50RWRpdElkKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVFdmVudEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2V2ZW50Q29udGFpbmVyLSR7ZXZlbnRFZGl0SWR9YCkuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRDb250YWluZXItJHtldmVudEVkaXRJZH1gKS5pbm5lckhUTUwgPSBldmVudEVkaXRGb3JtQnVpbGRlcihzaW5nbGVFdmVudEluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHNhdmVFZGl0QnV0dG9uRnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmVFZGl0ZWRFdmVudFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRlZE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRFZGl0TmFtZS0ke2l0ZW1JZH1gKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRlZERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRFZGl0RGF0ZS0ke2l0ZW1JZH1gKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRlZExvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2V2ZW50RWRpdExvY2F0aW9uLSR7aXRlbUlkfWApLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkRXZlbnRPYmplY3QgPSBidWlsZEV2ZW50T2JqZWN0KGVkaXRlZE5hbWUsIGVkaXRlZERhdGUsIGVkaXRlZExvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50QXBpTWFuYWdlci5lZGl0RXZlbnQoaXRlbUlkLCBlZGl0ZWRFdmVudE9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihwcmludEFsbEV2ZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZUJ1dHRvbkZ1bmN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGVCdXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBldmVudERlbGV0ZUlkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsxXTtcclxuICAgICAgICAgICAgICAgIGV2ZW50QXBpTWFuYWdlci5kZWxldGVFdmVudChldmVudERlbGV0ZUlkKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGlja1dpemFyZDsiLCJjb25zdCBldmVudEVkaXRGb3JtQnVpbGRlciA9IChzaW5nbGVFdmVudCkgPT4ge1xyXG4gICAgcmV0dXJuIGA8Zm9ybSBpZCA9IFwiZXZlbnRGb3JtSW5wdXRzXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50RWRpdE5hbWUtJHtzaW5nbGVFdmVudC5pZH1cIiBwbGFjZWhvbGRlciA9IFwibmFtZVwiIHZhbHVlPVwiJHtzaW5nbGVFdmVudC5uYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEVkaXREYXRlLSR7c2luZ2xlRXZlbnQuaWR9XCIgcGxhY2Vob2xkZXIgPSBcImRhdGVcIiB2YWx1ZT1cIiR7c2luZ2xlRXZlbnQuZGF0ZX1cIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRFZGl0TG9jYXRpb24tJHtzaW5nbGVFdmVudC5pZH1cIiBwbGFjZWhvbGRlciA9IFwibG9jYXRpb25cIiB2YWx1ZT1cIiR7c2luZ2xlRXZlbnQubG9jYXRpb259XCI+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZCA9IFwic2F2ZUVkaXRlZEV2ZW50LSR7c2luZ2xlRXZlbnQuaWR9XCIgY2xhc3MgPSBcInNhdmVFZGl0ZWRFdmVudFwiPlNhdmUgZXZlbnQ8L2J1dHRvbmBcclxufVxyXG5leHBvcnQgZGVmYXVsdCBldmVudEVkaXRGb3JtQnVpbGRlcjsiLCJjb25zdCBldmVudEZvcm1CdWlsZGVyID0gIHtcclxuICAgIGV2ZW50Rm9ybUlucHV0czogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGA8Zm9ybSBpZCA9IFwiZXZlbnRGb3JtSW5wdXRzXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50Rm9ybU5hbWVcIiBwbGFjZWhvbGRlciA9IFwibmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEZvcm1EYXRlXCIgcGxhY2Vob2xkZXIgPSBcImRhdGVcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRGb3JtTG9jYXRpb25cIiBwbGFjZWhvbGRlciA9IFwibG9jYXRpb25cIj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkID0gXCJzYXZlTmV3RXZlbnRcIiBjbGFzcyA9IFwic2F2ZUV2ZW50QnV0dG9uXCI+U2F2ZSBldmVudDwvYnV0dG9uYFxyXG59LFxyXG5cclxuICAgZXZlbnRCdXR0b246IGA8aHI+PGJ1dHRvbiBpZD1cImFkZEV2ZW50QnV0dG9uXCI+QWRkIGFuIEV2ZW50ITwvYnV0dG9uPmBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRGb3JtQnVpbGRlcjsiLCJjb25zdCBidWlsZEV2ZW50T2JqZWN0ID0gKG5hbWVQYXJhbSwgZGF0ZVBhcmFtLCBsb2NhdGlvblBhcmFtKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6IG5hbWVQYXJhbSxcclxuICAgICAgICBkYXRlOiBkYXRlUGFyYW0sXHJcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uUGFyYW0sXHJcbiAgICAgICAgdXNlcklkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRFdmVudE9iamVjdCIsImltcG9ydCBldmVudEFwaU1hbmFnZXIgZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBidWlsZFNpbmdsZUV2ZW50IGZyb20gXCIuL2J1aWxkU2luZ2xlRXZlbnRcIlxyXG5pbXBvcnQgZXZlbnRGb3JtQnVpbGRlciBmcm9tIFwiLi9ldmVudEZvcm1cIjtcclxuY29uc3QgcHJpbnRBbGxFdmVudHMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtQ29udGFpbmVyXCIpLmlubmVySFRNTCA9IGV2ZW50Rm9ybUJ1aWxkZXIuZXZlbnRCdXR0b247XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Q29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBldmVudEFwaU1hbmFnZXIuZ2V0QWxsRXZlbnRzKHVzZXJJZClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZm9yRWFjaChzaW5nbGVFdmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Q29udGFpbmVyXCIpLmlubmVySFRNTCArPSBidWlsZFNpbmdsZUV2ZW50KHNpbmdsZUV2ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH07XHJcbmV4cG9ydCBkZWZhdWx0IHByaW50QWxsRXZlbnRzO1xyXG4iLCJcclxuaW1wb3J0IENoYXRGb3JtIGZyb20gXCIuL0NoYXQvQ2hhdEZvcm0uanNcIjtcclxuaW1wb3J0IGxvYWRQYWdlQWZ0ZXJMb2dpbiBmcm9tIFwiLi9DaGF0L2xvYWRQYWdlQWZ0ZXJMb2dpbi5qc1wiO1xyXG5pbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vYXV0aC9mb3Jtc1wiO1xyXG5pbXBvcnQgY2xpY2tzIGZyb20gXCIuL2F1dGgvY2xpY2tzXCJcclxuaW1wb3J0IGFjdGl2YXRlRWRpdEJ1dHRvbiBmcm9tIFwiLi90YXNrL2VkaXRcIlxyXG5pbXBvcnQgaGFuZGxlRWRpdFRhc2sgZnJvbSBcIi4vdGFzay9oYW5kbGVFZGl0XCJcclxuaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2F1dGgvYXBpTWFuYWdlclwiXHJcbmltcG9ydCBoYW5kbGVMb2dpbiBmcm9tIFwiLi9hdXRoL2xvZ2luXCJcclxuaW1wb3J0IGV2ZW50QXBpTWFuYWdlciBmcm9tIFwiLi9ldmVudHMvYXBpTWFuYWdlclwiXHJcbmltcG9ydCBjbGlja1dpemFyZCBmcm9tIFwiLi9ldmVudHMvY2xpY2tcIlxyXG4vLyBpbXBvcnQgaGFuZGxlTG9naW4gZnJvbSBcIi4vYXV0aC9sb2dpblwiXHJcbi8vIHRhc2sgaW1wb3J0c1xyXG4vLyBpbXBvcnQgZm9ybSBmcm9tIFwiLi90YXNrL3Rhc2tGb3JtXCJcclxuaW1wb3J0IHRhc2tDbGlja3MgZnJvbSBcIi4vdGFzay9jbGlja3NcIlxyXG5cclxuXHJcbi8vIGFwaUZldGNoKCk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5ob21lKCk7XHJcbmNsaWNrcy5yZWcoKVxyXG5jbGlja3MucmVnaXN0ZXIoKVxyXG5jbGlja3MuZmlyc3RMb2coKVxyXG5jbGlja3MubG9naW4oKVxyXG5jbGlja3MubG9nb3V0KClcclxuQ2hhdEZvcm0uYWN0aXZhdGVTZW5kQnV0dG9uKCk7XHJcbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLm5ld1Rhc2tGb3JtKClcclxudGFza0NsaWNrcy5jcmVhdGVUYXNrKCk7XHJcbnRhc2tDbGlja3MubmV3VGFzaygpXHJcbnRhc2tDbGlja3Muc2F2ZVRhc2soKVxyXG50YXNrQ2xpY2tzLmRlbGV0ZVRhc2soKVxyXG5hY3RpdmF0ZUVkaXRCdXR0b24oKVxyXG5oYW5kbGVFZGl0VGFzaygpXHJcbmNsaWNrV2l6YXJkLmFkZEV2ZW50RnVuY3Rpb24oKVxyXG5jbGlja1dpemFyZC5zYXZlRXZlbnRGdW5jdGlvbigpXHJcbmNsaWNrV2l6YXJkLmVkaXRCdXR0b25GdW5jdGlvbigpXHJcbmNsaWNrV2l6YXJkLnNhdmVFZGl0QnV0dG9uRnVuY3Rpb24oKVxyXG5jbGlja1dpemFyZC5kZWxldGVCdXR0b25GdW5jdGlvbigpXHJcbiIsImNvbnN0IGFwaUZldGNoID0ge1xyXG4gICAgc2luZ2xlVGFzazogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS90YXNrc1wiKVxyXG4gICAgICAgICAgICAudGhlbihyID0+IHIuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGFkZHRhc2s6ICh0YXNrcykgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS90YXNrc1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRhc2tzKVxyXG4gICAgICAgIH0pLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhbGxUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlVXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKTtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS90YXNrcz91c2VySWQ9JHthY3RpdmVVc2VySWR9YClcclxuICAgICAgICAudGhlbihyPT5yLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBkZWxldGVUYXNrOiAodGFza0lkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvdGFza3MvJHt0YXNrSWR9YCwge1xyXG4gICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZWRpdFRhc2s6ICh0YXNrSWQsIHVzZXJJbnB1dCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3Rhc2tzLyR7dGFza0lkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VySW5wdXQpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBlZGl0U2luZ2xlOiAodGFza0lkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvdGFza3MvJHt0YXNrSWR9YClcclxuICAgICAgICAudGhlbihyPT5yLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBtYXJrQXNDb21wbGV0ZTogKHRhc2tJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3Rhc2tzLyR7dGFza0lkfWAsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtjb21wbGV0ZWQ6IFwidHJ1ZVwifSlcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgbWFya0FzSW5jb21wbGV0ZTogKHRhc2tJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3Rhc2tzLyR7dGFza0lkfWAsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtjb21wbGV0ZWQ6IFwiZmFsc2VcIn0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpRmV0Y2giLCJpbXBvcnQgZm9ybSBmcm9tIFwiLi90YXNrRm9ybVwiXHJcbmltcG9ydCBwcmludCBmcm9tIFwiLi9wcmludFRhc2tcIlxyXG5pbXBvcnQgaGFuZGxlTG9nb3V0IGZyb20gXCIuLi9hdXRoL2xvZ291dFwiXHJcbmltcG9ydCB0YXNrT2JqIGZyb20gXCIuL29iamVjdEJ1aWxkZXJcIlxyXG5pbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcblxyXG5cclxuY29uc3QgdGFza0NsaWNrcyA9IHtcclxuICAgIGNyZWF0ZVRhc2s6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY3JlYXRlLW5ldy10YXNrXCIpKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLnRhc2tGb3JtKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuICAgIG5ld1Rhc2s6ICgpID0+IHtcclxuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLnRhc2tGb3JtKClcclxuICAgICAgICAvLyAgICAgcHJpbnQoKVxyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZXctdGFza1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IGZvcm0udGFza0Zvcm0oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzYXZlVGFzazogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2F2ZS10YXNrXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLXRhc2tcIikudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRhc2tPYmoodGFza1ZhbCwgZGF0ZVZhbClcclxuICAgICAgICAgICAgICAgIGFwaUZldGNoLmFkZHRhc2sodXNlcklucHV0KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tdGFza1wiKS52YWx1ZSA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2hlY2tib3hcIikpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0lkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsxXTsgLy8gMTRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tJZClcclxuICAgICAgICAgICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjaGVja2JveC0ke3Rhc2tJZH1gKS5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgICAgYXBpRmV0Y2gubWFya0FzQ29tcGxldGUodGFza0lkKVxyXG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcG9zc2libHktJHt0YXNrSWR9YCkuY2xhc3NMaXN0LmFkZChcImNoZWNrZWQtY2xhc3NcIilcclxuICAgICAgICAgICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1wcmludFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBhcGlGZXRjaC5tYXJrQXNJbmNvbXBsZXRlKHRhc2tJZClcclxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Bvc3NpYmx5LSR7dGFza0lkfWApLmNsYXNzTGlzdC5yZW1vdmUoXCJjaGVja2VkLWNsYXNzXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8vIHNhdmVUYXNrOiAoKSA9PiB7XHJcbiAgICAvLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIC8vICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzYXZlLXRhc2tcIikpIHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHRhc2tWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tdGFza1wiKS52YWx1ZTtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IGRhdGVWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXBsZXRlLWRhdGVcIikudmFsdWU7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgdXNlcklucHV0ID0gdGFza09iaih0YXNrVmFsLCBkYXRlVmFsKVxyXG4gICAgLy8gICAgICAgICAgICAgYXBpRmV0Y2guYWRkdGFzayh1c2VySW5wdXQpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBwcmludCgpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi10YXNrXCIpLnZhbHVlID0gXCJcIlxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXBsZXRlLWRhdGVcIikudmFsdWUgPSBcIlwiXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfSxcclxuICAgIGxvZ291dDogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibG9nb3V0XCIpKVxyXG4gICAgICAgICAgICAgICAgaGFuZGxlTG9nb3V0KClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZVRhc2s6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRhc2stZGVsZXRlLWJ0blwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzJdO1xyXG4gICAgICAgICAgICAgICAgYXBpRmV0Y2guZGVsZXRlVGFzayhkZWxldGVJZClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFza0NsaWNrcyIsImltcG9ydCBhcGlGZXRjaCBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGhhbmRsZUVkaXRUYXNrIGZyb20gXCIuL2hhbmRsZUVkaXRcIlxyXG4vLyBmaXJzdCBlZGl0IGNsaWNrXHJcblxyXG5jb25zdCBhY3RpdmF0ZUVkaXRCdXR0b24gPSAoKSA9PiB7XHJcbiAgICAvLyBkZWJ1Z2dlcjtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0XCIpKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIikpXHJcbiAgICAgICAgICAgIGFwaUZldGNoLmVkaXRTaW5nbGUoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsyXSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVUYXNrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLXRhc2tcIikudmFsdWUgPSBzaW5nbGVUYXNrLnRhc2s7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlID0gc2luZ2xlVGFzay5kYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NhdmUtdGFza1wiKS50ZXh0Q29udGVudCA9IFwiRWRpdCBUYXNrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLXRhc2tcIikuY2xhc3NMaXN0LmFkZChcIm5ld0NsYXNzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLXRhc2tcIikuY2xhc3NMaXN0LnJlbW92ZShcInNhdmUtdGFza1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2F2ZS10YXNrXCIpLmlkID0gYGVkaXQtdGFzay0ke3NpbmdsZVRhc2suaWR9YFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhY3RpdmF0ZUVkaXRCdXR0b247IiwiaW1wb3J0IHRhc2tPYmogZnJvbSBcIi4vb2JqZWN0QnVpbGRlclwiO1xyXG5pbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXBpTWFuYWdlclwiO1xyXG5pbXBvcnQgZm9ybSBmcm9tIFwiLi90YXNrRm9ybVwiO1xyXG5pbXBvcnQgcHJpbnQgZnJvbSBcIi4vcHJpbnRUYXNrXCJcclxuLy8gYWZ0ZXIgZWRpdGluZyB0YXNrXHJcblxyXG5jb25zdCBoYW5kbGVFZGl0ZWRUYXNrID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm5ld0NsYXNzXCIpKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi10YXNrXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvYmplY3QgPSB0YXNrT2JqKHRhc2tOYW1lLCB0YXNrRGF0ZSlcclxuICAgICAgICAgICAgYXBpRmV0Y2guZWRpdFRhc2sodGFza0lkLCBvYmplY3QpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICBwcmludCgpXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBmb3JtLnRhc2tGb3JtKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGhhbmRsZUVkaXRlZFRhc2siLCIvLyBjb25zdCB0YXNrT2JqID0gKHRhc2tQYXJhbSwgZGF0ZVBhcmFtKSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIHRhc2s6IHRhc2tQYXJhbSxcclxuLy8gICAgICAgICBkYXRlOiBkYXRlUGFyYW0sXHJcbi8vICAgICAgICAgdXNlcklkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IHRhc2tPYmpcclxuY29uc3QgdGFza09iaiA9ICh0YXNrUGFyYW0sIGRhdGVQYXJhbSwgaXNJdENvbXBsZXRlKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhc2s6IHRhc2tQYXJhbSxcclxuICAgICAgICBkYXRlOiBkYXRlUGFyYW0sXHJcbiAgICAgICAgY29tcGxldGVkOiBpc0l0Q29tcGxldGUsXHJcbiAgICAgICAgdXNlcklkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tPYmoiLCJpbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBwcmludFRhc2tCdWlsZGVyIGZyb20gXCIuL3ByaW50VGFza0J1aWxkZXJcIlxyXG5pbXBvcnQgZm9ybSBmcm9tIFwiLi90YXNrRm9ybVwiXHJcblxyXG5jb25zdCBwcmludCA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpbnQtdGFza1wiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBhcGlGZXRjaC5hbGxUYXNrKClcclxuICAgIC50aGVuKHRhc2tzID0+IHtcclxuICAgICAgICB0YXNrcy5mb3JFYWNoKHNpbmdsZVRhc2sgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW50LXRhc2tcIikuaW5uZXJIVE1MICs9IHByaW50VGFza0J1aWxkZXIoc2luZ2xlVGFzaylcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnQiLCIvLyBjb25zdCBwcmludFRhc2tCdWlsZGVyID0gKHRhc2tzKSA9PiB7XHJcbi8vICAgICByZXR1cm4gYFxyXG4vLyAgICAgPGRpdiBjbGFzcz1cInByaW50LXRhc2tcIiBpZD1cInRhc2stcHJpbnRcIj5cclxuLy8gICAgIDxoMT4ke3Rhc2tzLnRhc2t9PC9oMT5cclxuLy8gICAgIDxwPiR7dGFza3MuZGF0ZX08L3A+XHJcbi8vICAgICA8YnV0dG9uIGNsYXNzPVwidGFzay1kZWxldGUtYnRuXCIgaWQ9XCJ0YXNrLWRlbGV0ZS0ke3Rhc2tzLmlkfVwiPkRlbGV0ZTwvYnV0dG9uPlxyXG4vLyAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXRcIiBpZD1cInRhc2stZWRpdC0ke3Rhc2tzLmlkfVwiPkVkaXQ8L2J1dHRvbj5cclxuLy8gICAgIDwvZGl2PlxyXG4vLyAgICAgYFxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBwcmludFRhc2tCdWlsZGVyXHJcbmNvbnN0IHByaW50VGFza0J1aWxkZXIgPSAodGFza3MpID0+IHtcclxuICAgIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwicHJpbnQtdGFza1wiIGlkPVwidGFzay1wcmludFwiPlxyXG4gICAgPGxhYmVsIGNsYXNzID1cImNoZWNrYm94XCI+XHJcbiAgICA8ZGl2IGlkPSBcInBvc3NpYmx5LSR7dGFza3MuaWR9XCI+XHJcbiAgICA8aW5wdXQgY2xhc3M9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3gtJHt0YXNrcy5pZH1cIiB0eXBlPVwiY2hlY2tib3hcIiAke3Rhc2suY29tcGxldGVkID09PSB0cnVlPyBcImNoZWNrZWRcIiA6IFwiXCJ9PGgxIGNsYXNzID0gXCJjaGVjay1oMVwiPiR7dGFza3MudGFza308L2gxPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8L2xhYmVsPlxyXG4gICAgPHA+JHt0YXNrcy5kYXRlfTwvcD5cclxuICAgIDxidXR0b24gY2xhc3M9XCJ0YXNrLWRlbGV0ZS1idG5cIiBpZD1cInRhc2stZGVsZXRlLSR7dGFza3MuaWR9XCI+RGVsZXRlPC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdFwiIGlkPVwidGFzay1lZGl0LSR7dGFza3MuaWR9XCI+RWRpdDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+ICBcclxuICAgIGBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRUYXNrQnVpbGRlciIsImNvbnN0IGZvcm0gPSB7XHJcbiAgICBuZXdUYXNrRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cIm5ldy10YXNrXCIgY2xhc3MgPVwibmV3LXRhc2tcIj5OZXcgVGFzazwvYnV0dG9uPlxyXG4gICAgICAgIGBcclxuICAgIH0sXHJcbiAgICB0YXNrRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cIm5ldy10YXNrLWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImxvZ291dFwiIGNsYXNzPVwibG9nb3V0XCI+TG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgPGZvcm0gaWQ9XCJ0YXNrXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cIm1haW4tdGFza1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgVGFza1wiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNvbXBsZXRlLWRhdGVcIiBwbGFjZWhvbGRlcj1cIkNvbXBsZXRlIERhdGVcIiB0eXBlPVwiZGF0ZVwiPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8YnV0dG9uIGlkPVwic2F2ZS10YXNrXCIgY2xhc3M9XCJzYXZlLXRhc2tcIj5TYXZlIFRhc2s8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlVGFzazogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImNyZWF0ZS1uZXctdGFza1wiIGNsYXNzID0gXCJjcmVhdGUtbmV3LXRhc2tcIj5DcmVhdGUgVGFzazwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImxvZ291dFwiIGNsYXNzPVwibG9nb3V0XCI+TG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG4gICAgLy8gZWRpdEZvcm06ICgpID0+IHtcclxuICAgIC8vICAgICByZXR1cm4gYFxyXG4gICAgLy8gICAgIDxmb3JtIGlkPVwidGFza1wiPlxyXG4gICAgLy8gICAgICAgICA8aW5wdXQgaWQ9XCJtYWluLXRhc2tcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFRhc2tcIiB0eXBlPVwidGV4dFwiIHZhbHVlID0gYGA+XHJcbiAgICAvLyAgICAgICAgIDxpbnB1dCBpZD1cImNvbXBsZXRlLWRhdGVcIiBwbGFjZWhvbGRlcj1cIkNvbXBsZXRlIERhdGVcIiB0eXBlPVwiZGF0ZVwiPlxyXG4gICAgLy8gICAgIDwvZm9ybT5cclxuICAgIC8vICAgICA8YnV0dG9uIGlkPVwic2F2ZS10YXNrXCIgY2xhc3M9XCJzYXZlLXRhc2tcIj5TYXZlIFRhc2s8L2J1dHRvbj5cclxuICAgIC8vICAgICBgXHJcblxyXG4gICAgLy8gfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtIl19
