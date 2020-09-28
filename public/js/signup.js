$(document).ready(function () {

    $('#sFirstName').keyup(function () {
		
        validateField($('#sFirstName'), 'sFirstName', $('#sFirstNameError'));
		
    });
	
	$('#sLastName').keyup(function () {
		
        validateField($('#sLastName'), 'sLastName', $('#sLastNameError'));
		
    });

	$('#sUsername').keyup(function () {

        validateField($('#sUsername'), 'sUsername', $('#sUsernameError'));
		
    });
 
    $('#sCourse').keyup(function () {

        validateField($('#sCourse'), 'sCourse', $('#sCourseError'));
		
    });
	
	 $('#sCollege').keyup(function () {

        validateField($('#sCollege'), 'sCollege', $('#sCollegeError'));
		
    });
	
    $('#sPassword').keyup(function () {

        validateField($('#sPassword'), 'sPassword', $('#sPasswordError'));
		
    });
	
	 $('#sEmail').keyup(function () {

        validateField($('#sEmail'), 'sEmail', $('#sEmailError'));
		
    });
	
	
	//Validators
	function isFilled() {

		var sUsername = validator.trim($('#sUsername').val());
        var SEmail = validator.trim($('#sEmail').val());
        var sFirstName = validator.trim($('#sFirstName').val());
        var sLastName = validator.trim($('#sLastName').val());
		var SCollege = validator.trim($('#sCollege').val());
        var sCourse = validator.trim($('#sCourse').val());
        var sPassword = validator.trim($('#sPassword').val());
		
        var sEmailEmpty = validator.isEmpty(sEmail);
        var sFirstNameEmpty = validator.isEmpty(sFirstName);
		var sLastNameEmpty = validator.isEmpty(sLastNamename);
        var sUsernameEmpty = validator.isEmpty(sUsername);
		var sCourseEmpty = validator.isEmpty(sCourse);
        var sCollegeEmpty = validator.isEmpty(sCollege);
        var sPasswordEmpty = validator.isEmpty(sPassword);

		return !sEmailEmpty && !sFirstNameEmpty && !sLastNameEmpty && !sUsernameEmpty && !sCourseEmpty && !sCollegeEmpty && !sPasswordEmpty;
    };
	
	function isValidUsername(field, callback) {
		
        var id = validator.trim($('#sUsername').val());
        var isValidLength = validator.isLength(id, {min: 8, max: 8});
		
        if(isValidLength) {
			
            $.get('/checkID', {sUsername: sUsername}, function (result) {

                if(result.sUsername != sUsername) {
					
                    if(field.is($('#sUsername')))
                        $('#sUsernameError').text('');
					
                    return callback(true);

                }
                else {
					
                    if(field.is($('#sUsername')))
                        $('#sUsernameError').text('ID number already exists.');
					
                    return callback(false);
                }
            });
        }
        else {
			
            if(field.is($('#sUsername')))
                $('#sUsernameError').text('ID Number should contain 8 digits.');
			
            return callback(false);
        }
		
    };
	
	
	
	function isValidPassword(field) {

        var validPassword = false;

        var password = validator.trim($('#sPassword').val());
        var isValidLength = validator.isLength(password, {min: 8});
		
        if(isValidLength) {
			
            if(field.is($('#sPassword')))
                $('#sPasswordError').text('');
			
            validPassword = true;
        }
        else {
			
            if(field.is($('#sPassword')))
                $('#sPasswordError').text(`Should be at least 8characters.`);
			
        }
		
        return validPassword;
		
    };
	
	function validateField(field, fieldName, error) {
		
		var value = validator.trim(field.val());
		var empty = validator.isEmpty(value);
		
		if(empty) {
			
			field.prop('value', '');
			error.text(fieldName + ' should not be empty.');
			
		}
		else
			error.text('');
		
		
		var filled = isFilled();
		var validPassword = isValidPassword(field);

		isValidUsername(field, function (validUsername) {
			
			var validUsername = validUsername;
			
		});
		
		if(filled && validPassword && validUsername)
			$('#submit').prop('disabled', true);
		else
			$('#submit').prop('disabled', false);
	
    }
	
});
