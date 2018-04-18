const db = require("../db");
const jwt = require("../util/jwt");
const uuid = require("../util/uuid");
const detoken = require("../util/detoken");

// 用户登录
const login = async (ctx, next) => {
  try {
    const { user_name, password } = ctx.request.query;
    const sql = `SELECT * FROM "user" WHERE user_name = $1`;
    const userInfo = await db.query(sql, [user_name]);
    if (userInfo.rowCount == 0) {
      ctx.response.body = { code: 400, msg: "用户名不存在" };
      return;
    }
    if (userInfo.rows[0].password != password) {
      ctx.response.body = { code: 400, msg: "密码错误" };
      return;
    }
    const token = await jwt.sign();
    ctx.response.body = {
      code: 200,
      msg: "登录成功",
      token,
      data: userInfo.rows
    };
  } catch (error) {
    ctx.response.body = { code: 500, msg: "服务器错误" };
  }
};
// 用户注册
const register = async (ctx, next) => {
  try {
    const { user_name, password } = ctx.request.body;
    const sql = `INSERT INTO "user" ("id",user_name,password,creat_time,lv) VALUES ($1,$2,$3,$4,$5)`;
    const result = await db.query(sql, [
      uuid.v4(),
      user_name,
      password,
      Date.now(),
      3
    ]);
    ctx.response.body = { code: 200, msg: "注册成功" };
  } catch (error) {
    ctx.response.body = { code: 500, msg: "服务器繁忙，请稍后再试" };
  }
};
// 修改用户信息
const modify = async (ctx, next) => {
  try {
    const { token } = ctx.request.header;
    await detoken(token); //验证Token
    const data = ctx.request.body;
    if (!data.id) await Promise.reject(1);
    const sql = `UPDATE "user" 
        SET phone = $1, address = $2, head = $3, email = $4, nick = $5
        WHERE id = $6`;
    const result = await db.query(sql, [
      data.phone,
      data.address,
      data.head,
      data.email,
      data.nick
    ]);
    ctx.response.body = { code: 200, msg: "修改成功" };
  } catch (error) {
    let msg = "服务器错误",
      code = 500;
    if (error === 12) {
      msg = "登录信息失效";
      code = 402;
    }
    if (error === 1) msg = "参数错误";
    ctx.response.body = { code, msg };
  }
};
// 修改密码
const modifyPwd = async (ctx, next) => {
  try {
    const data = ctx.request.body;
    for (const val of data) {
      if (!val) await Promise.reject(1);
    }
    const { user_name, oldpwd, newpwd } = data;
    const pwd_sql = `SELECT "password" FROM "user" WHERE user_name = $1`;
    const pwd_res = await db.query(pwd_sql, [user_name]);
    if (pwd_res.length == 0) await Promise.reject(2);
    if (pwd_res[0].password != oldpwd) await Promise.reject(3);
    const mod_sql = `UPDATE "user" SET password = $1 WHERE user_name = $2`;
    const mod_res = await db.query(mod_sql, [newpwd, user_name]);
    ctx.response.body = { code: 200, msg: "修改成功" };
  } catch (error) {
    let msg = "服务器错误";
    if (error === 1) msg = "参数错误";
    if (error === 2) msg = "用户名不存在";
    if (error === 3) msg = "原密码错误";
    ctx.response.body = { code: 500, msg };
  }
};

module.exports = {
  login,
  register,
  modify,
  modifyPwd
};
