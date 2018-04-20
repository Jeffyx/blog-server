const db = require("../db");
const jwt = require("../utils/jwt");
const detoken = require("../utils/detoken");
const {
  USER_LOGIN,
  USER_REG,
  USER_MODIFY,
  MODIFY_PWD_GET,
  MODIFY_PWD_UPDATE
} = require("../sentence/user");

// 用户登录
const login = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  const userInfo = await db.query(...USER_LOGIN(user_name));
  if (userInfo.rowCount == 0) throw 4;
  if (userInfo.rows[0].password != password) throw 3;
  const token = await jwt.sign();
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
  const findUser = await db.query(...USER_LOGIN(user_name));
  if (findUser.rowCount > 0) throw 5;
  const pram = USER_REG({ user_name, password });
  await db.query(...pram);
  ctx.response.body = { code: 200, msg: "注册成功" };
};
// 修改用户信息
const modify = async (ctx, next) => {
  const { token } = ctx.request.header;
  await detoken(token); //验证Token
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
  modifyPwd
};
