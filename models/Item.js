const {sequelize} = require('../db');
const { DataTypes, Model } = require('sequelize');

class Item extends Model {}

Item.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

module.exports = {Item};