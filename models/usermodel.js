var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    
    name:{type:String}, 
    email:{type:String},
   password:{type:String}
    
});
//model  i.e, contact made available through contactschema
mongoose.model( 'users',userSchema);