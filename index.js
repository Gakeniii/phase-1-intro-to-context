// Your code here
function createEmployeeRecord (employeeRecords){
    return {
        firstName: employeeRecords[0],
        familyName: employeeRecords[1],
        title: employeeRecords[2],
        payPerHour: employeeRecords[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}

function createEmployeeRecords(employeesRecords){
    return employeesRecords.map(createEmployeeRecord)
}

function createTimeInEvent(employeesRecords, dateStamp){
    const [date, hour]= dateStamp.split(' ');
    employeesRecords.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date:date,
    });
    return employeesRecords;
}

function createTimeOutEvent(employeesRecords, dateStamp){
    const [date, hour] = dateStamp.split(' ');
    employeesRecords.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date
    });
    return employeesRecords;
}

function hoursWorkedOnDate(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === date
  );
  const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return hoursWorked;
}
function wagesEarnedOnDate(employeeRecord, date) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
  const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  return wagesEarned;
}

function allWagesFor(employeeRecord) {
  const timeInEvents = employeeRecord.timeInEvents;
  const timeOutEvents = employeeRecord.timeOutEvents;

  let totalWages = 0;

  for (let i = 0; i < timeInEvents.length; i++) {
    const timeIn = timeInEvents[i];
    const timeOut = timeOutEvents[i];

    const hoursWorked = (parseInt(timeOut.hour) - parseInt(timeIn.hour)) / 100;

    const wagesForDay = hoursWorked * employeeRecord.payPerHour;
    totalWages += wagesForDay;
  }

  return totalWages;
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => {
    return total + allWagesFor(employee);
  }, 0);
}


