var express = require('express');
var router = express.Router();
var UserDAO = require('./../models/User.js');

// 获取已注册的全部用户
router.get('/', function(req, res, next) {
	UserDAO.findAll(function(err, users){
		if(err) {
			res.end('查找注册用户信息失败');
		} else {

			var result = new Object();
			result.title = 'TB系统用户管理';
			console.log('user info: ' + users);
			if(users){	
				result.registeredCount = users.length;
				result.registeredUsers = users;
			}
			res.render('user', result);	
		}
	});
});

router.post('/save', function(req, res, next){
	var username = req.body.name;
	var password = req.body.password;
	UserDAO.save(username, password, function(err, user, numberAffected){
		if(err) {
			res.end('添加用户失败');
		} else {
			if(numberAffected == 1) {
				res.end('添加用户成功');
			}
		}
	});
});



module.exports = router;
