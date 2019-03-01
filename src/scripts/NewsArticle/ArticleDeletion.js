// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import ArticleCollection from "./ArticleCollection";
import ArticleList from "./ArticleList";
// import chronology from "./ArticleArrayDateSort";

// Activate the Delete Button(s) to Respond to 'Click' Events:
const activateDeleteButtons = () => {
    // Select Articles Output ("#articles-output") as Target of Event Listener:
    document.querySelector("#articles-output").addEventListener("click", () => {
        // Focus / Hone in on "Delete" Button:
        if(event.target.classList.contains("delete")){
        // "-" Specifies the Point(s) Where the Split Take(s) Place;
        // "[1]" Limit Defines the Upper Limit on the Number of Splits to be Found in the Given String:
            const idToDelete = event.target.id.split("-")[1];
            // Delete Selected Article (by ID), Defined by the Constant (const) Above:
            ArticleCollection.deleteArticle(idToDelete)
            // Displays ALL [Other, Non-Deleted] News Articles:
            .then(ArticleList);
            // chronology();
        }
    })
}

// Export Functionality to be Imported by Any Other Module:
export default activateDeleteButtons;