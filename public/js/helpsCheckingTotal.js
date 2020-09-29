function setInitDates() {
    var date = new Date();
    var nYear = date.getFullYear();
    var nMonth = date.getMonth()+1;

    var lastDayOfMonth = new Date(nYear, nMonth, 0);
    var nLastDay = lastDayOfMonth.getDate();

    var sMonth;
    if(nMonth < 10)
        sMonth = "0" + nMonth.toString();
    else
        sMonth = nMonth.toString();

    $('#sStartDate').val(nYear.toString() + "-" + sMonth + "-01");
    $('#sEndDate').val(nYear.toString() + "-" + sMonth + "-" + nLastDay.toString());
}

setInitDates();

$(document).ready(function() {
    setInitDates();
});