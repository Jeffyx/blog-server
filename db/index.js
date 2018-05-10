const { Pool, Client } = require("pg");
const config = require("../config/dbConfig");

const pool = new Pool(config);

// 事物 transactions
const transactions = (text, param) => {
  return new Promise((resolve, reject) => {
    (async () => {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        for (let index = 0; index < text.length; index++) {
          await client.query(text[index], param[index]);
        }
        await client.query("COMMIT");
        resolve(1);
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
        reject(0);
      } finally {
        client.release();
      }
    })().catch(e => console.error(e.stack));
  });
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  transactions
};
