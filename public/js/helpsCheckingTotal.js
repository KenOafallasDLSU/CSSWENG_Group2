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

/**HOURS PER SREP */
function createPerSRepHeader(parentDiv){
    var row = document.createElement('tr');

    var name = document.createElement('th');
    var totalHours = document.createElement('th');
    var sessions = document.createElement('th');
    var average = document.createElement('th');

    $(name).text("Name");
    $(totalHours).text("Total Hours");
    $(sessions).text("Residency Sessions");
    $(average).text("Ave Hours/Session");

    row.append(name);
    row.append(totalHours);
    row.append(sessions);
    row.append(average);

    parentDiv.append(row);
}

function addPerSRepRow(item, parentDiv){
    var row = document.createElement('tr');

    var name = document.createElement('th');
    var totalHours = document.createElement('td');
    var sessions = document.createElement('td');
    var average = document.createElement('td');

    $(name).attr("scope", "row");
    $(name).text(item.sFullName);
    $(totalHours).text(item.fTotalHours);
    $(sessions).text(item.nCount);
    $(average).text(item.fAverage);

    row.append(name);
    row.append(totalHours);
    row.append(sessions);
    row.append(average);

    parentDiv.append(row);
}

/**HOURS PER WEEKDAY */
function createPerDayHeader(parentDiv){
    var row = document.createElement('tr');

    var header = document.createElement('th');
    var mon = document.createElement('th');
    var tue = document.createElement('th');
    var wed = document.createElement('th');
    var thu = document.createElement('th');
    var fri = document.createElement('th');
    var sat = document.createElement('th');
    var sun = document.createElement('th');

    $(header).attr("scope", "row");
    $(header).text("Name");
    $(mon).text("Monday");
    $(tue).text("Tuesday");
    $(wed).text("Wednesday");
    $(thu).text("Thursday");
    $(fri).text("Friday");
    $(sat).text("Saturday");
    $(sun).text("Sunday");

    row.append(header);
    row.append(mon);
    row.append(tue);
    row.append(wed);
    row.append(thu);
    row.append(fri);
    row.append(sat);
    row.append(sun);

    parentDiv.append(row);
}

function addPerDayRow(item, parentDiv){
    var row = document.createElement('tr');

    var header = document.createElement('th');
    var mon = document.createElement('td');
    var tue = document.createElement('td');
    var wed = document.createElement('td');
    var thu = document.createElement('td');
    var fri = document.createElement('td');
    var sat = document.createElement('td');
    var sun = document.createElement('td');

    $(header).attr("scope", "row");
    $(header).text(item.sFullName);
    $(mon).text(item.fMon);
    $(tue).text(item.fTue);
    $(wed).text(item.fWed);
    $(thu).text(item.fThu);
    $(fri).text(item.fFri);
    $(sat).text(item.fSat);
    $(sun).text(item.fSun);

    row.append(header);
    row.append(mon);
    row.append(tue);
    row.append(wed);
    row.append(thu);
    row.append(fri);
    row.append(sat);
    row.append(sun);

    parentDiv.append(row);
}

$(document).ready(function() {
    setInitDates();

    $('#btnViewAnalytics').click(function() {
        var type = $('#statSelect').val();

        var tStartDate = new Date($('#sStartDate').val());
        tStartDate.setHours(0);
        var tEndDate = new Date($('#sEndDate').val());
        tEndDate.setHours(23, 59, 59);

        if(type == "perSRep")
        {
            $.post('postHoursPerSRep', {tStartDate: tStartDate, tEndDate: tEndDate}, function(data, status) {
                console.log(data);
        
                var tableBody = $('#analyticsBody');
                tableBody.empty(); // clear table data
                var tableHeader = $('#analyticsHeader');
                tableHeader.empty();
        
                createPerSRepHeader(tableBody);
                data.forEach((item, i) => {
                    addPerSRepRow(item, tableBody);
                });
            });
        } else if(type == "perWeekday"){
            $.post('postHoursPerWeekday', {tStartDate: tStartDate, tEndDate: tEndDate}, function(data, status) {
                console.log(data);
        
                var tableBody = $('#analyticsBody');
                tableBody.empty(); // clear table data
                var tableHeader = $('#analyticsHeader');
                tableHeader.empty();
        
                createPerDayHeader(tableBody);
                data.forEach((item, i) => {
                    addPerDayRow(item, tableBody);
                });
            });
        }
        
    });
});