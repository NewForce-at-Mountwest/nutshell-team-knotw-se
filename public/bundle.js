(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildChat = singleChatObj => {
  // console.log(singleChatObj.message);
  // console.log(singleChatObj.id)
  return `<div class="form" id="chat-form">
    <h3 class="chat-user">${singleChatObj.user.user}:</h3>
    <p id="new-message-input">${singleChatObj.message}</p>
    <button class="edit-chat" id="edit-chat-${singleChatObj.id}">Edit</button>
    <button class="delete-chat" id="delete-chat-${singleChatObj.id}">Delete</button>
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
  getSingleChat: chatId => {
    return fetch(`http://localhost:8089/messages/${chatId}`).then(r => r.json());
  },
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

var _ChatList = _interopRequireDefault(require("./ChatList"));

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
        const messageVal = document.querySelector("#new-message-input").value;
        const objectToPost = (0, _ChatObj.default)(messageVal);

        _ChatCollection.default.sendNewMessage(objectToPost);

        (0, _ChatList.default)();
        document.querySelector("#new-message-input").value = "";
      }
    });
  }
};
var _default = ChatForm;
exports.default = _default;

},{"./ChatCollection":2,"./ChatList":4,"./ChatObj":5}],4:[function(require,module,exports){
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

var _ChatList = _interopRequireDefault(require("./ChatList"));

var _ChatForm = _interopRequireDefault(require("./ChatForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This module builds the chat list view once a user has logged in
const loadPageAfterLogin = () => {
  //Builds Chat Form
  document.querySelector("#form-output").innerHTML += _ChatForm.default.renderChatForm(); // // Builds Chat List

  (0, _ChatList.default)();
};

var _default = loadPageAfterLogin;
exports.default = _default;

},{"./ChatForm":3,"./ChatList":4}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{"./login":10,"./logout":11,"./register":13}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{"../Chat/loadPageAfterLogin":6,"../events/click":23,"../events/printAllEvents":27,"../task/printTask":34,"../task/taskForm":36,"./apiManager":7,"./forms":9}],11:[function(require,module,exports){
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
  document.querySelector("#chat-wrapper").innerHTML = "";
};

var _default = handleLogout;
exports.default = _default;

},{"./clicks":8,"./forms":9}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

      document.querySelector("#task").innerHTML = _taskForm.default.taskForm(); // document.querySelector("#login").innerHTML = authForm.main();

      (0, _printAllEvents.default)();
      (0, _ChatList.default)();
    });
  }
};
var _default = register;
exports.default = _default;

},{"../Chat/ChatList":4,"../events/printAllEvents":27,"../task/taskForm":36,"./apiManager":7,"./forms":9,"./objectBuilder":12}],14:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],15:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],16:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"./ChatCollection":15,"./ChatList":17,"./ChatObj":18,"dup":3}],17:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"./Chat.js":14,"./ChatCollection.js":15,"./ChatForm.js":16,"dup":4}],18:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],19:[function(require,module,exports){
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
    if (event.target.classList.contains("delete-chat")) {
      const idToDelete = event.target.id.split("-")[2];

      _ChatCollection.default.deleteChat(idToDelete).then(_ChatList.default);
    }
  });
};

var _default = activateDeleteButtons;
exports.default = _default;

},{"./ChatCollection":15,"./ChatList":17}],20:[function(require,module,exports){
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
      const messageVal = document.querySelector("#new-message-input").value;
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

},{"./ChatCollection":15,"./ChatForm":16,"./ChatList":17,"./ChatObj":18}],21:[function(require,module,exports){
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

},{"./printAllEvents":27}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"./apiManager":21,"./editForm":24,"./eventForm":25,"./eventObject":26,"./printAllEvents":27}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"./apiManager":21,"./buildSingleEvent":22,"./eventForm":25}],28:[function(require,module,exports){
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

var _DeleteChat = _interopRequireDefault(require("./chat/DeleteChat"));

var _SaveEdit = _interopRequireDefault(require("./chat/SaveEdit"));

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

(0, _DeleteChat.default)();
(0, _SaveEdit.default)();

},{"./Chat/ChatForm.js":3,"./Chat/loadPageAfterLogin.js":6,"./auth/apiManager":7,"./auth/clicks":8,"./auth/forms":9,"./auth/login":10,"./chat/DeleteChat":19,"./chat/SaveEdit":20,"./events/apiManager":21,"./events/click":23,"./task/clicks":30,"./task/edit":31,"./task/handleEdit":32}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{"../auth/logout":11,"./apiManager":29,"./objectBuilder":33,"./printTask":34,"./taskForm":36}],31:[function(require,module,exports){
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

},{"./apiManager":29,"./handleEdit":32}],32:[function(require,module,exports){
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

},{"./apiManager":29,"./objectBuilder":33,"./printTask":34,"./taskForm":36}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"./apiManager":29,"./printTaskBuilder":35,"./taskForm":36}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}]},{},[28])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0NoYXQvQ2hhdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Q29sbGVjdGlvbi5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0TGlzdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0T2JqLmpzIiwiLi4vc2NyaXB0cy9DaGF0L2xvYWRQYWdlQWZ0ZXJMb2dpbi5qcyIsIi4uL3NjcmlwdHMvYXV0aC9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2NsaWNrcy5qcyIsIi4uL3NjcmlwdHMvYXV0aC9mb3Jtcy5qcyIsIi4uL3NjcmlwdHMvYXV0aC9sb2dpbi5qcyIsIi4uL3NjcmlwdHMvYXV0aC9sb2dvdXQuanMiLCIuLi9zY3JpcHRzL2F1dGgvb2JqZWN0QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvYXV0aC9yZWdpc3Rlci5qcyIsIi4uL3NjcmlwdHMvY2hhdC9EZWxldGVDaGF0LmpzIiwiLi4vc2NyaXB0cy9jaGF0L1NhdmVFZGl0LmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvYXBpTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2J1aWxkU2luZ2xlRXZlbnQuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9jbGljay5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2VkaXRGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRPYmplY3QuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9wcmludEFsbEV2ZW50cy5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdGFzay9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy90YXNrL2NsaWNrcy5qcyIsIi4uL3NjcmlwdHMvdGFzay9lZGl0LmpzIiwiLi4vc2NyaXB0cy90YXNrL2hhbmRsZUVkaXQuanMiLCIuLi9zY3JpcHRzL3Rhc2svb2JqZWN0QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvdGFzay9wcmludFRhc2suanMiLCIuLi9zY3JpcHRzL3Rhc2svcHJpbnRUYXNrQnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvdGFzay90YXNrRm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxNQUFNLFNBQVMsR0FBSSxhQUFELElBQW1CO0FBQ2pDO0FBQ0E7QUFDQSxTQUFROzRCQUNnQixhQUFhLENBQUMsSUFBZCxDQUFtQixJQUFLO2dDQUNwQixhQUFhLENBQUMsT0FBUTs4Q0FDUixhQUFhLENBQUMsRUFBRztrREFDYixhQUFhLENBQUMsRUFBRztRQUovRDtBQU1GLENBVEY7O2VBVWdCLFM7Ozs7Ozs7Ozs7QUNWaEIsTUFBTSxjQUFjLEdBQUc7QUFDckIsRUFBQSxjQUFjLEVBQUcsWUFBRCxJQUFrQjtBQUNoQyxXQUFPLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUM3QyxNQUFBLE1BQU0sRUFBRSxNQURxQztBQUU3QyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRm9DO0FBSzdDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsWUFBZjtBQUx1QyxLQUFuQyxDQUFaO0FBT0QsR0FUb0I7QUFVckIsRUFBQSxXQUFXLEVBQUUsTUFBTTtBQUNqQixXQUFPLEtBQUssQ0FBQyw2Q0FBRCxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFQSxHQWJtQjtBQWNyQixFQUFBLFVBQVUsRUFBRyxNQUFELElBQVk7QUFDdEIsV0FBTyxLQUFLLENBQUUsa0NBQWlDLE1BQU8sRUFBMUMsRUFBNkM7QUFDdkQsTUFBQSxNQUFNLEVBQUU7QUFEK0MsS0FBN0MsQ0FBWjtBQUdELEdBbEJvQjtBQW1CckIsRUFBQSxhQUFhLEVBQUcsTUFBRCxJQUFZO0FBQzNCLFdBQU8sS0FBSyxDQUFFLGtDQUFpQyxNQUFPLEVB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LENBQUMsT0FBTixDQUFjLFVBQVUsSUFBSTtBQUN4QixNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLFNBQXRDLElBQW1ELCtCQUFpQixVQUFqQixDQUFuRDtBQUNILEtBRkQ7QUFHSCxHQUxEO0FBTUgsQ0FSRDs7ZUFVZSxLOzs7Ozs7Ozs7OztBQ2RmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQSxNQUFNLGdCQUFnQixHQUFJLEtBQUQsSUFBVztBQUNoQyxTQUFROzs7eUJBR2EsS0FBSyxDQUFDLEVBQUc7MkNBQ1MsS0FBSyxDQUFDLEVBQUcscUJBQW9CLElBQUksQ0FBQyxTQUFMLEtBQW1CLElBQW5CLEdBQXlCLFNBQXpCLEdBQXFDLEVBQUcsMEJBQXlCLEtBQUssQ0FBQyxJQUFLOzs7U0FHM0ksS0FBSyxDQUFDLElBQUs7c0RBQ2tDLEtBQUssQ0FBQyxFQUFHO3lDQUN0QixLQUFLLENBQUMsRUFBRzs7S0FUOUM7QUFZSCxDQWJEOztlQWVlLGdCOzs7Ozs7Ozs7O0FDM0JmLE1BQU0sSUFBSSxHQUFHO0FBQ1QsRUFBQSxXQUFXLEVBQUUsTUFBTTtBQUNmLFdBQVE7O1NBQVI7QUFHSCxHQUxRO0FBTVQsRUFBQSxRQUFRLEVBQUUsTUFBTTtBQUNaLFdBQVE7Ozs7Ozs7OztTQUFSO0FBVUgsR0FqQlE7QUFrQlQsRUFBQSxVQUFVLEVBQUUsTUFBTTtBQUNkLFdBQVE7OztTQUFSO0FBSUgsR0F2QlEsQ0F3QlQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOztBQWpDUyxDQUFiO2VBb0NlLEkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBidWlsZENoYXQgPSAoc2luZ2xlQ2hhdE9iaikgPT4ge1xyXG4gICAgLy8gY29uc29sZS5sb2coc2luZ2xlQ2hhdE9iai5tZXNzYWdlKTtcclxuICAgIC8vIGNvbnNvbGUubG9nKHNpbmdsZUNoYXRPYmouaWQpXHJcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJmb3JtXCIgaWQ9XCJjaGF0LWZvcm1cIj5cclxuICAgIDxoMyBjbGFzcz1cImNoYXQtdXNlclwiPiR7c2luZ2xlQ2hhdE9iai51c2VyLnVzZXJ9OjwvaDM+XHJcbiAgICA8cCBpZD1cIm5ldy1tZXNzYWdlLWlucHV0XCI+JHtzaW5nbGVDaGF0T2JqLm1lc3NhZ2V9PC9wPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtY2hhdFwiIGlkPVwiZWRpdC1jaGF0LSR7c2luZ2xlQ2hhdE9iai5pZH1cIj5FZGl0PC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlLWNoYXRcIiBpZD1cImRlbGV0ZS1jaGF0LSR7c2luZ2xlQ2hhdE9iai5pZH1cIj5EZWxldGU8L2J1dHRvbj5cclxuIDwvZGl2PmBcclxuIH1cclxuIGV4cG9ydCBkZWZhdWx0IGJ1aWxkQ2hhdDsiLCJjb25zdCBDaGF0Q29sbGVjdGlvbiA9IHtcclxuICBzZW5kTmV3TWVzc2FnZTogKG9iamVjdFRvUG9zdCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg5L21lc3NhZ2VzXCIsIHtcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iamVjdFRvUG9zdClcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgZ2V0QWxsQ2hhdHM6ICgpID0+IHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9tZXNzYWdlcz9fZXhwYW5kPXVzZXJcIilcclxuICAgIC50aGVuKG1lc3NhZ2VzID0+IG1lc3NhZ2VzLmpzb24oKSk7XHJcbiAgIH0sXHJcbiAgZGVsZXRlQ2hhdDogKGNoYXRJZCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvbWVzc2FnZXMvJHtjaGF0SWR9YCwge1xyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgIH0pXHJcbiAgfSxcclxuICBnZXRTaW5nbGVDaGF0OiAoY2hhdElkKSA9PiB7XHJcbiAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvbWVzc2FnZXMvJHtjaGF0SWR9YClcclxuICAgIC50aGVuKHIgPT4gci5qc29uKCkpIH0sXHJcblxyXG4gIGVkaXRDaGF0OiAoY2hhdElkLCBjaGF0T2JqKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9tZXNzYWdlcy8ke2NoYXRJZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNoYXRPYmopXHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IENoYXRDb2xsZWN0aW9uOyIsIi8vIEEgQ29udGFjdEZvcm0gY29tcG9uZW50IHRoYXQsIHdoZW4gZmlsbGVkIG91dCBhbmQgYSBzdWJtaXQgYnV0dG9uIGlzIHByZXNzZWQsIGFkZHMgYSBuZXcgY29udGFjdCB0byBzdG9yYWdlLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXHJcbmltcG9ydCBDaGF0Q29sbGVjdGlvbiBmcm9tIFwiLi9DaGF0Q29sbGVjdGlvblwiO1xyXG5pbXBvcnQgYnVpbGRDaGF0T2JqZWN0IGZyb20gXCIuL0NoYXRPYmpcIjtcclxuaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuL0NoYXRMaXN0XCI7XHJcbi8vIGltcG9ydCBDaGF0TGlzdCBmcm9tIFwiLi9DaGF0TGlzdFwiO1xyXG5cclxuY29uc3QgQ2hhdEZvcm0gPSB7XHJcbiAgcmVuZGVyQ2hhdEZvcm06ICgpID0+IHtcclxuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZvcm1cIiBpZD1cImZvcm0tb3V0cHV0XCI+XHJcbiAgICAgIDxoMz5TZW5kIE5ldyBNZXNzYWdlPC9oMz5cclxuICAgICAgPGZvcm0gYWN0aW9uPVwiXCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgIGlkPVwibmV3LW1lc3NhZ2UtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIk5ldyBNZXNzYWdlXCI+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICAgIDxidXR0b24gaWQ9XCJzZW5kLWNoYXRcIj5TZW5kIE1lc3NhZ2U8L2J1dHRvbj5cclxuICAgIDwvZGl2PmA7XHJcbiAgfSxcclxuICBhY3RpdmF0ZVNlbmRCdXR0b246ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJzZW5kLWNoYXRcIikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1tZXNzYWdlLWlucHV0XCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IG9iamVjdFRvUG9zdCA9IGJ1aWxkQ2hhdE9iamVjdChtZXNzYWdlVmFsKTtcclxuICAgICAgICBDaGF0Q29sbGVjdGlvbi5zZW5kTmV3TWVzc2FnZShvYmplY3RUb1Bvc3QpO1xyXG4gICAgICAgIENoYXRMaXN0KCk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctbWVzc2FnZS1pbnB1dFwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICApXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDaGF0Rm9ybTsiLCJpbXBvcnQgYnVpbGRDaGF0IGZyb20gXCIuL0NoYXQuanNcIlxyXG5pbXBvcnQgQ2hhdENvbGxlY3Rpb24gZnJvbSBcIi4vQ2hhdENvbGxlY3Rpb24uanNcIlxyXG5pbXBvcnQgQ2hhdEZvcm0gZnJvbSBcIi4vQ2hhdEZvcm0uanNcIlxyXG5cclxuLy8gQSBDb250YWN0TGlzdCBjb21wb25lbnQgdGhhdCBkaXNwbGF5cyBhbGwgY29udGFjdHMuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3QgY29tcG9uZW50IGFuZCB0aGUgQ29udGFjdENvbGxlY3Rpb24gY29tcG9uZW50LlxyXG5cclxuXHJcbmNvbnN0IENoYXRMaXN0ID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGF0LW91dHB1dFwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgbGV0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIik7XHJcbiAgICBDaGF0Q29sbGVjdGlvbi5nZXRBbGxDaGF0cygpXHJcbiAgICAudGhlbihjaGF0ID0+IHtcclxuICAgICAgICBjaGF0LmZvckVhY2goc2luZ2xlQ2hhdCA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdC1vdXRwdXRcIikuaW5uZXJIVE1MICs9IGJ1aWxkQ2hhdChzaW5nbGVDaGF0KTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0pXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQ2hhdExpc3Q7XHJcbiIsImNvbnN0IGJ1aWxkQ2hhdE9iamVjdCA9IChtZXNzYWdlUGFyYW0pID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VQYXJhbSxcclxuICAgICAgdXNlcklkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICB9O1xyXG4gIH07XHJcbmV4cG9ydCBkZWZhdWx0IGJ1aWxkQ2hhdE9iamVjdDsiLCJpbXBvcnQgQ2hhdExpc3QgZnJvbSBcIi4vQ2hhdExpc3RcIlxyXG5pbXBvcnQgQ2hhdEZvcm0gZnJvbSBcIi4vQ2hhdEZvcm1cIlxyXG5cclxuLy8gVGhpcyBtb2R1bGUgYnVpbGRzIHRoZSBjaGF0IGxpc3QgdmlldyBvbmNlIGEgdXNlciBoYXMgbG9nZ2VkIGluXHJcbmNvbnN0IGxvYWRQYWdlQWZ0ZXJMb2dpbiA9ICgpID0+IHtcclxuLy9CdWlsZHMgQ2hhdCBGb3JtXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuaW5uZXJIVE1MICs9IENoYXRGb3JtLnJlbmRlckNoYXRGb3JtKCk7XHJcbi8vIC8vIEJ1aWxkcyBDaGF0IExpc3RcclxuQ2hhdExpc3QoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9hZFBhZ2VBZnRlckxvZ2luOyIsImNvbnN0IGFwaUZldGNoID0ge1xyXG4gICAgYWRkVXNlcjogKHBhcnNlZFVzZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJzZWRVc2VyKVxyXG4gICAgICAgIH0pLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhbGxVc2VyczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS91c2Vyc1wiKVxyXG4gICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgdXNlckxvZ2luOiAodXNlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3VzZXJzP3VzZXI9JHt1c2VyfWApXHJcbiAgICAgICAgLnRoZW4ociA9PiByLmpzb24oKSlcclxuXHJcbiAgICAgfVxyXG59XHJcbiBleHBvcnQgZGVmYXVsdCBhcGlGZXRjaDsiLCJpbXBvcnQgcmVnaXN0ZXIgZnJvbSBcIi4vcmVnaXN0ZXJcIlxyXG5pbXBvcnQgaGFuZGxlTG9naW4gZnJvbSBcIi4vbG9naW5cIjtcclxuaW1wb3J0IGhhbmRsZUxvZ291dCBmcm9tIFwiLi9sb2dvdXRcIlxyXG5cclxuY29uc3QgY2xpY2tzID0ge1xyXG4gICAgcmVnOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlci1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgcmVnaXN0ZXIucmVnKClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjcmVhdGUtYnRuXCIpKXtcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyLmhhbmRsZVJlZ2lzdGVyKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZmlyc3RMb2c6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWJ0bm5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaGFuZGxlTG9naW4uZmlyc3RMb2coKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibG9naW5cIikpe1xyXG4gICAgICAgICAgICBoYW5kbGVMb2dpbi5sb2dpbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGxvZ291dDogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJsb2dvdXRcIikpe1xyXG4gICAgICAgICAgICBoYW5kbGVMb2dvdXQoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xpY2tzIiwiY29uc3QgYXV0aEZvcm0gPSB7XHJcbiAgICBob21lOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkPVwiaG9tZS1jb250YWluZXJcIj5cclxuICAgICAgICA8aDE+V2VsY29tZSB0byBOdXRTaGVsbCA8aW1nIGNsYXNzPSBcImljb25cIiBzcmM9XCJodHRwczovL3N0YXRpYy50aGVub3VucHJvamVjdC5jb20vcG5nLzE5NTQyNi0yMDAucG5nXCIgYWx0PVwiXCIgPjwvaDE+XHJcbiAgICAgICAgPGRpdiBpZCA9XCJob21lLWJ1dHRvblwiPlxyXG4gICAgICAgIDxkaXYgaWQgPVwibG9naW4tZGl2XCI+PGJ1dHRvbiBpZD1cImxvZ2luLWJ0bm5cIj5Mb2dpbjwvYnV0dG9uPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQgPVwicmVnaXN0ZXJcIj48YnV0dG9uIGlkPVwicmVnaXN0ZXItYnRuXCI+UmVnaXN0ZXI8L2J1dHRvbj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcblxyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkPVwicmVnaXN0ZXItYXR0ZW1wdFwiPlxyXG4gICAgICAgICAgICA8Zm9ybSBpZD1cInJlZ2lzdGVyLWZvcm1cIj5cclxuICAgICAgICAgICAgPGRpdiBpZD1cImlucHV0LWZpZWxkc1wiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJuYW1lLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwiZW1haWwtcmVnaXN0ZXJcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgdHlwZT1cImVtYWlsXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJuYW1lLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInBhc3N3b3JkLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgIDxidXR0b24gaWQ9XCJjcmVhdGUtYnRuXCIgY2xhc3M9XCJjcmVhdGUtYnRuXCI+Q3JlYXRlIEFjY291bnQ8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgYFxyXG5cclxuICAgIH0sXHJcbiAgICBsb2dpbjogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cImxvZ2luLWF0dGVtcHRcIj5cclxuICAgICAgICA8Zm9ybSBpZD1cImxvZ2luLWZvcm1cIj5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJsb2dpbi1uYW1lXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJsb2dpbi1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImpoLWF0dGVtcHRcIiBjbGFzcz1cImxvZ2luXCI+TG9naW48L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9LFxyXG4gICAgbWFpbjogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGJ1dHRvbiBpZCA9IFwibG9nb3V0QnV0dG9uXCIgY2xhc3M9XCJsb2dvdXRcIj5Mb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGF1dGhGb3JtIiwiaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5pbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vZm9ybXNcIjtcclxuaW1wb3J0IGxvYWRQYWdlQWZ0ZXJMb2dpbiBmcm9tIFwiLi4vQ2hhdC9sb2FkUGFnZUFmdGVyTG9naW5cIjtcclxuaW1wb3J0IGZvcm0gZnJvbSBcIi4uL3Rhc2svdGFza0Zvcm1cIlxyXG5pbXBvcnQgcHJpbnQgZnJvbSBcIi4uL3Rhc2svcHJpbnRUYXNrXCJcclxuaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuLi9ldmVudHMvcHJpbnRBbGxFdmVudHNcIlxyXG5pbXBvcnQgY2xpY2tXaXphcmQgZnJvbSBcIi4uL2V2ZW50cy9jbGlja1wiXHJcblxyXG5cclxuY29uc3QgaGFuZGxlTG9naW4gPSB7XHJcbiAgICBmaXJzdExvZzogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLmxvZ2luKClcclxuICAgIH0sXHJcbiAgICBsb2dpbjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLW5hbWVcIikudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGFzc1ZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tcGFzc1wiKS52YWx1ZTtcclxuICAgICAgICBhcGlGZXRjaC51c2VyTG9naW4odXNlclZhbClcclxuICAgICAgICAgICAgLnRoZW4oKHBhcnNlZFVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHBhc3NWYWwgPT09IHBhcnNlZFVzZXJbMF0ucGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5tYWluKClcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS50YXNrRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLmNyZWF0ZVRhc2soKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIHBhcnNlZFVzZXJbMF0uaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZFBhZ2VBZnRlckxvZ2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbnRBbGxFdmVudHMoKVxyXG4gICAgICAgICAgICAgICAgICAgIHByaW50KClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXcm9uZyBwYXNzd29yZCwgdHJ5IGFnYWluIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVMb2dpbiIsImltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9mb3Jtc1wiXHJcbi8vIGltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9hdXRoL2Zvcm1zXCI7XHJcbmltcG9ydCBjbGlja3MgZnJvbSBcIi4vY2xpY2tzXCJcclxuY29uc3QgaGFuZGxlTG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJJZFwiKVxyXG4gICAgY29uc29sZS5sb2coXCJIZWxsb1wiKVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpbnQtdGFza1wiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gYXV0aEZvcm0uaG9tZSgpXHJcbi8vIEF0dGVtcHRpbmcgdG8gbWFrZSBpdCB3aGVyZSBhZnRlciB5b3UgbG9nb3V0IHlvdSBjYW4gbG9nIGJhY2sgaW4gLyB0aG91Z2h0IGltcG9ydGluZyBhbGwgdGhlIGNsaWNrcyB3b3VsZCB3b3JrIGJ1dCBpdCBkb2Vzbid0IGxvb2sgbGlrZSBpdCAuOilcclxuICAgIGNsaWNrcy5yZWcoKVxyXG4gICAgY2xpY2tzLnJlZ2lzdGVyKClcclxuICAgIGNsaWNrcy5maXJzdExvZygpXHJcbiAgICBjbGlja3MubG9nb3V0KClcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtQ29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRDb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpblwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXQtd3JhcHBlclwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGhhbmRsZUxvZ291dCIsImNvbnN0IHVzZXJPYmogPSAobmFtZVBhcmFtLCBlbWFpbFBhcmFtLCB1c2VyUGFyYW0sIHBhc3NQYXJhbSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgIG5hbWU6IG5hbWVQYXJhbSxcclxuICAgIGVtYWlsOiBlbWFpbFBhcmFtLFxyXG4gICAgdXNlcjogdXNlclBhcmFtLFxyXG4gICAgcGFzc3dvcmQ6IHBhc3NQYXJhbVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlck9iaiIsImltcG9ydCB1c2VyT2JqIGZyb20gXCIuL29iamVjdEJ1aWxkZXJcIlxyXG5pbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9mb3Jtc1wiXHJcbmltcG9ydCBDaGF0TGlzdCBmcm9tIFwiLi4vQ2hhdC9DaGF0TGlzdFwiO1xyXG5pbXBvcnQgcHJpbnRBbGxFdmVudHMgZnJvbSBcIi4uL2V2ZW50cy9wcmludEFsbEV2ZW50c1wiO1xyXG5pbXBvcnQgZm9ybSBmcm9tIFwiLi4vdGFzay90YXNrRm9ybVwiXHJcblxyXG5jb25zdCByZWdpc3RlciA9IHtcclxuXHJcbiAgICByZWc6ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLnJlZ2lzdGVyKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGhhbmRsZVJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICBjb25zdCBuYW1lVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuYW1lLXJlZ2lzdGVyXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgZW1haWxWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VtYWlsLXJlZ2lzdGVyXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgdXNlclZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcm5hbWUtcmVnaXN0ZXJcIikudmFsdWU7XHJcbiAgICBjb25zdCBwYXNzVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYXNzd29yZC1yZWdpc3RlclwiKS52YWx1ZTtcclxuXHJcbiAgICBjb25zdCB1c2VySW5wdXQgPSB1c2VyT2JqKG5hbWVWYWwsIGVtYWlsVmFsLCB1c2VyVmFsLCBwYXNzVmFsKVxyXG4gICAgYXBpRmV0Y2guYWRkVXNlcih1c2VySW5wdXQpXHJcbiAgICAudGhlbigocGFyc2VkVXNlcikgPT4ge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgcGFyc2VkVXNlci5pZClcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLm1haW4oKVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLnRhc2tGb3JtKCk7XHJcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpblwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5tYWluKCk7XHJcbiAgICAgICAgcHJpbnRBbGxFdmVudHMoKTtcclxuICAgICAgICBDaGF0TGlzdCgpO1xyXG5cclxuICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlZ2lzdGVyIiwiaW1wb3J0IENoYXRDb2xsZWN0aW9uIGZyb20gXCIuL0NoYXRDb2xsZWN0aW9uXCJcclxuaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuL0NoYXRMaXN0XCJcclxuXHJcbmNvbnN0IGFjdGl2YXRlRGVsZXRlQnV0dG9ucyA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdC1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlLWNoYXRcIikpe1xyXG4gICAgICAgICAgICBjb25zdCBpZFRvRGVsZXRlID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsyXTtcclxuICAgICAgICAgICAgQ2hhdENvbGxlY3Rpb24uZGVsZXRlQ2hhdChpZFRvRGVsZXRlKVxyXG4gICAgICAgICAgICAudGhlbihDaGF0TGlzdClcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhY3RpdmF0ZURlbGV0ZUJ1dHRvbnM7IiwiaW1wb3J0IGJ1aWxkQ2hhdE9iamVjdCBmcm9tIFwiLi9DaGF0T2JqXCI7XHJcbmltcG9ydCBDaGF0Q29sbGVjdGlvbiBmcm9tIFwiLi9DaGF0Q29sbGVjdGlvblwiO1xyXG5pbXBvcnQgQ2hhdExpc3QgZnJvbSBcIi4vQ2hhdExpc3RcIjtcclxuaW1wb3J0IENoYXRGb3JtIGZyb20gXCIuL0NoYXRGb3JtXCI7XHJcblxyXG5jb25zdCBoYW5kbGVFZGl0ZWRDaGF0ID0gKCkgPT4ge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQuaWQuaW5jbHVkZXMoXCJlZGl0LWNoYXRcIikpIHtcclxuICAgICAgLy8gR2V0IHRoZSB1c2VyJ3MgaW5wdXRcclxuICAgICAgY29uc3QgbWVzc2FnZVZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LW1lc3NhZ2UtaW5wdXRcIikudmFsdWU7XHJcbiAgICAgIGNvbnN0IGNoYXRJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl07XHJcbiAgICAgIC8vIFR1cm4gdGhlIHVzZXIncyBpbnB1dCBpbnRvIGFuIG9iamVjdFxyXG4gICAgICBjb25zdCBvYmplY3RUb1Bvc3QgPSBidWlsZENoYXRPYmplY3QobWVzc2FnZVZhbCk7XHJcblxyXG4gICAgICBDaGF0Q29sbGVjdGlvbi5lZGl0Q2hhdChjaGF0SWQsIG9iamVjdFRvUG9zdCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgQ2hhdExpc3QoKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tb3V0cHV0XCIpLmlubmVySFRNTCA9IENoYXRGb3JtLmJ1aWxkRm9ybSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhhbmRsZUVkaXRlZENoYXQ7IiwiaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuL3ByaW50QWxsRXZlbnRzXCI7XHJcbmNvbnN0IGV2ZW50QXBpTWFuYWdlciA9IHtcclxuICAgICAgICBnZXRBbGxFdmVudHM6ICh1c2VySWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9ldmVudHMvP3VzZXJJZD0ke3VzZXJJZH1gKVxyXG4gICAgICAgICAgICAudGhlbihldmVudHMgPT4gZXZlbnRzLmpzb24oKSlcclxuICAgIH0sICBwb3N0TmV3RXZlbnQ6IGV2ZW50T2JqZWN0ID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvZXZlbnRzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnRPYmplY3QpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9LCBkZWxldGVFdmVudDogKGlkVG9EZWxldGUpID0+IHtcclxuICAgICAgICBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L2V2ZW50cy8ke2lkVG9EZWxldGV9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcHJpbnRBbGxFdmVudHMoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSwgZ2V0U2luZ2xlRXZlbnQ6IChpZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L2V2ZW50cy8ke2lkfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sICBlZGl0RXZlbnQ6IChpZFBhcmFtLCBldmVudFRvRWRpdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L2V2ZW50cy8ke2lkUGFyYW19YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGV2ZW50VG9FZGl0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRBcGlNYW5hZ2VyOyIsImNvbnN0IGJ1aWxkU2luZ2xlRXZlbnQgPSAoc2luZ2xlRXZlbnQpID0+IHtcclxuICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZCA9IFwiZXZlbnRDb250YWluZXItJHtzaW5nbGVFdmVudC5pZH1cIiBjbGFzcyA9IFwiYWxsRGFFdmVudHNcIj5cclxuICAgICAgICAgICAgPGgyPiR7c2luZ2xlRXZlbnQubmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgPHA+RGF0ZTogICR7c2luZ2xlRXZlbnQuZGF0ZX08L3A+XHJcbiAgICAgICAgICAgICAgICA8cD5Mb2NhdGlvbjogICR7c2luZ2xlRXZlbnQubG9jYXRpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgPGJyPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdEJ1dHRvblwiIGlkPSBcImVkaXRFdmVudEJ1dHRvbi0ke3NpbmdsZUV2ZW50LmlkfVwiPlVwZGF0ZTwvYnV0dG9uPiA8YnV0dG9uIGNsYXNzPVwiZGVsZXRlQnV0dG9uXCIgaWQ9IFwiZGVsZXRlQnV0dG9uLSR7c2luZ2xlRXZlbnQuaWR9XCI+RGVsZXRlPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGhyPmBcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRTaW5nbGVFdmVudDsiLCJpbXBvcnQgZXZlbnRGb3JtQnVpbGRlciBmcm9tIFwiLi9ldmVudEZvcm1cIjtcclxuaW1wb3J0IGJ1aWxkRXZlbnRPYmplY3QgZnJvbSBcIi4vZXZlbnRPYmplY3RcIjtcclxuaW1wb3J0IGV2ZW50QXBpTWFuYWdlciBmcm9tIFwiLi9hcGlNYW5hZ2VyXCI7XHJcbmltcG9ydCBwcmludEFsbEV2ZW50cyBmcm9tIFwiLi9wcmludEFsbEV2ZW50c1wiO1xyXG5pbXBvcnQgZXZlbnRFZGl0Rm9ybUJ1aWxkZXIgZnJvbSBcIi4vZWRpdEZvcm1cIjtcclxuY29uc3QgY2xpY2tXaXphcmQgPSB7XHJcbiAgICBhZGRFdmVudEZ1bmN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJhZGRFdmVudEJ1dHRvblwiKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybUNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBldmVudEZvcm1CdWlsZGVyLmV2ZW50Rm9ybUlucHV0cygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgKVxyXG4gICAgfSxcclxuICAgIHNhdmVFdmVudEZ1bmN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzYXZlRXZlbnRCdXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtTmFtZVwiKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtRGF0ZVwiKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybUxvY2F0aW9uXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RXZlbnRPYmplY3QgPSBidWlsZEV2ZW50T2JqZWN0KG5hbWVWYWx1ZSwgZGF0ZVZhbHVlLCBsb2NhdGlvblZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50QXBpTWFuYWdlci5wb3N0TmV3RXZlbnQobmV3RXZlbnRPYmplY3QpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocHJpbnRBbGxFdmVudHMpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1OYW1lXCIpLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtRGF0ZVwiKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybUxvY2F0aW9uXCIpLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZWRpdEJ1dHRvbkZ1bmN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0QnV0dG9uXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnRFZGl0SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLmdldFNpbmdsZUV2ZW50KGV2ZW50RWRpdElkKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVFdmVudEluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2V2ZW50Q29udGFpbmVyLSR7ZXZlbnRFZGl0SWR9YCkuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRDb250YWluZXItJHtldmVudEVkaXRJZH1gKS5pbm5lckhUTUwgPSBldmVudEVkaXRGb3JtQnVpbGRlcihzaW5nbGVFdmVudEluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHNhdmVFZGl0QnV0dG9uRnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmVFZGl0ZWRFdmVudFwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsxXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRlZE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRFZGl0TmFtZS0ke2l0ZW1JZH1gKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRlZERhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRFZGl0RGF0ZS0ke2l0ZW1JZH1gKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVkaXRlZExvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2V2ZW50RWRpdExvY2F0aW9uLSR7aXRlbUlkfWApLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkRXZlbnRPYmplY3QgPSBidWlsZEV2ZW50T2JqZWN0KGVkaXRlZE5hbWUsIGVkaXRlZERhdGUsIGVkaXRlZExvY2F0aW9uKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50QXBpTWFuYWdlci5lZGl0RXZlbnQoaXRlbUlkLCBlZGl0ZWRFdmVudE9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihwcmludEFsbEV2ZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZUJ1dHRvbkZ1bmN0aW9uOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGVCdXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBldmVudERlbGV0ZUlkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsxXTtcclxuICAgICAgICAgICAgICAgIGV2ZW50QXBpTWFuYWdlci5kZWxldGVFdmVudChldmVudERlbGV0ZUlkKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBjbGlja1dpemFyZDsiLCJjb25zdCBldmVudEVkaXRGb3JtQnVpbGRlciA9IChzaW5nbGVFdmVudCkgPT4ge1xyXG4gICAgcmV0dXJuIGA8Zm9ybSBpZCA9IFwiZXZlbnRGb3JtSW5wdXRzXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50RWRpdE5hbWUtJHtzaW5nbGVFdmVudC5pZH1cIiBwbGFjZWhvbGRlciA9IFwibmFtZVwiIHZhbHVlPVwiJHtzaW5nbGVFdmVudC5uYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEVkaXREYXRlLSR7c2luZ2xlRXZlbnQuaWR9XCIgcGxhY2Vob2xkZXIgPSBcImRhdGVcIiB2YWx1ZT1cIiR7c2luZ2xlRXZlbnQuZGF0ZX1cIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRFZGl0TG9jYXRpb24tJHtzaW5nbGVFdmVudC5pZH1cIiBwbGFjZWhvbGRlciA9IFwibG9jYXRpb25cIiB2YWx1ZT1cIiR7c2luZ2xlRXZlbnQubG9jYXRpb259XCI+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZCA9IFwic2F2ZUVkaXRlZEV2ZW50LSR7c2luZ2xlRXZlbnQuaWR9XCIgY2xhc3MgPSBcInNhdmVFZGl0ZWRFdmVudFwiPlNhdmUgZXZlbnQ8L2J1dHRvbmBcclxufVxyXG5leHBvcnQgZGVmYXVsdCBldmVudEVkaXRGb3JtQnVpbGRlcjsiLCJjb25zdCBldmVudEZvcm1CdWlsZGVyID0gIHtcclxuICAgIGV2ZW50Rm9ybUlucHV0czogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGA8Zm9ybSBpZCA9IFwiZXZlbnRGb3JtSW5wdXRzXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50Rm9ybU5hbWVcIiBwbGFjZWhvbGRlciA9IFwibmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEZvcm1EYXRlXCIgcGxhY2Vob2xkZXIgPSBcImRhdGVcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRGb3JtTG9jYXRpb25cIiBwbGFjZWhvbGRlciA9IFwibG9jYXRpb25cIj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkID0gXCJzYXZlTmV3RXZlbnRcIiBjbGFzcyA9IFwic2F2ZUV2ZW50QnV0dG9uXCI+U2F2ZSBldmVudDwvYnV0dG9uYFxyXG59LFxyXG5cclxuICAgZXZlbnRCdXR0b246IGA8aHI+PGJ1dHRvbiBpZD1cImFkZEV2ZW50QnV0dG9uXCI+QWRkIGFuIEV2ZW50ITwvYnV0dG9uPmBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRGb3JtQnVpbGRlcjsiLCJjb25zdCBidWlsZEV2ZW50T2JqZWN0ID0gKG5hbWVQYXJhbSwgZGF0ZVBhcmFtLCBsb2NhdGlvblBhcmFtKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6IG5hbWVQYXJhbSxcclxuICAgICAgICBkYXRlOiBkYXRlUGFyYW0sXHJcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uUGFyYW0sXHJcbiAgICAgICAgdXNlcklkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRFdmVudE9iamVjdCIsImltcG9ydCBldmVudEFwaU1hbmFnZXIgZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBidWlsZFNpbmdsZUV2ZW50IGZyb20gXCIuL2J1aWxkU2luZ2xlRXZlbnRcIlxyXG5pbXBvcnQgZXZlbnRGb3JtQnVpbGRlciBmcm9tIFwiLi9ldmVudEZvcm1cIjtcclxuY29uc3QgcHJpbnRBbGxFdmVudHMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtQ29udGFpbmVyXCIpLmlubmVySFRNTCA9IGV2ZW50Rm9ybUJ1aWxkZXIuZXZlbnRCdXR0b247XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Q29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBldmVudEFwaU1hbmFnZXIuZ2V0QWxsRXZlbnRzKHVzZXJJZClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZm9yRWFjaChzaW5nbGVFdmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Q29udGFpbmVyXCIpLmlubmVySFRNTCArPSBidWlsZFNpbmdsZUV2ZW50KHNpbmdsZUV2ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH07XHJcbmV4cG9ydCBkZWZhdWx0IHByaW50QWxsRXZlbnRzO1xyXG4iLCJcclxuaW1wb3J0IENoYXRGb3JtIGZyb20gXCIuL0NoYXQvQ2hhdEZvcm0uanNcIjtcclxuaW1wb3J0IGxvYWRQYWdlQWZ0ZXJMb2dpbiBmcm9tIFwiLi9DaGF0L2xvYWRQYWdlQWZ0ZXJMb2dpbi5qc1wiO1xyXG5pbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vYXV0aC9mb3Jtc1wiO1xyXG5pbXBvcnQgY2xpY2tzIGZyb20gXCIuL2F1dGgvY2xpY2tzXCJcclxuaW1wb3J0IGFjdGl2YXRlRWRpdEJ1dHRvbiBmcm9tIFwiLi90YXNrL2VkaXRcIlxyXG5pbXBvcnQgaGFuZGxlRWRpdFRhc2sgZnJvbSBcIi4vdGFzay9oYW5kbGVFZGl0XCJcclxuaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2F1dGgvYXBpTWFuYWdlclwiXHJcbmltcG9ydCBoYW5kbGVMb2dpbiBmcm9tIFwiLi9hdXRoL2xvZ2luXCJcclxuaW1wb3J0IGV2ZW50QXBpTWFuYWdlciBmcm9tIFwiLi9ldmVudHMvYXBpTWFuYWdlclwiXHJcbmltcG9ydCBjbGlja1dpemFyZCBmcm9tIFwiLi9ldmVudHMvY2xpY2tcIlxyXG4vLyBpbXBvcnQgaGFuZGxlTG9naW4gZnJvbSBcIi4vYXV0aC9sb2dpblwiXHJcbi8vIHRhc2sgaW1wb3J0c1xyXG4vLyBpbXBvcnQgZm9ybSBmcm9tIFwiLi90YXNrL3Rhc2tGb3JtXCJcclxuaW1wb3J0IHRhc2tDbGlja3MgZnJvbSBcIi4vdGFzay9jbGlja3NcIlxyXG5pbXBvcnQgYWN0aXZhdGVEZWxldGVCdXR0b25zIGZyb20gXCIuL2NoYXQvRGVsZXRlQ2hhdFwiXHJcbmltcG9ydCBoYW5kbGVFZGl0ZWRDaGF0IGZyb20gXCIuL2NoYXQvU2F2ZUVkaXRcIlxyXG5cclxuXHJcbi8vIGFwaUZldGNoKCk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5ob21lKCk7XHJcbmNsaWNrcy5yZWcoKVxyXG5jbGlja3MucmVnaXN0ZXIoKVxyXG5jbGlja3MuZmlyc3RMb2coKVxyXG5jbGlja3MubG9naW4oKVxyXG5jbGlja3MubG9nb3V0KClcclxuQ2hhdEZvcm0uYWN0aXZhdGVTZW5kQnV0dG9uKCk7XHJcbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLm5ld1Rhc2tGb3JtKClcclxudGFza0NsaWNrcy5jcmVhdGVUYXNrKCk7XHJcbnRhc2tDbGlja3MubmV3VGFzaygpXHJcbnRhc2tDbGlja3Muc2F2ZVRhc2soKVxyXG50YXNrQ2xpY2tzLmRlbGV0ZVRhc2soKVxyXG5hY3RpdmF0ZUVkaXRCdXR0b24oKTtcclxuaGFuZGxlRWRpdFRhc2soKVxyXG5jbGlja1dpemFyZC5hZGRFdmVudEZ1bmN0aW9uKClcclxuY2xpY2tXaXphcmQuc2F2ZUV2ZW50RnVuY3Rpb24oKVxyXG5jbGlja1dpemFyZC5lZGl0QnV0dG9uRnVuY3Rpb24oKVxyXG5jbGlja1dpemFyZC5zYXZlRWRpdEJ1dHRvbkZ1bmN0aW9uKClcclxuY2xpY2tXaXphcmQuZGVsZXRlQnV0dG9uRnVuY3Rpb24oKVxyXG5hY3RpdmF0ZURlbGV0ZUJ1dHRvbnMoKTtcclxuaGFuZGxlRWRpdGVkQ2hhdCgpO1xyXG4iLCJjb25zdCBhcGlGZXRjaCA9IHtcclxuICAgIHNpbmdsZVRhc2s6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvdGFza3NcIilcclxuICAgICAgICAgICAgLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhZGR0YXNrOiAodGFza3MpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvdGFza3NcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0YXNrcylcclxuICAgICAgICB9KS50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgYWxsVGFzazogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvdGFza3M/dXNlcklkPSR7YWN0aXZlVXNlcklkfWApXHJcbiAgICAgICAgLnRoZW4ocj0+ci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlVGFzazogKHRhc2tJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3Rhc2tzLyR7dGFza0lkfWAsIHtcclxuICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGVkaXRUYXNrOiAodGFza0lkLCB1c2VySW5wdXQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS90YXNrcy8ke3Rhc2tJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodXNlcklucHV0KVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZWRpdFNpbmdsZTogKHRhc2tJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3Rhc2tzLyR7dGFza0lkfWApXHJcbiAgICAgICAgLnRoZW4ocj0+ci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgbWFya0FzQ29tcGxldGU6ICh0YXNrSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS90YXNrcy8ke3Rhc2tJZH1gLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7Y29tcGxldGVkOiBcInRydWVcIn0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1hcmtBc0luY29tcGxldGU6ICh0YXNrSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS90YXNrcy8ke3Rhc2tJZH1gLCB7XHJcbiAgICAgICAgICBtZXRob2Q6IFwiUEFUQ0hcIixcclxuICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7Y29tcGxldGVkOiBcImZhbHNlXCJ9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwaUZldGNoIiwiaW1wb3J0IGZvcm0gZnJvbSBcIi4vdGFza0Zvcm1cIlxyXG5pbXBvcnQgcHJpbnQgZnJvbSBcIi4vcHJpbnRUYXNrXCJcclxuaW1wb3J0IGhhbmRsZUxvZ291dCBmcm9tIFwiLi4vYXV0aC9sb2dvdXRcIlxyXG5pbXBvcnQgdGFza09iaiBmcm9tIFwiLi9vYmplY3RCdWlsZGVyXCJcclxuaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5cclxuXHJcbmNvbnN0IHRhc2tDbGlja3MgPSB7XHJcbiAgICBjcmVhdGVUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNyZWF0ZS1uZXctdGFza1wiKSl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS50YXNrRm9ybSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sXHJcbiAgICBuZXdUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctdGFza1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS50YXNrRm9ybSgpXHJcbiAgICAgICAgLy8gICAgIHByaW50KClcclxuICAgICAgICAvLyB9KVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmV3LXRhc2tcIikpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLnRhc2tGb3JtKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc2F2ZVRhc2s6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmUtdGFza1wiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza1ZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi10YXNrXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcGxldGUtZGF0ZVwiKS52YWx1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VySW5wdXQgPSB0YXNrT2JqKHRhc2tWYWwsIGRhdGVWYWwpXHJcbiAgICAgICAgICAgICAgICBhcGlGZXRjaC5hZGR0YXNrKHVzZXJJbnB1dClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLXRhc2tcIikudmFsdWUgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcGxldGUtZGF0ZVwiKS52YWx1ZSA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNoZWNrYm94XCIpKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07IC8vIDE0XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YXNrSWQpXHJcbiAgICAgICAgICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2hlY2tib3gtJHt0YXNrSWR9YCkuY2hlY2tlZCl7XHJcbiAgICAgICAgICAgICAgICAgIGFwaUZldGNoLm1hcmtBc0NvbXBsZXRlKHRhc2tJZClcclxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Bvc3NpYmx5LSR7dGFza0lkfWApLmNsYXNzTGlzdC5hZGQoXCJjaGVja2VkLWNsYXNzXCIpXHJcbiAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2stcHJpbnRcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgYXBpRmV0Y2gubWFya0FzSW5jb21wbGV0ZSh0YXNrSWQpXHJcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwb3NzaWJseS0ke3Rhc2tJZH1gKS5jbGFzc0xpc3QucmVtb3ZlKFwiY2hlY2tlZC1jbGFzc1wiKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICAvLyBzYXZlVGFzazogKCkgPT4ge1xyXG4gICAgLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2F2ZS10YXNrXCIpKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCB0YXNrVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLXRhc2tcIikudmFsdWU7XHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBkYXRlVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlO1xyXG5cclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRhc2tPYmoodGFza1ZhbCwgZGF0ZVZhbClcclxuICAgIC8vICAgICAgICAgICAgIGFwaUZldGNoLmFkZHRhc2sodXNlcklucHV0KVxyXG4gICAgLy8gICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgcHJpbnQoKVxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tdGFza1wiKS52YWx1ZSA9IFwiXCJcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlID0gXCJcIlxyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0pXHJcblxyXG4gICAgLy8gICAgICAgICB9XHJcbiAgICAvLyAgICAgfSlcclxuICAgIC8vIH0sXHJcbiAgICBsb2dvdXQ6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImxvZ291dFwiKSlcclxuICAgICAgICAgICAgICAgIGhhbmRsZUxvZ291dCgpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBkZWxldGVUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLWRlbGV0ZS1idG5cIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUlkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsyXTtcclxuICAgICAgICAgICAgICAgIGFwaUZldGNoLmRlbGV0ZVRhc2soZGVsZXRlSWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludCgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tDbGlja3MiLCJpbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBoYW5kbGVFZGl0VGFzayBmcm9tIFwiLi9oYW5kbGVFZGl0XCJcclxuLy8gZmlyc3QgZWRpdCBjbGlja1xyXG5cclxuY29uc3QgYWN0aXZhdGVFZGl0QnV0dG9uID0gKCkgPT4ge1xyXG4gICAgLy8gZGVidWdnZXI7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdFwiKSkge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJoZWxsb1wiKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpKVxyXG4gICAgICAgICAgICBhcGlGZXRjaC5lZGl0U2luZ2xlKGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoc2luZ2xlVGFzaykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi10YXNrXCIpLnZhbHVlID0gc2luZ2xlVGFzay50YXNrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcGxldGUtZGF0ZVwiKS52YWx1ZSA9IHNpbmdsZVRhc2suZGF0ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLXRhc2tcIikudGV4dENvbnRlbnQgPSBcIkVkaXQgVGFza1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2F2ZS10YXNrXCIpLmNsYXNzTGlzdC5hZGQoXCJuZXdDbGFzc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2F2ZS10YXNrXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJzYXZlLXRhc2tcIilcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NhdmUtdGFza1wiKS5pZCA9IGBlZGl0LXRhc2stJHtzaW5nbGVUYXNrLmlkfWBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZhdGVFZGl0QnV0dG9uOyIsImltcG9ydCB0YXNrT2JqIGZyb20gXCIuL29iamVjdEJ1aWxkZXJcIjtcclxuaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIjtcclxuaW1wb3J0IGZvcm0gZnJvbSBcIi4vdGFza0Zvcm1cIjtcclxuaW1wb3J0IHByaW50IGZyb20gXCIuL3ByaW50VGFza1wiXHJcbi8vIGFmdGVyIGVkaXRpbmcgdGFza1xyXG5cclxuY29uc3QgaGFuZGxlRWRpdGVkVGFzayA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZXdDbGFzc1wiKSkge1xyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgY29uc3QgdGFza05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tdGFza1wiKS52YWx1ZVxyXG4gICAgICAgICAgICBjb25zdCB0YXNrRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcGxldGUtZGF0ZVwiKS52YWx1ZVxyXG4gICAgICAgICAgICBjb25zdCB0YXNrSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzJdO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgb2JqZWN0ID0gdGFza09iaih0YXNrTmFtZSwgdGFza0RhdGUpXHJcbiAgICAgICAgICAgIGFwaUZldGNoLmVkaXRUYXNrKHRhc2tJZCwgb2JqZWN0KS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgcHJpbnQoKVxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctdGFzay1jb250YWluZXJcIikuaW5uZXJIVE1MID0gZm9ybS50YXNrRm9ybSgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVFZGl0ZWRUYXNrIiwiLy8gY29uc3QgdGFza09iaiA9ICh0YXNrUGFyYW0sIGRhdGVQYXJhbSkgPT4ge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgICB0YXNrOiB0YXNrUGFyYW0sXHJcbi8vICAgICAgICAgZGF0ZTogZGF0ZVBhcmFtLFxyXG4vLyAgICAgICAgIHVzZXJJZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4vLyAgICAgfVxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCB0YXNrT2JqXHJcbmNvbnN0IHRhc2tPYmogPSAodGFza1BhcmFtLCBkYXRlUGFyYW0sIGlzSXRDb21wbGV0ZSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0YXNrOiB0YXNrUGFyYW0sXHJcbiAgICAgICAgZGF0ZTogZGF0ZVBhcmFtLFxyXG4gICAgICAgIGNvbXBsZXRlZDogaXNJdENvbXBsZXRlLFxyXG4gICAgICAgIHVzZXJJZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrT2JqIiwiaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5pbXBvcnQgcHJpbnRUYXNrQnVpbGRlciBmcm9tIFwiLi9wcmludFRhc2tCdWlsZGVyXCJcclxuaW1wb3J0IGZvcm0gZnJvbSBcIi4vdGFza0Zvcm1cIlxyXG5cclxuY29uc3QgcHJpbnQgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW50LXRhc2tcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgYXBpRmV0Y2guYWxsVGFzaygpXHJcbiAgICAudGhlbih0YXNrcyA9PiB7XHJcbiAgICAgICAgdGFza3MuZm9yRWFjaChzaW5nbGVUYXNrID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmludC10YXNrXCIpLmlubmVySFRNTCArPSBwcmludFRhc2tCdWlsZGVyKHNpbmdsZVRhc2spXHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50IiwiLy8gY29uc3QgcHJpbnRUYXNrQnVpbGRlciA9ICh0YXNrcykgPT4ge1xyXG4vLyAgICAgcmV0dXJuIGBcclxuLy8gICAgIDxkaXYgY2xhc3M9XCJwcmludC10YXNrXCIgaWQ9XCJ0YXNrLXByaW50XCI+XHJcbi8vICAgICA8aDE+JHt0YXNrcy50YXNrfTwvaDE+XHJcbi8vICAgICA8cD4ke3Rhc2tzLmRhdGV9PC9wPlxyXG4vLyAgICAgPGJ1dHRvbiBjbGFzcz1cInRhc2stZGVsZXRlLWJ0blwiIGlkPVwidGFzay1kZWxldGUtJHt0YXNrcy5pZH1cIj5EZWxldGU8L2J1dHRvbj5cclxuLy8gICAgIDxidXR0b24gY2xhc3M9XCJlZGl0XCIgaWQ9XCJ0YXNrLWVkaXQtJHt0YXNrcy5pZH1cIj5FZGl0PC9idXR0b24+XHJcbi8vICAgICA8L2Rpdj5cclxuLy8gICAgIGBcclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgcHJpbnRUYXNrQnVpbGRlclxyXG5jb25zdCBwcmludFRhc2tCdWlsZGVyID0gKHRhc2tzKSA9PiB7XHJcbiAgICByZXR1cm4gYFxyXG4gICAgPGRpdiBjbGFzcz1cInByaW50LXRhc2tcIiBpZD1cInRhc2stcHJpbnRcIj5cclxuICAgIDxsYWJlbCBjbGFzcyA9XCJjaGVja2JveFwiPlxyXG4gICAgPGRpdiBpZD0gXCJwb3NzaWJseS0ke3Rhc2tzLmlkfVwiPlxyXG4gICAgPGlucHV0IGNsYXNzPVwiY2hlY2tib3hcIiBpZD1cImNoZWNrYm94LSR7dGFza3MuaWR9XCIgdHlwZT1cImNoZWNrYm94XCIgJHt0YXNrLmNvbXBsZXRlZCA9PT0gdHJ1ZT8gXCJjaGVja2VkXCIgOiBcIlwifTxoMSBjbGFzcyA9IFwiY2hlY2staDFcIj4ke3Rhc2tzLnRhc2t9PC9oMT5cclxuICAgIDwvZGl2PlxyXG4gICAgPC9sYWJlbD5cclxuICAgIDxwPiR7dGFza3MuZGF0ZX08L3A+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwidGFzay1kZWxldGUtYnRuXCIgaWQ9XCJ0YXNrLWRlbGV0ZS0ke3Rhc2tzLmlkfVwiPkRlbGV0ZTwvYnV0dG9uPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImVkaXRcIiBpZD1cInRhc2stZWRpdC0ke3Rhc2tzLmlkfVwiPkVkaXQ8L2J1dHRvbj5cclxuICAgIDwvZGl2PiAgXHJcbiAgICBgXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByaW50VGFza0J1aWxkZXIiLCJjb25zdCBmb3JtID0ge1xyXG4gICAgbmV3VGFza0Zvcm06ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJuZXctdGFza1wiIGNsYXNzID1cIm5ldy10YXNrXCI+TmV3IFRhc2s8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9LFxyXG4gICAgdGFza0Zvcm06ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgaWQ9XCJuZXctdGFzay1jb250YWluZXJcIj5cclxuICAgICAgICA8YnV0dG9uIGlkID0gXCJsb2dvdXRcIiBjbGFzcz1cImxvZ291dFwiPkxvZ291dDwvYnV0dG9uPlxyXG4gICAgICAgIDxmb3JtIGlkPVwidGFza1wiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJtYWluLXRhc2tcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFRhc2tcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJjb21wbGV0ZS1kYXRlXCIgcGxhY2Vob2xkZXI9XCJDb21wbGV0ZSBEYXRlXCIgdHlwZT1cImRhdGVcIj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cInNhdmUtdGFza1wiIGNsYXNzPVwic2F2ZS10YXNrXCI+U2F2ZSBUYXNrPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgfSxcclxuICAgIGNyZWF0ZVRhc2s6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJjcmVhdGUtbmV3LXRhc2tcIiBjbGFzcyA9IFwiY3JlYXRlLW5ldy10YXNrXCI+Q3JlYXRlIFRhc2s8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGlkID0gXCJsb2dvdXRcIiBjbGFzcz1cImxvZ291dFwiPkxvZ291dDwvYnV0dG9uPlxyXG4gICAgICAgIGBcclxuICAgIH1cclxuICAgIC8vIGVkaXRGb3JtOiAoKSA9PiB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGBcclxuICAgIC8vICAgICA8Zm9ybSBpZD1cInRhc2tcIj5cclxuICAgIC8vICAgICAgICAgPGlucHV0IGlkPVwibWFpbi10YXNrXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBUYXNrXCIgdHlwZT1cInRleHRcIiB2YWx1ZSA9IGBgPlxyXG4gICAgLy8gICAgICAgICA8aW5wdXQgaWQ9XCJjb21wbGV0ZS1kYXRlXCIgcGxhY2Vob2xkZXI9XCJDb21wbGV0ZSBEYXRlXCIgdHlwZT1cImRhdGVcIj5cclxuICAgIC8vICAgICA8L2Zvcm0+XHJcbiAgICAvLyAgICAgPGJ1dHRvbiBpZD1cInNhdmUtdGFza1wiIGNsYXNzPVwic2F2ZS10YXNrXCI+U2F2ZSBUYXNrPC9idXR0b24+XHJcbiAgICAvLyAgICAgYFxyXG5cclxuICAgIC8vIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybSJdfQ==
