var mongoose = require('mongoose');
var AdmissionApplicationModel = mongoose.model('admission_application');    //courses is table
var Courses = mongoose.model('courses');    //courses is table

module.exports = {
    get_all_admission_requests: function (req, res) {
        console.log("CALLING ADMISSION REQUESTS PAGE");
        AdmissionApplicationModel.find({}, function (err, results) {
            if (err) {
                return res.render('500.ejs', { title: "Response", "message": "An error occurred. Please try again." });
            };
            res.render('admin_admission_applications.ejs', { title: "Applications", admission_applications: results });
        });
    },
    get_application_details_page: function (req, res) {
        console.log(" CALLING APPLICATION DETAILS PAGE");
        var application_id = req.params.application_id;
        var query = { '_id': application_id };
        AdmissionApplicationModel.find({ query }, function (err, results) {
            if (err) throw err;
            if (results == null) {
                return res.render('500.ejs', { title: "Response", "message": "Course does not exists with code: " + course_code });
            } else {
                console.log(results);
                Courses.findById(results[0].course_id, function (err, results2) {
                    if (err) {
                        return res.render('500.ejs', { title: "Response", "message": "An error occurred. Please try again." });
                    };
                    res.render('admin_admission_applications_view.ejs', { title: "Application Details", course_details: results2, application_details: results[0]});
                });
            }
        });

    },
    get_apply_admission_page: function (req, res) {
        console.log(" CALLING APPLY ADMISSION PAGE");

        Courses.find({}, function (err, results) {
            if (err) {
                return res.render('500.ejs', { title: "Response", "message": "An error occurred. Please try again." });
            };
            res.render('admission.ejs', { title: "Applications", courses: results });
        });
    },
    save_application_details: function (req, res) {
        console.log('Lets add a an application');

        var applicationInfo = req.body;// its coming from form
        applicationInfo = {
            "student_name": req.body.stname,
            "father_name": req.body.fname,
            "mother_name": req.body.mname,
            "email": req.body.email,
            "phone_number": req.body.phone,
            "gender": req.body.gender,
            "highest_degree": req.body.hdegree,
            "course_id": req.body.course_id
        }

        AdmissionApplicationModel.create(applicationInfo, function (err, result) {
            if (err) {
                return res.render('500.ejs', { title: "Response", "message": "An error occurred. Please try again." });
            };
            res.render('Response.ejs', { title: "Response", message: "You have successfully applied to the course." });
        });
    }
}