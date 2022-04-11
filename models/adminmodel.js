var mongoose = require('mongoose');


var adminSchema = new mongoose.Schema({

    name: { type: String },
    email: { type: String },
    password: { type: String }

});
//model  i.e, contact made available through contactschema
mongoose.model('admin', adminSchema);