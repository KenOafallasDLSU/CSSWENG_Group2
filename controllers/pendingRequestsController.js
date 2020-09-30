const db = require('../models/db.js');
const modelSREP = require('../models/DB_SRep.js');
const modelCUH = require('../models/DB_CUH.js');
const modelTimeLog = require('../models/DB_TimeLog.js');

const pendingRequestsController = {
	
	getManageAccount: function (req, res) {
		try {

				db.findMany(modelTimeLog,{cStatus:'P'}, '','','', function(PendingTimeLog) {
					if (PendingTimeLog){
						arrPTimeLog = [];
						
						for(i = 0; i < PendingTimeLog.length; i++)
						{
							OnePTimeLog = {
								sUsername: PTimeLog[i].ObjSRep.sUsername,
								sReason: PTimeLog[i].sReason,
								sTask: PTimeLog[i].sTask,
								objSRep:PTimeLog[i]objSRep
							}

							arrPTimeLog.push(onPTimeLog);
						}
					}
					
					res.render('pendingRequests', { //name of the HBS file.
						sPage:'Pending Requests', // be guided sa index.js line 108
						RequestEntry:arrPTimeLog, //pls observe coding standards...
					});
				});

		} catch (error) {
			console.log("error!");
		}
	
		},
		
		
	postReject: function (req, res) {
			var sUsername = req.query.sUsername;
			var sReason = req.query.sReason;
			var sTask = req.query.sTask;
			var objSRep = req.query.objSRep;
			var conditions = {objSRep:objSRep,sReason:sReason,sTask:sTask};
					try {
						 db.updateOne(modelSREP, conditions, { 
						 $set:{
						 cStatus : 'R'
						}
						});

					}catch(e) {
					console.log(e);}

			res.redirect("/cuh/dashboard/" + user);
			 
    },
	
	postAccept: (req, res) {
			var sUsername = req.query.sUsername;
			var sReason = req.query.sReason;
			var sTask = req.query.sTask;
			var objSRep = req.query.objSRep;
			var conditions = {objSRep:objSRep,sReason:sReason,sTask:sTask};
					try {
						 db.updateOne(modelSREP, conditions, { 
						 $set:{
						 cStatus : 'A'
						}
						});

					}catch(e) {
					console.log(e);}

			res.redirect("/cuh/dashboard/" + user);
			 
    },
	
	
	
    
}

module.exports = pendingRequestsController;