
var mongoose= require('mongoose');
var CourseCategory = mongoose.model('course_category');
//It gets the course categories defined in the database
module.exports={

    get_course_categories:function(req,res){
        
        console.log(" Print all the course categories");
        CourseCategory.find({}, function(err, results){
            if(err) throw err;
            res.render('course_view.ejs', {alltheemp:results});
                });
    },
}