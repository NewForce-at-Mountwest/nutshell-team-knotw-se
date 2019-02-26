// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import buildArticleObject from "./ArticleObjectBuilder";
import ArticleCollection from "./ArticleCollection";
import ArticleList from "./ArticleList";
import ArticleForm from "./ArticleForm";

const handleEditedArticle = () => {
  document.querySelector("#article-form-output").addEventListener("click", () => {
    if (event.target.id.includes("edit-article")) {

      // Get User Input:
      const titleVal = document.querySelector("#article-title").value;
      const timestampVal = document.querySelector("#article-timestamp").value;
      const synopsisVal = document.querySelector("#article-synopsis").value;
      const urlVal = document.querySelector("#article-url").value;

      const articleId = event.target.id.split("-")[2];

      // Turn User Input into Object
      const objectToPost = buildArticleObject(titleVal, timestampVal, synopsisVal, urlVal);

      ArticleCollection.editArticle(articleId, objectToPost).then(() => {
        ArticleList();
        document.querySelector("#article-form-output").innerHTML = ArticleForm.buildForm();
      });
    }
  });
};

// Export Functionality to be Imported by Any Other Module:
export default handleEditedArticle;