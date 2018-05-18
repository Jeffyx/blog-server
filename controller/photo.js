const db = require("../db");
const xss = require("../utils/xss");
const { INSERT_PHOTO, FIND_PHOTOLIST,DEL_PHOTO } = require("../sentence/photo");

const insertPhoto = async (ctx, next) => {
    const info = ctx.request.body;
    info.src = xss(JSON.stringify(info.src));
    const str = "src,remark,title,user_id".split(",");
    for (const key in str) {
        if (!str[key]) throw 1;
    }
    const res = await db.query(...INSERT_PHOTO(info));
    ctx.body = { code: 200, msg: "ok" };
};

const findPhoto = async (ctx, next) => {
    const { user_id = undefined, id = undefined } = ctx.query;
    const res = await db.query(...FIND_PHOTOLIST({user_id,id}));
    ctx.body = { code: 200, msg: "ok", data: res.rows };
};

const deletePhoto = async (ctx,next)=>{
    const {id} = ctx.request.body;
    if(!id) throw 1;
    await db.query(...DEL_PHOTO(id))
    ctx.body = {code:200,msg:'ok'}
}

export default {
    insertPhoto,
    findPhoto,
    deletePhoto
};
