const ECODE = sails.config.ecode;
const MESSAGES = sails.config.messages;

module.exports = async function (req, res, next) {
  // apiAuth using only for internal Fim+ servers

  const resData = {};
  const token = req.headers['api-key'];
  try {
    if (!token) {
      return Response.Error(req, res, MESSAGES['1003'], ECODE.HTTP_STATUS_CODE.FORBIDDEN, resData, 1003);
    }

    const payload = await JWTService.verifyToken(token);
    if (!payload) {
      return Response.Error(req, res, MESSAGES['1003'], ECODE.HTTP_STATUS_CODE.FORBIDDEN, resData, 1003);
    }

    const findServiceAuth = ECODE.SERVICE_AUTH.find(service => service.SERVICE_NAME === payload.serviceName);
    if (!findServiceAuth) {
      return Response.Error(req, res, MESSAGES['1003'], ECODE.HTTP_STATUS_CODE.FORBIDDEN, resData, 1003);
    }

    return next();
  } catch (error) {
    sails.log.error('[apiAuth] Exception: ', error.messages);
    sails.log.verbose(error.stack);
    return Response.Error(req, res, MESSAGES['1003'], ECODE.HTTP_STATUS_CODE.FORBIDDEN, resData, 1003);
  }
};
