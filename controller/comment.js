const db = require("../db");
const detoken = require("../utils/detoken");
const getClint = require("../utils/getClint");
const { GET_COMMENT, SET_COMMENT } = require("../sentence/comment");

const getComment = async (ctx, next) => {
  const { article_id } = ctx.query;
  if (!article_id) throw 1;
  const res = await db.query(...GET_COMMENT(article_id));
  ctx.body = { code: 200, msg: "ok", data: res.rows };
};

const setComment = async (ctx, next) => {
  const keys = "article_id,user_id,user_name,comment".split(",");
  for (const iterator of keys) {
    if (!iterator) throw 1;
  }
  const {
    article_id,
    user_id,
    user_name,
    comment,
    parent_id = ""
  } = ctx.request.body;
  const userAgent = ctx.header["user-agent"];
  const { clientip } = ctx.header;
  const clint = getClint(userAgent);
  const param = SET_COMMENT({
    article_id,
    user_id,
    user_name,
    comment,
    parent_id,
    clint,
    clientip
  });
  await db.query(...param);
  ctx.body = { code: 200, msg: "ok" };
};

module.exports = {
  getComment
};
