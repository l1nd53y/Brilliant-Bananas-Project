const { Sequelize } = require('sequelize'); 
const path = require('path');  //a node native module

// Creates a database named 'sequelize'
const sequelize = new Sequelize({
    dialect: 'sqlite', // type of sql
    storage: path.join(__dirname, 'db.sqlite'), //file location for our db
});

module.exports = { sequelize };