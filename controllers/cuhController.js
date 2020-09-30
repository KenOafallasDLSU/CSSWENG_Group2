/**Database model requirements*/
const db = require('../models/db.js');
const modelSRep = require('../models/DB_SRep.js');
const modelTimeLog = require('../models/DB_TimeLog.js');
const modelCUH = require('../models/DB_CUH.js');
const modelSuspension = require('../models/DB_Suspension.js');
const { setMaxListeners } = require('../router/cuhRoutes.js');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 10;

function getWeekdayCount(a, b){
    let aTime = a.getTime();
    let aDay = a.getDay();
    let bTime = b.getTime();
    let bDay = b.getDay();

    let count = 0;
    let inc = aDay;
    let i;
    for(i = 0; i <= (bTime-aTime)/(1000*60*60*24); i++)
    {
        if(!(inc % 7 == 0 || inc % 7 == 6))
            count = count+1;
        
        inc = inc+1;
    }

    return count;
}

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
                firstDay.setHours(0);
                var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                lastDay.setHours(23, 59, 59);
                var dayCount = getWeekdayCount(firstDay, lastDay);

                db.findMany(modelSuspension, {objDate:{$gte: firstDay, $lte: lastDay}}, '', '', '', function(holidays){
                    dayCount = dayCount - holidays.length;

                    db.findMany(modelTimeLog, {cStatus: 'A', objTimeIn:{$gte: firstDay, $lte: lastDay}}, '', '', '', function(objTimeLogs){
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

                            var ave;
                            if(count == 0)
                                ave = 0;
                            else
                                ave = sum/count;

                            record = {
                                sFullName: virtualSReps[i].sFullName,
                                fTotalHours: sum,
                                nCount: count,
                                fAverage: parseFloat(ave.toFixed(2)),
                                nDays: dayCount,
                                bGood: sum >= dayCount
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
            });
        }
        catch{
            console.log(e)
        }
    },

    /**
     * Get tital hours per SRep
     * 
     * @param {*} req 
     * @param {*} res 
     */
    postHoursPerSRep: function (req, res) {
        try{
            db.findMany(modelSRep, {cAccStatus: 'A'}, '', '', '', function(objSReps){
                var virtualSReps = objSReps;

                var firstDay = req.body.tStartDate;
                var lastDay = req.body.tEndDate;
                var dayCount = getWeekdayCount(new Date(firstDay), new Date(lastDay));

                db.findMany(modelSuspension, {objDate:{$gte: firstDay, $lte: lastDay}}, '', '', '', function(holidays){
                    dayCount = dayCount - holidays.length;

                    db.findMany(modelTimeLog, {cStatus: 'A', objTimeIn:{$gte: firstDay, $lte: lastDay}}, '', '', '', function(objTimeLogs){
                        var virtualTimeLogs = objTimeLogs;
                        
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

                            var ave;
                            if(count == 0)
                                ave = 0;
                            else
                                ave = sum/count;

                            record = {
                                sFullName: virtualSReps[i].sFullName,
                                fTotalHours: sum,
                                nCount: count,
                                fAverage: parseFloat(ave.toFixed(2)),
                                nDays: dayCount,
                                bGood: sum >= dayCount
                            }

                            records.push(record);
                        }
        
                        res.send(records);
                    });
                });
            });
        }
        catch{
            console.log(e)
        }
    },

    /**
     * Total hours per weekday, and hours per srep per weekday
     * 
     * @param {*} req 
     * @param {*} res 
     */
    postHoursPerWeekday: function (req, res) {
        try{
            db.findMany(modelSRep, {cAccStatus: 'A'}, '', '', '', function(objSReps){
                var virtualSReps = objSReps;

                var firstDay = req.body.tStartDate;
                var lastDay = req.body.tEndDate;

                db.findMany(modelTimeLog, {cStatus: 'A', objTimeIn:{$gte: firstDay, $lte: lastDay}}, '', '', '', function(objTimeLogs){
                    var virtualTimeLogs = objTimeLogs;
                    
                    var tMon = 0, tTue = 0, tWed = 0, tThu = 0, tFri = 0, tSat = 0, tSun = 0;
                    var records = [];
                    var i, k;
                    for(i = 0; i < virtualSReps.length; i++)
                    {
                        var mon = 0, tue = 0, wed = 0, thu = 0, fri = 0, sat = 0, sun = 0;

                        for(k = 0; k < virtualTimeLogs.length; k++)
                        {
                            if(virtualSReps[i]._id.equals(virtualTimeLogs[k].objSRep)){
                                switch(virtualTimeLogs[k].objTimeIn.getDay()){
                                    case 0: 
                                        tSun = tSun + virtualTimeLogs[k].fHours;
                                        sun = sun + virtualTimeLogs[k].fHours;
                                        break; 
                                    case 1:
                                        tMon = tMon + virtualTimeLogs[k].fHours;
                                        mon = mon + virtualTimeLogs[k].fHours;
                                        break;
                                    case 2:
                                        tTue = tTue + virtualTimeLogs[k].fHours;
                                        tue = tue + virtualTimeLogs[k].fHours;
                                        break;
                                    case 3: 
                                        tWed = tWed + virtualTimeLogs[k].fHours;
                                        wed = wed + virtualTimeLogs[k].fHours;
                                        break;
                                    case 4: 
                                        tThu = tThu + virtualTimeLogs[k].fHours;
                                        thu = thu + virtualTimeLogs[k].fHours;
                                        break;
                                    case 5: 
                                        tFri = tFri + virtualTimeLogs[k].fHours;
                                        fri = fri + virtualTimeLogs[k].fHours;
                                        break;
                                    case 6: 
                                        tSat = tSat + virtualTimeLogs[k].fHours;
                                        sat = sat + virtualTimeLogs[k].fHours;
                                        break;
                                }
                            }
                        }

                        var record = {
                            sFullName: virtualSReps[i].sFullName,
                            fMon: mon, fTue:tue, fWed: wed, fThu: thu, fFri: fri, fSat: sat, fSun: sun
                        }

                        records.push(record);
                    }

                    var record = {
                        sFullName: "Total",
                        fMon: tMon, fTue:tTue, fWed: tWed, fThu: tThu, fFri: tFri, fSat: tSat, fSun: tSun
                    }

                    records.unshift(record);
    
                    res.send(records);
                });
            });
        }
        catch{
            console.log(e)
        }
    },

    /** SUSPENSIONS */

    getSuspensions: function(req, res){
        try{
            db.findMany(modelSuspension, {}, {objDate: -1}, '', 15, function(objSuspensions){
                let suspensions = objSuspensions;

                res.render("holidays", {
                    sPage: "Suspensions",
                    sUserType: "CUH",
                    suspensions: suspensions
                });
            });
        } catch{
            console.log(e);
        }
        
    },

    postInsertSuspension: function(req, res){
        console.log(req.body);

        let susDate = new Date(req.body.sDate);
        susDate.setHours(12, 0, 0, 0);

        let suspension = {
            objDate: susDate,
            sReason: req.body.sReason
        }

        if(susDate.getDay() != 0 && susDate.getDay() != 6){ //not a weekend
            db.findMany(modelSuspension, {objDate: susDate}, '', '', '', function(arrDates){
                if(arrDates.length == 0){
                    db.insertOne(modelSuspension, suspension, function(result){
                        res.send(result);
                    }); 
                } else res.send("2");
            });
        } else res.send("3");
    }

}

module.exports = cuhController;