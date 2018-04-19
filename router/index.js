const router = require("koa-router")();
const Category = require("../controller/category");
const User = require("../controller/user");
const ErrAndLog = require("../utils/ErrAndLog");

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

  router.post("/test", async (ctx, next) => {
    console.log("next", 1);
    ctx.response.body = { code: 200 };
  });
  
  // 中间件
  app
    .use(ErrAndLog) //处理日志和错误返回
    .use(router.routes()) //koa-router中间件
    .use(router.allowedMethods());
};
