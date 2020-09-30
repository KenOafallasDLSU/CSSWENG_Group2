function setInitDates() {
    var date = new Date();
    var nYear = date.getFullYear();
    var nMonth = date.getMonth()+1;
    var nDate = date.getDate();

    var sMonth;
    if(nMonth < 10)
        sMonth = "0" + nMonth.toString();
    else
        sMonth = nMonth.toString();

    var sDate;
    if(nDate < 10)
        sDate = "0" + nDate.toString();
    else
        sDate = nDate.toString();

    $('#sHolidayDate').val(nYear.toString() + "-" + sMonth + "-" + sDate);
}

function dateToString(objDate){
    var sYear = objDate.getFullYear().toString();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var sMonth = months[objDate.getMonth()];
    var sDay = objDate.getDate().toString();

    return sMonth + " " + sDay + ", " + sYear; 
}

$(document).ready(function() {
    setInitDates();

    $('#btnAddHoliday').click(function(){
        $.post('postInsertSuspension', {sDate: $('#sHolidayDate').val(), sReason: $('#sHoliday').val()}, function(data, status) {
                //console.log(status);
                //console.log(data);

                if(data == 3){
                    alert("Did not set new suspension. Selected day is a weekend.");
                }else if(data == 2){
                    alert("Did not set new suspension. Selected day is already suspended.");
                }else{
                    let row = document.createElement('tr');

                    var date = document.createElement('td');
                    var reason = document.createElement('td');

                    $(date).text(dateToString(new Date($('#sHolidayDate').val())));
                    $(reason).text($('#sHoliday').val());

                    row.append(date);
                    row.append(reason);

                    $('#susBody').prepend(row);
                }

        });
    });
});