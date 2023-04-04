const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const MovieRate = mongoose.model('MovieRate');

router.post('/', (req, res) => {
    updateRecord(req, res);
});

function updateRecord(req, res) {
	MovieRate.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('../../admin/movieRate/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("admin/movieRate/edit", {
					viewTitle: "Edit Movie Rate",
					movieRate: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	MovieRate.find((err, docs) => {
		if(!err){
			res.render("admin/movieRate/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving movieRate list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	MovieRate.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("admin/movieRate/edit", {
				viewTitle: "Edit Movie Rate",
				movieRate: doc
			});
		}
	});
});

module.exports = router;
