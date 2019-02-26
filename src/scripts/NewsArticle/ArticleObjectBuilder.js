// A Form Should Be Presented to the User, which Includes the Following Information (Objects):
const buildArticleObject = (titleParam, synopsisParam, urlParam) => {
    return {
      // 1. News title (titleParam)
      title: titleParam,
      // 2. Synopsis (synopsisParam)
      synopsis: synopsisParam,
      // 3. URL (urlParam)...
      url: urlParam,
      userId: sessionStorage.getItem("userId")
    };
  };

  // Export Functionality to be Imported by Any Other Module:
  export default buildArticleObject;