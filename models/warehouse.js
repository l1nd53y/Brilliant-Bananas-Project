const { sequelize } = require('../db');
const {DataTypes, Model} = require('sequelize');

// Creates a Warehouse Table in our database
class Warehouse extends Model {}

// Create attributes (columns) for our model
Warehouse.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, {
    sequelize, // What database is our table stored in
    timestamps: false,
});

module.exports = { Warehouse };