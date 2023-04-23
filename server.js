const express = require('express');
const mysql = require('mysql2');
const inquirer = require("inquirer");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mysql_todos'
},
console.log('connected to database')

);

// /api/users?firstName=John&lastName=Doe


app.get('/api/users', (req,res) => {
    // SELECT * FROM USERS;
        const query = "SELECT * FROM users WHERE ? = ? AND ? = ?;";
    
        connection.query(
            query, [
                Object.keys(req.query)[0], 
                req.query[Object.keys(req.query)[0]],
                Object.keys(req.query)[1], 
                req.query[Object.keys(req.query)[1]],
            ],(err, results) => {
                if (err) {
                    console.log(query);
                    return res.status(500).json({err});
                    
                }
                console.log(req.query[Object.keys(req.query)[1]]);
                res.json(results);
    
        });
    
    })



app.listen(PORT, () => console.log(`Server started on ${PORT}`))