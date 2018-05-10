const uuid = require("../utils/uuid");//uuid

// 添加分类 sql
const SET_CATEGORY = data => {
  const sql = `INSERT INTO "category" (id,category,alias) VALUES ($1,$2,$3)`;
  return [sql, [uuid.v4(), data.name, data.alias]];
};
// 获取分类 sql
const GET_CATEGORY = () => {
  return `SELECT * FROM "category"`;
};

// 删除分类 这里执行的是事物 sql
const DEL_CATEGORY = id => {
  return [[
    'DELETE FROM "category" WHERE id = $1;', //删除分类
    'DELETE FROM "article" WHERE category_id = $1;' //删除对应的article
  ], [[id],[id]]];
};
// 修改分类名sql
const PUT_CATEGORY = data => {
  const sql = `UPDATE "category" SET category = $1, alias = $2 WHERE id = $3`;
  return [sql, [data.name, data.alias, data.id]];
};

module.exports = {
  SET_CATEGORY,
  GET_CATEGORY,
  DEL_CATEGORY,
  PUT_CATEGORY
};
