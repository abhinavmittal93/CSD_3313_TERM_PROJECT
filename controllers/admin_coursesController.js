import {get_course_categories} from './course_category';
var mongoose= require('mongoose');
var Courses = mongoose.model('courses');
var CourseCategory = mongoose.model('course_category');
module.exports = {
    //Get Course List page for Admin
    get_admin_course_list_page:function(req,res){
        console.log("get_admin_course_list_page() begins");
        courses_list = get_all_courses();
        res.render("admin_courses.ejs", courses_list=courses_list, title='Courses');
    },
    //Get all the courses list
    get_all_courses: function(req,res){
        console.log(" get_all_courses() begins ");
        var course_list = Courses.find({});
        var result_list =[];
        for(record in course_list){
            var course_category_details=get_course_category_details(record['course_category_id']);
            record['course_category_details']= course_category_details;
            result_list.append(record);
        }
        return result_list;
    },
    // Get course category details by _id for the related course
    get_course_category_details:function(course_category_id,res){
        console.log("get_course_category_details begins");
        return CourseCategory.findOne({course_category_id:course_category_id});
    },

    //# Deletes the course from DB by _id
    delete_course:function(object_id,res){
        console.log("delete_course({object_id}) begins");
        Courses.deleteOne({course_id :object_id(object_id)});
        res.send("Course Deleted Successfully.");
        res.render('/admin/courses');
    },
    //# Gets the add new course page for the admin
    get_add_new_course_page:function(course_details={},res){
        
        console.log("get_add_new_course_page() begins");
        course_category_list = course_category.get_course_categories();
        try{
        if (course_details == {})
            course_details['intakes_available'] = []
        return res.render("admin_course_details.html", course_category_list=course_category_list,
                               course_details=course_details,
                               title="New Course");
        }
        catch{
            return res.redirect('/admin/courses');
        }
    },
    //# Gets the add edit course page for the admin
    get_edit_course_page:function(course_id,err,res){
    console.log("get_edit_course_page({course_id}) begins");
    try{
        course_category_list = course_category.get_course_categories();
        course_details = get_course_details_by_id(course_id);
        return res.render("admin_course_details.html", course_category_list=course_category_list,
                               course_details=course_details, title="Edit Course");
    }
    catch
    {
        console.log(err);
        
        return res.redirect('/admin/courses');
    }
    },
    //# Gets the course details by _id from "courses" collection
    get_course_details_by_id:function(course_id){
    console.log("get_course_details_by_id({course_id}) begins");
    var query = {'_id': ObjectId(course_id)};
    return Courses.findOne(query);
        
},
//# Gets the course details submitted by the admin and saves it
 save_course:function (req,res) {
    console.log("save_course() begins");
    

course_id = request.form["course_id"];
course_code = request.form["course_code"];
course_name = request.form["course_name"];
course_description = request.form["course_details"];
course_duration = request.form["course_duration"];
course_fees = request.form["course_fees"];

is_co_op_available = False;
if ("is_co_op_available" in request.form && request.form["is_co_op_available"] == 'on')
    is_co_op_available = True;

var may_intake = request.form["may_intake"];if ("may_intake" in request.form) else (may_intake='');
var sept_intake = request.form["sept_intake"]; if ("sept_intake" in request.form) else '';
var jan_intake = request.form["jan_intake"]; if ("jan_intake" in request.form )else '';

var intakes_available = [];
if (may_intake == 'on')
    intakes_available.append('MAY');
if (sept_intake == 'on')
    intakes_available.append('SEPT');
if (jan_intake == 'on')
    intakes_available.append('JAN');

var admission_requirements = request.form["admission_requirements"];
var course_category_id = request.form["course_category_id"];

course = AdminCourses(course_code, course_name, course_description, course_duration, course_fees,
                      is_co_op_available, intakes_available, admission_requirements, course_category_id);

var missing = list();
var k,v;
for (k,v in req.items()){
    if (v == "" && k != 'course_id')
        missing.append(k);
}

if (missing){
    return get_add_new_course_page(course);
}

try{
    if (course_id)
    {
        update_course_details_by_id(course, course_id);
        res.send("Course updated successfully!", 'success');
    }
    else{
        save_course_details(course);
        res.send("Course added successfully!", 'success');
    return res.redirect('/admin/courses');
    }
}
catch{
    
    console.log("Exception occurred in save_course(): {err}");
    res.send('An error occurred. Please try again!', 'error');
    if (course_id){
        return get_edit_course_page(course_id);
    }
    else{
        return get_add_new_course_page(course);
    }
}

 },
//# Saves the course details in the DB
 save_course_details:function(AdminCourses){
console.log("save_course_details() begins");

var record = {"course_code": AdminCourses.course_code,
          "course_name": AdminCourses.course_name,
          "course_description": AdminCourses.course_description,
          "course_duration": AdminCourses.course_duration,
          "course_fees": AdminCourses.course_fees,
          "is_co_op_available": AdminCourses.is_co_op_available,
          "intakes_available": AdminCourses.intakes_available,
          "admission_requirements": AdminCourses.admission_requirements,
          "course_category_id": ObjectId(str(AdminCourses.course_category_id))
          }
        
response = Courses.create(record);
return response.acknowledged
        }}


        class AdminCourses{

      __init__(self, course_code='', course_name='', course_description='', course_duration='',
                     course_fees=0, is_co_op_available=False, intakes_available=[], admission_requirements='',
                     course_category_id=0)
                    {
            self.course_code = course_code;
            self.course_name = course_name;
            self.course_description = course_description;
            self.course_duration = course_duration;
            self.course_fees = course_fees;
            self.is_co_op_available = is_co_op_available;
            self.intakes_available = intakes_available;
            self.admission_requirements = admission_requirements;
            self.course_category_id = course_category_id;
                    }
        }


