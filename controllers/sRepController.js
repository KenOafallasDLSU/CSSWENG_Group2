const db = require('../models/db.js');
const modelSRep = require('../models/DB_SRep.js');
const modelTimeLog = require('../models/DB_TimeLog.js');
const sRep = require('../models/DB_SRep.js');
const modelTimeLog = require('../models/DB_TimeLog.js');


const sRepController = {

    getDashboard: function (req, res) {

        // insert db.findOne kung existing sa db ung nakalogin na user 

        res.render("dashboard", {
            sPage: "Dashboard",
            sUserType: "Student Representative",
        })
    },

    getDashboard2: function (req, res) {

        // insert db.findOne kung existing sa db ung nakalogin na user 
        res.render("dashboard2", {
            sPage: "Dashboard",
            sUserType: "Student Representative",
        })
    },

    getSendRequest: function (req, res) {

        // insert db.findOne kung existing sa db ung nakalogin na user 
        res.render("sendRequest", {
            sPage: "SendRequest",
            sUserType: "Student Representative",
        })
    },
    /*
    getSReps:

    getSRep:

    getRecord:
    */
    getRecordsSRep: function (req, res) {
        try{
            var id = res.locals.user;

            db.findMany(modelTimeLog, {objSRep: id, cStatus: "A"}, {objTimeIn: -1}, '', 20, function(objTimeLogs){
                records = objTimeLogs;

                //res.send(records)
                res.render("records", {
                    sPage: "SReps Records",
                    sUserType: "SRep",
                    records: records
                });
            });
        }
        catch{
            //console.log(e)
        }
    },

   /* for profile */
   getProfile: function (req, res) {
    //sUsername = res.session.sUserID;

    var user = req.session.userId;
    var id = req.session.primaryKey;

    var pendingHours = 20.00;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    firstDay.setHours(0);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59);

    var conditions = {sUsername:user};
    
<<<<<<< HEAD
    */

    /* for profile */
    getProfile: function (req, res) {
        sUsername = res.locals.sUsername;
        try{
            /*
            db.findOne(modelSRep, {sUsername: sUsername}, '', function(objSRep){

                res.render("profile", {
                    sPage: "profile",
                    sUserType: "Student Representative",
                    objSrep: objSRep,
                })
            });*/
            db.findOne(modelSRep, {_id: res.locals.user}, {sUsername:1}, function (x) {
                res.render("profile", {
                    sPage: "profile",
                    sUserType: "Student Representative",
                    sFirstName: x.sFirstName,
                    sEmail: x.sEmail,
                    sCourse: x.sCourse,
                    sUserID: x.sUserID,
                    sBirthdate: x.sBirthdate,



                })
            });
        }
        catch(e){
            console.log(e)
        }
    }
=======
    
    console.log(user);
       try{
            db.findOne(sRep, conditions, '', function (x) {
               db.findMany(modelTimeLog, {objSRep: id, dDate:{$gte: firstDay, $lte: lastDay}}, '', '', '', function(objTimeLogs){
                    var virtualTimeLogs = objTimeLogs;
                    for(i = 0; i < virtualTimeLogs; i++){
                        pendingHours = pendingHours - virtualTimeLogs[i].fHours;
                    }

                    res.render("profile", {
                        sPage: "profile",
                        sUserType: "Student Representative",
                        sFirstName: x.sFirstName,
                        sEmail: x.sEmail,
                        sCourse: x.sCourse,
                        sUserID: x.sUsername,
                        bHRStatus: x.bHRStatus,
                        remainingHours: pendingHours,
                    })
                });
            });
       }
       catch(e){
           console.log(e)
       }
   }
>>>>>>> Sprint3
}

module.exports = sRepController;
