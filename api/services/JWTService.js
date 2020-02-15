const jwt = require('jsonwebtoken');
const ECODE = sails.config.ecode;
/**
 * @module JWTService
 * @desc Json web token service provider
 */

/**
 * Verify JWT Token with secret key
 * @param  {string} token
 * @return {promise} resolved value is a data stored in Token
 */
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, ECODE.JWT_CONFIG.SECRET_KEY, (err, obj) => {
      if (err) {
        sails.log.error('Invalid token');
        return reject(false);
      }
      delete obj.iat;
      delete obj.exp;
      resolve(obj);
    });
  });
}

/**
 * Generate JWT Token
 * @param  {string} serviceName
 * @return {promise} resolved value is a Token
 */
function createToken(serviceName) {
  return new Promise((resolve, reject) => {
    jwt.sign({
      serviceName
    },
      ECODE.JWT_CONFIG.SECRET_KEY, {
        expiresIn: ECODE.JWT_CONFIG.EXPIRED_TIME
      }, (err, token) => {
        if (err) { return reject(err); }
        resolve(token);
      });
  });
}

module.exports = {
  verifyToken,
  createToken
};
