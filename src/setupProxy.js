const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(proxy('/ota-api', { target: 'http://newotadev.happyeasygo.com', changeOrigin: true }));
};