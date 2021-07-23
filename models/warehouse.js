const { sequelize } = require('../db');
const {DataTypes, Model} = require('sequelize');

class Warehouse extends Model {}

Warehouse.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

module.exports = { Warehouse };