const jwt = require("../util/jwt");
module.exports = async (ctx,next) => {
  ctx.response.body = {code:412,msg:'err'}
  console.log('123')
  next(1232)
  return ;
  try {
    const detoken = await jwt.verify(token);
  } catch (error) {
  }
};
