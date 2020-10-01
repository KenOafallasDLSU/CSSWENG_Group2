
$(document).ready(function() {
  
    $('#btnSubmitCreateCUH').click(function() {
        var sFirstName = $('#sFirstName').val();
        var sLastName = $('#sLastName').val();
        var sEmail = $('#sEmail').val();
        var sUserName = $('#sUsername').val();
        var sPassword = $('#sPassword').val();

        $.post('postCUHRegister', { sFirstName:sFirstName , sLastName:sLastName , sEmail:sEmail , sUserName:sUserName , sPassword:sPassword  }, function(){
            
        });

    });



    $('#btnSubmitGrant').click(function() {
        
<<<<<<< Updated upstream
        var sUserName = $('#sUsername').val();
        $.post('postAccept', {sUserName:sUserName}, function(){
=======
      console.log('chicken');
        var sUsername = $('#GrantStudentSelect').val();
        console.log(sUsername);
        $.post('postGrantHRAccess', {sUserName:sUsername}, function(){
>>>>>>> Stashed changes
           
        });
 
    });

<<<<<<< Updated upstream
    $('#btnSubmiRevoke').click(function() {
        var sUserName = $('#sUsername').val();
        $.post('postRevoke', {sUserName:sUserName}, function(){
=======
    $('#btnSubmitRevoke').click(function() {
        console.log('chicken');
        console.log('chicken');
        var sUsername = $('#revokeStudentSelect').val();
        console.log(sUsername);
        // console.log('chicken');
        $.post('postRevokeHRAccess', {sUserName:sUsername}, function(){
>>>>>>> Stashed changes
           
        });
  
    });
});