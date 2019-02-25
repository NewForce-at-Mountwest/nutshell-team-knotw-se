import eventApiManager from "./apiManager"
import buildSingleEvent from "./buildSingleEvent"
   const printAllEvents = () => {
        document.querySelector("#eventContainer").innerHTML = "";
        eventApiManager.getAllEvents()
            .then((response) => {
                response.forEach(singleEvent => {
                    document.querySelector("#eventContainer").innerHTML += buildSingleEvent(singleEvent)
                })})
            ;
    };
    export default printAllEvents;
