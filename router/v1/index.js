const router = require("koa-router")();
const Article = require("../../controller/article");
const User = require("../../controller/user");
const Comment = require("../../controller/comment");
const Category = require("../../controller/category");
const Photo = Request("../../controller/photo");

const routers = router
    // article api
    .get("/article/list", Article.getArticle) //get article list
    .get("/article", Article.oneArticle) //article details
    .post("/article", Article.insertArticle) //insert article
    .put("/article", Article.modifyArticle) // modify article
    .del("/article", Article.delArticle) //delete article
    // category api
    .post("/category", Category.setCategory) //add category
    .get("/category", Category.getCategory) // get category list
    .put("/category", Category.putCategory) //modify category
    .del("/category", Category.delCategory) //delete category
    //comment api
    .get("/comment", Comment.getComment) //get comment list
    .post("/comment", Comment.setComment) //add comment
    .del("/comment", Comment.delComment) //delete comment
    //user api
    .post("/user/login", User.login) //user login api
    .post("/user", User.register) //user register
    .put("/user", User.modify) //modify user info
    .post("/user/pwd", User.modifyPwd) //modify user password
    .post("/getinfo", User.getOneUserInfo) //get user info
    // photo api
    .post("/photo", Photo.insertPhoto)//insert photo
    .get("/photo", Photo.findPhoto)//find photo
    .del("/photo", Photo.deletePhoto); //delete photo

module.exports = routers;
