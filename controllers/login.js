var mongoose = require('mongoose');
//var User = mongoose.model('users');
var Admin = mongoose.model('admin');
module.exports = {
    //# Gets the Admin Login page
    login_page: function (req, res) {
        console.log('login_page() begins');
        // if (session.get("email"))
        //     return res.redirect('/');
        return res.render("login.ejs", {title : "Lambton - Admin Login"});
    },
    //# It validates the username and password entered by the user
    authenticate_admin: function (req, res) {
        console.log('authenticate_admin() begins');
        if (session.get("email"))
            return res.redirect('/');


        var req = request.form;
        var missing = list();
        console.log("missing:" + missing);
        // var k, v;
        // for (k, v in req.items()) {
        //     if (v == "")
        //         missing.append(k);
        // }


        // if (missing) {
        //     var feedback = "Missing fields for {', '.join(missing)}";
        //     return res.render("login.html", feedback = feedback);
        // }


        var email = request.form["email"];
        var password = request.form["password"];

        var query = { 'email': email.lower() };
        var user = Admin.findOne(query);

        if (!user)
            res.send("User not found.");
        return res.redirect('/login');

        if (bcrypt.checkpw(password.encode("utf-8"), user['password']))
            session["email"] = email;
        res.send("Logged In as {user['name']}", 'success');
        return res.redirect('/');

        res.send("Invalid Credentials");
        return res.redirect('/login');
    }
}