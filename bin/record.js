
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
	name: String,
	// player id
	player: {type : Schema.ObjectId, ref : 'Player'},
	// game id
	gameid: {type : Schema.ObjectId, ref : 'Game'},
	// stringify path array
	path: String
});

var Record = mongoose.model('Record', RecordSchema);

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
		Record.create(data, function(err, res) {
			if (err) {
				error(err);
				return;
			}
			success(res, 'new');
		});
	},

	find: function(data, success, error) {
		Record.find(data, function(err, res) {
			if (err) {
				error(err);
				return;
			}
			success(res);
		});
	}
};

module.exports = methods;