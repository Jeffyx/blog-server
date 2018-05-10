const uuid = require("../utils/uuid");
const format = require("../utils/format")

// 用户登录
const GET_INFO = name => {
  const sql = `SELECT id,user_name,password,create_time,phone,address,head,email,nick,lv FROM "user" WHERE user_name = $1`;
  return [sql, [name]];
};


// 用户注册
const USER_REG = data => {
  const sql = `INSERT INTO "user" ("id",user_name,password,create_time,lv) VALUES ($1,$2,$3,$4,$5)`;
  return [sql, [uuid.v4(), data.user_name, data.password, format('yyyy-MM-dd'), 3]];
};
// 修改信息
const USER_MODIFY = data => {
  const sql = `UPDATE "user" 
        SET phone = $1, address = $2, head = $3, email = $4, nick = $5
        WHERE id = $6`;
  return [sql, [data.phone, data.address, data.head, data.email, data.nick,data.id]];
};
// 修改密码 GET
const MODIFY_PWD_GET = user_name => {
  const pwd_sql = `SELECT "password" FROM "user" WHERE user_name = $1`;
  return [pwd_sql, [user_name]];
};
// 修改密码 UPDATE
const MODIFY_PWD_UPDATE = data => {
  const mod_sql = `UPDATE "user" SET password = $1 WHERE user_name = $2`;
  return [mod_sql, [data.newpwd, data.user_name]];
};
// 

module.exports = {
  GET_INFO,
  USER_REG,
  USER_MODIFY,
  MODIFY_PWD_GET,
  MODIFY_PWD_UPDATE
}