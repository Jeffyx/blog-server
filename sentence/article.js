const uuid = require("../utils/uuid"); //uuid
const format = require("../utils/format");
// get article list sql
const GET_ARTICLE = data => {
    let where = "";
    if (data.category_id) {
        where = `WHERE a.category_id = '${data.category_id}'`;
    }
    // select article table
    const sql = `SELECT a.id,a.title,a.abstract,a.category_id,c.category AS category,a.create_time,a.modify_time,a.author,(SELECT count(*) FROM "comment" WHERE article_id = a.id) AS m_count FROM article a LEFT JOIN category c ON a.category_id = c.id ${where} LIMIT $1 OFFSET $2`;

    return [sql, [data.total, data.total * (data.page - 1)]];
};
// INSERT article sql
const INSERT_ARTICLE = data => {
    const sql = `INSERT INTO "article" (id,title,article,category_id,create_time,author,abstract) VALUES($1,$2,$3,$4,$5,$6,$7)`;
    return [
        sql,
        [
            uuid.v4(), //id
            data.title,
            encodeURIComponent(data.article),
            data.category_id,
            format("yyyy-MM-dd hh:mm:ss"), //date
            data.author,
            data.abstract
        ]
    ];
};

// get article detail sql
const ONE_ARTICLE = id => {
    const sql = `SELECT a.id,a.title,a.article,a.abstract,a.category_id,c.category AS category,a.create_time,a.modify_time,a.author 
  FROM article a,category c
  WHERE a.category_id = c.id AND a.id = $1`;
    return [sql, [id]];
};
// modify article sql
const MODIFY_ARTICLE = data => {
    const sql = `UPDATE "article" 
    SET title = $1,article = $2,category_id = $3,author = $4,modify_time = $5,abstract = $6
    WHERE id = $7`;
    return [
        sql,
        [
            data.title,
            data.article,
            data.category_id,
            data.author,
            format("yyyy-MM-dd hh:mm:ss"),
            data.abstract,
            data.id
        ]
    ];
};

// delete one article sql
const DEL_ARTICLE = id => {
    const sql = `DELETE FROM "article" WHERE id = $1`;
    return [sql, [id]];
};

module.exports = {
    GET_ARTICLE,
    INSERT_ARTICLE,
    ONE_ARTICLE,
    MODIFY_ARTICLE,
    DEL_ARTICLE
};
