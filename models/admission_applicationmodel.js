var mongoose = require('mongoose');


var admissionapplicationSchema = new mongoose.Schema({
    student_name:{type:String}, 
    father_name:{type:String}, 
    mother_name:{type:String}, 
    email:{type:String} ,
    phone_number:{type:Number}, 
   gender:{type:String},
    highest_degree:{type:String},
  course_id:{type:String}
   
});
//model  i.e, contact made available through contactschema
mongoose.model( 'admission_application',admissionapplicationSchema);
