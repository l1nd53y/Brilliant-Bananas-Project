const {sequelize} = require('../db')
const { Warehouse } = require('../models/warehouse')
const {initialiseDb}= require('./initialiseDb')


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

    m
	test('Warehouse can have many aisles', async () => {
		const warehouse = await Warehouse.create({name : 'Amazon', image : 'amazon.jpg'})

		const aisle1 = await Aisle.create({name : 102});
		const aisle2 = await Aisle.create({name : 103});
		const aisle3 = await Aisle.create({name : 104});

		await warehouse.addAisle(aisle1) //addMusician is a 'magic method' we get from Sequelize, once we declare an association
		await warehouse.addAisle(aisle2)
		await warehouse.addAisle(aisle3)

		const aisles = await BTS.getAisles() // another association 'magic method'

		expect(aisles.length).toBe(1)
		expect(aisles[0] instanceof Aisle).toBeTruthy

	})
})