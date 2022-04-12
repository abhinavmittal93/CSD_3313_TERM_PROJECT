var mongoose = require('mongoose');
var Courses = mongoose.model('courses');    //courses is table

module.exports = {
    get_admin_courses_page: function (req, res) {
        console.log(" CALLING ADMIN COURSES PAGE");
        Courses.find({}, function (err, results) {
            if (err) {
                return res.render('500.ejs', { title: "Response", "message": "An error occurred. Please try again." });
            };
            res.render('admin_courses.ejs', { title: "Courses", courses: results });
        });
    },
    get_admin_courses_details_page: function (req, res) {
        console.log(" CALLING ADMIN COURSES DETAILS PAGE");
        var course_details = {
            "course_code": "",
            "course_name": "",
            "course_description": "",
            "admission_requirements": "",
            "course_duration": "",
            "course_fees": "",
            "course_category": "",
            "is_co_op_available": "False",
            "intakes_available": []
        };
        res.render('admin_course_details_new.ejs', { title: "Course Details", course_details: course_details });
    },
    get_admin_courses_edit_page: function (req, res) {
        console.log(" CALLING ADMIN COURSES EDIT PAGE");
        var course_code = req.params.course_code;
        var query = { 'course_code': course_code.toUpperCase() };
        Courses.find({ query }, function (err, results) {
            if (err) throw err;
            if (results == null) {
                return res.render('500.ejs', { title: "Response", "message": "Course does not exists with code: " + course_code });
            } else {
                console.log(results);
                res.render('admin_course_details.ejs', { title: "Course Details", course_details: results });
            }
        });

    },
    get_courses_view_page: function (req, res) {
        console.log(" CALLING COURSES VIEW PAGE");
        var course_code = req.params.course_code;
        var query = { 'course_code': course_code.toUpperCase() };
        Courses.find({ query }, function (err, results) {
            if (err) throw err;
            if (results == null) {
                return res.render('500.ejs', { title: "Response", "message": "Course does not exists with code: " + course_code });
            } else {
                console.log(results);
                res.render('course_view.ejs', { title: "Course Details", course_details: results[0] });
            }
        });

    },
    save_courses_details: function (req, res) {
        console.log('Lets add a course');

        var courseInfo = req.body;// its coming from form

        //var course_code = req.body.course_code;
        var intakes_available = [];
        var is_co_op_available = 'False';

        if (req.body.is_co_op_available == 'on') {
            is_co_op_available = 'True';
        }

        courseInfo = {
            "course_code": req.body.course_code.toUpperCase(),
            "course_name": req.body.course_name,
            "course_description": req.body.course_description,
            "admission_requirements": req.body.admission_requirements,
            "course_duration": req.body.course_duration,
            "course_fees": req.body.course_fees,
            "course_category": req.body.course_category,
            "is_co_op_available": is_co_op_available,
            "intakes_available": intakes_available
        }

        Courses.create(courseInfo, function (err, result) {
            if (err) {
                return res.render('500.ejs', { title: "Response", "message": "An error occurred. Please try again." });
            };
            res.redirect('/courses')
        });
    },
    update_courses_details: function (req, res) {
        console.log('Lets update a course');

        var courseInfo = req.body;// its coming from form

        var course_code = req.body.course_code;
        var intakes_available = [];
        var is_co_op_available = 'False';

        if (req.body.is_co_op_available == 'on') {
            is_co_op_available = 'True';
        }

        var _id = req.body._id;
        courseInfo = {
            "_id": req.body._id,
            "course_code": req.body.course_code.toUpperCase(),
            "course_name": req.body.course_name,
            "course_description": req.body.course_description,
            "admission_requirements": req.body.admission_requirements,
            "course_duration": req.body.course_duration,
            "course_fees": req.body.course_fees,
            "course_category": req.body.course_category,
            "is_co_op_available": is_co_op_available,
            "intakes_available": intakes_available
        }

        console.log('course_code: ' + course_code);

        Courses.updateOne(courseInfo, function (err, result) {
            if (err) {
                return res.render('500.ejs', { title: "Response", "message": "An error occurred. Please try again." });
            };
            res.redirect('/courses')
        });
    },
    delete_course: function (req, res) {
        console.log('Lets delete a course');

        var course_code = req.params.course_code;
        courseInfo = {
            "course_code": course_code,
        }

        Courses.deleteOne(courseInfo, function (err, result) {
            if (err) {
                return res.render('500.ejs', { title: "Response", "message": "An error occurred. Please try again." });
            };
            res.redirect('/courses')
        });
    }
}