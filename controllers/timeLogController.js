

/* database */

const db = require('../models/db.js');
const { replaceOne } = require('../models/DB_TimeLog.js');
const modelTimeLog = require('../models/DB_TimeLog.js');

const ObjectId = require('mongodb').ObjectId;


const timeLogController = {

   
    postTimeLog: function (req, res) {
        
        // objSRep: {type: mongoose.Schema.Types.ObjectId, ref: "SRep", required: false},
        //  objTimeIn: {type: Date, required: true, default: new Date()},
        //  objTimeOut: {type: Date, required: false},
        //  sTask: {type: String, required: false}
    
        
        
        var user = req.session.userId;
        var timein = new Date();
        
      
        
        console.log(user);
        console.log(timein);

        console.log(res.locals.user)

        try {
            db.insertOne(modelTimeLog, {
                    objSRep: ObjectId(res.locals.user),
                    // sUserName : user,
                    objTimeIn : timein,
                    objTimeOut: null,
                    sTask: null,
                    sReason: null,
                    cStatus: "A"
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
               
        // db.deleteOne(modelTimeLog, conditions);

        }catch(e) {
            console.log(e); 

        }
        // db.deleteOne(modelTimeLog, conditions);
        
        res.redirect("/srep/dashboard/" + user);
    
    },

    postSendRequest: function (req,res){
        console.log("im here");
        var user = req.session.userId;
       
        var sDate = (req.body.sDate).toString();
        var sTimeIn = (req.body.sTimein).toString();
        var sTimeOut = (req.body.sTimeout).toString();

        var sDateTimeIn = new Date( sDate + ' ' + sTimeIn + ':00'); 
        var sDateTimeOut = new Date( sDate + ' ' + sTimeOut + ':00'); 

        var sTask = req.body.sTask;
        var sReason = req.body.sReason;

        try {
            db.insertOne(modelTimeLog, {

                objSRep: ObjectId(res.locals.user),
                objTimeIn: sDateTimeIn,
                objTimeOut: sDateTimeOut,
                sTask: sTask,
                sReason: sReason,
                cStatus: "P"

            }, function(flag){
                console.log(flag);
            });
           
        } catch(e) {
            console.log(e);
        }
                
        res.redirect("/srep/dashboard/" + user);
    },
		
}


module.exports = timeLogController;