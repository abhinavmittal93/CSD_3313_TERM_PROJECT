import {} from './course_category.js';
import {} from './admin_coursesController.js';
import {} from './admission_application.js';
import res from 'express/lib/response';
var mongoose= require('mongoose');
var Courses = mongoose.model('courses');
var AdmissionApplication = mongoose.model('admission_application');
module.exports={

    //# It gets the courses list on the home page for the user.
 get_courses_page:function(req,res){
    console.log('get_courses_page() begins');
    var course_category_list = course_category.get_course_categories()
    
    for (course_category_item in course_category_list)
        if (course_category_item['category_code'] == 1)
            var query = {'course_category_id': course_category_item['_id']};

           var  health_sci_course_list = Courses.find(query);

        elseif ( course_category_item['category_code'] == 2)
            var query = {'course_category_id': course_category_item['_id']};
            var infor_tech_course_list = collection_name.find(query);

        elseif (course_category_item['category_code'] == 3)
            var query = {'course_category_id': course_category_item['_id']};
            var business_course_list = collection_name.find(query);

    return res.render("course.html", health_sci_course_list=health_sci_course_list,
                           infor_tech_course_list=infor_tech_course_list, business_course_list=business_course_list,
                           title="Courses");
 },

 //# It gets the application page with the selected the course by the user
    get_course_application_page:function(course_id,res){
console.log('get_course_application_page({course_id}) begins');
    try{
        var course_list = admin_courses.get_all_courses();
        var course_details = admin_courses.get_course_details_by_id(course_id);
        return res.render("admission.html", course_list=course_list, course_details=course_details,
                            selected_course_id=course_id, title="Course Application");
        }
    catch{
    
        console.log('Exception occurred in get_course_application_page({course_id}): {e}');
        res.send("Error occurred. Please try again!");
        return res.redirect('/courses');
        }
    },
    //# It gets the course details page for the selected course from the home page
 get_course_view_page:function (course_id,res) {
    console.log('get_course_view_page({course_id}) begins');
    try{
        course_details = admin_courses.get_course_details_by_id(course_id)
        return render_template("course_view.html", course_details=course_details, title='Course - ' + course_details['course_name']);
    }
    catch{
    console.log('Exception occurred in get_course_view_page({course_id}): {e}');
        res.send("Error occurred. Please try again!", 'error');
        return res.redirect('/courses');
    }
 },
 //# It saves the user details in database for a particular course.
//# And it validates if the user has already applied for the course or not.
 apply_course:function(){
    console.log('apply_course() begins');
    try{
        var email = request.form.get("email");
        course_id = request.form.get("course_id");
        if (admission_applications.get_admission_application_by_course_and_email(ObjectId(str(course_id)), email.lower()) = !None){
            res.send("You have already applied to this course. Please check the status in \"Check Application Status\" menu.");
            return res.redirect('/courses');
        }
        var stname = request.form.get("stname");
        var fname = request.form.get("fname");
        var mname = request.form.get("mname")
        var phno = request.form.get("phone")
        var gender = request.form.get("gender")
        var higdgr = request.form.get("hdegree")
        var dict = {"student_name": stname, "father_name": fname, "mother_name": mname, "email": email,
                "phone_number": phno, "gender": gender, "highest_degree": higdgr, "course_id": ObjectId(str(course_id))}
        
       AdmissionApplication.insertOne(dict);
        res.send("You have applied successfully.");
    }
    catch{
        console.log('Exception occurred in apply_course(): {e}');
        res.send("Error occurred. Please try again!");
    }
    return res.redirect('/courses');
 }

}