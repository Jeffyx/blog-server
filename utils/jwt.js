var jwt = require("jsonwebtoken");

const sign = () => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: "foobar" },
      "jeffy",
      { expiresIn: "30h" },
      (err, token) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      }
    );
  });
};

const verify = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "jeffy", function(err, decoded) {
      console.log('jwe',decoded); // bar
      if (err) {
        reject(err.message);
        return;
      }
      resolve(decoded.data);
    });
  });
};

module.exports = {
  sign,
  verify
}