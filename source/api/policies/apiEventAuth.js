const ECODE = sails.config.ecode;
const MESSAGES = sails.config.messages;

module.exports = (req, res, next) => {
  // apiEventAuthen using for Fim+'s partners communicate with Fim+
  // NOT for internal using

  let resData = {};
  let apiKey = req.headers['api-key'];

  if (!apiKey || apiKey !== ECODE.PROMOTION_EVENT_KEY) {
    return Response.Error(req, res, MESSAGES['1003'], ECODE.HTTP_STATUS_CODE.FORBIDDEN, resData, 1003);
  }
  return next();
};
