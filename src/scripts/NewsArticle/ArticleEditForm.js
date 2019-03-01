// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import ArticleCollection from "./ArticleCollection";
import handleEditedArticle from "./ArticleSaveEdit";
// import chronology from "./ArticleArrayDateSort";

// Activate the Edit Button(s) to Respond to 'Click' Events:
const activateEditButton = () => {
    handleEditedArticle();
    // Select Articles Output ("#articles-output") as Target of Event Listener:
    document.querySelector("#articles-output").addEventListener("click", () => {
        // Focus / Hone in on "Edit" Button:
        if(event.target.classList.contains("edit")){
            // "-" Specifies the Point(s) Where the Split Take(s) Place;
            // "[1]" Limit Determines the Upper Limit on the Number of Splits to be Found in the Given String:
            ArticleCollection.getSingleArticle(event.target.id.split("-")[1])
            // Define Single Article Values for Title, Timestamp, Synopsis, and URL; Change "Save-Article" Text to "Edit Article";
            // Tie / Correlate Save (Edit) Article ID to Single Article ID (singleArticle.id):
            .then((singleArticle) => {
                // var moment = require("moment");
                document.querySelector("#article-title").value = singleArticle.title;
                // Date and Time Omitted From Change Value(s):
                // document.querySelector("#article-date").value = singleArticle.date;
                // moment(Date.now()).format().value = singleArticle.time;
                // console.log(singleArticle.time);
                document.querySelector("#article-synopsis").value = singleArticle.synopsis;
                document.querySelector("#article-url").value = singleArticle.url;
                document.querySelector("#save-article").textContent = "Edit Article";
                document.querySelector("#save-article").id = `edit-article-${singleArticle.id}`;
            })
        }
    })
}

// Export Functionality to be Imported by Any Other Module:
export default activateEditButton;