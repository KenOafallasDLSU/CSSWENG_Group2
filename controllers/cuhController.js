/**Database model requirements*/
const db = require('../models/db.js');
const modelSRep = require('../models/DB_SRep.js');
const modelTimeLog = require('../models/DB_TimeLog.js');
const modelCUH = require('../models/DB_CUH.js')
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

    /*  Records*/

    /**
     * Initial Records, displays all records
     * 
     * @param {*} req unused 
     * @param {*} res 
     */
    getRecordsCUH: function (req, res) {
        try{
            db.findMany(modelSRep, {}, '', '', '', function(objSReps){
                virtualSReps = objSReps;

                projection = {
                    _id: 1,
                    sFirstName: "$name.sFirstName",
                    sLastName: "$name.sLastName"
                    
                }

                db.aggregate({}, modelTimeLog, "sreps", "objSRep", "_id", "name", projection, function(objSRepNames){
                    sRepNames = objSRepNames;

                    //console.log(sRepNames);
                    //console.log(sRepNames[0].name);

                    db.findMany(modelTimeLog, {}, '', '', '', function(objTimeLogs){
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
            db.aggregate({}, modelTimeLog, "sreps", "objSRep", "_id", "name", projection, function(objSRepNames){
                sRepNames = objSRepNames;

                //console.log(sRepNames);
                //console.log(sRepNames[0].name);

                db.findMany(modelTimeLog, {}, '', '', '', function(objTimeLogs){
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
        }    
}

module.exports = cuhController;