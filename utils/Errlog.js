const logger = require("./logger");
const resCode = require("../config/responseCode");

module.exports = async (ctx, next) => {
  try {
    await next();
    logger.resLog(ctx);//记录响应的log
  } catch (error) {
    ctx.response.body = resCode(error); //统一处理错误 并返回对应的错误信息
    logger.errLog(error, ctx); //记录错误日志
  }
};
