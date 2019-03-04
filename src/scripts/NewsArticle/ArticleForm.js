// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
import ArticleCollection from "./ArticleCollection";
import buildArticleObject from "./ArticleObjectBuilder";
import ArticleList from "./ArticleList";

// A NewsForm component that, when Populated (Filled Out) and a Submitted (Button Pressed), Adds a New Article to 'Storage';
// It should import the NewsCollection Component (See Above):
const ArticleForm = {
  // date: () => {
  //   var today = new Date();
  //   var yyyy = today.getFullYear();
  //   var MM = today.getMonth() + 1; //January is 0!
  //   var dd = today.getDate();
  //   if (dd < 10) {
  //     dd = "0" + dd;
  //   }

  //   if (MM < 10) {
  //     MM = "0" + MM;
  //   }
  //   today = yyyy+"-"+MM+"-"+dd;
  //   document.write(today);
  // },
  // time: () => {
  //     if(hours<10) hours = "0"+hours;
  //     $(document).ready(function myTimer() {
  //         var now = new Date(Date.now());
  //         var f = leadZero(now.getHours()) + ":" + leadZero(now.getMinutes()) + ":" + leadZero(now.getSeconds());
  //         $("input[type=time]").val(f);
  //     })
  //   function leadZero(_something) {
  //       if(parseInt(_something)<10) return "0"+_something;
  //       return _something;//else
  //   }
  // },
  buildForm: () => {
    return `
    <div class="form" id="article-form">
      <h1>Add a New Article</h1></br>
      <form action="">
        <input type="text" id="article-title" placeholder="Title of Article">
        <br>
        <input type="text" id="article-synopsis" placeholder="Synopsis">
        <br>
        <input type="url" id="article-url" placeholder="URL">
        <br>
      </form>
      <button id="save-article">Save Article</button>
      </div>`;
  },
  activateSaveButton: () => {
      document.querySelector("#article-form-output").addEventListener("click", () => {
        var moment = require("../../lib/node_modules/moment");
        if(event.target.id === "save-article"){
        // Get User Input:
          const titleVal = document.querySelector("#article-title").value;
            // Date Omitted From Collection:
            // const dateVal = document.querySelector("#article-date").value;
          // Get User Input:
          // Moment.js Utilized to Parse, validate, manipulate, and display dates and times in JavaScript:
          const timeVal = moment(Date.now()).format();
          const synopsisVal = document.querySelector("#article-synopsis").value;
          const urlVal = document.querySelector("#article-url").value;
          // Turn User Input into Object:
          const objectToPost = buildArticleObject(titleVal, timeVal, synopsisVal, urlVal)
          console.log(objectToPost);
          // Save the Object to Database:
          ArticleCollection.saveNewArticle(objectToPost)
          .then(() => {
              // Once POST is Complete, Print All [News] Articles (Again):
              ArticleList();
              // Clear Form Values:
              document.querySelector("#article-title").value = "";
              // document.querySelector("#article-date").value = "";
              // document.querySelector("#article-timestamp").value = "";
              document.querySelector("#article-synopsis").value = "";
              document.querySelector("#article-url").value = "";
              // document.querySelector("#article-form").innerHTML = ""

          })
        }
      })
  },
  createArticle: () => {
    return `
    <button id="create-new-article" class = "create-new-article">Create Article</button>
    `
  }
};

// Export Functionality to be Imported by Any Other Module:
export default ArticleForm;