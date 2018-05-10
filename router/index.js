const router = require("koa-router")();
const ErrAndLog = require("../utils/ErrAndLog");
const Detoken = require("../utils/detoken");
const v1_api = require("./v1/index");

// v1版本API
router.use("/v1", v1_api.routes(), v1_api.allowedMethods());



module.exports = app => {
    // 中间件
    app
        .use(ErrAndLog) //处理日志和错误返回
        .use(Detoken)
        .use(router.routes()) //koa-router中间件
        .use(router.allowedMethods());
};
