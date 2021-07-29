const {sequelize} = require('../db')
const { Aisle } = require('../models/aisle') 
const { Item } = require('../models/Item')
const initialiseDb = require("../initialiseDb")
initialiseDb();

describe('Aisles database', () => {

    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    test('can create aisle', async () => {
        const testAisle = await Aisle.create({name: 'Clothing' })
        expect(testAisle.name).toBe('Clothing')
    })

    test('aisle is type string', async () => {
        const testAisle = await Aisle.create({name:'Clothing' })
        expect(typeof testAisle.name).toBe('string')
    })

    test('Aisle can have many items', async () => {
		const aisle = await Aisle.create({name : "Candy"})

		const hershey = await Aisle.create({name: 'hershey', image: 'chocolate.jepg', category: 'candy', price: 15.99, description: 'Smooth and velvety chocolate covered in nuts'});
		const jacket = await Aisle.create({name: 'jacket', image: 'jacket.jepg', category: 'product', price: 35.99, description: 'Nice and warm jacket for winters' });

		await aisle.addItem(hershey) 
		await aisle.addItem(jacket)
	

        const items= await aisle.getItems()
        
		//expect(items.length).toBe(2)
		expect(items[0] instanceof Item).toBeTruthy // another association 'magic method'
        

	})
})