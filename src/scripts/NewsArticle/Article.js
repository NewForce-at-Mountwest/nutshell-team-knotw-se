// An Article (News) Component that Displays an Article's (News) Article ID, Title, Synopsis, and URL.
const Article = (singleArticleObj) => {
    return `<div class="card" id="article-card-${singleArticleObj.id}" class="article-card-${singleArticleObj.id}">
        <h2>${singleArticleObj.title}</h2>
        <p>(${singleArticleObj.time})</p>
        <p>${singleArticleObj.synopsis}</p>
        <p>${singleArticleObj.url}</p>
        <button class="delete" id="delete-${singleArticleObj.id}">Delete</button>
        <button class="edit" id="edit-${singleArticleObj.id}">Edit</button>
        </div>`
 }

// Export Functionality to be Imported by Any Other Module:
 export default Article;