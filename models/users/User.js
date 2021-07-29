const { sequelize } = require('../../db');
const {DataTypes, Model} = require('sequelize');

class User extends Model {}

User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.BOOLEAN //T admin F user
},{
    sequelize,
    timestamps: false
});

module.exports = { User };