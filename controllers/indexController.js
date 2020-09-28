const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');

/* database */
const db = require('../models/db.js');
const modelSREP = require('../models/DB_SRep.js');
const modelCUH = require('../models/DB_CUH.js');
const ObjectId = require('mongodb').ObjectId;

const saltRounds = 10;

const indexController = {
	
    getLogin: function (req, res) {
        res.render("login", {
            sPage: "Login",
        })
    },

    postLogin: function (req, res, next){
        const errors = validationResult(req).array({onlyFirstError: true});
        
        if (errors.length > 0){
            return res.status(403).render("login", {
                sPage: "Login",
                errors: errors,
            })
        }
        else{
            try {

                db.findOne(modelSREP, {sUsername: req.body.sUsername}, '', function(objSRep){
                    if (objSRep){
                        bcrypt.compare(req.body.sPassword, objSRep.sPassword, (err, result)=>{
                            if(err){
                                return res.status(401).render("login", {
                                    pageName: "Login",
                                    errors: [{msg: "Invalid credentials"}],
                                })
                            } 
                            if (result) {
                                req.session.userId = objSRep.sUsername;
                                res.locals.user = ObjectId(objSRep._id); 

                                return res.redirect("/srep/"+ objSRep.sUsername);
                            }
                            else{
                                return res.status(401).render("login", {
                                    pageName: "Login",
                                    errors: [{msg: "Invalid credentials"}],
                                })
                            }
                        })
                    }
                    else{
                        db.findOne(modelCUH, {sUsername: req.body.sUsername}, '', function(objCUH){
                            if (objCUH){
                                bcrypt.compare(req.body.sPassword, objCUH.sPassword, (err, result)=>{
                                    if(err){
                                        return res.status(401).render("login", {
                                            pageName: "Login",
                                            errors: [{msg: "Invalid credentials"}],
                                        })
                                    } 
                                    if (result) {
                                        req.session.userId = objCUH.sUsername;
                                        res.locals.user = ObjectId(objCUH._id);
        
                                        return res.redirect("/cuh/"+ objCUH.sUsername);
                                    }
                                    else{
                                        return res.status(401).render("login", {
                                            pageName: "Login",
                                            errors: [{msg: "Invalid credentials"}],
                                        })
                                    }
                                })
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
            } catch (e) {
                console.log(e);
            }
        }
    },
    
    /***** REGISTER *****/
    
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
			
				db.insertOne(modelSREP, {
					sUsername: sUsername,
					sPassword: hash,
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
            
            return res.render("login", {
                sPage: "Login",
            })
		}
    },

	checkID: function (req, res) {
        var sUsername = req.query.sUsername;
        db.findOne(modelSREP, {sUsername: sUsername}, {sUsername:1}, function (result) {
            res.send(result);
        });
    },

    /***** logout *****/
    getLogout: function (req, res){
        req.session.destroy(err => {
            if(err) throw err;
            return res.redirect('/');
        })
    },

    /* redirects to valid url path */
    redirect: function(req, res){
        console.log(req.url);
        try {
            db.findOne(modelSREP, {sUsername: req.session.userId}, '', function(objSREP){
                if (objSREP){
                    return res.redirect('/srep' + req.url + '/' + req.session.userId);
                }
                else{
                    db.findOne(modelCUH, {sUsername: req.session.userId}, '', function(objCUH){
                        if (objCUH){
                            return res.redirect('/cuh' + req.url + '/' + req.session.userId);
                        }
                        else{
                            return res.redirect('/logout');
                        }
                    });
                }
            });
        } catch (error) {
            
        }
    }
	
}

module.exports = indexController;