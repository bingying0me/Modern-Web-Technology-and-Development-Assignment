const mongoose = require('mongoose');
var collectionName = 'Member';

var memberSchema = new mongoose.Schema({
	member_id: {
		type: Number
	},
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	email: {
		type: String
	},
	user_id: {
		type: String
	},
	password: {
		type: String
	},
	login_type: {
		type: String
	}
    },
    {

    timestamps: true
    });

mongoose.model('Member', memberSchema , collectionName);
