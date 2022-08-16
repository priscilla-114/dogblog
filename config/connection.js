//import the Sequelize constructor from the library

const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");

//loads .env file into connection.js

require ('dotenv').config();

//create connection to our database, pass in your MySQL info for username and password

const sequelize= new Sequelize('Dog_Blog_db', 'username','password', {

    host: 'localhost',

    dialect: 'mysql',

    port: 3306

});

module.exports = sequelize;