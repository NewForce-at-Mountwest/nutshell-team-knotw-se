// Imports Functionality to Allow Use in This Module (From Other JavaScript Modules):
// import ArticleCollection from "./ArticleCollection";

// Article Chronology (Newest-to-Oldest):
const chronology = () => {
const activeUserId = sessionStorage.getItem("userId");
    return fetch(`http://localhost:8089/articles?userId=${activeUserId}`).then(response => {
    return response.json();
  }).then(data => {
    var userArticles = data;
    console.log(userArticles);
    const articleTimes =[];
    // Work with JSON Data Here:
        for (const userArticle of userArticles) {
            var Moment = require("moment");
            const myObject = {};
            myObject.id = userArticle.id;
            myObject.title = userArticle.title;
            myObject.time = Moment(userArticle.time);  // Do Not Call Format
            myObject.synopsis = userArticle.synopsis;
            myObject.url = userArticle.url;
            myObject.userId = userArticle.userId;
            articleTimes.push(myObject);
        }
        articleTimes.sort((left, right) => {
          return right.time.diff(left.time); // No More Need to Convert Strings to Dates
        })
        console.log(articleTimes);
  }).catch(err => {
    console.log("Noooooooo!!!!!!");
  })
}


// const test = () => {

// const arrayDates =[];

// var articleTimes = [{ time: "2019-02-28T16:06:29-15:00", title: "Article 3" }, { time: "2019-02-28T16:06:20-15:00", title: "Article 1" }, { time: "2019-01-27T16:26:20-05:00", title: "Article 2" }];

// articleTimes.forEach((singleArticle) => {
// var Moment = require("moment");
// const MomentObject = Moment(singleArticle.time)
// console.log(MomentObject);
// arrayDates.push(MomentObject);
// })
// console.log(arrayDates);
// arrayDates.sort((left, right) => {
//     return right.diff(left); // No more need to convert strings to dates
//   })
//   console.log(arrayDates)
// }

export default chronology