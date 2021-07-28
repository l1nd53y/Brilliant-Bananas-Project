const {sequelize} = require('../db')
const { Aisle } = require('../models/aisle') 

describe('Aisles database', () => {

    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    test('can create aisle', async () => {
        const testAisle = await Aisle.create({name: 101 })
        expect(testAisle.name).toBe(101)
    })

    test('aisle is type number', async () => {
        const testAisle = await Aisle.create({name: 101 })
        expect(typeof testAisle.name).toBe('number')
    })
})