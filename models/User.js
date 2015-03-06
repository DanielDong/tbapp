var mongodb = require('./mongodb');
var mongoose = mongodb.mongoose;
var Schema = mongoose.Schema;
var userSchema = new Schema({
	name: String,
	password: String,
	isAdmin: Boolean
});

var User = mongoose.model('User', userSchema);

var UserDAO = function(){};

UserDAO.prototype.find = function(nameVal, callback){
	User.findOne({name: nameVal}, function(err, user){
		callback(err, user);
	});
};

UserDAO.prototype.findAll = function(callback){
	User.find(function(err, users){
		callback(err, users);
	});
};

UserDAO.prototype.save = function(nameVal, passwordVal, callback){
	var user = new User({name: nameVal, password: passwordVal});
	user.save(function(err, user, numberAffected){
		if(err){
			callback(err, null, -1);
		} else {
			callback(null, user, numberAffected);
		}
	});
};

UserDAO.prototype.update = function(nameVal, updateFields, callback){

	console.log("DAO update name: " + nameVal + " fields: ");
	console.log(updateFields);

	User.update({name: nameVal}, updateFields, function(err, numberAffected, rawResponse){
		if(err){
			callback(err, -1, null);
		} else {
			callback(null, numberAffected, rawResponse);
		}
	});
};

UserDAO.prototype.delete = function(nameVal, callback){
	User.remove({name: nameVal}, function(err){
		if(err){
			callback(err);
		} else {
			callback(null);
		}
	});
};

module.exports = new UserDAO();


