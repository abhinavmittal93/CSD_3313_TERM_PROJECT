var mongoose = require('mongoose');


var contactSchema = new mongoose.Schema({
    fname:{type:String}, 
    email:{type:String} ,
    cnum:{type:Number}, 
    subject:{type:String},
    message:{type:String},
    date:{type:Date}
   
});
//model  i.e, contact made available through contactschema
mongoose.model( 'contact_messages',contactSchema);
