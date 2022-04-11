import res from 'express/lib/response';
import{} from admin_courses;
import{} from application_status;

var mongoose= require('mongoose');
var ApplicationStatus = mongoose.model('application_status');
var AdmissionApplication = mongoose.model('admission_application');

module.exports={

//# Get the application details by email_id and course_id from DB
    get_admission_application_by_course_and_email:function(course_id, email){
        console.log('get_admission_application_by_course_and_email({course_id}, {email}) begins');
        var query = {'course_id': course_id, 'email': email}
       // collection_name = dbconnection.db["admission_applications"]
        return AdmissionApplication.findOne(query);
    },

    //# Get the pending applications page
    get_pending_admission_applications_page:function(req,res){
    logger.info('get_pending_admission_applications_page begins')
    try{
        var pending_applications_list = get_pending_admission_applications();
        return res.render("admin_admission_applications.html", pending_applications_list=pending_applications_list,
                            title='Admission Applications');
    }
   catch{
        
      console.log('Exception occurred in get_pending_admission_applications_page: {e}');
        res.send("Error occurred. Please try again!");
        return res.redirect('/admin/courses');
    }
    },

    //# Get the application which is neither accepted or rejected, by email id
 get_pending_admission_applications:function(){
    console.log('get_pending_admission_applications begins');
    //var application_status_coll = dbconnection.db["application_status"]
    var decided_applications_id = ApplicationStatus.find({});
    var decided_applications_id_list = [];

    for (decided_applications in decided_applications_id)
        decided_applications_id_list.append(decided_applications['application_id']);

    //admission_applications_collection = dbconnection.db["admission_applications"]
    pending_applications_query = {'_id': {'$nin': decided_applications_id_list}}
    pending_applications =AdmissionApplication.find(pending_applications_query);

    var pending_applications_list = [];

    for (application in pending_applications)
        var course_details = admin_courses.get_course_details_by_id(application['course_id']);
        application['course_details'] = course_details;
        pending_applications_list.append(application);

    return pending_applications_list;
 },

 //# Get the application details by _id from "admission_applications"
    get_application_by_id: function(application_id){
    console.log('get_application_by_id({application_id}) begins');
    try{
        var query = {'_id': ObjectId(str(application_id))};
        //collection_name = dbconnection.db["admission_applications"]
        application_details = AdmissionApplication.findOne(query);
        return res.render("admin_admission_applications_view.html", application_details=application_details,
                            title='Admission Application');
    }
    catch{
        
        console.log('Exception occurred in get_application_by_id({application_id}): {e}');
        res.send("Error occurred. Please try again!");
        return res.redirect('/admin/admission/applications');
    }
    },

    //# It updates the application status on the basis of admin's decision ('ACCPT' or 'RJCT')
    update_application_status:function(req,res){
    console.log('update_application_status() begins');
    var email = request.form["email"];
    var status = request.form["status"];
    var application_id = request.form["application_id"];
    try{
        application_status.accept_reject_application(email.lower(), status, application_id)
        if (status == 'ACCPT')
            res.send("Application has been approved successfully.");
        else
            res.send("Application has been rejected successfully.");
        return res.redirect('/admin/admission/applications');
    }
    catch{
        //res.send('An exception occurred while updating the status of an application {e}');
        console.log('Exception occurred in update_application_status: {e}');
        res.send("An error occurred. Please try again.");
        return res.redirect('/admin/admission/applications/' + application_id);
    }
    }
}