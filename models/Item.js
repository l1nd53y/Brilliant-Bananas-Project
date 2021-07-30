const {sequelize} = require('../db');
const { DataTypes, Model } = require('sequelize');

require('dotenv').config();
const cateories = process.env.CATEGORIES.split(',');

// Creates a Item Table in our database
class Item extends Model {}

// Create attributes (columns) for our model
Item.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    category:{
        type: DataTypes.ENUM,
        values: cateories
    },
    price: DataTypes.DOUBLE,
    description: DataTypes.STRING,
}, {
    sequelize, // What database is our table stored in
    timestamps: false,
});

module.exports = { Item };