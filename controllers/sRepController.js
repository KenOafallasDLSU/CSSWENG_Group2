const db = require('../models/db.js');
const modelSREP = require('../models/DB_SRep.js');
const modelTimeLog = require('../models/DB_TimeLog.js');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const { findOne } = require('../models/DB_SRep.js');
const { redirect } = require('./indexController.js');
const saltRounds = 10;


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
            var id = req.session.primaryKey;

            db.findMany(modelTimeLog, {objSRep: req.session.primaryKey, cStatus: "A"}, {objTimeIn: -1}, '', 20, function(objTimeLogs){
                records = objTimeLogs;

                //res.send(records)
                res.render("records", {
                    sPage: "SReps Records",
                    sUserType: "Student Representative",
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

    var remainingHours = 20.00;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    firstDay.setHours(0);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59);

    var conditions = {sUsername:user};
    
    
    console.log(user);
       try{
            db.findOne(modelSREP, conditions, '', function (x) {
               db.findMany(modelTimeLog, {objSRep: id, cStatus: 'A', objTimeIn:{$gte: firstDay, $lte: lastDay}}, '', '', '', function(objTimeLogs){
                    var virtualTimeLogs = objTimeLogs;
                    for(i = 0; i < virtualTimeLogs.length; i++){
                        remainingHours = remainingHours - virtualTimeLogs[i].fHours;
                    }

                    res.render("profile", {
                        sPage: "Profile",
                        sUserType: "Student Representative",
                        sFirstName: x.sFirstName,
                        sLastName: x.sLastName,
                        sEmail: x.sEmail,
                        sCourse: x.sCourse,
                        sUserID: x.sUsername,
                        bHRStatus: x.bHRStatus,
                        remainingHours: remainingHours,
                    })
                });
            });
       }
       catch(e){
           console.log(e)
       }
   },

    getChangePassword: function (req, res) {
        res.render("changePassword", {
            sPage: "changePassword",
        })
    },
	
	 postChangePassword: function (req, res){
        //var objSRep = ObjectId(res.locals.user);

            try {

                db.findOne(modelSREP, {sUsername: req.session.userId}, '', function(objSRep){
                    if (objSRep){
                        bcrypt.compare(req.body.sPassword, objSRep.sPassword, (err, result)=>{
                            if (err) {
                                return res.status(401).render("changePassword", {
                                    pageName: "Change Password",
                                    errors: [{msg: "Invalid credentials"}],
                                })
                            } 
                            if (result) {
                                //var sNewPassword = req.body.sNewPassword;
								bcrypt.hash(req.body.sNewPassword, saltRounds, function(err, hash) {
			
								db.updateOne(modelSREP, {sUsername: objSRep.sUsername}, { 	
									$set:{
                                        sPassword : hash,
									}					
									});
								});
                                console.log('>>>>>>>>>>>>>>>>Password Changed!<<<<<<<<<<<<<<<<<<');
                                return res.redirect("/srep/"+ objSRep.sUsername);
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
                        db.findOne(modelCUH, {sUsername: req.body.sUsername}, '', function(objCUH){
                            if (objCUH){
                                return res.redirect("/cuh/changePassword/" + req.session.userId);
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
}

module.exports = sRepController;
