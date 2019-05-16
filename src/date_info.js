import moment from 'moment';

function date_info(dates){
    return {
        days : days(dates),
        leap_year : leap_year(dates),
        mondays : mondays(dates)
    }
}

function days(dates){
    var start = moment(dates.start),
        end = moment(dates.end);

    return end.diff(start, 'days');
}

function leap_year(dates){
    var start_year = moment(dates.start).year(),
        end_year = moment(dates.end).year();


    if(is_leap_year(start_year) || is_leap_year(end_year)){
        return true
    }
    else{
        return false
    }
}

function is_leap_year(year){
    if((year - 1752) %4 === 0){
        return true;
    }
    else{
        return false;
    }
}

function mondays(dates){
    var mondays = 0;

    var start = moment(dates.start),
        end = moment(dates.end);

    var day_diff = end.diff(start, 'days');

    for(var i=0; i <= day_diff; i++){
        var this_date = new moment(dates.start).add(i, 'd').format('dddd');
        if(this_date === "Monday"){
            mondays++
        }
    }

    return mondays;
}

function day_event(dates, callback){
    var day = moment(dates.start).format('D'),
        month = moment(dates.start).format('M');

    fetch(`http://numbersapi.com/${month}/${day}/date`)
        .then(response => response.text())
        .then((resp) => {callback(resp)})
}

module.exports = {
    date_info : date_info,
    day_event : day_event
}