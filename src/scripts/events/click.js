import eventFormBuilder from "./eventForm";
import buildEventObject from "./eventObject";
import eventApiManager from "./apiManager";
import printAllEvents from "./printAllEvents";
document.querySelector("#addEventButton").addEventListener("click", () => {
    console.log("you clicked the button!")
    document.querySelector("#eventFormContainer").innerHTML =
        eventFormBuilder()

})
document.querySelector("body").addEventListener("click", () => {
    if (event.target.classList.contains("saveEventButton")) {
        const nameValue = document.querySelector("#eventFormName").value;
        const dateValue = document.querySelector("#eventFormDate").value;
        const locationValue = document.querySelector("#eventFormLocation").value;
        const newEventObject = buildEventObject(nameValue, dateValue, locationValue);
        eventApiManager.postNewEvent(newEventObject)
        .then(printAllEvents)
    }
});