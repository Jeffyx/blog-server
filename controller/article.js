const db = require("../db");
const xss = require("../utils/xss");
const { GET_COMMENT } = require("../sentence/comment");
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
    const { id } = ctx.request.query;
    if (!id) throw 1;
    const [article, comment] = await Promise.all([
        db.query(...ONE_ARTICLE(id)),
        db.query(...GET_COMMENT(id))
    ]);
    // 解码
    ctx.response.body = {
        code: 200,
        msg: "成功",
        data: { article: article.rows, comment: comment.rows }
    };
};
// 写入文章
const insertArticle = async (ctx, next) => {
    const info = ctx.request.body;
    // xss过滤
    info.article = xss(info.article);
    const key = "title,article,category_id,author,abstract".split(",");
    for (const v of key) {
        if (!info[v]) throw 1;
    }
    await db.query(...INSERT_ARTICLE(info));
    ctx.response.body = { code: 200, msg: "ok" };
};
// 修改文章
const modifyArticle = async (ctx, next) => {
    const info = ctx.request.body;
    const key = "id,title,article,category_id,author,abstract".split(",");
    for (const v of key) {
        if (!info[v]) throw 1;
    }
    await db.query(...MODIFY_ARTICLE(info));
    ctx.response.body = { code: 200, msg: "ok" };
};
// 删除一个文章
const delArticle = async (ctx, next) => {
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
