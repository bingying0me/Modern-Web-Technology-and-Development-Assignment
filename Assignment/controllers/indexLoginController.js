const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

router.use(express.static(__dirname));

router.get('/', (req, res) => {
	res.render("index_login", {

	});
});

router.post('/', (req, res) => {
	

});


module.exports = router;
