/**Database model requirements*/
const db = require('../models/db.js');
const modelSRep = require('../models/DB_SRep.js');
const modelTimeLog = require('../models/DB_TimeLog.js');
const modelCUH = require('../models/DB_CUH.js')
const ObjectId = require('mongodb').ObjectId;

const cuhController = {
    getDashboard: function (req, res) {
        res.render("dashboard", {
            sPage: "Dashboard",
            sUserType: "Career Unit Head",
        })
    },

    /*  Records*/
    getRecordsCUH: function (req, res) {
        try{
            db.findMany(modelSRep, {}, '', '', '', function(objSReps){
                virtualSReps = objSReps;

                projection = {
                    _id: 1,
                    sFirstName: "$name.sFirstName",
                    sLastName: "$name.sLastName"
                    
                }

                db.aggregate(modelTimeLog, "sreps", "objSRep", "_id", "name", projection, function(objSRepNames){
                    sRepNames = objSRepNames;

                    //console.log(sRepNames);
                    //console.log(sRepNames[0].name);

                    db.findMany(modelTimeLog, {}, '', '', '', function(objTimeLogs){
                        virtualTimeLogs = objTimeLogs;
                        console.log(virtualTimeLogs);


                        records = [];
                        var i = 0
                        for(i = 0; i < objTimeLogs.length; i++)
                        {
                            record = {
                                name: sRepNames[i],
                                timelog: virtualTimeLogs[i]
                            }

                            records.push(record);
                        }

                        console.log(records[0]);

    
                        res.render("recordsCUH", {
                            sPage: "CUH Records",
                            sUserType: "CUH",
                            objSReps: objSReps,
                            records: records
                        });
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

module.exports = cuhController;