const log4js = require("log4js");
const logConfig = require("../config/logConfig");
const resCode = require("../config/responseCode");

log4js.configure(logConfig);

const errLogger = log4js.getLogger("error");
const resLogger = log4js.getLogger("response");

const errLog = (err, ctx) => {
  errLogger.error({
    info: resCode(err),
    ctx
  });
};
const resLog = ctx => {
  resLogger.info(ctx);
};

module.exports = {
  errLog,
  resLog
};
