const jwt = require("./jwt");
const getClint = require("./getClint");

module.exports = async (ctx, next) => {
    const _method = ctx.request.method;
    const _url = ctx.request.url;

    if (_method != "GET") {
        if (!_url.includes("user")) {
            const userAgent = ctx.header["user-agent"];
            let { clientip } = ctx.header;
            if (!clientip) {
                clientip = "undefined";
            }
            const clint = getClint(userAgent);
            const { token } = ctx.request.header;
            const res = await jwt.verify(token);
            if (res == 0) throw 2;
            if (res.clientip != clientip || res.clint != clint) throw 2;
        }
    }
    await next();
};
