$(document).ready(function() {

    $('.answerButton').click(function() {
        let arrParts = this.id.split("-");
        let num = arrParts[0];
        let type = arrParts[1];

        let timeLogId = $('#' + num).val();

        $.post('postUpdateRequest', {objId: timeLogId, cStatus: type}, function(data, status) {
            
        });
        
        $('#' + num + "-A").remove();
        $('#' + num + "-R").remove();

        console.log(type);
        
            if(type == 'R')
                $('#' + num + "-P").text("REJECTED");
            else if(type == 'A')
                $('#' + num + "-P").text("ACCEPTED");

            console.log(num);
    });
});