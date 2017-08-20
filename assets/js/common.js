function formatDate(date){
    
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    
    var strTime = hours + ':' + minutes + ':' + seconds;
    return strTime;
}

function formatDateFromStamp(stamp)
{
    var date = new Date(stamp * 1000);
    var years = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    month = month < 10 ? '0'+month : month;
    day = day < 10 ? '0' + day : day;
    hours = hours < 10 ? '0'+hours : hours;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    
    var strTime = years + "-" + month + "-" + day + " " + hours + ':' + minutes + ':' + seconds;
    return strTime;
}
function setTimeFormat(strTime){
    var date = new Date(),
        parts = strTime.match(/(\d+)\:(\d+):(\d+)/),
        hours = parseInt(parts[1], 10),
        minutes = parseInt(parts[2], 10),
        seconds = parseInt(parts[3], 10);

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);
    return date;
}

function exportToCsv(filename, rows) 
{
     var processRow = function (row) 
     {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : (row[j] === undefined? '' : row[j].toString());
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else 
    {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }        
}

function getStartTimeOfToday()
{
    var today = new Date();
    start_time = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " 00:00:00";
    return start_time;
}
function getEndTimeOfToday()
{
    var today = new Date();    
    end_time = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " 23:59:59";
    return end_time;
}

function getStartTimeOfYesterday()
{
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    start_time = yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + yesterday.getDate() + " 00:00:00";    
    return start_time;
}
function getEndTimeOfYesterday()
{
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);    
    end_time = yesterday.getFullYear() + "-" + (yesterday.getMonth() + 1) + "-" + yesterday.getDate() + " 23:59:59";    
    return end_time;
}

function getStartTimeOfCurrentWeek()
{
    var today = new Date; // get current date
    var first = today.getDate() - today.getDay() + 1; // First day is the day of the month - the day of the week   
    var firstday = new Date(today.setDate(first));    
    start_time = firstday.getFullYear() + "-" + (firstday.getMonth() + 1) + "-" + firstday.getDate() + " 00:00:00";
    return start_time;    
}
function getEndTimeOfCurrentWeek()
{
    var today = new Date; // get current date    
    var first = today.getDate() - today.getDay() + 1; // First day is the day of the month - the day of the week 
    var last = first + 6; // last day is the first day + 6    
    var lastday = new Date(today.setDate(last));    
    end_time = lastday.getFullYear() + "-" + (lastday.getMonth() + 1) + "-" + lastday.getDate() + " 23:59:59";
    return end_time;
}

function getStartTimeOfPreviousWeek()
{
    var today = new Date; // get current date
    var first = today.getDate() - today.getDay() - 7; // First day is the day of the month - the day of the week    
    var firstday = new Date(today.setDate(first));    
    start_time = firstday.getFullYear() + "-" + (firstday.getMonth() + 1) + "-" + firstday.getDate() + " 00:00:00";
    return start_time;
}
function getEndTimeOfPreviousWeek()
{
    var today = new Date; // get current date
    var first = today.getDate() - today.getDay() - 7; // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6    
    var lastday = new Date(today.setDate(last));    
    end_time = lastday.getFullYear() + "-" + (lastday.getMonth() + 1) + "-" + lastday.getDate() + " 23:59:59";    
    return end_time;
}

function getStartTimeOfCurrentMonth()
{
    var today = new Date();
    var firstday = new Date(today.getFullYear(), today.getMonth(), 1);    
    start_time = firstday.getFullYear() + "-" + (firstday.getMonth() + 1) + "-" + firstday.getDate() + " 00:00:00";
    return start_time;
}
function getEndTimeOfCurrentMonth()
{
    var today = new Date();    
    var lastday = new Date(today.getFullYear(), today.getMonth() + 1, 0);    
    end_time = lastday.getFullYear() + "-" + (lastday.getMonth() + 1) + "-" + lastday.getDate() + " 23:59:59";
    return end_time;
}

function getStartTimeOfPreviousMonth()
{
    var today = new Date();
    var firstday = new Date(today.getFullYear(), today.getMonth() - 1, 1);    
    start_time = firstday.getFullYear() + "-" + (firstday.getMonth() + 1) + "-" + firstday.getDate() + " 00:00:00";
    return start_time;
}
function getEndTimeOfPreviousMonth()
{
    var today = new Date();    
    var lastday = new Date(today.getFullYear(), today.getMonth(), 0);    
    end_time = lastday.getFullYear() + "-" + (lastday.getMonth() + 1) + "-" + lastday.getDate() + " 23:59:59";
    return end_time;
}


