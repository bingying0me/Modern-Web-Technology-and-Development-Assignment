const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');


var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

router.get('/', (req, res) => {

      res.render("login", {

  });
});

// router.get('/', (req, res) => {
//   console.log(JSON.stringify(req.session));
//   if(!req.session.authenticated){
//       res.render('/login');
//   }
//       res.render('/index');
// });

router.post('/', function(req,res){
	var staff_id = req.body.staff_id;
	var password = req.body.password;

	var data = {
		"staff_id": staff_id,
		"password":password
	}

  req.session.staff_id = req.body.staff_id;
  req.session.password = req.body.password;

  db.collection('Staff').findOne(data, function(err,result){
      console.log(JSON.stringify(req.session));
      if(err) throw err;
      if (result){
          if(!req.session.authenticated){
          console.log(result);
          res.render('admin/menu/menu', {staff_id});
        }
      }else{
          console.log(result);
          console.log('Login failure. Wrong account or password');
      }
  });

  var data = {
    "user_id": staff_id,
    "password":password
  }

  db.collection('Member').findOne(data, function(err,result){
      console.log(JSON.stringify(req.session));
      if(err) throw err;
      if (result){
          if(!req.session.authenticated){
          console.log(result);
          console.log(req.session.staff_id);
          res.render('index_login', {staff_id});
        }
      }else{
          console.log(result);
          console.log('Login failure. Wrong account or password');
      }
  });


});

module.exports = router;
