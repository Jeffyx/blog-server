var jwt = require("jsonwebtoken");

// 生成token
const sign = (clientip = "undefined", clint = "") => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { clientip, clint },//传入加密信息 登陆ip 客户端 用作token验证
            "this.jeffy.key",
            { expiresIn: "130h" }, //过期时间
            (err, token) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(token); //返回生成后的token
            }
        );
    });
};

// 验证token
const verify = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "this.jeffy.key", function(err, decoded) {
            if (err) {
                reject(0);
                return;
            }
            resolve(decoded); //返回解析后的token内容
        });
    });
};

module.exports = {
    sign,
    verify
};
