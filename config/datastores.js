/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {
  // protocol://user:password@host:port/database
  // adapter: 'sails-mysql',
  // url: 'mysql://sand_promotion:Fimplus1234!@#@10.10.11.252:3306/fimplus_promotion'
  default: {
    database: 'dev',
    user: 'admin',
    password: '1111111111',
    options: {
      host: 'public-dev.csunlwyshe2s.ap-southeast-1.rds.amazonaws.com',
      dialect: 'mysql',
      port: 3306,
      logging: 'info',
      pool: {
        maxConnections: 10,
        minConnections: 1,
        maxIdleTime: 3600000
      }
    }
  }
};
