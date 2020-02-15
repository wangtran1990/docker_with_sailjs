/**
 * Global Variable Configuration
 * (sails.config.globals)
 *
 * Configure which global variables which will be exposed
 * automatically by Sails.
 *
 * For more information on any of these options, check out:
 * https://sailsjs.com/config/globals
 */
moment = require('moment');
uuid = require('uuid/v4');
request = require('request');

module.exports.globals = {
  _: require('@sailshq/lodash'),
  async: require('async'),
  moment: true,
  models: true,
  sails: true,
  uuid: true,
  request: true,
};
