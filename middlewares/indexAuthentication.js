const { check } = require('express-validator');

/* database */
const db = require('../models/db.js');
const modelCUH = require('../models/DB_CUH');
const modelSRep = require('../models/DB_SRep');

const authentication = {
    
    /***** Check if Session is Active *****/
    sessionActive: (req, res, next)=>{
        if (req.session.userId){
            next();
        }
        else
            return res.redirect('/login');
    },

    /***** Check if Session is not Active *****/
    sessionNotActive: (req, res, next)=>{
        if (req.session.userId){
            if (res.locals.user instanceof modelSRep) console.log("srep");
            
            db.findOne(modelSRep, {sUsername: req.session.userId}, '', function(objSREP){
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
        else
            next();
    },
    
	
}

module.exports = authentication;