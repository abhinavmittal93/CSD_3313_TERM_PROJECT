var mongoose= require('mongoose');
var Contact = mongoose.model('contact_messages');//contact is db


module.exports = {
    get_contact_us_page: function(req,res){
        
        console.log(" CALLING CONTACT US PAGE");
        res.render('contact_us.ejs', {title: "Contact Us"});
        },

    
    save_contact_us_details:function(req,res){
        console.log('Lets add a contact request');
        
        var contactinfo= req.body;// its coming from form
        contactinfo={
            "fname":req.body.fname,
            "email":req.body.email,
            "cnum":req.body.cnum,
            "subject":req.body.subject,
            "message":req.body.message,
            "date":req.body.date
            
        }
        Contact.create(contactinfo,function(err,result){  
                if(err) throw err;
                res.redirect('/contactus')
                });
    }
}
    
