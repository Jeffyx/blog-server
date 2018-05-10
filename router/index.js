const router = require("koa-router")();
const Errlog = require("../utils/Errlog");
const Detoken = require("../utils/Detoken");
const API_V1 = require("./v1/index");

// v1版本API
router.use("/v1", API_V1.routes(), API_V1.allowedMethods());



module.exports = app => {
    // 中间件
    app
        .use(Errlog) //处理日志和错误返回
        .use(Detoken) //验证token
        .use(router.routes()) //koa-router中间件
        .use(router.allowedMethods());
};
