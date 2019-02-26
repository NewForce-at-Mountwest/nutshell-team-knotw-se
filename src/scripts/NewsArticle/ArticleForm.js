// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import ArticleCollection from "./ArticleCollection";
import buildArticleObject from "./ArticleObjectBuilder";
import ArticleList from "./ArticleList";

// A NewsForm component that, when Populated (Filled Out) and a Submitted (Button Pressed), Adds a New Article to 'Storage'.
// It should import the NewsCollection Component (See Above).
const ArticleForm = {
  buildForm: () => {
    return `
    <div class="form" id="articles-form">
      <h3>Add a New Article</h3>
      <form action="">
        <input type="text" id="article-title" placeholder="Title">
        (<input type="time" id="article-timestamp" placeholder="Timestamp" value="event.timeStamp">)
        <input type="text" id="article-synopsis" placeholder="Synopsis">
        <input type="url" id="article-url" placeholder="URL">
      </form>
      <button id="save-article">Save Article</button>
    </div>`;
  },
  activateSaveButton: () => {
      document.querySelector("#article-form-output").addEventListener("click", () => {
        if(event.target.id === "save-article"){

            // Get User Input:
            const titleVal = document.querySelector("#article-title").value;
            const timestampVal = document.querySelector("#article-timestamp").value;
            const synopsisVal = document.querySelector("#article-synopsis").value;
            const urlVal = document.querySelector("#article-url").value;

            // Turn User Input into Object:
            const objectToPost = buildArticleObject(titleVal, timestampVal, synopsisVal, urlVal)

            // Save the Object to Database:
            ArticleCollection.saveNewArticle(objectToPost)
            .then(() => {

                // Once POST is Complete, Print All [News] Articles (Again):
                ArticleList();

                // Clear Form Values:
                document.querySelector("#article-title").value = "";
                document.querySelector("#article-synopsis").value = "";
                document.querySelector("#article-url").value = "";

            })

        }

      })
  }
};

// Export Functionality to be Imported by Any Other Module:
export default ArticleForm;