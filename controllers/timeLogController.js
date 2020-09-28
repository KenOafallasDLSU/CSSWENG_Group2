

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
		

    //  Time in Time Out

    // postSendRequest: function (req,res){
    //     var user = req.session.userId;
       
    //     var Datein = new Date(req.body.sDatein);
    //     var Timein = new Date(req.body.sTimein);

    //     var monthIn = sDatein.getMonth()+1;
    //     var dayIn  = sDatein.getDate();
    //     var yearIn = sDatein.getFullYear();

    //     var hourIn  = sTimein.getHours();
    //     if (hourIn  < 10)
    //         hourIn  = "0"+ hourIn ;

    //     var minIn  = sTimein.getMinutes();
    //     if (minIn  < 10)
    //         minIn  = "0"+minIn ;

    //     var secIn  = sTimein.getSeconds();
    //     if (secIn  < 10)
    //         secIn  = "0"+ secIn;

    //     var sDateTimeIn = yearIn+'-'+monthIn+'-'+dayIn+'T'+hourIn+'.'+minIn+'.'+secIn; 


      
    //     var DateOut = new Date(req.body.sDateOut);
    //     var TimeOut = new Date(req.body.sTimeOut);

    //     var monthOut = sDateOut.getMonth()+1;
    //     var dayOut  = sDateOut.getDate();
    //     var yearOut = sDateOut.getFullYear();

    //     var hourOut  = sTimeOut.getHours();
    //     if (hourOut  < 10)
    //         hourOut  = "0"+ hourOut ;

    //     var minOut  = sTimeOut.getMinutes();
    //     if (minOut  < 10)
    //         minOut  = "0"+minOut ;

    //     var secOut  = sTimeOut.getSeconds();
    //     if (secOut  < 10)
    //         secOut  = "0"+ secOut;

    //     var sDateTimeOut = yearOut+'-'+monthOut+'-'+dayOut+'T'+hourOut+'.'+minOut+'.'+secOut;
        

    //     var sReason = req.body.sReason;

        
    //     try {

    //         db.insertOne(modelTimeLog, {

    //                 sUserName : user,
    //                 objTimeIn : sDateTimeIn,
    //                 objTimeOut: sDateTimeOut,
    //                 sTask: sReason,
    //                 cStatus: "P"      
    //         }, function(flag){
                
    //         }
    //         );
           
    //     } catch(e) {
    //         console.log(e);
    //     }
                
    //     res.redirect("/srep/dashboard/" + user);
    // }

}
	


module.exports = timeLogController;