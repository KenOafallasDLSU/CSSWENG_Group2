const db = require('../models/db.js');
const sRep = require('../models/DB_SRep.js');

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

    more functions under srep c:
    
    */
}

module.exports = sRepController;