
<<<<<<< Updated upstream
/* database */

const db = require('../models/db.js');
=======

/* database */

const db = require('../models/db.js');
const { replaceOne } = require('../models/DB_TimeLog.js');
>>>>>>> Stashed changes
const modelTimeLog = require('../models/DB_TimeLog.js');

const timeLogController = {

<<<<<<< Updated upstream
    getDashboard: function (req, res) {
        res.render("dashboard", {
            sPage: "Dashboard",
            sUserType: "Student Representative",
        })  
            
    },

=======
   
>>>>>>> Stashed changes
    postTimeLog: function (req, res) {
        
        // objSRep: {type: mongoose.Schema.Types.ObjectId, ref: "SRep", required: false},
        //  objTimeIn: {type: Date, required: true, default: new Date()},
        //  objTimeOut: {type: Date, required: false},
        //  sTask: {type: String, required: false}
    
        // var date = sTimeIn;
        // var date = new Date();
        // var timestamp = date.getTime();
<<<<<<< Updated upstream

        try {
            db.insertOne(modelTimeLog, {
                
                    
            });
=======
        
        var user = req.session.userId;
        var timein = new Date();
        
        var timeout = new Date();
        
        console.log(user);
        console.log(timein);



        try {
            db.insertOne(modelTimeLog, {
               
                    sUserName : user,
                    objTimeIn : timein,
                    objTimeOut: timeout,
                    sTask: null
            }, function(flag){
                
            }
            );
>>>>>>> Stashed changes
           
        } catch(e) {
            console.log(e);
        }
<<<<<<< Updated upstream
        
        res.redirect('/');
                
        
=======
                
        res.redirect("/srep/dashboard2/" + user);
>>>>>>> Stashed changes
                
    },
    
    

}		
		
    
    //  Time in Time Out


    
	


module.exports = timeLogController;