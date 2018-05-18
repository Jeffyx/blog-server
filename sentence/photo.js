const uuid = require("../utils/uuid"); //uuid
const format = require("../utils/format");

const INSERT_PHOTO = info => {
    const sql = `INSERT INTO photo SET (id,src,remark,title,create_time,user_id)
    VALUES ($1,$2,$3,$4,$5,$6)`;
    return [
        sql,
        [
            uuid.v4(),
            info.src,
            info.remark,
            info.title,
            info.create_time,
            info.user_id
        ]
    ];
};

const FIND_PHOTOLIST = data => {
    let where = '';
    if(data.id&&(!data.user_id)){
        where = `WHERE p.id = '${data.id}'`
    }else if(data.user_id&&(!data.id)){
        where = `WHERE p.user_id = '${data.user_id}'`
    }
    const sql = `SELECT p.id,p.src,p.title,p.remark,p.user_id,p.create_time,u.name AS author FROM photo p LEFT JOIN user u ON id = p.user_id '${where}'`;
    return [sql]
}

const DEL_PHOTO = id =>{
    const sql = `DELETE FROM photo WHERE id = $1`;
    return [sql,[id]]
}

module.exports = {
    INSERT_PHOTO,
    FIND_PHOTOLIST,
    DEL_PHOTO
}