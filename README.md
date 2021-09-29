# met602-ExpressHW
Practice using Express with MongoDB

# Overview 
Part 1
- _mongo_zipCodeModule_v2.js_ get data from a pre-populated MongoDB database 
  - The _\_id_ property is the zip code of a city, the _pop_ property is the population of the city, and the _city_ and _state_ properties are self-explanatory 
- The client test code is provided in _client.js_ 

Part 2
- Employee Mongoose schema, _employeeDB.js_, created for employees to be stored in MongoDB
   - Employees have properties firseName and lastName
- Run _initDB.js_ using node to initialize the database collection with at least three employees 
- _server.js_ utilizes Express to configure the paths for adding a new employee, deleting an existing employee, displaying all employees, and editing an existing employee
- Data is persisted to the MongoDB database using Mongoose

- To populate initial data for the collection, run _node initDB.js_

# Instructions 
- Run npm install for both part1 and part2 to install the node dependency modules.
  - Install Node modules express, express-handlebars, body-parser, and underscore as required 
