const res = require('express/lib/response');
var mongoose= require('mongoose');
var AdmissionApplication= mongoose.model('admission_application');
var Courses = mongoose.model('courses');
var ApplicationStatus= mongoose.model('application_status');
module.exports={
//# Gets the Application Status page to check the status of application by email id
 get_check_application_status_page:function(req,res){
console.log('get_check_application_status_page() begins');
return res.render("application_status_check.html", title="Check Application Status");
 },

 //# It checks the application status and details by email id
check_application_status:function(req,res){
    console.log('check_application_status() begins');
    var email = request.form["email"];
    var query = {'email': email.lower()};
    //collection_name = dbconnection.db["application_status"]
    var status_records = application_status.find(query);
    if (!status_records)
    {
        res.send("No record found.");
        return res.redirect('/application/status');
    }
    else
        var record;
        var result_list = [];
        var decided_course_id = [];
        for ( record in status_records)
        {
            var application_details = get_application_details(record['application_id']);
            record['application_details'] = application_details;

            var course_id = ObjectId(str(application_details['course_id']));
            var course_details = get_course_details(course_id);
            record['course_details'] = course_details;
            result_list.append(record);
            decided_course_id.append(course_id)

        }

        var query = {'email': email.lower(), 'course_id': { '$nin': decided_course_id }}
    // collection_name = dbconnection.db["admission_applications"]
        pending_application_records = AdmissionApplication.findOne(query);

        for (application_details in pending_application_records)
            var pending_record = {'application_details': application_details};
            var course_id = ObjectId(str(application_details['course_id']));
            var course_details = get_course_details(course_id);
            pending_record['course_details'] = course_details;
            pending_record['status'] = 'PEND';
            result_list.append(pending_record);

        return res.render("application_status.html", status_records=result_list,
                            email=email.lower(), title="Application Status");

    },
    //# It gets the application details from DB by _id from "admission_applications"
    get_application_details:function(application_id){
        console.log('get_application_details({application_id}) begins');
        var query = {'_id': application_id};
        //collection_name = dbconnection.db["admission_applications"]
        return admission_applications.find_one(query);
    },
    
    //# It gets the course details by _id from "courses" collection
     get_course_details:function(course_id){
       console.log('get_course_details({course_id}) begins');
        var query = {'_id': course_id};
        //collection_name = dbconnection.db["courses"];
        return Courses.findOne(query);
    },

    //# It updates the application status and creates a record in "application_status"//
    // based on the status value which could be "ACCPT" or "RJCT"
    accept_reject_application:function(email, status, application_id,){
        console.log('accept_reject_application({email}, {status}, {application_id}) begins');
        //collection_name = dbconnection.db["application_status"]
        var record = {"email": email, "status": status, "date": datetime.datetime.utcnow(),
                "application_id": ObjectId(str(application_id))};
        return ApplicationStatus.create(record);
}

}

