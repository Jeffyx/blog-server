const uuid = require("../utils/uuid");

// 获取评论列表
const GET_COMMENT = article_id => {
  const sql = `
    SELECT * FROM "comment" WHERE article_id = $1
    `;
  return [sql, [article_id]];
};

const SET_COMMENT = data => {
  const sql = `INSERT INTO "comment" (id,comment,article_id,parent_id,user_id,user_name,client,address,creat_time)
    ($1,$2,$3,$4,$5,$6,$7,$8,$9)`;
  return [
    sql,
    [
      uuid.v4(),
      data.comment,
      data.article_id,
      data.parent_id,
      data.user_id,
      data.user_name,
      data.clint,
      data.clientip,
      Date.now()
    ]
  ];
};

module.exports = {
  GET_COMMENT
};
