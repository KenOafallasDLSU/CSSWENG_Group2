const { check } = require('express-validator');
const modelSREP = require('../models/DB_SRep.js');
const modelCUH = require('../models/DB_CUH.js');

const sRepAuthentication = {
    
    /***** Check if Session is Active *****/
    sessionActive: (req, res, next)=>{
        if (req.session.userId){
            next();
        }
        else
            return res.redirect('/login');
    },
    
    isValidSRep: (req, res, next)=>{
        db.findOne(modelSREP, {sUsername: req.session.userId}, '', function(objSREP){
            if (objSREP){
                next();
            }
            else{
                db.findOne(modelCUH, {sUsername: req.session.userId}, '', function(objCUH){
                    if (objCUH){
                        return res.redirect('/cuh' + objCUH.sUsername);
                    }
                    else{
                        return res.redirect('/login');
                    }
                });
            }
        });
    },
	
}

module.exports = sRepAuthentication;