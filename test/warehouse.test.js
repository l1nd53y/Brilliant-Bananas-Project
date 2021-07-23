const {sequelize} = require('../db')
const { Warehouse } = require('../models/warehouse')


describe('Warehouse database', () => {

    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    test('can create warehouse', async () => {
        const testWarehouse = await Warehouse.create({name: 'Chad' })
        expect(testWarehouse.name).toBe('Chad')
    })

    test('warehouse name is type of string', async () => {
        const testWarehouse = await Warehouse.create({name: 'Sharon' })
        expect(typeof testWarehouse.name).toBe('string')
    })

    test('warehouse has some type of image logo', async () => {
        const testWarehouse = await Warehouse.create({image: 'afreen.jpeg' })
        expect(testWarehouse.image).toBe('afreen.jpeg')
    })
})