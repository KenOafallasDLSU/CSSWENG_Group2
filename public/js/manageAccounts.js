
$(document).ready(function() {
  
    $('#btnSubmitCreateCUH').click(function() {
        // var sFirstName = $('#sFirstName').val();
        // var sLastName = $('#sLastName').val();
        // var sEmail = $('#sEmail').val();
        
         var sUsername = $('#GrantStudentSelect').val();

        // var sPassword = $('#sPassword').val();


        // console.log(sFirstName);
        // console.log(sLastName);
        // console.log(sEmail);
        // console.log(sUsername);
        // console.log(sPassword);

        // console.log('chicken');



        $.post('postCreateCUH', { sFirstName:sFirstName , sLastName:sLastName , sEmail:sEmail , sUserName:sUsername , sPassword:sPassword  }, 
        function(){
            
        // console.log('chicken ran');
        });
//   console.log('chicken run');
    });



    $('#btnSubmitGrant').click(function() {
        
      
        var sUsername = $('#GrantStudentSelect').val();
        console.log(sUsername);
        $.post('postGrantHRAccess', {sUserName:sUsername}, function(){
           

        });
        console.log(sUsername);
 console.log('chicken 2');
    });

    $('#btnSubmitRevoke').click(function() {
        var sUsername = $('#RevokeStudentSelect').val();
        console.log(sUsername);
        // console.log('chicken');
        $.post('postRevokeHRAccess', {sUserName:sUserName}, function(){
           
         
        });
        console.log(sUsername);
        // console.log('chicken2');
    });
});

