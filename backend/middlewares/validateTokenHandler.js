const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateTokenHandler = asyncHandler(async (req, res, next) => {
  let token = req.cookies?._token;

  if(!token) {
    res.status(401);
    throw new Error('Token not found');
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
    req.user = decoded.user;
    next();
  });
});

module.exports = validateTokenHandler;