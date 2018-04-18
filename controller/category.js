const db = require("../db");
const jwt = require("../util/jwt");
const detoken = require("../util/detoken");
const uuid = require("../util/uuid");

// 添加分类
const setCategory = async (ctx, next) => {
  try {
    const { token } = ctx.request.header;
    await detoken(token);
    const { name, alias } = ctx.request.body;
    if (!(name && alias)) await Promise.reject(1);
    const sql = `INSERT INTO category (id,category,alias) VALUES ($1,$2,$3)`;
    const setParm = await db.query(sql, [uuid.v4(), name, alias]);
    ctx.response.body = { code: 200, msg: "执行成功" };
  } catch (error) {
    let msg = "服务器异常",
      code = 500;
    if (error === 12) {
      msg = "token失效";
      code = 402;
    }
    if (error === 1) msg = "参数错误";
    ctx.response.body = { code, msg };
  }
};
// 获取分类
const getCategory = async (ctx, next) => {
  try {
    const sql = `SELECT * FROM "category"`;
    const result = await db.query(sql);
    ctx.response.body = { code: 200, ms: "查询成功", data: result };
  } catch (error) {
    ctx.response.body = { code: 500, msg: "服务器错误" };
  }
};

// 删除分类
const delCategory = async (ctx, next) => {
  try {
    const { token } = ctx.request.header;
    await detoken(token);
    const { id } = ctx.request.body;
    if (!id) await Promise.reject(1);
    const delcg = `DELETE FROM "category" WHERE id = $1`;
    const res1 = await db.query(delcg, [id]);
    const delat = `DELETE FROM "article" WHERE category_id = $1`;
    const res2 = await db.query(delat, [id]);
  } catch (error) {
    let msg = "服务器异常",
      code = 500;
    if (error === 12) {
      msg = "token失效";
      code = 402;
    }
    if (error === 1) msg = "参数错误";
    ctx.response.body = { code, msg };
  }
};

const putCategory = async (ctx, next) => {
  try {
    const { token } = ctx.request.header;
    await detoken(token);
    const { id, name, alias } = ctx.request.body;
    if (!(id && name && alias)) await Promise.reject(1);
    const sql = `UPDATE "category" SET category = $1, alias = $2 WHERE id = $3`;
    const res = await db.query(sql,[name,alias,id]);
    ctx.response.body = {code:200,msg:"修改成功"}
  } catch (error) {
    let msg = "服务器异常",
      code = 500;
    if (error === 12) {
      msg = "token失效";
      code = 402;
    }
    if (error === 1) msg = "参数错误";
    ctx.response.body = { code, msg };
  }
};

module.exports = {
  setCategory,
  getCategory,
  delCategory,
  putCategory
};
