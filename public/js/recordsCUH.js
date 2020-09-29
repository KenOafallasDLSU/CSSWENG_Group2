function addRecordRow(item, parentDiv) {
    var row = document.createElement('tr');

    var header = document.createElement('th');
    var date = document.createElement('td');
    var timeIn = document.createElement('td');
    var timeOut = document.createElement('td');
    var task = document.createElement('td');
    var hours = document.createElement('td');

    $(header).attr("scope", "row");
    $(header).text(item.name.sFirstName + " " + item.name.sLastName);
    $(date).text(item.timelog.sDate);
    $(timeIn).text(item.timelog.sTimeIn);
    $(timeOut).text(item.timelog.sTimeOut);
    $(task).text(item.timelog.sTask);
    $(hours).text(item.timelog.fHours);

    row.append(header);
    row.append(date);
    row.append(timeIn);
    row.append(timeOut);
    row.append(task);
    row.append(hours);

    parentDiv.append(row);
}

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

$(document).ready(function() {
    setInitDates();

    $('#btnSubmit').click(function() {
        var id = $('#studentSelect').val();

        var tStartDate = new Date($('#sStartDate').val());
        tStartDate.setHours(0);
        var tEndDate = new Date($('#sEndDate').val());
        tEndDate.setHours(23, 59, 59);

        //alert(id);
        if(id == "all"){
            $.post('postRecordsCUHAll', {tStartDate: tStartDate, tEndDate: tEndDate}, function(data, status) {
                console.log(data);
        
                var studentRecordTable = $('#studentRecords');
                studentRecordTable.empty(); // clear table data
        
                data.forEach((item, i) => {
                addRecordRow(item, studentRecordTable);
                });
            });
        } else{
            $.post('postRecordsCUHOne', {nQuery: {_id: id, cAccStatus: 'A'}, tQuery: {objSRep: id, cStatus: 'A', objTimeIn:{$gte: tStartDate, $lte: tEndDate}}}, function(data, status) {
                console.log(data);
        
                var studentRecordTable = $('#studentRecords');
                studentRecordTable.empty(); // clear table data
        
                data.forEach((item, i) => {
                addRecordRow(item, studentRecordTable);
                });
            });
        }
    });
});