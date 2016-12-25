var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// 从data.json 中获取mock的假数据
var appData = require('../data.json');
var seller = appData.seller; // 商家信息
var goods = appData.goods; // 商品信息
var ratings = appData.ratings; // 评论信息

//  定义获取数据的接口
var apiRoutes = express.Router();

// 商家信息接口
apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

// 商品信息接口
apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

// 评论信息接口
apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', apiRoutes);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
