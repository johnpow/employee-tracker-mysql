const inquirer = require("inquirer");
const express = require("express");
const mysql = require("mysql2");
const cTable = require("console.table");
const {
  departQuery,
  rolesQuery,
  employeesQ,
  newDept,
  departNum,
  newRole,
  newEmployee,
  updateEmployee,
} = require("./helper/queries.js");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_tracker",
  },
  console.log("connected to database")
);

const questions = [
  {
    name: "userSelect",
    message: "What would you like to do?",
    type: "rawlist",
    choices: [
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee Role",
      "Quit",
    ],
  },
  {
    type: "input",
    name: "newDept",
    message: "What should the new department be called?",
    when(answers) {
      return answers.userSelect === "Add a Department";
    },
  },

];

function getStarted() {

  inquirer.prompt(questions).then((input) => {

    if (input.userSelect === "View all Departments") {
      db.query(departQuery, function (err, results) {
        if (err) {
          console.log(err);
        }
        console.table(results);
        return getStarted();
      });
    } else if (input.userSelect === "View all Roles") {
      db.query(rolesQuery, function (err, results) {
        if (err) {
          console.log(err);
        }
        console.table(results);
        return getStarted();
      });
    } else if (input.userSelect === "View all Employees") {
      db.query(employeesQ, function (err, results) {
        if (err) {
          console.log(err);
        }
        console.table(results);
        return getStarted();
      });
    } else if (input.userSelect === "Add a Department") {
      db.query(newDept, [input.newDept], function (err, results) {
        if (err) {
          console.log(err);
        }
        console.log(`Added ${input.newDept} to database.`);
        return getStarted();
      });
    } 
    else if (input.userSelect === "Add a Role") {
        return addRole();
     }
     else if (input.userSelect === "Add an Employee") {
      return addEmployee();
   }
   else if (input.userSelect === "Update an Employee Role") {
    return updateEmployeeNew();
 }

   
    else if (input.userSelect === "Quit") {
      process.exit();
    }
  });
}

function updateEmployeeNew() {

  db.query('SELECT title FROM role;', function (err, results,fields) {
    if (err) {
      console.log(err);
    }
    const roleFresh = results.map(function (el) { return el.title; });
    db.query('SELECT CONCAT(first_name," ",last_name) as mgr FROM employee;', function (err, results,fields) {
      if (err) {
        console.log(err);
      }
    const managerFresh = results.map(function (el) { return el.mgr; });
    console.log(managerFresh);
      db.query('SELECT CONCAT(first_name," ",last_name) as empl FROM employee;', function (err, results,fields) {
        if (err) {
          console.log(err);
        }
      const employeeFresh = results.map(function (el) { return el.empl; });
      console.log(employeeFresh);
    const employeeQuest = [
      {
        name: "pickEmployee",
        message: "Which employee would you like to update?",
        type: "rawlist",
        choices: employeeFresh
      },
      {
        name: "pickRole",
        message: "What is their new role?",
        type: "rawlist",
        choices: roleFresh
      },
      {
        name: "pickManager",
        message: "Who is their new manager?",
        type: "rawlist",
        choices: managerFresh
      },
    ];
    
    inquirer.prompt(employeeQuest).then((stuff) => {
      db.query('SELECT id FROM role WHERE title = ?', [stuff.pickRole], function (err, results,fields) {
        if (err) {
          console.log(err);
        }
            const roleId = results[0].id;
            db.query('SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ?', [stuff.pickManager], function (err, results,fields) {
              if (err) {
                console.log(err);
              }
              const mgrId = results[0].id;
              db.query('SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ?', [stuff.pickEmployee], function (err, results,fields) {
                if (err) {
                  console.log(err);
                }
                const empId = results[0].id;
            db.query(updateEmployee, [roleId,mgrId,empId], function (err, results,fields) {
              if (err) {
                console.log(err);
              }
              console.log(`Updated ${stuff.pickEmployee} in database`)
              return getStarted();
    
      });
    })
  })
    });
  
    });
  });
  });
  });
  };




function addEmployee() {

db.query('SELECT title FROM role;', function (err, results,fields) {
  if (err) {
    console.log(err);
  }
  const roleFresh = results.map(function (el) { return el.title; });
  db.query('SELECT CONCAT(first_name," ",last_name) as mgr FROM employee;', function (err, results,fields) {
    if (err) {
      console.log(err);
    }
  const managerFresh = results.map(function (el) { return el.mgr; });
  const employeeQuest = [
    {
      type: "input",
      name: "firstName",
      message: "What is their first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is their last name?",
    },
    {
      name: "pickRole",
      message: "Which role do they have?",
      type: "rawlist",
      choices: roleFresh
    },
    {
      name: "pickManager",
      message: "Who is their manager?",
      type: "rawlist",
      choices: managerFresh
    },
  ];
  
  inquirer.prompt(employeeQuest).then((stuff) => {
    db.query('SELECT id FROM role WHERE title = ?', [stuff.pickRole], function (err, results,fields) {
      if (err) {
        console.log(err);
      }
          const roleId = results[0].id;
          db.query('SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = ?', [stuff.pickManager], function (err, results,fields) {
            if (err) {
              console.log(err);
            }
            const mgrId = results[0].id;
            
          db.query(newEmployee, [stuff.firstName, stuff.lastName, roleId,mgrId], function (err, results,fields) {
            if (err) {
              console.log(err);
            }
            console.log(`Added ${stuff.firstName} ${stuff.lastName} to database`)
            return getStarted();
  
    });
  })
  });

  });
});
});

};

function addRole() {

  db.query('SELECT title FROM role', function (err, results,fields) {
    if (err) {
      console.log(err);
    }
    const deptFresh = results.map(function (el) { return el.name; });
  
    const roleQuest = [
      {
        type: "input",
        name: "newRole",
        message: "What should the new role be called?",
      },
      {
        type: "input",
        name: "newRoleSalary",
        message: "How much does the role make?",
      },
      {
        name: "newRoleDept",
        message: "What department does it belong to?",
        type: "rawlist",
        choices: deptFresh
      },
    ];
    
    inquirer.prompt(roleQuest).then((stuff) => {
      db.query(departNum, [stuff.newRoleDept], function (err, results,fields) {
        if (err) {
          console.log(err);
        }
    
            const deptId = results[0].id;
    
            db.query(newRole, [stuff.newRole, stuff.newRoleSalary, deptId], function (err, results,fields) {
              if (err) {
                console.log(err);
              }
              console.log(`Added ${stuff.newRole} to database`)
              return getStarted();
    
      });
    
    })
    
    });
  });
  
  
  };




getStarted();

app.listen(PORT);
