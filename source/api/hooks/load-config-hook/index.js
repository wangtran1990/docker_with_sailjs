module.exports = function loadConfigHook(sails) {
  if (process.env.hasOwnProperty('customConfig')) {
    arr = JSON.parse(process.env.customConfig);
    for (var i in arr) {
      try {
        sails.config['ecode'][arr[i].key] = JSON.parse(arr[i].value);
      } catch (error) {
        sails.log.error(error);
      }
    }
  }
  return {};
};


