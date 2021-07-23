const {sequelize} = require('../db')

describe('Aisles database', () => {

    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    test('can create aisle', async () => {
        const testAisle = await Aisle.create({name: 'Sports' })
        expect(testAisle.name).toBe('Sports')
    })
})