const db = require('../db');
const fs = require('fs/promises');
const path = require('path');
const initialiseDb = require('../initialiseDb');
const Warehouse = require('../models/Warehouse');
const Aisle = require('../models/Aisle');
const Item = require('../models/Item');

async function populateDb() {
    console.log('!! PopulateDB Called !!');
    await initialiseDb();
    await db.sync({ force: true });
    const buffer = await fs.readFile(path.join(__dirname, '..', 'warehouse.json'));
    const warehouses = JSON.parse(String(buffer));
    for (const warehouseData of warehouses) {
        const warehouse = await Warehouse.create(warehouseData);
        for (const aisleData of warehouseData.aisle) {
            const aisle = await Aisle.create(aisleData);
            await warehouse.addAisle();
            for (const itemData of aisleData.items) {
                const item = await Item.create(itemData);
                await aisle.addItem(item);
            }
        }
    }
}

populateDb();
