const {sequelize} = require('../db');
const { DataTypes, Model } = require('sequelize');

class Aisle extends Model {}

Aisle.init({
    name: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

module.exports = {Aisle};