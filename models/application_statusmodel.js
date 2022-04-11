var mongoose = require('mongoose');


var applicationstatusSchema = new mongoose.Schema({
   
    email:{type:String} ,
    
    status:{type:String},
    application_id:{type:String}
  
   
});
//model  i.e, contact made available through contactschema
mongoose.model( 'application_status',applicationstatusSchema);