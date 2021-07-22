const Warehouse = require('./models/warehouse');
const Aisle = require('./models/aisle');
const Item = require('./models/Item');
const db = require('./db');

async function initialiseDb() {
    Warehouse.hasMany(Aisle)
    Aisle.belongsTo(Warehouse)
    Aisle.hasMany(Item);
    Item.belongsTo(Aisle);
    await db.sync();
}

module.exports = initialiseDb;

