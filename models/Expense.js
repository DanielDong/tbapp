var mongodb = require('./mongodb');
var mongoose = mongodb.mongoose;
var Schema = mongoose.Schema;
var expenseSchema = new Schema({
	date: Date,
	people: String,
	content: String,
	money: Number
});

var Expense = mongoose.model('Expense', expenseSchema);

var ExpenseDAO = function(){};

ExpenseDAO.prototype.find = function(){
	// do nothing
};

ExpenseDAO.prototype.findAll = function(callback){
	Expense.find(function(err, expenses){
		callback(err, expenses);
	});
};

ExpenseDAO.prototype.save = function(dateVal, peopleVal, contentVal, moneyVal, callback) {
	var expense = new Expense({
		date: dateVal,
		people: peopleVal,
		content: contentVal,
		money: moneyVal
	});

	expense.save(function(err, expense, numberAffected){
		if(err) {
			callback(err, null, -1);
		} else {
			callback(null, expense, numberAffected);
		}
	});
};

ExpenseDAO.prototype.update = function(dateOldVal, peopleOldVal, contentOldVal, moneyOldVal, dateNewVal, peopleNewVal, contentNewVal, moneyNewVal, callback){
	Expense.update({date: dateOldVal, people: peopleOldVal, content: contentOldVal, money: moneyOldVal}, {date: dateNewVal, people: peopleNewVal, content: contentNewVal, money: moneyNewVal}, function(err, numberAffected, rawResponse){
			if(err) {
				callback(err, -1, null);
			} else {
				callback(null, numberAffected, rawResponse);
			}
	});
};

ExpenseDAO.prototype.delete = function(dateVal, peopleVal, contentVal, moneyVal, callback){
	Expense.remove({date: dateVal, people: peopleVal, content: contentVal, money: moneyVal}, function(err) {
		if(err) {
			callback(err);
		} else {
			callback(null);
		}
	});
};

module.exports = new ExpenseDAO();


