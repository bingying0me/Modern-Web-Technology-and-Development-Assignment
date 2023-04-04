const mongoose = require('mongoose');

var collectionName = 'Staff';

var staffSchema = new mongoose.Schema({
	staff_id: {
		type: Number
	},
	name: {
		type: String
	},
	password: {
		type: String
	},
	login_type: {
		type: String
	}
});

mongoose.model('Staff', staffSchema, collectionName);
