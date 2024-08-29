const { errors } = require("../config/error");
const { verifyToken } = require("../util/jwt");

exports.checkAuth = function (secretKey) {
  return (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(401).json(errors.UNAUTHORIZED);
    }

    const token = authorization.split(' ')[1]

    const claim = verifyToken(token, secretKey)

    if (claim === null) {
      return res.status(401).json(errors.UNAUTHORIZED);
    }

    req.claim = claim
    next()
  }
}