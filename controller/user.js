const db = require("../db");
const jwt = require("../utils/jwt");
const getClint = require("../utils/getClint");
const {
    GET_INFO,
    USER_REG,
    USER_MODIFY,
    MODIFY_PWD_GET,
    MODIFY_PWD_UPDATE
} = require("../sentence/user");

// 用户登录
const login = async (ctx, next) => {
    const userAgent = ctx.header["user-agent"];
    const { clientip } = ctx.header;
    const clint = getClint(userAgent);
    const { user_name, password } = ctx.request.body;
    const userInfo = await db.query(...GET_INFO(user_name));
    if (userInfo.rowCount == 0) throw 4;
    if (userInfo.rows[0].password != password) throw 3;
    delete userInfo.rows[0].password;
    const token = await jwt.sign(clientip, clint);
    ctx.response.body = {
        code: 200,
        msg: "登录成功",
        token,
        data: userInfo.rows
    };
};
// 用户注册
const register = async (ctx, next) => {
    const { user_name, password } = ctx.request.body;
    if (!(user_name && password)) throw 1;
    const findUser = await db.query(...GET_INFO(user_name));
    if (findUser.rowCount > 0) throw 5;
    const pram = USER_REG({ user_name, password });
    await db.query(...pram);
    const userAgent = ctx.header["user-agent"];
    const { clientip } = ctx.header;
    const clint = getClint(userAgent);
    const token = await jwt.sign(clientip, clint);
    const _res = await db.query(...GET_INFO(user_name));
    delete _res.rows[0].password
    ctx.response.body = { code: 200, msg: "注册成功", token, data: _res.rows };
};
// 单独查用户信息的
const getOneUserInfo = async (ctx, next) => {
    const { user_name } = ctx.request.body;
    if (!user_name) throw 1;
    const userInfo = await db.query(...GET_INFO(user_name));
    delete userInfo.rows[0].password
    ctx.response.body = { code: 200, msg: "ok", data: userInfo.rows };
};
// 修改用户信息
const modify = async (ctx, next) => {
    const data = ctx.request.body;
    if (!data.id) throw 1;
    await db.query(...USER_MODIFY(data));
    ctx.response.body = { code: 200, msg: "修改成功" };
};
// 修改密码
const modifyPwd = async (ctx, next) => {
    const data = ctx.request.body;
    for (const key in data) {
        if (!data[key]) throw 1;
    }
    const { user_name, oldpwd, newpwd } = data;
    const pwd_res = await db.query(...MODIFY_PWD_GET(user_name));
    if (pwd_res.rowCount == 0) throw 4;
    if (pwd_res.rows[0].password != oldpwd) throw 3;
    await db.query(...MODIFY_PWD_UPDATE({ user_name, newpwd }));
    ctx.response.body = { code: 200, msg: "修改成功" };
};

module.exports = {
    login,
    register,
    modify,
    modifyPwd,
    getOneUserInfo
};
