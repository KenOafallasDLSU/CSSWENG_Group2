/**Database model requirements*/
const db = require('../models/db.js');
const modelSRep = require('../models/DB_SRep.js');
const modelTimeLog = require('../models/DB_TimeLog.js');
const modelCUH = require('../models/DB_CUH.js');
const { setMaxListeners } = require('../router/cuhRoutes.js');
const ObjectId = require('mongodb').ObjectId;

const cuhController = {
    getDashboard: function (req, res) {
        res.render("dashboard", {
            sPage: "Dashboard",
            sUserType: "Career Unit Head",
        })
    },

    /*  RECORDS SECTION*/

    /**
     * Initial Records, displays all records
     * 
     * @param {*} req unused 
     * @param {*} res 
     */
    getRecordsCUH: function (req, res) {
        try{
            db.findMany(modelSRep, {cAccStatus: 'A'}, '', '', '', function(objSReps){
                virtualSReps = objSReps;

                projection = {
                    _id: 1,
                    sFirstName: "$name.sFirstName",
                    sLastName: "$name.sLastName"
                    
                }

                db.aggregate({cStatus: 'A'}, modelTimeLog, "sreps", "objSRep", "_id", "name", projection, function(objSRepNames){
                    sRepNames = objSRepNames;

                    //console.log(sRepNames);
                    //console.log(sRepNames[0].name);

                    db.findMany(modelTimeLog, {cStatus: 'A'}, '', '', '', function(objTimeLogs){
                        virtualTimeLogs = objTimeLogs;
                        //console.log(virtualTimeLogs);


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

                        //console.log(records[0]);

    
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

    /**
     * When specific SRep selected
     * 
     * @param {*} req 
     * @param {*} res 
     */
    postRecordsCUHOne: function (req, res) {
        try{
                db.findOne(modelSRep, req.body.nQuery, '', function(objCurrSRep){
                    name = objCurrSRep;

                    db.findMany(modelTimeLog, req.body.tQuery, '', '', '', function(objTimeLogs){
                        virtualTimeLogs = objTimeLogs;
                        console.log(virtualTimeLogs);

                        records = [];
                        var i = 0
                        for(i = 0; i < objTimeLogs.length; i++)
                        {
                            record = {
                                name: name,
                                timelog: virtualTimeLogs[i]
                            }

                            records.push(record);
                        }

                        console.log(records[0]);
                        res.send(records)
                    });
                });

        }
        catch{
            console.log(e)
        }
    },

    /**
     * When its all
     * 
     * @param {*} req 
     * @param {*} res 
     */
    postRecordsCUHAll:function (req, res) {
        try{
            db.aggregate({cAccStatus: 'A'}, modelTimeLog, "sreps", "objSRep", "_id", "name", projection, function(objSRepNames){
                sRepNames = objSRepNames;

                //console.log(sRepNames);
                //console.log(sRepNames[0].name);

                db.findMany(modelTimeLog, {cStatus: 'A'}, '', '', '', function(objTimeLogs){
                    virtualTimeLogs = objTimeLogs;
                    //console.log(virtualTimeLogs);


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

                    res.send(records)
                });
            });
        }
        catch{
            console.log(e)
        }
    },

    /**ANALYTICS SECTION */
    /**
     * Initial page request. Displays hours per SRep
     * 
     * @param {*} req 
     * @param {*} res 
     */
    getViewAnalytics: function (req, res) {
        try{
            db.findMany(modelSRep, {cAccStatus: 'A'}, '', '', '', function(objSReps){
                virtualSReps = objSReps;

                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                db.findMany(modelTimeLog, {cStatus: 'A', objTimeIn:{$gte: firstDay, $lte: lastDay}, objTimeOut:{$gte: firstDay, $lte: lastDay}}, '', '', '', function(objTimeLogs){
                    virtualTimeLogs = objTimeLogs;
                        //console.log(virtualTimeLogs);

                    var records = [];
                    var i;
                    var k;
                    for(i = 0; i < virtualSReps.length; i++)
                    {
                        var sum = 0;
                        var count = 0;

                        for(k = 0; k < virtualTimeLogs.length; k++)
                        {
                            //console.log(virtualSReps[i]._id + " " + virtualTimeLogs[k].objSRep)
                            if(virtualSReps[i]._id.equals(virtualTimeLogs[k].objSRep))
                            {
                                sum = sum + virtualTimeLogs[k].fHours;
                                count = count + 1;
                            }
                        }

                        record = {
                            sFullName: virtualSReps[i].sFullName,
                            fTotalHours: sum,
                            nCount: count,
                            fAverage: sum/count,
                        }

                        records.push(record);
                    }


                    res.render("viewAnalytics", {
                        sPage: "Analytics",
                        sUserType: "CUH",
                        records: records
                    });
                });
            });
        }
        catch{
            console.log(e)
        }
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    postViewAnalytics: function (req, res) {
        try{
            db.findMany(modelSRep, {cStatus: 'A'}, '', '', '', function(objSReps){
                virtualSReps = objSReps;

                db.findMany(modelTimeLog, {cStatus: 'A'}, '', '', '', function(objTimeLogs){
                    virtualTimeLogs = objTimeLogs;
                        //console.log(virtualTimeLogs);

    
                    res.render("viewAnalytics", {
                        sPage: "Analytics",
                        sUserType: "CUH",
                    });
                });
            });
        }
        catch{
            console.log(e)
        }
    }

}

module.exports = cuhController;