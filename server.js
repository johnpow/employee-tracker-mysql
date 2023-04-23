const inquirer = require("inquirer");
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker'
},
console.log('connected to database')

);

const questions = [
    {
      name: "departmentNum",
      message: "What department do you want to see?",
      response: "input",
    }
  ];

function getStarted() {
inquirer.prompt(questions).then((shapeData) => {

    db.query('SELECT * FROM department WHERE id = ?;',
        [shapeData.departmentNum], function (err, results) {
        if (err) {
          console.log(err);
        }
        console.table(results);
        getStarted() 
      });
    

});

};
getStarted() 



app.listen(PORT)