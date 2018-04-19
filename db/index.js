const { Pool, Client } = require("pg");
const config = require("../config/dbConfig");

const pool = new Pool(config);

module.exports = {
  query: (text, params) => pool.query(text, params)
};