const db = require('../db');
const { DataTypes, Model } = require('sequelize');

class Menu extends Model {}

Menu.init({
    title: DataTypes.STRING,
}, {
    sequelize: db,
    timestamps: false,
});

module.exports = Menu;