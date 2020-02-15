'use strict';
const curlify = require('request-as-curl');
/**
 * @module Utilities
 * @desc Internal utilities for programing
 */

/**
 * Log incoming request to curl formatted
 * @param {object} pRequest - the http request object
 * @param {object} pResponse - the http response object
 * @return {null} No return value
 */
function logRequest(pRequest, pResponse) {
  try {
    let data = _.extend({}, pRequest.query, pRequest.body);
    let requestTime = moment.utc();
    let requestSession = uuid();

    sails.log.debug(`:::::::::: START Session: ${requestSession} - At: ${requestTime.format('LLLL')}`);
    sails.log.debug(curlify(pRequest));
    sails.log.debug(`:: BODY ${JSON.stringify(data || '')}`);
    pResponse.task.push(Utils.logResponse.bind(this, requestSession, requestTime));
  } catch (ex) {
    sails.log.error(ex.message);
    sails.log.verbose(ex.stack);
  }

  return;
}

/**
 * Log response before send to client
 * @param {string} pRequestSession - secrect key generated when logging request (to matching request and response)
 * @param {moment} pRequestTime - time at request was logged (use to calculate processes time)
 * @return {null} No return value
 */
function logResponse(pRequestSession, pRequestTime) {
  try {
    let responseTime = moment.utc();
    sails.log.debug(`::::: END Session: ${pRequestSession} - At: ${responseTime.format('LLLL')} - In: ${responseTime - pRequestTime} ms`);
  } catch (ex) {
    sails.log.error(ex.message);
    sails.log.verbose(ex.stack);
  }

  return;
}

module.exports = {
  logRequest,
  logResponse
};
