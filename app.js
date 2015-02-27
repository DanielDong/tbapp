var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var UserDAO = require('./models/User.js');
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
	function(usernameVal, passwordVal, callback){
		UserDAO.find({name: usernameVal, password: passwordVal}, function(err, user){
			if(err) {
				callback(err);
			} else {
				if(!user) {
					callback(null, false, {message: '错误的用户名和密码'});
				} else {
					callback(null, user);
				}
			}
		});
	}
));

passport.serializeUser(function(user, callback){
	callback(null, user.name);
});
passport.deserializeUser(function(nameVal, callback){
	UserDAO.find({name: nameVal}, function(err, user){
		callback(err, user);
	});
});



var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'tbapp', cookie: {maxAge: 600000}})); // session生命周期10分钟
app.use(passport.initilaize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// app.listen(80);


var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});



// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//    app.use(function(err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('error', {
//        message: err.message,
//        error: {}
//    });
// });


module.exports = app;
