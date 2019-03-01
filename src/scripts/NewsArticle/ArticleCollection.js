// An ArticleCollection Component (Constant) that Loads Existing Articles from Storage and Saves New Ones.
const ArticleCollection = {
    saveNewArticle: articleObj => {
        return fetch("http://localhost:8089/articles", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(articleObj)
      });
    },
    // Each New Article Should Have an Auto-Generated Identifier.
    getAllArticles: () => {
        // Get Active User ID and Input into Session Storage:
        const activeUserId = sessionStorage.getItem("userId");
            return fetch(`http://localhost:8089/articles?userId=${activeUserId}`)
            .then(r => r.json());
    },
    // Delete Selected Article (by ID):
    deleteArticle: (articleId) => {
        return fetch(`http://localhost:8089/articles/${articleId}`, {
            method: "DELETE"
        })
    },
    // Get / Fetch [Single] Selected Article (by ID):
    getSingleArticle: (articleId) => {
        return fetch(`http://localhost:8089/articles/${articleId}`)
        .then(r=> r.json())
    },
    // Edit / Put Selected Article (by ID):
    editArticle: (articleId, articleObj) => {
        return fetch(`http://localhost:8089/articles/${articleId}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
          },
            body: JSON.stringify(articleObj)
        });
    }
};

// Export Functionality to be Imported by Any Other Module:
export default ArticleCollection;