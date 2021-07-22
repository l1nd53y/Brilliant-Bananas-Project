const db = require('../db');
const { DataTypes, Model } = require('sequelize');

class Item extends Model {}

Item.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    category:DataTypes.STRING,
    image: DataTypes.STRING,
}, {
    sequelize: db,
    timestamps: false,
});

module.exports = Item;