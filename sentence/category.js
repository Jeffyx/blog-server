const uuid = require("../utils/uuid");

// 添加分类
module.exports = SET_CATEGORY = data => {
  const sql = `INSERT INTO category (id,category,alias) VALUES ($1,$2,$3)`;
  return [sql, [uuid.v4(), data.name, data.alias]];
};
// 获取分类
module.exports = GET_CATEGORY = ()=>{
    return `SELECT * FROM "category"`
}

// 删除分类
module.exports = DEL_CATEGORY = (id)=>{
    const delcg = `DELETE FROM "category" WHERE id = $1`;
    const delat = `DELETE FROM "article" WHERE category_id = $1`;
    return {
        CG:[delcg, [id]],
        AT:[delat, [id]]
    }
}
// 修改分类名
module.exports = PUT_CATEGORY = data =>{
    const sql = `UPDATE "category" SET category = $1, alias = $2 WHERE id = $3`;
    return [sql, [data.name, data.alias, data.id]]
}