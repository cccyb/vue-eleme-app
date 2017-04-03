var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
	req.url = '/index.html';
	next();
});

app.use(router);

var seller = require('./static/seller.json');
var goods = require('./static/goods.json');
var ratings = require('./static/ratings.json');

var apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
  res.json(seller);
});

apiRoutes.get('/goods', function (req, res) {
  res.json(goods);
});

apiRoutes.get('/ratings', function (req, res) {
  res.json(ratings);
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:' + port + '\n');
});
