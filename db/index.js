const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  database: "BLOG_CMS",
  password: "hellojsung",
  port: 5432
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
