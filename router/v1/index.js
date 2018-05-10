const router = require("koa-router")();
const Article = require("../../controller/article");
const User = require("../../controller/user");
const Comment = require("../../controller/comment");
const Category = require("../../controller/category");

const routers = router
    // article
    .get("/article/list", Article.getArticle)
    .get("/article", Article.oneArticle)
    .post("/article", Article.insertArticle)
    .put("/article", Article.modifyArticle)
    .del("/article", Article.delArticle)
    // category
    .post("/category", Category.setCategory)
    .get("/category", Category.getCategory)
    .put("/category", Category.putCategory)
    .del("/category", Category.delCategory)
    //comment
    .get("/comment", Comment.getComment)
    .post("/comment", Comment.setComment)
    .del("/comment", Comment.delComment)
    //user
    .post("/user/login", User.login)
    .post("/user", User.register)
    .put("/user", User.modify)
    .post("/user/pwd", User.modifyPwd)
    .post("/getinfo", User.getOneUserInfo);

module.exports = routers;
