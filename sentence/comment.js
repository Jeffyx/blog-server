const uuid = require("../utils/uuid");
const format = require("../utils/format");

// 获取评论列表sql
const GET_COMMENT = article_id => {
  const sql = `SELECT a.id,a.comment,a.article_id,a.parent_id,a.create_time,a.client,a.address,u.user_name AS user_name
  FROM comment a
  LEFT JOIN "user" u ON a.user_id = u.id 
  WHERE article_id = $1
    `;
  return [sql, [article_id]];
};

// add comment sql
const SET_COMMENT = data => {
  const sql = `INSERT INTO "comment" (id,comment,article_id,parent_id,user_id,client,address,create_time)
    ($1,$2,$3,$4,$5,$6,$7,$8)`; //sql
  return [
    sql,
    [
      uuid.v4(),
      data.comment,
      data.article_id,
      data.parent_id,
      data.user_id,
      data.clint,
      data.clientip,
      format('yyyy-MM-dd hh:mm:ss')
    ]
  ];
};

// delete comment sql
const DEL_COMMENT = id =>{
  const sql = `DELETE FROM comment WHERE id = $1`;
  return [sql,[id]]
}

module.exports = {
  GET_COMMENT,
  SET_COMMENT,
  DEL_COMMENT
};
