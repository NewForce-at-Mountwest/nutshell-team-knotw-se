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
    // ChatList();
    document.querySelector("#form-output").addEventListener("click", () => {
      if (event.target.id === "send-chat") {
        const messageVal = document.querySelector("#new-message-input").value;
        const objectToPost = (0, _ChatObj.default)(messageVal);

        _ChatCollection.default.sendNewMessage(objectToPost);

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

},{"../Chat/loadPageAfterLogin":6,"../events/click":24,"../events/printAllEvents":28,"../task/printTask":35,"../task/taskForm":37,"./apiManager":7,"./forms":9}],11:[function(require,module,exports){
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

},{"../Chat/ChatList":4,"../events/printAllEvents":28,"../task/taskForm":37,"./apiManager":7,"./forms":9,"./objectBuilder":12}],14:[function(require,module,exports){
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

var _ChatCollection = _interopRequireDefault(require("./ChatCollection"));

var _SaveEdit = _interopRequireDefault(require("./SaveEdit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const editChatButton = () => {
  document.querySelector("#chat-output").addEventListener("click", () => {
    if (event.target.classList.contains("edit-chat")) {
      console.log(event.target.id);

      _ChatCollection.default.getSingleChat(event.target.id.split("-")[2]).then(singleChat => {
        document.querySelector("#new-message-input").value = `${singleChat.message}`;
        document.querySelector("#send-chat").textContent = "Edit Chat";
        document.querySelector("#send-chat").id = `edit-chat-${singleChat.id}`;
        (0, _SaveEdit.default)();
      });
    }
  });
};

var _default = editChatButton;
exports.default = _default;

},{"./ChatCollection":15,"./SaveEdit":21}],21:[function(require,module,exports){
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
    if (event.target.id.includes("edit")) {
      console.log(event.target.id); // Get the user's input

      const messageVal = document.querySelector("#new-message-input").value;
      console.log(messageVal);
      const chatId = event.target.id.split("-")[2]; // Turn the user's input into an object

      const objectToPost = (0, _ChatObj.default)(messageVal);
      console.log(objectToPost);

      _ChatCollection.default.editChat(chatId, objectToPost).then(() => {
        // console.log(chatId, objectToPost);
        // console.log();
        document.querySelector("#form-output").innerHTML = _ChatForm.default.renderChatForm();
        (0, _ChatList.default)();
      });
    }
  });
};

var _default = handleEditedChat;
exports.default = _default;

},{"./ChatCollection":15,"./ChatForm":16,"./ChatList":17,"./ChatObj":18}],22:[function(require,module,exports){
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

},{"./printAllEvents":28}],23:[function(require,module,exports){
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

},{}],24:[function(require,module,exports){
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

},{"./apiManager":22,"./editForm":25,"./eventForm":26,"./eventObject":27,"./printAllEvents":28}],25:[function(require,module,exports){
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

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
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

},{"./apiManager":22,"./buildSingleEvent":23,"./eventForm":26}],29:[function(require,module,exports){
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

var _EditChat = _interopRequireDefault(require("./chat/EditChat"));

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
(0, _EditChat.default)();

},{"./Chat/ChatForm.js":3,"./Chat/loadPageAfterLogin.js":6,"./auth/apiManager":7,"./auth/clicks":8,"./auth/forms":9,"./auth/login":10,"./chat/DeleteChat":19,"./chat/EditChat":20,"./chat/SaveEdit":21,"./events/apiManager":22,"./events/click":24,"./task/clicks":31,"./task/edit":32,"./task/handleEdit":33}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"../auth/logout":11,"./apiManager":30,"./objectBuilder":34,"./printTask":35,"./taskForm":37}],32:[function(require,module,exports){
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

},{"./apiManager":30,"./handleEdit":33}],33:[function(require,module,exports){
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

},{"./apiManager":30,"./objectBuilder":34,"./printTask":35,"./taskForm":37}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{"./apiManager":30,"./printTaskBuilder":36,"./taskForm":37}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}]},{},[29])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0NoYXQvQ2hhdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Q29sbGVjdGlvbi5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0TGlzdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0T2JqLmpzIiwiLi4vc2NyaXB0cy9DaGF0L2xvYWRQYWdlQWZ0ZXJMb2dpbi5qcyIsIi4uL3NjcmlwdHMvYXV0aC9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2NsaWNrcy5qcyIsIi4uL3NjcmlwdHMvYXV0aC9mb3Jtcy5qcyIsIi4uL3NjcmlwdHMvYXV0aC9sb2dpbi5qcyIsIi4uL3NjcmlwdHMvYXV0aC9sb2dvdXQuanMiLCIuLi9zY3JpcHRzL2F1dGgvb2JqZWN0QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvYXV0aC9yZWdpc3Rlci5qcyIsIi4uL3NjcmlwdHMvY2hhdC9EZWxldGVDaGF0LmpzIiwiLi4vc2NyaXB0cy9jaGF0L0VkaXRDaGF0LmpzIiwiLi4vc2NyaXB0cy9jaGF0L1NhdmVFZGl0LmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvYXBpTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2J1aWxkU2luZ2xlRXZlbnQuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9jbGljay5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2VkaXRGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRPYmplY3QuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9wcmludEFsbEV2ZW50cy5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdGFzay9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy90YXNrL2NsaWNrcy5qcyIsIi4uL3NjcmlwdHMvdGFzay9lZGl0LmpzIiwiLi4vc2NyaXB0cy90YXNrL2hhbmRsZUVkaXQuanMiLCIuLi9zY3JpcHRzL3Rhc2svb2JqZWN0QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvdGFzay9wcmludFRhc2suanMiLCIuLi9zY3JpcHRzL3Rhc2svcHJpbnRUYXNrQnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvdGFzay90YXNrRm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxNQUFNLFNBQVMsR0FBSSxhQUFELElBQW1CO0FBQ2pDO0FBQ0E7QUFDQSxTQUFROzRCQUNnQixhQUFhLENBQUMsSUFBZCxDQUFtQixJQUFLO2dDQUNwQixhQUFhLENBQUMsT0FBUTs4Q0FDUixhQUFhLENBQUMsRUFBRztrREFDYixhQUFhLENBQUMsRUFBRztRQUovRDtBQU1GLENBVEY7O2VBVWdCLFM7Ozs7Ozs7Ozs7QUNWaEIsTUFBTSxjQUFjLEdBQUc7QUFDckIsRUFBQSxjQUFjLEVBQUcsWUFBRCxJQUFrQjtBQUNoQyxXQUFPLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUM3QyxNQUFBLE1BQU0sRUFBRSxNQURxQztBQUU3QyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRm9DO0FBSzdDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsWUFBZjtBQUx1QyxLQUFuQyxDQUFaO0FBT0QsR0FUb0I7QUFVckIsRUFBQSxXQUFXLEVBQUUsTUFBTTtBQUNqQixXQUFPLEtBQUssQ0FBQyw2Q0FBRCxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFQSxHQWJtQjtBQWNyQixFQUFBLFVBQVUsRUFBRyxNQUFELElBQVk7QUFDdEIsV0FBTyxLQUFLLENBQUUsa0NBQWlDLE1BQU8sRUFBMUMsRUFBNkM7QUFDdkQsTUFBQSxNQUFNLEVBQUU7QUFEK0MsS0FBN0MsQ0FBWjtBQUdELEdBbEJvQjtBQW1CckIsRUFBQSxhQUFhLEVBQUcsTUFBRCxJQUFZO0FBQzNC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U0FBdEMsSUFBbUQsK0JBQWlCLFVBQWpCLENBQW5EO0FBQ0gsS0FGRDtBQUdILEdBTEQ7QUFNSCxDQVJEOztlQVVlLEs7Ozs7Ozs7Ozs7O0FDZGY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBLE1BQU0sZ0JBQWdCLEdBQUksS0FBRCxJQUFXO0FBQ2hDLFNBQVE7Ozt5QkFHYSxLQUFLLENBQUMsRUFBRzsyQ0FDUyxLQUFLLENBQUMsRUFBRyxxQkFBb0IsSUFBSSxDQUFDLFNBQUwsS0FBbUIsSUFBbkIsR0FBeUIsU0FBekIsR0FBcUMsRUFBRywwQkFBeUIsS0FBSyxDQUFDLElBQUs7OztTQUczSSxLQUFLLENBQUMsSUFBSztzREFDa0MsS0FBSyxDQUFDLEVBQUc7eUNBQ3RCLEtBQUssQ0FBQyxFQUFHOztLQVQ5QztBQVlILENBYkQ7O2VBZWUsZ0I7Ozs7Ozs7Ozs7QUMzQmYsTUFBTSxJQUFJLEdBQUc7QUFDVCxFQUFBLFdBQVcsRUFBRSxNQUFNO0FBQ2YsV0FBUTs7U0FBUjtBQUdILEdBTFE7QUFNVCxFQUFBLFFBQVEsRUFBRSxNQUFNO0FBQ1osV0FBUTs7Ozs7Ozs7O1NBQVI7QUFVSCxHQWpCUTtBQWtCVCxFQUFBLFVBQVUsRUFBRSxNQUFNO0FBQ2QsV0FBUTs7O1NBQVI7QUFJSCxHQXZCUSxDQXdCVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBakNTLENBQWI7ZUFvQ2UsSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGJ1aWxkQ2hhdCA9IChzaW5nbGVDaGF0T2JqKSA9PiB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhzaW5nbGVDaGF0T2JqLm1lc3NhZ2UpO1xyXG4gICAgLy8gY29uc29sZS5sb2coc2luZ2xlQ2hhdE9iai5pZClcclxuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZvcm1cIiBpZD1cImNoYXQtZm9ybVwiPlxyXG4gICAgPGgzIGNsYXNzPVwiY2hhdC11c2VyXCI+JHtzaW5nbGVDaGF0T2JqLnVzZXIudXNlcn06PC9oMz5cclxuICAgIDxwIGlkPVwibmV3LW1lc3NhZ2UtaW5wdXRcIj4ke3NpbmdsZUNoYXRPYmoubWVzc2FnZX08L3A+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1jaGF0XCIgaWQ9XCJlZGl0LWNoYXQtJHtzaW5nbGVDaGF0T2JqLmlkfVwiPkVkaXQ8L2J1dHRvbj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtY2hhdFwiIGlkPVwiZGVsZXRlLWNoYXQtJHtzaW5nbGVDaGF0T2JqLmlkfVwiPkRlbGV0ZTwvYnV0dG9uPlxyXG4gPC9kaXY+YFxyXG4gfVxyXG4gZXhwb3J0IGRlZmF1bHQgYnVpbGRDaGF0OyIsImNvbnN0IENoYXRDb2xsZWN0aW9uID0ge1xyXG4gIHNlbmROZXdNZXNzYWdlOiAob2JqZWN0VG9Qb3N0KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvbWVzc2FnZXNcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0VG9Qb3N0KVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRBbGxDaGF0czogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg5L21lc3NhZ2VzP19leHBhbmQ9dXNlclwiKVxyXG4gICAgLnRoZW4obWVzc2FnZXMgPT4gbWVzc2FnZXMuanNvbigpKTtcclxuICAgfSxcclxuICBkZWxldGVDaGF0OiAoY2hhdElkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9tZXNzYWdlcy8ke2NoYXRJZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgfSlcclxuICB9LFxyXG4gIGdldFNpbmdsZUNoYXQ6IChjaGF0SWQpID0+IHtcclxuICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9tZXNzYWdlcy8ke2NoYXRJZH1gKVxyXG4gICAgLnRoZW4ociA9PiByLmpzb24oKSkgfSxcclxuXHJcbiAgZWRpdENoYXQ6IChjaGF0SWQsIGNoYXRPYmopID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L21lc3NhZ2VzLyR7Y2hhdElkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY2hhdE9iailcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ2hhdENvbGxlY3Rpb247IiwiLy8gQSBDb250YWN0Rm9ybSBjb21wb25lbnQgdGhhdCwgd2hlbiBmaWxsZWQgb3V0IGFuZCBhIHN1Ym1pdCBidXR0b24gaXMgcHJlc3NlZCwgYWRkcyBhIG5ldyBjb250YWN0IHRvIHN0b3JhZ2UuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuaW1wb3J0IENoYXRDb2xsZWN0aW9uIGZyb20gXCIuL0NoYXRDb2xsZWN0aW9uXCI7XHJcbmltcG9ydCBidWlsZENoYXRPYmplY3QgZnJvbSBcIi4vQ2hhdE9ialwiO1xyXG5pbXBvcnQgQ2hhdExpc3QgZnJvbSBcIi4vQ2hhdExpc3RcIjtcclxuLy8gaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuL0NoYXRMaXN0XCI7XHJcblxyXG5jb25zdCBDaGF0Rm9ybSA9IHtcclxuICByZW5kZXJDaGF0Rm9ybTogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZm9ybVwiIGlkPVwiZm9ybS1vdXRwdXRcIj5cclxuICAgICAgPGgzPlNlbmQgTmV3IE1lc3NhZ2U8L2gzPlxyXG4gICAgICA8Zm9ybSBhY3Rpb249XCJcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiAgaWQ9XCJuZXctbWVzc2FnZS1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiTmV3IE1lc3NhZ2VcIj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgICAgPGJ1dHRvbiBpZD1cInNlbmQtY2hhdFwiPlNlbmQgTWVzc2FnZTwvYnV0dG9uPlxyXG4gICAgPC9kaXY+YDtcclxuICB9LFxyXG4gIGFjdGl2YXRlU2VuZEJ1dHRvbjogKCkgPT4ge1xyXG4gICAgLy8gQ2hhdExpc3QoKTtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZCA9PT0gXCJzZW5kLWNoYXRcIikge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy1tZXNzYWdlLWlucHV0XCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IG9iamVjdFRvUG9zdCA9IGJ1aWxkQ2hhdE9iamVjdChtZXNzYWdlVmFsKTtcclxuICAgICAgICBDaGF0Q29sbGVjdGlvbi5zZW5kTmV3TWVzc2FnZShvYmplY3RUb1Bvc3QpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LW1lc3NhZ2UtaW5wdXRcIikudmFsdWUgPSBcIlwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2hhdEZvcm07IiwiaW1wb3J0IGJ1aWxkQ2hhdCBmcm9tIFwiLi9DaGF0LmpzXCJcclxuaW1wb3J0IENoYXRDb2xsZWN0aW9uIGZyb20gXCIuL0NoYXRDb2xsZWN0aW9uLmpzXCJcclxuaW1wb3J0IENoYXRGb3JtIGZyb20gXCIuL0NoYXRGb3JtLmpzXCJcclxuXHJcbi8vIEEgQ29udGFjdExpc3QgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYWxsIGNvbnRhY3RzLiBJdCBzaG91bGQgaW1wb3J0IHRoZSBDb250YWN0IGNvbXBvbmVudCBhbmQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuXHJcblxyXG5jb25zdCBDaGF0TGlzdCA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdC1vdXRwdXRcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGxldCB1c2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpO1xyXG4gICAgQ2hhdENvbGxlY3Rpb24uZ2V0QWxsQ2hhdHMoKVxyXG4gICAgLnRoZW4oY2hhdCA9PiB7XHJcbiAgICAgICAgY2hhdC5mb3JFYWNoKHNpbmdsZUNoYXQgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXQtb3V0cHV0XCIpLmlubmVySFRNTCArPSBidWlsZENoYXQoc2luZ2xlQ2hhdCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IENoYXRMaXN0O1xyXG4iLCJjb25zdCBidWlsZENoYXRPYmplY3QgPSAobWVzc2FnZVBhcmFtKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtZXNzYWdlOiBtZXNzYWdlUGFyYW0sXHJcbiAgICAgIHVzZXJJZDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKVxyXG4gICAgfTtcclxuICB9O1xyXG5leHBvcnQgZGVmYXVsdCBidWlsZENoYXRPYmplY3Q7IiwiaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuL0NoYXRMaXN0XCJcclxuaW1wb3J0IENoYXRGb3JtIGZyb20gXCIuL0NoYXRGb3JtXCJcclxuXHJcbi8vIFRoaXMgbW9kdWxlIGJ1aWxkcyB0aGUgY2hhdCBsaXN0IHZpZXcgb25jZSBhIHVzZXIgaGFzIGxvZ2dlZCBpblxyXG5jb25zdCBsb2FkUGFnZUFmdGVyTG9naW4gPSAoKSA9PiB7XHJcbi8vQnVpbGRzIENoYXQgRm9ybVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tb3V0cHV0XCIpLmlubmVySFRNTCArPSBDaGF0Rm9ybS5yZW5kZXJDaGF0Rm9ybSgpO1xyXG4vLyAvLyBCdWlsZHMgQ2hhdCBMaXN0XHJcbkNoYXRMaXN0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvYWRQYWdlQWZ0ZXJMb2dpbjsiLCJjb25zdCBhcGlGZXRjaCA9IHtcclxuICAgIGFkZFVzZXI6IChwYXJzZWRVc2VyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg5L3VzZXJzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGFyc2VkVXNlcilcclxuICAgICAgICB9KS50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgYWxsVXNlcnM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvdXNlcnNcIilcclxuICAgICAgICAudGhlbihyID0+IHIuanNvbigpKVxyXG4gICAgfSxcclxuICAgIHVzZXJMb2dpbjogKHVzZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS91c2Vycz91c2VyPSR7dXNlcn1gKVxyXG4gICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcblxyXG4gICAgIH1cclxufVxyXG4gZXhwb3J0IGRlZmF1bHQgYXBpRmV0Y2g7IiwiaW1wb3J0IHJlZ2lzdGVyIGZyb20gXCIuL3JlZ2lzdGVyXCJcclxuaW1wb3J0IGhhbmRsZUxvZ2luIGZyb20gXCIuL2xvZ2luXCI7XHJcbmltcG9ydCBoYW5kbGVMb2dvdXQgZnJvbSBcIi4vbG9nb3V0XCJcclxuXHJcbmNvbnN0IGNsaWNrcyA9IHtcclxuICAgIHJlZzogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXItYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlZ2lzdGVyLnJlZygpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICByZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY3JlYXRlLWJ0blwiKSl7XHJcbiAgICAgICAgICAgICAgICByZWdpc3Rlci5oYW5kbGVSZWdpc3RlcigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGZpcnN0TG9nOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1idG5uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGhhbmRsZUxvZ2luLmZpcnN0TG9nKClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGxvZ2luOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImxvZ2luXCIpKXtcclxuICAgICAgICAgICAgaGFuZGxlTG9naW4ubG9naW4oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBsb2dvdXQ6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibG9nb3V0XCIpKXtcclxuICAgICAgICAgICAgaGFuZGxlTG9nb3V0KClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsaWNrcyIsImNvbnN0IGF1dGhGb3JtID0ge1xyXG4gICAgaG9tZTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cImhvbWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGgxPldlbGNvbWUgdG8gTnV0U2hlbGwgPGltZyBjbGFzcz0gXCJpY29uXCIgc3JjPVwiaHR0cHM6Ly9zdGF0aWMudGhlbm91bnByb2plY3QuY29tL3BuZy8xOTU0MjYtMjAwLnBuZ1wiIGFsdD1cIlwiID48L2gxPlxyXG4gICAgICAgIDxkaXYgaWQgPVwiaG9tZS1idXR0b25cIj5cclxuICAgICAgICA8ZGl2IGlkID1cImxvZ2luLWRpdlwiPjxidXR0b24gaWQ9XCJsb2dpbi1idG5uXCI+TG9naW48L2J1dHRvbj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkID1cInJlZ2lzdGVyXCI+PGJ1dHRvbiBpZD1cInJlZ2lzdGVyLWJ0blwiPlJlZ2lzdGVyPC9idXR0b24+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG5cclxuICAgIH0sXHJcbiAgICByZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cInJlZ2lzdGVyLWF0dGVtcHRcIj5cclxuICAgICAgICAgICAgPGZvcm0gaWQ9XCJyZWdpc3Rlci1mb3JtXCI+XHJcbiAgICAgICAgICAgIDxkaXYgaWQ9XCJpbnB1dC1maWVsZHNcIj5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwibmFtZS1yZWdpc3RlclwiIHBsYWNlaG9sZGVyPVwiTmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImVtYWlsLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJFbWFpbFwiIHR5cGU9XCJlbWFpbFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJ1c2VybmFtZS1yZWdpc3RlclwiIHBsYWNlaG9sZGVyPVwiVXNlcm5hbWVcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJwYXNzd29yZC1yZWdpc3RlclwiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiB0eXBlPVwicGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICA8YnV0dG9uIGlkPVwiY3JlYXRlLWJ0blwiIGNsYXNzPVwiY3JlYXRlLWJ0blwiPkNyZWF0ZSBBY2NvdW50PC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIGBcclxuXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxkaXYgaWQ9XCJsb2dpbi1hdHRlbXB0XCI+XHJcbiAgICAgICAgPGZvcm0gaWQ9XCJsb2dpbi1mb3JtXCI+XHJcbiAgICAgICAgPGlucHV0IGlkPVwibG9naW4tbmFtZVwiIHBsYWNlaG9sZGVyPVwiTmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgPGlucHV0IGlkPVwibG9naW4tcGFzc1wiIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIiB0eXBlPVwidGV4dFwiPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8YnV0dG9uIGlkID0gXCJqaC1hdHRlbXB0XCIgY2xhc3M9XCJsb2dpblwiPkxvZ2luPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgfSxcclxuICAgIG1haW46ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImxvZ291dEJ1dHRvblwiIGNsYXNzPVwibG9nb3V0XCI+TG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhdXRoRm9ybSIsImltcG9ydCBhcGlGZXRjaCBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGF1dGhGb3JtIGZyb20gXCIuL2Zvcm1zXCI7XHJcbmltcG9ydCBsb2FkUGFnZUFmdGVyTG9naW4gZnJvbSBcIi4uL0NoYXQvbG9hZFBhZ2VBZnRlckxvZ2luXCI7XHJcbmltcG9ydCBmb3JtIGZyb20gXCIuLi90YXNrL3Rhc2tGb3JtXCJcclxuaW1wb3J0IHByaW50IGZyb20gXCIuLi90YXNrL3ByaW50VGFza1wiXHJcbmltcG9ydCBwcmludEFsbEV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL3ByaW50QWxsRXZlbnRzXCJcclxuaW1wb3J0IGNsaWNrV2l6YXJkIGZyb20gXCIuLi9ldmVudHMvY2xpY2tcIlxyXG5cclxuXHJcbmNvbnN0IGhhbmRsZUxvZ2luID0ge1xyXG4gICAgZmlyc3RMb2c6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5sb2dpbigpXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICBjb25zdCB1c2VyVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpbi1uYW1lXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IHBhc3NWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLXBhc3NcIikudmFsdWU7XHJcbiAgICAgICAgYXBpRmV0Y2gudXNlckxvZ2luKHVzZXJWYWwpXHJcbiAgICAgICAgICAgIC50aGVuKChwYXJzZWRVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihwYXNzVmFsID09PSBwYXJzZWRVc2VyWzBdLnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gYXV0aEZvcm0ubWFpbigpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IGZvcm0udGFza0Zvcm0oKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS5jcmVhdGVUYXNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCBwYXJzZWRVc2VyWzBdLmlkKVxyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRQYWdlQWZ0ZXJMb2dpbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByaW50QWxsRXZlbnRzKClcclxuICAgICAgICAgICAgICAgICAgICBwcmludCgpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV3JvbmcgcGFzc3dvcmQsIHRyeSBhZ2FpbiFcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlTG9naW4iLCJpbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vZm9ybXNcIlxyXG4vLyBpbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vYXV0aC9mb3Jtc1wiO1xyXG5pbXBvcnQgY2xpY2tzIGZyb20gXCIuL2NsaWNrc1wiXHJcbmNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcclxuICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oXCJ1c2VySWRcIilcclxuICAgIGNvbnNvbGUubG9nKFwiSGVsbG9cIilcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW50LXRhc2tcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLmhvbWUoKVxyXG4vLyBBdHRlbXB0aW5nIHRvIG1ha2UgaXQgd2hlcmUgYWZ0ZXIgeW91IGxvZ291dCB5b3UgY2FuIGxvZyBiYWNrIGluIC8gdGhvdWdodCBpbXBvcnRpbmcgYWxsIHRoZSBjbGlja3Mgd291bGQgd29yayBidXQgaXQgZG9lc24ndCBsb29rIGxpa2UgaXQgLjopXHJcbiAgICBjbGlja3MucmVnKClcclxuICAgIGNsaWNrcy5yZWdpc3RlcigpXHJcbiAgICBjbGlja3MuZmlyc3RMb2coKVxyXG4gICAgY2xpY2tzLmxvZ291dCgpXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybUNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Q29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5cIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGF0LXdyYXBwZXJcIikuaW5uZXJIVE1MID0gXCJcIjtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVMb2dvdXQiLCJjb25zdCB1c2VyT2JqID0gKG5hbWVQYXJhbSwgZW1haWxQYXJhbSwgdXNlclBhcmFtLCBwYXNzUGFyYW0pID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICBuYW1lOiBuYW1lUGFyYW0sXHJcbiAgICBlbWFpbDogZW1haWxQYXJhbSxcclxuICAgIHVzZXI6IHVzZXJQYXJhbSxcclxuICAgIHBhc3N3b3JkOiBwYXNzUGFyYW1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJPYmoiLCJpbXBvcnQgdXNlck9iaiBmcm9tIFwiLi9vYmplY3RCdWlsZGVyXCJcclxuaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5pbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vZm9ybXNcIlxyXG5pbXBvcnQgQ2hhdExpc3QgZnJvbSBcIi4uL0NoYXQvQ2hhdExpc3RcIjtcclxuaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuLi9ldmVudHMvcHJpbnRBbGxFdmVudHNcIjtcclxuaW1wb3J0IGZvcm0gZnJvbSBcIi4uL3Rhc2svdGFza0Zvcm1cIlxyXG5cclxuY29uc3QgcmVnaXN0ZXIgPSB7XHJcblxyXG4gICAgcmVnOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlclwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5yZWdpc3RlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVSZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgY29uc3QgbmFtZVZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZS1yZWdpc3RlclwiKS52YWx1ZTtcclxuICAgIGNvbnN0IGVtYWlsVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbC1yZWdpc3RlclwiKS52YWx1ZTtcclxuICAgIGNvbnN0IHVzZXJWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJuYW1lLXJlZ2lzdGVyXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgcGFzc1ZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmQtcmVnaXN0ZXJcIikudmFsdWU7XHJcblxyXG4gICAgY29uc3QgdXNlcklucHV0ID0gdXNlck9iaihuYW1lVmFsLCBlbWFpbFZhbCwgdXNlclZhbCwgcGFzc1ZhbClcclxuICAgIGFwaUZldGNoLmFkZFVzZXIodXNlcklucHV0KVxyXG4gICAgLnRoZW4oKHBhcnNlZFVzZXIpID0+IHtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIHBhcnNlZFVzZXIuaWQpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpblwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5tYWluKClcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS50YXNrRm9ybSgpO1xyXG4gICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5cIikuaW5uZXJIVE1MID0gYXV0aEZvcm0ubWFpbigpO1xyXG4gICAgICAgIHByaW50QWxsRXZlbnRzKCk7XHJcbiAgICAgICAgQ2hhdExpc3QoKTtcclxuXHJcbiAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZWdpc3RlciIsImltcG9ydCBDaGF0Q29sbGVjdGlvbiBmcm9tIFwiLi9DaGF0Q29sbGVjdGlvblwiXHJcbmltcG9ydCBDaGF0TGlzdCBmcm9tIFwiLi9DaGF0TGlzdFwiXHJcblxyXG5jb25zdCBhY3RpdmF0ZURlbGV0ZUJ1dHRvbnMgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXQtb3V0cHV0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZS1jaGF0XCIpKXtcclxuICAgICAgICAgICAgY29uc3QgaWRUb0RlbGV0ZSA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl07XHJcbiAgICAgICAgICAgIENoYXRDb2xsZWN0aW9uLmRlbGV0ZUNoYXQoaWRUb0RlbGV0ZSlcclxuICAgICAgICAgICAgLnRoZW4oQ2hhdExpc3QpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZhdGVEZWxldGVCdXR0b25zOyIsImltcG9ydCBDaGF0Q29sbGVjdGlvbiBmcm9tIFwiLi9DaGF0Q29sbGVjdGlvblwiO1xyXG5pbXBvcnQgaGFuZGxlRWRpdGVkQ2hhdCBmcm9tIFwiLi9TYXZlRWRpdFwiO1xyXG5cclxuXHJcbmNvbnN0IGVkaXRDaGF0QnV0dG9uID0gKCkgPT4ge1xyXG5cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdC1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1jaGF0XCIpKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmlkKTtcclxuICAgICAgICAgICAgQ2hhdENvbGxlY3Rpb24uZ2V0U2luZ2xlQ2hhdChldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzJdKVxyXG4gICAgICAgICAgICAudGhlbigoc2luZ2xlQ2hhdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctbWVzc2FnZS1pbnB1dFwiKS52YWx1ZSA9IGAke3NpbmdsZUNoYXQubWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kLWNoYXRcIikudGV4dENvbnRlbnQgPSBcIkVkaXQgQ2hhdFwiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kLWNoYXRcIikuaWQ9IGBlZGl0LWNoYXQtJHtzaW5nbGVDaGF0LmlkfWA7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVFZGl0ZWRDaGF0KCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGVkaXRDaGF0QnV0dG9uOyIsImltcG9ydCBidWlsZENoYXRPYmplY3QgZnJvbSBcIi4vQ2hhdE9ialwiO1xyXG5pbXBvcnQgQ2hhdENvbGxlY3Rpb24gZnJvbSBcIi4vQ2hhdENvbGxlY3Rpb25cIjtcclxuaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuL0NoYXRMaXN0XCI7XHJcbmltcG9ydCBDaGF0Rm9ybSBmcm9tIFwiLi9DaGF0Rm9ybVwiO1xyXG5cclxuY29uc3QgaGFuZGxlRWRpdGVkQ2hhdCA9ICgpID0+IHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvcm0tb3V0cHV0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmlkLmluY2x1ZGVzKFwiZWRpdFwiKSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQuaWQpO1xyXG4gICAgICAvLyBHZXQgdGhlIHVzZXIncyBpbnB1dFxyXG4gICAgICBjb25zdCBtZXNzYWdlVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctbWVzc2FnZS1pbnB1dFwiKS52YWx1ZTtcclxuICAgICAgY29uc29sZS5sb2cobWVzc2FnZVZhbCk7XHJcbiAgICAgIGNvbnN0IGNoYXRJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl07XHJcbiAgICAgIC8vIFR1cm4gdGhlIHVzZXIncyBpbnB1dCBpbnRvIGFuIG9iamVjdFxyXG4gICAgICBjb25zdCBvYmplY3RUb1Bvc3QgPSBidWlsZENoYXRPYmplY3QobWVzc2FnZVZhbCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKG9iamVjdFRvUG9zdCk7XHJcblxyXG4gICAgICBDaGF0Q29sbGVjdGlvbi5lZGl0Q2hhdChjaGF0SWQsIG9iamVjdFRvUG9zdCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coY2hhdElkLCBvYmplY3RUb1Bvc3QpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCk7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLW91dHB1dFwiKS5pbm5lckhUTUwgPSBDaGF0Rm9ybS5yZW5kZXJDaGF0Rm9ybSgpO1xyXG4gICAgICAgIENoYXRMaXN0KCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRWRpdGVkQ2hhdDsiLCJpbXBvcnQgcHJpbnRBbGxFdmVudHMgZnJvbSBcIi4vcHJpbnRBbGxFdmVudHNcIjtcclxuY29uc3QgZXZlbnRBcGlNYW5hZ2VyID0ge1xyXG4gICAgICAgIGdldEFsbEV2ZW50czogKHVzZXJJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L2V2ZW50cy8/dXNlcklkPSR7dXNlcklkfWApXHJcbiAgICAgICAgICAgIC50aGVuKGV2ZW50cyA9PiBldmVudHMuanNvbigpKVxyXG4gICAgfSwgIHBvc3ROZXdFdmVudDogZXZlbnRPYmplY3QgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9ldmVudHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudE9iamVjdClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sIGRlbGV0ZUV2ZW50OiAoaWRUb0RlbGV0ZSkgPT4ge1xyXG4gICAgICAgIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvZXZlbnRzLyR7aWRUb0RlbGV0ZX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwcmludEFsbEV2ZW50cygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LCBnZXRTaW5nbGVFdmVudDogKGlkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvZXZlbnRzLyR7aWR9YClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSwgIGVkaXRFdmVudDogKGlkUGFyYW0sIGV2ZW50VG9FZGl0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvZXZlbnRzLyR7aWRQYXJhbX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnRUb0VkaXQpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudEFwaU1hbmFnZXI7IiwiY29uc3QgYnVpbGRTaW5nbGVFdmVudCA9IChzaW5nbGVFdmVudCkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkID0gXCJldmVudENvbnRhaW5lci0ke3NpbmdsZUV2ZW50LmlkfVwiIGNsYXNzID0gXCJhbGxEYUV2ZW50c1wiPlxyXG4gICAgICAgICAgICA8aDI+JHtzaW5nbGVFdmVudC5uYW1lfTwvaDI+XHJcbiAgICAgICAgICAgICAgICA8cD5EYXRlOiAgJHtzaW5nbGVFdmVudC5kYXRlfTwvcD5cclxuICAgICAgICAgICAgICAgIDxwPkxvY2F0aW9uOiAgJHtzaW5nbGVFdmVudC5sb2NhdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0QnV0dG9uXCIgaWQ9IFwiZWRpdEV2ZW50QnV0dG9uLSR7c2luZ2xlRXZlbnQuaWR9XCI+VXBkYXRlPC9idXR0b24+IDxidXR0b24gY2xhc3M9XCJkZWxldGVCdXR0b25cIiBpZD0gXCJkZWxldGVCdXR0b24tJHtzaW5nbGVFdmVudC5pZH1cIj5EZWxldGU8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8aHI+YFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBidWlsZFNpbmdsZUV2ZW50OyIsImltcG9ydCBldmVudEZvcm1CdWlsZGVyIGZyb20gXCIuL2V2ZW50Rm9ybVwiO1xyXG5pbXBvcnQgYnVpbGRFdmVudE9iamVjdCBmcm9tIFwiLi9ldmVudE9iamVjdFwiO1xyXG5pbXBvcnQgZXZlbnRBcGlNYW5hZ2VyIGZyb20gXCIuL2FwaU1hbmFnZXJcIjtcclxuaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuL3ByaW50QWxsRXZlbnRzXCI7XHJcbmltcG9ydCBldmVudEVkaXRGb3JtQnVpbGRlciBmcm9tIFwiLi9lZGl0Rm9ybVwiO1xyXG5jb25zdCBjbGlja1dpemFyZCA9IHtcclxuICAgIGFkZEV2ZW50RnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImFkZEV2ZW50QnV0dG9uXCIpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtQ29udGFpbmVyXCIpLmlubmVySFRNTCA9IGV2ZW50Rm9ybUJ1aWxkZXIuZXZlbnRGb3JtSW5wdXRzKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9LFxyXG4gICAgc2F2ZUV2ZW50RnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmVFdmVudEJ1dHRvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1OYW1lXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1EYXRlXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYXRpb25WYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtTG9jYXRpb25cIikudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdFdmVudE9iamVjdCA9IGJ1aWxkRXZlbnRPYmplY3QobmFtZVZhbHVlLCBkYXRlVmFsdWUsIGxvY2F0aW9uVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLnBvc3ROZXdFdmVudChuZXdFdmVudE9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihwcmludEFsbEV2ZW50cyk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybU5hbWVcIikudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1EYXRlXCIpLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtTG9jYXRpb25cIikudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBlZGl0QnV0dG9uRnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRCdXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBldmVudEVkaXRJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07XHJcbiAgICAgICAgICAgICAgICBldmVudEFwaU1hbmFnZXIuZ2V0U2luZ2xlRXZlbnQoZXZlbnRFZGl0SWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZUV2ZW50SW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRDb250YWluZXItJHtldmVudEVkaXRJZH1gKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNldmVudENvbnRhaW5lci0ke2V2ZW50RWRpdElkfWApLmlubmVySFRNTCA9IGV2ZW50RWRpdEZvcm1CdWlsZGVyKHNpbmdsZUV2ZW50SW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc2F2ZUVkaXRCdXR0b25GdW5jdGlvbjogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2F2ZUVkaXRlZEV2ZW50XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNldmVudEVkaXROYW1lLSR7aXRlbUlkfWApLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNldmVudEVkaXREYXRlLSR7aXRlbUlkfWApLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkTG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRFZGl0TG9jYXRpb24tJHtpdGVtSWR9YCkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0ZWRFdmVudE9iamVjdCA9IGJ1aWxkRXZlbnRPYmplY3QoZWRpdGVkTmFtZSwgZWRpdGVkRGF0ZSwgZWRpdGVkTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLmVkaXRFdmVudChpdGVtSWQsIGVkaXRlZEV2ZW50T2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHByaW50QWxsRXZlbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlQnV0dG9uRnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZUJ1dHRvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50RGVsZXRlSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLmRlbGV0ZUV2ZW50KGV2ZW50RGVsZXRlSWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsaWNrV2l6YXJkOyIsImNvbnN0IGV2ZW50RWRpdEZvcm1CdWlsZGVyID0gKHNpbmdsZUV2ZW50KSA9PiB7XHJcbiAgICByZXR1cm4gYDxmb3JtIGlkID0gXCJldmVudEZvcm1JbnB1dHNcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRFZGl0TmFtZS0ke3NpbmdsZUV2ZW50LmlkfVwiIHBsYWNlaG9sZGVyID0gXCJuYW1lXCIgdmFsdWU9XCIke3NpbmdsZUV2ZW50Lm5hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50RWRpdERhdGUtJHtzaW5nbGVFdmVudC5pZH1cIiBwbGFjZWhvbGRlciA9IFwiZGF0ZVwiIHZhbHVlPVwiJHtzaW5nbGVFdmVudC5kYXRlfVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEVkaXRMb2NhdGlvbi0ke3NpbmdsZUV2ZW50LmlkfVwiIHBsYWNlaG9sZGVyID0gXCJsb2NhdGlvblwiIHZhbHVlPVwiJHtzaW5nbGVFdmVudC5sb2NhdGlvbn1cIj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkID0gXCJzYXZlRWRpdGVkRXZlbnQtJHtzaW5nbGVFdmVudC5pZH1cIiBjbGFzcyA9IFwic2F2ZUVkaXRlZEV2ZW50XCI+U2F2ZSBldmVudDwvYnV0dG9uYFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50RWRpdEZvcm1CdWlsZGVyOyIsImNvbnN0IGV2ZW50Rm9ybUJ1aWxkZXIgPSAge1xyXG4gICAgZXZlbnRGb3JtSW5wdXRzOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gYDxmb3JtIGlkID0gXCJldmVudEZvcm1JbnB1dHNcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRGb3JtTmFtZVwiIHBsYWNlaG9sZGVyID0gXCJuYW1lXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50Rm9ybURhdGVcIiBwbGFjZWhvbGRlciA9IFwiZGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEZvcm1Mb2NhdGlvblwiIHBsYWNlaG9sZGVyID0gXCJsb2NhdGlvblwiPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQgPSBcInNhdmVOZXdFdmVudFwiIGNsYXNzID0gXCJzYXZlRXZlbnRCdXR0b25cIj5TYXZlIGV2ZW50PC9idXR0b25gXHJcbn0sXHJcblxyXG4gICBldmVudEJ1dHRvbjogYDxocj48YnV0dG9uIGlkPVwiYWRkRXZlbnRCdXR0b25cIj5BZGQgYW4gRXZlbnQhPC9idXR0b24+YFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudEZvcm1CdWlsZGVyOyIsImNvbnN0IGJ1aWxkRXZlbnRPYmplY3QgPSAobmFtZVBhcmFtLCBkYXRlUGFyYW0sIGxvY2F0aW9uUGFyYW0pID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogbmFtZVBhcmFtLFxyXG4gICAgICAgIGRhdGU6IGRhdGVQYXJhbSxcclxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25QYXJhbSxcclxuICAgICAgICB1c2VySWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEV2ZW50T2JqZWN0IiwiaW1wb3J0IGV2ZW50QXBpTWFuYWdlciBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGJ1aWxkU2luZ2xlRXZlbnQgZnJvbSBcIi4vYnVpbGRTaW5nbGVFdmVudFwiXHJcbmltcG9ydCBldmVudEZvcm1CdWlsZGVyIGZyb20gXCIuL2V2ZW50Rm9ybVwiO1xyXG5jb25zdCBwcmludEFsbEV2ZW50cyA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1Db250YWluZXJcIikuaW5uZXJIVE1MID0gZXZlbnRGb3JtQnVpbGRlci5ldmVudEJ1dHRvbjtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRDb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGV2ZW50QXBpTWFuYWdlci5nZXRBbGxFdmVudHModXNlcklkKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5mb3JFYWNoKHNpbmdsZUV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRDb250YWluZXJcIikuaW5uZXJIVE1MICs9IGJ1aWxkU2luZ2xlRXZlbnQoc2luZ2xlRXZlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfTtcclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRBbGxFdmVudHM7XHJcbiIsIlxyXG5pbXBvcnQgQ2hhdEZvcm0gZnJvbSBcIi4vQ2hhdC9DaGF0Rm9ybS5qc1wiO1xyXG5pbXBvcnQgbG9hZFBhZ2VBZnRlckxvZ2luIGZyb20gXCIuL0NoYXQvbG9hZFBhZ2VBZnRlckxvZ2luLmpzXCI7XHJcbmltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9hdXRoL2Zvcm1zXCI7XHJcbmltcG9ydCBjbGlja3MgZnJvbSBcIi4vYXV0aC9jbGlja3NcIlxyXG5pbXBvcnQgYWN0aXZhdGVFZGl0QnV0dG9uIGZyb20gXCIuL3Rhc2svZWRpdFwiXHJcbmltcG9ydCBoYW5kbGVFZGl0VGFzayBmcm9tIFwiLi90YXNrL2hhbmRsZUVkaXRcIlxyXG5pbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXV0aC9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGhhbmRsZUxvZ2luIGZyb20gXCIuL2F1dGgvbG9naW5cIlxyXG5pbXBvcnQgZXZlbnRBcGlNYW5hZ2VyIGZyb20gXCIuL2V2ZW50cy9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGNsaWNrV2l6YXJkIGZyb20gXCIuL2V2ZW50cy9jbGlja1wiXHJcbi8vIGltcG9ydCBoYW5kbGVMb2dpbiBmcm9tIFwiLi9hdXRoL2xvZ2luXCJcclxuLy8gdGFzayBpbXBvcnRzXHJcbi8vIGltcG9ydCBmb3JtIGZyb20gXCIuL3Rhc2svdGFza0Zvcm1cIlxyXG5pbXBvcnQgdGFza0NsaWNrcyBmcm9tIFwiLi90YXNrL2NsaWNrc1wiXHJcbmltcG9ydCBhY3RpdmF0ZURlbGV0ZUJ1dHRvbnMgZnJvbSBcIi4vY2hhdC9EZWxldGVDaGF0XCJcclxuaW1wb3J0IGhhbmRsZUVkaXRlZENoYXQgZnJvbSBcIi4vY2hhdC9TYXZlRWRpdFwiXHJcbmltcG9ydCBlZGl0Q2hhdEJ1dHRvbiBmcm9tIFwiLi9jaGF0L0VkaXRDaGF0XCJcclxuXHJcblxyXG4vLyBhcGlGZXRjaCgpO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gYXV0aEZvcm0uaG9tZSgpO1xyXG5jbGlja3MucmVnKClcclxuY2xpY2tzLnJlZ2lzdGVyKClcclxuY2xpY2tzLmZpcnN0TG9nKClcclxuY2xpY2tzLmxvZ2luKClcclxuY2xpY2tzLmxvZ291dCgpXHJcbkNoYXRGb3JtLmFjdGl2YXRlU2VuZEJ1dHRvbigpO1xyXG4vLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS5uZXdUYXNrRm9ybSgpXHJcbnRhc2tDbGlja3MuY3JlYXRlVGFzaygpO1xyXG50YXNrQ2xpY2tzLm5ld1Rhc2soKVxyXG50YXNrQ2xpY2tzLnNhdmVUYXNrKClcclxudGFza0NsaWNrcy5kZWxldGVUYXNrKClcclxuYWN0aXZhdGVFZGl0QnV0dG9uKCk7XHJcbmhhbmRsZUVkaXRUYXNrKClcclxuY2xpY2tXaXphcmQuYWRkRXZlbnRGdW5jdGlvbigpXHJcbmNsaWNrV2l6YXJkLnNhdmVFdmVudEZ1bmN0aW9uKClcclxuY2xpY2tXaXphcmQuZWRpdEJ1dHRvbkZ1bmN0aW9uKClcclxuY2xpY2tXaXphcmQuc2F2ZUVkaXRCdXR0b25GdW5jdGlvbigpXHJcbmNsaWNrV2l6YXJkLmRlbGV0ZUJ1dHRvbkZ1bmN0aW9uKClcclxuYWN0aXZhdGVEZWxldGVCdXR0b25zKCk7XHJcbmhhbmRsZUVkaXRlZENoYXQoKTtcclxuZWRpdENoYXRCdXR0b24oKTtcclxuIiwiY29uc3QgYXBpRmV0Y2ggPSB7XHJcbiAgICBzaW5nbGVUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg5L3Rhc2tzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgYWRkdGFzazogKHRhc2tzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg5L3Rhc2tzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodGFza3MpXHJcbiAgICAgICAgfSkudGhlbihyID0+IHIuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGFsbFRhc2s6ICgpID0+IHtcclxuICAgICAgICBjb25zdCBhY3RpdmVVc2VySWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpO1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3Rhc2tzP3VzZXJJZD0ke2FjdGl2ZVVzZXJJZH1gKVxyXG4gICAgICAgIC50aGVuKHI9PnIuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZVRhc2s6ICh0YXNrSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS90YXNrcy8ke3Rhc2tJZH1gLCB7XHJcbiAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBlZGl0VGFzazogKHRhc2tJZCwgdXNlcklucHV0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvdGFza3MvJHt0YXNrSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHVzZXJJbnB1dClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGVkaXRTaW5nbGU6ICh0YXNrSWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS90YXNrcy8ke3Rhc2tJZH1gKVxyXG4gICAgICAgIC50aGVuKHI9PnIuanNvbigpKVxyXG4gICAgfSxcclxuICAgIG1hcmtBc0NvbXBsZXRlOiAodGFza0lkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvdGFza3MvJHt0YXNrSWR9YCwge1xyXG4gICAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2NvbXBsZXRlZDogXCJ0cnVlXCJ9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LFxyXG4gICAgICBtYXJrQXNJbmNvbXBsZXRlOiAodGFza0lkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvdGFza3MvJHt0YXNrSWR9YCwge1xyXG4gICAgICAgICAgbWV0aG9kOiBcIlBBVENIXCIsXHJcbiAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2NvbXBsZXRlZDogXCJmYWxzZVwifSlcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcGlGZXRjaCIsImltcG9ydCBmb3JtIGZyb20gXCIuL3Rhc2tGb3JtXCJcclxuaW1wb3J0IHByaW50IGZyb20gXCIuL3ByaW50VGFza1wiXHJcbmltcG9ydCBoYW5kbGVMb2dvdXQgZnJvbSBcIi4uL2F1dGgvbG9nb3V0XCJcclxuaW1wb3J0IHRhc2tPYmogZnJvbSBcIi4vb2JqZWN0QnVpbGRlclwiXHJcbmltcG9ydCBhcGlGZXRjaCBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuXHJcblxyXG5jb25zdCB0YXNrQ2xpY2tzID0ge1xyXG4gICAgY3JlYXRlVGFzazogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjcmVhdGUtbmV3LXRhc2tcIikpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IGZvcm0udGFza0Zvcm0oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9LFxyXG4gICAgbmV3VGFzazogKCkgPT4ge1xyXG4gICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LXRhc2tcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAvLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IGZvcm0udGFza0Zvcm0oKVxyXG4gICAgICAgIC8vICAgICBwcmludCgpXHJcbiAgICAgICAgLy8gfSlcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm5ldy10YXNrXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS50YXNrRm9ybSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHNhdmVUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzYXZlLXRhc2tcIikpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhc2tWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tdGFza1wiKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXBsZXRlLWRhdGVcIikudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdXNlcklucHV0ID0gdGFza09iaih0YXNrVmFsLCBkYXRlVmFsKVxyXG4gICAgICAgICAgICAgICAgYXBpRmV0Y2guYWRkdGFzayh1c2VySW5wdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi10YXNrXCIpLnZhbHVlID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXBsZXRlLWRhdGVcIikudmFsdWUgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIGlmKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjaGVja2JveFwiKSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdOyAvLyAxNFxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFza0lkKVxyXG4gICAgICAgICAgICAgICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NoZWNrYm94LSR7dGFza0lkfWApLmNoZWNrZWQpe1xyXG4gICAgICAgICAgICAgICAgICBhcGlGZXRjaC5tYXJrQXNDb21wbGV0ZSh0YXNrSWQpXHJcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwb3NzaWJseS0ke3Rhc2tJZH1gKS5jbGFzc0xpc3QuYWRkKFwiY2hlY2tlZC1jbGFzc1wiKVxyXG4gICAgICAgICAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLXByaW50XCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgIGFwaUZldGNoLm1hcmtBc0luY29tcGxldGUodGFza0lkKVxyXG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcG9zc2libHktJHt0YXNrSWR9YCkuY2xhc3NMaXN0LnJlbW92ZShcImNoZWNrZWQtY2xhc3NcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgLy8gc2F2ZVRhc2s6ICgpID0+IHtcclxuICAgIC8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmUtdGFza1wiKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgdGFza1ZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi10YXNrXCIpLnZhbHVlO1xyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgZGF0ZVZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcGxldGUtZGF0ZVwiKS52YWx1ZTtcclxuXHJcbiAgICAvLyAgICAgICAgICAgICBjb25zdCB1c2VySW5wdXQgPSB0YXNrT2JqKHRhc2tWYWwsIGRhdGVWYWwpXHJcbiAgICAvLyAgICAgICAgICAgICBhcGlGZXRjaC5hZGR0YXNrKHVzZXJJbnB1dClcclxuICAgIC8vICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHByaW50KClcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLXRhc2tcIikudmFsdWUgPSBcIlwiXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29tcGxldGUtZGF0ZVwiKS52YWx1ZSA9IFwiXCJcclxuICAgIC8vICAgICAgICAgICAgICAgICB9KVxyXG5cclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pXHJcbiAgICAvLyB9LFxyXG4gICAgbG9nb3V0OiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJsb2dvdXRcIikpXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVMb2dvdXQoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlVGFzazogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFzay1kZWxldGUtYnRuXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZWxldGVJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl07XHJcbiAgICAgICAgICAgICAgICBhcGlGZXRjaC5kZWxldGVUYXNrKGRlbGV0ZUlkKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrQ2xpY2tzIiwiaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5pbXBvcnQgaGFuZGxlRWRpdFRhc2sgZnJvbSBcIi4vaGFuZGxlRWRpdFwiXHJcbi8vIGZpcnN0IGVkaXQgY2xpY2tcclxuXHJcbmNvbnN0IGFjdGl2YXRlRWRpdEJ1dHRvbiA9ICgpID0+IHtcclxuICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRcIikpIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVsbG9cIilcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKSlcclxuICAgICAgICAgICAgYXBpRmV0Y2guZWRpdFNpbmdsZShldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzJdKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZVRhc2spID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tdGFza1wiKS52YWx1ZSA9IHNpbmdsZVRhc2sudGFzaztcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXBsZXRlLWRhdGVcIikudmFsdWUgPSBzaW5nbGVUYXNrLmRhdGU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2F2ZS10YXNrXCIpLnRleHRDb250ZW50ID0gXCJFZGl0IFRhc2tcIjtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NhdmUtdGFza1wiKS5jbGFzc0xpc3QuYWRkKFwibmV3Q2xhc3NcIilcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NhdmUtdGFza1wiKS5jbGFzc0xpc3QucmVtb3ZlKFwic2F2ZS10YXNrXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLXRhc2tcIikuaWQgPSBgZWRpdC10YXNrLSR7c2luZ2xlVGFzay5pZH1gXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFjdGl2YXRlRWRpdEJ1dHRvbjsiLCJpbXBvcnQgdGFza09iaiBmcm9tIFwiLi9vYmplY3RCdWlsZGVyXCI7XHJcbmltcG9ydCBhcGlGZXRjaCBmcm9tIFwiLi9hcGlNYW5hZ2VyXCI7XHJcbmltcG9ydCBmb3JtIGZyb20gXCIuL3Rhc2tGb3JtXCI7XHJcbmltcG9ydCBwcmludCBmcm9tIFwiLi9wcmludFRhc2tcIlxyXG4vLyBhZnRlciBlZGl0aW5nIHRhc2tcclxuXHJcbmNvbnN0IGhhbmRsZUVkaXRlZFRhc2sgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibmV3Q2xhc3NcIikpIHtcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLXRhc2tcIikudmFsdWVcclxuICAgICAgICAgICAgY29uc3QgdGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXBsZXRlLWRhdGVcIikudmFsdWVcclxuICAgICAgICAgICAgY29uc3QgdGFza0lkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsyXTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG9iamVjdCA9IHRhc2tPYmoodGFza05hbWUsIHRhc2tEYXRlKVxyXG4gICAgICAgICAgICBhcGlGZXRjaC5lZGl0VGFzayh0YXNrSWQsIG9iamVjdCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgIHByaW50KClcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LXRhc2stY29udGFpbmVyXCIpLmlubmVySFRNTCA9IGZvcm0udGFza0Zvcm0oKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRWRpdGVkVGFzayIsIi8vIGNvbnN0IHRhc2tPYmogPSAodGFza1BhcmFtLCBkYXRlUGFyYW0pID0+IHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgdGFzazogdGFza1BhcmFtLFxyXG4vLyAgICAgICAgIGRhdGU6IGRhdGVQYXJhbSxcclxuLy8gICAgICAgICB1c2VySWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuLy8gZXhwb3J0IGRlZmF1bHQgdGFza09ialxyXG5jb25zdCB0YXNrT2JqID0gKHRhc2tQYXJhbSwgZGF0ZVBhcmFtLCBpc0l0Q29tcGxldGUpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdGFzazogdGFza1BhcmFtLFxyXG4gICAgICAgIGRhdGU6IGRhdGVQYXJhbSxcclxuICAgICAgICBjb21wbGV0ZWQ6IGlzSXRDb21wbGV0ZSxcclxuICAgICAgICB1c2VySWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFza09iaiIsImltcG9ydCBhcGlGZXRjaCBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IHByaW50VGFza0J1aWxkZXIgZnJvbSBcIi4vcHJpbnRUYXNrQnVpbGRlclwiXHJcbmltcG9ydCBmb3JtIGZyb20gXCIuL3Rhc2tGb3JtXCJcclxuXHJcbmNvbnN0IHByaW50ID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmludC10YXNrXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGFwaUZldGNoLmFsbFRhc2soKVxyXG4gICAgLnRoZW4odGFza3MgPT4ge1xyXG4gICAgICAgIHRhc2tzLmZvckVhY2goc2luZ2xlVGFzayA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpbnQtdGFza1wiKS5pbm5lckhUTUwgKz0gcHJpbnRUYXNrQnVpbGRlcihzaW5nbGVUYXNrKVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmludCIsIi8vIGNvbnN0IHByaW50VGFza0J1aWxkZXIgPSAodGFza3MpID0+IHtcclxuLy8gICAgIHJldHVybiBgXHJcbi8vICAgICA8ZGl2IGNsYXNzPVwicHJpbnQtdGFza1wiIGlkPVwidGFzay1wcmludFwiPlxyXG4vLyAgICAgPGgxPiR7dGFza3MudGFza308L2gxPlxyXG4vLyAgICAgPHA+JHt0YXNrcy5kYXRlfTwvcD5cclxuLy8gICAgIDxidXR0b24gY2xhc3M9XCJ0YXNrLWRlbGV0ZS1idG5cIiBpZD1cInRhc2stZGVsZXRlLSR7dGFza3MuaWR9XCI+RGVsZXRlPC9idXR0b24+XHJcbi8vICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdFwiIGlkPVwidGFzay1lZGl0LSR7dGFza3MuaWR9XCI+RWRpdDwvYnV0dG9uPlxyXG4vLyAgICAgPC9kaXY+XHJcbi8vICAgICBgXHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IHByaW50VGFza0J1aWxkZXJcclxuY29uc3QgcHJpbnRUYXNrQnVpbGRlciA9ICh0YXNrcykgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuICAgIDxkaXYgY2xhc3M9XCJwcmludC10YXNrXCIgaWQ9XCJ0YXNrLXByaW50XCI+XHJcbiAgICA8bGFiZWwgY2xhc3MgPVwiY2hlY2tib3hcIj5cclxuICAgIDxkaXYgaWQ9IFwicG9zc2libHktJHt0YXNrcy5pZH1cIj5cclxuICAgIDxpbnB1dCBjbGFzcz1cImNoZWNrYm94XCIgaWQ9XCJjaGVja2JveC0ke3Rhc2tzLmlkfVwiIHR5cGU9XCJjaGVja2JveFwiICR7dGFzay5jb21wbGV0ZWQgPT09IHRydWU/IFwiY2hlY2tlZFwiIDogXCJcIn08aDEgY2xhc3MgPSBcImNoZWNrLWgxXCI+JHt0YXNrcy50YXNrfTwvaDE+XHJcbiAgICA8L2Rpdj5cclxuICAgIDwvbGFiZWw+XHJcbiAgICA8cD4ke3Rhc2tzLmRhdGV9PC9wPlxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cInRhc2stZGVsZXRlLWJ0blwiIGlkPVwidGFzay1kZWxldGUtJHt0YXNrcy5pZH1cIj5EZWxldGU8L2J1dHRvbj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJlZGl0XCIgaWQ9XCJ0YXNrLWVkaXQtJHt0YXNrcy5pZH1cIj5FZGl0PC9idXR0b24+XHJcbiAgICA8L2Rpdj4gIFxyXG4gICAgYFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmludFRhc2tCdWlsZGVyIiwiY29uc3QgZm9ybSA9IHtcclxuICAgIG5ld1Rhc2tGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8YnV0dG9uIGlkPVwibmV3LXRhc2tcIiBjbGFzcyA9XCJuZXctdGFza1wiPk5ldyBUYXNrPC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfSxcclxuICAgIHRhc2tGb3JtOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkPVwibmV3LXRhc2stY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBpZCA9IFwibG9nb3V0XCIgY2xhc3M9XCJsb2dvdXRcIj5Mb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICA8Zm9ybSBpZD1cInRhc2tcIj5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwibWFpbi10YXNrXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBUYXNrXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwiY29tcGxldGUtZGF0ZVwiIHBsYWNlaG9sZGVyPVwiQ29tcGxldGUgRGF0ZVwiIHR5cGU9XCJkYXRlXCI+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJzYXZlLXRhc2tcIiBjbGFzcz1cInNhdmUtdGFza1wiPlNhdmUgVGFzazwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGBcclxuICAgIH0sXHJcbiAgICBjcmVhdGVUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8YnV0dG9uIGlkPVwiY3JlYXRlLW5ldy10YXNrXCIgY2xhc3MgPSBcImNyZWF0ZS1uZXctdGFza1wiPkNyZWF0ZSBUYXNrPC9idXR0b24+XHJcbiAgICAgICAgPGJ1dHRvbiBpZCA9IFwibG9nb3V0XCIgY2xhc3M9XCJsb2dvdXRcIj5Mb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcbiAgICAvLyBlZGl0Rm9ybTogKCkgPT4ge1xyXG4gICAgLy8gICAgIHJldHVybiBgXHJcbiAgICAvLyAgICAgPGZvcm0gaWQ9XCJ0YXNrXCI+XHJcbiAgICAvLyAgICAgICAgIDxpbnB1dCBpZD1cIm1haW4tdGFza1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgVGFza1wiIHR5cGU9XCJ0ZXh0XCIgdmFsdWUgPSBgYD5cclxuICAgIC8vICAgICAgICAgPGlucHV0IGlkPVwiY29tcGxldGUtZGF0ZVwiIHBsYWNlaG9sZGVyPVwiQ29tcGxldGUgRGF0ZVwiIHR5cGU9XCJkYXRlXCI+XHJcbiAgICAvLyAgICAgPC9mb3JtPlxyXG4gICAgLy8gICAgIDxidXR0b24gaWQ9XCJzYXZlLXRhc2tcIiBjbGFzcz1cInNhdmUtdGFza1wiPlNhdmUgVGFzazwvYnV0dG9uPlxyXG4gICAgLy8gICAgIGBcclxuXHJcbiAgICAvLyB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm0iXX0=
