import printAllEvents from "./printAllEvents";
const eventApiManager = {
        getAllEvents: () => {
        return fetch("http://localhost:8088/events/")
            .then(events => events.json())
    },  postNewEvent: eventObject => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventObject)
        })

    }, deleteEvent: (idToDelete) => {
        fetch(`http://localhost:8088/events/${idToDelete}`, {
            method: "DELETE",
        })
            .then(() => {
                printAllEvents()
            })
    }, getSingleEvent: (id) => {
        return fetch(`http://localhost:8088/events/${id}`)
            .then(response => response.json())
    },  editEvent: (idParam, eventToEdit) => {
        return fetch(`http://localhost:8088/events/${idParam}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventToEdit)
        })
    }
}



export default eventApiManager;