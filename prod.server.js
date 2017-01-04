var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();


router.get('/', function(req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

// 从data.json 中获取mock的假数据
var appData = require('./data.json');
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

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
});
