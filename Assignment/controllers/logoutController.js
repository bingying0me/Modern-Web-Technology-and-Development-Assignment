var express = require('express'),
    router = express.Router();
const mongoose = require('mongoose');

var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

router.post('/', function(req, res) {
	req.session = null;
	console.log("logout");
    req.logout();
    res.redirect('login');
});

module.exports = router;