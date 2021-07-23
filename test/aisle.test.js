const {sequelize} = require('../db')
const { Aisle } = require('../models/aisle')

describe('Aisles database', () => {

    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    test('can create aisle', async () => {
        const testAisle = await Aisle.create({name: 'Fashion' })
        expect(testAisle.name).toBe('Fashion')
    })

    test('aisle is type of string', async () => {
        const testAisle = await Aisle.create({name: 'Fashion' })
        expect(typeof testAisle.name).toBe('string')
    })
})