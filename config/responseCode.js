module.exports = err => {
  switch (err) {
    case 1:
      return { code: 201, msg: "参数错误" };
      break;
    case 2:
      return { code: 202, msg: "token信息失效" };
      break;
    case 3:
      return { code: 203, msg: "密码错误" };
      break;
    case 4:
      return { code: 204, msg: "用户名不存在" };
      break;
    case 5:
      return { code: 205, msg: "用户名已存在" };
      break;
    default:
      return { code: 500, msg: "服务器出错" };
      break;
  }
};
