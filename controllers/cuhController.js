/**Database model requirements*/
const db = require('../models/db.js');
const modelSRep = require('../models/DB_SRep.js');
const modelTimeLog = require('../models/DB_TimeLog.js');
const modelCUH = require('../models/DB_CUH.js');
const { setMaxListeners } = require('../router/cuhRoutes.js');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
                var virtualSReps = objSReps;

                var projection = {
                    _id: 1,
                    sFirstName: "$name.sFirstName",
                    sLastName: "$name.sLastName"
                    
                }

                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                firstDay.setHours(0);
                var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                lastDay.setHours(23,59,59);

                db.aggregate({cStatus: 'A', objTimeIn:{$gte: firstDay, $lte: lastDay}}, modelTimeLog, "sreps", "objSRep", "_id", "name", projection, function(objSRepNames){
                    var sRepNames = objSRepNames;

                    //console.log(sRepNames);
                    //console.log(sRepNames[0].name);

                    db.findMany(modelTimeLog, {cStatus: 'A', objTimeIn:{$gte: firstDay, $lte: lastDay}}, '', '', '', function(objTimeLogs){
                        virtualTimeLogs = objTimeLogs;
                        //console.log(virtualTimeLogs);


                        var records = [];
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

    getChangePassword: function (req, res) {
        res.render("changePassword", {
            sPage: "changePassword",
        })
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
                    var name = objCurrSRep;

                    db.findMany(modelTimeLog, req.body.tQuery, '', '', '', function(objTimeLogs){
                        var virtualTimeLogs = objTimeLogs;
                        console.log(virtualTimeLogs);

                        var records = [];
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
            var firstDay = req.body.tStartDate;
            var lastDay = req.body.tEndDate;

            var projection = {
                _id: 1,
                sFirstName: "$name.sFirstName",
                sLastName: "$name.sLastName"
                
            }

            // console.log(firstDay);
            // console.log(lastDay);

            var objFirstDay = new Date(firstDay);
            var objLastDay = new Date(lastDay);

            db.aggregate({cStatus: 'A', objTimeIn: {$gte: objFirstDay, $lte: objLastDay}}, modelTimeLog, "sreps", "objSRep", "_id", "name", projection, function(objSRepNames){
                var sRepNames = objSRepNames;

                //console.log(sRepNames);
                //console.log(sRepNames[0].name);

                db.findMany(modelTimeLog, {cStatus: 'A', objTimeIn: {$gte: firstDay, $lte: lastDay}}, '', '', '', function(objTimeLogs){
                    var virtualTimeLogs = objTimeLogs;
                    //console.log(virtualTimeLogs);


                    var records = [];
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
	
	 postChangePassword: function (req, res, next){
        
		try {

            db.findOne(modelCUH, {sUsername: req.session.userId}, '', function(objCUH){
                if (objCUH){
                    bcrypt.compare(req.body.sPassword, objCUH.sPassword, (err, result)=>{
                        if (err) {
                            return res.status(401).render("changePassword", {
                                pageName: "Change Password",
                                errors: [{msg: "Invalid credentials"}],
                            })
                        } 
                        if (result) {
                            //var sNewPassword = req.body.sNewPassword;
                            bcrypt.hash(req.body.sNewPassword, saltRounds, function(err, hash) {
        
                            db.updateOne(modelCUH, {sUsername: objCUH.sUsername}, { 	
                                $set:{
                                    sPassword : hash,
                                }					
                                });
                            });
                            console.log('>>>>>>>>>>>>>>>>Password Changed!<<<<<<<<<<<<<<<<<<');
                            return res.redirect("/cuh/"+ objCUH.sUsername);
                        }
                        else{
                            return res.status(401).render("changePassword", {
                                pageName: "Change Password",
                                errors: [{msg: "Invalid credentials"}],
                            })
                        }
                    })    
                }
                else{
                    db.findOne(modelSREP, {sUsername: req.body.sUsername}, '', function(objSREP){
                        if (objSREP){
                            return res.redirect("/srep/changePassword/" + req.session.userId);
                        }
                        else{
                            return res.status(403).render("login", {
                                pageName: "Login",
                                errors: [{msg: "Invalid credentials"}],
                            }) 
                        }
                    });
                }
            });
            }catch (e){
            console.log(e);
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
                var virtualSReps = objSReps;

                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                db.findMany(modelTimeLog, {cStatus: 'A', objTimeIn:{$gte: firstDay, $lte: lastDay}, objTimeOut:{$gte: firstDay, $lte: lastDay}}, '', '', '', function(objTimeLogs){
                    var virtualTimeLogs = objTimeLogs;
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