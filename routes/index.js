var jf = require('jsonfile')
var express = require('express');
var router = express.Router();

/* 获取index页 */
router.get('/', function(req, res, next) {

	var rfile = 'reimburse.json';
	var reimburses = jf.readFileSync(rfile, false);

	var efile = 'expense.json';
	var expenses = jf.readFileSync(efile, false);

	var result = new Object();
	result.title = 'TB费用管理';
	result.expenses = expenses;
	result.reimburses = reimburses;
	
	console.log(result);
	res.render('index', result);
  //res.render('index', { title: 'TB费用管理', 
//expenses: [{date: 201410, peopleNum: 4, money: 2099, people:'人1，人2，人3'}],
//reimburses: [{date: 20140101, people:'人5，人6', content:'杀人放火', money:23423}] });
});

/*添加TB条目*/
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

	var tbItems = new Array();
	for(var i = 0; i < oldTbItems.length; i ++) {
		tbItems.push(oldTbItems[i]);
	}
	tbItems.push(tbItem);
	jf.writeFileSync(file, tbItems);

	console.log("date: " + date + " people-num: " + peopleNum + " tb-money: " + tbMoney + " people: " + people);
	
	res.end('添加tb条目信息成功');
});

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

	var tbItems = new Array();
	for(var i = 0; i < oldTbItems.length; i ++){
		tbItems.push(oldTbItems[i]);
	}
	tbItems.push(tbItem);

	jf.writeFileSync(file, tbItems);
	res.end("添加tb条目信息成功");
});


module.exports = router;
