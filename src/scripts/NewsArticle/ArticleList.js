// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import Article from "./Article.js";
import ArticleCollection from "./ArticleCollection.js";

// An ArticleList Component that Displays ALL News Articles:
// It should import the Article Component and the ArticleCollection Component (See Above).
const ArticleList = () => {
    document.querySelector("#articles-output").innerHTML = "";
    ArticleCollection.getAllArticles()
    .then(articles => {
        // Work with JSON Data Here:
            for (const article of articles) {
                var Moment = require("moment");
                article.time = Moment(article.time);  // Do Not Call Format
            }
            articles.sort((left, right) => {
            return right.time.diff(left.time); // No Need to Convert Strings to Dates
            })
        articles.forEach(singleArticle => {
            document.querySelector("#articles-output").innerHTML += Article(singleArticle);
        })
    })
}

// Export Functionality to be Imported by Any Other Module:
export default ArticleList;