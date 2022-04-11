var mongoose= require('mongoose');
var User = mongoose.model('users');
var Admin = mongoose.model('admin');
//# Class for the user details
class User{
     constructor (self, name, email, password){
        self.name = name;
        self.email = email;
        self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt());
     }

    //# It creates a user in the database with the provided info in the user object
   
      create_new_user(cls, user) {
        
        var record = {"name": user.name, "email": user.email, "password": user.password};
         Admin.insert_one(record);
        //return response.acknowledged

     }
        
}

    