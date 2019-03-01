// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import buildArticleObject from "./ArticleObjectBuilder";
import ArticleCollection from "./ArticleCollection";
import ArticleList from "./ArticleList";
import ArticleForm from "./ArticleForm";
// import chronology from "./ArticleArrayDateSort";

// An Edited Article Handler that Handles User Inputs:
const handleEditedArticle = () => {
  // Select Article Form Output ("#article-form-output") as Location of 'Click' Event Listener:
  document.querySelector("#form-output").addEventListener("click", () => {
    var moment = require("moment");
    // Target Edit Article ID; If Included, Get User Input:
    if (event.target.id.includes("edit-article")) {
      // Get User Input (Title, Timestamp, Synopsis, and URL + Article ID [Split]):
      const titleVal = document.querySelector("#article-title").value;
      // const dateVal = document.querySelector("#article-date").value;
      // Moment.js Utilized to Parse, validate, manipulate, and display dates and times in JavaScript:
      const timeVal = moment(Date.now()).format();
      const synopsisVal = document.querySelector("#article-synopsis").value;
      const urlVal = document.querySelector("#article-url").value;
      // Get User Input (Article ID Split):
      const articleId = event.target.id.split("-")[2];
      // Turn User Input into Object (Title, Timestamp, Synopsis, and URL):
      const objectToPost = buildArticleObject(titleVal, timeVal, synopsisVal, urlVal);
      // Load Existing Articles from Storage; Edit / Put Selected Article (by ID):
      ArticleCollection.editArticle(articleId, objectToPost).then(() => {
        // Write Edited Article [Form] to 'Storage':
        document.querySelector("#form-output").innerHTML = ArticleForm.buildForm();
        // Displays ALL News Articles:
        ArticleList();
      });
    }
  });
};

// Export Functionality to be Imported by Any Other Module:
export default handleEditedArticle;