const mongoose = require('mongoose');

var collectionName = 'MovieRate';

var movieRateSchema = new mongoose.Schema({
	movie_id: {
		type: Number
	},
	user_id: {
		type: String
	},
	rate: {
		type: Number
	}
});

mongoose.model('MovieRate', movieRateSchema , collectionName);
