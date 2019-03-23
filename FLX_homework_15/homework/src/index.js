/**
 * Implements a new Company.
 * If params are incorrect - return an empty object.
 * @class
 * @param {Object} newCompany
 * @param {string} newCompany.name
 * @param {string} newCompany.owner
 * @param {number} newCompany.maxCompanySize
 * @returns {Object}
 * @constructor
 */

function Company (newCompany = {name: 'Mykola', owner: 'Mykola Maksymiv', maxCompanySize: '1'}) {

  /**
   * Private attributes and functions
   * ---------------------------------------------------------------------------
   */
  const MAGIC_NUMBERS = {
    '-1' : -1,
    '0' : 0,
    '1' : 1,
    '2' : 2
  };
  let _logs;
  let _employeeList = [];
  let fired;
  let employeeObj;
  let objectIsEmpty = false;
  const templateLog = (employeeName, subject, date) =>
  `${employeeName} ${subject} working at ${this.name} in ${date}`;

  function getDate () {
    return new Date();
  }
  function validateInput (value, type) {
    if (type === 'string') {
      if (typeof value !== 'string' || value.length < MAGIC_NUMBERS['2']) {
        console.error('Please enter a correct arguments');
        objectIsEmpty = true;
      }
    }

    if (type === 'number') {
      if (typeof value !== 'number' || !isFinite(value) || value < MAGIC_NUMBERS['0']) {
        console.error('Please enter a correct arguments');
        objectIsEmpty = true;
      }
    }

    return value;
  }

  /**
   * Public
   * ---------------------------------------------------------------------------
   */

  this.name = validateInput(newCompany.name, 'string');
  this.owner = validateInput(newCompany.owner, 'string');
  this.maxCompanySize = validateInput(newCompany.maxCompanySize, 'number');
  _logs = [`${this.name} was created in ${getDate()}`];

  this.addNewEmployee = employee => {
    if (employee.name && employee.primarySkill && employee.age && employee.salary) {
      if (employee.company === null) {
        employeeObj = employee;
        employee.hire(this.name);
  
        employee['startDate'] = getDate();
        if (_employeeList.length === this.maxCompanySize) {
          _employeeList.sort((a, b) => a.salary > b.salary ? MAGIC_NUMBERS['1'] : MAGIC_NUMBERS['-1']);
          this.removeEmployee(MAGIC_NUMBERS['0']);
        }
  
        _employeeList.push(employee);
        _logs.push(templateLog(employee.name, 'start', getDate()));
      } else {
        console.error(`This employee current work at ${employee.company}`);
      }
    } else {
      console.error('Please try to add Employee instance');
    }
  };

  this.removeEmployee = id => {
    if (isFinite(id)) {
      if (_employeeList.length >= MAGIC_NUMBERS['0'] && id < _employeeList.length) {
        _employeeList[id].fire();
        fired = _employeeList.splice(id, MAGIC_NUMBERS['1']);
        _logs.push(templateLog(fired.pop().name, 'ends', getDate()));
      } else {
        console.error('You can\'t remove employee, if it doesnt exist');
      }
    } else {
      console.error('Enter a correct id');
    }
  };

  this.getEmployees = () => {
    let outputList = '\t  Company List\n';
    for (let i = 0; i < _employeeList.length; i++) {
      outputList += `
      Name: ${_employeeList[i].name}
      Skills: ${_employeeList[i].primarySkill}
      Age: ${_employeeList[i].age}
      Salary: ${_employeeList[i].salary}
      `;
    }

    return outputList;
  };

  this.getHistory = () => {
    let fullHistory = '\n';
    for (let i = 0; i < _logs.length; i++) {
      fullHistory += _logs[i] + '\n';
    }

    return fullHistory;
  };

  this.getAvarageSalary = () => {
    let averageSalary = 0;
    for (let i = 0; i < _employeeList.length; i++) {
      averageSalary += _employeeList[i].salary / _employeeList.length;
    }

    return `Average salary at ${this.name}: ${+averageSalary.toFixed(MAGIC_NUMBERS['2'])}`;
  };

  this.getAvarageAge = () => {
    let averageAge = 0;
    for (let i = 0; i < _employeeList.length; i++) {
      averageAge += _employeeList[i].age / _employeeList.length;
    }

    return `Average age at ${this.name}: ${+averageAge.toFixed(MAGIC_NUMBERS['2'])}`;
  };

  this.getFormattedListOfEmployees = () => {
    for (let i = 0; i < _employeeList.length; i++) {
      console.log(`${_employeeList[i].name} - works in ${this.name} ${employeeObj.getWorkTimeInSeconds()} secs`);
    }
  };

  return objectIsEmpty === true ? {} : this;
}
/**
 * Implements a new worker.
 * @class
 * @param {Object} newEmployee 
 * @param {string} newEmployee.name
 * @param {string} newEmployee.primarySkill
 * @param {number} newEmployee.age
 * @param {number} newEmployee.salary
 * @constructor
 */
function Employee (newEmployee = {name: 'Mykola', age: 20, salary: 1000, primarySkill: 'FE'}) {
 
  /**
   * Private attributes and functions
   * ---------------------------------------------------------------------------
   */
  const MAGIC_NUMBERS = {
    '0' : 0,
    '2' : 2
  };
  let objectIsEmpty = false;
  let _logs = [];
  function getDate () {
    return new Date();
  }
  let _startDate = getDate();

  function validateInput (value, type) {
    if (type === 'string') {
      if (typeof value !== 'string' || value.length < MAGIC_NUMBERS['2']) {
        console.error('Please enter a correct arguments');
        objectIsEmpty = true;
      }
    }

    if (type === 'number') {
      if (typeof value !== 'number' || !isFinite(value) || value < MAGIC_NUMBERS['0']) {
        console.error('Please enter a correct arguments');
        objectIsEmpty = true;
      }
    }

    return value;
  }

  /**
   * Public
   * ---------------------------------------------------------------------------
   */
  this.name = validateInput(newEmployee.name, 'string');
  this.primarySkill = validateInput(newEmployee.primarySkill, 'string');
  this.age = validateInput(newEmployee.age, 'number');
  this.salary = validateInput(newEmployee.salary, 'number');
  this.company = null;

  this.getSalary = () => this.salary;

  this.setSalary = salaryAmount => {
    if (isFinite(salaryAmount)) {
      if (this.salary >= salaryAmount) {
        _logs.push(`Try to change salary from ${this.salary} to ${salaryAmount}`);
      } else {
        _logs.push(`Change salary from ${this.salary} to ${salaryAmount}`);
        this.salary = salaryAmount;
      }
    } else {
      console.log('Enter a correct salary amount');
    }
  };

  this.getWorkTimeInSeconds = () => {
    const MINUTE = 60;
    let minutesCount = getDate().getMinutes() - _startDate.getMinutes();
    let secondsCount = getDate().getSeconds() - _startDate.getSeconds();

    return secondsCount + MINUTE * minutesCount;
  };

  this.hire = companyName => {
    this.company = companyName;
    _logs.push(`${this.name} hired to ${this.company} in ${getDate()}`);
  };

  this.fire = () => {
    _logs.push(`${this.name} fired from ${this.company} in ${getDate()}`);
    this.company = null;
  };

  this.getHistory = () => {
    let fullHistory = '\n';
    for (let i = 0; i < _logs.length; i++) {
      fullHistory += _logs[i] + '\n';
    }

    return fullHistory;
  };

  return objectIsEmpty === true ? {} : this;
}
// CODE EXPAMPLE
// let artem = new Employee({name: "Artem", age: 15, salary: 1000, primarySkill: "UX"});
// let vova = new Employee({name: "Vova", age: 16, salary: 2000, primarySkill: "BE"});
// let vasyl = new Employee({name: "Vasyl", age: 25, salary: 1000, primarySkill: "FE"});
// let ivan = new Employee({name: "Ivan", age: 35, salary: 5000, primarySkill: "FE"});
// let orest = new Employee({name: "Orest", age: 29, salary: 300, primarySkill: "AT"});
// let anton = new Employee({name: "Anton", age: 19, salary: 500, primarySkill: "Manager"});

// let epam = new Company({name: "Epam", owner: "Arkadii", maxCompanySize: 5});
// epam.addNewEmployee(artem);
// epam.addNewEmployee(vova);
// epam.addNewEmployee(vasyl);
// epam.addNewEmployee(ivan);
// epam.addNewEmployee(orest);
// epam.addNewEmployee(anton);

// console.log(epam.getHistory());

// /*
// "Epam was created in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time)"
// "Artem starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Vova starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Vasyl starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Ivan starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Orest starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Orest ends working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// "Anton starts working at Epam in Tue Mar 12 2019 07:41:50 GMT+0200 (FLE Standard Time);"
// */
// epam.removeEmployee(0);
// console.log(epam.getEmployees());
// console.log(vasyl.getHistory());

// /*
// "Vasyl is hired to Epam in Tue Mar 12 2019 07:45:55 GMT+0200 (FLE Standard Time)"
// "Vasyl is fired from Epam in Tue Mar 12 2019 07:45:55 GMT+0200 (FLE Standard Time)"
// */

// console.log(epam.getAvarageSalary());
// console.log(epam.getAvarageAge());

// epam.addNewEmployee(5,6,9,5); // -> Please try to add Employee instance

// setTimeout(() => {
//    epam.removeEmployee(1);
//    console.log(artem.getWorkTimeInSeconds()); // -> 5.5744444444444445
// }, 5000);

// vova.setSalary(900);
// vova.setSalary(2200);
// console.log(vova.getHistory());
// /*
// "Vova is hired to Epam in Tue Mar 12 2019 08:08:48 GMT+0200 (FLE Standard Time)"
// "try to change salary from 2000 to 900"
// "change salary from 2000 to 2200"
// */
