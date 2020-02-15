'use strict';
const redis = require('ioredis');
const ECODE = sails.config.ecode;
const PREFIX = `PROMOTION:${sails.config.environment.toUpperCase()}`;
let connection = sails.config.custom.redisConnection;
let client = {};
/**
 * @module CacheService
 * @desc Cache service via Redis
 */

/**
 * Connect to Redis DB for first time project init
 * @param {function} done - callback function when done task
 */
function init(done) {
  client = {};
  if (connection.isCluster === true) {
    client = new redis.Cluster([
      {
        host: connection.host,
        port: connection.port
      }
    ]);
  } else {
    client = new redis({
      host: connection.host,
      port: connection.port
    });
  }

  if (connection.password) {
    client.auth(connection.password, (err) => {
      return done(err || null);
    });
  }

  client.on('connect', () => {
    client.select(connection.database, (err) => {
      if (err) {
        sails.log.error('Could not connect to Redis... ' + err);
        return done(err);
      } else {
        sails.log.debug(`Connected to Redis ["${connection.host}"] ....`);
        return done();
      }
    });
  });

  client.on('error', (err) => {
    sails.log.info('Could not connect to Redis... ' + err);
    return done(err);
  });
}

/**
 * Get data storing in Redis Cache by key
 * @param {string} key - unique key to get caching data
 * @param {string} userId - current userId
 * @return {promise} resolved value is data was got (JSON parsed)
 */
function get(key, userId) {
  return new Promise((resolve, reject) => {
    if (userId) {
      key = `${PREFIX}:${userId}:${key}`;
    }
    else {
      key = `${PREFIX}:ALL:${key}`;
    }

    if (!client) {
      sails.log.error('No Redis client');
      reject(false);
    }

    client.get(key)
      .catch((ex) => {
        sails.log.error('[RedisServer.get] ERROR: Could not get... ', ex);
        reject(false);
      })
      .then((val) => {
        try {
          resolve(JSON.parse(val));
        } catch (exp) {
          sails.log.error('[RedisServer.get] parse ERROR: ... ', exp);
          reject(false);
        }
      });
  });
}

/**
 * Set data to Redis Cache
 * @param {string} key - unique keys to store
 * @param {string} value - values to store (no need to JSON.parse before call)
 * @param {int} ttl - time to expires the cache
 * @return {promise} promise.resolve value is TRUE (boolean)
 */
function set(key, userId, value, ttl) {
  return new Promise((resolve, reject) => {
    if (userId) {
      key = `${PREFIX}:${userId}:${key}`;
    }
    else {
      key = `${PREFIX}:ALL:${key}`;
    }

    if (!client) {
      sails.log.error('No Redis client');
      reject(false);
    }

    client.set(key, JSON.stringify(value))
      .catch((ex) => {
        sails.log.error('[RedisServer.set] ERROR: Could not set... ', ex);
        reject(false);
      })
      .then(() => {
        ttl = Number.isInteger(ttl) ? (ttl > ECODE.CACHE_TIME.MAX ? ECODE.CACHE_TIME.MAX : ttl) : ECODE.CACHE_TIME.MIN;
        client.expire(key, parseInt(Math.abs(ttl)));
        resolve(true);
      });
  });
}

/**
 * Delete data storing in Redis Cache by key
 * @param {string} key - unique keys to delete
 * @return {promise} promise.resolve value is TRUE (boolean)
 */
async function del(key, userId) {
  return new Promise((resolve, reject) => {
    if (userId) {
      key = `${PREFIX}:${userId}:${key}`;
    }
    else {
      key = `${PREFIX}:ALL:${key}`;
    }

    if (!client) {
      sails.log.error('No Redis client');
      reject(false);
    }
    client.del(key)
      .catch((ex) => {
        sails.log.error('[RedisServer.del] ERROR: Could not delete... ', ex);
        reject(false);
      })
      .then(() => {
        resolve(true);
      });
  });
}

/**
 * Get all keys storing in Redis Cache
 * @return {promise} promise.resolve value is Object[] {key, ttl}
 */
async function getAllKey() {
  return new Promise((resolve, reject) => {
    if (!client) {
      sails.log.error('No Redis client');
      reject(false);
    }

    let resData = [];
    client.keys(`${PREFIX}*`)
      .then((keys) => {
        async.eachSeries(keys, (key, cbFn) => {
          client.ttl(key)
            .then((ttl) => {
              resData.push({
                key,
                ttl
              });
              return cbFn();
            })
            .catch((ex) => {
              sails.log.error(`[RedisServer.getAllKey] ERROR: Could not get ttl of key ${key}... `, ex);
              resData.push({
                key
              });
              return cbFn();
            });
        },
          () => resolve(resData));
      })
      .catch((ex) => {
        sails.log.error('[RedisServer.getAllKey] ERROR: Could not get list key... ', ex);
        reject(false);
      });
  });
}

module.exports = {
  init,
  get,
  set,
  del,
  getAllKey
};
