// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import ArticleCollection from "./ArticleCollection"
import ArticleList from "./ArticleList"

const activateDeleteButtons = () => {
    document.querySelector("#articles-output").addEventListener("click", () => {
        if(event.target.classList.contains("delete")){
            const idToDelete = event.target.id.split("-")[1];
            ArticleCollection.deleteArticle(idToDelete)
            .then(ArticleList)
        }
    })
}

// Export Functionality to be Imported by Any Other Module:
export default activateDeleteButtons;