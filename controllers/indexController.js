const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const db = require('../models/db.js');
const modelSREP = require('../models/DB_SRep.js');
const modelCUH = require('../models/DB_CUH.js');

const indexController = {
    getDashboard: function (req, res) {
        res.render("dashboard", {
            sPage: "Dashboard",
            sUserType: "Student Representative",
        })
    },

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
                                res.locals.user = objSRep;

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
                                        res.locals.user = objCUH;
        
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

    logout: (req, res, next) =>{
        req.session.destroy(err => {
            if(err) throw err;
            
            return res.redirect('/');
        })
    },
}

module.exports = indexController;