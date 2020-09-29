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

$(document).ready(function() {

    $('#studentSelect').change(function() {
        var id = $(this).val();

        //alert(id);
        if(id == "all"){
            $.post('postRecordsCUHAll', {cStatus: 'A'}, function(data, status) {
                console.log(data);
        
                var studentRecordTable = $('#studentRecords');
                studentRecordTable.empty(); // clear table data
        
                data.forEach((item, i) => {
                addRecordRow(item, studentRecordTable);
                });
            });
        } else{
            $.post('postRecordsCUHOne', {nQuery: {_id: id, cStatus: 'A'}, tQuery: {objSRep: id, cStatus: 'A'}}, function(data, status) {
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