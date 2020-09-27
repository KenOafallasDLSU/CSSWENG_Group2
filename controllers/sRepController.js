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
            var id = req.session.userId; //change to new global _id var later

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
    }
}

module.exports = sRepController;