import eventFormBuilder from "./eventForm";
import buildEventObject from "./eventObject";
import eventApiManager from "./apiManager";
import printAllEvents from "./printAllEvents";
import eventEditFormBuilder from "./editForm";
const clickWizard = {
   addEventFunction: () =>{
    document.querySelector("body").addEventListener("click", () => {
       if (event.target.id === "addEventButton") {
    console.log("click")
    document.querySelector("#eventFormContainer").innerHTML = eventFormBuilder.eventFormInputs()
}})},
 saveEventFunction: () => {
    document.querySelector("body").addEventListener("click", () => {
    if (event.target.classList.contains("saveEventButton")) {
        const nameValue = document.querySelector("#eventFormName").value;
        const dateValue = document.querySelector("#eventFormDate").value;
        const locationValue = document.querySelector("#eventFormLocation").value;
        const newEventObject = buildEventObject(nameValue, dateValue, locationValue);
        eventApiManager.postNewEvent(newEventObject)
            .then(printAllEvents);
            document.querySelector("#eventFormName").value = "";
            document.querySelector("#eventFormDate").value = "";
            document.querySelector("#eventFormLocation").value = "";
    }})},
    editButtonFunction : () => {
    document.querySelector("body").addEventListener("click", () => {
    if (event.target.classList.contains("editButton")) {
        let eventEditId = event.target.id.split("-")[1];
        eventApiManager.getSingleEvent(eventEditId)
            .then((singleEventInfo) => {
                document.querySelector(`#eventContainer-${eventEditId}`).innerHTML = ""
                document.querySelector(`#eventContainer-${eventEditId}`).innerHTML = eventEditFormBuilder(singleEventInfo);
            })
    }})},
    saveEditButtonFunction : () => {
        document.querySelector("body").addEventListener("click", () => {
     if (event.target.classList.contains("saveEditedEvent")) {
        const itemId = event.target.id.split("-")[1];
            const editedName = document.querySelector(`#eventEditName-${itemId}`).value;
            const editedDate = document.querySelector(`#eventEditDate-${itemId}`).value;
            const editedLocation = document.querySelector(`#eventEditLocation-${itemId}`).value;
            const editedEventObject = buildEventObject(editedName, editedDate, editedLocation);
        eventApiManager.editEvent(itemId, editedEventObject)
            .then(printAllEvents);
    }})},
    deleteButtonFunction : () => {
        document.querySelector("body").addEventListener("click", () => {
        if (event.target.classList.contains("deleteButton")) {
        let eventDeleteId = event.target.id.split("-")[1];
        eventApiManager.deleteEvent(eventDeleteId)
    }})}
}
export default clickWizard;