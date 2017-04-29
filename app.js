var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./conf/conf');
var my_mongo = require('./utils/my_mongo');
var index = require('./routes/index');

var app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (config.env == "testing") {
    app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static/img', express.static(path.join(__dirname, 'public', 'img')));
app.use('/static/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/static/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/', express.static(path.join(__dirname, 'public', 'html')));
app.use(my_mongo(config.mongo_url));
app.use('/api', index);

var port = config.port;

app.listen(port, () => {
    console.log('App is running on', port);
});
