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
    if (event.target.classList.contains("edit-chat")) {
      _ChatCollection.default.getSingleChat(event.target.id.split("-")[2]).then(singleChat => {
        document.querySelector("#new-message-input").value = `${singleChat.message}`;
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
  document.querySelector("#form-output").innerHTML += _ChatForm.default.renderChatForm(); // // Builds Chat List

  (0, _ChatList.default)();
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

},{"../Chat/loadPageAfterLogin":9,"../events/click":27,"../events/printAllEvents":31,"../task/printTask":38,"../task/taskForm":40,"./apiManager":10,"./forms":12}],14:[function(require,module,exports){
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

},{"../Chat/ChatList":4,"../events/printAllEvents":31,"../task/taskForm":40,"./apiManager":10,"./forms":12,"./objectBuilder":15}],17:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],18:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],19:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"./ChatCollection":18,"./ChatList":20,"./ChatObj":21,"dup":3}],20:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"./Chat.js":17,"./ChatCollection.js":18,"./ChatForm.js":19,"dup":4}],21:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"dup":5}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"./ChatCollection":18,"./ChatList":20,"dup":6}],23:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"./ChatCollection":18,"./SaveEdit":24,"dup":7}],24:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"./ChatCollection":18,"./ChatForm":19,"./ChatList":20,"./ChatObj":21,"dup":8}],25:[function(require,module,exports){
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

},{"./printAllEvents":31}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{"./apiManager":25,"./editForm":28,"./eventForm":29,"./eventObject":30,"./printAllEvents":31}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{"./apiManager":25,"./buildSingleEvent":26,"./eventForm":29}],32:[function(require,module,exports){
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

var _EditChat = _interopRequireDefault(require("./chat/EditChat"));

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

(0, _DeleteChat.default)(); // Activate Edit Buttons

(0, _EditChat.default)();
(0, _SaveEdit.default)();

},{"./Chat/ChatForm.js":3,"./Chat/loadPageAfterLogin.js":9,"./auth/apiManager":10,"./auth/clicks":11,"./auth/forms":12,"./auth/login":13,"./chat/DeleteChat":22,"./chat/EditChat":23,"./chat/SaveEdit":24,"./events/apiManager":25,"./events/click":27,"./task/clicks":34,"./task/edit":35,"./task/handleEdit":36}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{"../auth/logout":14,"./apiManager":33,"./objectBuilder":37,"./printTask":38,"./taskForm":40}],35:[function(require,module,exports){
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

},{"./apiManager":33,"./handleEdit":36}],36:[function(require,module,exports){
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

},{"./apiManager":33,"./objectBuilder":37,"./printTask":38,"./taskForm":40}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{"./apiManager":33,"./printTaskBuilder":39,"./taskForm":40}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{}]},{},[32])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0NoYXQvQ2hhdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Q29sbGVjdGlvbi5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0Rm9ybS5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0TGlzdC5qcyIsIi4uL3NjcmlwdHMvQ2hhdC9DaGF0T2JqLmpzIiwiLi4vc2NyaXB0cy9DaGF0L0RlbGV0ZUNoYXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvRWRpdENoYXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvU2F2ZUVkaXQuanMiLCIuLi9zY3JpcHRzL0NoYXQvbG9hZFBhZ2VBZnRlckxvZ2luLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL2F1dGgvY2xpY2tzLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2Zvcm1zLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2xvZ2luLmpzIiwiLi4vc2NyaXB0cy9hdXRoL2xvZ291dC5qcyIsIi4uL3NjcmlwdHMvYXV0aC9vYmplY3RCdWlsZGVyLmpzIiwiLi4vc2NyaXB0cy9hdXRoL3JlZ2lzdGVyLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvYXBpTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2J1aWxkU2luZ2xlRXZlbnQuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9jbGljay5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2VkaXRGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRPYmplY3QuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9wcmludEFsbEV2ZW50cy5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvdGFzay9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy90YXNrL2NsaWNrcy5qcyIsIi4uL3NjcmlwdHMvdGFzay9lZGl0LmpzIiwiLi4vc2NyaXB0cy90YXNrL2hhbmRsZUVkaXQuanMiLCIuLi9zY3JpcHRzL3Rhc2svb2JqZWN0QnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvdGFzay9wcmludFRhc2suanMiLCIuLi9zY3JpcHRzL3Rhc2svcHJpbnRUYXNrQnVpbGRlci5qcyIsIi4uL3NjcmlwdHMvdGFzay90YXNrRm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxNQUFNLFNBQVMsR0FBSSxhQUFELElBQW1CO0FBQ2pDO0FBQ0E7QUFDQSxTQUFROzRCQUNnQixhQUFhLENBQUMsSUFBZCxDQUFtQixJQUFLO2dDQUNwQixhQUFhLENBQUMsT0FBUTs4Q0FDUixhQUFhLENBQUMsRUFBRztrREFDYixhQUFhLENBQUMsRUFBRztRQUovRDtBQU1GLENBVEY7O2VBVWdCLFM7Ozs7Ozs7Ozs7QUNWaEIsTUFBTSxjQUFjLEdBQUc7QUFDckIsRUFBQSxjQUFjLEVBQUcsWUFBRCxJQUFrQjtBQUNoQyxXQUFPLEtBQUssQ0FBQyxnQ0FBRCxFQUFtQztBQUM3QyxNQUFBLE1BQU0sRUFBRSxNQURxQztBQUU3QyxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRm9DO0FBSzdDLE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsWUFBZjtBQUx1QyxLQUFuQyxDQUFaO0FBT0QsR0FUb0I7QUFVckIsRUFBQSxXQUFXLEVBQUUsTUFBTTtBQUNqQixXQUFPLEtBQUssQ0FBQyw2Q0FBRCxDQUFMLENBQ04sSUFETSxDQUNELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURYLENBQVA7QUFFQSxHQWJtQjtBQWNyQixFQUFBLFVBQVUsRUFBRyxNQUFELElBQVk7QUFDdEIsV0FBTyxLQUFLLENBQUUsa0NBQWlDLE1BQU8sRUFBMUMsRUFBNkM7QUFDdkQsTUFBQSxNQUFNLEVBQUU7QUFEK0MsS0FBN0MsQ0FBWjtBQUdELEdBbEJvQjtBQW1CckIsRUFBQSxhQUFhLEVBQUcsTUFBRCxJQUFZO0FBQzNCLFdBQU8sS0FBSyxDQUFFLGtDQUFpQyxNQUFPLEVBQTFDLENBQUwsQ0FDSixJQURJLENBQ0MsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFGLEVBRE4sQ0FBUDtBQUN3QixHQXJCSDtBQXVCckIsRUFBQSxRQUFRLEVBQUUsQ0FBQyxNQUFELEVBQVMsT0FBVCxLQUFxQjtBQUM3QixXQUFPLEtBQUssQ0FBRSxrQ0FBaUMsTUFBTyxFQUExQyxFQUE2QztBQUN2RCxNQUFBLE1BQU0sRUFBRSxLQUQrQztBQUV2RCxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRjhDO0FBS3ZELE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsT0FBZjtBQUxpRCxLQUE3QyxDQUFaO0FBT0Q7QUEvQm9CLENBQXZCO2VBaUNlLGM7Ozs7Ozs7Ozs7O0FDaENmOztBQUNBOztBQUNBOzs7O0FBSEE7QUFJQTtBQUVBLE1BQU0sUUFBUSxHQUFHO0FBQ2YsRUFBQSxjQUFjLEVBQUUsTUFBTTtBQUNwQixXQUFROzs7Ozs7V0FBUjtBQU9ELEdBVGM7QUFVZixFQUFBLGtCQUFrQixFQUFFLE1BQU07QUFDeEIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixFQUF1QyxnQkFBdkMsQ0FBd0QsT0FBeEQsRUFBaUUsTUFBTTtBQUNyRSxVQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixLQUFvQixXQUF4QixFQUFxQztBQUNuQyxjQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsS0FBaEU7QUFDQSxjQUFNLFlBQVksR0FBRyxzQkFBZ0IsVUFBaEIsQ0FBckI7O0FBQ0EsZ0NBQWUsY0FBZixDQUE4QixZQUE5Qjs7QUFDQTtBQUNEO0FBRUYsS0FSRDtBQVVEO0FBckJjLENBQWpCO2VBd0JlLFE7Ozs7Ozs7Ozs7O0FDOUJmOztBQUNBOztBQUNBOzs7O0FBRUE7QUFHQSxNQUFNLFFBQVEsR0FBRyxNQUFNO0FBQ25CLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsU0FBdkMsR0FBbUQsRUFBbkQ7QUFDQSxNQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixDQUFiOztBQUNBLDBCQUFlLFdBQWYsR0FDQyxJQURELENBQ00sSUFBSSxJQUFJO0FBQ1YsSUFBQSxJQUFJLENBQUMsT0FBTCxDQUFhLFVBQVUsSUFBSTtBQUN2QixNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLEVBQXVDLFNBQXZDLElBQW9ELG1CQUFVLFVBQVYsQ0FBcEQ7QUFDSCxLQUZEO0FBSUgsR0FORDtBQU9ILENBVkQ7O2VBV2UsUTs7Ozs7Ozs7Ozs7QUNsQmYsTUFBTSxlQUFlLEdBQUksWUFBRCxJQUFrQjtBQUN0QyxTQUFPO0FBQ0wsSUFBQSxPQUFPLEVBQUUsWUFESjtBQUVMLElBQUEsTUFBTSxFQUFFLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCO0FBRkgsR0FBUDtBQUlELENBTEg7O2VBTWUsZTs7Ozs7Ozs7Ozs7QUNOZjs7QUFDQTs7OztBQUVBLE1BQU0scUJBQXFCLEdBQUcsTUFBTTtBQUNoQyxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGNBQXZCLEVBQXVDLGdCQUF2QyxDQUF3RCxPQUF4RCxFQUFpRSxNQUFNO0FBQ25FLFFBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxTQUFiLENBQXVCLFFBQXZCLENBQWdDLGFBQWhDLENBQUgsRUFBa0Q7QUFDOUMsWUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBQWdCLEtBQWhCLENBQXNCLEdBQXRCLEVBQTJCLENBQTNCLENBQW5COztBQUNBLDhCQUFlLFVBQWYsQ0FBMEIsVUFBMUIsRUFDQyxJQURELENBQ00saUJBRE47QUFFSDtBQUNKLEdBTkQ7QUFPSCxDQVJEOztlQVVlLHFCOzs7Ozs7Ozs7OztBQ2JmOztBQUNBOzs7O0FBR0EsTUFBTSxrQkFBa0IsR0FBRyxNQUFNO0FBQzdCLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsZ0JBQXZDLENBQXdELE9BQXhELEVBQWlFLE1BQU07QUFDbkUsUUFBRyxLQUFLLENBQUMsTUFBTixDQUFhLFNBQWIsQ0FBdUIsUUFBdkIsQ0FBZ0MsV0FBaEMsQ0FBSCxFQUFnRDtBQUM1Qyw4QkFBZSxhQUFmLENBQTZCLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixLQUFoQixDQUFzQixHQUF0QixFQUEyQixDQUEzQixDQUE3QixFQUNDLElBREQsQ0FDTyxVQUFELElBQWdCO0FBQ2xCLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLEtBQTdDLEdBQXNELEdBQUUsVUFBVSxDQUFDLE9BQVEsRUFBM0U7QUFDQSxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLEVBQXFDLFdBQXJDLEdBQW1ELFdBQW5EO0FBQ0EsUUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxFQUFyQyxHQUEwQyxhQUFZLFVBQVUsQ0FBQyxFQUFHLEVBQXBFO0FBQ0E7QUFFSCxPQVBEO0FBUUg7QUFDSixHQVhEO0FBWUgsQ0FiRDs7ZUFlZSxrQjs7Ozs7Ozs7Ozs7QUNuQmY7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLGdCQUFnQixHQUFHLE1BQU07QUFDN0IsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixFQUF1QyxnQkFBdkMsQ0FBd0QsT0FBeEQsRUFBaUUsTUFBTTtBQUNyRSxRQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixRQUFoQixDQUF5QixXQUF6QixDQUFKLEVBQTJDO0FBQ3pDO0FBQ0EsWUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLEtBQWhFO0FBQ0EsWUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBQWdCLEtBQWhCLENBQXNCLEdBQXRCLEVBQTJCLENBQTNCLENBQWYsQ0FIeUMsQ0FJekM7O0FBQ0EsWUFBTSxZQUFZLEdBQUcsc0JBQWdCLFVBQWhCLENBQXJCOztBQUVBLDhCQUFlLFFBQWYsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBaEMsRUFBOEMsSUFBOUMsQ0FBbUQsTUFBTTtBQUN2RDtBQUNBLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsU0FBdkMsR0FBbUQsa0JBQVMsU0FBVCxFQUFuRDtBQUNELE9BSEQ7QUFJRDtBQUNGLEdBYkQ7QUFjRCxDQWZEOztlQWlCZSxnQjs7Ozs7Ozs7Ozs7QUN0QmY7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTtBQUNBLE1BQU0sa0JBQWtCLEdBQUcsTUFBTTtBQUNqQztBQUNBLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsY0FBdkIsRUFBdUMsU0FBdkMsSUFBb0Qsa0JBQVMsY0FBVCxFQUFwRCxDQUZpQyxDQUdqQzs7QUFDQTtBQUNDLENBTEQ7O2VBT2Usa0I7Ozs7Ozs7Ozs7QUNiZixNQUFNLFFBQVEsR0FBRztBQUNiLEVBQUEsT0FBTyxFQUFHLFVBQUQsSUFBZ0I7QUFDckIsV0FBTyxLQUFLLENBQUMsNkJBQUQsRUFBZ0M7QUFDeEMsTUFBQSxNQUFNLEVBQUUsTUFEZ0M7QUFFeEMsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUYrQjtBQUt4QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFVBQWY7QUFMa0MsS0FBaEMsQ0FBTCxDQU1KLElBTkksQ0FNQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUYsRUFOTixDQUFQO0FBT0gsR0FUWTtBQVViLEVBQUEsUUFBUSxFQUFFLE1BQU07QUFDWixXQUFPLEtBQUssQ0FBQyw2QkFBRCxDQUFMLENBQ04sSUFETSxDQUNELENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRixFQURKLENBQVA7QUFFSCxHQWJZO0FBY2IsRUFBQSxTQUFTLEVBQUcsSUFBRCxJQUFVO0FBQ2pCLFdBQU8sS0FBSyxDQUFFLG9DQUFtQyxJQUFLLEVBQTFDLENBQUwsQ0FDTixJQURNLENBQ0QsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFGLEVBREosQ0FBUDtBQUdGO0FBbEJXLENBQWpCO2VBb0JnQixROzs7Ozs7Ozs7OztBQ3BCaEI7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLE1BQU0sR0FBRztBQUNYLEVBQUEsR0FBRyxFQUFFLE1BQU07QUFDUCxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGVBQXZCLEVBQXdDLGdCQUF4QyxDQUF5RCxPQUF6RCxFQUFrRSxNQUFNO0FBQ3BFLHdCQUFTLEdBQVQ7QUFDSCxLQUZEO0FBR0gsR0FMVTtBQU1YLEVBQUEsUUFBUSxFQUFFLE1BQU07QUFDWixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCLEVBQStCLGdCQUEvQixDQUFnRCxPQUFoRCxFQUF5RCxNQUFNO0FBQzNELFVBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxTQUFiLENBQXVCLFFBQXZCLENBQWdDLFlBQWhDLENBQUosRUFBa0Q7QUFDOUMsMEJBQVMsY0FBVDtBQUNIO0FBQ0osS0FKRDtBQUtILEdBWlU7QUFhWCxFQUFBLFFBQVEsRUFBRSxNQUFNO0FBQ1osSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxnQkFBdEMsQ0FBdUQsT0FBdkQsRUFBZ0UsTUFBTTtBQUNsRSxxQkFBWSxRQUFaO0FBQ0gsS0FGRDtBQUdILEdBakJVO0FBa0JYLEVBQUEsS0FBSyxFQUFFLE1BQU07QUFDVCxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCLEVBQStCLGdCQUEvQixDQUFnRCxPQUFoRCxFQUF5RCxNQUFNO0FBQzNELFVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxTQUFiLENBQXVCLFFBQXZCLENBQWdDLE9BQWhDLENBQUgsRUFBNEM7QUFDNUMsdUJBQVksS0FBWjtBQUNDO0FBQ0osS0FKRDtBQUtILEdBeEJVO0FBeUJYLEVBQUEsTUFBTSxFQUFFLE1BQU07QUFDVixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCLEVBQStCLGdCQUEvQixDQUFnRCxPQUFoRCxFQUF5RCxNQUFNO0FBQzNELFVBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxTQUFiLENBQXVCLFFBQXZCLENBQWdDLFFBQWhDLENBQUgsRUFBNkM7QUFDN0M7QUFDQztBQUVKLEtBTEQ7QUFNSDtBQWhDVSxDQUFmO2VBa0NlLE07Ozs7Ozs7Ozs7QUN0Q2YsTUFBTSxRQUFRLEdBQUc7QUFDYixFQUFBLElBQUksRUFBRSxNQUFNO0FBQ1IsV0FBUTs7Ozs7Ozs7U0FBUjtBQVVILEdBWlk7QUFhYixFQUFBLFFBQVEsRUFBRSxNQUFNO0FBQ1osV0FBUTs7Ozs7Ozs7Ozs7O1dBQVI7QUFjSCxHQTVCWTtBQTZCYixFQUFBLEtBQUssRUFBRSxNQUFNO0FBQ1QsV0FBUTs7Ozs7Ozs7U0FBUjtBQVNILEdBdkNZO0FBd0NiLEVBQUEsSUFBSSxFQUFFLE1BQU07QUFDUixXQUFROztTQUFSO0FBR0g7QUE1Q1ksQ0FBakI7ZUErQ2UsUTs7Ozs7Ozs7Ozs7QUMvQ2Y7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFHQSxNQUFNLFdBQVcsR0FBRztBQUNoQixFQUFBLFFBQVEsRUFBRSxNQUFNO0FBQ1osSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixVQUF2QixFQUFtQyxTQUFuQyxHQUErQyxFQUEvQztBQUNBLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUMsU0FBbkMsR0FBK0MsZUFBUyxLQUFULEVBQS9DO0FBQ0gsR0FKZTtBQUtoQixFQUFBLEtBQUssRUFBRSxNQUFNO0FBQ1QsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsS0FBdEQ7QUFDQSxVQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxLQUF0RDs7QUFDQSx3QkFBUyxTQUFULENBQW1CLE9BQW5CLEVBQ0ssSUFETCxDQUNXLFVBQUQsSUFBZ0I7QUFDbEIsVUFBRyxPQUFPLEtBQUssVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjLFFBQTdCLEVBQXVDO0FBQ25DLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUMsU0FBbkMsR0FBK0MsRUFBL0MsQ0FEbUMsQ0FFbkM7QUFDQTs7QUFDQSxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLFNBQWhDLEdBQTRDLGtCQUFLLFVBQUwsRUFBNUM7QUFDQSxRQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxFQUEvQztBQUNBO0FBQ0E7QUFDQTtBQUNILE9BVEQsTUFTTztBQUNILFFBQUEsS0FBSyxDQUFDLDRCQUFELENBQUw7QUFDSDtBQUNKLEtBZEw7QUFlSDtBQXZCZSxDQUFwQjtlQXlCZSxXOzs7Ozs7Ozs7OztBQ2xDZjs7QUFFQTs7OztBQURBO0FBRUEsTUFBTSxZQUFZLEdBQUcsTUFBTTtBQUN2QixFQUFBLGNBQWMsQ0FBQyxVQUFmLENBQTBCLFFBQTFCO0FBQ0EsRUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLE9BQVo7QUFDQSxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLFNBQWhDLEdBQTRDLEVBQTVDO0FBQ0EsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixhQUF2QixFQUFzQyxTQUF0QyxHQUFrRCxFQUFsRDtBQUNBLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUMsU0FBbkMsR0FBK0MsZUFBUyxJQUFULEVBQS9DLENBTHVCLENBTTNCOztBQUNJLGtCQUFPLEdBQVA7O0FBQ0Esa0JBQU8sUUFBUDs7QUFDQSxrQkFBTyxRQUFQOztBQUNBLGtCQUFPLE1BQVA7O0FBQ0EsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixxQkFBdkIsRUFBOEMsU0FBOUMsR0FBMEQsRUFBMUQ7QUFDQSxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGlCQUF2QixFQUEwQyxTQUExQyxHQUFzRCxFQUF0RDtBQUNBLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkIsRUFBaUMsU0FBakMsR0FBNkMsRUFBN0M7QUFDSCxDQWREOztlQWVlLFk7Ozs7Ozs7Ozs7O0FDbEJmLE1BQU0sT0FBTyxHQUFHLENBQUMsU0FBRCxFQUFZLFVBQVosRUFBd0IsU0FBeEIsRUFBbUMsU0FBbkMsS0FBaUQ7QUFDN0QsU0FBTztBQUNQLElBQUEsSUFBSSxFQUFFLFNBREM7QUFFUCxJQUFBLEtBQUssRUFBRSxVQUZBO0FBR1AsSUFBQSxJQUFJLEVBQUUsU0FIQztBQUlQLElBQUEsUUFBUSxFQUFFO0FBSkgsR0FBUDtBQU9ILENBUkQ7O2VBVWUsTzs7Ozs7Ozs7Ozs7QUNWZjs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0sUUFBUSxHQUFHO0FBRWIsRUFBQSxHQUFHLEVBQUUsTUFBTTtBQUNYLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsVUFBdkIsRUFBbUMsU0FBbkMsR0FBK0MsRUFBL0M7QUFDQSxJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFdBQXZCLEVBQW9DLFNBQXBDLEdBQWdELGVBQVMsUUFBVCxFQUFoRDtBQUNDLEdBTFk7QUFPYixFQUFBLGNBQWMsRUFBRSxNQUFNO0FBQ3RCLFVBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxLQUF6RDtBQUNBLFVBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGlCQUF2QixFQUEwQyxLQUEzRDtBQUNBLFVBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLG9CQUF2QixFQUE2QyxLQUE3RDtBQUNBLFVBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLG9CQUF2QixFQUE2QyxLQUE3RDtBQUVBLFVBQU0sU0FBUyxHQUFHLDRCQUFRLE9BQVIsRUFBaUIsUUFBakIsRUFBMkIsT0FBM0IsRUFBb0MsT0FBcEMsQ0FBbEI7O0FBQ0Esd0JBQVMsT0FBVCxDQUFpQixTQUFqQixFQUNDLElBREQsQ0FDTyxVQUFELElBQWdCO0FBQ2xCLE1BQUEsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsRUFBaUMsVUFBVSxDQUFDLEVBQTVDO0FBQ0EsTUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixXQUF2QixFQUFvQyxTQUFwQyxHQUFnRCxFQUFoRCxDQUZrQixDQUdsQjs7QUFDQSxNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLFNBQWhDLEdBQTRDLGtCQUFLLFFBQUwsRUFBNUM7QUFDQSxNQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLEVBQWlDLFNBQWpDLEdBQTZDLGVBQVMsSUFBVCxFQUE3QztBQUNBO0FBQ0gsS0FSRDtBQVNDO0FBdkJZLENBQWpCO2VBMEJlLFE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pDZjs7OztBQUNBLE1BQU0sZUFBZSxHQUFHO0FBQ2hCLEVBQUEsWUFBWSxFQUFHLE1BQUQsSUFBWTtBQUMxQixXQUFPLEtBQUssQ0FBRSx3Q0FBdUMsTUFBTyxFQUFoRCxDQUFMLENBQ0YsSUFERSxDQUNHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBUCxFQURiLENBQVA7QUFFSCxHQUptQjtBQUloQixFQUFBLFlBQVksRUFBRSxXQUFXLElBQUk7QUFDN0IsV0FBTyxLQUFLLENBQUMsOEJBQUQsRUFBaUM7QUFDekMsTUFBQSxNQUFNLEVBQUUsTUFEaUM7QUFFekMsTUFBQSxPQUFPLEVBQ1A7QUFDSSx3QkFBZ0I7QUFEcEIsT0FIeUM7QUFNekMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxXQUFmO0FBTm1DLEtBQWpDLENBQVo7QUFTSCxHQWRtQjtBQWNqQixFQUFBLFdBQVcsRUFBRyxVQUFELElBQWdCO0FBQzVCLElBQUEsS0FBSyxDQUFFLGdDQUErQixVQUFXLEVBQTVDLEVBQStDO0FBQ2hELE1BQUEsTUFBTSxFQUFFO0FBRHdDLEtBQS9DLENBQUwsQ0FHSyxJQUhMLENBR1UsTUFBTTtBQUNSO0FBQ0gsS0FMTDtBQU1ILEdBckJtQjtBQXFCakIsRUFBQSxjQUFjLEVBQUcsRUFBRCxJQUFRO0FBQ3ZCLFdBQU8sS0FBSyxDQUFFLGdDQUErQixFQUFHLEVBQXBDLENBQUwsQ0FDRixJQURFLENBQ0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGYsQ0FBUDtBQUVILEdBeEJtQjtBQXdCaEIsRUFBQSxTQUFTLEVBQUUsQ0FBQyxPQUFELEVBQVUsV0FBVixLQUEwQjtBQUNyQyxXQUFPLEtBQUssQ0FBRSxnQ0FBK0IsT0FBUSxFQUF6QyxFQUE0QztBQUNwRCxNQUFBLE1BQU0sRUFBRSxLQUQ0QztBQUVwRCxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRjJDO0FBS3BELE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsV0FBZjtBQUw4QyxLQUE1QyxDQUFaO0FBT0g7QUFoQ21CLENBQXhCO2VBcUNlLGU7Ozs7Ozs7Ozs7O0FDdENmLE1BQU0sZ0JBQWdCLEdBQUksV0FBRCxJQUFpQjtBQUN0QyxTQUFRO29DQUN3QixXQUFXLENBQUMsRUFBRztrQkFDakMsV0FBVyxDQUFDLElBQUs7NEJBQ1AsV0FBVyxDQUFDLElBQUs7Z0NBQ2IsV0FBVyxDQUFDLFFBQVM7OzhEQUVTLFdBQVcsQ0FBQyxFQUFHLG9FQUFtRSxXQUFXLENBQUMsRUFBRzs7YUFOM0o7QUFTSCxDQVZEOztlQVdlLGdCOzs7Ozs7Ozs7OztBQ1hmOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0EsTUFBTSxXQUFXLEdBQUc7QUFDaEIsRUFBQSxnQkFBZ0IsRUFBRSxNQUFNO0FBQ3BCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlELE1BQU07QUFDM0QsVUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsS0FBb0IsZ0JBQXhCLEVBQTBDO0FBQ3RDLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLFNBQTlDLEdBQTBELG1CQUFpQixlQUFqQixFQUExRDtBQUNIO0FBQ0osS0FKRDtBQU1ILEdBUmU7QUFTaEIsRUFBQSxpQkFBaUIsRUFBRSxNQUFNO0FBQ3JCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlELE1BQU07QUFDM0QsVUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFNBQWIsQ0FBdUIsUUFBdkIsQ0FBZ0MsaUJBQWhDLENBQUosRUFBd0Q7QUFDcEQsY0FBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDLEtBQTNEO0FBQ0EsY0FBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDLEtBQTNEO0FBQ0EsY0FBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLEtBQW5FO0FBQ0EsY0FBTSxjQUFjLEdBQUcsMEJBQWlCLFNBQWpCLEVBQTRCLFNBQTVCLEVBQXVDLGFBQXZDLENBQXZCOztBQUNBLDRCQUFnQixZQUFoQixDQUE2QixjQUE3QixFQUNLLElBREwsQ0FDVSx1QkFEVjs7QUFFQSxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLGdCQUF2QixFQUF5QyxLQUF6QyxHQUFpRCxFQUFqRDtBQUNBLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDLEtBQXpDLEdBQWlELEVBQWpEO0FBQ0EsUUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsS0FBN0MsR0FBcUQsRUFBckQ7QUFDSDtBQUNKLEtBWkQ7QUFhSCxHQXZCZTtBQXdCaEIsRUFBQSxrQkFBa0IsRUFBRSxNQUFNO0FBQ3RCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlELE1BQU07QUFDM0QsVUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFNBQWIsQ0FBdUIsUUFBdkIsQ0FBZ0MsWUFBaEMsQ0FBSixFQUFtRDtBQUMvQyxZQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsQ0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsRUFBMkIsQ0FBM0IsQ0FBbEI7O0FBQ0EsNEJBQWdCLGNBQWhCLENBQStCLFdBQS9CLEVBQ0ssSUFETCxDQUNXLGVBQUQsSUFBcUI7QUFDdkIsVUFBQSxRQUFRLENBQUMsYUFBVCxDQUF3QixtQkFBa0IsV0FBWSxFQUF0RCxFQUF5RCxTQUF6RCxHQUFxRSxFQUFyRTtBQUNBLFVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBd0IsbUJBQWtCLFdBQVksRUFBdEQsRUFBeUQsU0FBekQsR0FBcUUsdUJBQXFCLGVBQXJCLENBQXJFO0FBQ0gsU0FKTDtBQUtIO0FBQ0osS0FURDtBQVVILEdBbkNlO0FBb0NoQixFQUFBLHNCQUFzQixFQUFFLE1BQU07QUFDMUIsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixFQUErQixnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBeUQsTUFBTTtBQUMzRCxVQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxpQkFBaEMsQ0FBSixFQUF3RDtBQUNwRCxjQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsQ0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsRUFBMkIsQ0FBM0IsQ0FBZjtBQUNBLGNBQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXdCLGtCQUFpQixNQUFPLEVBQWhELEVBQW1ELEtBQXRFO0FBQ0EsY0FBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBd0Isa0JBQWlCLE1BQU8sRUFBaEQsRUFBbUQsS0FBdEU7QUFDQSxjQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF3QixzQkFBcUIsTUFBTyxFQUFwRCxFQUF1RCxLQUE5RTtBQUNBLGNBQU0saUJBQWlCLEdBQUcsMEJBQWlCLFVBQWpCLEVBQTZCLFVBQTdCLEVBQXlDLGNBQXpDLENBQTFCOztBQUNBLDRCQUFnQixTQUFoQixDQUEwQixNQUExQixFQUFrQyxpQkFBbEMsRUFDSyxJQURMLENBQ1UsdUJBRFY7QUFFSDtBQUNKLEtBVkQ7QUFXSCxHQWhEZTtBQWlEaEIsRUFBQSxvQkFBb0IsRUFBRSxNQUFNO0FBQ3hCLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlELE1BQU07QUFDM0QsVUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFNBQWIsQ0FBdUIsUUFBdkIsQ0FBZ0MsY0FBaEMsQ0FBSixFQUFxRDtBQUNqRCxZQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsQ0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsRUFBMkIsQ0FBM0IsQ0FBcEI7O0FBQ0EsNEJBQWdCLFdBQWhCLENBQTRCLGFBQTVCO0FBQ0g7QUFDSixLQUxEO0FBTUg7QUF4RGUsQ0FBcEI7ZUEwRGUsVzs7Ozs7Ozs7Ozs7QUMvRGYsTUFBTSxvQkFBb0IsR0FBSSxXQUFELElBQWlCO0FBQzFDLFNBQVE7NkNBQ2lDLFdBQVcsQ0FBQyxFQUFHLGlDQUFnQyxXQUFXLENBQUMsSUFBSzs2Q0FDaEUsV0FBVyxDQUFDLEVBQUcsaUNBQWdDLFdBQVcsQ0FBQyxJQUFLO2lEQUM1RCxXQUFXLENBQUMsRUFBRyxxQ0FBb0MsV0FBVyxDQUFDLFFBQVM7OzRDQUU3RSxXQUFXLENBQUMsRUFBRyxnREFMdkQ7QUFNSCxDQVBEOztlQVFlLG9COzs7Ozs7Ozs7O0FDUmYsTUFBTSxnQkFBZ0IsR0FBSTtBQUN0QixFQUFBLGVBQWUsRUFBRSxNQUFNO0FBQ3ZCLFdBQVE7Ozs7O3FGQUFSO0FBTUgsR0FSeUI7QUFVdkIsRUFBQSxXQUFXLEVBQUc7QUFWUyxDQUExQjtlQWFlLGdCOzs7Ozs7Ozs7OztBQ2JmLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixhQUF2QixLQUF5QztBQUM5RCxTQUFPO0FBQ0gsSUFBQSxJQUFJLEVBQUUsU0FESDtBQUVILElBQUEsSUFBSSxFQUFFLFNBRkg7QUFHSCxJQUFBLFFBQVEsRUFBRSxhQUhQO0FBSUgsSUFBQSxNQUFNLEVBQUUsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkI7QUFKTCxHQUFQO0FBTUgsQ0FQRDs7ZUFRZSxnQjs7Ozs7Ozs7Ozs7QUNSZjs7QUFDQTs7QUFDQTs7OztBQUNBLE1BQU0sY0FBYyxHQUFHLE1BQU07QUFDakIsTUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsQ0FBYjtBQUNBLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLFNBQTlDLEdBQTBELG1CQUFpQixXQUEzRTtBQUNJLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLFNBQTFDLEdBQXNELEVBQXREOztBQUNBLHNCQUFnQixZQUFoQixDQUE2QixNQUE3QixFQUNLLElBREwsQ0FDVyxRQUFELElBQWM7QUFDaEIsSUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixXQUFXLElBQUk7QUFDNUIsTUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsU0FBMUMsSUFBdUQsK0JBQWlCLFdBQWpCLENBQXZEO0FBQ0gsS0FGRDtBQUdILEdBTEw7QUFNSCxDQVZiOztlQVdlLGM7Ozs7OztBQ2JmOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUlBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBTkE7QUFDQTtBQUNBO0FBT0E7QUFDQSxRQUFRLENBQUMsYUFBVCxDQUF1QixVQUF2QixFQUFtQyxTQUFuQyxHQUErQyxlQUFTLElBQVQsRUFBL0M7O0FBQ0EsZ0JBQU8sR0FBUDs7QUFDQSxnQkFBTyxRQUFQOztBQUNBLGdCQUFPLFFBQVA7O0FBQ0EsZ0JBQU8sS0FBUDs7QUFDQSxnQkFBTyxNQUFQOztBQUNBLGtCQUFTLGtCQUFULEcsQ0FDQTs7O0FBQ0EsaUJBQVcsVUFBWDs7QUFDQSxpQkFBVyxPQUFYOztBQUNBLGlCQUFXLFFBQVg7O0FBQ0EsaUJBQVcsVUFBWDs7QUFDQTtBQUNBOztBQUNBLGVBQVksZ0JBQVo7O0FBQ0EsZUFBWSxpQkFBWjs7QUFDQSxlQUFZLGtCQUFaOztBQUNBLGVBQVksc0JBQVo7O0FBQ0EsZUFBWSxvQkFBWjs7QUFDQSwyQixDQUNBOztBQUNBO0FBQ0E7Ozs7Ozs7OztBQzNDQSxNQUFNLFFBQVEsR0FBRztBQUNiLEVBQUEsVUFBVSxFQUFFLE1BQU07QUFDZCxXQUFPLEtBQUssQ0FBQyw2QkFBRCxDQUFMLENBQ0YsSUFERSxDQUNHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRixFQURSLENBQVA7QUFFSCxHQUpZO0FBS2IsRUFBQSxPQUFPLEVBQUcsS0FBRCxJQUFXO0FBQ2hCLFdBQU8sS0FBSyxDQUFDLDZCQUFELEVBQWdDO0FBQ3hDLE1BQUEsTUFBTSxFQUFFLE1BRGdDO0FBRXhDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGK0I7QUFLeEMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxLQUFmO0FBTGtDLEtBQWhDLENBQUwsQ0FNSixJQU5JLENBTUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFGLEVBTk4sQ0FBUDtBQU9ILEdBYlk7QUFjYixFQUFBLE9BQU8sRUFBRSxNQUFNO0FBQ1gsVUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLE9BQWYsQ0FBdUIsUUFBdkIsQ0FBckI7QUFDQSxXQUFPLEtBQUssQ0FBRSxzQ0FBcUMsWUFBYSxFQUFwRCxDQUFMLENBQ04sSUFETSxDQUNELENBQUMsSUFBRSxDQUFDLENBQUMsSUFBRixFQURGLENBQVA7QUFFSCxHQWxCWTtBQW1CYixFQUFBLFVBQVUsRUFBRyxNQUFELElBQVk7QUFDcEIsV0FBTyxLQUFLLENBQUUsK0JBQThCLE1BQU8sRUFBdkMsRUFBMEM7QUFDbkQsTUFBQSxNQUFNLEVBQUU7QUFEMkMsS0FBMUMsQ0FBWjtBQUdILEdBdkJZO0FBd0JiLEVBQUEsUUFBUSxFQUFFLENBQUMsTUFBRCxFQUFTLFNBQVQsS0FBdUI7QUFDN0IsV0FBTyxLQUFLLENBQUUsK0JBQThCLE1BQU8sRUFBdkMsRUFBMEM7QUFDbEQsTUFBQSxNQUFNLEVBQUUsS0FEMEM7QUFFbEQsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZ5QztBQUtsRCxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFNBQWY7QUFMNEMsS0FBMUMsQ0FBWjtBQU9ILEdBaENZO0FBaUNiLEVBQUEsVUFBVSxFQUFHLE1BQUQsSUFBWTtBQUNwQixXQUFPLEtBQUssQ0FBRSwrQkFBOEIsTUFBTyxFQUF2QyxDQUFMLENBQ04sSUFETSxDQUNELENBQUMsSUFBRSxDQUFDLENBQUMsSUFBRixFQURGLENBQVA7QUFFSCxHQXBDWTtBQXFDYixFQUFBLGNBQWMsRUFBRyxNQUFELElBQVk7QUFDeEIsV0FBTyxLQUFLLENBQUUsK0JBQThCLE1BQU8sRUFBdkMsRUFBMEM7QUFDcEQsTUFBQSxNQUFNLEVBQUUsT0FENEM7QUFFcEQsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFEVCxPQUYyQztBQUtwRCxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlO0FBQUMsUUFBQSxTQUFTLEVBQUU7QUFBWixPQUFmO0FBTDhDLEtBQTFDLENBQVo7QUFPRCxHQTdDVTtBQThDWCxFQUFBLGdCQUFnQixFQUFHLE1BQUQsSUFBWTtBQUM1QixXQUFPLEtBQUssQ0FBRSwrQkFBOEIsTUFBTyxFQUF2QyxFQUEwQztBQUNwRCxNQUFBLE1BQU0sRUFBRSxPQUQ0QztBQUVwRCxNQUFBLE9BQU8sRUFBRTtBQUNQLHdCQUFnQjtBQURULE9BRjJDO0FBS3BELE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWU7QUFBQyxRQUFBLFNBQVMsRUFBRTtBQUFaLE9BQWY7QUFMOEMsS0FBMUMsQ0FBWjtBQU9EO0FBdERVLENBQWpCO2VBeURlLFE7Ozs7Ozs7Ozs7O0FDekRmOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBR0EsTUFBTSxVQUFVLEdBQUc7QUFDZixFQUFBLFVBQVUsRUFBRSxNQUFNO0FBQ2QsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixFQUErQixnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBeUQsTUFBTTtBQUMzRCxVQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxpQkFBaEMsQ0FBSCxFQUFzRDtBQUNsRCxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLFNBQWhDLEdBQTRDLGtCQUFLLFFBQUwsRUFBNUM7QUFDSDtBQUNKLEtBSkQ7QUFNSCxHQVJjO0FBU2YsRUFBQSxPQUFPLEVBQUUsTUFBTTtBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixFQUErQixnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBeUQsTUFBTTtBQUMzRCxVQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxVQUFoQyxDQUFKLEVBQWlEO0FBQzdDLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0MsU0FBaEMsR0FBNEMsa0JBQUssUUFBTCxFQUE1QztBQUNIO0FBQ0osS0FKRDtBQUtILEdBbkJjO0FBb0JmLEVBQUEsUUFBUSxFQUFFLE1BQU07QUFDWixJQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCLEVBQStCLGdCQUEvQixDQUFnRCxPQUFoRCxFQUF5RCxNQUFNO0FBQzNELFVBQUksS0FBSyxDQUFDLE1BQU4sQ0FBYSxTQUFiLENBQXVCLFFBQXZCLENBQWdDLFdBQWhDLENBQUosRUFBa0Q7QUFDOUMsY0FBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUMsS0FBckQ7QUFDQSxjQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsRUFBeUMsS0FBekQ7QUFFQSxjQUFNLFNBQVMsR0FBRyw0QkFBUSxPQUFSLEVBQWlCLE9BQWpCLENBQWxCOztBQUNBLDRCQUFTLE9BQVQsQ0FBaUIsU0FBakIsRUFDSyxJQURMLENBQ1UsTUFBTTtBQUNSO0FBQ0EsVUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxLQUFyQyxHQUE2QyxFQUE3QztBQUNBLFVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDLEtBQXpDLEdBQWlELEVBQWpEO0FBQ0gsU0FMTDtBQU1ILE9BWEQsTUFXTyxJQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxVQUFoQyxDQUFILEVBQStDO0FBQ2xELGNBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixLQUFoQixDQUFzQixHQUF0QixFQUEyQixDQUEzQixDQUFmLENBRGtELENBQ0o7O0FBQzlDLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFaOztBQUNBLFlBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBd0IsYUFBWSxNQUFPLEVBQTNDLEVBQThDLE9BQWpELEVBQXlEO0FBQ3ZELDhCQUFTLGNBQVQsQ0FBd0IsTUFBeEI7O0FBQ0EsVUFBQSxRQUFRLENBQUMsYUFBVCxDQUF3QixhQUFZLE1BQU8sRUFBM0MsRUFBOEMsU0FBOUMsQ0FBd0QsR0FBeEQsQ0FBNEQsZUFBNUQsRUFGdUQsQ0FHekQ7QUFDQyxTQUpELE1BSU87QUFDTCw4QkFBUyxnQkFBVCxDQUEwQixNQUExQjs7QUFDQSxVQUFBLFFBQVEsQ0FBQyxhQUFULENBQXdCLGFBQVksTUFBTyxFQUEzQyxFQUE4QyxTQUE5QyxDQUF3RCxNQUF4RCxDQUErRCxlQUEvRDtBQUNEO0FBQ0o7QUFDSixLQXhCRDtBQXlCSCxHQTlDYztBQStDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFQUFBLE1BQU0sRUFBRSxNQUFNO0FBQ1YsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixFQUErQixnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBeUQsTUFBTTtBQUMzRCxVQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxRQUFoQyxDQUFKLEVBQ0k7QUFDUCxLQUhEO0FBSUgsR0FyRWM7QUFzRWYsRUFBQSxVQUFVLEVBQUUsTUFBTTtBQUNkLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlELE1BQU07QUFDM0QsVUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFNBQWIsQ0FBdUIsUUFBdkIsQ0FBZ0MsaUJBQWhDLENBQUosRUFBd0Q7QUFDcEQsY0FBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBQWdCLEtBQWhCLENBQXNCLEdBQXRCLEVBQTJCLENBQTNCLENBQWpCOztBQUNBLDRCQUFTLFVBQVQsQ0FBb0IsUUFBcEIsRUFDSyxJQURMLENBQ1UsTUFBTTtBQUNSO0FBQ0gsU0FITDtBQUlIO0FBQ0osS0FSRDtBQVNIO0FBaEZjLENBQW5CO2VBbUZlLFU7Ozs7Ozs7Ozs7O0FDMUZmOztBQUNBOzs7O0FBQ0E7QUFFQSxNQUFNLGtCQUFrQixHQUFHLE1BQU07QUFDN0I7QUFDQSxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE1BQXZCLEVBQStCLGdCQUEvQixDQUFnRCxPQUFoRCxFQUF5RCxNQUFNO0FBQzNEO0FBQ0EsUUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFNBQWIsQ0FBdUIsUUFBdkIsQ0FBZ0MsTUFBaEMsQ0FBSixFQUE2QztBQUV6QyxNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBWjtBQUNBLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFLLENBQUMsTUFBTixDQUFhLEVBQWIsQ0FBZ0IsS0FBaEIsQ0FBc0IsR0FBdEIsQ0FBWjs7QUFDQSwwQkFBUyxVQUFULENBQW9CLEtBQUssQ0FBQyxNQUFOLENBQWEsRUFBYixDQUFnQixLQUFoQixDQUFzQixHQUF0QixFQUEyQixDQUEzQixDQUFwQixFQUNLLElBREwsQ0FDVyxVQUFELElBQWdCO0FBQ2xCLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUMsS0FBckMsR0FBNkMsVUFBVSxDQUFDLElBQXhEO0FBQ0EsUUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkIsRUFBeUMsS0FBekMsR0FBaUQsVUFBVSxDQUFDLElBQTVEO0FBRUEsUUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxXQUFyQyxHQUFtRCxXQUFuRDtBQUNBLFFBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsWUFBdkIsRUFBcUMsU0FBckMsQ0FBK0MsR0FBL0MsQ0FBbUQsVUFBbkQ7QUFDQSxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLEVBQXFDLFNBQXJDLENBQStDLE1BQS9DLENBQXNELFdBQXREO0FBQ0EsUUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QixFQUFxQyxFQUFyQyxHQUEyQyxhQUFZLFVBQVUsQ0FBQyxFQUFHLEVBQXJFO0FBQ0gsT0FUTDtBQVVIO0FBQ0osR0FqQkQ7QUFrQkgsQ0FwQkQ7O2VBc0JlLGtCOzs7Ozs7Ozs7OztBQzFCZjs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBO0FBRUEsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNO0FBQzNCLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlELE1BQU07QUFDM0QsUUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFNBQWIsQ0FBdUIsUUFBdkIsQ0FBZ0MsVUFBaEMsQ0FBSixFQUFpRDtBQUM3QztBQUNBLFlBQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFlBQXZCLEVBQXFDLEtBQXREO0FBQ0EsWUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDLEtBQTFEO0FBQ0EsWUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU4sQ0FBYSxFQUFiLENBQWdCLEtBQWhCLENBQXNCLEdBQXRCLEVBQTJCLENBQTNCLENBQWY7QUFFQSxZQUFNLE1BQU0sR0FBRyw0QkFBUSxRQUFSLEVBQWtCLFFBQWxCLENBQWY7O0FBQ0EsMEJBQVMsUUFBVCxDQUFrQixNQUFsQixFQUEwQixNQUExQixFQUFrQyxJQUFsQyxDQUF1QyxNQUFNO0FBQ3pDO0FBQ0E7QUFDQSxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLHFCQUF2QixFQUE4QyxTQUE5QyxHQUEwRCxrQkFBSyxRQUFMLEVBQTFEO0FBQ0gsT0FKRDtBQUtIO0FBQ0osR0FkRDtBQWVILENBaEJEOztlQWlCZSxnQjs7Ozs7Ozs7Ozs7QUN2QmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBLE1BQU0sT0FBTyxHQUFHLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsWUFBdkIsS0FBd0M7QUFDcEQsU0FBTztBQUNILElBQUEsSUFBSSxFQUFFLFNBREg7QUFFSCxJQUFBLElBQUksRUFBRSxTQUZIO0FBR0gsSUFBQSxTQUFTLEVBQUUsWUFIUjtBQUlILElBQUEsTUFBTSxFQUFFLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCO0FBSkwsR0FBUDtBQU1ILENBUEQ7O2VBU2UsTzs7Ozs7Ozs7Ozs7QUNsQmY7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNLEtBQUssR0FBRyxNQUFNO0FBQ2hCLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsR0FBa0QsRUFBbEQ7O0FBQ0Esc0JBQVMsT0FBVCxHQUNDLElBREQsQ0FDTSxLQUFLLElBQUk7QUFDWCxJQUFBLEtBQUssQ0FBQyxPQUFOLENBQWMsVUFBVSxJQUFJO0FBQ3hCLE1BQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsU0FBdEMsSUFBbUQsK0JBQWlCLFVBQWpCLENBQW5EO0FBQ0gsS0FGRDtBQUdILEdBTEQ7QUFNSCxDQVJEOztlQVVlLEs7Ozs7Ozs7Ozs7O0FDZGY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBLE1BQU0sZ0JBQWdCLEdBQUksS0FBRCxJQUFXO0FBQ2hDLFNBQVE7Ozt5QkFHYSxLQUFLLENBQUMsRUFBRzsyQ0FDUyxLQUFLLENBQUMsRUFBRyxxQkFBb0IsSUFBSSxDQUFDLFNBQUwsS0FBbUIsSUFBbkIsR0FBeUIsU0FBekIsR0FBcUMsRUFBRywwQkFBeUIsS0FBSyxDQUFDLElBQUs7OztTQUczSSxLQUFLLENBQUMsSUFBSztzREFDa0MsS0FBSyxDQUFDLEVBQUc7eUNBQ3RCLEtBQUssQ0FBQyxFQUFHOztLQVQ5QztBQVlILENBYkQ7O2VBZWUsZ0I7Ozs7Ozs7Ozs7QUMzQmYsTUFBTSxJQUFJLEdBQUc7QUFDVCxFQUFBLFdBQVcsRUFBRSxNQUFNO0FBQ2YsV0FBUTs7U0FBUjtBQUdILEdBTFE7QUFNVCxFQUFBLFFBQVEsRUFBRSxNQUFNO0FBQ1osV0FBUTs7Ozs7Ozs7O1NBQVI7QUFVSCxHQWpCUTtBQWtCVCxFQUFBLFVBQVUsRUFBRSxNQUFNO0FBQ2QsV0FBUTs7O1NBQVI7QUFJSCxHQXZCUSxDQXdCVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7O0FBakNTLENBQWI7ZUFvQ2UsSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGJ1aWxkQ2hhdCA9IChzaW5nbGVDaGF0T2JqKSA9PiB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhzaW5nbGVDaGF0T2JqLm1lc3NhZ2UpO1xyXG4gICAgLy8gY29uc29sZS5sb2coc2luZ2xlQ2hhdE9iai5pZClcclxuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImZvcm1cIiBpZD1cImNoYXQtZm9ybVwiPlxyXG4gICAgPGgzIGNsYXNzPVwiY2hhdC11c2VyXCI+JHtzaW5nbGVDaGF0T2JqLnVzZXIudXNlcn06PC9oMz5cclxuICAgIDxwIGlkPVwibmV3LW1lc3NhZ2UtaW5wdXRcIj4ke3NpbmdsZUNoYXRPYmoubWVzc2FnZX08L3A+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC1jaGF0XCIgaWQ9XCJlZGl0LWNoYXQtJHtzaW5nbGVDaGF0T2JqLmlkfVwiPkVkaXQ8L2J1dHRvbj5cclxuICAgIDxidXR0b24gY2xhc3M9XCJkZWxldGUtY2hhdFwiIGlkPVwiZGVsZXRlLWNoYXQtJHtzaW5nbGVDaGF0T2JqLmlkfVwiPkRlbGV0ZTwvYnV0dG9uPlxyXG4gPC9kaXY+YFxyXG4gfVxyXG4gZXhwb3J0IGRlZmF1bHQgYnVpbGRDaGF0OyIsImNvbnN0IENoYXRDb2xsZWN0aW9uID0ge1xyXG4gIHNlbmROZXdNZXNzYWdlOiAob2JqZWN0VG9Qb3N0KSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvbWVzc2FnZXNcIiwge1xyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0VG9Qb3N0KVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRBbGxDaGF0czogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg5L21lc3NhZ2VzP19leHBhbmQ9dXNlclwiKVxyXG4gICAgLnRoZW4obWVzc2FnZXMgPT4gbWVzc2FnZXMuanNvbigpKTtcclxuICAgfSxcclxuICBkZWxldGVDaGF0OiAoY2hhdElkKSA9PiB7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9tZXNzYWdlcy8ke2NoYXRJZH1gLCB7XHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgfSlcclxuICB9LFxyXG4gIGdldFNpbmdsZUNoYXQ6IChjaGF0SWQpID0+IHtcclxuICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9tZXNzYWdlcy8ke2NoYXRJZH1gKVxyXG4gICAgLnRoZW4ociA9PiByLmpzb24oKSkgfSxcclxuXHJcbiAgZWRpdENoYXQ6IChjaGF0SWQsIGNoYXRPYmopID0+IHtcclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L21lc3NhZ2VzLyR7Y2hhdElkfWAsIHtcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY2hhdE9iailcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGRlZmF1bHQgQ2hhdENvbGxlY3Rpb247IiwiLy8gQSBDb250YWN0Rm9ybSBjb21wb25lbnQgdGhhdCwgd2hlbiBmaWxsZWQgb3V0IGFuZCBhIHN1Ym1pdCBidXR0b24gaXMgcHJlc3NlZCwgYWRkcyBhIG5ldyBjb250YWN0IHRvIHN0b3JhZ2UuIEl0IHNob3VsZCBpbXBvcnQgdGhlIENvbnRhY3RDb2xsZWN0aW9uIGNvbXBvbmVudC5cclxuaW1wb3J0IENoYXRDb2xsZWN0aW9uIGZyb20gXCIuL0NoYXRDb2xsZWN0aW9uXCI7XHJcbmltcG9ydCBidWlsZENoYXRPYmplY3QgZnJvbSBcIi4vQ2hhdE9ialwiO1xyXG5pbXBvcnQgQ2hhdExpc3QgZnJvbSBcIi4vQ2hhdExpc3RcIjtcclxuLy8gaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuL0NoYXRMaXN0XCI7XHJcblxyXG5jb25zdCBDaGF0Rm9ybSA9IHtcclxuICByZW5kZXJDaGF0Rm9ybTogKCkgPT4ge1xyXG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZm9ybVwiIGlkPVwiZm9ybS1vdXRwdXRcIj5cclxuICAgICAgPGgzPlNlbmQgTmV3IE1lc3NhZ2U8L2gzPlxyXG4gICAgICA8Zm9ybSBhY3Rpb249XCJcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiAgaWQ9XCJuZXctbWVzc2FnZS1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiTmV3IE1lc3NhZ2VcIj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgICAgPGJ1dHRvbiBpZD1cInNlbmQtY2hhdFwiPlNlbmQgTWVzc2FnZTwvYnV0dG9uPlxyXG4gICAgPC9kaXY+YDtcclxuICB9LFxyXG4gIGFjdGl2YXRlU2VuZEJ1dHRvbjogKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLW91dHB1dFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcInNlbmQtY2hhdFwiKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZVZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmV3LW1lc3NhZ2UtaW5wdXRcIikudmFsdWU7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0VG9Qb3N0ID0gYnVpbGRDaGF0T2JqZWN0KG1lc3NhZ2VWYWwpO1xyXG4gICAgICAgIENoYXRDb2xsZWN0aW9uLnNlbmROZXdNZXNzYWdlKG9iamVjdFRvUG9zdCk7XHJcbiAgICAgICAgQ2hhdExpc3QoKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIClcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IENoYXRGb3JtOyIsImltcG9ydCBidWlsZENoYXQgZnJvbSBcIi4vQ2hhdC5qc1wiXHJcbmltcG9ydCBDaGF0Q29sbGVjdGlvbiBmcm9tIFwiLi9DaGF0Q29sbGVjdGlvbi5qc1wiXHJcbmltcG9ydCBDaGF0Rm9ybSBmcm9tIFwiLi9DaGF0Rm9ybS5qc1wiXHJcblxyXG4vLyBBIENvbnRhY3RMaXN0IGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGFsbCBjb250YWN0cy4gSXQgc2hvdWxkIGltcG9ydCB0aGUgQ29udGFjdCBjb21wb25lbnQgYW5kIHRoZSBDb250YWN0Q29sbGVjdGlvbiBjb21wb25lbnQuXHJcblxyXG5cclxuY29uc3QgQ2hhdExpc3QgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXQtb3V0cHV0XCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBsZXQgdXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKTtcclxuICAgIENoYXRDb2xsZWN0aW9uLmdldEFsbENoYXRzKClcclxuICAgIC50aGVuKGNoYXQgPT4ge1xyXG4gICAgICAgIGNoYXQuZm9yRWFjaChzaW5nbGVDaGF0ID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaGF0LW91dHB1dFwiKS5pbm5lckhUTUwgKz0gYnVpbGRDaGF0KHNpbmdsZUNoYXQpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSlcclxufVxyXG5leHBvcnQgZGVmYXVsdCBDaGF0TGlzdDtcclxuIiwiY29uc3QgYnVpbGRDaGF0T2JqZWN0ID0gKG1lc3NhZ2VQYXJhbSkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWVzc2FnZTogbWVzc2FnZVBhcmFtLFxyXG4gICAgICB1c2VySWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgIH07XHJcbiAgfTtcclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRDaGF0T2JqZWN0OyIsImltcG9ydCBDaGF0Q29sbGVjdGlvbiBmcm9tIFwiLi9DaGF0Q29sbGVjdGlvblwiXHJcbmltcG9ydCBDaGF0TGlzdCBmcm9tIFwiLi9DaGF0TGlzdFwiXHJcblxyXG5jb25zdCBhY3RpdmF0ZURlbGV0ZUJ1dHRvbnMgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoYXQtb3V0cHV0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgaWYoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZS1jaGF0XCIpKXtcclxuICAgICAgICAgICAgY29uc3QgaWRUb0RlbGV0ZSA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl07XHJcbiAgICAgICAgICAgIENoYXRDb2xsZWN0aW9uLmRlbGV0ZUNoYXQoaWRUb0RlbGV0ZSlcclxuICAgICAgICAgICAgLnRoZW4oQ2hhdExpc3QpXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWN0aXZhdGVEZWxldGVCdXR0b25zOyIsImltcG9ydCBDaGF0Q29sbGVjdGlvbiBmcm9tIFwiLi9DaGF0Q29sbGVjdGlvblwiO1xyXG5pbXBvcnQgaGFuZGxlRWRpdGVkQ2hhdCBmcm9tIFwiLi9TYXZlRWRpdFwiO1xyXG5cclxuXHJcbmNvbnN0IGFjdGl2YXRlRWRpdEJ1dHRvbiA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hhdC1vdXRwdXRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1jaGF0XCIpKXtcclxuICAgICAgICAgICAgQ2hhdENvbGxlY3Rpb24uZ2V0U2luZ2xlQ2hhdChldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzJdKVxyXG4gICAgICAgICAgICAudGhlbigoc2luZ2xlQ2hhdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctbWVzc2FnZS1pbnB1dFwiKS52YWx1ZSA9IGAke3NpbmdsZUNoYXQubWVzc2FnZX1gO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kLWNoYXRcIikudGV4dENvbnRlbnQgPSBcIkVkaXQgQ2hhdFwiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZW5kLWNoYXRcIikuaWQ9IGBlZGl0LWNoYXQtJHtzaW5nbGVDaGF0LmlkfWA7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVFZGl0ZWRDaGF0KCk7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFjdGl2YXRlRWRpdEJ1dHRvbjsiLCJpbXBvcnQgYnVpbGRDaGF0T2JqZWN0IGZyb20gXCIuL0NoYXRPYmpcIjtcclxuaW1wb3J0IENoYXRDb2xsZWN0aW9uIGZyb20gXCIuL0NoYXRDb2xsZWN0aW9uXCI7XHJcbmltcG9ydCBDaGF0TGlzdCBmcm9tIFwiLi9DaGF0TGlzdFwiO1xyXG5pbXBvcnQgQ2hhdEZvcm0gZnJvbSBcIi4vQ2hhdEZvcm1cIjtcclxuXHJcbmNvbnN0IGhhbmRsZUVkaXRlZENoYXQgPSAoKSA9PiB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtLW91dHB1dFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5pZC5pbmNsdWRlcyhcImVkaXQtY2hhdFwiKSkge1xyXG4gICAgICAvLyBHZXQgdGhlIHVzZXIncyBpbnB1dFxyXG4gICAgICBjb25zdCBtZXNzYWdlVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuZXctbWVzc2FnZS1pbnB1dFwiKS52YWx1ZTtcclxuICAgICAgY29uc3QgY2hhdElkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsyXTtcclxuICAgICAgLy8gVHVybiB0aGUgdXNlcidzIGlucHV0IGludG8gYW4gb2JqZWN0XHJcbiAgICAgIGNvbnN0IG9iamVjdFRvUG9zdCA9IGJ1aWxkQ2hhdE9iamVjdChtZXNzYWdlVmFsKTtcclxuXHJcbiAgICAgIENoYXRDb2xsZWN0aW9uLmVkaXRDaGF0KGNoYXRJZCwgb2JqZWN0VG9Qb3N0KS50aGVuKCgpID0+IHtcclxuICAgICAgICBDaGF0TGlzdCgpO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuaW5uZXJIVE1MID0gQ2hhdEZvcm0uYnVpbGRGb3JtKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlRWRpdGVkQ2hhdDsiLCJpbXBvcnQgQ2hhdExpc3QgZnJvbSBcIi4vQ2hhdExpc3RcIlxyXG5pbXBvcnQgQ2hhdEZvcm0gZnJvbSBcIi4vQ2hhdEZvcm1cIlxyXG5pbXBvcnQgYWN0aXZhdGVEZWxldGVCdXR0b25zIGZyb20gXCIuL0RlbGV0ZUNoYXRcIlxyXG5pbXBvcnQgYWN0aXZhdGVFZGl0QnV0dG9ucyBmcm9tIFwiLi9FZGl0Q2hhdFwiO1xyXG5cclxuLy8gVGhpcyBtb2R1bGUgYnVpbGRzIHRoZSBjaGF0IGxpc3QgdmlldyBvbmNlIGEgdXNlciBoYXMgbG9nZ2VkIGluXHJcbmNvbnN0IGxvYWRQYWdlQWZ0ZXJMb2dpbiA9ICgpID0+IHtcclxuLy9CdWlsZHMgQ2hhdCBGb3JtXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybS1vdXRwdXRcIikuaW5uZXJIVE1MICs9IENoYXRGb3JtLnJlbmRlckNoYXRGb3JtKCk7XHJcbi8vIC8vIEJ1aWxkcyBDaGF0IExpc3RcclxuQ2hhdExpc3QoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9hZFBhZ2VBZnRlckxvZ2luOyIsImNvbnN0IGFwaUZldGNoID0ge1xyXG4gICAgYWRkVXNlcjogKHBhcnNlZFVzZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODkvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJzZWRVc2VyKVxyXG4gICAgICAgIH0pLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhbGxVc2VyczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS91c2Vyc1wiKVxyXG4gICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgdXNlckxvZ2luOiAodXNlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3VzZXJzP3VzZXI9JHt1c2VyfWApXHJcbiAgICAgICAgLnRoZW4ociA9PiByLmpzb24oKSlcclxuXHJcbiAgICAgfVxyXG59XHJcbiBleHBvcnQgZGVmYXVsdCBhcGlGZXRjaDsiLCJpbXBvcnQgcmVnaXN0ZXIgZnJvbSBcIi4vcmVnaXN0ZXJcIlxyXG5pbXBvcnQgaGFuZGxlTG9naW4gZnJvbSBcIi4vbG9naW5cIjtcclxuaW1wb3J0IGhhbmRsZUxvZ291dCBmcm9tIFwiLi9sb2dvdXRcIlxyXG5cclxuY29uc3QgY2xpY2tzID0ge1xyXG4gICAgcmVnOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3Rlci1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgcmVnaXN0ZXIucmVnKClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjcmVhdGUtYnRuXCIpKXtcclxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyLmhhbmRsZVJlZ2lzdGVyKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZmlyc3RMb2c6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLWJ0bm5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaGFuZGxlTG9naW4uZmlyc3RMb2coKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibG9naW5cIikpe1xyXG4gICAgICAgICAgICBoYW5kbGVMb2dpbi5sb2dpbigpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGxvZ291dDogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJsb2dvdXRcIikpe1xyXG4gICAgICAgICAgICBoYW5kbGVMb2dvdXQoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xpY2tzIiwiY29uc3QgYXV0aEZvcm0gPSB7XHJcbiAgICBob21lOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkPVwiaG9tZS1jb250YWluZXJcIj5cclxuICAgICAgICA8aDE+V2VsY29tZSB0byBOdXRTaGVsbCA8aW1nIGNsYXNzPSBcImljb25cIiBzcmM9XCJodHRwczovL3N0YXRpYy50aGVub3VucHJvamVjdC5jb20vcG5nLzE5NTQyNi0yMDAucG5nXCIgYWx0PVwiXCIgPjwvaDE+XHJcbiAgICAgICAgPGRpdiBpZCA9XCJob21lLWJ1dHRvblwiPlxyXG4gICAgICAgIDxkaXYgaWQgPVwibG9naW4tZGl2XCI+PGJ1dHRvbiBpZD1cImxvZ2luLWJ0bm5cIj5Mb2dpbjwvYnV0dG9uPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgaWQgPVwicmVnaXN0ZXJcIj48YnV0dG9uIGlkPVwicmVnaXN0ZXItYnRuXCI+UmVnaXN0ZXI8L2J1dHRvbj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcblxyXG4gICAgfSxcclxuICAgIHJlZ2lzdGVyOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkPVwicmVnaXN0ZXItYXR0ZW1wdFwiPlxyXG4gICAgICAgICAgICA8Zm9ybSBpZD1cInJlZ2lzdGVyLWZvcm1cIj5cclxuICAgICAgICAgICAgPGRpdiBpZD1cImlucHV0LWZpZWxkc1wiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJuYW1lLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwiZW1haWwtcmVnaXN0ZXJcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgdHlwZT1cImVtYWlsXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJuYW1lLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInBhc3N3b3JkLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgIDxidXR0b24gaWQ9XCJjcmVhdGUtYnRuXCIgY2xhc3M9XCJjcmVhdGUtYnRuXCI+Q3JlYXRlIEFjY291bnQ8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgYFxyXG5cclxuICAgIH0sXHJcbiAgICBsb2dpbjogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cImxvZ2luLWF0dGVtcHRcIj5cclxuICAgICAgICA8Zm9ybSBpZD1cImxvZ2luLWZvcm1cIj5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJsb2dpbi1uYW1lXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJsb2dpbi1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImpoLWF0dGVtcHRcIiBjbGFzcz1cImxvZ2luXCI+TG9naW48L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9LFxyXG4gICAgbWFpbjogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGJ1dHRvbiBpZCA9IFwibG9nb3V0QnV0dG9uXCIgY2xhc3M9XCJsb2dvdXRcIj5Mb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGF1dGhGb3JtIiwiaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5pbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vZm9ybXNcIjtcclxuaW1wb3J0IGxvYWRQYWdlQWZ0ZXJMb2dpbiBmcm9tIFwiLi4vQ2hhdC9sb2FkUGFnZUFmdGVyTG9naW5cIjtcclxuaW1wb3J0IGZvcm0gZnJvbSBcIi4uL3Rhc2svdGFza0Zvcm1cIlxyXG5pbXBvcnQgcHJpbnQgZnJvbSBcIi4uL3Rhc2svcHJpbnRUYXNrXCJcclxuaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuLi9ldmVudHMvcHJpbnRBbGxFdmVudHNcIlxyXG5pbXBvcnQgY2xpY2tXaXphcmQgZnJvbSBcIi4uL2V2ZW50cy9jbGlja1wiXHJcblxyXG5cclxuY29uc3QgaGFuZGxlTG9naW4gPSB7XHJcbiAgICBmaXJzdExvZzogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLmxvZ2luKClcclxuICAgIH0sXHJcbiAgICBsb2dpbjogKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVzZXJWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLW5hbWVcIikudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGFzc1ZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tcGFzc1wiKS52YWx1ZTtcclxuICAgICAgICBhcGlGZXRjaC51c2VyTG9naW4odXNlclZhbClcclxuICAgICAgICAgICAgLnRoZW4oKHBhcnNlZFVzZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKHBhc3NWYWwgPT09IHBhcnNlZFVzZXJbMF0ucGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5tYWluKClcclxuICAgICAgICAgICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rhc2tcIikuaW5uZXJIVE1MID0gZm9ybS50YXNrRm9ybSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLmNyZWF0ZVRhc2soKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIHBhcnNlZFVzZXJbMF0uaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZFBhZ2VBZnRlckxvZ2luKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJpbnRBbGxFdmVudHMoKVxyXG4gICAgICAgICAgICAgICAgICAgIHByaW50KClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXcm9uZyBwYXNzd29yZCwgdHJ5IGFnYWluIVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVMb2dpbiIsImltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9mb3Jtc1wiXHJcbi8vIGltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9hdXRoL2Zvcm1zXCI7XHJcbmltcG9ydCBjbGlja3MgZnJvbSBcIi4vY2xpY2tzXCJcclxuY29uc3QgaGFuZGxlTG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShcInVzZXJJZFwiKVxyXG4gICAgY29uc29sZS5sb2coXCJIZWxsb1wiKVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpbnQtdGFza1wiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2poLWhvbWVcIikuaW5uZXJIVE1MID0gYXV0aEZvcm0uaG9tZSgpXHJcbi8vIEF0dGVtcHRpbmcgdG8gbWFrZSBpdCB3aGVyZSBhZnRlciB5b3UgbG9nb3V0IHlvdSBjYW4gbG9nIGJhY2sgaW4gLyB0aG91Z2h0IGltcG9ydGluZyBhbGwgdGhlIGNsaWNrcyB3b3VsZCB3b3JrIGJ1dCBpdCBkb2Vzbid0IGxvb2sgbGlrZSBpdCAuOilcclxuICAgIGNsaWNrcy5yZWcoKVxyXG4gICAgY2xpY2tzLnJlZ2lzdGVyKClcclxuICAgIGNsaWNrcy5maXJzdExvZygpXHJcbiAgICBjbGlja3MubG9nb3V0KClcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtQ29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRDb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpblwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlTG9nb3V0IiwiY29uc3QgdXNlck9iaiA9IChuYW1lUGFyYW0sIGVtYWlsUGFyYW0sIHVzZXJQYXJhbSwgcGFzc1BhcmFtKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgbmFtZTogbmFtZVBhcmFtLFxyXG4gICAgZW1haWw6IGVtYWlsUGFyYW0sXHJcbiAgICB1c2VyOiB1c2VyUGFyYW0sXHJcbiAgICBwYXNzd29yZDogcGFzc1BhcmFtXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1c2VyT2JqIiwiaW1wb3J0IHVzZXJPYmogZnJvbSBcIi4vb2JqZWN0QnVpbGRlclwiXHJcbmltcG9ydCBhcGlGZXRjaCBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGF1dGhGb3JtIGZyb20gXCIuL2Zvcm1zXCJcclxuaW1wb3J0IENoYXRMaXN0IGZyb20gXCIuLi9DaGF0L0NoYXRMaXN0XCI7XHJcbmltcG9ydCBwcmludEFsbEV2ZW50cyBmcm9tIFwiLi4vZXZlbnRzL3ByaW50QWxsRXZlbnRzXCI7XHJcbmltcG9ydCBmb3JtIGZyb20gXCIuLi90YXNrL3Rhc2tGb3JtXCJcclxuXHJcbmNvbnN0IHJlZ2lzdGVyID0ge1xyXG5cclxuICAgIHJlZzogKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNqaC1ob21lXCIpLmlubmVySFRNTCA9IFwiXCJcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJcIikuaW5uZXJIVE1MID0gYXV0aEZvcm0ucmVnaXN0ZXIoKTtcclxuICAgIH0sXHJcblxyXG4gICAgaGFuZGxlUmVnaXN0ZXI6ICgpID0+IHtcclxuICAgIGNvbnN0IG5hbWVWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25hbWUtcmVnaXN0ZXJcIikudmFsdWU7XHJcbiAgICBjb25zdCBlbWFpbFZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW1haWwtcmVnaXN0ZXJcIikudmFsdWU7XHJcbiAgICBjb25zdCB1c2VyVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VybmFtZS1yZWdpc3RlclwiKS52YWx1ZTtcclxuICAgIGNvbnN0IHBhc3NWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Bhc3N3b3JkLXJlZ2lzdGVyXCIpLnZhbHVlO1xyXG5cclxuICAgIGNvbnN0IHVzZXJJbnB1dCA9IHVzZXJPYmoobmFtZVZhbCwgZW1haWxWYWwsIHVzZXJWYWwsIHBhc3NWYWwpXHJcbiAgICBhcGlGZXRjaC5hZGRVc2VyKHVzZXJJbnB1dClcclxuICAgIC50aGVuKChwYXJzZWRVc2VyKSA9PiB7XHJcbiAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcInVzZXJJZFwiLCBwYXJzZWRVc2VyLmlkKVxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcmVnaXN0ZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW5cIikuaW5uZXJIVE1MID0gYXV0aEZvcm0ubWFpbigpXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IGZvcm0udGFza0Zvcm0oKTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLm1haW4oKTtcclxuICAgICAgICBwcmludEFsbEV2ZW50cygpO1xyXG4gICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXIiLCJpbXBvcnQgcHJpbnRBbGxFdmVudHMgZnJvbSBcIi4vcHJpbnRBbGxFdmVudHNcIjtcclxuY29uc3QgZXZlbnRBcGlNYW5hZ2VyID0ge1xyXG4gICAgICAgIGdldEFsbEV2ZW50czogKHVzZXJJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L2V2ZW50cy8/dXNlcklkPSR7dXNlcklkfWApXHJcbiAgICAgICAgICAgIC50aGVuKGV2ZW50cyA9PiBldmVudHMuanNvbigpKVxyXG4gICAgfSwgIHBvc3ROZXdFdmVudDogZXZlbnRPYmplY3QgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS9ldmVudHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudE9iamVjdClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sIGRlbGV0ZUV2ZW50OiAoaWRUb0RlbGV0ZSkgPT4ge1xyXG4gICAgICAgIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvZXZlbnRzLyR7aWRUb0RlbGV0ZX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwcmludEFsbEV2ZW50cygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LCBnZXRTaW5nbGVFdmVudDogKGlkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvZXZlbnRzLyR7aWR9YClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSwgIGVkaXRFdmVudDogKGlkUGFyYW0sIGV2ZW50VG9FZGl0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvZXZlbnRzLyR7aWRQYXJhbX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnRUb0VkaXQpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudEFwaU1hbmFnZXI7IiwiY29uc3QgYnVpbGRTaW5nbGVFdmVudCA9IChzaW5nbGVFdmVudCkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkID0gXCJldmVudENvbnRhaW5lci0ke3NpbmdsZUV2ZW50LmlkfVwiIGNsYXNzID0gXCJhbGxEYUV2ZW50c1wiPlxyXG4gICAgICAgICAgICA8aDI+JHtzaW5nbGVFdmVudC5uYW1lfTwvaDI+XHJcbiAgICAgICAgICAgICAgICA8cD5EYXRlOiAgJHtzaW5nbGVFdmVudC5kYXRlfTwvcD5cclxuICAgICAgICAgICAgICAgIDxwPkxvY2F0aW9uOiAgJHtzaW5nbGVFdmVudC5sb2NhdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0QnV0dG9uXCIgaWQ9IFwiZWRpdEV2ZW50QnV0dG9uLSR7c2luZ2xlRXZlbnQuaWR9XCI+VXBkYXRlPC9idXR0b24+IDxidXR0b24gY2xhc3M9XCJkZWxldGVCdXR0b25cIiBpZD0gXCJkZWxldGVCdXR0b24tJHtzaW5nbGVFdmVudC5pZH1cIj5EZWxldGU8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8aHI+YFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBidWlsZFNpbmdsZUV2ZW50OyIsImltcG9ydCBldmVudEZvcm1CdWlsZGVyIGZyb20gXCIuL2V2ZW50Rm9ybVwiO1xyXG5pbXBvcnQgYnVpbGRFdmVudE9iamVjdCBmcm9tIFwiLi9ldmVudE9iamVjdFwiO1xyXG5pbXBvcnQgZXZlbnRBcGlNYW5hZ2VyIGZyb20gXCIuL2FwaU1hbmFnZXJcIjtcclxuaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuL3ByaW50QWxsRXZlbnRzXCI7XHJcbmltcG9ydCBldmVudEVkaXRGb3JtQnVpbGRlciBmcm9tIFwiLi9lZGl0Rm9ybVwiO1xyXG5jb25zdCBjbGlja1dpemFyZCA9IHtcclxuICAgIGFkZEV2ZW50RnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmlkID09PSBcImFkZEV2ZW50QnV0dG9uXCIpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtQ29udGFpbmVyXCIpLmlubmVySFRNTCA9IGV2ZW50Rm9ybUJ1aWxkZXIuZXZlbnRGb3JtSW5wdXRzKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9LFxyXG4gICAgc2F2ZUV2ZW50RnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmVFdmVudEJ1dHRvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1OYW1lXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1EYXRlXCIpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYXRpb25WYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtTG9jYXRpb25cIikudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdFdmVudE9iamVjdCA9IGJ1aWxkRXZlbnRPYmplY3QobmFtZVZhbHVlLCBkYXRlVmFsdWUsIGxvY2F0aW9uVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLnBvc3ROZXdFdmVudChuZXdFdmVudE9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbihwcmludEFsbEV2ZW50cyk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybU5hbWVcIikudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1EYXRlXCIpLnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtTG9jYXRpb25cIikudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBlZGl0QnV0dG9uRnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImVkaXRCdXR0b25cIikpIHtcclxuICAgICAgICAgICAgICAgIGxldCBldmVudEVkaXRJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07XHJcbiAgICAgICAgICAgICAgICBldmVudEFwaU1hbmFnZXIuZ2V0U2luZ2xlRXZlbnQoZXZlbnRFZGl0SWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHNpbmdsZUV2ZW50SW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRDb250YWluZXItJHtldmVudEVkaXRJZH1gKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNldmVudENvbnRhaW5lci0ke2V2ZW50RWRpdElkfWApLmlubmVySFRNTCA9IGV2ZW50RWRpdEZvcm1CdWlsZGVyKHNpbmdsZUV2ZW50SW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgc2F2ZUVkaXRCdXR0b25GdW5jdGlvbjogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2F2ZUVkaXRlZEV2ZW50XCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNldmVudEVkaXROYW1lLSR7aXRlbUlkfWApLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNldmVudEVkaXREYXRlLSR7aXRlbUlkfWApLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkTG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRFZGl0TG9jYXRpb24tJHtpdGVtSWR9YCkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0ZWRFdmVudE9iamVjdCA9IGJ1aWxkRXZlbnRPYmplY3QoZWRpdGVkTmFtZSwgZWRpdGVkRGF0ZSwgZWRpdGVkTG9jYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLmVkaXRFdmVudChpdGVtSWQsIGVkaXRlZEV2ZW50T2JqZWN0KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHByaW50QWxsRXZlbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlQnV0dG9uRnVuY3Rpb246ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZUJ1dHRvblwiKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50RGVsZXRlSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzFdO1xyXG4gICAgICAgICAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLmRlbGV0ZUV2ZW50KGV2ZW50RGVsZXRlSWQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsaWNrV2l6YXJkOyIsImNvbnN0IGV2ZW50RWRpdEZvcm1CdWlsZGVyID0gKHNpbmdsZUV2ZW50KSA9PiB7XHJcbiAgICByZXR1cm4gYDxmb3JtIGlkID0gXCJldmVudEZvcm1JbnB1dHNcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRFZGl0TmFtZS0ke3NpbmdsZUV2ZW50LmlkfVwiIHBsYWNlaG9sZGVyID0gXCJuYW1lXCIgdmFsdWU9XCIke3NpbmdsZUV2ZW50Lm5hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50RWRpdERhdGUtJHtzaW5nbGVFdmVudC5pZH1cIiBwbGFjZWhvbGRlciA9IFwiZGF0ZVwiIHZhbHVlPVwiJHtzaW5nbGVFdmVudC5kYXRlfVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEVkaXRMb2NhdGlvbi0ke3NpbmdsZUV2ZW50LmlkfVwiIHBsYWNlaG9sZGVyID0gXCJsb2NhdGlvblwiIHZhbHVlPVwiJHtzaW5nbGVFdmVudC5sb2NhdGlvbn1cIj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkID0gXCJzYXZlRWRpdGVkRXZlbnQtJHtzaW5nbGVFdmVudC5pZH1cIiBjbGFzcyA9IFwic2F2ZUVkaXRlZEV2ZW50XCI+U2F2ZSBldmVudDwvYnV0dG9uYFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50RWRpdEZvcm1CdWlsZGVyOyIsImNvbnN0IGV2ZW50Rm9ybUJ1aWxkZXIgPSAge1xyXG4gICAgZXZlbnRGb3JtSW5wdXRzOiAoKSA9PiB7XHJcbiAgICByZXR1cm4gYDxmb3JtIGlkID0gXCJldmVudEZvcm1JbnB1dHNcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRGb3JtTmFtZVwiIHBsYWNlaG9sZGVyID0gXCJuYW1lXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50Rm9ybURhdGVcIiBwbGFjZWhvbGRlciA9IFwiZGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEZvcm1Mb2NhdGlvblwiIHBsYWNlaG9sZGVyID0gXCJsb2NhdGlvblwiPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQgPSBcInNhdmVOZXdFdmVudFwiIGNsYXNzID0gXCJzYXZlRXZlbnRCdXR0b25cIj5TYXZlIGV2ZW50PC9idXR0b25gXHJcbn0sXHJcblxyXG4gICBldmVudEJ1dHRvbjogYDxocj48YnV0dG9uIGlkPVwiYWRkRXZlbnRCdXR0b25cIj5BZGQgYW4gRXZlbnQhPC9idXR0b24+YFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudEZvcm1CdWlsZGVyOyIsImNvbnN0IGJ1aWxkRXZlbnRPYmplY3QgPSAobmFtZVBhcmFtLCBkYXRlUGFyYW0sIGxvY2F0aW9uUGFyYW0pID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogbmFtZVBhcmFtLFxyXG4gICAgICAgIGRhdGU6IGRhdGVQYXJhbSxcclxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25QYXJhbSxcclxuICAgICAgICB1c2VySWQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEV2ZW50T2JqZWN0IiwiaW1wb3J0IGV2ZW50QXBpTWFuYWdlciBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGJ1aWxkU2luZ2xlRXZlbnQgZnJvbSBcIi4vYnVpbGRTaW5nbGVFdmVudFwiXHJcbmltcG9ydCBldmVudEZvcm1CdWlsZGVyIGZyb20gXCIuL2V2ZW50Rm9ybVwiO1xyXG5jb25zdCBwcmludEFsbEV2ZW50cyA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHVzZXJJZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIilcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1Db250YWluZXJcIikuaW5uZXJIVE1MID0gZXZlbnRGb3JtQnVpbGRlci5ldmVudEJ1dHRvbjtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRDb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGV2ZW50QXBpTWFuYWdlci5nZXRBbGxFdmVudHModXNlcklkKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5mb3JFYWNoKHNpbmdsZUV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRDb250YWluZXJcIikuaW5uZXJIVE1MICs9IGJ1aWxkU2luZ2xlRXZlbnQoc2luZ2xlRXZlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfTtcclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRBbGxFdmVudHM7XHJcbiIsIlxyXG5pbXBvcnQgQ2hhdEZvcm0gZnJvbSBcIi4vQ2hhdC9DaGF0Rm9ybS5qc1wiO1xyXG5pbXBvcnQgbG9hZFBhZ2VBZnRlckxvZ2luIGZyb20gXCIuL0NoYXQvbG9hZFBhZ2VBZnRlckxvZ2luLmpzXCI7XHJcbmltcG9ydCBhdXRoRm9ybSBmcm9tIFwiLi9hdXRoL2Zvcm1zXCI7XHJcbmltcG9ydCBjbGlja3MgZnJvbSBcIi4vYXV0aC9jbGlja3NcIlxyXG5pbXBvcnQgYWN0aXZhdGVFZGl0QnV0dG9uIGZyb20gXCIuL3Rhc2svZWRpdFwiXHJcbmltcG9ydCBoYW5kbGVFZGl0VGFzayBmcm9tIFwiLi90YXNrL2hhbmRsZUVkaXRcIlxyXG5pbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXV0aC9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGhhbmRsZUxvZ2luIGZyb20gXCIuL2F1dGgvbG9naW5cIlxyXG5pbXBvcnQgZXZlbnRBcGlNYW5hZ2VyIGZyb20gXCIuL2V2ZW50cy9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGNsaWNrV2l6YXJkIGZyb20gXCIuL2V2ZW50cy9jbGlja1wiXHJcbi8vIGltcG9ydCBoYW5kbGVMb2dpbiBmcm9tIFwiLi9hdXRoL2xvZ2luXCJcclxuLy8gdGFzayBpbXBvcnRzXHJcbi8vIGltcG9ydCBmb3JtIGZyb20gXCIuL3Rhc2svdGFza0Zvcm1cIlxyXG5pbXBvcnQgdGFza0NsaWNrcyBmcm9tIFwiLi90YXNrL2NsaWNrc1wiXHJcbmltcG9ydCBhY3RpdmF0ZURlbGV0ZUJ1dHRvbnMgZnJvbSBcIi4vY2hhdC9EZWxldGVDaGF0XCJcclxuaW1wb3J0IGFjdGl2YXRlRWRpdEJ1dHRvbnMgZnJvbSBcIi4vY2hhdC9FZGl0Q2hhdFwiXHJcbmltcG9ydCBoYW5kbGVFZGl0ZWRDaGF0IGZyb20gXCIuL2NoYXQvU2F2ZUVkaXRcIlxyXG5cclxuXHJcbi8vIGFwaUZldGNoKCk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjamgtaG9tZVwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5ob21lKCk7XHJcbmNsaWNrcy5yZWcoKVxyXG5jbGlja3MucmVnaXN0ZXIoKVxyXG5jbGlja3MuZmlyc3RMb2coKVxyXG5jbGlja3MubG9naW4oKVxyXG5jbGlja3MubG9nb3V0KClcclxuQ2hhdEZvcm0uYWN0aXZhdGVTZW5kQnV0dG9uKCk7XHJcbi8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLm5ld1Rhc2tGb3JtKClcclxudGFza0NsaWNrcy5jcmVhdGVUYXNrKCk7XHJcbnRhc2tDbGlja3MubmV3VGFzaygpXHJcbnRhc2tDbGlja3Muc2F2ZVRhc2soKVxyXG50YXNrQ2xpY2tzLmRlbGV0ZVRhc2soKVxyXG5hY3RpdmF0ZUVkaXRCdXR0b24oKVxyXG5oYW5kbGVFZGl0VGFzaygpXHJcbmNsaWNrV2l6YXJkLmFkZEV2ZW50RnVuY3Rpb24oKVxyXG5jbGlja1dpemFyZC5zYXZlRXZlbnRGdW5jdGlvbigpXHJcbmNsaWNrV2l6YXJkLmVkaXRCdXR0b25GdW5jdGlvbigpXHJcbmNsaWNrV2l6YXJkLnNhdmVFZGl0QnV0dG9uRnVuY3Rpb24oKVxyXG5jbGlja1dpemFyZC5kZWxldGVCdXR0b25GdW5jdGlvbigpXHJcbmFjdGl2YXRlRGVsZXRlQnV0dG9ucygpO1xyXG4vLyBBY3RpdmF0ZSBFZGl0IEJ1dHRvbnNcclxuYWN0aXZhdGVFZGl0QnV0dG9ucygpO1xyXG5oYW5kbGVFZGl0ZWRDaGF0KCk7XHJcbiIsImNvbnN0IGFwaUZldGNoID0ge1xyXG4gICAgc2luZ2xlVGFzazogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS90YXNrc1wiKVxyXG4gICAgICAgICAgICAudGhlbihyID0+IHIuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGFkZHRhc2s6ICh0YXNrcykgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS90YXNrc1wiLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRhc2tzKVxyXG4gICAgICAgIH0pLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhbGxUYXNrOiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlVXNlcklkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKTtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OS90YXNrcz91c2VySWQ9JHthY3RpdmVVc2VySWR9YClcclxuICAgICAgICAudGhlbihyPT5yLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBkZWxldGVUYXNrOiAodGFza0lkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvdGFza3MvJHt0YXNrSWR9YCwge1xyXG4gICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZWRpdFRhc2s6ICh0YXNrSWQsIHVzZXJJbnB1dCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3Rhc2tzLyR7dGFza0lkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh1c2VySW5wdXQpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBlZGl0U2luZ2xlOiAodGFza0lkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODkvdGFza3MvJHt0YXNrSWR9YClcclxuICAgICAgICAudGhlbihyPT5yLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBtYXJrQXNDb21wbGV0ZTogKHRhc2tJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3Rhc2tzLyR7dGFza0lkfWAsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtjb21wbGV0ZWQ6IFwidHJ1ZVwifSlcclxuICAgICAgICB9KTtcclxuICAgICAgfSxcclxuICAgICAgbWFya0FzSW5jb21wbGV0ZTogKHRhc2tJZCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg5L3Rhc2tzLyR7dGFza0lkfWAsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtjb21wbGV0ZWQ6IFwiZmFsc2VcIn0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBpRmV0Y2giLCJpbXBvcnQgZm9ybSBmcm9tIFwiLi90YXNrRm9ybVwiXHJcbmltcG9ydCBwcmludCBmcm9tIFwiLi9wcmludFRhc2tcIlxyXG5pbXBvcnQgaGFuZGxlTG9nb3V0IGZyb20gXCIuLi9hdXRoL2xvZ291dFwiXHJcbmltcG9ydCB0YXNrT2JqIGZyb20gXCIuL29iamVjdEJ1aWxkZXJcIlxyXG5pbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcblxyXG5cclxuY29uc3QgdGFza0NsaWNrcyA9IHtcclxuICAgIGNyZWF0ZVRhc2s6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY3JlYXRlLW5ldy10YXNrXCIpKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLnRhc2tGb3JtKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfSxcclxuICAgIG5ld1Rhc2s6ICgpID0+IHtcclxuICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFza1wiKS5pbm5lckhUTUwgPSBmb3JtLnRhc2tGb3JtKClcclxuICAgICAgICAvLyAgICAgcHJpbnQoKVxyXG4gICAgICAgIC8vIH0pXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJuZXctdGFza1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrXCIpLmlubmVySFRNTCA9IGZvcm0udGFza0Zvcm0oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBzYXZlVGFzazogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2F2ZS10YXNrXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXNrVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLXRhc2tcIikudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRhc2tPYmoodGFza1ZhbCwgZGF0ZVZhbClcclxuICAgICAgICAgICAgICAgIGFwaUZldGNoLmFkZHRhc2sodXNlcklucHV0KVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tdGFza1wiKS52YWx1ZSA9IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlID0gXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2hlY2tib3hcIikpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFza0lkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsxXTsgLy8gMTRcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tJZClcclxuICAgICAgICAgICAgICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjaGVja2JveC0ke3Rhc2tJZH1gKS5jaGVja2VkKXtcclxuICAgICAgICAgICAgICAgICAgYXBpRmV0Y2gubWFya0FzQ29tcGxldGUodGFza0lkKVxyXG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcG9zc2libHktJHt0YXNrSWR9YCkuY2xhc3NMaXN0LmFkZChcImNoZWNrZWQtY2xhc3NcIilcclxuICAgICAgICAgICAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1wcmludFwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBhcGlGZXRjaC5tYXJrQXNJbmNvbXBsZXRlKHRhc2tJZClcclxuICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Bvc3NpYmx5LSR7dGFza0lkfWApLmNsYXNzTGlzdC5yZW1vdmUoXCJjaGVja2VkLWNsYXNzXCIpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8vIHNhdmVUYXNrOiAoKSA9PiB7XHJcbiAgICAvLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIC8vICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzYXZlLXRhc2tcIikpIHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHRhc2tWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tdGFza1wiKS52YWx1ZTtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IGRhdGVWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXBsZXRlLWRhdGVcIikudmFsdWU7XHJcblxyXG4gICAgLy8gICAgICAgICAgICAgY29uc3QgdXNlcklucHV0ID0gdGFza09iaih0YXNrVmFsLCBkYXRlVmFsKVxyXG4gICAgLy8gICAgICAgICAgICAgYXBpRmV0Y2guYWRkdGFzayh1c2VySW5wdXQpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBwcmludCgpXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi10YXNrXCIpLnZhbHVlID0gXCJcIlxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbXBsZXRlLWRhdGVcIikudmFsdWUgPSBcIlwiXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgfSlcclxuXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KVxyXG4gICAgLy8gfSxcclxuICAgIGxvZ291dDogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibG9nb3V0XCIpKVxyXG4gICAgICAgICAgICAgICAgaGFuZGxlTG9nb3V0KClcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZVRhc2s6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRhc2stZGVsZXRlLWJ0blwiKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVsZXRlSWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItXCIpWzJdO1xyXG4gICAgICAgICAgICAgICAgYXBpRmV0Y2guZGVsZXRlVGFzayhkZWxldGVJZClcclxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KClcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFza0NsaWNrcyIsImltcG9ydCBhcGlGZXRjaCBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGhhbmRsZUVkaXRUYXNrIGZyb20gXCIuL2hhbmRsZUVkaXRcIlxyXG4vLyBmaXJzdCBlZGl0IGNsaWNrXHJcblxyXG5jb25zdCBhY3RpdmF0ZUVkaXRCdXR0b24gPSAoKSA9PiB7XHJcbiAgICAvLyBkZWJ1Z2dlcjtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0XCIpKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIikpXHJcbiAgICAgICAgICAgIGFwaUZldGNoLmVkaXRTaW5nbGUoZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsyXSlcclxuICAgICAgICAgICAgICAgIC50aGVuKChzaW5nbGVUYXNrKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLXRhc2tcIikudmFsdWUgPSBzaW5nbGVUYXNrLnRhc2s7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlID0gc2luZ2xlVGFzay5kYXRlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NhdmUtdGFza1wiKS50ZXh0Q29udGVudCA9IFwiRWRpdCBUYXNrXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLXRhc2tcIikuY2xhc3NMaXN0LmFkZChcIm5ld0NsYXNzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlLXRhc2tcIikuY2xhc3NMaXN0LnJlbW92ZShcInNhdmUtdGFza1wiKVxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2F2ZS10YXNrXCIpLmlkID0gYGVkaXQtdGFzay0ke3NpbmdsZVRhc2suaWR9YFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhY3RpdmF0ZUVkaXRCdXR0b247IiwiaW1wb3J0IHRhc2tPYmogZnJvbSBcIi4vb2JqZWN0QnVpbGRlclwiO1xyXG5pbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXBpTWFuYWdlclwiO1xyXG5pbXBvcnQgZm9ybSBmcm9tIFwiLi90YXNrRm9ybVwiO1xyXG5pbXBvcnQgcHJpbnQgZnJvbSBcIi4vcHJpbnRUYXNrXCJcclxuLy8gYWZ0ZXIgZWRpdGluZyB0YXNrXHJcblxyXG5jb25zdCBoYW5kbGVFZGl0ZWRUYXNrID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm5ld0NsYXNzXCIpKSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBjb25zdCB0YXNrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi10YXNrXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb21wbGV0ZS1kYXRlXCIpLnZhbHVlXHJcbiAgICAgICAgICAgIGNvbnN0IHRhc2tJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMl07XHJcblxyXG4gICAgICAgICAgICBjb25zdCBvYmplY3QgPSB0YXNrT2JqKHRhc2tOYW1lLCB0YXNrRGF0ZSlcclxuICAgICAgICAgICAgYXBpRmV0Y2guZWRpdFRhc2sodGFza0lkLCBvYmplY3QpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICBwcmludCgpXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25ldy10YXNrLWNvbnRhaW5lclwiKS5pbm5lckhUTUwgPSBmb3JtLnRhc2tGb3JtKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGhhbmRsZUVkaXRlZFRhc2siLCIvLyBjb25zdCB0YXNrT2JqID0gKHRhc2tQYXJhbSwgZGF0ZVBhcmFtKSA9PiB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICAgIHRhc2s6IHRhc2tQYXJhbSxcclxuLy8gICAgICAgICBkYXRlOiBkYXRlUGFyYW0sXHJcbi8vICAgICAgICAgdXNlcklkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBkZWZhdWx0IHRhc2tPYmpcclxuY29uc3QgdGFza09iaiA9ICh0YXNrUGFyYW0sIGRhdGVQYXJhbSwgaXNJdENvbXBsZXRlKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhc2s6IHRhc2tQYXJhbSxcclxuICAgICAgICBkYXRlOiBkYXRlUGFyYW0sXHJcbiAgICAgICAgY29tcGxldGVkOiBpc0l0Q29tcGxldGUsXHJcbiAgICAgICAgdXNlcklkOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tPYmoiLCJpbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBwcmludFRhc2tCdWlsZGVyIGZyb20gXCIuL3ByaW50VGFza0J1aWxkZXJcIlxyXG5pbXBvcnQgZm9ybSBmcm9tIFwiLi90YXNrRm9ybVwiXHJcblxyXG5jb25zdCBwcmludCA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpbnQtdGFza1wiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICBhcGlGZXRjaC5hbGxUYXNrKClcclxuICAgIC50aGVuKHRhc2tzID0+IHtcclxuICAgICAgICB0YXNrcy5mb3JFYWNoKHNpbmdsZVRhc2sgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaW50LXRhc2tcIikuaW5uZXJIVE1MICs9IHByaW50VGFza0J1aWxkZXIoc2luZ2xlVGFzaylcclxuICAgICAgICB9KVxyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnQiLCIvLyBjb25zdCBwcmludFRhc2tCdWlsZGVyID0gKHRhc2tzKSA9PiB7XHJcbi8vICAgICByZXR1cm4gYFxyXG4vLyAgICAgPGRpdiBjbGFzcz1cInByaW50LXRhc2tcIiBpZD1cInRhc2stcHJpbnRcIj5cclxuLy8gICAgIDxoMT4ke3Rhc2tzLnRhc2t9PC9oMT5cclxuLy8gICAgIDxwPiR7dGFza3MuZGF0ZX08L3A+XHJcbi8vICAgICA8YnV0dG9uIGNsYXNzPVwidGFzay1kZWxldGUtYnRuXCIgaWQ9XCJ0YXNrLWRlbGV0ZS0ke3Rhc2tzLmlkfVwiPkRlbGV0ZTwvYnV0dG9uPlxyXG4vLyAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXRcIiBpZD1cInRhc2stZWRpdC0ke3Rhc2tzLmlkfVwiPkVkaXQ8L2J1dHRvbj5cclxuLy8gICAgIDwvZGl2PlxyXG4vLyAgICAgYFxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZGVmYXVsdCBwcmludFRhc2tCdWlsZGVyXHJcbmNvbnN0IHByaW50VGFza0J1aWxkZXIgPSAodGFza3MpID0+IHtcclxuICAgIHJldHVybiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwicHJpbnQtdGFza1wiIGlkPVwidGFzay1wcmludFwiPlxyXG4gICAgPGxhYmVsIGNsYXNzID1cImNoZWNrYm94XCI+XHJcbiAgICA8ZGl2IGlkPSBcInBvc3NpYmx5LSR7dGFza3MuaWR9XCI+XHJcbiAgICA8aW5wdXQgY2xhc3M9XCJjaGVja2JveFwiIGlkPVwiY2hlY2tib3gtJHt0YXNrcy5pZH1cIiB0eXBlPVwiY2hlY2tib3hcIiAke3Rhc2suY29tcGxldGVkID09PSB0cnVlPyBcImNoZWNrZWRcIiA6IFwiXCJ9PGgxIGNsYXNzID0gXCJjaGVjay1oMVwiPiR7dGFza3MudGFza308L2gxPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8L2xhYmVsPlxyXG4gICAgPHA+JHt0YXNrcy5kYXRlfTwvcD5cclxuICAgIDxidXR0b24gY2xhc3M9XCJ0YXNrLWRlbGV0ZS1idG5cIiBpZD1cInRhc2stZGVsZXRlLSR7dGFza3MuaWR9XCI+RGVsZXRlPC9idXR0b24+XHJcbiAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdFwiIGlkPVwidGFzay1lZGl0LSR7dGFza3MuaWR9XCI+RWRpdDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+ICBcclxuICAgIGBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRUYXNrQnVpbGRlciIsImNvbnN0IGZvcm0gPSB7XHJcbiAgICBuZXdUYXNrRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cIm5ldy10YXNrXCIgY2xhc3MgPVwibmV3LXRhc2tcIj5OZXcgVGFzazwvYnV0dG9uPlxyXG4gICAgICAgIGBcclxuICAgIH0sXHJcbiAgICB0YXNrRm9ybTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cIm5ldy10YXNrLWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImxvZ291dFwiIGNsYXNzPVwibG9nb3V0XCI+TG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgPGZvcm0gaWQ9XCJ0YXNrXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cIm1haW4tdGFza1wiIHBsYWNlaG9sZGVyPVwiRW50ZXIgVGFza1wiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cImNvbXBsZXRlLWRhdGVcIiBwbGFjZWhvbGRlcj1cIkNvbXBsZXRlIERhdGVcIiB0eXBlPVwiZGF0ZVwiPlxyXG4gICAgICAgIDwvZm9ybT5cclxuICAgICAgICA8YnV0dG9uIGlkPVwic2F2ZS10YXNrXCIgY2xhc3M9XCJzYXZlLXRhc2tcIj5TYXZlIFRhc2s8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9LFxyXG4gICAgY3JlYXRlVGFzazogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImNyZWF0ZS1uZXctdGFza1wiIGNsYXNzID0gXCJjcmVhdGUtbmV3LXRhc2tcIj5DcmVhdGUgVGFzazwvYnV0dG9uPlxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImxvZ291dFwiIGNsYXNzPVwibG9nb3V0XCI+TG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG4gICAgLy8gZWRpdEZvcm06ICgpID0+IHtcclxuICAgIC8vICAgICByZXR1cm4gYFxyXG4gICAgLy8gICAgIDxmb3JtIGlkPVwidGFza1wiPlxyXG4gICAgLy8gICAgICAgICA8aW5wdXQgaWQ9XCJtYWluLXRhc2tcIiBwbGFjZWhvbGRlcj1cIkVudGVyIFRhc2tcIiB0eXBlPVwidGV4dFwiIHZhbHVlID0gYGA+XHJcbiAgICAvLyAgICAgICAgIDxpbnB1dCBpZD1cImNvbXBsZXRlLWRhdGVcIiBwbGFjZWhvbGRlcj1cIkNvbXBsZXRlIERhdGVcIiB0eXBlPVwiZGF0ZVwiPlxyXG4gICAgLy8gICAgIDwvZm9ybT5cclxuICAgIC8vICAgICA8YnV0dG9uIGlkPVwic2F2ZS10YXNrXCIgY2xhc3M9XCJzYXZlLXRhc2tcIj5TYXZlIFRhc2s8L2J1dHRvbj5cclxuICAgIC8vICAgICBgXHJcblxyXG4gICAgLy8gfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtIl19
