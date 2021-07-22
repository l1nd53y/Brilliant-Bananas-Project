const db = require('../db');
const { DataTypes, Model } = require('sequelize');

class MenuItem extends Model {}

MenuItem.init({
    name: DataTypes.STRING,
    price: DataTypes.NUMBER,
}, {
    sequelize: db,
    timestamps: false,
});

module.exports = MenuItem;