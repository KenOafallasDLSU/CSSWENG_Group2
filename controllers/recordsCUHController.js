/**Database model requirements*/
const db = require('../models/db.js');
const modelSRep = require('../models/DB_SRep.js');
const modelTimeLog = require('../models/DB_TimeLog.js');
const ObjectId = require('mongodb').ObjectId;

const recordsCUHController = {
    getRecordsCUH: function (req, res) {
        try{
            db.findMany(modelSRep, {}, '', '', '', function(objSReps){
                virtualSReps = objSReps;

                db.findMany(modelTimeLog, {}, '', '', '', function(objTimeLogs){
                    virtualTimeLogs = objTimeLogs;
                        
                    console.log(virtualTimeLogs);

                    res.render("recordsCUH", {
                        sPage: "CUH Records",
                        sUserType: "CUH",
                        objSReps: objSReps,
                        objTimeLogs: objTimeLogs
                    });
                });
            });
        }
        catch{
            console.log(e)
        }
    },

    postRecordsCUH: function (req, res) {

    }
}

module.exports = recordsCUHController;