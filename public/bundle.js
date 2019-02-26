(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printAllEvents = _interopRequireDefault(require("./printAllEvents"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  },
  deleteEvent: idToDelete => {
    fetch(`http://localhost:8088/events/${idToDelete}`, {
      method: "DELETE"
    }).then(() => {
      (0, _printAllEvents.default)();
    });
  },
  getSingleEvent: id => {
    return fetch(`http://localhost:8088/events/${id}`).then(response => response.json());
  },
  editEvent: (idParam, eventToEdit) => {
    return fetch(`http://localhost:8088/events/${idParam}`, {
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

},{"./printAllEvents":7}],2:[function(require,module,exports){
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

var _editForm = _interopRequireDefault(require("./editForm"));

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
  } else if (event.target.classList.contains("editButton")) {
    let eventEditId = event.target.id.split("-")[1];

    _apiManager.default.getSingleEvent(eventEditId).then(singleEventInfo => {
      document.querySelector(`#eventContainer-${eventEditId}`).innerHTML = "";
      document.querySelector(`#eventContainer-${eventEditId}`).innerHTML = (0, _editForm.default)(singleEventInfo);
    });
  } else if (event.target.classList.contains("saveEditedEvent")) {
    const itemId = event.target.id.split("-")[1];
    const editedName = document.querySelector(`#eventEditName-${itemId}`).value;
    const editedDate = document.querySelector(`#eventEditDate-${itemId}`).value;
    const editedLocation = document.querySelector(`#eventEditLocation-${itemId}`).value;
    const editedEventObject = (0, _eventObject.default)(editedName, editedDate, editedLocation);

    _apiManager.default.editEvent(itemId, editedEventObject).then(_printAllEvents.default);
  } else if (event.target.classList.contains("deleteButton")) {
    let eventDeleteId = event.target.id.split("-")[1];

    _apiManager.default.deleteEvent(eventDeleteId);
  }
});

},{"./apiManager":1,"./editForm":4,"./eventForm":5,"./eventObject":6,"./printAllEvents":7}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{"./apiManager":1,"./buildSingleEvent":2}],8:[function(require,module,exports){
"use strict";

var _apiManager = _interopRequireDefault(require("./events/apiManager"));

var _printAllEvents = _interopRequireDefault(require("./events/printAllEvents"));

var _click = _interopRequireDefault(require("./events/click"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_apiManager.default.getAllEvents();

(0, _printAllEvents.default)();

},{"./events/apiManager":1,"./events/click":3,"./events/printAllEvents":7}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvYnVpbGRTaW5nbGVFdmVudC5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL2NsaWNrLmpzIiwiLi4vc2NyaXB0cy9ldmVudHMvZWRpdEZvcm0uanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudEZvcm0uanMiLCIuLi9zY3JpcHRzL2V2ZW50cy9ldmVudE9iamVjdC5qcyIsIi4uL3NjcmlwdHMvZXZlbnRzL3ByaW50QWxsRXZlbnRzLmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztBQ0FBOzs7O0FBQ0EsTUFBTSxlQUFlLEdBQUc7QUFDaEIsRUFBQSxZQUFZLEVBQUUsTUFBTTtBQUNwQixXQUFPLEtBQUssQ0FBQywrQkFBRCxDQUFMLENBQ0YsSUFERSxDQUNHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBUCxFQURiLENBQVA7QUFFSCxHQUptQjtBQUloQixFQUFBLFlBQVksRUFBRSxXQUFXLElBQUk7QUFDN0IsV0FBTyxLQUFLLENBQUMsOEJBQUQsRUFBaUM7QUFDekMsTUFBQSxNQUFNLEVBQUUsTUFEaUM7QUFFekMsTUFBQSxPQUFPLEVBQ1A7QUFDSSx3QkFBZ0I7QUFEcEIsT0FIeUM7QUFNekMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxXQUFmO0FBTm1DLEtBQWpDLENBQVo7QUFTSCxHQWRtQjtBQWNqQixFQUFBLFdBQVcsRUFBRyxVQUFELElBQWdCO0FBQzVCLElBQUEsS0FBSyxDQUFFLGdDQUErQixVQUFXLEVBQTVDLEVBQStDO0FBQ2hELE1BQUEsTUFBTSxFQUFFO0FBRHdDLEtBQS9DLENBQUwsQ0FHSyxJQUhMLENBR1UsTUFBTTtBQUNSO0FBQ0gsS0FMTDtBQU1ILEdBckJtQjtBQXFCakIsRUFBQSxjQUFjLEVB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QUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLGFBQXZCLEtBQXlDO0FBQzlELFNBQU87QUFDSCxJQUFBLElBQUksRUFBRSxTQURIO0FBRUgsSUFBQSxJQUFJLEVBQUUsU0FGSDtBQUdILElBQUEsUUFBUSxFQUFFO0FBSFAsR0FBUDtBQUtILENBTkQ7O2VBT2UsZ0I7Ozs7Ozs7Ozs7O0FDUGY7O0FBQ0E7Ozs7QUFDRyxNQUFNLGNBQWMsR0FBRyxNQUFNO0FBQ3hCLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsaUJBQXZCLEVBQTBDLFNBQTFDLEdBQXNELEVBQXREOztBQUNBLHNCQUFnQixZQUFoQixHQUNLLElBREwsQ0FDVyxRQUFELElBQWM7QUFDaEIsSUFBQSxRQUFRLENBQUMsT0FBVCxDQUFpQixXQUFXLElBQUk7QUFDNUIsTUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixpQkFBdkIsRUFBMEMsU0FBMUMsSUFBdUQsK0JBQWlCLFdBQWpCLENBQXZEO0FBQ0gsS0FGRDtBQUVHLEdBSlg7QUFNSCxDQVJGOztlQVNnQixjOzs7Ozs7QUNYbkI7O0FBQ0E7O0FBQ0E7Ozs7QUFDQSxvQkFBZ0IsWUFBaEI7O0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgcHJpbnRBbGxFdmVudHMgZnJvbSBcIi4vcHJpbnRBbGxFdmVudHNcIjtcclxuY29uc3QgZXZlbnRBcGlNYW5hZ2VyID0ge1xyXG4gICAgICAgIGdldEFsbEV2ZW50czogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvXCIpXHJcbiAgICAgICAgICAgIC50aGVuKGV2ZW50cyA9PiBldmVudHMuanNvbigpKVxyXG4gICAgfSwgIHBvc3ROZXdFdmVudDogZXZlbnRPYmplY3QgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHNcIiwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShldmVudE9iamVjdClcclxuICAgICAgICB9KVxyXG5cclxuICAgIH0sIGRlbGV0ZUV2ZW50OiAoaWRUb0RlbGV0ZSkgPT4ge1xyXG4gICAgICAgIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7aWRUb0RlbGV0ZX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwcmludEFsbEV2ZW50cygpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LCBnZXRTaW5nbGVFdmVudDogKGlkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7aWR9YClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSwgIGVkaXRFdmVudDogKGlkUGFyYW0sIGV2ZW50VG9FZGl0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvZXZlbnRzLyR7aWRQYXJhbX1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZXZlbnRUb0VkaXQpXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBldmVudEFwaU1hbmFnZXI7IiwiY29uc3QgYnVpbGRTaW5nbGVFdmVudCA9IChzaW5nbGVFdmVudCkgPT4ge1xyXG4gICAgcmV0dXJuIGBcclxuICAgICAgICA8ZGl2IGlkID1cImV2ZW50Q29udGFpbmVyLSR7c2luZ2xlRXZlbnQuaWR9XCI+XHJcbiAgICAgICAgICAgIDxoMj5OYW1lOiAgJHtzaW5nbGVFdmVudC5uYW1lfTwvaDI+XHJcbiAgICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgICAgIDxsaT5EYXRlOiAgJHtzaW5nbGVFdmVudC5kYXRlfTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGk+TG9jYXRpb246ICAke3NpbmdsZUV2ZW50LmxvY2F0aW9ufTwvbGk+XHJcbiAgICAgICAgICAgICAgICA8YnI+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0QnV0dG9uXCIgaWQ9IFwiZWRpdEV2ZW50QnV0dG9uLSR7c2luZ2xlRXZlbnQuaWR9XCI+VXBkYXRlPC9idXR0b24+IDxidXR0b24gY2xhc3M9XCJkZWxldGVCdXR0b25cIiBpZD0gXCJkZWxldGVCdXR0b24tJHtzaW5nbGVFdmVudC5pZH1cIj5EZWxldGU8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8aHI+YFxyXG59O1xyXG5leHBvcnQgZGVmYXVsdCBidWlsZFNpbmdsZUV2ZW50OyIsImltcG9ydCBldmVudEZvcm1CdWlsZGVyIGZyb20gXCIuL2V2ZW50Rm9ybVwiO1xyXG5pbXBvcnQgYnVpbGRFdmVudE9iamVjdCBmcm9tIFwiLi9ldmVudE9iamVjdFwiO1xyXG5pbXBvcnQgZXZlbnRBcGlNYW5hZ2VyIGZyb20gXCIuL2FwaU1hbmFnZXJcIjtcclxuaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuL3ByaW50QWxsRXZlbnRzXCI7XHJcbmltcG9ydCBldmVudEVkaXRGb3JtQnVpbGRlciBmcm9tIFwiLi9lZGl0Rm9ybVwiO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZEV2ZW50QnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcInlvdSBjbGlja2VkIHRoZSBidXR0b24hXCIpXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Rm9ybUNvbnRhaW5lclwiKS5pbm5lckhUTUwgPVxyXG4gICAgICAgIGV2ZW50Rm9ybUJ1aWxkZXIoKVxyXG5cclxufSlcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic2F2ZUV2ZW50QnV0dG9uXCIpKSB7XHJcbiAgICAgICAgY29uc3QgbmFtZVZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1OYW1lXCIpLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGRhdGVWYWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRGb3JtRGF0ZVwiKS52YWx1ZTtcclxuICAgICAgICBjb25zdCBsb2NhdGlvblZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudEZvcm1Mb2NhdGlvblwiKS52YWx1ZTtcclxuICAgICAgICBjb25zdCBuZXdFdmVudE9iamVjdCA9IGJ1aWxkRXZlbnRPYmplY3QobmFtZVZhbHVlLCBkYXRlVmFsdWUsIGxvY2F0aW9uVmFsdWUpO1xyXG4gICAgICAgIGV2ZW50QXBpTWFuYWdlci5wb3N0TmV3RXZlbnQobmV3RXZlbnRPYmplY3QpXHJcbiAgICAgICAgICAgIC50aGVuKHByaW50QWxsRXZlbnRzKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0QnV0dG9uXCIpKSkge1xyXG4gICAgICAgIGxldCBldmVudEVkaXRJZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07XHJcbiAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLmdldFNpbmdsZUV2ZW50KGV2ZW50RWRpdElkKVxyXG4gICAgICAgICAgICAudGhlbigoc2luZ2xlRXZlbnRJbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRDb250YWluZXItJHtldmVudEVkaXRJZH1gKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRDb250YWluZXItJHtldmVudEVkaXRJZH1gKS5pbm5lckhUTUwgPSBldmVudEVkaXRGb3JtQnVpbGRlcihzaW5nbGVFdmVudEluZm8pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNhdmVFZGl0ZWRFdmVudFwiKSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9IGV2ZW50LnRhcmdldC5pZC5zcGxpdChcIi1cIilbMV07XHJcbiAgICAgICAgICAgIGNvbnN0IGVkaXRlZE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXZlbnRFZGl0TmFtZS0ke2l0ZW1JZH1gKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZWRpdGVkRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNldmVudEVkaXREYXRlLSR7aXRlbUlkfWApLnZhbHVlO1xyXG4gICAgICAgICAgICBjb25zdCBlZGl0ZWRMb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNldmVudEVkaXRMb2NhdGlvbi0ke2l0ZW1JZH1gKS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc3QgZWRpdGVkRXZlbnRPYmplY3QgPSBidWlsZEV2ZW50T2JqZWN0KGVkaXRlZE5hbWUsIGVkaXRlZERhdGUsIGVkaXRlZExvY2F0aW9uKTtcclxuICAgICAgICBldmVudEFwaU1hbmFnZXIuZWRpdEV2ZW50KGl0ZW1JZCwgZWRpdGVkRXZlbnRPYmplY3QpXHJcbiAgICAgICAgICAgIC50aGVuKHByaW50QWxsRXZlbnRzKVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZUJ1dHRvblwiKSkge1xyXG4gICAgICAgIGxldCBldmVudERlbGV0ZUlkID0gZXZlbnQudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKVsxXTtcclxuICAgICAgICBldmVudEFwaU1hbmFnZXIuZGVsZXRlRXZlbnQoZXZlbnREZWxldGVJZClcclxuICAgIH1cclxufSk7XHJcbiIsImNvbnN0IGV2ZW50RWRpdEZvcm1CdWlsZGVyID0gKHNpbmdsZUV2ZW50KSA9PiB7XHJcbiAgICByZXR1cm4gYDxmb3JtIGlkID0gXCJldmVudEZvcm1JbnB1dHNcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRFZGl0TmFtZS0ke3NpbmdsZUV2ZW50LmlkfVwiIHBsYWNlaG9sZGVyID0gXCJuYW1lXCIgdmFsdWU9XCIke3NpbmdsZUV2ZW50Lm5hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50RWRpdERhdGUtJHtzaW5nbGVFdmVudC5pZH1cIiBwbGFjZWhvbGRlciA9IFwiZGF0ZVwiIHZhbHVlPVwiJHtzaW5nbGVFdmVudC5kYXRlfVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEVkaXRMb2NhdGlvbi0ke3NpbmdsZUV2ZW50LmlkfVwiIHBsYWNlaG9sZGVyID0gXCJsb2NhdGlvblwiIHZhbHVlPVwiJHtzaW5nbGVFdmVudC5sb2NhdGlvbn1cIj5cclxuICAgICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGlkID0gXCJzYXZlRWRpdGVkRXZlbnQtJHtzaW5nbGVFdmVudC5pZH1cIiBjbGFzcyA9IFwic2F2ZUVkaXRlZEV2ZW50XCI+U2F2ZSBldmVudDwvYnV0dG9uYFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGV2ZW50RWRpdEZvcm1CdWlsZGVyOyIsImNvbnN0IGV2ZW50Rm9ybUJ1aWxkZXIgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gYDxmb3JtIGlkID0gXCJldmVudEZvcm1JbnB1dHNcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwiZXZlbnRGb3JtTmFtZVwiIHBsYWNlaG9sZGVyID0gXCJuYW1lXCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQgPSBcImV2ZW50Rm9ybURhdGVcIiBwbGFjZWhvbGRlciA9IFwiZGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkID0gXCJldmVudEZvcm1Mb2NhdGlvblwiIHBsYWNlaG9sZGVyID0gXCJsb2NhdGlvblwiPlxyXG4gICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgIDxidXR0b24gaWQgPSBcInNhdmVOZXdFdmVudFwiIGNsYXNzID0gXCJzYXZlRXZlbnRCdXR0b25cIj5TYXZlIGV2ZW50PC9idXR0b25gXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgZXZlbnRGb3JtQnVpbGRlcjsiLCJjb25zdCBidWlsZEV2ZW50T2JqZWN0ID0gKG5hbWVQYXJhbSwgZGF0ZVBhcmFtLCBsb2NhdGlvblBhcmFtKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5hbWU6IG5hbWVQYXJhbSxcclxuICAgICAgICBkYXRlOiBkYXRlUGFyYW0sXHJcbiAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uUGFyYW0sXHJcbiAgICAgIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgYnVpbGRFdmVudE9iamVjdCIsImltcG9ydCBldmVudEFwaU1hbmFnZXIgZnJvbSBcIi4vYXBpTWFuYWdlclwiXHJcbmltcG9ydCBidWlsZFNpbmdsZUV2ZW50IGZyb20gXCIuL2J1aWxkU2luZ2xlRXZlbnRcIlxyXG4gICBjb25zdCBwcmludEFsbEV2ZW50cyA9ICgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50Q29udGFpbmVyXCIpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgZXZlbnRBcGlNYW5hZ2VyLmdldEFsbEV2ZW50cygpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuZm9yRWFjaChzaW5nbGVFdmVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudENvbnRhaW5lclwiKS5pbm5lckhUTUwgKz0gYnVpbGRTaW5nbGVFdmVudChzaW5nbGVFdmVudClcclxuICAgICAgICAgICAgICAgIH0pfSlcclxuICAgICAgICAgICAgO1xyXG4gICAgfTtcclxuICAgIGV4cG9ydCBkZWZhdWx0IHByaW50QWxsRXZlbnRzO1xyXG4iLCJpbXBvcnQgZXZlbnRBcGlNYW5hZ2VyIGZyb20gXCIuL2V2ZW50cy9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IHByaW50QWxsRXZlbnRzIGZyb20gXCIuL2V2ZW50cy9wcmludEFsbEV2ZW50c1wiXHJcbmltcG9ydCBjbGlja1dpemFyZCBmcm9tIFwiLi9ldmVudHMvY2xpY2tcIlxyXG5ldmVudEFwaU1hbmFnZXIuZ2V0QWxsRXZlbnRzKClcclxucHJpbnRBbGxFdmVudHMoKVxyXG4iXX0=
