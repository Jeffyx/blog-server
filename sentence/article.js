const uuid = require("../utils/uuid");

// GET
module.exports = GET_ARTICLE = data => {
  let where = "";
  if (data.category_id) {
    where = `WHERE category_id = '${data.category_id} '`;
  }
  const sql = `SELECT * FROM "article" ${where}LIMIT $1 OFFSET $2`;
  return [sql, [data.total, data.total * (data.page - 1)]];
};
// INSERT
module.exports = INSERT_ARTICLE = data => {
  const sql = `INSERT INTO "article" 
    (id,title,article,category,category_id,creat_time,author)
    VALUES($1,$2,$3,$4,$5,$6,$7)`;
  return [
    sql,
    [
      uuid.v4(),
      data.title,
      data.article,
      data.category,
      data.category_id,
      Date.now(),
      data.author
    ]
  ];
};

// ONE
module.exports = ONE_ARTICLE = id => {
  const sql = `SELCET * FROM "article" WHERE id = $1`;
  return [sql, [id]];
};
// modify
module.exports = MODIFY_ARTICLE = data => {
  const sql = `UPDATE "article" 
    SET title = $1,article = $2,category = $3,category_id = $4,author = $5,modify_time = $6
    WHERE id = $7`;
  return [
    sql,
    [
      data.title,
      data.article,
      data.category,
      data.category_id,
      data.author,
      Date.now(),
      data.id
    ]
  ];
};

// 删除一篇文章
module.exports = DEL_ARTICLE = id => {
  const sql = `DELETE FROM "article" WHERE id = $1`;
  return [sql, [id]];
};
