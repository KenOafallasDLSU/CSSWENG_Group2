const db = require('../models/db.js');
const modelSRep = require('../models/DB_SRep.js');
const modelTimeLog = require('../models/DB_TimeLog.js');
const sRep = require('../models/DB_SRep.js');
const ObjectId = require('mongodb').ObjectId;

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
    /*
    getSReps:

    getSRep:

    getRecord:

    more functions under srep c:
    
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
}

module.exports = sRepController;