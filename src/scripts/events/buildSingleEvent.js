const buildSingleEvent = (singleEvent) => {
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
        <hr>`
};
export default buildSingleEvent;