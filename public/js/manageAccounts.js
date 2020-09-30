$(document).ready(function() {
  
    $('#btnSubmitCreateCUH').click(function() {
		
        var sFirstName = $('#sFirstName').val();
        var sLastName = $('#sLastName').val();
        var sEmail = $('#sEmail').val();
        var sUserName = $('#sUsername').val();
        var sPassword = $('#sPassword').val();
		console.log("clicked me");

        $.post('/manage-accounts/postCUHRegister', { sFirstName:sFirstName , sLastName:sLastName , sEmail:sEmail , sUserName:sUserName , sPassword:sPasswrord  }, function(){
            
        });

    });

    $('#btnSubmitGrant').click(function() {        
        var sUserName = $('#sUsername').val();
        $.post('/manage-accounts/postAccept', {sUserName:sUserName}, function(){
           
        });
 
    });

    $('#btnSubmitRevoke').click(function() {
        var sUserName = $('#sUsername').val();
        $.post('/manage-accounts/postRevoke', {sUserName:sUserName}, function(){
         console.log("clicked me");  
        });
  
    });
});