const jwt = require("./jwt");
const getClint = require("./getClint");

module.exports = async (ctx, next) => {
    const _method = ctx.request.method; //请求类型
    const _url = ctx.request.url; //origin

    if (_method != "GET") { //如果是get不验证
        if (!_url.includes("user")) { //如果是user 接口 不验证
            const userAgent = ctx.header["user-agent"]; 
            let { clientip } = ctx.header;
            if (!clientip) {
                clientip = "undefined";
            }
            const clint = getClint(userAgent);
            const { token } = ctx.request.header;
            const res = await jwt.verify(token);
            if (res == 0) throw 2;
            if (res.clientip != clientip || res.clint != clint) throw 2; //判断 解析出的ip和Clint是否一致否则报错
        }
    }
    await next();
};
