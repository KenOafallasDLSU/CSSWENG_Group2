
/* database */

const db = require('../models/db.js');
const modelTimeLog = require('../models/DB_TimeLog.js');

const timeLogController = {

    getDashboard: function (req, res) {
        res.render("dashboard", {
            sPage: "Dashboard",
            sUserType: "Student Representative",
        })  
            
    },

    postTimeLog: function (req, res) {
        
        // objSRep: {type: mongoose.Schema.Types.ObjectId, ref: "SRep", required: false},
        //  objTimeIn: {type: Date, required: true, default: new Date()},
        //  objTimeOut: {type: Date, required: false},
        //  sTask: {type: String, required: false}
    
        // var date = sTimeIn;
        // var date = new Date();
        // var timestamp = date.getTime();

        try {
            db.insertOne(modelTimeLog, {
                
                    
            });
           
        } catch(e) {
            console.log(e);
        }
        
        res.redirect('/');
                
        
                
    },
    
    

}		
		
    
    //  Time in Time Out


    
	


module.exports = timeLogController;