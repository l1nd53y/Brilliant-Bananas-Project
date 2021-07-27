//User Stories Usecases
As a user ,I want to download Inventory app.
As a User, I want to view all items in warehouse by aile.
As a User, I want to view any individual item.
As a User, I want to add an item by completing a form.
As a User, I want to remove an item from warehouse.
As a User, I want to edit an item by filling a form.

//Class Diagram
Class Psuedocode
class Warehouse {
    id:INTEGER
    name:STRING
    image:STRING
}

class Aile {
    id:INTEGER
    name:STRING
    image:STRING
}

class Item {
    id:INTEGER
    name:STRING
    image:STRING
    category:STRING
    price:FLOAT
    description:STRING
}

class User {
    id:INTEGER
    username:STRING
    password:STRING
    cardDetails:STRING
}

class Order {
    id:INTEGER
    orderDate:DATE
    orderQuantity:INTEGER
}
