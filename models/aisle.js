const db = require('../db');
const { DataTypes, Model } = require('sequelize');

class Aisles extends Model {}

Aisles.init({
    title: DataTypes.STRING,
}, {
    sequelize: db,
    timestamps: false,
});

module.exports = Aisles;