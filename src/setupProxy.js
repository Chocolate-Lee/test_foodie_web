const proxy = require('http-proxy-middleware');
console.log('setupProxy')
module.exports = function (app) {
  app.use(proxy('/webapi', { 
    target: 'http://localhost:8080',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
     "^/webapi": "/"
    },
   }));
}