const { check } = require('express-validator');

/* database */
const db = require('../models/db.js');
const modelSREP = require('../models/DB_SRep.js');
const modelCUH = require('../models/DB_CUH.js');

const sRepAuthentication = {
    
    /***** Check if Session is Active *****/
    sessionActive: (req, res, next)=>{
        if (req.session.userId){
            console.log("active session, next lang");
            next();
        }
        else{
            console.log("no active session, redirect");
            return res.redirect('/login');
        }
    },
    
    isValidSRep: (req, res, next)=>{        
        if(req.params.sUsername == req.session.userId){
            db.findOne(modelSREP, {sUsername: req.session.userId}, '', function(objSREP){
                if (objSREP){
                    next();
                }
                else{
                    db.findOne(modelCUH, {sUsername: req.session.userId}, '', function(objCUH){
                        if (objCUH){
                            return res.redirect('/cuh/' + objCUH.sUsername);
                        }
                        else{
                            return res.redirect('/logout');
                        }
                    });
                }
            });
        }else{
            db.findOne(modelSREP, {sUsername: req.session.userId}, '', function(objSREP){
                if (objSREP){
                    return res.redirect('/srep/' + objSREP.sUsername);
                }
                else{
                    db.findOne(modelCUH, {sUsername: req.session.userId}, '', function(objCUH){
                        if (objCUH){
                            return res.redirect('/cuh/' + objCUH.sUsername);
                        }
                        else{
                            return res.redirect('/logout');
                        }
                    });
                }
            });
        }
    },

    redirect: (req, res, next) =>{
        if(req.params.sUsername === req.session.userId){
            next();
        }
        else{
            return res.redirect(req.url + '/' + req.session.userId);
        }
    },
	
}

module.exports = sRepAuthentication;