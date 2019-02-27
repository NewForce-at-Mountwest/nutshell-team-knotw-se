import eventApiManager from "./apiManager"
import buildSingleEvent from "./buildSingleEvent"
import eventFormBuilder from "./eventForm";
const printAllEvents = () => {
            let userId = sessionStorage.getItem("userId")
            document.querySelector("#eventFormContainer").innerHTML = eventFormBuilder.eventButton;
                document.querySelector("#eventContainer").innerHTML = "";
                eventApiManager.getAllEvents(userId)
                    .then((response) => {
                        response.forEach(singleEvent => {
                            document.querySelector("#eventContainer").innerHTML += buildSingleEvent(singleEvent)
                        })
                    })
            };
export default printAllEvents;
