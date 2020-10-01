
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

			db.findMany(modelSREP,{bHRStatus:false}, '','','', function(nonHR) {
				if (nonHR){
					arrNonHR = [];
					oneNonHR = {};
					
					for(i = 0; i < nonHR.length; i++)
					{
						oneNonHR = {
							sUsername: nonHR[i].sUsername,
							sFirstName: nonHR[i].sFirstName,
							sLastName: nonHR[i].sLastName,
						}

						arrNonHR.push(oneNonHR);
					}

					arrNonHR = quick_Sort_srep(arrNonHR);
				}

				db.findMany(modelSREP,{bHRStatus:true}, '','','', function(HR) {
					if (HR){
						arrHR = [];
						oneHR = {};
						
						for(i = 0; i < HR.length; i++)
						{
							oneHR = {
								sUsername: HR[i].sUsername,
								sFirstName: HR[i].sFirstName,
								sLastName: HR[i].sLastName,
							}

							arrHR.push(oneHR);
						}

						arrHR = quick_Sort_srep(arrHR);
					}
					
					res.render('manageAccounts', { //name of the HBS file.
						sPage:'Manage Accounts', // be guided sa index.js line 108
						arrNonHR:arrNonHR, //pls observe coding standards...
						arrHR:arrHR
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
			var user = req.body.sUserName;
			console.log(user);
			var conditions = {sUsername:user, bHRStatus:true};
				try {
<<<<<<< Updated upstream
				 db.updateOne(modelSREP, conditions, { 
				 $set:{
				 bHRstatus : false
				}
				});
				}catch(e) {
				console.log(e);}

					   
				res.redirect("/cuh/dashboard/" + user);
=======
				 db.updateOne(modelSREP, conditions, {bHRStatus:false} , function(status) {
					console.log(status);
				});
				
				
				}catch(e) {
				console.log(e);}

	
				// res.redirect("/cuh/manage-accounts/" + user);
>>>>>>> Stashed changes
				 
			},

 postAccept: function (req, res) {
	console.log("hatdog4");
<<<<<<< Updated upstream
        var user = req.body.sUsername;
		var conditions = {sUsername:user, bHRstatus:false};
				try {
					 db.updateOne(modelSREP, conditions, { 
					 $set:{
					 bHRstatus : true
					}
=======
        var user = req.body.sUserName;
		var conditions = {sUsername:user, bHRStatus:false};
				try {
					 db.updateOne(modelSREP,conditions, {bHRStatus:true} , function(status){ 
					 
						console.log(status);
					 
>>>>>>> Stashed changes
					});

				}catch(e) {
				console.log(e);}

               
<<<<<<< Updated upstream
        res.redirect("/cuh/dashboard/" + user);
=======
        // res.redirect("/cuh/manage-accounts/" + user);
>>>>>>> Stashed changes
         
    },
  

}


function quick_Sort_srep(arr) {
    if (arr.length <= 1) { 
        return arr;
    } else {

        var left = [];
        var right = [];
        var newArray = [];
        var pivot = arr.pop();
        var length = arr.length;

        for (var i = 0; i < length; i++) {
            let r = arr[i].sLastName.localeCompare(pivot.sLastName);
            if (r == 0 || r == -1) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return newArray.concat( quick_Sort_srep(left), pivot,  quick_Sort_srep(right));
    }
}


module.exports = manageAccountController;