const {sequelize} = require('../db');
const { DataTypes, Model } = require('sequelize');

class Item extends Model {}

Item.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    category: DataTypes.ENUM('Home', 'garden', 'clothing', 'armament', 'shoes', 'Bear', 'Pokemon','Cat','Cereal','Cookie','Drink','Candy'),
    price: DataTypes.DOUBLE,
    description: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

module.exports = {Item};