var express = require('express');
var app = express();
var str = "";
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  var dbo = db.db("mydb");
  /*
  //create table
  dbo.createCollection("Member", function(err, res) {
    if (err) throw err;
    console.log("Member Collection created!");
    db.close();
  });

  dbo.createCollection("Membership", function(err, res) {
    if (err) throw err;
    console.log("Membership Collection created!");
    db.close();
  });

  dbo.createCollection("Level", function(err, res) {
    if (err) throw err;
    console.log("Level Collection created!");
   db.close();
  });

  dbo.createCollection("Shopping_History", function(err, res) {
    if (err) throw err;
    console.log("Shopping_History Collection created!");
   db.close();
  });

  dbo.createCollection("Item", function(err, res) {
    if (err) throw err;
    console.log("Item Collection created!");
    db.close();
  });

  */

  /* 好似同History重疊左
  dbo.createCollection("MemberItemRelationshipList", function(err, res) {
    if (err) throw err;
    console.log("MemberItemRelationshipList Collection created!");
    db.close();
  });
  */

  /*
  dbo.createCollection("ItemList", function(err, res) {
    if (err) throw err;
    console.log("ItemList Collection created!");
    db.close();
  });

  dbo.createCollection("Reward", function(err, res) {
    if (err) throw err;
    console.log("Reward Collection created!");
    db.close();
  });
  */

  //drop table
  /*
  dbo.collection("customers").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
  */

	//create collection and insert data

	var member_data = [
			{member_id : '1', firstname : 'Mandy', lastname : 'Chan', gender : 'F', birthdate : '2000-01-01', phone : '91114111', email : 'mandychan11@gmail.com'},
			{member_id : '2', firstname : 'Mandy', lastname : 'Chan', gender : 'F', birthdate : '2000-01-01', phone : '91114111', email : 'mandychan11@gmail.com'},
		];

	var membership_data = [
			{member_id : '1', level_id : '1', start_date : '2019-12-01', expiry_date : '2020-12-01', stat : 'active'}
		];

	var level_data = [
			{level_id : '1' , level_name : 'Gold' , discount_rate : '0.7'},
			{level_id : '2' , level_name : 'Silver' , discount_rate : '0.8'},
			{level_id : '3' , level_name : 'Bronze' , discount_rate : '0.9'}
		];

	var shopping_history_data = [
			{history_id : '1' , member_id : '1' , purchase_time : '2019-12-03'}
		];

	var item_data = [
			{item_id : '1', item_name : 'Cola', price : '100'},
			{item_id : '2', item_name : 'Water', price : '200'},
			{item_id : '3', item_name : 'Cake', price : '300'}
		];

	var item_list_data = [
			{item_id : '1' , list_id : '1', history_id : '1', amount : '5' }
		];

	var reward_data = [
			{member_id : '1' , reward_id : '1', reward_amount : '10'}
		];

	//insert many data at the same time using insertMany()

	dbo.collection("Member").insertMany(member_data, function(err, res) {
        if (err) throw err;
		console.log("插入的文档数量为: " + res.insertedCount);

	});

	dbo.collection("Membership").insertMany(membership_data, function(err, res) {
        if (err) throw err;
		console.log("插入的文档数量为: " + res.insertedCount);

	});

	dbo.collection("Level").insertMany(level_data, function(err, res) {
        if (err) throw err;
		console.log("插入的文档数量为: " + res.insertedCount);

	});

	dbo.collection("Shopping_History").insertMany(shopping_history_data, function(err, res) {
        if (err) throw err;
		console.log("插入的文档数量为: " + res.insertedCount);

	});

	dbo.collection("Item").insertMany(item_data, function(err, res) {
        if (err) throw err;
		console.log("插入的文档数量为: " + res.insertedCount);
	});

	dbo.collection("ItemList").insertMany(item_list_data, function(err, res) {
        if (err) throw err;
		console.log("插入的文档数量为: " + res.insertedCount);
	});

	dbo.collection("Reward").insertMany(reward_data, function(err, res) {
        if (err) throw err;
		console.log("插入的文档数量为: " + res.insertedCount);

	});

	//insert new records to a collection

	var objData = {member_id:"3", firstname:"David", lastname:"Wong" , gender:"M", birthdate:"1998-02-02", phone:"21114111", email:"mongdbtest@gmail.com"};

	dbo.collection('Member').insert(objData, function(err, records){
		console.log("Record added as "+records[0]);
	});

  var staffData = {staff_id:"3", staff_firstname:"David", staff_lastname:"Wong" , pwd:"admin12345", position:"admin", phone:"21114111", email:"mongdbtest@gmail.com"};

	dbo.collection('Staff').insert(staffData, function(err, records){
		console.log("Record added as "+records[0]);
	});

	db.close();

});
