

/* database */

const db = require('../models/db.js');
const { replaceOne } = require('../models/DB_TimeLog.js');
const modelTimeLog = require('../models/DB_TimeLog.js');

const timeLogController = {

   
    postTimeLog: function (req, res) {
        
        // objSRep: {type: mongoose.Schema.Types.ObjectId, ref: "SRep", required: false},
        //  objTimeIn: {type: Date, required: true, default: new Date()},
        //  objTimeOut: {type: Date, required: false},
        //  sTask: {type: String, required: false}
    
        // var date = sTimeIn;
        // var date = new Date();
        // var timestamp = date.getTime();
        
        var user = req.session.userId;
        var timein = new Date();
        
      
        
        console.log(user);
        console.log(timein);



        try {
            db.insertOne(modelTimeLog, {
               
                    sUserName : user,
                    objTimeIn : timein,
                    objTimeOut: null,
                    sTask: null
            }, function(flag){
                
            }
            );
           
        } catch(e) {
            console.log(e);
        }
                
        res.redirect("/srep/dashboard2/" + user);
                
    },
    

	 postTimeOut: function (req, res) {
        
        var user = req.session.userId;
        var timeout = new Date();
		var conditions = {sUserName:user,objTimeout:null, sTask:null};
        console.log(user);
        console.log(timeout);
		var sTask = req.body.sTask;

        try {
           
		db.updateOne(modelTimeLog, conditions, {
         
         $set:{
             objTimeOut:timeout,
             sTask:sTask
         },function(flag){
                
        }
        });
               
           
        }catch(e) {
            console.log(e);         
    }
    
    res.redirect("/srep/dashboard/" + user);
    
   },
		
    
    //  Time in Time Out


}
	


module.exports = timeLogController;