var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json())

//connecting to model
require('./models/contactmodel');
require('./models/adminmodel');
require('./models/admission_applicationmodel');
require('./models/application_statusmodel');
require('./models/coursecategory');
require('./models/usermodel');
require('./models/coursemodel');


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
var adminCourseController = require('./controllers/adminCourseController');
var admissionController = require('./controllers/admissionController');


app.use(express.static(__dirname + '/static'));


// //creating connection 
// var MongoClient = require('mongodb').MongoClient
// var url = "mongodb://localhost:27017/"

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   console.log("DB connection is done")
//   var dbo = db.db("college_admission_management");
//   //creating a new collection
//   dbo.createCollection("admission_applications", function (err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });



app.get('', loginController.login_page);
app.post('/login', loginController.authenticate_admin);
app.get('/courses/details', adminCourseController.get_admin_courses_details_page);
app.get('/courses/details/:course_code', adminCourseController.get_admin_courses_edit_page);
app.get('/courses/delete/:course_code', adminCourseController.delete_course);
app.post('/courses/details/save', adminCourseController.save_courses_details);
app.post('/courses/details/update', adminCourseController.update_courses_details);
app.get('/courses', adminCourseController.get_admin_courses_page);

app.get("/admissions/apply", admissionController.get_apply_admission_page)
app.post("/admissions/apply", admissionController.save_application_details)
app.get("/application/view/:application_id", admissionController.get_application_details_page)
app.get("/applications", admissionController.get_all_admission_requests)


app.get('/contactus', contactController.get_contact_us_page);
app.post('/contactus/save', contactController.save_contact_us_details);





app.listen(5050);