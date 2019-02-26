// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import ArticleCollection from "../data/ArticleCollection";
import handleEditedArticle from "./ArticleSaveEdit.js/index.js";

const activateEditButton = () => {
    document.querySelector("#articles-output").addEventListener("click", () => {
        if(event.target.classList.contains("edit")){
            ArticleCollection.getSingleArticle(event.target.id.split("-")[1])
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