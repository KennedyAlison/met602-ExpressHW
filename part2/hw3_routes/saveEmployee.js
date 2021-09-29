const employeeDB = require('../employeeDB.js');
const Employee = employeeDB.getModel();

module.exports = async (req , res , next) => {

  // Get the first and last name from the req data 
  let employee = new Employee({
    firstName:     req.body.fname,
    lastName:    req.body.lname,
  }); 

  // Save employee to database
  await employee.save();
    res.redirect('/employees');
  };
