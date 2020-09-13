const { check } = require('express-validator');

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
            return res.redirect('/');
        }
        else
            next();
    },
    
	
}

module.exports = authentication;