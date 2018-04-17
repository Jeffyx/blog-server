const db = require("../db");
const jwt = require("../util/jwt");
const uuid = require("../util/uuid");
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

const modify = async (ctx, next) => {
    
};

module.exports = {
  login,
  register,
  modify
};
