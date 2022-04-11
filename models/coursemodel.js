var mongoose = require('mongoose');


var courseSchema = new mongoose.Schema({
    course_id:{type:String}, 
    course_code:{type:String} ,
    course_name:{type:String}, 
    course_description:{type:String},
    course_duration:{type:Number},
    course_fees:{type:Number}
   
});
//model  i.e, contact made available through contactschema
mongoose.model( 'courses',courseSchema);