const eventApiManager = {
    getAllEvents: () => {
          return fetch("http://localhost:8088/events/")
            .then(events => events.json())
            },
        postNewEvent: eventObject => {
           return fetch("http://localhost:8088/events", {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventObject)
            })

    }}



export default eventApiManager;