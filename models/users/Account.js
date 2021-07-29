const { sequelize } = require('../../db');
const {DataTypes, Model} = require('sequelize');

class Account extends Model {};

Account.init({
    userID: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4}
}, {
    sequelize,
    timestamps: false
});

module.exports = { Account };