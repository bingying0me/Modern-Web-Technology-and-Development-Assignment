const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Member = mongoose.model('Member');


router.get('/', (req, res) => {
	res.render("signup", {
		viewTitle: "Create Member"
	});
});

router.post('/', (req, res) => {
	// if(req.body._id =='')
	insertRecord(req, res);
    // else
    // updateRecord(req, res);
});


function insertRecord(req,res){
	var member = new Member();
	member.member_id = req.body.member_id;
	member.firstname = req.body.firstname;
	member.lastname = req.body.lastname;
	member.email = req.body.email;
	member.user_id = req.body.user_id;
	member.password = req.body.password;
	member.login_type = 'normal';
	member.save((err,doc) => {
		if(!err)
			res.redirect('../login');
		else{
			console.log('Error during record insertion : ' + err);
		}
	});
}

// function updateRecord(req, res) {
// 	Member.findOneAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
// 		if(!err){res.redirect('member/list');}
// 		else{
// 			if(err.name == 'ValidationError'){
// 				handleValidationError(err, req.body);
// 				res.render("member/add", {
// 					viewTitle: "Edit Member",
// 					member: req.body
// 				});
// 			}
// 			else
// 				console.log('Error during record edit : ' + err);
// 		}
// 	});
// }

// router.get('/list', (req,res) => {
// 	Member.find((err, docs) => {
// 		if(!err){
// 			res.render("member/list", {
// 				list: docs
// 			});
// 		}
// 		else{
// 			console.log('Error in retrieving member list :' + err);
// 		}
// 	})
// });

// router.get('/:id', (req, res) => {
// 	Member.findById(req.params.id, (err, doc) => {
// 		if(!err){
// 			res.render("member/add", {
// 				viewTitle: "Edit Member",
// 				member: doc
// 			});
// 		}
// 	});
// });

// router.get('/delete/:id', (req, res) => {

// 	var query = { member_id: '1', level_id: '1'};

// 	Reward.deleteMany(query, function(err, result){
// 		if(err) throw err;
// 		console.log("1 document deleted.");
// 	});

// 	Member.findByIdAndRemove(req.params.id, (err, doc) => {
// 		if(!err){
// 			res.redirect('/member/list');
// 		}
// 		else{ console.log('Error in member delete :' +err);}
// 	});
// });

module.exports = router;
