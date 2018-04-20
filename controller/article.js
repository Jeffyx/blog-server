const db = require("../db");
const detoken = require("../utils/detoken");
const {
  GET_ARTICLE,
  INSERT_ARTICLE,
  ONE_ARTICLE,
  MODIFY_ARTICLE,
  DEL_ARTICLE
} = require("../sentence/article");

// 获取文章列表
const getArticle = async (ctx, next) => {
  const { category_id = undefined, total = 10, page = 1 } = ctx.request.query;
  const item = GET_ARTICLE({ category_id, total, page });
  const result = await db.query(...item);
  ctx.response.body = { code: 200, msg: "成功", data: result.rows };
};
// 获取单个文章
const oneArticle = async (ctx, next) => {
  // const { token } = ctx.request.header;
  // await detoken(token); //验证Token
  const { id } = ctx.request.query;
  if (!id) throw 1;
  const res = await db.query(...ONE_ARTICLE(id));
  ctx.response.body = { code: 200, msg: "成功", data: res.rows };
};
// 写入文章
const insertArticle = async (ctx, next) => {
  const { token } = ctx.request.header;
  await detoken(token); //验证Token
  const info = ctx.request.body;
  const key = "title,article,category,category_id,author".split(",");
  for (const v of key) {
    if (!info[v]) throw 1;
  }
  await db.query(...INSERT_ARTICLE(info));
  ctx.response.body = { code: 200, msg: "ok" };
};
// 修改文章
const modifyArticle = async (ctx, next) => {
  const { token } = ctx.request.header;
  await detoken(token); //验证Token
  const info = ctx.request.body;
  const key = "id,title,article,category,category_id,author".split(",");
  for (const v of key) {
    if (!info[v]) throw 1;
  }
  await db.query(...MODIFY_ARTICLE(info));
  ctx.response.body = { code: 200, msg: "ok" };
};
// 删除一个文章
const delArticle = async (ctx, next) => {
  const { token } = ctx.request.header;
  await detoken(token); //验证Token
  const { id } = ctx.request.body;
  if (!id) throw 1;
  await db.query(...DEL_ARTICLE(id));
  ctx.response.body = { code: 200, msg: "ok" };
};

module.exports = {
  getArticle,
  oneArticle,
  insertArticle,
  delArticle,
  modifyArticle
};
