// const Item= require('../models/Item');
const {sequelize} = require('../db')
const { Item } = require('../models/Item')


describe('Item Object',() => {

    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    // const baseball= new Item('baseball','ball.jpeg','sports',5.99,
    // 'Leather cover with raised seams and Solid cork composition core')
   // const racquets= new Item('racquets','light weight and good net',12.99,'Sports','racquets.png')
      //1-Data types test
        test ('Item has name', async ()=> {
            const testItem = await Item.create({name: 'baseball', image: 'ball.jepeg', category: 'sports', price: 5.99, description: 'Leather cover with raised seams and Solid cork composition core' })
            expect(testItem.name).toBe('baseball');
            });
    
        test ('Item has price', async ()=> {
            const testItem = await Item.create({price: 5.99})
            expect(testItem.price).toBe(5.99);
            });
    
        test ('Item has category', async ()=> {
            const testItem = await Item.create({category: 'sports'})
            expect(testItem.category).toBe('sports');
            });
    
        test ('Item has image', async ()=> {
            const testItem = await Item.create({image: 'ball.jpeg'})
            expect(testItem.image).toBe('ball.jpeg');
            });
    
        test('name is of type string', async ()=> {
            const testItem = await Item.create({name: 'baseball'})
            expect(typeof testItem.name).toBe('string');
            })
    
        test('price is of type number', async () => {
            const testItem = await Item.create({price: 5.99})
            expect(typeof testItem.price).toBe('number');
            })

        })
    