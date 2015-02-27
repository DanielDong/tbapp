var mongodb = require('./mongodb');
var mongoose = mongodb.mongoose;
var Schema = mongoose.Schema;
var reimburseSchema = new Schema({
	date: Date,
	peopleNum: String,
	money: Number,
	people: String
});

var Reimburse = mongoose.model('Reimburse', reimburseSchema);

var ReimburseDAO = function(){};

ReimburseDAO.prototype.find = function(){
	// do nothing
};

ReimburseDAO.prototype.findAll = function(callback){
	Reimburse.find(function(err, reimburses){
		callback(err, reimburses);
	});
};

ReimburseDAO.prototype.save = function(dateVal, peopleNumVal, moneyVal, peopleVal, callback){
	var reimburse = new Reimburse({
		date: dateVal,
		peopleNum: peopleNumVal,
		money: moneyVal,
		people: peopleVal
	});
	reimburse.save(function(err, reimburse, numberAffected){
		if(err) {
			callback(err, null, -1);
		} else {
			callback(null, reimburse, numberAffected);
		}
	});
};

ReimburseDAO.prototype.update = function(dateOldVal, peopleNumOldVal, moneyOldVal, peopleOldVal, dateNewVal, peopleNumNewVal, moneyNewVal, peopleNewVal, callback){
	Reimburse.upate({
		date: dateOldVal,
		peopleNum: peopleNumOldVal,
		money: moneyOldVal,
		people: peopleOldVal
	}, {
		date: dateNewVal,
		peopleNum: peopleNumNewVal,
		money: moneyNewVal,
		people: peopleNewVal
	}, function(err, numberAffected, rawResponse){
		if(err) {
			callback(err, -1, null);
		} else {
			callback(null, numberAffected, rawResponse);
		}
	});
};

ReimburseDAO.prototype.delete = function(dateVal, peopleNumVal, moneyVal, peopleVal, callback){
	Reimburse.remove({
		date: dateVal,
		peopleNum: peopleNumVal,
		money: moneyVal,
		people: peopleVal
	}, function(err){
		if(err) {
			callback(err);
		} else {
			callback(null);
		}
	});
};

module.exports = new ReimburseDAO();