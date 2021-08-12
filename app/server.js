const express = require("express"); //import the express dependency
const { check, validationResult } = require("express-validator");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {allowInsecurePrototypeAccess,} = require("@handlebars/allow-prototype-access");
const methodOverride = require("method-override");

//Model files
const { Warehouse } = require("../models/warehouse");
const { Aisle } = require("../models/aisle.js");
const { Item } = require("../models/Item.js");

//DB Init
const initialiseDb = require("../initialiseDb");

initialiseDb();

const app = express();
//channel for our server to listen to client requests
const port = process.env.PORT || 3000; //server port
const idCheck = [check("id").isNumeric().withMessage("id must be a number")];

// serve static assets from the public/ folder
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

//Configures handlebars library to work well w/ Express + Sequelize model
const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

//Tell Express app we're using handlebars library
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

/**
 * Warehouse(s) Routes
 *  GET, PUT, POST, PUT, DELETE
 **/

//Validation for Warehouse routes
const warehouseChecks = [
  check("name")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("name can not be blank"),
  check("name").isLength({ max: 60 }).withMessage("Max length 50 char"),
  check("id").isNumeric().withMessage("id must be a number"),
];

//Route to retrieve all warehouses
app.get("/warehouses", async (req, res) => {
  //goes into the database and looks for all Warehouses
  const warehouses = await Warehouse.findAll();
  res.render("warehouses", { warehouses }); 
});

//Route to retrieve warehouse with a specified id
app.get("/warehouses/:id", idCheck, async (req, res) => {
  //Input Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //look up warehouse by primary key from id passed in params
  const warehouse = await Warehouse.findByPk(req.params.id, {
    include: {
      model: Aisle,
      include: Item,
    },
  });
  res.render("warehouse", { warehouse }); //displays aisle and items (render warehouse handlebars)
});

//Route to post warehouses
app.post("/warehouses", async (req, res) => {
  //Validate input
  res.sendStatus(201);
});

//Route to delete warehouse from db with a specified id
app.delete("/warehouses/:id", idCheck, async (req, res) => {
  //Input Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  await Warehouse.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.sendStatus(200);
});

//Route to update warehouse with specified id for all properties
app.put("/warehouses/:id", warehouseChecks, async (req, res) => {
  //Input Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Add a warehouse to the DB
  const warehouse = await Warehouse.findByPk(req.params.id);
  await warehouse.update(req.body);
  res.sendStatus(200);
});

//Route to update a warehouse with specified id for any property
app.patch("/warehouses/:id", warehouseChecks, async (req, res) => {
  //Input Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Update a warehouse by finding it by Primary Key and passing new data
  const warehouse = await Warehouse.findByPk(req.params.id);
  await warehouse.update(req.body);
  res.sendStatus(200);
});

/**
 * Aisle(s) Routes
 *  GET, PUT, POST, PUT, DELETE
 **/

//Aisle Validation
const aisleChecks = [
  check("name") //validate name is not empty
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Name can not be blank"),
  check("id").isNumeric().withMessage("id not a number"), //validate id is numeric
  check("name")
    .isLength({ max: 60 })
    .withMessage("name can't be longer than 50 char"), //validate name is max 50 characters
];

//Route to retrieve all aisles
app.get("/aisles", async (req, res) => {
  const aisles = await Aisles.findAll();
  res.render("aisles", { aisles });
});

//Aisle Routes -(option if we add just a single Aisle view)
app.get("/aisles/:id", async (req, res) => {
  //Input Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } //Get an aisle with specified id
  const aisle = await Aisle.findByPk(req.params.id, {
    include: {
      model: Item,
    },
  });
  //console.log(`🐛 Ailse:`, aisle);
  // res.json(aisle);
  res.render("aisles",{aisle});
});

/**
 * Item Route(s)
 *  GET, PUT, POST, PUT, DELETE
 **/

//Route to get item with a specified id
app.get("/items/:id", idCheck, async (req, res) => {
  //Input Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const item = await Item.findByPk(req.params.id, {
    include: {
      model: Aisle,
      include: Item,
    },
  });
  res.render("item", { item });
  // res.json(item); //uncomment when using postman
});

/**
 * New Item Route(s)
 *  GET, PUT, POST, PUT, DELETE
 **/

//Validation for route
const itemValidation = [
  check("name") //validate input name is not empty
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Name must be filled in"),
  check("name")
    .isLength({ max: 60 })
    .withMessage("Max Lenth of name 50") //validate name is max 50 chars
    .matches(/^[A-Za-z0-9 .,'!&]+$/)
    .withMessage("Special Char are limited")
];

//Route for new item form
app.get("/new-item-form/asile/:id", idCheck, async (req, res) => {
  //Input Validation
  const errors = validationResult(req);

  //pull Cat from env file and split into array for sql enum
  const cateories = process.env.CATEGORIES.split(",");

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.render("newItemForm", { id: req.params.id, category: cateories }); //renders a newItemForm handlebars
});

//Route to post the item details submitted on new item form
app.post("/new-item-form/asile/:id", itemValidation, async (req, res) => {
  const errors = validationResult(req);
  //Validation
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newItem = await Item.findOrCreate({ where: req.body }).catch(console.log("🐛 ERROR IN CREATING ITEM 🐛"));
  if (newItem) {
    //return to Warehouses after creation
    const foundAisle = await Aisle.findByPk(r.eqparams.id);
    const foundWarehouse = await Warehouse.findByPk(foundAisle.WarehouseId);
    res.status(200).redirect(`/warehouses/${foundWarehouse.id}`);
  } else {
    res.status(400).send("Failed to Create and find new Item");
  }
});

//Route for edit item form
app.get("/items/edit-item-form/:id", idCheck, async (req, res) => {
  //Input Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const item = await Item.findByPk(req.params.id).catch(
    "Error Fetching Item from db"
  );
  const cateories = process.env.CATEGORIES.split(",");
  res.render("editItemForm", {
    id: req.params.id,
    category: cateories,
    item: item,
  }); //renders a editItemForm handlebars
});

//Route to PUT(update) an item's details on submit
app.put("/items/edit-item-form/:id", itemValidation, async (req, res) => {
  //Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //look for item, if found update item or display error
  const itemExists = await Item.findByPk(req.params.id);
  if(itemExists){
    await itemExists.update(req.body,{
      where: { id: req.params.id },
    });
    const foundAisle = await Aisle.findByPk(itemExists.AisleId);
    const foundWarehouse = await Warehouse.findByPk(foundAisle.WarehouseId);
    res.status(200).redirect(`/warehouses/${foundWarehouse.id}`);
  }else{
    res.status(400).send('Could not find item to edit');
  }
});

// Route to delete item with a specific id from warehouse
app.delete("/items/:id", async (req, res) => {
  const itemToDelete = await Item.findByPk(req.params.id);
  if(itemToDelete){
    Item.destroy({
      where:{ id: itemToDelete.id }
    });
    res.redirect('/warehouses');
  }else{ res.status(400).json({error: 'Item not found'}) }
});

//404 redirect
app.use(function (req, res, next) {
  res.status(404).redirect("/404.html");
});




//Sets the server and listing port
app.listen(port, () => {
  console.log(`🚀  Server listening at http://localhost:${port} 🚀 `);
});