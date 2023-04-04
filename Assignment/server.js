require('./models/db');
var cookieSession = require('cookie-session')

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('passport');
const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session);
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');

const indexController = require('./controllers/indexController');
const indexLoginController = require('./controllers/indexLoginController');
const memberController = require('./controllers/memberController');
const movieController = require('./controllers/movieController');
const movieLoginController = require('./controllers/movieLoginController');
const loginController = require('./controllers/loginController');
const logoutController = require('./controllers/logoutController');

const menuController = require('./controllers/admin/menuController');
const memberAdminController = require('./controllers/admin/memberController');
const movieAdminController = require('./controllers/admin/movieController');
const movieRateAdminController = require('./controllers/admin/movieRateController');
const staffAdminController = require('./controllers/admin/staffController');

var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})




var app = express();
app.use(express.static(__dirname));
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());
app.use(express.static('public'));

app.use(cookieSession({
  name: 'session',
  keys:['key1', 'key2']
}));

// app.set('views', path.join(__dirname, '/views/'));
// app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/admin/layouts/'}));
// app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '/views/'));
app.engine('html', exphbs({extname: 'html', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'html');

app.listen(3000, () => {
	console.log('Express server started at port : 3000');
});

app.use('/index', indexController)
app.use('/index_login', indexLoginController)
app.use('/signup', memberController)
app.use('/movie', movieController)
app.use('/movie_login', movieLoginController)
app.use('/login', loginController)
app.use('/logout', logoutController)
app.use('/admin/menu/menu', menuController)
app.use('/admin/member', memberAdminController)
app.use('/admin/movie', movieAdminController)
app.use('/admin/movieRate', movieRateAdminController)
app.use('/admin/staff', staffAdminController)




