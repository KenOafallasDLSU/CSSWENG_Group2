const { check } = require('express-validator');

const validation = {

    registerValidation: function () {
		
        var validation = [
		
            check('sUsername', 'Username should 8 digits.').isLength({min : 8, max: 8}),
			check('sPassword', 'Passwords should contain at least 8 characters.').isLength({min: 8}),
			check('sFirstName', 'First Name should not be empty.').notEmpty(),
			check('sLastName', 'Last Name should not be empty.').notEmpty(),
			
			check('sEmail', 'Email should not be empty.').notEmpty(),
         
			check('sCourse', 'Course should not be empty.').notEmpty(),		
            check('sCollege', 'College should not be empty').notEmpty(),	
     
			
        ];
        return validation;
		
    },
	
}

module.exports = validation;