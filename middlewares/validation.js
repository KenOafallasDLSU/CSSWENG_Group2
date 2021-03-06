const { check } = require('express-validator');

const validation = {

    registerValidation: function () {
		
        var validation = [
		
            check('sUsername', 'Username should be exactly 8 digits.').isLength({min : 8, max: 8}),
			check('sPassword', 'Passwords should contain at least 8 characters.').isLength({min: 8}),
			check('sFirstName', 'First Name should not be empty.').notEmpty(),
			check('sLastName', 'Last Name should not be empty.').notEmpty(),
			
			check('sEmail', 'Email should not be empty.').notEmpty(), //format of email is not being checked.
         
			check('sCourse', 'Course should not be empty.').notEmpty(),		
            check('sCollege', 'College should not be empty').notEmpty(),	
     
			
        ];
        return validation;
		
    },

    loginValidation: function (){
        return [
            check('sUsername').not().isEmpty().withMessage("Invalid credentials").isAlphanumeric().withMessage("Invalid credentials"),
            check('sPassword').escape()
        ]
    },
    
}

module.exports = validation;