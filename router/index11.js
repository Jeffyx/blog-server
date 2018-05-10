const router = require("koa-router")();
const ErrAndLog = require("../utils/ErrAndLog");
const Detoken = require("../utils/detoken");
const User = require("../controller/user");
const Category = require("../controller/category");
const Article = require("../controller/article");
const Comment = require("../controller/comment");

module.exports = app => {
    router.get("/", async (ctx, next) => {
        ctx.response.body = "<p>Hello,ya</p>";
    });
    // 分类
    router.post("/category", Category.setCategory);
    router.get("/category", Category.getCategory);
    router.put("/category", Category.putCategory);
    router.del("/category", Category.delCategory);
    // 用户
    router.post("/user/login", User.login);
    router.post("/user", User.register);
    router.put("/user", User.modify);
    router.post("/user/pwd", User.modifyPwd);
    // 查询用户信息
    router.post("/getinfo", User.getOneUserInfo);
    // 文章
    router.get("/article/list", Article.getArticle);
    router.get("/article", Article.oneArticle);
    router.post("/article", Article.insertArticle);
    router.put("/article", Article.modifyArticle);
    router.del("/article", Article.delArticle);
    // 评论
    router.get("/comment", Comment.getComment);
    router.post("/comment", Comment.setComment);
    router.del("/comment", Comment.delComment);

    // 中间件
    app
        .use(ErrAndLog) //处理日志和错误返回
        .use(Detoken)
        .use(router.routes()) //koa-router中间件
        .use(router.allowedMethods());
};
