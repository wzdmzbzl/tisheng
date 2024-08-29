const jwt = require("jsonwebtoken");

exports.generateToken = function (payload, secretKey, expiresIn) {
  return jwt.sign(payload, secretKey, {expiresIn})
}

exports.verifyToken = function (token, secretKey) {
  try {
    const claim = jwt.verify(token, secretKey)
    return claim
  } catch (error) {
    return null
  }
}