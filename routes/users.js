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

router.post('/delete', function(req, res, next){
	var username = req.body.name;
	UserDAO.delete(username, function(err){
		if(err) {
			res.json({code: 1, message: '删除用户失败'});
		} else {
			res.json({code: 0, message: '删除用户成功'});
		}
	});
});

router.post('/save', function(req, res, next){
	var username = req.body.name;
	var password = req.body.password;
	UserDAO.save(username, password, function(err, user, numberAffected){
		if(err) {
			res.json({code: 1, message: '添加用户失败'});
		} else {
			if(numberAffected == 1) {
				req.login(user, function(err){
					if(err) {
						next(err);
					}

					return res.json({code: 0, message: '添加用户成功'});
				});
				//res.json({code: 0, message: '添加用户成功'});
			} else {
				res.json({code: 1, message: '添加用户失败'});
			}
		}
	});
});

router.post('/update', function(req, res, next){

	var updateFields = {};
	if(req.body.isAdmin === 'true'){
		updateFields.isAdmin = true;
	} else {
		updateFields.isAdmin = false;
	}

	UserDAO.update(req.body.name, updateFields, function(err, numberAffected, rawResponse){
		if(err) {
			res.json({message: 'err occured when updating user info', result: false});
		} else {
			if(!numberAffected) {
				res.json({message: 'no user updated', result: false});
			} else {
				console.log(rawResponse);
				if(rawResponse && rawResponse.ok && rawResponse.n){
					res.json({message: 'update success', result: true});
				} else {
					res.json({message: 'no user updated', result: false});
				}
			}
		}
	});
});



module.exports = router;
