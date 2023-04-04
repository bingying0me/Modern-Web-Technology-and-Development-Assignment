const mongoose = require('mongoose');

var collectionName = 'Movie';

var movieSchema = new mongoose.Schema({
	movie_id: {
		type: Number
	},
	movie_name: {
		type: String
	},
	movie_description: {
		type: String
	},
	running_time: {
		type: String
	},
	release_date: {
		type: String
	},
	genre: {
		type: String
	},
});

mongoose.model('Movie', movieSchema , collectionName);
