const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

router.get('/', (req, res) => {
	res.render("admin/movie/add", {
		viewTitle: "Create Movie"
	});
});

router.post('/', (req, res) => {
	if(req.body._id =='')
	insertRecord(req, res);
    else
    updateRecord(req, res);
});


function insertRecord(req,res){
	var movie = new Movie();
	movie.movie_id = req.body.movie_id;
	movie.movie_name = req.body.movie_name;
	movie.movie_description = req.body.movie_description;
	movie.running_time = req.body.running_time;
	movie.release_date = req.body.release_date;
	movie.genre = req.body.genre;
	movie.save((err,doc) => {
		if(!err)
			res.redirect('/movie/list');
		else{
			console.log('Error during record insertion : ' + err);
		}
	});
}

function updateRecord(req, res) {
	Movie.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
		if(!err){res.redirect('../../admin/movie/list');}
		else{
			if(err.name == 'ValidationError'){
				handleValidationError(err, req.body);
				res.render("admin/movie/add", {
					viewTitle: "Edit Movie",
					movie: req.body
				});
			}
			else
				console.log('Error during record edit : ' + err);
		}
	});
}

router.get('/list', (req,res) => {
	Movie.find((err, docs) => {
		if(!err){
			res.render("admin/movie/list", {
				list: docs
			});
		}
		else{
			console.log('Error in retrieving movie list :' + err);
		}
	})
});

router.get('/:id', (req, res) => {
	Movie.findById(req.params.id, (err, doc) => {
		if(!err){
			res.render("admin/movie/add", {
				viewTitle: "Edit Movie",
				movie: doc
			});
		}
	});
});

router.get('/delete/:id', (req, res) => {
	Movie.findByIdAndRemove(req.params.id, (err, doc) => {
		if(!err){
			res.redirect('../../movie/list');
		}
		else{ console.log('Error in movie delete :' +err);}
	});
});

module.exports = router;