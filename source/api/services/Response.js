const ECODE = sails.config.ecode;
/**
 * @module Response
 * @desc Express HTTP response wrapper
 */

/**
 * Success response wrapper - HTTP status 2xx
 * @param  {Object} req - request object
 * @param  {Object} res - response object
 * @param  {Object} data - response data
 * @param  {String} message - response message
 * @param  {Int} statusCode - http response status
 * @return {Response} server response
 */
function Success(req, res, data = {}, message = '', statusCode = ECODE.HTTP_STATUS_CODE.SUCCESS) {
  response = {
    error   : 0,
    data    : data,
    message : message ? localizeResultMessage(req, message) : ''
  };
  return res.status(statusCode).json(response);
}

/**
 * Server error response wrapper - HTTP status 5xx
 * @param  {Object} req - request object
 * @param  {Object} res - response object
 * @param  {String} message - response message
 * @param  {Int} statusCode - http response status
 * @param  {Object} data - response data
 * @param  {Int} error - error code
 * @return {Response} server response
 */
function Error(req, res, message = '', statusCode = ECODE.HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR, data = {}, error = 1) {
  response = {
    error   : error,
    data    : data,
    message : message ? localizeResultMessage(req, message) : ''
  };
  return res.status(statusCode).json(response);
}

/**
 * Localization response message via [accept-language] header
 * @param  {Object} req - request object
 * @param  {String} message - response message
 * @return {String} localized message
 */
function localizeResultMessage(req, message) {
  const locale = req.headers['accept-language'];
  if (message && locale && sails.config.i18n.locales.indexOf(locale) > -1) {
    sails.hooks.i18n.setLocale(locale);
    message = sails.__(message);
    sails.hooks.i18n.setLocale(sails.config.i18n.defaultLocale);
  }
  return message;
}

module.exports = {
  Success,
  Error,
  localizeResultMessage
};
