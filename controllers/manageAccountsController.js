const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const db = require('../models/db.js');
const modelSREP = require('../models/DB_SRep.js');
const modelCUH = require('../models/DB_CUH.js');
const saltRounds = 10;


const manageAccountController = {
  
getManageAccount: function (req, res) {
		console.log("hatdog");
		try {
			db.findMany(modelSREP,{bHRstatus:false}, null, function(a) {
				db.findMany(modelSREP,{bHRstatus:true}, null, function(b) {
					res.render('manage-accounts', {
						sPage:"Manage Accounts",
						AccStudentRepresentative:a,
						RevokeStudentRepresentative:b
					});
			});
				});
		} catch (error) {
			console.log("hatdogfail");
		}
	
		},

postCUHRegister: function (req, res) {
	console.log("hatdog2");
		 var sUsername = req.body.sUsername;
		 var sPassword = req.body.sPassword;
		 var sFirstName = req.body.sFirstName;
		 var sLastName = req.body.sLastName;
		 var sEmail = req.body.sEmail;



		 bcrypt.hash(sPassword, saltRounds, function(err, hash) {

			 db.insertOne(modelSREP, {
			 sUsername: sUsername,
			 sPassword: hash,
			 sFirstName: sFirstName,
			 sLastName : sLastName,
			 sEmail: sEmail,



		}, function(flag){});

		});

		console.log('Created account of ' + sLastName + "," + sFirstName );
            
        return res.redirect("/cuh/dashboard/"+ objCUH.sUsername);
     
    },

  postRevoke: function (req, res) {
	console.log("hatdog3");
			var user = req.body.sUsername;
			var conditions = {sUsername:user, bHRstatus:true};
				try {
				 db.updateOne(modelSREP, conditions, { 
				 $set:{
				 bHRstatus : false
				}
				});
				}catch(e) {
				console.log(e);}

					   
				res.redirect("/cuh/dashboard/" + user);
				 
			},

 postAccept: function (req, res) {
	console.log("hatdog4");
        var user = req.body.sUsername;
		var conditions = {sUsername:user, bHRstatus:false};
				try {
					 db.updateOne(modelSREP, conditions, { 
					 $set:{
					 bHRstatus : true
					}
					});

				}catch(e) {
				console.log(e);}

               
        res.redirect("/cuh/dashboard/" + user);
         
    },

}

module.exports = manageAccountController;