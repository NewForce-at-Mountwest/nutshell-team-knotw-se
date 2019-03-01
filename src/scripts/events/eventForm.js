const eventFormBuilder =  {
    eventFormInputs: () => {
    return `
    <form id = "eventFormInputs">
                <input id = "eventFormName" placeholder = "name">
                <input id = "eventFormDate" placeholder = "date">
                <input id = "eventFormLocation" placeholder = "location">
            </form>
            <button id = "saveNewEvent" class = "saveEventButton">Save event</button`
},

   eventButton: `<hr><button id="addEventButton">Add an Event!</button>`
}

export default eventFormBuilder;