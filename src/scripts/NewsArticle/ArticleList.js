// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import BuildArticle from "./Article.js"
import ArticleCollection from "./ArticleCollection.js"

// An ArticleList Component that Displays ALL News Articles:
// It should import the Article Component and the ArticleCollection Component (See Above).
const ArticleList = () => {
    document.querySelector("#articles-output").innerHTML = "";
    ArticleCollection.getAllArticles()
    .then(articles => {
        articles.forEach(singleArticle => {
            document.querySelector("#articles-output").innerHTML += BuildArticle(singleArticle);
        })
    })
}

// Export Functionality to be Imported by Any Other Module:
export default ArticleList;