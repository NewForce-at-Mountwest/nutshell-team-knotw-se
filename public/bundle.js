(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const eventApiManager = {
  getAllEvents: () => {
    return fetch("http://localhost:8088/events/").then(events => events.json());
  },
  postNewEvent: eventObject => {
    return fetch("http://localhost:8088/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventObject)
    });
  }
};
var _default = eventApiManager;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildSingleEvent = singleEvent => {
  return `
        <div id ="eventContainer-${singleEvent.id}">
            <h2>Name:  ${singleEvent.name}</h2>
            <ul>
                <li>Date:  ${singleEvent.date}</li>
                <li>Location:  ${singleEvent.location}</li>
                <br>
            </ul>
            <button class="editButton" id= "editEventButton-${singleEvent.id}">Update</button> <button class="deleteButton" id= "deleteButton-${singleEvent.id}">Delete</button>
        </div>
        <hr>`;
};

var _default = buildSingleEvent;
exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

var _eventForm = _interopRequireDefault(require("./eventForm"));

var _eventObject = _interopRequireDefault(require("./eventObject"));

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _printAllEvents = _interopRequireDefault(require("./printAllEvents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.querySelector("#addEventButton").addEventListener("click", () => {
  console.log("you clicked the button!");
  document.querySelector("#eventFormContainer").innerHTML = (0, _eventForm.default)();
});
document.querySelector("body").addEventListener("click", () => {
  if (event.target.classList.contains("saveEventButton")) {
    const nameValue = document.querySelector("#eventFormName").value;
    const dateValue = document.querySelector("#eventFormDate").value;
    const locationValue = document.querySelector("#eventFormLocation").value;
    const newEventObject = (0, _eventObject.default)(nameValue, dateValue, locationValue);

    _apiManager.default.postNewEvent(newEventObject).then(_printAllEvents.default);
  }
});

},{"./apiManager":1,"./eventForm":4,"./eventObject":5,"./printAllEvents":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const eventFormBuilder = () => {
  return `<form id = "eventFormInputs">
                <input id = "eventFormName" placeholder = "name">
                <input id = "eventFormDate" placeholder = "date">
                <input id = "eventFormLocation" placeholder = "location">
            </form>
            <button id = "saveNewEvent" class = "saveEventButton">Save event</button`;
};

var _default = eventFormBuilder;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const buildEventObject = (nameParam, dateParam, locationParam) => {
  return {
    name: nameParam,
    date: dateParam,
    location: locationParam
  };
};

var _default = buildEventObject;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("./apiManager"));

var _buildSingleEvent = _interopRequireDefault(require("./buildSingleEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const printAllEvents = () => {
  document.querySelector("#eventContainer").innerHTML = "";

  _apiManager.default.getAllEvents().then(response => {
    response.forEach(singleEvent => {
      document.querySelector("#eventContainer").innerHTML += (0, _buildSingleEvent.default)(singleEvent);
    });
  });
};

var _default = printAllEvents;
exports.default = _default;

},{"./apiManager":1,"./buildSingleEvent":2}],7:[function(require,module,exports){
"use strict";

var _apiManager = _interopRequireDefault(require("./events/apiManager"));

var _printAllEvents = _interopRequireDefault(require("./events/printAllEvents"));

var _click = _interopRequireDefault(require("./events/click"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_apiManager.default.getAllEvents();

(0, _printAllEvents.default)();

},{"./events/apiManager":1,"./events/click":3,"./events/printAllEvents":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvYnVpbGRTaW5nbGVFdmVudC5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2NsaWNrLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRGb3JtLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZXZlbnRPYmplY3QuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9wcmludEFsbEV2ZW50cy5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBLE1BQU0sZUFBZSxHQUFHO0FBQ3BCLEVBQUEsWUFBWSxFQUFFLE1BQU07QUFDZCxXQUFPLEtBQUssQ0FBQywrQkFBRCxDQUFMLENBQ0osSUFESSxDQUNDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBUCxFQURYLENBQVA7QUFFRyxHQUpXO0FBS2hCLEVBQUEsWUFBWSxFQUFFLFdBQVcsSUFBSTtBQUMxQixXQUFPLEtBQUssQ0FBQyw4QkFBRCxFQUFpQztBQUN4QyxNQUFBLE1BQU0sRUFBRSxNQURnQztBQUV4QyxNQUFBLE9BQU8sRUFDUDtBQUNJLHdCQUFnQjtBQURwQixPQUh3QztBQU14QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLFdBQWY7QUFOa0MsS0FBakMsQ0FBWjtBQVNOO0FBZm1CLENBQXhCO2VBbUJlLGU7Ozs7Ozs7Ozs7O0FDbkJmLE1BQU0sZ0JBQWdCLEdBQUksV0FBRCxJQUFpQjtBQUN0QyxTQUFRO21DQUN1QixXQUFXLENBQUMsRUFBRzt5QkFDekIsV0FBVyxDQUFDLElBQUs7OzZCQUViLFdBQVcsQ0FBQyxJQUFLO2lDQUNiLFdBQVcsQ0FBQyxRQUFTOzs7OERBR1EsV0FBVyxDQUFDLEVBQUcsb0VBQW1FLFdBQVcsQ0FBQyxFQUFHOzthQVIzSjtBQVdILENBWkQ7O2VBYWUsZ0I7Ozs7OztBQ2JmOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0EsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLGdCQUExQyxDQUEyRCxPQUEzRCxFQUFvRSxNQUFNO0FBQ3RFLEVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSx5QkFBWjtBQUNBLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIscUJBQXZCLEVBQThDLFNBQTlDLEdBQ0kseUJBREo7QUFHSCxDQUxEO0FBTUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsRUFBK0IsZ0JBQS9CLENBQWdELE9BQWhELEVBQXlELE1BQU07QUFDM0QsTUFBSSxLQUFLLENBQUMsTUFBTixDQUFhLFNBQWIsQ0FBdUIsUUFBdkIsQ0FBZ0MsaUJBQWhDLENBQUosRUFBd0Q7QUFDcEQsVUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDLEtBQTNEO0FBQ0EsVUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZ0JBQXZCLEVBQXlDLEtBQTNEO0FBQ0EsVUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsb0JBQXZCLEVBQTZDLEtBQW5FO0FBQ0EsVUFBTSxjQUFjLEdBQUcsMEJBQWlCLFNBQWpCLEVBQTRCLFNBQTVCLEVBQXVDLGFBQXZDLENBQXZCOztBQUNBLHdCQUFnQixZQUFoQixDQUE2QixjQUE3QixFQUNDLElBREQsQ0FDTSx1QkFETjtBQUVIO0FBQ0osQ0FURDs7Ozs7Ozs7OztBQ1ZBLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTTtBQUMzQixTQUFROzs7OztxRkFBUjtBQU1ILENBUEQ7O2VBUWUsZ0I7Ozs7Ozs7Ozs7O0FDUmYsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLGFBQXZCLEtBQXlDO0FBQzlELFNBQU87QUFDSCxJQUFBLElBQUksRUFBRSxTQURIO0FBRUgsSUFBQSxJQUFJLEVBQUUsU0FGSDtBQUdILElBQUEsUUFBUSxFQUFFO0FBSFAsR0FBUDtBQUtILENBTkQ7O2VBT2UsZ0I7Ozs7Ozs7Ozs7O0FDUGY7O0FBQ0E7Ozs7QUFDRyxNQUFNLGNBQWMsR0FBRyxNQUFNO0FBQ3hCLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLFNBQTFDLEdBQXNELEVBQXREOztBQUNBLHNCQUFnQixZQUFoQixHQUNLLElBREwsQ0FDVyxRQUFELElBQWM7QUFDaEIsSUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixXQUFXLElBQUk7QUFDNUIsTUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsU0FBMUMsSUFBdUQsK0JBQWlCLFdBQWpCLENBQXZEO0FBQ0gsS0FGRDtBQUVHLEdBSlg7QUFNSCxDQVJGOztlQVNnQixjOzs7Ozs7QUNYbkI7O0FBQ0E7O0FBQ0E7Ozs7QUFDQSxvQkFBZ0IsWUFBaEI7O0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJjb25zdCBldmVudEFwaU1hbmFnZXIgPSB7XHJcbiAgICBnZXRBbGxFdmVudHM6ICgpID0+IHtcclxuICAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGV2ZW50cyA9PiBldmVudHMuanNvbigpKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIHBvc3ROZXdFdmVudDogZXZlbnRPYmplY3QgPT4ge1xyXG4gICAgICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIiwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudE9iamVjdClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICB9fVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudEFwaU1hbmFnZXI7IiwiY29uc3QgYnVpbGRTaW5nbGVFdmVudCA9IChzaW5nbGVFdmVudCkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkID1cImV2ZW50Q29udGFpbmVyLSR7c2luZ2xlRXZlbnQuaWR9XCI+XHJcbiAgICAgICAgICAgIDxoMj5OYW1lOiAgJHtzaW5nbGVFdmVudC5uYW1lfTwvaDI+XHJcbiAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgIDxsaT5EYXRlOiAgJHtzaW5nbGVFdmVudC5kYXRlfTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+TG9jYXRpb246ICAke3NpbmdsZUV2ZW50LmxvY2F0aW9ufTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0QnV0dG9uXCIgaWQ9IFwiZWRpdEV2ZW50QnV0dG9uLSR7c2luZ2xlRXZlbnQuaWR9XCI+VXBkYXRlPC9idXR0b24+IDxidXR0b24gY2xhc3M9XCJkZWxldGVCdXR0b25cIiBpZD0gXCJkZWxldGVCdXR0b24tJHtzaW5nbGVFdmVudC5pZH1cIj5EZWxldGU8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8aHI+YFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBidWlsZFNpbmdsZUV2ZW50OyIsImltcG9ydCBldmVudEZvcm1CdWlsZGVyIGZyb20gXCIuL2V2ZW50Rm9ybVwiO1xyXG5pbXBvcnQgYnVpbGRFdmVudE9iamVjdCBmcm9tIFwiLi9ldmVudE9iamVjdFwiO1xyXG5pbXBvcnQgZXZlbnRBcGlNYW5hZ2VyIGZyb20gXCIuL2FwaU1hbmFnZXJcIjtcclxuaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuL3ByaW50QWxsRXZlbnRzXCI7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkRXZlbnRCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwieW91IGNsaWNrZWQgdGhlIGJ1dHRvbiFcIilcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtQ29udGFpbmVyXCIpLmlubmVySFRNTCA9XHJcbiAgICAgICAgZXZlbnRGb3JtQnVpbGRlcigpXHJcblxyXG59KVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzYXZlRXZlbnRCdXR0b25cIikpIHtcclxuICAgICAgICBjb25zdCBuYW1lVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybU5hbWVcIikudmFsdWU7XHJcbiAgICAgICAgY29uc3QgZGF0ZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1EYXRlXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGxvY2F0aW9uVmFsdWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybUxvY2F0aW9uXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IG5ld0V2ZW50T2JqZWN0ID0gYnVpbGRFdmVudE9iamVjdChuYW1lVmFsdWUsIGRhdGVWYWx1ZSwgbG9jYXRpb25WYWx1ZSk7XHJcbiAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLnBvc3ROZXdFdmVudChuZXdFdmVudE9iamVjdClcclxuICAgICAgICAudGhlbihwcmludEFsbEV2ZW50cylcclxuICAgIH1cclxufSk7IiwiY29uc3QgZXZlbnRGb3JtQnVpbGRlciA9ICgpID0+IHtcclxuICAgIHJldHVybiBgPGZvcm0gaWQgPSBcImV2ZW50Rm9ybUlucHV0c1wiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEZvcm1OYW1lXCIgcGxhY2Vob2xkZXIgPSBcIm5hbWVcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRGb3JtRGF0ZVwiIHBsYWNlaG9sZGVyID0gXCJkYXRlXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50Rm9ybUxvY2F0aW9uXCIgcGxhY2Vob2xkZXIgPSBcImxvY2F0aW9uXCI+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZCA9IFwic2F2ZU5ld0V2ZW50XCIgY2xhc3MgPSBcInNhdmVFdmVudEJ1dHRvblwiPlNhdmUgZXZlbnQ8L2J1dHRvbmBcclxufVxyXG5leHBvcnQgZGVmYXVsdCBldmVudEZvcm1CdWlsZGVyOyIsImNvbnN0IGJ1aWxkRXZlbnRPYmplY3QgPSAobmFtZVBhcmFtLCBkYXRlUGFyYW0sIGxvY2F0aW9uUGFyYW0pID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmFtZTogbmFtZVBhcmFtLFxyXG4gICAgICAgIGRhdGU6IGRhdGVQYXJhbSxcclxuICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25QYXJhbSxcclxuICAgICAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBidWlsZEV2ZW50T2JqZWN0IiwiaW1wb3J0IGV2ZW50QXBpTWFuYWdlciBmcm9tIFwiLi9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGJ1aWxkU2luZ2xlRXZlbnQgZnJvbSBcIi4vYnVpbGRTaW5nbGVFdmVudFwiXHJcbiAgIGNvbnN0IHByaW50QWxsRXZlbnRzID0gKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRDb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBldmVudEFwaU1hbmFnZXIuZ2V0QWxsRXZlbnRzKClcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZS5mb3JFYWNoKHNpbmdsZUV2ZW50ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Q29udGFpbmVyXCIpLmlubmVySFRNTCArPSBidWlsZFNpbmdsZUV2ZW50KHNpbmdsZUV2ZW50KVxyXG4gICAgICAgICAgICAgICAgfSl9KVxyXG4gICAgICAgICAgICA7XHJcbiAgICB9O1xyXG4gICAgZXhwb3J0IGRlZmF1bHQgcHJpbnRBbGxFdmVudHM7XHJcbiIsImltcG9ydCBldmVudEFwaU1hbmFnZXIgZnJvbSBcIi4vZXZlbnRzL2FwaU1hbmFnZXJcIlxyXG5pbXBvcnQgcHJpbnRBbGxFdmVudHMgZnJvbSBcIi4vZXZlbnRzL3ByaW50QWxsRXZlbnRzXCJcclxuaW1wb3J0IGNsaWNrV2l6YXJkIGZyb20gXCIuL2V2ZW50cy9jbGlja1wiXHJcbmV2ZW50QXBpTWFuYWdlci5nZXRBbGxFdmVudHMoKVxyXG5wcmludEFsbEV2ZW50cygpXHJcbiJdfQ==
