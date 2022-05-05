Brilliant-Bananas-Project Multiverse Final Inventory Project 

## Table of Content 
* [Description](#Description)
* [Demo](Deployed_App)
* [Compentencies](#Compentencies)
* [Technologies](#Technologies)
* [UML](#UML)
* [Setup](Setup)
* [Features](#Features)
* [Stretch_Goals](#Stretch-Goals)
* [Best_Practices](#Best_Practices)
* [Team_Constitution](Team_Constitution)
* [Contributors](#Contributors)

## Intoduction 
Standing by our teams constitution and using our best practices, we built this Inventory to showcase personal items that we would like to sale for reasonable prices.


## Description:
Our Brilliant Bananas Inventory App has 4 Warehouses. Each warehouse displays a list of all items in each aisle.The user can view details of each item like name, price, description and category by clicking on any specific item from the list. A new item can be added in each aisle by submitting the form. An item can also be removed from the warehouse.



## Deployed_App
- https://murmuring-chamber-30533.herokuapp.com/

- https://brilliant-bananas-project.herokuapp.com/

## Compentencies
* JF 1.5
Knows how teams work effectively to produce software and how to contribute appropriately
* JF 2.2
Understands how to create and analyze artifacts, such as use cases and/or user stories
* JF 3.4
Able to create simple software designs to effectively communicate an understanding of the program

## Technologies
- Git 
- GitHub 
- Bootstrap
- Express 
- SQLite
- Heroku

## UML
 - **[Activity Diagram](./UML/activitydiagram/)**
 - **[Class Diagram](./UML/Warehouse%20UML/classdiagram.png/)**
 - **[Wire Frame](./UML/wireframe/)**
 - **[Schema Design](./UML/Warehouse%20UML/schemadesign.png/)**
 - **[Sequence Diagram](./UML/Warehouse%20UML/sequence.png/)**
 - **[Use Case](./UML/Warehouse%20UML/usecase.png/)**


## Setup
- Clone 
- npm install 
- node bin/populateDB.js (npm run seed)
- node server.js         (npm start)
- NPM Scripts extension to VS code 

## Features
- Add/Delete/Edit Items
- View Description & Prices 

## Stretch-Goals
- Inventory Alerts
- Search feature to search for products 



## Best_Practices 
 **To create branch and pull request**
- git checkout -b newbranchname (create a new branch for each issue) 
- git branch (To confirm which branch you are on)
- git add . (To add all the changed files) 
- git status (To check the status of the files) 
- git commit -m "message"
- git push -upstream newbranchname (To push code)
- Create Pull request 
- git branch -D newbranchname (To delete branch)
- git branch -d newbranchname
- git fetch origin master
- git reset --hard origin/main (To overide files)
- git rm -r --cached . 
     - git add .
- git rm --cached db.sqlite

## Team_Constitution
- Be respectful.
- Look out and help each other.
- Communicate and don't get stuck on any blockers for long time.
- Create new branch for every issue.Never merge your work on main branch.
- Inform each other for pull request.
- Take breaks in between.
                 
## Contributors
- Chad
- Sharon
- Lindsey
- Afreen



