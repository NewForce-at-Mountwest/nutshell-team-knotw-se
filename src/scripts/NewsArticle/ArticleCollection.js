// An ArticleCollection Component that Loads Existing Articles from Storage and Saves New Ones.
const ArticleCollection = {
    saveNewArticle: articleObj => {
        return fetch("http://localhost:8088/articles", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(articleObj)
      });
    },
    // Each New Article Should Have an Auto-Generated Identifier.
    getAllArticles: () => {
      const activeUserId = sessionStorage.getItem("userId");
        return fetch(`http://localhost:8088/articles?userId=${activeUserId}`)
        .then(r => r.json());
    },
    deleteArticle: (articleId) => {
        return fetch(`http://localhost:8088/articles/${articleId}`, {
            method: "DELETE"
        })
    },
    getSingleArticle: (articleId) => {
        return fetch(`http://localhost:8088/articles/${articleId}`)
        .then(r=> r.json())
    },
    editArticle: (articleId, articleObj) => {
        return fetch(`http://localhost:8088/articles/${articleId}`, {
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