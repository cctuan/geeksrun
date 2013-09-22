
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	friends: [Schema.ObjectId],
	activeGames: [Schema.ObjectId],
	pastGames: [Schema.ObjectId],
	name: String,
	fbid: String
});

var Player = mongoose.model('Player', PlayerSchema);

var methods = {
	findOrCreate: function(data, success, error) {
		this.find(data, function sfind(res) {
			if(res.length > 0) {
				success(res);
			} else {
				// if cannot find, then create new
				this.create(data, function screate(newres) {
					success(newres);
				}, function ecreate(e) {
					error(e);
				});
			}
		}.bind(this), function efind(e) {
			error(e);
		});
	},

	create: function(data, success, error) {
		Player.create(data, function(err, res) {
			if (err) {
				error(err);
				return;
			}
			success(res, 'new');
		});
	},

	find: function(data, success, error) {
		Player.find(data, function(err, res) {
			if (err) {
				error(err);
				return;
			}
			success(res);
		});
	}
};

module.exports = methods;