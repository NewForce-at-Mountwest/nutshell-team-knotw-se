(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const apiFetch = {
  addUser: parsedUser => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parsedUser)
    }).then(r => r.json());
  },
  allUsers: () => {
    return fetch("http://localhost:8088/users").then(r => r.json());
  },
  userLogin: user => {
    return fetch(`http://localhost:8088/users?user=${user}`).then(r => r.json());
  }
};
var _default = apiFetch;
exports.default = _default;

},{}],2:[function(require,module,exports){
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

},{"./login":4,"./logout":5,"./register":7}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _forms = _interopRequireDefault(require("./forms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleLogin = {
  login: () => {
    console.log("hello");
    const userVal = document.querySelector("#login-name").value;
    const passVal = document.querySelector("#login-pass").value;

    _apiManager.default.userLogin(userVal).then(parsedUser => {
      if (passVal === parsedUser[0].password) {
        document.querySelector("#home").innerHTML = "";
        document.querySelector("#home").innerHTML = _forms.default.main();
        sessionStorage.setItem("userId", parsedUser[0].id);
      } else {
        alert("WRONG!");
      }
    });
  },
  firstLog: () => {
    document.querySelector("#home").innerHTML = "";
    document.querySelector("#home").innerHTML = _forms.default.login();
  }
};
var _default = handleLogin;
exports.default = _default;

},{"./apiManager":1,"./forms":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _forms = _interopRequireDefault(require("./forms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleLogout = () => {
  sessionStorage.removeItem("userId");
  document.querySelector("#home").innerHTML = "";
  document.querySelector("#home").innerHTML = _forms.default.home();
};

var _default = handleLogout;
exports.default = _default;

},{"./forms":3}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectBuilder = _interopRequireDefault(require("./objectBuilder"));

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _forms = _interopRequireDefault(require("./forms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const register = {
  reg: () => {
    document.querySelector("#home").innerHTML = "";
    document.querySelector("#register").innerHTML = _forms.default.register();
  },
  handleRegister: () => {
    const nameVal = document.querySelector("#name-register").value;
    const emailVal = document.querySelector("#email-register").value;
    const userVal = document.querySelector("#username-register").value;
    const passVal = document.querySelector("#password-register").value;
    const userInput = (0, _objectBuilder.default)(nameVal, emailVal, userVal, passVal);

    _apiManager.default.addUser(userInput).then(parsedUser => {
      sessionStorage.setItem("userId", parsedUser.id); // document.querySelector("#register").innerHTML = ""
      // document.querySelector("#login").innerHTML = authForm.login();
    });
  }
};
var _default = register;
exports.default = _default;

},{"./apiManager":1,"./forms":3,"./objectBuilder":6}],8:[function(require,module,exports){
"use strict";

var _forms = _interopRequireDefault(require("./auth/forms"));

var _clicks = _interopRequireDefault(require("./auth/clicks"));

var _apiManager = _interopRequireDefault(require("./auth/apiManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import handleLogin from "./auth/login"
document.querySelector("#home").innerHTML = _forms.default.home();

_clicks.default.reg();

_clicks.default.register();

_clicks.default.firstLog();

_clicks.default.login();

_apiManager.default.addUser();

_clicks.default.logout();

},{"./auth/apiManager":1,"./auth/clicks":2,"./auth/forms":3}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2F1dGgvYXBpTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvYXV0aC9jbGlja3MuanMiLCIuLi9zY3JpcHRzL2F1dGgvZm9ybXMuanMiLCIuLi9zY3JpcHRzL2F1dGgvbG9naW4uanMiLCIuLi9zY3JpcHRzL2F1dGgvbG9nb3V0LmpzIiwiLi4vc2NyaXB0cy9hdXRoL29iamVjdEJ1aWxkZXIuanMiLCIuLi9zY3JpcHRzL2F1dGgvcmVnaXN0ZXIuanMiLCIuLi9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUNBQSxNQUFNLFFBQVEsR0FBRztBQUNiLEVBQUEsT0FBTyxFQUFHLFVBQUQsSUFBZ0I7QUFDckIsV0FBTyxLQUFLLENBQUMsNkJBQUQsRUFBZ0M7QUFDeEMsTUFBQSxNQUFNLEVBQUUsTUFEZ0M7QUFFeEMsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUYrQjtBQUt4QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFVBQWY7QUFMa0MsS0FBaEMsQ0FBTCxDQU1KLElBTkksQ0FNQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUYsRUFOTixDQUFQO0FBT0gsR0FUWTtBQVViLEVBQUEsUUFBUSxFQUFFLE1BQU07QUFDWixXQUFPLEtBQUssQ0FBQyw2QkFBRCxDQUFMLENBQ04sSUFETSxDQUNELENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRixFQURKLENBQVA7QUFFSCxHQWJZO0FBY2IsRUFBQSxTQUFTLEVBQUcsSUFBRCxJQUFVO0FBQ2pCLFdBQU8sS0FBSyxDQUFFLG9DQUFtQyxJQUFLLEVBQTFDLENBQUwsQ0FDTixJQURNLENBQ0QsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFGLEVBREosQ0FBUDtBQUdIO0FBbEJZLENBQWpCO2VBc0JlLFE7Ozs7Ozs7Ozs7O0FDdEJmOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxNQUFNLEdBQUc7QUFDWCxFQUFBLEdBQUcsRUFBRSxNQUFNO0FBQ1AsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixlQUF2QixFQUF3QyxnQkFBeEMsQ0FBeUQsT0FBekQsRUFBa0UsTUFBTTtBQUNwRSx3QkFBUyxHQUFUO0FBQ0gsS0FGRDtBQUdILEdBTFU7QUFNWCxFQUFBLFFBQVEsRUFBRSxNQUFNO0FBQ1osSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixFQUErQixnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBeUQsTUFBTTtBQUMzRCxVQUFJLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxZQUFoQyxDQUFKLEVBQWtEO0FBQzlDLDBCQUFTLGNBQVQ7QUFDSDtBQUNKLEtBSkQ7QUFLSCxHQVpVO0FBYVgsRUFBQSxRQUFRLEVBQUUsTUFBTTtBQUNaLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsZ0JBQXRDLENBQXVELE9BQXZELEVBQWdFLE1BQU07QUFDbEUscUJBQVksUUFBWjtBQUNILEtBRkQ7QUFHSCxHQWpCVTtBQWtCWCxFQUFBLEtBQUssRUFBRSxNQUFNO0FBQ1QsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixFQUErQixnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBeUQsTUFBTTtBQUMzRCxVQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxPQUFoQyxDQUFILEVBQTRDO0FBQzVDLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFaOztBQUNBLHVCQUFZLEtBQVo7QUFDQztBQUNKLEtBTEQ7QUFNSCxHQXpCVTtBQTBCWCxFQUFBLE1BQU0sRUFBRSxNQUFNO0FBQ1YsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixFQUErQixnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBeUQsTUFBTTtBQUMzRCxVQUFHLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxRQUFoQyxDQUFILEVBQTZDO0FBQ3pDLFFBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFaO0FBQ0o7QUFDQztBQUVKLEtBTkQ7QUFPSDtBQWxDVSxDQUFmO2VBb0NlLE07Ozs7Ozs7Ozs7QUN4Q2YsTUFBTSxRQUFRLEdBQUc7QUFDYixFQUFBLElBQUksRUFBRSxNQUFNO0FBQ1IsV0FBUTs7Ozs7Ozs7U0FBUjtBQVVILEdBWlk7QUFhYixFQUFBLFFBQVEsRUFBRSxNQUFNO0FBQ1osV0FBUTs7Ozs7Ozs7OztXQUFSO0FBWUgsR0ExQlk7QUEyQmIsRUFBQSxLQUFLLEVBQUUsTUFBTTtBQUNULFdBQVE7Ozs7OztTQUFSO0FBT0gsR0FuQ1k7QUFvQ2IsRUFBQSxJQUFJLEVBQUUsTUFBTTtBQUNSLFdBQVE7O1NBQVI7QUFHSDtBQXhDWSxDQUFqQjtlQTJDZSxROzs7Ozs7Ozs7OztBQzNDZjs7QUFDQTs7OztBQUNBLE1BQU0sV0FBVyxHQUFHO0FBQ2hCLEVBQUEsS0FBSyxFQUFFLE1BQU07QUFDVCxJQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksT0FBWjtBQUVBLFVBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLGFBQXZCLEVBQXNDLEtBQXREO0FBQ0EsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsYUFBdkIsRUFBc0MsS0FBdEQ7O0FBRUEsd0JBQVMsU0FBVCxDQUFtQixPQUFuQixFQUNLLElBREwsQ0FDVyxVQUFELElBQWdCO0FBQ2xCLFVBQUksT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxRQUE5QixFQUF3QztBQUNwQyxRQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLFNBQWhDLEdBQTRDLEVBQTVDO0FBQ0EsUUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixFQUFnQyxTQUFoQyxHQUE0QyxlQUFTLElBQVQsRUFBNUM7QUFDQSxRQUFBLGNBQWMsQ0FBQyxPQUFmLENBQXVCLFFBQXZCLEVBQWlDLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBYyxFQUEvQztBQUNILE9BSkQsTUFJTztBQUNILFFBQUEsS0FBSyxDQUFDLFFBQUQsQ0FBTDtBQUNIO0FBQ0osS0FUTDtBQVVILEdBakJlO0FBa0JoQixFQUFBLFFBQVEsRUFBRSxNQUFNO0FBQ1osSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixFQUFnQyxTQUFoQyxHQUE0QyxFQUE1QztBQUNBLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsT0FBdkIsRUFBZ0MsU0FBaEMsR0FBNEMsZUFBUyxLQUFULEVBQTVDO0FBQ0g7QUFyQmUsQ0FBcEI7ZUF3QmUsVzs7Ozs7Ozs7Ozs7QUMxQmY7Ozs7QUFDQSxNQUFNLFlBQVksR0FBRyxNQUFNO0FBQ3ZCLEVBQUEsY0FBYyxDQUFDLFVBQWYsQ0FBMEIsUUFBMUI7QUFDQSxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLFNBQWhDLEdBQTRDLEVBQTVDO0FBQ0EsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixFQUFnQyxTQUFoQyxHQUE0QyxlQUFTLElBQVQsRUFBNUM7QUFDSCxDQUpEOztlQU1lLFk7Ozs7Ozs7Ozs7O0FDUGYsTUFBTSxPQUFPLEdBQUcsQ0FBQyxTQUFELEVBQVksVUFBWixFQUF3QixTQUF4QixFQUFtQyxTQUFuQyxLQUFpRDtBQUM3RCxTQUFPO0FBQ1AsSUFBQSxJQUFJLEVBQUUsU0FEQztBQUVQLElBQUEsS0FBSyxFQUFFLFVBRkE7QUFHUCxJQUFBLElBQUksRUFBRSxTQUhDO0FBSVAsSUFBQSxRQUFRLEVBQUU7QUFKSCxHQUFQO0FBT0gsQ0FSRDs7ZUFVZSxPOzs7Ozs7Ozs7OztBQ1ZmOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTSxRQUFRLEdBQUc7QUFFYixFQUFBLEdBQUcsRUFBRSxNQUFNO0FBQ1gsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixPQUF2QixFQUFnQyxTQUFoQyxHQUE0QyxFQUE1QztBQUNBLElBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsV0FBdkIsRUFBb0MsU0FBcEMsR0FBZ0QsZUFBUyxRQUFULEVBQWhEO0FBQ0MsR0FMWTtBQU9iLEVBQUEsY0FBYyxFQUFFLE1BQU07QUFDdEIsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDLEtBQXpEO0FBQ0EsVUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLEtBQTNEO0FBQ0EsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLEtBQTdEO0FBQ0EsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLEtBQTdEO0FBRUEsVUFBTSxTQUFTLEdBQUcsNEJBQVEsT0FBUixFQUFpQixRQUFqQixFQUEyQixPQUEzQixFQUFvQyxPQUFwQyxDQUFsQjs7QUFDQSx3QkFBUyxPQUFULENBQWlCLFNBQWpCLEVBQ0MsSUFERCxDQUNPLFVBQUQsSUFBZ0I7QUFDbEIsTUFBQSxjQUFjLENBQUMsT0FBZixDQUF1QixRQUF2QixFQUFpQyxVQUFVLENBQUMsRUFBNUMsRUFEa0IsQ0FFbEI7QUFDQTtBQUNILEtBTEQ7QUFNQztBQXBCWSxDQUFqQjtlQXVCZSxROzs7Ozs7QUMzQmY7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTtBQUdBLFFBQVEsQ0FBQyxhQUFULENBQXVCLE9BQXZCLEVBQWdDLFNBQWhDLEdBQTRDLGVBQVMsSUFBVCxFQUE1Qzs7QUFDQSxnQkFBTyxHQUFQOztBQUNBLGdCQUFPLFFBQVA7O0FBQ0EsZ0JBQU8sUUFBUDs7QUFDQSxnQkFBTyxLQUFQOztBQUNBLG9CQUFTLE9BQVQ7O0FBQ0EsZ0JBQU8sTUFBUCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGFwaUZldGNoID0ge1xyXG4gICAgYWRkVXNlcjogKHBhcnNlZFVzZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvdXNlcnNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXJzZWRVc2VyKVxyXG4gICAgICAgIH0pLnRoZW4ociA9PiByLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhbGxVc2VyczogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC91c2Vyc1wiKVxyXG4gICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgdXNlckxvZ2luOiAodXNlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L3VzZXJzP3VzZXI9JHt1c2VyfWApXHJcbiAgICAgICAgLnRoZW4ociA9PiByLmpzb24oKSlcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcGlGZXRjaCIsImltcG9ydCByZWdpc3RlciBmcm9tIFwiLi9yZWdpc3RlclwiXHJcbmltcG9ydCBoYW5kbGVMb2dpbiBmcm9tIFwiLi9sb2dpblwiO1xyXG5pbXBvcnQgaGFuZGxlTG9nb3V0IGZyb20gXCIuL2xvZ291dFwiXHJcblxyXG5jb25zdCBjbGlja3MgPSB7XHJcbiAgICByZWc6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3JlZ2lzdGVyLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICByZWdpc3Rlci5yZWcoKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcmVnaXN0ZXI6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNyZWF0ZS1idG5cIikpe1xyXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXIuaGFuZGxlUmVnaXN0ZXIoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBmaXJzdExvZzogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tYnRublwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBoYW5kbGVMb2dpbi5maXJzdExvZygpXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBsb2dpbjogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJsb2dpblwiKSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaGVsbG9cIilcclxuICAgICAgICAgICAgaGFuZGxlTG9naW4ubG9naW4oKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBsb2dvdXQ6ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibG9nb3V0XCIpKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWpkYWtcIilcclxuICAgICAgICAgICAgaGFuZGxlTG9nb3V0KClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsaWNrcyIsImNvbnN0IGF1dGhGb3JtID0ge1xyXG4gICAgaG9tZTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cImhvbWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGgxPldlbGNvbWUgdG8gTnV0U2hlbGw8L2gxPlxyXG4gICAgICAgIDxkaXYgaWQgPVwiaG9tZS1idXR0b25cIj5cclxuICAgICAgICA8ZGl2IGlkID1cImxvZ2luLWRpdlwiPjxidXR0b24gaWQ9XCJsb2dpbi1idG5uXCI+TG9naW48L2J1dHRvbj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGlkID1cInJlZ2lzdGVyXCI+PGJ1dHRvbiBpZD1cInJlZ2lzdGVyLWJ0blwiPlJlZ2lzdGVyPC9idXR0b24+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG5cclxuICAgIH0sXHJcbiAgICByZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgPGRpdiBpZD1cInJlZ2lzdGVyXCI+XHJcbiAgICAgICAgICAgIDxmb3JtIGlkPVwicmVnaXN0ZXItZm9ybVwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQ9XCJuYW1lLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICAgICAgPGlucHV0IGlkPVwiZW1haWwtcmVnaXN0ZXJcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgdHlwZT1cImVtYWlsXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInVzZXJuYW1lLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJVc2VybmFtZVwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCBpZD1cInBhc3N3b3JkLXJlZ2lzdGVyXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHR5cGU9XCJwYXNzd29yZFwiPlxyXG4gICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cImNyZWF0ZS1idG5cIiBjbGFzcz1cImNyZWF0ZS1idG5cIj5DcmVhdGUgQWNjb3VudDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICBgXHJcblxyXG4gICAgfSxcclxuICAgIGxvZ2luOiAoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICA8Zm9ybSBpZD1cImxvZ2luLWZvcm1cIj5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJsb2dpbi1uYW1lXCIgcGxhY2Vob2xkZXI9XCJOYW1lXCIgdHlwZT1cInRleHRcIj5cclxuICAgICAgICA8aW5wdXQgaWQ9XCJsb2dpbi1wYXNzXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHR5cGU9XCJ0ZXh0XCI+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImxvZ2luXCIgY2xhc3M9XCJsb2dpblwiPkxvZ2luPC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfSxcclxuICAgIG1haW46ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgIDxidXR0b24gaWQgPSBcImxvZ291dFwiIGNsYXNzPVwibG9nb3V0XCI+TG9nb3V0PC9idXR0b24+XHJcbiAgICAgICAgYFxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhdXRoRm9ybSIsImltcG9ydCBhcGlGZXRjaCBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGF1dGhGb3JtIGZyb20gXCIuL2Zvcm1zXCI7XHJcbmNvbnN0IGhhbmRsZUxvZ2luID0ge1xyXG4gICAgbG9naW46ICgpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpXHJcblxyXG4gICAgICAgIGNvbnN0IHVzZXJWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvZ2luLW5hbWVcIikudmFsdWU7XHJcbiAgICAgICAgY29uc3QgcGFzc1ZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9naW4tcGFzc1wiKS52YWx1ZTtcclxuXHJcbiAgICAgICAgYXBpRmV0Y2gudXNlckxvZ2luKHVzZXJWYWwpXHJcbiAgICAgICAgICAgIC50aGVuKChwYXJzZWRVc2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFzc1ZhbCA9PT0gcGFyc2VkVXNlclswXS5wYXNzd29yZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG9tZVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob21lXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLm1haW4oKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIiwgcGFyc2VkVXNlclswXS5pZClcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXUk9ORyFcIilcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBmaXJzdExvZzogKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaG9tZVwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob21lXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLmxvZ2luKClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlTG9naW4iLCJpbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vZm9ybXNcIlxyXG5jb25zdCBoYW5kbGVMb2dvdXQgPSAoKSA9PiB7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFwidXNlcklkXCIpXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvbWVcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNob21lXCIpLmlubmVySFRNTCA9IGF1dGhGb3JtLmhvbWUoKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVMb2dvdXQiLCJjb25zdCB1c2VyT2JqID0gKG5hbWVQYXJhbSwgZW1haWxQYXJhbSwgdXNlclBhcmFtLCBwYXNzUGFyYW0pID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICBuYW1lOiBuYW1lUGFyYW0sXHJcbiAgICBlbWFpbDogZW1haWxQYXJhbSxcclxuICAgIHVzZXI6IHVzZXJQYXJhbSxcclxuICAgIHBhc3N3b3JkOiBwYXNzUGFyYW1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJPYmoiLCJpbXBvcnQgdXNlck9iaiBmcm9tIFwiLi9vYmplY3RCdWlsZGVyXCJcclxuaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2FwaU1hbmFnZXJcIlxyXG5pbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vZm9ybXNcIlxyXG5cclxuY29uc3QgcmVnaXN0ZXIgPSB7XHJcblxyXG4gICAgcmVnOiAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvbWVcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlclwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5yZWdpc3RlcigpO1xyXG4gICAgfSxcclxuXHJcbiAgICBoYW5kbGVSZWdpc3RlcjogKCkgPT4ge1xyXG4gICAgY29uc3QgbmFtZVZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZS1yZWdpc3RlclwiKS52YWx1ZTtcclxuICAgIGNvbnN0IGVtYWlsVmFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbWFpbC1yZWdpc3RlclwiKS52YWx1ZTtcclxuICAgIGNvbnN0IHVzZXJWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJuYW1lLXJlZ2lzdGVyXCIpLnZhbHVlO1xyXG4gICAgY29uc3QgcGFzc1ZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcGFzc3dvcmQtcmVnaXN0ZXJcIikudmFsdWU7XHJcblxyXG4gICAgY29uc3QgdXNlcklucHV0ID0gdXNlck9iaihuYW1lVmFsLCBlbWFpbFZhbCwgdXNlclZhbCwgcGFzc1ZhbClcclxuICAgIGFwaUZldGNoLmFkZFVzZXIodXNlcklucHV0KVxyXG4gICAgLnRoZW4oKHBhcnNlZFVzZXIpID0+IHtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsIHBhcnNlZFVzZXIuaWQpXHJcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlclwiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dpblwiKS5pbm5lckhUTUwgPSBhdXRoRm9ybS5sb2dpbigpO1xyXG4gICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVnaXN0ZXIiLCJpbXBvcnQgYXV0aEZvcm0gZnJvbSBcIi4vYXV0aC9mb3Jtc1wiO1xyXG5pbXBvcnQgY2xpY2tzIGZyb20gXCIuL2F1dGgvY2xpY2tzXCJcclxuaW1wb3J0IGFwaUZldGNoIGZyb20gXCIuL2F1dGgvYXBpTWFuYWdlclwiXHJcbi8vIGltcG9ydCBoYW5kbGVMb2dpbiBmcm9tIFwiLi9hdXRoL2xvZ2luXCJcclxuXHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hvbWVcIikuaW5uZXJIVE1MID0gYXV0aEZvcm0uaG9tZSgpO1xyXG5jbGlja3MucmVnKClcclxuY2xpY2tzLnJlZ2lzdGVyKClcclxuY2xpY2tzLmZpcnN0TG9nKClcclxuY2xpY2tzLmxvZ2luKClcclxuYXBpRmV0Y2guYWRkVXNlcigpXHJcbmNsaWNrcy5sb2dvdXQoKVxyXG4iXX0=
