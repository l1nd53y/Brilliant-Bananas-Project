const {Sequelize, DataTypes, Model} = require('sequelize')
const {sequelize} = require('../db')


class Sauce extends Model {}

Sauce.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

module.exports = {Sauce};