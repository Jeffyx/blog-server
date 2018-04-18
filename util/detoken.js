const jwt = require("./jwt");

module.exports = async token => {
  try {
    if (!token) throw new Error(12);
    const detoken = await jwt.verify(token);
    return Promise.resolve(detoken);
  } catch (error) {
    return Promise.reject(12);
  }
};
