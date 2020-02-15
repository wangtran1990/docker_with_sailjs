/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful,
 * such as when you deploy to a server, or a PaaS like Heroku.
 *
 * For example:
 *   => `node app.js`
 *   => `npm start`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *
 * The same command-line arguments and env vars are supported, e.g.:
 * `NODE_ENV=production node app.js --port=80 --verbose`
 *
 * For more information see:
 *   https://sailsjs.com/anatomy/app.js
 */


// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
// > Note: This is not required in order to lift, but it is a convenient default.
process.chdir(__dirname);
var mysql = require('mysql');


// Attempt to import `sails` dependency, as well as `rc` (for loading `.sailsrc` files).
var sails;
var rc;
try {
  sails = require('sails');
  rc = require('sails/accessible/rc');
} catch (err) {
  console.error('Encountered an error when attempting to require(\'sails\'):');
  console.error(err.stack);
  console.error('--');
  console.error('To run an app using `node app.js`, you need to have Sails installed');
  console.error('locally (`./node_modules/sails`).  To do that, just make sure you\'re');
  console.error('in the same directory as your app and run `npm install`.');
  console.error();
  console.error('If Sails is installed globally (i.e. `npm install -g sails`) you can');
  console.error('also run this app with `sails lift`.  Running with `sails lift` will');
  console.error('not run this file (`app.js`), but it will do exactly the same thing.');
  console.error('(It even uses your app directory\'s local Sails install, if possible.)');
  return;
}//-•


// Start server
const getConfig = function () {
  sails.load(rc('sails'), () => {
    configConnection = sails.config.datastores['default'];
    var connection = mysql.createConnection({
      host: configConnection.options.host,
      port: configConnection.options.port,
      user: configConnection.user,
      password: configConnection.password,
      database: configConnection.database
    });

    // Load constants stored in DB and replace to existed constants in [sails.config.ecode]
    // Only type = config will be loaded
    // These other ones stored for another purpose (loaded when using)
    connection.query(`SELECT * FROM constants WHERE type = 'config'`, null, (err, arr) => {
      if (err) {
        sails.log.error(err);
        connection.end();
        throw new Error('Cannot load constants' + err);
      }
      connection.end();
      process.env.customConfig = JSON.stringify(arr);
      sails.lower(() => {
        var SailsApp = require('sails').Sails;
        var sails = new SailsApp();
        sails.lift(rc('sails'), () => {
          let modelConnection = sails.config.models.connections;
          global['sequelize'] = SequelizeConnections[modelConnection];
        });
      });
    });
  });
};
if (process.env.NO_CUSTOM_CONFIG === true) {
  sails.lift(rc('sails'), () => {
    let modelConnection = sails.config.models.connections;
    global['sequelize'] = SequelizeConnections[modelConnection];
  });
}
else {
  getConfig();
}
