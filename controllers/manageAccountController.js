
const db = require('../models/db.js');
const modelSREP = require('../models/DB_SRep.js');
const modelCUH = require('../models/DB_CUH.js');

const saltRounds = 10;


const RequestController = {
  
 getManageAccount: function (req, res) {
		db.findOne(modelSREP,{bHRstatus:false}, null, function(a) {
			db.findOne(modelSREP,{bHRstatus:true}, null, function(b) {
				res.render('manage-accounts', {
					sPage:"Manage Accounts",
					AccStudentRepresentative:a.sUsername,
					RevokeStudentRepresentative:b.sUsername
				});
		}}
		},

 PostCUHRegister: function (req, res) {
    res.render('register',{success:"hidden"});
    },

    postRegister: function (req, res) {

 // var errors = validationResult(req);

 // if (!errors.isEmpty()) {

        //     errors = errors.errors;

        //     var details = {};
        //     for(i = 0; i < errors.length; i++)
        //         details[errors[i].param + 'Error'] = errors[i].msg;

        //     res.render('register', details);
        // }

 // else{

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
            })
 // }
    },

  postRevoke: function (req, res) {
        
			var user = req.body.sUsername;
			var conditions = {sUsername:user, bHRstatus:true};
				try {
				 db.updateOne(modelSREP, conditions, { 
				 $set:{
				 bHRstatus : false
				}
				});
				}catch(e) {
					console.log(e);

					   
				res.redirect("/cuh/dashboard/" + user);
				 
			},

 postAccept: function (req, res) {
        
        var user = req.body.sUsername;
		var conditions = {sUsername:user, bHRstatus:false};
				try {
					 db.updateOne(modelSREP, conditions, { 
					 $set:{
					 bHRstatus : true
					}
					});

				}catch(e) {
					console.log(e);

               
        res.redirect("/cuh/dashboard/" + user);
         
    },





}

module.exports = manageAccountsController;
}
