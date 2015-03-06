var express = require('express');
var router = express.Router();

module.exports = function(passport){

	router.get('/logout', function(req, res){
		
		req.logout();
		res.redirect('/login');
	});

	router.post('/login', passport.authenticate('login', {
		failureRedirect: '/login',
		successRedirect: '/',
		failureFlash: true
	}));

	return router;
};



