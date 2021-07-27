const {sequelize} = require('../db');
const { DataTypes, Model } = require('sequelize');

class Aisle extends Model {}

Aisle.init({
    name: DataTypes.NUMBER,
}, {
    sequelize,
    timestamps: false,
});

module.exports = {Aisle};