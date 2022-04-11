var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//const bcrypt = require("bcrypt");//for password encrypting
//connecting to model
require('./models/contactmodel');
require('./models/adminmodel');

// for connection
mongoose.connect('mongodb://localhost:27017/college_admission_management ', { useUnifiedTopology: true }, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log("We are connected on mongoose!");
});

//conneting to views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view engine', 'ejs');

//connecting to controllers
var contactController = require('./controllers/contactController');
var loginController = require('./controllers/login');


app.use(express.static(__dirname + '/static'));


//creating connection 
// var MongoClient = require('mongodb').MongoClient
// var url = "mongodb://localhost:27017/"

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   console.log("DB connection is done")
//   var dbo = db.db("college_admission_management");
//   //creating a new collection
//   dbo.createCollection("admin", function (err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });



app.get('', loginController.login_page);
app.get('/contactus', contactController.get_contact_us_page);
app.post('/contactus/save', contactController.save_contact_us_details);





app.listen(5050);