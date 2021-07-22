const db = require('../db');
const { DataTypes, Model } = require('sequelize');

class Item extends Model {}

Item.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    quantity: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.STRING,
}, {
    sequelize: db,
    timestamps: false,
});

module.exports = Item;