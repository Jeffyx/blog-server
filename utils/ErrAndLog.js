const logger = require("./logger");
const resCode = require("../config/responseCode");

module.exports = async (ctx, next) => {
  try {
    await next();
    logger.resLog(ctx);
  } catch (error) {
    ctx.response.body = resCode(error);
    logger.errLog(error, ctx);
  }
};
