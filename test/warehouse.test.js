const {sequelize} = require('../db')
const { Warehouse } = require('../models/warehouse')
const { Aisle } = require('../models/aisle')
const initialiseDb = require("../initialiseDb")
initialiseDb();


describe('Warehouse database', () => {

    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    test('can create warehouse', async () => {
        const testWarehouse = await Warehouse.create({name: 'Chad' })
        expect(testWarehouse.name).toBe('Chad')
    })

    test('warehouse has some type of image logo', async () => {
        const testWarehouse = await Warehouse.create({name: 'Chad',image: 'afreen.jpeg' })
        expect(testWarehouse.image).toBe('afreen.jpeg')
    })

    test('warehouse name is type of string', async () => {
        const testWarehouse = await Warehouse.create({name: 'Sharon' })
        expect(typeof testWarehouse.name).toBe('string')
    })

	test('Warehouse can have many aisles', async () => {
		const warehouse = await Warehouse.create({name :'Amazon', image :'amazon.jpg'})

		const aisle1 = await Aisle.create({name : 'Gardening'});
		const aisle2 = await Aisle.create({name : 'Toys'});
		const aisle3 = await Aisle.create({name : 'Star wars'});

		await warehouse.addAisle(aisle1) 
		await warehouse.addAisle(aisle2)
		await warehouse.addAisle(aisle3)

		const aisles = await warehouse.getAisles() // another association 'magic method'
        expect(aisles).toBeTruthy

	})
})
