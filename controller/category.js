const db = require("../db");
const jwt = require("../util/jwt");

// 添加分类
const setCategory = async (ctx, next) => {
  const { token } = ctx.request.header;
  try {
    if (!token) throw new Error(412);
    const detoken = await jwt.verify(token);
  } catch (error) {
    ctx.response.body = { code: 412, msg: "token无效" };
  }
  try {
    const { id, name, alias } = ctx.request.body;
    const sql = `INSERT INTO category (id,category,alias) VALUES ($1,$2,$3)`;
    const setParm = await db.query(sql, [id, name,alias]);
    ctx.response.body = { code: 200, data: setParm, token };
  } catch (error) {
    ctx.response.body = { code: 500, msg: "服务器异常" };
  }
};

module.exports = {
  setCategory
};
