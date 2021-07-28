const {sequelize} = require('../db');
const { DataTypes, Model } = require('sequelize');
const cateories = ['Clothing','Cookie','Drink','Cereal', 'Bear','Pokemon','Cat','Shoes','Makeup','Skin care','Eye product','Lip product','Toys', 'Garden', 'Home', 'Candy', 'Armament']
// Creates a Item Table in our database
class Item extends Model {}

// Create attributes (columns) for our model
Item.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    category:{
        type: DataTypes.ENUM,
        values: cateories
      },
    price: DataTypes.DOUBLE,
    description: DataTypes.STRING,
}, {
    sequelize, // What database is our table stored in
    timestamps: false,
});

module.exports = { Item };