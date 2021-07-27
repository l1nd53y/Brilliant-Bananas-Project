const {sequelize} = require('../db');
const { DataTypes, Model } = require('sequelize');

// Creates a Aisle Table in our database
class Aisle extends Model {}

// Create attributes (columns) for our model
Aisle.init({
    name: DataTypes.NUMBER,
}, {
    sequelize, // What database is our table stored in
    timestamps: false,
});

module.exports = {Aisle};