import authForm from "./auth/forms";
import clicks from "./auth/clicks"
import chronology from "./NewsArticle/ArticleArrayDateSort"


document.querySelector("#jh-home").innerHTML = authForm.home();
clicks.reg()
clicks.register()
clicks.firstLog()
clicks.login()
clicks.logout()

chronology();