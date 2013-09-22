
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
	startTime: Date,
	distance: Number,
	maximumPlayer: Number,
	players: [String],
	// player id
	// XXX why can't I set schema.ObjectID and ref here
	owner: //{type : Schema.ObjectId, ref : 'Player'},
					String,
	// 0: unknown, 1: not launched yet, 2: Running, 3: Past
	// 4: deleted
	status: Number
});

var Game = mongoose.model('Game', GameSchema);

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

	join: function(id, player, success, error) {
		this.find({'_id': id}, function(result) {
			if (result.length === 0){
				error('no this game');
				return;
			}
			var game = result[0];
			game.players.push(player._id);
			game.save(success);
		}, function(err) {
			error(err);
		});
	},

	create: function(data, success, error) {
		Game.create(data, function(err, res) {
			console.log(err);
			if (err) {
				error(err);
				return;
			}
			success(res, 'new');
		});
	},

	find: function(data, success, error) {
		Game.find(data, function(err, res) {
			if (err) {
				error(err);
				return;
			}
			success(res);
		});
	}
};

module.exports = methods;