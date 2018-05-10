var jwt = require("jsonwebtoken");

const sign = (clientip = "undefined", clint = "") => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { clientip, clint },
            "this.jeffy.key",
            { expiresIn: "130h" },
            (err, token) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(token);
            }
        );
    });
};

const verify = token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, "this.jeffy.key", function(err, decoded) {
            console.log("jwe", decoded); // bar
            if (err) {
                reject(0);
                return;
            }
            resolve(decoded);
        });
    });
};

module.exports = {
    sign,
    verify
};
