const express = require("express");
const { check, validationResult } = require('express-validator');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const methodOverride = require('method-override');


const {Warehouse} = require('./models/Warehouse');
const {Aisle} = require('./models/Aisle');
const {Item} = require('./models/Item');


const initialiseDb = require('./initialiseDb');
initialiseDb();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//Configures handlebars library to work well w/ Express + Sequelize model
const handlebars = expressHandlebars({
handlebars: allowInsecurePrototypeAccess(Handlebars)
});

//Tell Express app we're using handlebars library
app.engine('handlebars', handlebars);
app.set('view engine', 'handlebars');

/**
    * Warehouse(s) Routes
    *  GET, PUT, POST, PUT, DELETE
**/

//Validation for route
const warehouseChecks = [
    check('name').not().isEmpty().trim().escape(),
    check('image').isURL(),
    check('name').isLength({ max: 50 })
]

app.get('/warehouses', async (req, res) => {
    const warehouses = await Warehouse.findAll();
    //console.log(`🐛 warehouse:`, warehouses);
    res.render('warehouses', { warehouses });
});

app.get('/warehouses/:id', async (req, res) => {
    const warehouse = await Warehouse.findByPk(req.params.id, {
        include: {
            model: Aisle,
            include: Item
        }
    });
    //console.log(`🐛 Ailse:`, warehouse);
    // res.json(warehouse);
    res.render('warehouse', { warehouse });

});

app.post('/warehouses', warehouseChecks, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    await Warehouse.create(req.body);
    res.sendStatus(201);
});

app.delete('/warehouses/:id', async (req, res) => {
    await Warehouse.destroy({
        where: {
            id: req.params.id
        }
    });
    res.sendStatus(200);
});

app.put('/warehouses/:id', warehouseChecks, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const warehouse = await Warehouse.findByPk(req.params.id);
    await warehouse.update(req.body);
    res.sendStatus(200);
});

app.patch('/warehouses/:id', async (req, res) => {
    const warehouse = await Warehouse.findByPk(req.params.id);
    await warehouse.update(req.body);
    res.sendStatus(200);
});


app.get('/new-item-form')


app.post('/new-warehouse', async (req, res) => {
    const newWarehouse = await Warehouse.create(req.body);
    const foundWarehouse = await Warehouse.findByPk(newWarehouse.id);
    if(foundWarehouse) {
       // res.status(201).send('New Warehouse created!!~')
        res.render('warehouse',foundWarehouse)
    } else {
        console.log("Could not create Warehouse~")
    }
});

/**
    * Aisle(s) Routes
    *  GET, PUT, POST, PUT, DELETE
**/
//Aisle Validation
const aisleChecks = [
    check('name').not().isEmpty().trim().escape(),
    check('id').isNumeric(),
    check('image').isURL(),
    check('name').isLength({ max: 50 })
]

app.get('/aisles', async (req, res) => {
    const aisles = await Aisles.findAll();
    res.render('aisles', { aisles });
});


app.get('/items/:id', aisleChecks ,async (req, res) => {
    const item = await Item.findByPk(req.params.id, {
        include: {
            model: Aisle,
            include: Item
        }
    });
    res.render('item', { item });
    // res.json(item);
});


//Aisle Routes -(option if we add just a single Aisle view)
app.get('/aisles/:id', async (req, res) => {
    const aisle = await Aisle.findByPk(req.params.id, {
        include: {
            model: Item
        }
    });
    //console.log(`🐛 Ailse:`, aisle);
     res.json(aisle);
    //res.render();
})

/**
    * Item(s) Routes
    *  GET, PUT, POST, PUT, DELETE
**/

//Validation for route
const  itemValidation = [
    check('name').not().isEmpty().trim().escape().withMessage('Name must be filled in'),
    check('name').isLength({ max: 50 }).withMessage('Max Lenth of name 50'),
    check('name').matches(/^[A-Za-z0-9 .,'!&]+$/).withMessage('Special Char limited'),
    check('image').isURL().withMessage('Image must be URL')
];

app.get('/new-item-form/asile/:ID', itemValidation, async (req, res) => {
    //console.log('🐛 BODY CHECK: 🐛',req.params)
    res.render('newItemForm', {ID: req.params.ID});
});

app.post('/new-item-form/asile/:ID', itemValidation, async (req, res) => {
    //console.log('🐛 BUG TEST 🐛:', req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    await Item.create(req.body);
    res.status(200).withMessage('Created Success');
});

// Route to delete item from warehouse
app.delete('/items/:id', async (req, res) => {
    await Item.destroy({
        where : {id : req.params.id}
    })
    res.redirect('/warehouses');
})

// app.get('/items', async (req, res) => {
//     const items = await Item.findAll();
//     res.render('items', { items });
// });

// app.get('/items/:id', async (req, res) => {
// 	const items = await Item.findByPk(req.params.id,);
// 	res.json({ aisles })
// })




app.listen(port, () => {
    console.log(`🚀  Server listening at http://localhost:${port} 🚀 `);
});