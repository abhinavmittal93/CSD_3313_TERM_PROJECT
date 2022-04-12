var mongoose = require('mongoose');


var courseSchema = new mongoose.Schema({
    course_code:{type:String} ,
    course_name:{type:String}, 
    course_description:{type:String},
    admission_requirements:{type:String},
    course_category:{type:String},
    is_co_op_available:{type:String},
    course_duration:{type:Number},
    course_fees:{type:Number},
    intakes_available:{type:[String]}
   
});
//model  i.e, contact made available through contactschema
mongoose.model( 'courses',courseSchema);