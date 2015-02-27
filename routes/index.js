var jf = require('jsonfile')
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* 获取index页 */
router.get('/', function(req, res, next) {

	var rfile = 'reimburse.json';
	var reimburses = jf.readFileSync(rfile, false);

	var efile = 'expense.json';
	var expenses = jf.readFileSync(efile, false);

	var result = new Object();
	result.title = 'TB费用管理';
	result.reimburseCount = reimburses.length;
	result.expenseCount = expenses.length;
	result.expenses = expenses;
	result.reimburses = reimburses;
	
	console.log(result);
	res.render('index', result);
});

// router.get('/login', function(req, res, next){
// 	res.render('login', {title: 'TB费用管理'});
// });

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

/*添加TB报销条目*/
router.post('/tb/reimburse/add', function(req, res, next){

	var file = 'reimburse.json';
	var oldTbItems = jf.readFileSync(file);

	console.log(oldTbItems);

	var date = req.body.date;
	var peopleNum = req.body.peopleNum;
	var tbMoney = req.body.tbMoney;
	var people = req.body.people;

	var tbItem = new Object();
	tbItem.date = date;
	tbItem.peopleNum = peopleNum;
	tbItem.money = tbMoney;
	tbItem.people = people;

	var id = 0;
	var tbItems = new Array();
	for(var i = 0; i < oldTbItems.length; i ++) {
		id = oldTbItems[i].id;
		tbItems.push(oldTbItems[i]);
	}
	tbItem.id = (id + 1);

	tbItems.push(tbItem);
	jf.writeFileSync(file, tbItems);

	console.log("date: " + date + " people-num: " + peopleNum + " tb-money: " + tbMoney + " people: " + people);
	
	res.end('添加TB报销条目成功');
});

/*添加TB消费条目*/
router.post('/tb/expense/add', function(req, res, next){
	var file = "expense.json";
	var oldTbItems = jf.readFileSync(file);
	
	var date = req.body.date;
	var people = req.body.people;
	var content = req.body.content;
	var money = req.body.money;

	var tbItem = new Object();
	tbItem.date = date;
	tbItem.people = people;
	tbItem.content = content;
	tbItem.money = money;

	var id = 0;
	var tbItems = new Array();
	for(var i = 0; i < oldTbItems.length; i ++){
		id = oldTbItems[i].id;
		tbItems.push(oldTbItems[i]);
	}
	tbItem.id = (id + 1);
	tbItems.push(tbItem);

	jf.writeFileSync(file, tbItems);
	res.end('添加TB消费条目成功');
});


module.exports = router;
