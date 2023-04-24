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
  {
    type: "input",
    name: "newRole",
    message: "What should the new role be called?",
    when(answers) {
      return answers.userSelect === "Add a Role";
    },
  },
  {
    type: "input",
    name: "newRoleSalary",
    message: "How much does the role make?",
    when(answers) {
      return answers.userSelect === "Add a Role";
    },
  },
  {
    type: "input",
    name: "newRoleDept",
    message: "What department does it belong to?",
    when(answers) {
      return answers.userSelect === "Add a Role";
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
          db.query(departQuery, function (err, results) {
            if (err) {
              console.log(err);
            }
            console.table(results);
            return getStarted();
          });
      });
    } 
    else if (input.userSelect === "Add a Role") {
      
      db.query(departNum, [input.newRoleDept], function (err, results,fields) {
        if (err) {
          console.log(err);
        }
  
            console.log(results[0].id);
            return getStarted();
      });

 
     }
  });
}
getStarted();

app.listen(PORT);
