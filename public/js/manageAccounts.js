$(document).ready(function() {
  
    $('#btnSubmitCreateCUH').click(function() {
        var sFirstName = $('#sFirstName').val();
        var sLastName = $('#sLastName').val();
        var sEmail = $('#sEmail').val();
        var sUserName = $('#sUsername').val();
        var sPassword = $('#sPassword').val();

        $.post('/manage-accounts/postCreateCUH', { sFirstName:sFirstName , sLastName:sLastName , sEmail:sEmail , sUserName:sUserName , sPassword:sPasswrord  }, function(){
            
        });

    });



    $('#btnSubmitGrant').click(function() {
        
        var sUserName = $('#sUsername').val();
        $.post('/manage-accounts/postGrantHRAccess', {sUserName:sUserName}, function(){
           
        });
 
    });

    $('#btnSubmiRevoke').click(function() {
        var sUserName = $('#sUsername').val();
        $.post('/manage-accounts/postRevokeHRAccess', {sUserName:sUserName}, function(){
           
        });
  
    });
});
