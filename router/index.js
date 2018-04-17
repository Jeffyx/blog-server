const router = require("koa-router")();
const token = require('../controller/token');
const { setCategory } = require("../controller/category");
const {login,register} = require('../controller/user');

module.exports = app => {
  // 默认
  router.get("/", async (ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`;
  });
  
  router.post("/category", setCategory);

  router.get('/user',login);
  router.post('/user',register);

  app.use(router.routes()).use(router.allowedMethods());
};
