// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import ArticleCollection from "../data/ArticleCollection";
import handleEditedArticle from "./ArticleSaveEdit.js/index.js";

// Activate the Edit Button(s) to Respond to 'Click' Events:
const activateEditButton = () => {
    // Select Articles Output ("#articles-output") as Target of Event Listener:
    document.querySelector("#articles-output").addEventListener("click", () => {
        // Focus / Hone in on "Edit" Button:
        if(event.target.classList.contains("edit")){
            // "-" Specifies the Point(s) Where the Split Take(s) Place;
            // "[1]" Limit Determines the Upper Limit on the Number of Splits to be Found in the Given String:
            ArticleCollection.getSingleArticle(event.target.id.split("-")[1])
            // Define Single Article Values for Title, Timestamp, Synopsis, and URL; Change "Save-Article" text to "Edit Article";
            // Tie / Correlate Save (Edit) Article ID to Single Article ID (singleArticle.id):
            .then((singleArticle) => {
                document.querySelector("#article-title").value = singleArticle.title;
                document.querySelector("#article-timestamp").value = singleArticleObj.timestamp;
                document.querySelector("#article-synopsis").value = singleArticle.synopsis;
                document.querySelector("#article-url").value = singleArticle.url;
                document.querySelector("#save-article").textContent = "Edit Article";
                document.querySelector("#save-article").id= `edit-article-${singleArticle.id}`;
                handleEditedArticle();
            })
        }
    })
}

// Export Functionality to be Imported by Any Other Module:
export default activateEditButton;