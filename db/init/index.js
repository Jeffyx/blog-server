const db = require('../index');
const Create_sql = require('./dbCreate');

const CreatAllTable = async ()=>{
    for (let key in Create_sql) {
        try {
            await db.query(Create_sql[key]);
        } catch (error) {
            throw error
        }
    }
}


CreatAllTable();
