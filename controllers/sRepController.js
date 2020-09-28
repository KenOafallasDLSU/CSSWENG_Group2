const db = require('../models/db.js');
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
    /*
    getSReps:

    getSRep:

    getRecord:
    */
    getRecordsSRep: function (req, res) {
        try{
            var id = res.locals.user;

            db.findMany(modelTimeLog, {objSRep: id}, '', '', '', function(objTimeLogs){
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
            console.log(e)
        }
    },

    /* for profile */
    getProfile: function (req, res) {
        try{
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
}

module.exports = sRepController;
