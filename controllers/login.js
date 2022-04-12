var mongoose = require('mongoose');
//var User = mongoose.model('users');
var Admin = mongoose.model('admin');
module.exports = {
    //# Gets the Admin Login page
    login_page: function (req, res) {
        console.log('login_page() begins');
        return res.render("login.ejs", {title : "Lambton - Admin Login"});
    },
    //# It validates the username and password entered by the user
    authenticate_admin: function (req, res) {
        console.log('authenticate_admin() begins');
        var email = req.body.email;
        var password = req.body.password;

        if(email == 'abhinavmittal93@gmail.com' && password == 'abhinav123') {
            return res.redirect('/courses');
        } else {
            return res.redirect('/');
        }
    }
}