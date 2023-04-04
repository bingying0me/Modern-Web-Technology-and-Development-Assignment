const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const MovieRate = mongoose.model('MovieRate');


router.use(express.static(__dirname));

router.get('/', (req, res) => {
	res.render("movie_login", {

	});
});

router.post('/', (req, res) => {
	let staff_id = req.session.staff_id;
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
			MovieRate.find({$and: [
				{
				user_id: staff_id
			    },
			    {
			    movie_id: movies[i].movie_id
			    }
				]},{
					_id: 0,
					__v:0
				},
				function(err, movieRate){
					if (movieRate.length > 0) {
		        	  movies[i].visit = "none"
					} else {
					  movies[i].visit = "inline"
					}
					console.log(movies[i])
					console.log(i)

				})
			
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

		// console.log(movies);
		res.render("movie_login", {
		movie: movies,
		// view: "view"
	})


	}).limit(10);

});


// router.get('/list', (req,res) => {
// 			movie_name = this.movie_name;
// 			// updateRecord(req, res);
// 			// console.log(movie);
// });



router.post('/list/:id', (req, res) => {
// 	Movie.find(req.params.movie_name, (err, doc) => {
// 		if(!err){
// 			res.render("/movie_info_login", {
// 				movie: doc
// // });
// 			});
// 		}
        console.log(req.session.staff_id);
        console.log(req.params.id);
		insertRecord(req, res)
	// });
});

function insertRecord(req,res){
	var movieRate = new MovieRate();
	movieRate.movie_id = req.params.id;
	movieRate.user_id = req.session.staff_id;
	movieRate.rate = req.body.rate;
	movieRate.save((err,doc) => {
		if(!err)
			res.redirect('/movie_login');
		else{
			console.log('Error during record insertion : ' + err);
		}
	});
}


module.exports = router;