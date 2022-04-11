var mongoose = require('mongoose');


var courseCategorySchema = new mongoose.Schema({
    
    course_code:{type:String},
    course_category_id:{type:Number}, 
    course_name:{type:String},
    
   
});
//model  i.e, contact made available through contactschema
mongoose.model( 'course_category',courseCategorySchema);