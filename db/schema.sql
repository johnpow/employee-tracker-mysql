DROP DATABASE IF EXISTS mysql_todos;
CREATE DATABASE mysql_todos;

USE mysql_todos;



-- users should have an ID, firstName, lastName, password as columns. none of them can be null
-- make the ID the primary key

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE todos (
    id INT NOT NULL AUTO_INCREMENT,
    todo VARCHAR(255) NOT NULL,
    completed BOOLEAN NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(user_id) REFERENCES users(id)

);