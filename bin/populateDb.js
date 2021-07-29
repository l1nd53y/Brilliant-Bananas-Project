const { sequelize } = require('../db');
const fs = require('fs/promises');
const path = require('path');
const initialiseDb = require('../initialiseDb');
const {Warehouse} = require('../models/warehouse');
const {Aisle} = require('../models/aisle');
const {Item} = require('../models/Item');

const { Account } = require('../models/users/Account')
const { User } = require('../models/users/User')

async function populateDb() {
    console.log('!! 💾 PopulateDB Called 💾 !!');
    await initialiseDb();
    await sequelize.sync({ force: true });
    const buffer = await fs.readFile(path.join(__dirname, '..', 'warehouse.json'));
    const warehouses = JSON.parse(String(buffer));
    for (const warehouseData of warehouses) {
        const warehouse = await Warehouse.create(warehouseData);
        for (const aisleData of warehouseData.aisle) {
            const aisle = await Aisle.create(aisleData);
            await warehouse.addAisle(aisle);
            for (const itemData of aisleData.items) {
                const item = await Item.create(itemData);
                await aisle.addItem(item);
            }
        }
    }
    const lf = await fs.readFile(path.join(__dirname, '..', 'account.json'));
    const accounts = JSON.parse(String(lf));
    for(const accountData of accounts){
        const account = await Account.create(accountData);
        for(const userData of accountData.user){
            const user = await User.create(userData);
            await account.addUser(user);
        }
    }

    console.log("!! 💾 PopulateDB Called 💾 !!")
}

populateDb();
