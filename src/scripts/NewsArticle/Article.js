// An Article (News) Component that Displays an Article's (News) Title, Synopsis, and URL.
const Article = (singleArticleObj) => {
    return `<div class="card" id="articles-card">
        <h3>${singleArticleObj.title} (${singleArticleObj.timestamp})</h3>
        <p>${singleArticleObj.synopsis}</p>
        <p>${singleArticleObj.url}</p>
        <button class="delete" id="delete-${singleArticleObj.id}">Delete</button>
        <button class="edit" id="edit-${singleArticleObj.id}">Edit</button>
        </div>`
 }

// Export Functionality to be Imported by Any Other Module:
 export default Article;