const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const MovieRate = mongoose.model('MovieRate');


router.use(express.static(__dirname));

router.get('/', (req, res) => {
	res.render("movie", {

	});
});

router.post('/', (req, res) => {
	var keyword = req.body.keyword;
	Movie.find({ $or:[
		{movie_name:{
			$regex: new RegExp(keyword)
		}},
		{movie_description:{
			$regex: new RegExp(keyword)
		}},
		{genre:{
			$regex: new RegExp(keyword)
		}},
		{release_date:{
			$regex: new RegExp(keyword)
		}}
	]},{
		_id: 0,
		__v: 0
	}, function(err, movies){
		// res.render(movie);
		for (let i in movies){
			MovieRate.find(
			    {
			    movie_id: movies[i].movie_id
			    }
				,{
					_id: 0,
					__v:0
				},
				function(err, movieRates){
					let total = 0
					let Mean = 0
					for(let key in movieRates){
						movieRates[key]
					total = movieRates[key].rate+total
					}
					Mean = total/movieRates.length
					movies[i].Mean = Mean
					console.log(total)
					console.log(Mean)
					console.log(movies[i])
					console.log(i)

				})

		}
		res.render("movie", {
		movie: movies
	});
		// res.redirect('/movie_info');
		console.log(movies);
	}).limit(10);

});


module.exports = router;
