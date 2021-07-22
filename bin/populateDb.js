const db = require('../db');
const fs = require('fs/promises');
const path = require('path');
const initialiseDb = require('../initialiseDb');
const Restaurant = require('../models/restaurant');
const Menu = require('../models/menu');
const MenuItem = require('../models/menuItem');

async function populateDb() {
    await initialiseDb();
    await db.sync({ force: true });
    const buffer = await fs.readFile(path.join(__dirname, '..', 'restaurants.json'));
    const restaurants = JSON.parse(String(buffer));
    for (const restaurantData of restaurants) {
        const restaurant = await Restaurant.create(restaurantData);
        for (const menuData of restaurantData.menus) {
            const menu = await Menu.create(menuData);
            await restaurant.addMenu(menu);
            for (const menuItemData of menuData.items) {
                const menuItem = await MenuItem.create(menuItemData);
                await menu.addMenuItem(menuItem);
            }
        }
    }
}

populateDb();
