// A Form Should Be Presented to the User, which Includes the Following Information (Objects):
const buildArticleObject = (titleParam, timestampParam, synopsisParam, urlParam) => {
    return {
      // 1(a). News title (titleParam):
      title: titleParam,
      // 1(b). Timestamp (timestampParam):
      time: timestampParam,
      // 2. Synopsis (synopsisParam):
      synopsis: synopsisParam,
      // 3. URL (urlParam):
      url: urlParam,
      // 3. User ID (Input ID into Session [Login] Storage):
      userId: sessionStorage.getItem("userId")
    };
  };

  // Export Functionality to be Imported by Any Other Module:
  export default buildArticleObject;