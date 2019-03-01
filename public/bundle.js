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
    return fetch("http://localhost:8087/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objectToPost)
    });
  },
  getAllChats: () => {
    return fetch("http://localhost:8087/messages?_expand=user").then(messages => messages.json());
  },
  deleteChat: chatId => {
    return fetch(`http://localhost:8087/messages/${chatId}`, {
      method: "DELETE"
    });
  },
  getSingleChat: chatId => fetch(`http://localhost:8087/messages/${chatId}`).then(r => r.json()),
  editChat: (chatId, chatObj) => {
    return fetch(`http://localhost:8087/messages/${chatId}`, {
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
  document.querySelector("#form-output").innerHTML += _ChatForm.default.renderChatForm(); // Builds Chat List

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
    return fetch("http://localhost:8087/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parsedUser)
    }).then(r => r.json());
  },
  allUsers: () => {
    return fetch("http://localhost:8087/users").then(r => r.json());
  },
  userLogin: user => {
    return fetch(`http://localhost:8087/users?user=${user}`).then(r => r.json());
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
    return fetch(`http://localhost:8087/events/?userId=${userId}`).then(events => events.json());
  },
  postNewEvent: eventObject => {
    return fetch("http://localhost:8087/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventObject)
    });
  },
  deleteEvent: idToDelete => {
    fetch(`http://localhost:8087/events/${idToDelete}`, {
      method: "DELETE"
    }).then(() => {
      (0, _printAllEvents.default)();
    });
  },
  getSingleEvent: id => {
    return fetch(`http://localhost:8087/events/${id}`).then(response => response.json());
  },
  editEvent: (idParam, eventToEdit) => {
    return fetch(`http://localhost:8087/events/${idParam}`, {
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
    return fetch("http://localhost:8087/tasks").then(r => r.json());
  },
  addtask: tasks => {
    return fetch("http://localhost:8087/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tasks)
    }).then(r => r.json());
  },
  allTask: () => {
    const activeUserId = sessionStorage.getItem("userId");
    return fetch(`http://localhost:8087/tasks?userId=${activeUserId}`).then(r => r.json());
  },
  deleteTask: taskId => {
    return fetch(`http://localhost:8087/tasks/${taskId}`, {
      method: "DELETE"
    });
  },
  editTask: (taskId, userInput) => {
    return fetch(`http://localhost:8087/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInput)
    });
  },
  editSingle: taskId => {
    return fetch(`http://localhost:8087tasks/${taskId}`).then(r => r.json());
  },
  markAsComplete: taskId => {
    return fetch(`http://localhost:8087/tasks/${taskId}`, {
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
    return fetch(`http://localhost:8087/tasks/${taskId}`, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0NoYXQvQ2hhdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Q29sbGVjdGlvbi5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0TGlzdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0T2JqLmpzIiwiLi4vc2NyaXB0cy9DaGF0L0RlbGV0ZUNoYXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvRWRpdENoYXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvU2F2ZUVkaXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvbG9hZFBhZ2VBZnRlckxvZ2luLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2F1dGgvY2xpY2tzLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2Zvcm1zLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2xvZ2luLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2xvZ291dC5qcyIsIi4uL3NjcmlwdHMvYXV0aC9vYmplY3RCdWlsZGVyLmpzIiwiLi4vc2NyaXB0cy9hdXRoL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvYXBpTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2J1aWxkU2luZ2xlRXZlbnQuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9jbGljay5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2VkaXRGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRPYmplY3QuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9wcmludEFsbEV2ZW50cy5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdGFzay9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy90YXNrL2NsaWNrcy5qcyIsIi4uL3NjcmlwdHMvdGFzay9lZGl0LmpzIiwiLi4vc2NyaXB0cy90YXNrL2hhbmRsZUVkaXQuanMiLCIuLi9zY3JpcHRzL3Rhc2svb2JqZWN0QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvdGFzay9wcmludFRhc2suanMiLCIuLi9zY3JpcHRzL3Rhc2svcHJpbnRUYXNrQnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvdGFzay90YXNrRm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxNQUFNLFNBQVMsR0FBSSxhQUFELElBQW1CO0FBQ2pDLEVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsU0FBUTs0QkFDZ0IsYUFBYSxDQUFDLElBQWQsQ0FBbUIsSUFBSzswQkFDMUIsYUFBYSxDQUFDLE9BQVE7eUNBQ1AsYUFBYSxDQUFDLEVBQUc7NkNBQ2IsYUFBYSxDQUFDLEVBQUc7UUFKMUQ7QUFNRixDQVJGOztlQVNnQixTOzs7Ozs7Ozs7O0FDVGhCLE1BQU0sY0FBYyxHQUFHO0FBQ3JCLEVBQUEsY0FBYyxFQUFHLFlBQUQsSUFBa0I7QUFDaEMsV0FBTyxLQUFLLENBQUMsZ0NBQUQsRUFBbUM7QUFDN0MsTUFBQSxNQUFNLEVBQUUsTUFEcUM7QUFFN0MsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFEVCxPQUZvQztBQUs3QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFlBQWY7QUFMdUMsS0FBbkMsQ0FBWjtBQU9ELEdBVG9CO0FBVXJCLEVBQUEsV0FBVyxFQUFFLE1BQU07QUFDakIsV0FBTyxLQUFLLENBQUMsNkNBQUQsQ0FBTCxDQUNOLElBRE0sQ0FDRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEWCxDQUFQO0FBRUEsR0FibUI7QUFjckIsRUFBQSxVQUFVLEVBQUcsTUFBRCxJQUFZO0FBQ3RCLFdBQU8sS0FBSyxDQUFFLGtDQUFpQyxNQUFPLEVBQTFDLEVBQTZDO0FBQ3ZELE1BQUEsTUFBTSxFQUFFO0FBRCtDLEtBQTdDLENBQVo7QUFHRCxHQWxCb0I7QUFtQnJCLEVBQUEs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LEtBQUssQ0FBQyxJQUFLOzs7U0FHM0ksS0FBSyxDQUFDLElBQUs7c0RBQ2tDLEtBQUssQ0FBQyxFQUFHO3lDQUN0QixLQUFLLENBQUMsRUFBRzs7S0FUOUM7QUFZSCxDQWJEOztlQWVlLGdCOzs7Ozs7Ozs7O0FDM0JmLE1BQU0sSUFBSSxHQUFHO0FBQ1QsRUFBQSxXQUFXLEVBQUUsTUFBTTtBQUNmLFdBQVE7O1NBQVI7QUFHSCxHQUxRO0FBTVQsRUFBQSxRQUFRLEVBQUUsTUFBTTtBQUNaLFdBQVE7Ozs7Ozs7OztTQUFSO0FBVUgsR0FqQlE7QUFrQlQsRUFBQSxVQUFVLEVBQUUsTUFBTTtBQUNkLFdBQVE7OztTQUFSO0FBSUgsR0F2QlEsQ0F3QlQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQWpDUyxDQUFiO2VBb0NlLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBidWlsZENoYXQgPSAoc2luZ2xlQ2hhdE9iaikgPT4ge1xyXG4gICAgY29uc29sZS5sb2coc2luZ2xlQ2hhdE9iaik7XHJcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJmb3JtXCIgaWQ9XCJjaGF0LWZvcm1cIj5cclxuICAgIDxoMyBjbGFzcz1cImNoYXQtdXNlclwiPiR7c2luZ2xlQ2hhdE9iai51c2VyLnVzZXJ9OjwvaDM+XHJcbiAgICA8cCBpZD1cIm5ldy1tZXNzYWdlXCI+JHtzaW5nbGVDaGF0T2JqLm1lc3NhZ2V9PC9wPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtY2hhdFwiIGlkPVwiZWRpdC0ke3NpbmdsZUNoYXRPYmouaWR9XCI+RWRpdDwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImRlbGV0ZS1jaGF0XCIgaWQ9XCJkZWxldGUtJHtzaW5nbGVDaGF0T2JqLmlkfVwiPkRlbGV0ZTwvYnV0dG9uPlxyXG4gPC9kaXY+YFxyXG4gfVxyXG4gZXhwb3J0IGRlZmF1bHQgYnVpbGRDaGF0OyIsImNvbnN0IENoYXRDb2xsZWN0aW9uID0ge1xyXG4gIHNlbmROZXdNZXNzYWdlOiAob2JqZWN0VG9Qb3N0KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODcvbWVzc2FnZXNcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0VG9Qb3N0KVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRBbGxDaGF0czogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg3L21lc3NhZ2VzP19leHBhbmQ9dXNlclwiKVxyXG4gICAgLnRoZW4obWVzc2FnZXMgPT4gbWVzc2FnZXMuanNvbigpKTtcclxuICAgfSxcclxuICBkZWxldGVDaGF0OiAoY2hhdElkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4Ny9tZXNzYWdlcy8ke2NoYXRJZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgfSlcclxuICB9LFxyXG4gIGdldFNpbmdsZUNoYXQ6IChjaGF0SWQpID0+IGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODcvbWVzc2FnZXMvJHtjaGF0SWR9YClcclxuICAgIC50aGVuKHIgPT4gci5qc29uKCkpLFxyXG5cclxuICBlZGl0Q2hhdDogKGNoYXRJZCwgY2hhdE9iaikgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODcvbWVzc2FnZXMvJHtjaGF0SWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjaGF0T2JqKVxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBDaGF0Q29sbGVjdGlvbjsiLCIvLyBBIENvbnRhY3RGb3JtIGNvbXBvbmVudCB0aGF0LCB3aGVuIGZpbGxlZCBvdXQgYW5kIGEgc3VibWl0IGJ1dHRvbiBpcyBwcmVzc2VkLCBhZGRzIGEgbmV3IGNvbnRhY3QgdG8gc3RvcmFnZS4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxyXG5pbXBvcnQgQ2hhdENvbGxlY3Rpb24gZnJvbSBcIi4vQ2hhdENvbGxlY3Rpb25cIjtcclxuaW1wb3J0IGJ1aWxkQ2hhdE9iamVjdCBmcm9tIFwiLi9DaGF0T2JqXCI7XHJcbi8vIGltcG9ydCBDaGF0TGlzdCBmcm9tIFwiLi9DaGF0TGlzdFwiO1xyXG5cclxuY29uc3QgQ2hhdEZvcm0gPSB7XHJcbiAgcmVuZGVyQ2hhdEZvcm06ICgpID0+IHtcclxuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZvcm1cIiBpZD1cImZvcm0tb3V0cHV0XCI+XHJcbiAgICAgIDxoMz5TZW5kIE5ldyBNZXNzYWdlPC9oMz5cclxuICAgICAgPGZvcm0gYWN0aW9uPVwiXCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgIGlkPVwibmV3LW1lc3NhZ2UtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIk5ldyBNZXNzYWdlXCI+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICAgIDxidXR0b24gaWQ9XCJzZW5kLWNoYXRcIj5TZW5kIE1lc3NhZ2U8L2J1dHRvbj5cclxuICAgIDwvZGl2PmA7XHJcbiAgfSxcclxuICBhY3RpdmF0ZVNlbmRCdXR0b246ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJzZW5kLWNoYXRcIikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1tZXNzYWdlXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IG9iamVjdFRvUG9zdCA9IGJ1aWxkQ2hhdE9iamVjdChtZXNzYWdlVmFsKTtcclxuICAgICAgICBDaGF0Q29sbGVjdGlvbi5zZW5kTmV3TWVzc2FnZShvYmplY3RUb1Bvc3QpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhdEZvcm07IiwiaW1wb3J0IGJ1aWxkQ2hhdCBmcm9tIFwiLi9DaGF0LmpzXCJcclxuaW1wb3J0IENoYXRDb2xsZWN0aW9uIGZyb20gXCIuL0NoYXRDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IENoYXRGb3JtIGZyb20gXCIuL0NoYXRGb3JtLmpzXCJcclxuXHJcbi8vIEEgQ29udGFjdExpc3QgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYWxsIGNvbnRhY3RzLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuXHJcblxyXG5jb25zdCBDaGF0TGlzdCA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdC1vdXRwdXRcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpO1xyXG4gICAgQ2hhdENvbGxlY3Rpb24uZ2V0QWxsQ2hhdHMoKVxyXG4gICAgLnRoZW4oY2hhdCA9PiB7XHJcbiAgICAgICAgY2hhdC5mb3JFYWNoKHNpbmdsZUNoYXQgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXQtb3V0cHV0XCIpLmlubmVySFRNTCArPSBidWlsZENoYXQoc2luZ2xlQ2hhdCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IENoYXRMaXN0O1xyXG4iLCJjb25zdCBidWlsZENoYXRPYmplY3QgPSAobWVzc2FnZVBhcmFtKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlUGFyYW0sXHJcbiAgICAgIHVzZXJJZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgfTtcclxuICB9O1xyXG5leHBvcnQgZGVmYXVsdCBidWlsZENoYXRPYmplY3Q7IiwiaW1wb3J0IENoYXRDb2xsZWN0aW9uIGZyb20gXCIuL0NoYXRDb2xsZWN0aW9uXCJcclxuaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuL0NoYXRMaXN0XCJcclxuXHJcbmNvbnN0IGFjdGl2YXRlRGVsZXRlQnV0dG9ucyA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdC1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlXCIpKXtcclxuICAgICAgICAgICAgY29uc3QgaWRUb0RlbGV0ZSA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07XHJcbiAgICAgICAgICAgIENoYXRDb2xsZWN0aW9uLmRlbGV0ZUNoYXQoaWRUb0RlbGV0ZSlcclxuICAgICAgICAgICAgLnRoZW4oQ2hhdExpc3QpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZhdGVEZWxldGVCdXR0b25zOyIsImltcG9ydCBDaGF0Q29sbGVjdGlvbiBmcm9tIFwiLi9DaGF0Q29sbGVjdGlvblwiO1xyXG5pbXBvcnQgaGFuZGxlRWRpdGVkQ2hhdCBmcm9tIFwiLi9TYXZlRWRpdFwiO1xyXG5cclxuXHJcbmNvbnN0IGFjdGl2YXRlRWRpdEJ1dHRvbiA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdC1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdFwiKSl7XHJcbiAgICAgICAgICAgIENoYXRDb2xsZWN0aW9uLmdldFNpbmdsZUNoYXQoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsxXSlcclxuICAgICAgICAgICAgLnRoZW4oKHNpbmdsZUNoYXQpID0+IHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LW1lc3NhZ2VcIikudmFsdWUgPSBzaW5nbGVDaGF0Lm1lc3NhZ2U7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbmQtY2hhdFwiKS50ZXh0Q29udGVudCA9IFwiRWRpdCBDaGF0XCI7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlbmQtY2hhdFwiKS5pZD0gYGVkaXQtY2hhdC0ke3NpbmdsZUNoYXQuaWR9YDtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVkaXRlZENoYXQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZhdGVFZGl0QnV0dG9uOyIsImltcG9ydCBidWlsZENoYXRPYmplY3QgZnJvbSBcIi4vQ2hhdE9ialwiO1xyXG5pbXBvcnQgQ2hhdENvbGxlY3Rpb24gZnJvbSBcIi4vQ2hhdENvbGxlY3Rpb25cIjtcclxuaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuL0NoYXRMaXN0XCI7XHJcbmltcG9ydCBDaGF0Rm9ybSBmcm9tIFwiLi9DaGF0Rm9ybVwiO1xyXG5cclxuY29uc3QgaGFuZGxlRWRpdGVkQ2hhdCA9ICgpID0+IHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tb3V0cHV0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmlkLmluY2x1ZGVzKFwiZWRpdC1jaGF0XCIpKSB7XHJcbiAgICAgIC8vIEdldCB0aGUgdXNlcidzIGlucHV0XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2VWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1tZXNzYWdlXCIpLnZhbHVlO1xyXG4gICAgICBjb25zdCBjaGF0SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzJdO1xyXG5cclxuICAgICAgLy8gVHVybiB0aGUgdXNlcidzIGlucHV0IGludG8gYW4gb2JqZWN0XHJcbiAgICAgIGNvbnN0IG9iamVjdFRvUG9zdCA9IGJ1aWxkQ2hhdE9iamVjdChtZXNzYWdlVmFsKTtcclxuXHJcbiAgICAgIENoYXRDb2xsZWN0aW9uLmVkaXRDaGF0KGNoYXRJZCwgb2JqZWN0VG9Qb3N0KS50aGVuKCgpID0+IHtcclxuICAgICAgICBDaGF0TGlzdCgpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuaW5uZXJIVE1MID0gQ2hhdEZvcm0uYnVpbGRGb3JtKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRWRpdGVkQ2hhdDsiLCJpbXBvcnQgQ2hhdExpc3QgZnJvbSBcIi4vQ2hhdExpc3RcIlxyXG5pbXBvcnQgQ2hhdEZvcm0gZnJvbSBcIi4vQ2hhdEZvcm1cIlxyXG5pbXBvcnQgYWN0aXZhdGVEZWxldGVCdXR0b25zIGZyb20gXCIuL0RlbGV0ZUNoYXRcIlxyXG5pbXBvcnQgYWN0aXZhdGVFZGl0QnV0dG9ucyBmcm9tIFwiLi9FZGl0Q2hhdFwiO1xyXG5cclxuLy8gVGhpcyBtb2R1bGUgYnVpbGRzIHRoZSBjaGF0IGxpc3QgdmlldyBvbmNlIGEgdXNlciBoYXMgbG9nZ2VkIGluXHJcbmNvbnN0IGxvYWRQYWdlQWZ0ZXJMb2dpbiA9ICgpID0+IHtcclxuLy9CdWlsZHMgQ2hhdCBGb3JtXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuaW5uZXJIVE1MICs9IENoYXRGb3JtLnJlbmRlckNoYXRGb3JtKCk7XHJcbi8vIEJ1aWxkcyBDaGF0IExpc3RcclxuQ2hhdExpc3QoKTtcclxuXHJcbi8vIEFjdGl2YXRlIERlbGV0ZSBCdXR0b25zXHJcbmFjdGl2YXRlRGVsZXRlQnV0dG9ucygpO1xyXG4vLyBBY3RpdmF0ZSBFZGl0IEJ1dHRvbnNcclxuYWN0aXZhdGVFZGl0QnV0dG9ucygpO1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9hZFBhZ2VBZnRlckxvZ2luOyIsImNvbnN0IGFwaUZldGNoID0ge1xyXG4gICAgYWRkVXNlcjogKHBhcnNlZFVzZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODcvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJzZWRVc2VyKVxyXG4gICAgICAgIH0pLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhbGxVc2VyczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4Ny91c2Vyc1wiKVxyXG4gICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgdXNlckxvZ2luOiAodXNlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg3L3VzZXJzP3VzZXI9JHt1c2VyfWApXHJcbiAgICAgICAgLnRoZW4ociA9PiByLmpzb24oKSlcclxuXHJcbiAgICAgfVxyXG59XHJcbiBleHBvcnQgZGVmYXVsdCBhcGlGZXRjaDsiLCJpbXBvcnQgcmVnaXN0ZXIgZnJvbSBcIi4vcmVnaXN0ZXJcIlxyXG5pbXBvcnQgaGFuZGxlTG9naW4gZnJvbSBcIi4vbG9naW5cIjtcclxuaW1wb3J0IGhhbmRsZUxvZ291dCBmcm9tIFwiLi9sb2dvdXRcIlxyXG5cclxuY29uc3QgY2xpY2tzID0ge1xyXG4gICAgcmVnOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlci1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgcmVnaXN0ZXIucmVnKClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjcmVhdGUtYnRuXCIpKXtcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyLmhhbmRsZVJlZ2lzdGVyKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZmlyc3RMb2c6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWJ0bm5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaGFuZGxlTG9naW4uZmlyc3RMb2coKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibG9naW5cIikpe1xyXG4gICAgICAgICAgICBoYW5kbGVMb2dpbi5sb2dpbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGxvZ291dDogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJsb2dvdXRcIikpe1xyXG4gICAgICAgICAgICBoYW5kbGVMb2dvdXQoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xpY2tzIiwiY29uc3QgYXV0aEZvcm0gPSB7XHJcbiAgICBob21lOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkPVwiaG9tZS1jb250YWluZXJcIj5cclxuICAgICAgICA8aDE+V2VsY29tZSB0byBOdXRTaGVsbCA8aW1nIGNsYXNzPSBcImljb25cIiBzcmM9XCJodHRwczovL3N0YXRpYy50aGVub3VucHJvamVjdC5jb20vcG5nLzE5NTQyNi0yMDAucG5nXCIgYWx0PVwiXCIgPjwvaDE+XHJcbiAgICAgICAgPGRpdiBpZCA9XCJob21lLWJ1dHRvblwiPlxyXG4gICAgICAgIDxkaXYgaWQgPVwibG9naW4tZGl2XCI+PGJ1dHRvbiBpZD1cImxvZ2luLWJ0bm5cIj5Mb2dpbjwvYnV0dG9uPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQgPVwicmVnaXN0ZXJcIj48YnV0dG9uIGlkPVwicmVnaXN0ZXItYnRuXCI+UmVnaXN0ZXI8L2J1dHRvbj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcblxyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkPVwicmVnaXN0ZXItYXR0ZW1wdFwiPlxyXG4gICAgICAgICAgICA8Zm9ybSBpZD1cInJlZ2lzdGVyLWZvcm1cIj5cclxuICAgICAgICAgICAgPGRpdiBpZD1cImlucHV0LWZpZWxkc1wiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJuYW1lLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwiZW1haWwtcmVnaXN0ZXJcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgdHlwZT1cImVtYWlsXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJuYW1lLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInBhc3N3b3JkLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgIDxidXR0b24gaWQ9XCJjcmVhdGUtYnRuXCIgY2xhc3M9XCJjcmVhdGUtYnRuXCI+Q3JlYXRlIEFjY291bnQ8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgYFxyXG5cclxuICAgIH0sXHJcbiAgICBsb2dpbjogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cImxvZ2luLWF0dGVtcHRcIj5cclxuICAgICAgICA8Zm9ybSBpZD1cImxvZ2luLWZvcm1cIj5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJsb2dpbi1uYW1lXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJsb2dpbi1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImpoLWF0dGVtcHRcIiBjbGFzcz1cImxvZ2luXCI+TG9naW48L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9LFxyXG4gICAgbWFpbjogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGJ1dHRvbiBpZCA9IFwibG9nb3V0QnV0dG9uXCIgY2xhc3M9XCJsb2dvdXRcIj5Mb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGF1dGhGb3JtIiwiaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5pbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vZm9ybXNcIjtcclxuaW1wb3J0IGxvYWRQYWdlQWZ0ZXJMb2dpbiBmcm9tIFwiLi4vQ2hhdC9sb2FkUGFnZUFmdGVyTG9naW5cIjtcclxuaW1wb3J0IGZvcm0gZnJvbSBcIi4uL3Rhc2svdGFza0Zvcm1cIlxyXG5pbXBvcnQgcHJpbnQgZnJvbSBcIi4uL3Rhc2svcHJpbnRUYXNrXCJcclxuaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuLi9ldmVudHMvcHJpbnRBbGxFdmVudHNcIlxyXG5pbXBvcnQgY2xpY2tXaXphcmQgZnJvbSBcIi4uL2V2ZW50cy9jbGlja1wiXHJcblxyXG5cclxuY29uc3QgaGFuZGxlTG9naW4gPSB7XHJcbiAgICBmaXJzdExvZzogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLmxvZ2luKClcclxuICAgIH0sXHJcbiAgICBsb2dpbjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLW5hbWVcIikudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGFzc1ZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tcGFzc1wiKS52YWx1ZTtcclxuICAgICAgICBhcGlGZXRjaC51c2VyTG9naW4odXNlclZhbClcclxuICAgICAgICAgICAgLnRoZW4oKHBhcnNlZFVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHBhc3NWYWwgPT09IHBhcnNlZFVzZXJbMF0ucGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5tYWluKClcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS50YXNrRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLmNyZWF0ZVRhc2soKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIHBhcnNlZFVzZXJbMF0uaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZFBhZ2VBZnRlckxvZ2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbnRBbGxFdmVudHMoKVxyXG4gICAgICAgICAgICAgICAgICAgIHByaW50KClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXcm9uZyBwYXNzd29yZCwgdHJ5IGFnYWluIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVMb2dpbiIsImltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9mb3Jtc1wiXHJcbi8vIGltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9hdXRoL2Zvcm1zXCI7XHJcbmltcG9ydCBjbGlja3MgZnJvbSBcIi4vY2xpY2tzXCJcclxuY29uc3QgaGFuZGxlTG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJJZFwiKVxyXG4gICAgY29uc29sZS5sb2coXCJIZWxsb1wiKVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpbnQtdGFza1wiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gYXV0aEZvcm0uaG9tZSgpXHJcbi8vIEF0dGVtcHRpbmcgdG8gbWFrZSBpdCB3aGVyZSBhZnRlciB5b3UgbG9nb3V0IHlvdSBjYW4gbG9nIGJhY2sgaW4gLyB0aG91Z2h0IGltcG9ydGluZyBhbGwgdGhlIGNsaWNrcyB3b3VsZCB3b3JrIGJ1dCBpdCBkb2Vzbid0IGxvb2sgbGlrZSBpdCAuOilcclxuICAgIGNsaWNrcy5yZWcoKVxyXG4gICAgY2xpY2tzLnJlZ2lzdGVyKClcclxuICAgIGNsaWNrcy5maXJzdExvZygpXHJcbiAgICBjbGlja3MubG9nb3V0KClcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtQ29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRDb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpblwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlTG9nb3V0IiwiY29uc3QgdXNlck9iaiA9IChuYW1lUGFyYW0sIGVtYWlsUGFyYW0sIHVzZXJQYXJhbSwgcGFzc1BhcmFtKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgbmFtZTogbmFtZVBhcmFtLFxyXG4gICAgZW1haWw6IGVtYWlsUGFyYW0sXHJcbiAgICB1c2VyOiB1c2VyUGFyYW0sXHJcbiAgICBwYXNzd29yZDogcGFzc1BhcmFtXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1c2VyT2JqIiwiaW1wb3J0IHVzZXJPYmogZnJvbSBcIi4vb2JqZWN0QnVpbGRlclwiXHJcbmltcG9ydCBhcGlGZXRjaCBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGF1dGhGb3JtIGZyb20gXCIuL2Zvcm1zXCJcclxuaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuLi9DaGF0L0NoYXRMaXN0XCI7XHJcbmltcG9ydCBwcmludEFsbEV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL3ByaW50QWxsRXZlbnRzXCI7XHJcbmltcG9ydCBmb3JtIGZyb20gXCIuLi90YXNrL3Rhc2tGb3JtXCJcclxuXHJcbmNvbnN0IHJlZ2lzdGVyID0ge1xyXG5cclxuICAgIHJlZzogKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJcIikuaW5uZXJIVE1MID0gYXV0aEZvcm0ucmVnaXN0ZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlUmVnaXN0ZXI6ICgpID0+IHtcclxuICAgIGNvbnN0IG5hbWVWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWUtcmVnaXN0ZXJcIikudmFsdWU7XHJcbiAgICBjb25zdCBlbWFpbFZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWwtcmVnaXN0ZXJcIikudmFsdWU7XHJcbiAgICBjb25zdCB1c2VyVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZS1yZWdpc3RlclwiKS52YWx1ZTtcclxuICAgIGNvbnN0IHBhc3NWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkLXJlZ2lzdGVyXCIpLnZhbHVlO1xyXG5cclxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IHVzZXJPYmoobmFtZVZhbCwgZW1haWxWYWwsIHVzZXJWYWwsIHBhc3NWYWwpXHJcbiAgICBhcGlGZXRjaC5hZGRVc2VyKHVzZXJJbnB1dClcclxuICAgIC50aGVuKChwYXJzZWRVc2VyKSA9PiB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCBwYXJzZWRVc2VyLmlkKVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5cIikuaW5uZXJIVE1MID0gYXV0aEZvcm0ubWFpbigpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IGZvcm0udGFza0Zvcm0oKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLm1haW4oKTtcclxuICAgICAgICBwcmludEFsbEV2ZW50cygpO1xyXG4gICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXIiLCJpbXBvcnQgcHJpbnRBbGxFdmVudHMgZnJvbSBcIi4vcHJpbnRBbGxFdmVudHNcIjtcclxuY29uc3QgZXZlbnRBcGlNYW5hZ2VyID0ge1xyXG4gICAgICAgIGdldEFsbEV2ZW50czogKHVzZXJJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg3L2V2ZW50cy8/dXNlcklkPSR7dXNlcklkfWApXHJcbiAgICAgICAgICAgIC50aGVuKGV2ZW50cyA9PiBldmVudHMuanNvbigpKVxyXG4gICAgfSwgIHBvc3ROZXdFdmVudDogZXZlbnRPYmplY3QgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4Ny9ldmVudHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudE9iamVjdClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sIGRlbGV0ZUV2ZW50OiAoaWRUb0RlbGV0ZSkgPT4ge1xyXG4gICAgICAgIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODcvZXZlbnRzLyR7aWRUb0RlbGV0ZX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwcmludEFsbEV2ZW50cygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LCBnZXRTaW5nbGVFdmVudDogKGlkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODcvZXZlbnRzLyR7aWR9YClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSwgIGVkaXRFdmVudDogKGlkUGFyYW0sIGV2ZW50VG9FZGl0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODcvZXZlbnRzLyR7aWRQYXJhbX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnRUb0VkaXQpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudEFwaU1hbmFnZXI7IiwiY29uc3QgYnVpbGRTaW5nbGVFdmVudCA9IChzaW5nbGVFdmVudCkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkID0gXCJldmVudENvbnRhaW5lci0ke3NpbmdsZUV2ZW50LmlkfVwiIGNsYXNzID0gXCJhbGxEYUV2ZW50c1wiPlxyXG4gICAgICAgICAgICA8aDI+JHtzaW5nbGVFdmVudC5uYW1lfTwvaDI+XHJcbiAgICAgICAgICAgICAgICA8cD5EYXRlOiAgJHtzaW5nbGVFdmVudC5kYXRlfTwvcD5cclxuICAgICAgICAgICAgICAgIDxwPkxvY2F0aW9uOiAgJHtzaW5nbGVFdmVudC5sb2NhdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0QnV0dG9uXCIgaWQ9IFwiZWRpdEV2ZW50QnV0dG9uLSR7c2luZ2xlRXZlbnQuaWR9XCI+VXBkYXRlPC9idXR0b24+IDxidXR0b24gY2xhc3M9XCJkZWxldGVCdXR0b25cIiBpZD0gXCJkZWxldGVCdXR0b24tJHtzaW5nbGVFdmVudC5pZH1cIj5EZWxldGU8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8aHI+YFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBidWlsZFNpbmdsZUV2ZW50OyIsImltcG9ydCBldmVudEZvcm1CdWlsZGVyIGZyb20gXCIuL2V2ZW50Rm9ybVwiO1xyXG5pbXBvcnQgYnVpbGRFdmVudE9iamVjdCBmcm9tIFwiLi9ldmVudE9iamVjdFwiO1xyXG5pbXBvcnQgZXZlbnRBcGlNYW5hZ2VyIGZyb20gXCIuL2FwaU1hbmFnZXJcIjtcclxuaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuL3ByaW50QWxsRXZlbnRzXCI7XHJcbmltcG9ydCBldmVudEVkaXRGb3JtQnVpbGRlciBmcm9tIFwiLi9lZGl0Rm9ybVwiO1xyXG5jb25zdCBjbGlja1dpemFyZCA9IHtcclxuICAgIGFkZEV2ZW50RnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImFkZEV2ZW50QnV0dG9uXCIpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtQ29udGFpbmVyXCIpLmlubmVySFRNTCA9IGV2ZW50Rm9ybUJ1aWxkZXIuZXZlbnRGb3JtSW5wdXRzKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9LFxyXG4gICAgc2F2ZUV2ZW50RnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmVFdmVudEJ1dHRvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1OYW1lXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1EYXRlXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYXRpb25WYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtTG9jYXRpb25cIikudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdFdmVudE9iamVjdCA9IGJ1aWxkRXZlbnRPYmplY3QobmFtZVZhbHVlLCBkYXRlVmFsdWUsIGxvY2F0aW9uVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLnBvc3ROZXdFdmVudChuZXdFdmVudE9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihwcmludEFsbEV2ZW50cyk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybU5hbWVcIikudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1EYXRlXCIpLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtTG9jYXRpb25cIikudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBlZGl0QnV0dG9uRnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRCdXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBldmVudEVkaXRJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07XHJcbiAgICAgICAgICAgICAgICBldmVudEFwaU1hbmFnZXIuZ2V0U2luZ2xlRXZlbnQoZXZlbnRFZGl0SWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZUV2ZW50SW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRDb250YWluZXItJHtldmVudEVkaXRJZH1gKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNldmVudENvbnRhaW5lci0ke2V2ZW50RWRpdElkfWApLmlubmVySFRNTCA9IGV2ZW50RWRpdEZvcm1CdWlsZGVyKHNpbmdsZUV2ZW50SW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc2F2ZUVkaXRCdXR0b25GdW5jdGlvbjogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2F2ZUVkaXRlZEV2ZW50XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNldmVudEVkaXROYW1lLSR7aXRlbUlkfWApLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNldmVudEVkaXREYXRlLSR7aXRlbUlkfWApLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkTG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRFZGl0TG9jYXRpb24tJHtpdGVtSWR9YCkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0ZWRFdmVudE9iamVjdCA9IGJ1aWxkRXZlbnRPYmplY3QoZWRpdGVkTmFtZSwgZWRpdGVkRGF0ZSwgZWRpdGVkTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLmVkaXRFdmVudChpdGVtSWQsIGVkaXRlZEV2ZW50T2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHByaW50QWxsRXZlbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlQnV0dG9uRnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZUJ1dHRvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50RGVsZXRlSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLmRlbGV0ZUV2ZW50KGV2ZW50RGVsZXRlSWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsaWNrV2l6YXJkOyIsImNvbnN0IGV2ZW50RWRpdEZvcm1CdWlsZGVyID0gKHNpbmdsZUV2ZW50KSA9PiB7XHJcbiAgICByZXR1cm4gYDxmb3JtIGlkID0gXCJldmVudEZvcm1JbnB1dHNcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRFZGl0TmFtZS0ke3NpbmdsZUV2ZW50LmlkfVwiIHBsYWNlaG9sZGVyID0gXCJuYW1lXCIgdmFsdWU9XCIke3NpbmdsZUV2ZW50Lm5hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50RWRpdERhdGUtJHtzaW5nbGVFdmVudC5pZH1cIiBwbGFjZWhvbGRlciA9IFwiZGF0ZVwiIHZhbHVlPVwiJHtzaW5nbGVFdmVudC5kYXRlfVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEVkaXRMb2NhdGlvbi0ke3NpbmdsZUV2ZW50LmlkfVwiIHBsYWNlaG9sZGVyID0gXCJsb2NhdGlvblwiIHZhbHVlPVwiJHtzaW5nbGVFdmVudC5sb2NhdGlvbn1cIj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkID0gXCJzYXZlRWRpdGVkRXZlbnQtJHtzaW5nbGVFdmVudC5pZH1cIiBjbGFzcyA9IFwic2F2ZUVkaXRlZEV2ZW50XCI+U2F2ZSBldmVudDwvYnV0dG9uYFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50RWRpdEZvcm1CdWlsZGVyOyIsImNvbnN0IGV2ZW50Rm9ybUJ1aWxkZXIgPSAge1xyXG4gICAgZXZlbnRGb3JtSW5wdXRzOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gYDxmb3JtIGlkID0gXCJldmVudEZvcm1JbnB1dHNcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRGb3JtTmFtZVwiIHBsYWNlaG9sZGVyID0gXCJuYW1lXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50Rm9ybURhdGVcIiBwbGFjZWhvbGRlciA9IFwiZGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEZvcm1Mb2NhdGlvblwiIHBsYWNlaG9sZGVyID0gXCJsb2NhdGlvblwiPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQgPSBcInNhdmVOZXdFdmVudFwiIGNsYXNzID0gXCJzYXZlRXZlbnRCdXR0b25cIj5TYXZlIGV2ZW50PC9idXR0b25gXHJcbn0sXHJcblxyXG4gICBldmVudEJ1dHRvbjogYDxocj48YnV0dG9uIGlkPVwiYWRkRXZlbnRCdXR0b25cIj5BZGQgYW4gRXZlbnQhPC9idXR0b24+YFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudEZvcm1CdWlsZGVyOyIsImNvbnN0IGJ1aWxkRXZlbnRPYmplY3QgPSAobmFtZVBhcmFtLCBkYXRlUGFyYW0sIGxvY2F0aW9uUGFyYW0pID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogbmFtZVBhcmFtLFxyXG4gICAgICAgIGRhdGU6IGRhdGVQYXJhbSxcclxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25QYXJhbSxcclxuICAgICAgICB1c2VySWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEV2ZW50T2JqZWN0IiwiaW1wb3J0IGV2ZW50QXBpTWFuYWdlciBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGJ1aWxkU2luZ2xlRXZlbnQgZnJvbSBcIi4vYnVpbGRTaW5nbGVFdmVudFwiXHJcbmltcG9ydCBldmVudEZvcm1CdWlsZGVyIGZyb20gXCIuL2V2ZW50Rm9ybVwiO1xyXG5jb25zdCBwcmludEFsbEV2ZW50cyA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1Db250YWluZXJcIikuaW5uZXJIVE1MID0gZXZlbnRGb3JtQnVpbGRlci5ldmVudEJ1dHRvbjtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRDb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGV2ZW50QXBpTWFuYWdlci5nZXRBbGxFdmVudHModXNlcklkKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5mb3JFYWNoKHNpbmdsZUV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRDb250YWluZXJcIikuaW5uZXJIVE1MICs9IGJ1aWxkU2luZ2xlRXZlbnQoc2luZ2xlRXZlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfTtcclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRBbGxFdmVudHM7XHJcbiIsIlxyXG5pbXBvcnQgQ2hhdEZvcm0gZnJvbSBcIi4vQ2hhdC9DaGF0Rm9ybS5qc1wiO1xyXG5pbXBvcnQgbG9hZFBhZ2VBZnRlckxvZ2luIGZyb20gXCIuL0NoYXQvbG9hZFBhZ2VBZnRlckxvZ2luLmpzXCI7XHJcbmltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9hdXRoL2Zvcm1zXCI7XHJcbmltcG9ydCBjbGlja3MgZnJvbSBcIi4vYXV0aC9jbGlja3NcIlxyXG5pbXBvcnQgYWN0aXZhdGVFZGl0QnV0dG9uIGZyb20gXCIuL3Rhc2svZWRpdFwiXHJcbmltcG9ydCBoYW5kbGVFZGl0VGFzayBmcm9tIFwiLi90YXNrL2hhbmRsZUVkaXRcIlxyXG5pbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXV0aC9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGhhbmRsZUxvZ2luIGZyb20gXCIuL2F1dGgvbG9naW5cIlxyXG5pbXBvcnQgZXZlbnRBcGlNYW5hZ2VyIGZyb20gXCIuL2V2ZW50cy9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGNsaWNrV2l6YXJkIGZyb20gXCIuL2V2ZW50cy9jbGlja1wiXHJcbi8vIGltcG9ydCBoYW5kbGVMb2dpbiBmcm9tIFwiLi9hdXRoL2xvZ2luXCJcclxuLy8gdGFzayBpbXBvcnRzXHJcbi8vIGltcG9ydCBmb3JtIGZyb20gXCIuL3Rhc2svdGFza0Zvcm1cIlxyXG5pbXBvcnQgdGFza0NsaWNrcyBmcm9tIFwiLi90YXNrL2NsaWNrc1wiXHJcblxyXG5cclxuLy8gYXBpRmV0Y2goKTtcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLmhvbWUoKTtcclxuY2xpY2tzLnJlZygpXHJcbmNsaWNrcy5yZWdpc3RlcigpXHJcbmNsaWNrcy5maXJzdExvZygpXHJcbmNsaWNrcy5sb2dpbigpXHJcbmNsaWNrcy5sb2dvdXQoKVxyXG5DaGF0Rm9ybS5hY3RpdmF0ZVNlbmRCdXR0b24oKTtcclxuLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IGZvcm0ubmV3VGFza0Zvcm0oKVxyXG50YXNrQ2xpY2tzLmNyZWF0ZVRhc2soKTtcclxudGFza0NsaWNrcy5uZXdUYXNrKClcclxudGFza0NsaWNrcy5zYXZlVGFzaygpXHJcbnRhc2tDbGlja3MuZGVsZXRlVGFzaygpXHJcbmFjdGl2YXRlRWRpdEJ1dHRvbigpXHJcbmhhbmRsZUVkaXRUYXNrKClcclxuY2xpY2tXaXphcmQuYWRkRXZlbnRGdW5jdGlvbigpXHJcbmNsaWNrV2l6YXJkLnNhdmVFdmVudEZ1bmN0aW9uKClcclxuY2xpY2tXaXphcmQuZWRpdEJ1dHRvbkZ1bmN0aW9uKClcclxuY2xpY2tXaXphcmQuc2F2ZUVkaXRCdXR0b25GdW5jdGlvbigpXHJcbmNsaWNrV2l6YXJkLmRlbGV0ZUJ1dHRvbkZ1bmN0aW9uKClcclxuIiwiY29uc3QgYXBpRmV0Y2ggPSB7XHJcbiAgICBzaW5nbGVUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg3L3Rhc2tzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgYWRkdGFzazogKHRhc2tzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg3L3Rhc2tzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodGFza3MpXHJcbiAgICAgICAgfSkudGhlbihyID0+IHIuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGFsbFRhc2s6ICgpID0+IHtcclxuICAgICAgICBjb25zdCBhY3RpdmVVc2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpO1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg3L3Rhc2tzP3VzZXJJZD0ke2FjdGl2ZVVzZXJJZH1gKVxyXG4gICAgICAgIC50aGVuKHI9PnIuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZVRhc2s6ICh0YXNrSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4Ny90YXNrcy8ke3Rhc2tJZH1gLCB7XHJcbiAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBlZGl0VGFzazogKHRhc2tJZCwgdXNlcklucHV0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODcvdGFza3MvJHt0YXNrSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJJbnB1dClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGVkaXRTaW5nbGU6ICh0YXNrSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4N3Rhc2tzLyR7dGFza0lkfWApXHJcbiAgICAgICAgLnRoZW4ocj0+ci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgbWFya0FzQ29tcGxldGU6ICh0YXNrSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4Ny90YXNrcy8ke3Rhc2tJZH1gLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7Y29tcGxldGVkOiBcInRydWVcIn0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcmtBc0luY29tcGxldGU6ICh0YXNrSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4Ny90YXNrcy8ke3Rhc2tJZH1gLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7Y29tcGxldGVkOiBcImZhbHNlXCJ9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaUZldGNoIiwiaW1wb3J0IGZvcm0gZnJvbSBcIi4vdGFza0Zvcm1cIlxyXG5pbXBvcnQgcHJpbnQgZnJvbSBcIi4vcHJpbnRUYXNrXCJcclxuaW1wb3J0IGhhbmRsZUxvZ291dCBmcm9tIFwiLi4vYXV0aC9sb2dvdXRcIlxyXG5pbXBvcnQgdGFza09iaiBmcm9tIFwiLi9vYmplY3RCdWlsZGVyXCJcclxuaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5cclxuXHJcbmNvbnN0IHRhc2tDbGlja3MgPSB7XHJcbiAgICBjcmVhdGVUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNyZWF0ZS1uZXctdGFza1wiKSl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS50YXNrRm9ybSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcbiAgICBuZXdUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctdGFza1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS50YXNrRm9ybSgpXHJcbiAgICAgICAgLy8gICAgIHByaW50KClcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmV3LXRhc2tcIikpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLnRhc2tGb3JtKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc2F2ZVRhc2s6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmUtdGFza1wiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza1ZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi10YXNrXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcGxldGUtZGF0ZVwiKS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VySW5wdXQgPSB0YXNrT2JqKHRhc2tWYWwsIGRhdGVWYWwpXHJcbiAgICAgICAgICAgICAgICBhcGlGZXRjaC5hZGR0YXNrKHVzZXJJbnB1dClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLXRhc2tcIikudmFsdWUgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcGxldGUtZGF0ZVwiKS52YWx1ZSA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNoZWNrYm94XCIpKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07IC8vIDE0XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrSWQpXHJcbiAgICAgICAgICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2hlY2tib3gtJHt0YXNrSWR9YCkuY2hlY2tlZCl7XHJcbiAgICAgICAgICAgICAgICAgIGFwaUZldGNoLm1hcmtBc0NvbXBsZXRlKHRhc2tJZClcclxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Bvc3NpYmx5LSR7dGFza0lkfWApLmNsYXNzTGlzdC5hZGQoXCJjaGVja2VkLWNsYXNzXCIpXHJcbiAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stcHJpbnRcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgYXBpRmV0Y2gubWFya0FzSW5jb21wbGV0ZSh0YXNrSWQpXHJcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwb3NzaWJseS0ke3Rhc2tJZH1gKS5jbGFzc0xpc3QucmVtb3ZlKFwiY2hlY2tlZC1jbGFzc1wiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvLyBzYXZlVGFzazogKCkgPT4ge1xyXG4gICAgLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2F2ZS10YXNrXCIpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCB0YXNrVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLXRhc2tcIikudmFsdWU7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBkYXRlVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRhc2tPYmoodGFza1ZhbCwgZGF0ZVZhbClcclxuICAgIC8vICAgICAgICAgICAgIGFwaUZldGNoLmFkZHRhc2sodXNlcklucHV0KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgcHJpbnQoKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tdGFza1wiKS52YWx1ZSA9IFwiXCJcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlID0gXCJcIlxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH0sXHJcbiAgICBsb2dvdXQ6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImxvZ291dFwiKSlcclxuICAgICAgICAgICAgICAgIGhhbmRsZUxvZ291dCgpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBkZWxldGVUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLWRlbGV0ZS1idG5cIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUlkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsyXTtcclxuICAgICAgICAgICAgICAgIGFwaUZldGNoLmRlbGV0ZVRhc2soZGVsZXRlSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tDbGlja3MiLCJpbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBoYW5kbGVFZGl0VGFzayBmcm9tIFwiLi9oYW5kbGVFZGl0XCJcclxuLy8gZmlyc3QgZWRpdCBjbGlja1xyXG5cclxuY29uc3QgYWN0aXZhdGVFZGl0QnV0dG9uID0gKCkgPT4ge1xyXG4gICAgLy8gZGVidWdnZXI7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdFwiKSkge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWxsb1wiKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpKVxyXG4gICAgICAgICAgICBhcGlGZXRjaC5lZGl0U2luZ2xlKGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlVGFzaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi10YXNrXCIpLnZhbHVlID0gc2luZ2xlVGFzay50YXNrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcGxldGUtZGF0ZVwiKS52YWx1ZSA9IHNpbmdsZVRhc2suZGF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLXRhc2tcIikudGV4dENvbnRlbnQgPSBcIkVkaXQgVGFza1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2F2ZS10YXNrXCIpLmNsYXNzTGlzdC5hZGQoXCJuZXdDbGFzc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2F2ZS10YXNrXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJzYXZlLXRhc2tcIilcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NhdmUtdGFza1wiKS5pZCA9IGBlZGl0LXRhc2stJHtzaW5nbGVUYXNrLmlkfWBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZhdGVFZGl0QnV0dG9uOyIsImltcG9ydCB0YXNrT2JqIGZyb20gXCIuL29iamVjdEJ1aWxkZXJcIjtcclxuaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIjtcclxuaW1wb3J0IGZvcm0gZnJvbSBcIi4vdGFza0Zvcm1cIjtcclxuaW1wb3J0IHByaW50IGZyb20gXCIuL3ByaW50VGFza1wiXHJcbi8vIGFmdGVyIGVkaXRpbmcgdGFza1xyXG5cclxuY29uc3QgaGFuZGxlRWRpdGVkVGFzayA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZXdDbGFzc1wiKSkge1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tdGFza1wiKS52YWx1ZVxyXG4gICAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcGxldGUtZGF0ZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICBjb25zdCB0YXNrSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzJdO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0ID0gdGFza09iaih0YXNrTmFtZSwgdGFza0RhdGUpXHJcbiAgICAgICAgICAgIGFwaUZldGNoLmVkaXRUYXNrKHRhc2tJZCwgb2JqZWN0KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgcHJpbnQoKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctdGFzay1jb250YWluZXJcIikuaW5uZXJIVE1MID0gZm9ybS50YXNrRm9ybSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVFZGl0ZWRUYXNrIiwiLy8gY29uc3QgdGFza09iaiA9ICh0YXNrUGFyYW0sIGRhdGVQYXJhbSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICB0YXNrOiB0YXNrUGFyYW0sXHJcbi8vICAgICAgICAgZGF0ZTogZGF0ZVBhcmFtLFxyXG4vLyAgICAgICAgIHVzZXJJZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCB0YXNrT2JqXHJcbmNvbnN0IHRhc2tPYmogPSAodGFza1BhcmFtLCBkYXRlUGFyYW0sIGlzSXRDb21wbGV0ZSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0YXNrOiB0YXNrUGFyYW0sXHJcbiAgICAgICAgZGF0ZTogZGF0ZVBhcmFtLFxyXG4gICAgICAgIGNvbXBsZXRlZDogaXNJdENvbXBsZXRlLFxyXG4gICAgICAgIHVzZXJJZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrT2JqIiwiaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5pbXBvcnQgcHJpbnRUYXNrQnVpbGRlciBmcm9tIFwiLi9wcmludFRhc2tCdWlsZGVyXCJcclxuaW1wb3J0IGZvcm0gZnJvbSBcIi4vdGFza0Zvcm1cIlxyXG5cclxuY29uc3QgcHJpbnQgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW50LXRhc2tcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgYXBpRmV0Y2guYWxsVGFzaygpXHJcbiAgICAudGhlbih0YXNrcyA9PiB7XHJcbiAgICAgICAgdGFza3MuZm9yRWFjaChzaW5nbGVUYXNrID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmludC10YXNrXCIpLmlubmVySFRNTCArPSBwcmludFRhc2tCdWlsZGVyKHNpbmdsZVRhc2spXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50IiwiLy8gY29uc3QgcHJpbnRUYXNrQnVpbGRlciA9ICh0YXNrcykgPT4ge1xyXG4vLyAgICAgcmV0dXJuIGBcclxuLy8gICAgIDxkaXYgY2xhc3M9XCJwcmludC10YXNrXCIgaWQ9XCJ0YXNrLXByaW50XCI+XHJcbi8vICAgICA8aDE+JHt0YXNrcy50YXNrfTwvaDE+XHJcbi8vICAgICA8cD4ke3Rhc2tzLmRhdGV9PC9wPlxyXG4vLyAgICAgPGJ1dHRvbiBjbGFzcz1cInRhc2stZGVsZXRlLWJ0blwiIGlkPVwidGFzay1kZWxldGUtJHt0YXNrcy5pZH1cIj5EZWxldGU8L2J1dHRvbj5cclxuLy8gICAgIDxidXR0b24gY2xhc3M9XCJlZGl0XCIgaWQ9XCJ0YXNrLWVkaXQtJHt0YXNrcy5pZH1cIj5FZGl0PC9idXR0b24+XHJcbi8vICAgICA8L2Rpdj5cclxuLy8gICAgIGBcclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgcHJpbnRUYXNrQnVpbGRlclxyXG5jb25zdCBwcmludFRhc2tCdWlsZGVyID0gKHRhc2tzKSA9PiB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgPGRpdiBjbGFzcz1cInByaW50LXRhc2tcIiBpZD1cInRhc2stcHJpbnRcIj5cclxuICAgIDxsYWJlbCBjbGFzcyA9XCJjaGVja2JveFwiPlxyXG4gICAgPGRpdiBpZD0gXCJwb3NzaWJseS0ke3Rhc2tzLmlkfVwiPlxyXG4gICAgPGlucHV0IGNsYXNzPVwiY2hlY2tib3hcIiBpZD1cImNoZWNrYm94LSR7dGFza3MuaWR9XCIgdHlwZT1cImNoZWNrYm94XCIgJHt0YXNrLmNvbXBsZXRlZCA9PT0gdHJ1ZT8gXCJjaGVja2VkXCIgOiBcIlwifTxoMSBjbGFzcyA9IFwiY2hlY2staDFcIj4ke3Rhc2tzLnRhc2t9PC9oMT5cclxuICAgIDwvZGl2PlxyXG4gICAgPC9sYWJlbD5cclxuICAgIDxwPiR7dGFza3MuZGF0ZX08L3A+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwidGFzay1kZWxldGUtYnRuXCIgaWQ9XCJ0YXNrLWRlbGV0ZS0ke3Rhc2tzLmlkfVwiPkRlbGV0ZTwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImVkaXRcIiBpZD1cInRhc2stZWRpdC0ke3Rhc2tzLmlkfVwiPkVkaXQ8L2J1dHRvbj5cclxuICAgIDwvZGl2PiAgXHJcbiAgICBgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50VGFza0J1aWxkZXIiLCJjb25zdCBmb3JtID0ge1xyXG4gICAgbmV3VGFza0Zvcm06ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJuZXctdGFza1wiIGNsYXNzID1cIm5ldy10YXNrXCI+TmV3IFRhc2s8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9LFxyXG4gICAgdGFza0Zvcm06ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgaWQ9XCJuZXctdGFzay1jb250YWluZXJcIj5cclxuICAgICAgICA8YnV0dG9uIGlkID0gXCJsb2dvdXRcIiBjbGFzcz1cImxvZ291dFwiPkxvZ291dDwvYnV0dG9uPlxyXG4gICAgICAgIDxmb3JtIGlkPVwidGFza1wiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJtYWluLXRhc2tcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFRhc2tcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjb21wbGV0ZS1kYXRlXCIgcGxhY2Vob2xkZXI9XCJDb21wbGV0ZSBEYXRlXCIgdHlwZT1cImRhdGVcIj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cInNhdmUtdGFza1wiIGNsYXNzPVwic2F2ZS10YXNrXCI+U2F2ZSBUYXNrPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgfSxcclxuICAgIGNyZWF0ZVRhc2s6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJjcmVhdGUtbmV3LXRhc2tcIiBjbGFzcyA9IFwiY3JlYXRlLW5ldy10YXNrXCI+Q3JlYXRlIFRhc2s8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGlkID0gXCJsb2dvdXRcIiBjbGFzcz1cImxvZ291dFwiPkxvZ291dDwvYnV0dG9uPlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuICAgIC8vIGVkaXRGb3JtOiAoKSA9PiB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGBcclxuICAgIC8vICAgICA8Zm9ybSBpZD1cInRhc2tcIj5cclxuICAgIC8vICAgICAgICAgPGlucHV0IGlkPVwibWFpbi10YXNrXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBUYXNrXCIgdHlwZT1cInRleHRcIiB2YWx1ZSA9IGBgPlxyXG4gICAgLy8gICAgICAgICA8aW5wdXQgaWQ9XCJjb21wbGV0ZS1kYXRlXCIgcGxhY2Vob2xkZXI9XCJDb21wbGV0ZSBEYXRlXCIgdHlwZT1cImRhdGVcIj5cclxuICAgIC8vICAgICA8L2Zvcm0+XHJcbiAgICAvLyAgICAgPGJ1dHRvbiBpZD1cInNhdmUtdGFza1wiIGNsYXNzPVwic2F2ZS10YXNrXCI+U2F2ZSBUYXNrPC9idXR0b24+XHJcbiAgICAvLyAgICAgYFxyXG5cclxuICAgIC8vIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybSJdfQ==
