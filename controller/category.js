const db = require("../db");
const detoken = require("../utils/detoken");
const uuid = require("../utils/uuid");
const {
  SET_CATEGORY,
  GET_CATEGORY,
  DEL_CATEGORY,
  PUT_CATEGORY
} = require("../sentence/category");

// 添加分类
const setCategory = async (ctx, next) => {
  const { token } = ctx.request.header;
  await detoken(token);
  const { name, alias } = ctx.request.body;
  if (!(name && alias)) throw 1;
  await db.query(...SET_CATEGORY({ name, alias }));
  ctx.response.body = { code: 200, msg: "执行成功" };
};
// 获取分类
const getCategory = async (ctx, next) => {
  const result = await db.query(GET_CATEGORY());
  ctx.response.body = { code: 200, msg: "查询成功", data: result.rows };
};

// 删除分类
const delCategory = async (ctx, next) => {
  const { token } = ctx.request.header;
  await detoken(token);
  const { id } = ctx.request.body;
  if (!id) throw 1;
  const PARM = DEL_CATEGORY(id);
  await db.query(...PARM);
  ctx.response.body = { code: 200, msg: "删除成功" };  
};
// 修改分类名
const putCategory = async (ctx, next) => {
  const { token } = ctx.request.header;
  await detoken(token);
  const { id, name, alias } = ctx.request.body;
  if (!(id && name && alias)) throw 1;
  await db.query(...PUT_CATEGORY({ id, name, alias }));
  ctx.response.body = { code: 200, msg: "修改成功" };
};

module.exports = {
  setCategory,
  getCategory,
  delCategory,
  putCategory
};
