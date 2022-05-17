// Your code here
function createEmployeeRecord(details) {
    return {
        firstName: details[0],
        familyName: details[1],
        title: details[2],
        payPerHour: details[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    const records = [];
    for (const employee of employees) {
        records.push(createEmployeeRecord(employee));
    }
    return records;
}

function createTimeInEvent(record, stamp) {
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(stamp.slice(11, 15), 10),
        date: stamp.slice(0, 10)
    })
    return record;
}

function createTimeOutEvent(record, stamp) {
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(stamp.slice(11, 15), 10),
        date: stamp.slice(0,10)
    })
    return record;
}

function hoursWorkedOnDate(record, day) {
    let hours;
    for(let i=0; i<record.timeInEvents.length; i++) {
        if (record.timeInEvents[i].date === day) {
            hours = (record.timeOutEvents[i].hour - record.timeInEvents[i].hour);
            hours = hours/100;
        }
    }
    return hours;
}

function wagesEarnedOnDate(record, day) {
    let hours = hoursWorkedOnDate(record, day);
    let pay = hours * record.payPerHour;
    return pay;
}

function allWagesFor(record) {
    let pay = 0;
    for(let i=0; i<record.timeInEvents.length; i++) {
        pay += wagesEarnedOnDate(record, record.timeInEvents[i].date)
    }
    return pay;
}

function calculatePayroll(employees) {
    let pay = 0;
    for(let employee of employees) {
        pay += allWagesFor(employee);
    }
    return pay;
}