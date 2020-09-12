const db = require('../models/db.js');
const SRep = require('../models/DB_SRep.js');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const indexController = {
	
    getDashboard: function (req, res) {
        res.render("dashboard", {
            sPage: "Dashboard",
            sUserType: "Student Representative",
        })
    },
	
	  getRegister: function (req, res) {
        res.render('register',{success:"hidden"});
    },

    postRegister: function (req, res) {
		
		var errors = validationResult(req);
		
		if (!errors.isEmpty()) {

            errors = errors.errors;
			
            var details = {};
            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            res.render('register', details);
        }
		
		else{
		
			var sUsername = req.body.sUsername;
			var sPassword = req.body.sPassword;
			var sFirstName = req.body.sFirstName;
			var sLastName = req.body.sLastName;
			
			
			var sEmail = req.body.sEmail;
			
			var sCollege = req.body.sCollege;
			var sCourse = req.body.sCourse;
			
			
			bcrypt.hash(sPassword, saltRounds, function(err, hash) {
			
				db.insertOne(SRep, {
					sUsername: sUsername,
					sPassword: sPassword,
					sFirstName: sFirstName,
					sLastName : sLastName,
					
					sEmail: sEmail,
					
					sCollege : sCollege,
					sCourse : sCourse,
					bActiveStatus: true,
					bHRStatus: false,
					cAccStatus:'P'
					
				}, function(flag){});
			
			});

			console.log('Created account of ' + sLastName + "," + sFirstName );
			res.render('register');
		}
    },

	checkID: function (req, res) {
        var sUsername = req.query.sUsername;
        db.findOne(SRep, {sUsername: sUsername}, {sUsername:1}, function (result) {
            res.send(result);
        });
    }
	
}

module.exports = indexController;