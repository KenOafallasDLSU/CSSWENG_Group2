const { check } = require('express-validator');

/* database */
const db = require('../models/db.js');
const modelSREP = require('../models/DB_SRep.js');
const modelCUH = require('../models/DB_CUH.js');

const cuhAuthentication = {
    
    /***** Check if Session is Active *****/
    sessionActive: (req, res, next)=>{
        if (req.session.userid){
            next();
        }
        else
            return res.redirect('/login');
    },
    
    isValidCUH: (req, res, next)=>{
        if(req.params.sUsername == req.session.userId){
            db.findOne(modelCUH, {sUsername: req.session.userId}, '', function(objCUH){
                if (objCUH){
                    next();
                }
                else{
                    db.findOne(modelSREP, {sUsername: req.session.userId}, '', function(objSREP){
                        if (objSREP){
                            return res.redirect('/srep/' + objCUH.sUsername);
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
	
}

module.exports = cuhAuthentication;