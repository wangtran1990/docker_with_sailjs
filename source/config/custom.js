/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  // redisConnection: {
  //   port: 6379,
  //   host: 'redis.fimplus-sandbox.io',
  //   password: null,
  //   database: 12,
  //   isCluster: false,
  //   envPrefix: 'dev',
  //   options: {
  //     parser: 'hiredis'
  //   }
  // },
  redisConnection: {
    port: 6379,
    host: 'dev.omo47e.0001.apse1.cache.amazonaws.com',
    password: null,
    database: 0,
    isCluster: false,
    envPrefix: 'dev',
    options: {
      parser: 'hiredis'
    }
  }
};
