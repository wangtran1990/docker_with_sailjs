'use strict';
const ECODE = sails.config.ecode;
const DEV_ENV = ECODE.DEV_ENVIRONMENT.indexOf(sails.config.environment) > -1;

/**
 * @api {get} /healthCheck Health Check
 * @apiName healthCheck
 * @apiGroup Monitor
 *
 * @apiDescription Praying for the service still alive
 *
 * @apiSuccess {Object} response response data
 * @apiSuccess {Number} response.error  0 = OK / !0 = ERROR
 * @apiSuccess {String} response.message  Just a funny message
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": 0,
 *       "message": "Thank goodness, my service still alive! Let relaxing."
 *     }
 */
function healthCheck (req, res) {
  sequelize.query('SELECT CURRENT_TIME() AS time', { type: sequelize.QueryTypes.SELECT })
    .then((result) => {
      return res.ok({
        error: 0,
        message: `Thank goodness, my service still alive! Let relaxing. DB Time ${JSON.stringify(result[0].time)}`
      });
    })
    .catch((error) => {
      sails.log.error(error);
      return res.serverError({
        error: 1,
        message: `Cannot connect to DB. ERROR ${error}`
      });
    });
}

/**
 * @api {get} /variables Environment variables
 * @apiName environmentVariables
 * @apiGroup Monitor
 *
 * @apiDescription Show all Sailsjs environment variables (ONLY can uses in development env)
 *
 * @apiSuccess {Object} response response data
 * @apiSuccess {Number} response.error  0 = OK / !0 = ERROR
 * @apiSuccess {Object} response.message  All environment variables of sails
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "error": 0,
 *       "message": {}
 *     }
 */
function environmentVariables (req, res) {
  return res.ok({
    error: 0,
    message: DEV_ENV ? sails : 'PRODUCTION'
  });
}

/**
 * @api {get} /getAllCache Show all caching data
 * @apiName getAllCache
 * @apiGroup Monitor
 *
 * @apiDescription Show all cache keys still not expired (ONLY can uses in development env)
 *
 * @apiSuccess {Object[]} response  response data
 * @apiSuccess {String} response.key  Cache key
 * @apiSuccess {String} response.ttl  Cache remaining time of the corresponding key (in milisecond)
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "key": xxx,
 *         "ttl": 123
 *       }
 *     ]
 */
async function getAllCache (req, res) {
  var cacheData = {};
  try {
    if (DEV_ENV) {
      cacheData = await CacheService.getAllKey();
    }
  } catch (error) {
    sails.log.error(error.message);
    sails.log.verbose(error.stack);
  }
  return res.ok(cacheData);
}

module.exports = {
  healthCheck,
  environmentVariables,
  getAllCache
};
