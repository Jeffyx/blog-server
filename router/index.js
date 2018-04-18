const router = require("koa-router")();
const token = require("../controller/token");
const Category = require("../controller/category");
const User = require("../controller/user");

module.exports = app => {
  // 默认
  router.get("/", async (ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`;
  });
  // 分类
  router.post("/category", Category.setCategory);
  router.get("/category", Category.getCategory);
  router.put("/category", Category.putCategory);
  router.del("/category", Category.delCategory);
  // 用户
  router.get("/user", User.login);
  router.post("/user", User.register);
  router.put("/user", User.modify);
  router.post("/user/pwd", User.modifyPwd);

  app.use(router.routes()).use(router.allowedMethods());
};
