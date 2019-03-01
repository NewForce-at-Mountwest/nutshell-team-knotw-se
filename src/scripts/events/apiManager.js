import printAllEvents from "./printAllEvents";
const eventApiManager = {
        getAllEvents: (userId) => {
        return fetch(`http://localhost:8089/events/?userId=${userId}`)
            .then(events => events.json())
    },  postNewEvent: eventObject => {
        return fetch("http://localhost:8089/events", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventObject)
        })

    }, deleteEvent: (idToDelete) => {
        fetch(`http://localhost:8089/events/${idToDelete}`, {
            method: "DELETE",
        })
            .then(() => {
                printAllEvents()
            })
    }, getSingleEvent: (id) => {
        return fetch(`http://localhost:8089/events/${id}`)
            .then(response => response.json())
    },  editEvent: (idParam, eventToEdit) => {
        return fetch(`http://localhost:8089/events/${idParam}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventToEdit)
        })
    }
}



export default eventApiManager;