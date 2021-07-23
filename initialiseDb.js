const {Warehouse} = require('./models/Warehouse');
const {Aisle} = require('./models/Aisle');
const {Item} = require('./models/Item');
const { sequelize } = require('./db');

async function initialiseDb() {
    Warehouse.hasMany(Aisle)
    Aisle.belongsTo(Warehouse)
    Aisle.hasMany(Item);
    Item.belongsTo(Aisle);
    await sequelize.sync();
}

module.exports = initialiseDb ;

