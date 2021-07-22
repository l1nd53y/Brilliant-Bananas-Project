const Item= require('../src/Item');
describe('Item Object',() => {

    const baseball= new Item('baseball',
    'Leather cover with raised seams and Solid cork composition core',5.99,'Sports','ball.jpeg')
    const racquets= new Item('racquets','light weight and good net',12.99,'Sports','racquets.png')
      //1-Data types test
        test ('Item has name',()=>{
            expect(baseball.name).toBe('baseball');
            });
    
        test ('Item has price',()=>{
            expect(baseball.price).toBe(5.99);
            });
    
        test ('Item has category',()=>{
            expect(baseball.category).toBe('Sports');
            });
    
        test ('Item has image',()=>{
            expect(baseball.image).toBe('ball.jpeg');
            });
    
        test('name is of type string', () => {
            expect(typeof baseball.name).toBe('string')
            })
    
        test('price is of type number', () => {
            expect(typeof baseball.price).toBe('number')
            })

        })
    