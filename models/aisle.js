const db = require('../db');
const { DataTypes, Model } = require('sequelize');

class Aisle extends Model {}

Aisle.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, {
    sequelize: db,
    timestamps: false,
});

module.exports = Aisle;