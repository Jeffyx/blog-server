const router = require("koa-router")();
const ErrAndLog = require("../utils/ErrAndLog");
const User = require("../controller/user");
const Category = require("../controller/category");
const Article = require("../controller/article")

module.exports = app => {
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

  // 文章
  router.get("/article/list",Article.getArticle)
  router.get("/article",Article.oneArticle)
  router.post("/article",Article.insertArticle)
  router.put("/article",Article.modifyArticle)
  router.del("/article",Article.delArticle)
  
  
  
  // 中间件
  app
    .use(ErrAndLog) //处理日志和错误返回
    .use(router.routes()) //koa-router中间件
    .use(router.allowedMethods());
};
