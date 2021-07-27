const {sequelize} = require('../db');
const { DataTypes, Model } = require('sequelize');

// Creates a Item Table in our database
class Item extends Model {}

// Create attributes (columns) for our model
Item.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
}, {
    sequelize, // What database is our table stored in
    timestamps: false,
});

module.exports = {Item};